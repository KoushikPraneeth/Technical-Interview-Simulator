
import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, id, "aria-describedby": ariaDescribedBy, ...props }, ref) => {
    // Generate a unique ID if one wasn't provided
    const inputId = id || React.useId()
    
    return (
      <input
        id={inputId}
        type={type}
        className={cn(
          "flex h-12 w-full rounded-xl border border-input bg-background px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-apple-blue focus-visible:border-apple-blue disabled:cursor-not-allowed disabled:opacity-50 transition-colors",
          className
        )}
        ref={ref}
        aria-describedby={ariaDescribedBy}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
