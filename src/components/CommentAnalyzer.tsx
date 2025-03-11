"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import ReactMarkdown from 'react-markdown';

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
      {/* Input Card */}
      <div style={{ width: "868px", maxWidth: "100%" }}>
        <Card className="w-full overflow-hidden border border-gray-200 shadow-sm">
          <CardHeader>
            <CardTitle>Analyze YouTube Comments</CardTitle>
            <CardDescription>
              Paste a YouTube video URL to get AI-powered insights from the comments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
                      <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
                    </svg>
                  </div>
                  <Input
                    placeholder="https://www.youtube.com/watch?v=..."
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                    className="pl-10"
                  />
                </div>
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  variant="default"
                  className={`whitespace-nowrap flex items-center px-4 relative ${isLoading ? 'bg-blue-50 text-blue-600/0 border border-blue-200' : 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 hover:border-blue-300'} shadow-none`}
                  onClick={(e) => {
                    e.preventDefault();
                    analyzeComments();
                  }}
                >
                  {!isLoading && (
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-2" 
                      viewBox="0 0 24 24" 
                      fill="none" 
                      stroke="currentColor" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round"
                    >
                      <polyline points="9 10 4 15 9 20"></polyline>
                      <path d="M20 4v7a4 4 0 0 1-4 4H4"></path>
                    </svg>
                  )}
                  <span>{isLoading ? 'Analyzing...' : 'Analyze Comments'}</span>
                  
                  {isLoading && (
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                      <div className="animate-spin h-5 w-5 rounded-full border-2 border-blue-600 border-t-transparent"></div>
                    </div>
                  )}
                </Button>
              </div>
              
              {error && (
                <div className="notion-callout animate-fadeIn">
                  <div className="notion-callout-emoji">⚠️</div>
                  <div className="text-sm">{error}</div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      
      {/* Results Card - Always render the container div */}
      <div className={`mt-8 ${result ? 'animate-fadeIn' : 'hidden'}`} style={{ width: "868px", maxWidth: "100%" }}>
        {result && (
          <Card className="w-full overflow-hidden border border-gray-200 shadow-sm">
            <CardHeader>
              <div>
                <CardTitle>{result.videoTitle}</CardTitle>
                <CardDescription>
                  Comment Analysis Results
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none">
                <ReactMarkdown>{result.analysis}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 