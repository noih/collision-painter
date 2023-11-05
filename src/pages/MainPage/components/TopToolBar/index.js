import { useCallback, useEffect } from 'react'
import clsx from 'clsx'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Divider from '@mui/material/Divider'
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import MouseArrowIcom from 'jsx:/src/assets/mouse-arrow.svg'
import EllipseIcon from 'jsx:/src/assets/ellipse.svg'
import CustomizedIcon from 'jsx:/src/assets/line-segment.svg'
import DecimalArrowRight from 'jsx:/src/assets/decimal-arrow-right.svg'

import { useAppStore, useFileStore, useShapeStore } from '/src/stores'

import * as styles from './styles.module.css'

import * as Tools from '../../models/tools'
import useTool from '../../hooks/useTool'

const ToolSet = [
  {
    icon: <MouseArrowIcom className={clsx(styles.icon, styles.white)} />,
    tool: Tools.Select
  },
  {
    icon: <RectangleOutlinedIcon fontSize="medium" color="action" />,
    tool: Tools.Rect
  },
  {
    icon: <CircleOutlinedIcon fontSize="medium" color="action" />,
    tool: Tools.Circle
  },
  {
    icon: <EllipseIcon className={clsx(styles.icon, styles.white)} />,
    tool: Tools.Ellipse
  },
  {
    icon: <CustomizedIcon className={clsx(styles.icon, styles.white)} />,
    tool: Tools.Customized
  }
]

const TopToolBar = (props) => {
  const [tool, setTool] = useTool()

  const { files } = useFileStore()
  const { precision, setPrecision } = useAppStore()
  const { selected, setSelected } = useShapeStore()

  const onToolClick = useCallback(
    (t) => {
      setTool(t)
      if (t.name !== 'select') {
        setSelected(null)
      }
    },
    [setTool]
  )

  useEffect(
    () => {
      if (selected && tool.name !== 'select') {
        setTool(Tools.Select)
      }

      return () => {}
    },
    [tool, selected]
  )

  const onPrecisionChange = useCallback(
    (ev) => setPrecision(Math.floor(Math.min(Math.max(0, Number(ev.target.value)), 16))),
    [setPrecision]
  )

  /**
   * update the precision of all shapes
   */
  useEffect(
    () => {
      const ss = useShapeStore.getState()
      const fs = useFileStore.getState()

      ss.update((state) => {
        const { shapesMap } = state

        for (const shapes of Object.values(shapesMap)) {
          for (const shape of shapes) {
            shape.onPrecisionChange(precision)
          }
        }

        state.setSelected(state.selected)
      })

      // redraw
      const shapes = ss.shapesMap[fs.selected] || []
      for (shape of shapes) {
        shape.draw()
      }
    },
    [precision]
  )

  return files.length ? (
    <div className={clsx(styles.toolbar, props.className)}>
      <div className={styles.row}>
        {
          ToolSet.map((t) => (
            <Button
              key={t.tool.name}
              variant={tool.name === t.tool.name ? 'outlined' : 'text'}
              onClick={() => onToolClick(t.tool)}
            >
              { t.icon }
            </Button>
          ))
        }
      </div>

      <Divider sx={{ margin: '0 15px 0 0' }} orientation="vertical" variant="middle" flexItem />

      <div className={styles.row}>
        <TextField
          className={styles.decimalText}
          type="number"
          variant="standard"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <DecimalArrowRight className={clsx(styles.icon, styles.decimalIcon)} />
              </InputAdornment>
            )
          }}
          value={precision}
          onChange={onPrecisionChange}
        />
      </div>
    </div>
  ) : null
}

export default TopToolBar
