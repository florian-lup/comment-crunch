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
    // Process the analysis to enhance the styling of usernames (@username)
    const processedAnalysis = analysis.replace(
      /- \*\*"(.*?)"\*\* - (@\w+)/g, 
      '- **"$1"** - **$2**'
    );
    
    return (
      <div className={cn("w-full overflow-hidden border border-gray-200 rounded-md bg-white shadow-sm", className)} ref={ref}>
        <div className="p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl font-semibold leading-none tracking-tight mb-2">
              {videoTitle}
            </h3>
            <p className="text-sm text-slate-500">
              Comment Analysis Results
            </p>
          </div>
        </div>
        <div className="p-6">
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown
              components={{
                h2: (props) => <h2 className="text-xl font-bold text-slate-800 mt-8 mb-4 pb-2 border-b border-slate-200" {...props} />,
                h3: (props) => <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3" {...props} />,
                p: (props) => <p className="mb-4 text-slate-600 leading-relaxed" {...props} />,
                ul: (props) => <ul className="mb-6 space-y-6 w-full list-none pl-0" {...props} />,
                li: (props) => (
                  <li className="mb-3 p-5 bg-slate-50 rounded-md border border-slate-100 shadow-sm list-none w-full" {...props} />
                ),
                strong: (props) => {
                  // Check if this is a username (starts with @)
                  if (props.children && typeof props.children === 'string' && props.children.startsWith('@')) {
                    return <strong className="font-semibold text-blue-600" {...props} />;
                  }
                  // Check if this is a quote (starts with ")
                  if (props.children && typeof props.children === 'string' && props.children.startsWith('"')) {
                    return <strong className="font-semibold text-slate-800" {...props} />;
                  }
                  // Default strong styling
                  return <strong className="font-semibold text-slate-800" {...props} />;
                },
                em: (props) => <em className="text-slate-600 italic block mt-2" {...props} />,
                blockquote: (props) => (
                  <blockquote className="pl-4 border-l-4 border-blue-200 italic text-slate-600 my-4" {...props} />
                ),
              }}
            >
              {processedAnalysis}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    )
  }
)
AnalysisResult.displayName = "AnalysisResult"

export { AnalysisResult } 