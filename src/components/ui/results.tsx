import * as React from "react"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown';

export interface AnalysisResultProps {
  videoTitle: string;
  analysis: string;
  className?: string;
}

const AnalysisResult = React.forwardRef<HTMLDivElement, AnalysisResultProps>(
  ({ videoTitle, analysis, className }, ref) => {
    return (
      <div className={cn("w-full overflow-hidden border border-gray-200 rounded-md bg-white shadow-sm", className)} ref={ref}>
        <div className="p-4 border-b border-gray-100">
          <div>
            <h3 className="text-lg font-semibold leading-none tracking-tight mb-2">
              {videoTitle}
            </h3>
            <p className="text-sm text-slate-500">
              Comment Analysis Results
            </p>
          </div>
        </div>
        <div className="p-4">
          <div className="prose max-w-none">
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }
)
AnalysisResult.displayName = "AnalysisResult"

export { AnalysisResult } 