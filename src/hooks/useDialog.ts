import { useEffect, useRef } from 'react'
import type { RefObject } from 'react'

let lockCount = 0
let previousOverflow = ''

/** Shared, keyboard-accessible focus and scroll management for modal surfaces. */
export function useDialog(open: boolean, ref: RefObject<HTMLElement | null>, onClose: () => void) {
  const close = useRef(onClose)
  close.current = onClose
  useEffect(() => {
    if (!open || !ref.current) return
    const dialog = ref.current
    const previousFocus = document.activeElement as HTMLElement | null
    if (lockCount++ === 0) {
      previousOverflow = document.body.style.overflow
      document.body.style.overflow = 'hidden'
    }
    const selector = 'a[href], button:not([disabled]), input:not([disabled]), select, textarea, [tabindex="0"]'
    const focusables = () => [...dialog.querySelectorAll<HTMLElement>(selector)].filter(node => node.getClientRects().length > 0)
    const focusTimer = window.setTimeout(() => (focusables()[0] || dialog).focus(), 30)
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { event.preventDefault(); close.current(); return }
      if (event.key !== 'Tab') return
      const items = focusables(), first = items[0], last = items[items.length - 1]
      if (!first) { event.preventDefault(); dialog.focus(); return }
      if (event.shiftKey && (document.activeElement === first || !dialog.contains(document.activeElement))) { event.preventDefault(); last.focus() }
      else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) { event.preventDefault(); first.focus() }
    }
    document.addEventListener('keydown', onKey)
    return () => {
      clearTimeout(focusTimer)
      document.removeEventListener('keydown', onKey)
      if (--lockCount === 0) document.body.style.overflow = previousOverflow
      previousFocus?.focus({ preventScroll: true })
    }
  }, [open, ref])
}
