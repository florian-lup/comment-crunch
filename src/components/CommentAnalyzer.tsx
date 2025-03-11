"use client";

import React, { useState, useRef } from 'react';
import { YouTubeInputSection } from '@/components/ui/input';
import { AnalysisResult } from '@/components/ui/results';

export function CommentAnalyzer() {
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<{
    videoTitle: string;
    analysis: string;
  } | null>(null);
  
  // Add AbortController reference
  const abortControllerRef = useRef<AbortController | null>(null);

  const analyzeComments = async () => {
    if (!youtubeUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Create a new AbortController for this request
      abortControllerRef.current = new AbortController();
      const signal = abortControllerRef.current.signal;
      
      // Step 1: Fetch comments from YouTube API
      const commentsResponse = await fetch('/api/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: youtubeUrl }),
        signal, // Pass the signal to make the request abortable
      });
      
      if (!commentsResponse.ok) {
        const errorData = await commentsResponse.json();
        throw new Error(errorData.error || 'Failed to fetch YouTube comments');
      }
      
      const commentsData = await commentsResponse.json();
      
      // Step 2: Analyze comments using the analyze endpoint
      const analysisResponse = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          comments: commentsData.comments,
          videoTitle: commentsData.videoTitle,
        }),
        signal, // Pass the signal to make the request abortable
      });
      
      if (!analysisResponse.ok) {
        const errorData = await analysisResponse.json();
        throw new Error(errorData.error || 'Failed to analyze comments');
      }
      
      const analysisData = await analysisResponse.json();
      
      setResult({
        videoTitle: commentsData.videoTitle,
        analysis: analysisData.analysis,
      });
      
    } catch (err) {
      // Don't show error message if the request was aborted
      if (err instanceof DOMException && err.name === 'AbortError') {
        setError('Request was cancelled');
      } else {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      }
    } finally {
      setIsLoading(false);
      abortControllerRef.current = null;
    }
  };

  // Add abort function
  const handleAbort = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await analyzeComments();
  };
  
  return (
    <div className="mb-16 w-full max-w-4xl mx-auto">
      {/* Input Section */}
      <YouTubeInputSection
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        onAnalyze={analyzeComments}
        onAbort={handleAbort}
        isLoading={isLoading}
        error={error}
        onSubmit={handleSubmit}
        className="mt-6 sm:mt-10"
      />
      
      {/* Results Section */}
      <div className={`mt-6 sm:mt-8 ${result ? 'animate-fadeIn' : 'hidden'}`}>
        {result && (
          <AnalysisResult
            videoTitle={result.videoTitle}
            analysis={result.analysis}
          />
        )}
      </div>
    </div>
  );
} 