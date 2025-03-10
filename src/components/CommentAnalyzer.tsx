"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
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
      
      // Step 2: Analyze comments using GPT-4o
      const analysisResponse = await fetch('/api/openai', {
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
    <div className="w-full max-w-3xl mx-auto mb-16">
      <div className="custom-border-gradient card-hover-effect">
        <Card className="glassmorphism border-0">
          <CardHeader className="border-b border-slate-100/60">
            <CardTitle className="text-gradient-2 font-bold">Analyze YouTube Comments</CardTitle>
            <CardDescription className="text-slate-600">
              Paste a YouTube video URL to get AI-powered insights from the comments
            </CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="flex-1 relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
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
                  variant="primary" 
                  className="whitespace-nowrap gradient-bg text-white shadow-md hover:shadow-lg transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    analyzeComments();
                  }}
                >
                  {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                  {isLoading ? 'Analyzing...' : 'Analyze Comments'}
                </Button>
              </div>
              
              {error && (
                <div className="bg-red-50 border border-red-200 rounded-md p-3 text-sm text-red-600 animate-fadeIn">
                  <div className="flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <line x1="12" y1="8" x2="12" y2="12"></line>
                      <line x1="12" y1="16" x2="12.01" y2="16"></line>
                    </svg>
                    {error}
                  </div>
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
      
      {result && (
        <div className="mt-8 animate-fadeIn">
          <Card className="overflow-hidden border border-slate-200/70 shadow-lg bg-white">
            <CardHeader className="bg-gradient-to-r from-indigo-50 to-blue-50 border-b border-slate-100">
              <div>
                <CardTitle className="text-slate-800 font-bold text-xl">{result.videoTitle}</CardTitle>
                <CardDescription className="text-slate-600 mt-1">
                  Comment Analysis Results
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <div className="prose prose-slate max-w-none">
                <ReactMarkdown>{result.analysis}</ReactMarkdown>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
} 