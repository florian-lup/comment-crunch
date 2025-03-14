import { useState, useRef, useCallback } from 'react';
import type { AnalysisResult } from '@/types';

/**
 * Hook for analyzing YouTube comments
 * @returns Object containing state and methods for YouTube comment analysis
 */
export function useYoutubeAnalysis() {
  // State management
  const [youtubeUrl, setYoutubeUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  
  // AbortController reference for cancellable requests
  const abortControllerRef = useRef<AbortController | null>(null);

  // Main function to analyze comments
  const analyzeComments = useCallback(async () => {
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
      
      // Step 2: Analyze comments using the ModelSelector endpoint
      const analysisResponse = await fetch('/api/ModelSelector', {
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
  }, [youtubeUrl]);

  // Handle abort function
  const handleAbort = useCallback(() => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      abortControllerRef.current = null;
    }
  }, []);

  // Handle form submission
  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    await analyzeComments();
  }, [analyzeComments]);

  return {
    youtubeUrl,
    setYoutubeUrl,
    isLoading,
    error,
    result,
    analyzeComments,
    handleAbort,
    handleSubmit
  };
} 