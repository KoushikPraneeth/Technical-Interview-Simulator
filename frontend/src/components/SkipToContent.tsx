
import * as React from "react";
import { cn } from "@/lib/utils";

interface SkipToContentProps {
  contentId: string;
  className?: string;
}

/**
 * A component that allows keyboard users to skip to the main content
 * Only visible when focused, providing better keyboard navigation
 */
const SkipToContent: React.FC<SkipToContentProps> = ({ 
  contentId, 
  className 
}) => {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById(contentId);
    if (element) {
      element.tabIndex = -1;
      element.focus();
      setTimeout(() => {
        element.removeAttribute("tabindex");
      }, 1000);
    }
  };

  return (
    <a
      href={`#${contentId}`}
      onClick={handleClick}
      className={cn(
        "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:p-4 focus:bg-apple-blue focus:text-white focus:rounded-md focus:outline-none focus:shadow-lg",
        className
      )}
    >
      Skip to content
    </a>
  );
};

export default SkipToContent;
