"use client";

import React, { useState } from 'react';
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

  const analyzeComments = async () => {
    if (!youtubeUrl.trim()) {
      setError('Please enter a YouTube URL');
      return;
    }
    
    try {
      setIsLoading(true);
      setError(null);
      
      // Step 1: Fetch comments from YouTube API
      const commentsResponse = await fetch('/api/youtube', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url: youtubeUrl }),
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
      setError(err instanceof Error ? err.message : 'An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await analyzeComments();
  };
  
  return (
    <div className="mb-16 mx-auto flex flex-col items-center">
      {/* Input Section */}
      <YouTubeInputSection
        value={youtubeUrl}
        onChange={(e) => setYoutubeUrl(e.target.value)}
        onAnalyze={analyzeComments}
        isLoading={isLoading}
        error={error}
        onSubmit={handleSubmit}
        className="w-[868px] mt-10"
      />
      
      {/* Results Section */}
      <div className={`mt-8 ${result ? 'animate-fadeIn' : 'hidden'} w-[868px]`}>
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