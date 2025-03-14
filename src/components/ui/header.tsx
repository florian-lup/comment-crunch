import * as React from "react"
import { cn } from "@/lib/utils"
import type { HeaderProps } from "@/types"

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ 
    title = "Extract insights from YouTube comments",
    description = "Use AI to analyze and summarize YouTube comment sections quickly",
    tags = ["AI-Powered", "YouTube Analysis", "Fast Insights"],
    className 
  }, ref) => {
    const tagColors = [
      "bg-blue-100 text-blue-700", 
      "bg-purple-100 text-purple-700", 
      "bg-pink-100 text-pink-700"
    ];
    
    return (
      <div className={cn("mt-4 sm:mt-8", className)} ref={ref}>
        <h2 className="text-2xl sm:text-3xl font-medium mb-2 sm:mb-4">
          {title}
        </h2>
        <p className="text-gray-500 text-base sm:text-lg">
          {description}
        </p>
        <div className="mt-4 sm:mt-6 flex flex-wrap gap-2 sm:gap-3">
          {tags.map((tag, index) => (
            <span 
              key={tag} 
              className={`rounded-md ${tagColors[index % tagColors.length]} py-1 sm:py-1.5 px-2 sm:px-3 text-xs sm:text-sm`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="h-px bg-gray-200 mt-6 sm:mt-8 mb-4 sm:mb-6"></div>
      </div>
    )
  }
)
Header.displayName = "Header"

export { Header } 