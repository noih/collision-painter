import { useCallback } from 'react'

import TextField from '@mui/material/TextField'

import { useAppStore, useShapeStore } from '/src/stores'
import numeric from '/src/utils/numeric'
import is from '/src/utils/is'

import * as styles from './styles.module.css'

function Circle(props) {
  const [shape] = useShapeStore((state) => [state.selected])

  const setParams = useCallback(
    (params) => {
      const ss = useShapeStore.getState()
      const { precision } = useAppStore.getState()

      ss.update((state) => {
        const { selected } = state

        if (is.exist(params.radius) && params.radius >= 0) { selected.radius = numeric.round(Number(params.radius), precision) }
        if (is.exist(params.x)) { selected.x = numeric.round(Number(params.x), precision) }
        if (is.exist(params.y)) { selected.y = numeric.round(Number(params.y), precision) }

        selected.modifiedAt = Date.now()

        ss.setSelected(selected)
      })

      ss.selected.draw()
    },
    []
  )

  const onRadiusChange = useCallback((ev) => setParams({ radius: ev.target.value }), [setParams])
  const onPosXChange = useCallback((ev) => setParams({ x: ev.target.value }), [setParams])
  const onPosYChange = useCallback((ev) => setParams({ y: ev.target.value }), [setParams])

  return (
    <div className={styles.circle}>
      <TextField
        label="x"
        type="number"
        size="small"
        InputLabelProps={{
          shrink: true
        }}
        value={shape.x}
        onChange={onPosXChange}
      />
      <TextField
        label="y"
        type="number"
        size="small"
        InputLabelProps={{
          shrink: true
        }}
        value={shape.y}
        onChange={onPosYChange}
      />
      <TextField
        label="radius"
        type="number"
        size="small"
        InputLabelProps={{
          shrink: true
        }}
        value={shape.radius}
        onChange={onRadiusChange}
      />
    </div>
  )
}

export default Circle