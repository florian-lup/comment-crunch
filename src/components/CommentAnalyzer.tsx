"use client";

import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
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
  
  return (
    <div className="w-full max-w-3xl mx-auto">
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>YouTube Comment Crunch</CardTitle>
          <CardDescription>
            Paste a YouTube video URL to get AI-powered insights from the comments
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="https://www.youtube.com/watch?v=..."
                value={youtubeUrl}
                onChange={(e) => setYoutubeUrl(e.target.value)}
              />
              <Button type="submit" disabled={isLoading}>
                {isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
                Analyze
              </Button>
            </div>
            {error && (
              <div className="text-sm text-red-500">{error}</div>
            )}
          </form>
        </CardContent>
      </Card>
      
      {isLoading && (
        <div className="flex justify-center my-12">
          <LoadingSpinner size="lg" />
        </div>
      )}
      
      {result && !isLoading && (
        <Card className="mb-8 overflow-hidden">
          <CardHeader className="bg-slate-50 dark:bg-slate-900 border-b">
            <CardTitle className="text-xl md:text-2xl">{result.videoTitle}</CardTitle>
            <CardDescription className="text-base">
              Comment Analysis Summary
            </CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <div className="prose dark:prose-invert max-w-none p-6 pt-6">
              <ReactMarkdown 
                components={{
                  h1: ({...props}) => <h1 className="text-2xl font-bold mt-6 mb-4 pb-2 border-b" {...props} />,
                  h2: ({...props}) => <h2 className="text-xl font-bold mt-5 mb-3" {...props} />,
                  h3: ({...props}) => <h3 className="text-lg font-bold mt-4 mb-2" {...props} />,
                  p: ({...props}) => <p className="my-3" {...props} />,
                  ul: ({...props}) => <ul className="list-disc pl-6 my-3" {...props} />,
                  ol: ({...props}) => <ol className="list-decimal pl-6 my-3" {...props} />,
                  li: ({...props}) => <li className="mb-1" {...props} />,
                  blockquote: ({...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 py-1 my-3 italic" {...props} />,
                  hr: ({...props}) => <hr className="my-6 border-gray-300" {...props} />,
                  code: ({className, children, ...props}) => {
                    return (
                      <code className={`bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 ${className || ''}`} {...props}>
                        {children}
                      </code>
                    );
                  }
                }}
              >
                {result.analysis}
              </ReactMarkdown>
            </div>
          </CardContent>
          <CardFooter className="bg-slate-50 dark:bg-slate-900 border-t py-3 text-sm text-muted-foreground">
            Analysis powered by GPT-4o
          </CardFooter>
        </Card>
      )}
    </div>
  );
} 