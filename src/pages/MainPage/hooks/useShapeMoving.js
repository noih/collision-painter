import { useEffect, useCallback, useRef } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useSceneStore, useShapeStore, useAppStore } from '/src/stores'
import numeric from '/src/utils/numeric'

import ShapeMovingCtrl from '../models/controls/ShapeMoving.js'

export default function useShapeMoving() {
  // FIXME: shallow
  const [selected] = useShapeStore((state) => [state.selected])

  const [scene, scale] = useSceneStore(useShallow((state) => [state.scene, state.scale]))
  const distances = useRef([])

  const modifiedAt = selected?.modifiedAt || 0

  const onDragStart = useCallback(
    () => {
      const ss = useShapeStore.getState()
      if (ss.selected.type === 'customized') {
        const center = ShapeMovingCtrl.getCenter(ss.selected)
        distances.current = ss.selected.points.map((p) => {
          return {
            x: p.x - center.x,
            y: p.y - center.y
          }
        })
      }
    },
    []
  )

  const onDragEnd = useCallback(
    () => {
      const ss = useShapeStore.getState()
      if (ss.selected.type === 'customized') {
        distances.current = []
      }
    },
    []
  )

  const onMove = useCallback(
    (pos) => {
      const ss = useShapeStore.getState()
      const { precision } = useAppStore.getState()

      switch (ss.selected.type) {
        case 'customized':
          if (ss.selected.points.length !== distances.current.length) { return }

          ss.selected.points = ss.selected.points.map((p, i) => {
            return {
              ...p,
              x: numeric.round(pos.x + distances.current[i].x, precision),
              y: numeric.round(pos.y + distances.current[i].y, precision)
            }
          })

          break

        case 'rect':
        case 'ellipse':
        case 'circle':
          ss.selected.x = numeric.round(pos.x, precision)
          ss.selected.y = numeric.round(pos.y, precision)
          break
        default:
          // nothing
      }

      ss.selected.modifiedAt = Date.now()

      // ! Note: for performance
      requestAnimationFrame(() => {
        ss.setSelected(ss.selected)
      })

      ss.selected.draw()
    },
    []
  )

  const update = useCallback(
    () => {
      const ss = useShapeStore.getState()
      const sc = useSceneStore.getState()

      ShapeMovingCtrl.update(
        ss.selected,
        sc.scale,
        {
          onMove,
          onDragStart,
          onDragEnd
        }
      )
    },
    [onMove, onDragStart, onDragEnd]
  )

  /**
   * create / destroy
   */
  useEffect(
    () => {
      if (!scene) { return () => {} }
      ShapeMovingCtrl.create()
      return () => {
        ShapeMovingCtrl.destroy()
      }
    },
    [!!scene]
  )

  /**
   * selected
   */
  useEffect(
    () => {
      if (!selected) { return () => {} }

      scene.addChild(ShapeMovingCtrl.graphics)
      update()

      return () => {
        scene.removeChild(ShapeMovingCtrl.graphics)
      }
    },
    [selected, update]
  )

  /**
   * update
   */
  useEffect(
    () => {
      update()
      return () => {}
    },
    [scale, modifiedAt, update]
  )
}
