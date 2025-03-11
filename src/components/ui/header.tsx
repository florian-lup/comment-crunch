import * as React from "react"
import { cn } from "@/lib/utils"

export interface HeaderProps {
  title?: string;
  description?: string;
  tags?: string[];
  className?: string;
}

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ 
    title = "Extract insights from YouTube comments",
    description = "Use AI to analyze and summarize YouTube comment sections quickly",
    tags = ["AI-Powered", "YouTube Analysis", "Instant Insights"],
    className 
  }, ref) => {
    const tagColors = [
      "bg-blue-100 text-blue-700", 
      "bg-purple-100 text-purple-700", 
      "bg-pink-100 text-pink-700"
    ];
    
    return (
      <div className={cn("mt-8", className)} ref={ref}>
        <h2 className="text-3xl font-medium mb-4">
          {title}
        </h2>
        <p className="text-gray-500 text-lg">
          {description}
        </p>
        <div className="mt-6 flex space-x-3">
          {tags.map((tag, index) => (
            <span 
              key={tag} 
              className={`rounded-md ${tagColors[index % tagColors.length]} py-1.5 px-3 text-sm`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="h-px bg-gray-200 mt-8 mb-6"></div>
      </div>
    )
  }
)
Header.displayName = "Header"

export { Header } 