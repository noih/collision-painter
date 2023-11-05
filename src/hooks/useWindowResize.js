import { useEffect, useRef, useState } from 'react'

export default function useWindowResize(callback, options) {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  const callbackRef = useRef(null)
  callbackRef.current = callback

  useEffect(
    () => {
      const onResize = () => setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })

      window.addEventListener('resize', onResize, options)

      return () => {
        window.removeEventListener('resize', onResize, options)
      }
    },
    [setSize, options]
  )

  useEffect(
    () => {
      callbackRef.current?.(size)
      return () => {}
    },
    [size]
  )
}
