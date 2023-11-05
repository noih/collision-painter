import { useLayoutEffect, useCallback } from 'react'

import App from '/src/modules/PIXI'
import useWindowResize from '/src/hooks/useWindowResize'

export default function useInitPainter() {

  const resize = useCallback(
    () => {
      const painter = document.getElementById('painter')
      App.renderer.resize(painter.offsetWidth, painter.offsetHeight)
    },
    []
  )

  useLayoutEffect(
    () => {
      const painter = document.getElementById('painter')
      painter.appendChild(App.view)

      App.view.style = "position: absolute; z-index: 0;"

      resize()

      return () => {
        painter.removeChild(App.view)
      }
    },
    [resize]
  )

  useWindowResize(resize)
}
