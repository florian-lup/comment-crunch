import * as React from "react"
import { cn } from "@/lib/utils"
import ReactMarkdown from 'react-markdown';
import { Check, Copy } from "lucide-react";
import rehypeRaw from 'rehype-raw';

export interface AnalysisResultProps {
  videoTitle: string;
  analysis: string;
  className?: string;
}

const AnalysisResult = React.forwardRef<HTMLDivElement, AnalysisResultProps>(
  ({ videoTitle, analysis, className }, ref) => {
    // State for copied code blocks
    const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

    // Function to copy code to clipboard
    const copyToClipboard = (code: string) => {
      navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    };
    
    // Pre-process analysis to fix potential HTML issues in blockquotes
    const processedAnalysis = analysis.replace(/<a\s+href=[^>]+>(.*?)<\/a>/g, '$1');
    
    return (
      <div className={cn("w-full overflow-hidden border border-gray-200 rounded-lg bg-white shadow-sm", className)} ref={ref}>
        <div className="p-4 sm:p-6 border-b border-gray-100">
          <div>
            <h3 className="text-xl sm:text-2xl font-medium leading-none tracking-tight mb-2 text-slate-800">
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
              rehypePlugins={[rehypeRaw]}
              components={{
                // Main headings (h2)
                h2: (props) => (
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800 mt-8 mb-4 border-b border-slate-200 pb-2" {...props} />
                ),
                // Sub headings (h3)
                h3: (props) => (
                  <h3 className="text-lg font-semibold text-slate-700 mt-6 mb-3" {...props} />
                ),
                // Paragraphs
                p: (props) => {
                  // Check if this is an analysis paragraph (starts with *)
                  const content = props.children?.toString() || "";
                  if (content.startsWith('*') && content.endsWith('*')) {
                    return <p className="italic text-slate-600 mb-6 text-sm" {...props} />;
                  }
                  return <p className="mb-4 text-slate-700 leading-relaxed" {...props} />;
                },
                // Lists
                ul: (props) => (
                  <ul className="mb-6 space-y-2 pl-5 list-disc" {...props} />
                ),
                // List items
                li: (props) => (
                  <li className="text-slate-700" {...props} />
                ),
                // Strong text with special styling for usernames
                strong: (props) => {
                  const content = props.children?.toString() || "";
                  // Check if this is a username (starts with @)
                  if (content.startsWith('@')) {
                    return <strong className="font-medium text-blue-600" {...props} />;
                  }
                  return <strong className="font-semibold text-slate-900" {...props} />;
                },
                // Emphasis (italic)
                em: (props) => (
                  <em className="italic text-slate-600" {...props} />
                ),
                // Blockquotes for comments
                blockquote: (props) => (
                  <blockquote className="bg-slate-50 border-l-4 border-green-500 p-4 mb-6 rounded-md text-slate-800 shadow-sm font-normal leading-relaxed [&>p]:border-b-0 [&>p]:mb-2 [&>p:last-child]:mb-0" {...props} />
                ),
                // Code block styling
                code: (props) => {
                  const { className, children } = props;
                  const match = /language-(\w+)/.exec(className || '');
                  const code = children?.toString() || '';
                  
                  return match ? (
                    <div className="rounded-md bg-slate-900 my-4 overflow-hidden group relative">
                      <div className="flex items-center justify-between px-4 py-2 bg-slate-800 text-slate-400 text-xs">
                        <span>{match[1]}</span>
                        <button 
                          onClick={() => copyToClipboard(code)}
                          className="text-slate-400 hover:text-white transition-colors p-1 rounded"
                          aria-label="Copy code"
                        >
                          {copiedCode === code ? <Check size={14} /> : <Copy size={14} />}
                        </button>
                      </div>
                      <pre className="p-4 overflow-x-auto">
                        <code className={className} {...props} />
                      </pre>
                    </div>
                  ) : (
                    <code className="bg-slate-100 text-slate-800 rounded px-1.5 py-0.5 font-mono" {...props} />
                  );
                },
                // Horizontal rule
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