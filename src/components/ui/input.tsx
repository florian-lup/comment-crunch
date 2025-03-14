import * as React from "react"
import { cn } from "@/lib/utils"
import { Youtube, Box, Loader } from "lucide-react"
import type { InputProps, YouTubeInputProps, YouTubeInputSectionProps } from "@/types"

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

const YouTubeInput = React.forwardRef<HTMLDivElement, YouTubeInputProps>(
  ({ className, onAnalyze, onAbort, isLoading = false, ...props }, ref) => {
    return (
      <div className={cn("flex flex-col sm:flex-row gap-3", className)} ref={ref}>
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            <Youtube size={20} />
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
              <Box size={16} className="mr-2" />
              <span>Crunch</span>
            </>
          ) : (
            <>
              <Loader size={16} className="mr-2 animate-spin" />
              <span>Stop</span>
            </>
          )}
        </button>
      </div>
    )
  }
)
YouTubeInput.displayName = "YouTubeInput"

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