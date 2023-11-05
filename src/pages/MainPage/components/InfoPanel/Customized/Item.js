import { useCallback } from 'react'
import clsx from 'clsx'

import ListItemButton from '@mui/material/ListItemButton'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

import { useAppStore, useShapeStore } from '/src/stores'
import numeric from '/src/utils/numeric'

import * as styles from '../styles.module.css'

const Item = (props) => {
  const { point, style } = props

  const onRemovePoint = useCallback(
    (ev) => {
      const ss = useShapeStore.getState()

      ss.update((state) => {
        const { selected, setSelected } = state
        selected.removePoint(point.id)
        setSelected(selected)
      })

      ss.selected.draw()
    },
    [point]
  )

  const onPointXChange = useCallback(
    (ev) => {
      const ss = useShapeStore.getState()
      const { precision } = useAppStore.getState()

      ss.update((state) => {
        const { selected, setSelected } = state

        point.x = numeric.round(Number(ev.target.value), precision)
        selected.modifiedAt = Date.now()

        setSelected(selected)
      })

      ss.selected.draw()
    },
    [point]
  )

  const onPointYChange = useCallback(
    (ev) => {
      const ss = useShapeStore.getState()
      const { precision } = useAppStore.getState()

      ss.update((state) => {
        const { selected, setSelected } = state

        point.y = numeric.round(Number(ev.target.value), precision)
        selected.modifiedAt = Date.now()

        setSelected(selected)
      })

      ss.selected.draw()
    },
    [point]
  )

  const onMoveUp = useCallback(
    () => {
      const ss = useShapeStore.getState()

      ss.update((state) => {
        const { selected, setSelected } = state

        const index = selected.points.findIndex((p) => p.id === point.id)
        selected.swapPoint(index, Math.max(0, index - 1))

        setSelected(selected)
      })

      ss.selected.draw()
    },
    [point]
  )

  const onMoveDown = useCallback(
    () => {
      const ss = useShapeStore.getState()

      ss.update((state) => {
        const { selected, setSelected } = state

        const index = selected.points.findIndex((p) => p.id === point.id)
        selected.swapPoint(index, Math.min(selected.points.length - 1, index + 1))

        setSelected(selected)
      })

      ss.selected.draw()
    },
    [point]
  )

  return (
    <ListItemButton
      style={style}
      className={styles.row}
      disableRipple
      onMouseEnter={() => console.log('enter')}
    >
      <div className={styles.col}>
        <IconButton
          edge="start"
          aria-label="up"
          onClick={onMoveUp}
        >
          <ArrowDropUpIcon />
        </IconButton>
        <IconButton
          edge="start"
          aria-label="down"
          onClick={onMoveDown}
        >
          <ArrowDropDownIcon />
        </IconButton>
      </div>
      <div className={clsx(styles.col, styles.fields)}>
        <TextField
          label="x"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true
          }}
          value={point.x}
          onChange={onPointXChange}
        />
        <TextField
          label="y"
          type="number"
          size="small"
          InputLabelProps={{
            shrink: true
          }}
          value={point.y}
          onChange={onPointYChange}
        />
      </div>
      <IconButton
        edge="end"
        aria-label="delete"
        onClick={onRemovePoint}
      >
        <DeleteIcon />
      </IconButton>
    </ListItemButton>
  )
}

export default Item
