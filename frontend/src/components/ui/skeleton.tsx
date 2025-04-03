
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  "aria-label": ariaLabel,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & {
  "aria-label"?: string
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-muted", className)}
      {...props}
      aria-busy="true"
      aria-live="polite"
      role="status"
      aria-label={ariaLabel || "Loading content"}
    />
  )
}

export { Skeleton }
