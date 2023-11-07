import { useLayoutEffect, useEffect } from 'react'
import * as PIXI from 'pixi.js'

import App from '/src/modules/PIXI'
import { useFileStore, useSceneStore, useShapeStore } from '/src/stores'
import AsyncFileReader from '/src/modules/AsyncFileReader'
import { delay } from '/src/utils'

export default function useInitScene() {
  const { scene } = useSceneStore()
  const { files, selected, lastAttachedAt } = useFileStore()

  /**
   * init the selected scene
   */
  useLayoutEffect(
    () => {
      const file = files[selected]
      if (!file) {
        return () => {}
      }

      const { setScene } = useSceneStore.getState()

      const c = new PIXI.Container()
      c.sortableChildren = true
      c.pivot.set(file.width / 2, file.height / 2)

      setScene(c) // ! Note: set before draw (coz async)

      let sprite = null

      const draw = async (retry = 3) => {
        try {
          const base64 = await AsyncFileReader.readAsDataURL(file)
          sprite = PIXI.Sprite.from(base64)
          sprite.zIndex = 0 // always at the bottom
          c.addChild(sprite)

          App.stage.addChild(c)
        } catch (err) {
          if (retry <= 0) { throw err }

          await delay(1000)
          return draw(retry - 1)
        }
      }

      draw()

      return () => {
        App.stage.removeChildren()
        c.destroy(false) // only destroy the container (exclude children)
        sprite?.destroy(true)
      }
    },
    [files, selected]
  )

  /**
   * add back shapes (if exists)
   */
  useEffect(
    () => {
      if (!scene) {
        return () => {}
      }

      const { selected } = useFileStore.getState()
      const { shapesMap } = useShapeStore.getState()

      const shapes = (shapesMap[selected] || []).map((shape, idx) => {
        shape.container.zIndex = idx + 1 // default zIndex
        return shape.container
      })

      if (shapes.length) {
        scene.addChild(...shapes)
      }

      return () => {}
    },
    [scene, lastAttachedAt]
  )
}
