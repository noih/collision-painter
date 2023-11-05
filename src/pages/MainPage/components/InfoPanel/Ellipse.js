import { useCallback } from 'react'

import TextField from '@mui/material/TextField'

import { useAppStore, useShapeStore } from '/src/stores'
import numeric from '/src/utils/numeric'
import is from '/src/utils/is'

import * as styles from './styles.module.css'

function Ellipse(props) {
  const [shape] = useShapeStore((state) => [state.selected])

  const setParams = useCallback(
    (params) => {
      const ss = useShapeStore.getState()
      const { precision } = useAppStore.getState()

      ss.update((state) => {
        const { selected } = state

        if (is.exist(params.x)) { selected.x = numeric.round(Number(params.x), precision) }
        if (is.exist(params.y)) { selected.y = numeric.round(Number(params.y), precision) }
        if (is.exist(params.width)) { selected.width = numeric.round(Number(params.width), precision) }
        if (is.exist(params.height)) { selected.height = numeric.round(Number(params.height), precision) }

        selected.modifiedAt = Date.now()

        ss.setSelected(selected)
      })

      ss.selected.draw()
    },
    []
  )

  const onPosXChange = useCallback((ev) => setParams({ x: ev.target.value }), [setParams])
  const onPosYChange = useCallback((ev) => setParams({ y: ev.target.value }), [setParams])
  const onWidthChange = useCallback((ev) => setParams({ width: ev.target.value }), [setParams])
  const onHeightChange = useCallback((ev) => setParams({ height: ev.target.value }), [setParams])

  return (
    <div className={styles.ellipse}>
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
        label="width"
        type="number"
        size="small"
        InputLabelProps={{
          shrink: true
        }}
        value={shape.width}
        onChange={onWidthChange}
      />
      <TextField
        label="height"
        type="number"
        size="small"
        InputLabelProps={{
          shrink: true
        }}
        value={shape.height}
        onChange={onHeightChange}
      />
    </div>
  )
}

export default Ellipse
