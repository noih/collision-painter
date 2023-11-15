import { useEffect, useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'

import { useSceneStore, useShapeStore, useAppStore } from '/src/stores'
import numeric from '/src/utils/numeric'

import CustomizedPointsCtrl from '../models/controls/CustomizedPoints.js'

export default function useCustomizedPoints() {
  const selected = useShapeStore((state) => state.selected)
  const [scene, scale] = useSceneStore(useShallow((state) => [state.scene, state.scale]))

  const modifiedAt = selected?.modifiedAt || 0

  const onMove = useCallback(
    (point, pos) => {
      const ss = useShapeStore.getState()
      const { precision } = useAppStore.getState()

      point.x = numeric.round(pos.x, precision)
      point.y = numeric.round(pos.y, precision)

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

      CustomizedPointsCtrl.setup({ onMove })
      CustomizedPointsCtrl.update(ss.selected, sc.scale)
    },
    [onMove]
  )

  /**
   * create / destroy
   */
  useEffect(
    () => {
      if (!scene) { return () => {} }
      CustomizedPointsCtrl.create()
      return () => {
        CustomizedPointsCtrl.destroy()
      }
    },
    [!!scene]
  )

  /**
   * selected
   */
  useEffect(
    () => {
      if (selected?.type !== 'customized') {
        return () => {}
      }

      scene.addChild(CustomizedPointsCtrl.container)
      update()

      return () => {
        scene.removeChild(CustomizedPointsCtrl.container)
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
