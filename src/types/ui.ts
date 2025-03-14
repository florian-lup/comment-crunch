import React from 'react';

/**
 * Props for the base Input component
 */
export type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * Props for the specialized YouTube input component
 */
export interface YouTubeInputProps extends InputProps {
  onAnalyze?: () => void;
  onAbort?: () => void;
  isLoading?: boolean;
}

/**
 * Props for the YouTube input section component
 */
export interface YouTubeInputSectionProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onAnalyze: () => void;
  onAbort?: () => void;
  isLoading: boolean;
  error: string | null;
  onSubmit: (e: React.FormEvent) => void;
  className?: string;
  title?: string;
  description?: string;
}

/**
 * Props for the analysis result component
 */
export interface AnalysisResultProps {
  videoTitle: string;
  analysis: string;
  className?: string;
}

/**
 * Props for the header component
 */
export interface HeaderProps {
  title?: string;
  description?: string;
  tags?: string[];
  className?: string;
} 