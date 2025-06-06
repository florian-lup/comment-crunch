import * as React from "react"
import { cn } from "@/lib/utils"
import type { HeaderProps } from "@/types"
import { UI_CONSTANTS } from "@/config"

const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  ({ 
    title = UI_CONSTANTS.APP_DESCRIPTION,
    description = "Use AI to analyze and summarize YouTube comment sections quickly",
    tags = UI_CONSTANTS.DEFAULT_TAGS,
    className 
  }, ref) => {
    const tagColors = [
      "bg-blue-100 text-blue-700", 
      "bg-purple-100 text-purple-700", 
      "bg-pink-100 text-pink-700"
    ];
    
    return (
      <div className={cn("mt-4 sm:mt-6", className)} ref={ref}>
        <h2 className="text-2xl sm:text-3xl font-medium mb-1 sm:mb-2">
          {title}
        </h2>
        <p className="text-gray-500 text-base sm:text-lg">
          {description}
        </p>
        <div className="mt-2 sm:mt-3 flex flex-wrap gap-1.5 sm:gap-2">
          {tags.map((tag, index) => (
            <span 
              key={tag} 
              className={`rounded-md ${tagColors[index % tagColors.length]} py-0.5 sm:py-1 px-2 sm:px-2.5 text-xs sm:text-sm`}
            >
              {tag}
            </span>
          ))}
        </div>
        <div className="h-px bg-gray-200 mt-4 sm:mt-6 mb-2 sm:mb-4"></div>
      </div>
    )
  }
)
Header.displayName = "Header"

export { Header } 