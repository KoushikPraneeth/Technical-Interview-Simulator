
import * as React from "react"

type FocusTrapProps = {
  children: React.ReactNode
  active?: boolean
  returnFocusOnDeactivate?: boolean
}

/**
 * A component that traps focus within its children
 * Useful for modals, dialogs, and other components that should trap focus
 */
export function FocusTrap({
  children,
  active = true,
  returnFocusOnDeactivate = true,
}: FocusTrapProps) {
  const rootRef = React.useRef<HTMLDivElement>(null)
  const previousFocusRef = React.useRef<HTMLElement | null>(null)

  // Store the previously focused element
  React.useEffect(() => {
    if (active && returnFocusOnDeactivate) {
      previousFocusRef.current = document.activeElement as HTMLElement
    }
  }, [active, returnFocusOnDeactivate])

  // Handle focus trapping
  React.useEffect(() => {
    if (!active || !rootRef.current) return

    const root = rootRef.current
    const focusableElements = root.querySelectorAll(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    )

    if (focusableElements.length === 0) return

    const firstElement = focusableElements[0] as HTMLElement
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement

    // Set initial focus to the first focusable element
    firstElement.focus()

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key !== "Tab") return

      // If shift + tab on the first element, focus the last element
      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      }
      // If tab on the last element, focus the first element
      else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [active])

  // Return focus to the previously focused element when deactivated
  React.useEffect(() => {
    return () => {
      if (returnFocusOnDeactivate && previousFocusRef.current) {
        previousFocusRef.current.focus()
      }
    }
  }, [returnFocusOnDeactivate])

  return (
    <div ref={rootRef} style={{ outline: "none" }}>
      {children}
    </div>
  )
}
