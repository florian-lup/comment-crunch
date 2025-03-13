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
      <div className={cn("w-full overflow-hidden border border-gray-200 rounded-lg bg-white shadow-sm", className)} ref={ref}>
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div>
            <h3 className="text-lg sm:text-xl font-semibold leading-none tracking-tight mb-2">
              {videoTitle}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500">
              Comment Analysis Results
            </p>
          </div>
        </div>
        <div className="p-4 sm:p-6">
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown
              components={{
                // Main headings with improved styling
                h2: (props) => (
                  <div className="mb-6">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-8 mb-4 pb-2 border-b border-slate-200" {...props} />
                  </div>
                ),
                // Sub headings with improved styling
                h3: (props) => (
                  <h3 className="text-lg font-semibold text-slate-800 mt-6 mb-3" {...props} />
                ),
                // Paragraphs with improved readability
                p: (props) => (
                  <p className="mb-4 text-slate-700 text-sm sm:text-base leading-relaxed" {...props} />
                ),
                // Lists with better spacing and styling
                ul: (props) => (
                  <ul className="mb-6 space-y-2 w-full list-none pl-0" {...props} />
                ),
                // List items with improved styling (no bullet points)
                li: (props) => {
                  // Check if this is a regular list item or a comment quote (with the specific format)
                  const content = props.children?.toString() || "";
                  const isCommentQuote = content.includes('**"') && content.includes('**') && content.includes('@');
                  
                  return isCommentQuote ? (
                    <li className="mb-3 p-4 sm:p-5 bg-slate-50 rounded-lg border border-slate-100 shadow-sm list-none w-full" {...props} />
                  ) : (
                    <li className="mb-2 text-slate-700 text-sm sm:text-base" {...props} />
                  );
                },
                // Strong text with contextual styling
                strong: (props) => {
                  // Check if this is a username (starts with @)
                  if (props.children && typeof props.children === 'string' && props.children.startsWith('@')) {
                    return <strong className="font-medium text-blue-600 inline-block" {...props} />;
                  }
                  // Check if this is a quote (starts with ")
                  if (props.children && typeof props.children === 'string' && props.children.startsWith('"')) {
                    return <strong className="font-medium text-slate-800 italic" {...props} />;
                  }
                  // Default strong styling
                  return <strong className="font-semibold text-slate-800" {...props} />;
                },
                // Emphasized text with improved styling
                em: (props) => (
                  <em className="text-slate-600 italic block mt-2 mb-1 text-xs sm:text-sm" {...props} />
                ),
                // Blockquotes with cleaner Notion-like styling
                blockquote: (props) => (
                  <blockquote className="pl-4 border-l-2 border-blue-300 text-slate-600 text-sm sm:text-base my-4 py-1" {...props} />
                ),
                // Add code block styling for any code examples
                code: (props) => {
                  const { className } = props;
                  const match = /language-(\w+)/.exec(className || '');
                  
                  return match ? (
                    <div className="rounded-md bg-slate-900 p-4 my-4 overflow-x-auto text-xs sm:text-sm">
                      <code className={className} {...props} />
                    </div>
                  ) : (
                    <code className="bg-slate-100 text-slate-800 rounded px-1.5 py-0.5 text-sm" {...props} />
                  );
                },
                // Add horizontal rule styling
                hr: () => <hr className="my-6 border-t border-slate-200" />,
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