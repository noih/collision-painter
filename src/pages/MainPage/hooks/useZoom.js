import { useEffect, useCallback } from 'react'

import App from '/src/modules/PIXI'
import { useSceneStore } from '/src/stores'
import useWindowResize from '/src/hooks/useWindowResize'

export default function useZoom() {
  const { scene, scale } = useSceneStore()

  const zoom = useCallback(
    (v) => {
      try {
        const currentScene = useSceneStore.getState().scene

        if (currentScene) {
          currentScene.scale.set(v || 1)
          currentScene.position.set(App.screen.width / 2, App.screen.height / 2)
        }
      } catch (err) {
        // ignore
      }
    },
    []
  )

  /**
   * set scale when scene changed
   */
  useEffect(
    () => zoom(useSceneStore.getState().scale),
    [zoom, scene]
  )

  /**
   * zoom when scale changed
   */
  useEffect(
    () => {
      zoom(scale)
      return () => {}
    },
    [zoom, scale]
  )

  /**
   * wheel
   */
  useEffect(
    () => {
      const painter = document.getElementById('painter')

      const onWheel = (ev) => {
        const { addScale } = useSceneStore.getState()
        addScale(ev.deltaY * 0.1)
      }

      painter.addEventListener('wheel', onWheel, { passive: true })

      return () => {
        painter.removeEventListener('wheel', onWheel)
      }
    },
    []
  )

  useWindowResize(() => zoom(scale))
}
