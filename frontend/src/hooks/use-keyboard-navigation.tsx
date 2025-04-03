
import { useCallback, useEffect } from "react"

type KeyboardNavigationOptions = {
  onEscape?: () => void
  onEnter?: () => void
  onArrowUp?: () => void
  onArrowDown?: () => void
  onArrowLeft?: () => void
  onArrowRight?: () => void
  onTab?: (event: KeyboardEvent) => void
  enabled?: boolean
}

/**
 * Hook to handle keyboard navigation for improved accessibility
 */
export function useKeyboardNavigation({
  onEscape,
  onEnter,
  onArrowUp,
  onArrowDown,
  onArrowLeft,
  onArrowRight,
  onTab,
  enabled = true,
}: KeyboardNavigationOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!enabled) return

      switch (event.key) {
        case "Escape":
          onEscape?.()
          break
        case "Enter":
          onEnter?.()
          break
        case "ArrowUp":
          onArrowUp?.()
          break
        case "ArrowDown":
          onArrowDown?.()
          break
        case "ArrowLeft":
          onArrowLeft?.()
          break
        case "ArrowRight":
          onArrowRight?.()
          break
        case "Tab":
          onTab?.(event)
          break
        default:
          break
      }
    },
    [enabled, onEscape, onEnter, onArrowUp, onArrowDown, onArrowLeft, onArrowRight, onTab]
  )

  useEffect(() => {
    if (enabled) {
      window.addEventListener("keydown", handleKeyDown)
    }
    
    return () => {
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [enabled, handleKeyDown])
}
