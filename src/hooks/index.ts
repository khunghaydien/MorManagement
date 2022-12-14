import { RefObject, useEffect } from 'react'

export const useOutsideClick = (
  refs: Array<RefObject<HTMLElement> | undefined>,
  callbackFunction?: () => void
) => {
  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const hasOutsideBreakpoint =
        event.target === document.getElementsByTagName('html')[0] &&
        event.clientX >= document.documentElement.offsetWidth
      if (hasOutsideBreakpoint || !callbackFunction) return
      let containedToAnyRefs = false
      for (const rf of refs) {
        if (rf && rf.current && rf.current.contains(event.target)) {
          containedToAnyRefs = true
          break
        }
      }
      if (!containedToAnyRefs) {
        callbackFunction()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [refs, callbackFunction])
}
