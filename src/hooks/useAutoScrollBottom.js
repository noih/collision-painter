import { useEffect, useRef, useMemo } from 'react'

export default function useAutoScrollBottom() {
  const listRef = useRef(null)
  const anchorRef = useRef(null)
  const listHeight = useRef(0)

  useEffect(
    () => {
      const observer = new ResizeObserver(([entry]) => {
        const current = entry.contentRect.height

        if (current > listHeight.current) {
          anchorRef.current.scrollIntoView({ behavior: 'smooth' })
        }

        listHeight.current = entry.contentRect.height
      })

      observer.observe(listRef.current)

      return () => {
        observer.disconnect()
      }
    },
    []
  )

  return useMemo(
    () => [listRef, anchorRef],
    []
  )
}
