import * as React from "react"
import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-gray-200 bg-white px-3 py-1 text-gray-800 text-sm transition-all duration-150 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500/30 hover:border-gray-300 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export interface YouTubeInputProps extends InputProps {
  onAnalyze?: () => void;
  onAbort?: () => void;
  isLoading?: boolean;
}

const YouTubeInput = React.forwardRef<HTMLDivElement, YouTubeInputProps>(
  ({ className, onAnalyze, onAbort, isLoading = false, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col sm:flex-row gap-3", className)} ref={ref}>
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z"></path>
              <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"></polygon>
            </svg>
          </div>
          <Input
            placeholder="https://www.youtube.com/watch?v=..."
            className="pl-10"
            {...props}
          />
        </div>
        <button 
          type="button" 
          className={`whitespace-nowrap flex items-center justify-center h-9 w-full sm:w-28 rounded-md relative ${!isLoading ? 'bg-blue-50 text-blue-600 border border-blue-200 hover:bg-blue-100 hover:border-blue-300' : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-100 hover:border-red-300'} shadow-none transition-all duration-150`}
          onClick={isLoading ? onAbort : onAnalyze}
        >
          {!isLoading ? (
            <>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-4 w-4 mr-2" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              >
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                <polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline>
                <polyline points="7.5 19.79 7.5 14.6 3 12"></polyline>
                <polyline points="21 12 16.5 14.6 16.5 19.79"></polyline>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                <line x1="12" y1="22.08" x2="12" y2="12"></line>
              </svg>
              <span>Crunch</span>
            </>
          ) : (
            <>
              <div className="animate-spin h-4 w-4 mr-2 rounded-full border-2 border-red-600 border-t-transparent"></div>
              <span>Abort</span>
            </>
          )}
        </button>
      </div>
    )
  }
)
YouTubeInput.displayName = "YouTubeInput"

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

const YouTubeInputSection = React.forwardRef<HTMLDivElement, YouTubeInputSectionProps>(
  ({ 
    value, 
    onChange, 
    onAnalyze, 
    onAbort,
    isLoading, 
    error, 
    onSubmit,
    className,
    title = "Analyze YouTube Comments",
    description = "Paste a YouTube video URL to get AI-powered insights from the comments"
  }, ref) => {
    return (
      <div className={cn("w-full", className)} ref={ref}>
        <div className="w-full overflow-hidden border border-gray-200 rounded-md bg-white shadow-sm">
          <div className="p-4 sm:p-6 pb-2 sm:pb-3">
            <h3 className="text-base sm:text-lg font-semibold leading-none tracking-tight mb-2 sm:mb-3">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mb-4 sm:mb-6">
              {description}
            </p>
          </div>
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <form onSubmit={onSubmit} className="space-y-4">
              <YouTubeInput
                value={value}
                onChange={onChange}
                onAnalyze={onAnalyze}
                onAbort={onAbort}
                isLoading={isLoading}
              />
              
              {error && (
                <div className="bg-red-50 border border-red-100 rounded-md p-3 flex items-center gap-2 animate-fadeIn mt-4">
                  <div className="text-red-500">⚠️</div>
                  <div className="text-xs sm:text-sm text-red-600">{error}</div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    )
  }
)
YouTubeInputSection.displayName = "YouTubeInputSection"

export { Input, YouTubeInput, YouTubeInputSection } 