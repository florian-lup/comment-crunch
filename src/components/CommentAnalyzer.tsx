"use client";

import React from 'react';
import { YouTubeInputSection } from '@/components/ui/input';
import { AnalysisResult } from '@/components/ui/results';
import { useYoutubeAnalysis } from '@/hooks';

export function CommentAnalyzer() {
  const {
    youtubeUrl,
    setYoutubeUrl,
    isLoading,
    error,
    result,
    analyzeComments,
    handleAbort,
    handleSubmit
  } = useYoutubeAnalysis();
  
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