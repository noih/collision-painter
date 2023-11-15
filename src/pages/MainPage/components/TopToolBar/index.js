import { useCallback, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import clsx from 'clsx'

import Button from '@mui/material/Button'
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import MouseArrowIcom from 'jsx:/src/assets/mouse-arrow.svg'
import EllipseIcon from 'jsx:/src/assets/ellipse.svg'
import CustomizedIcon from 'jsx:/src/assets/line-segment.svg'

import { useFileStore, useShapeStore } from '/src/stores'

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

  const files = useFileStore((state) => state.files)
  const [selected, setSelected] = useShapeStore(useShallow((state) => [state.selected, state.setSelected]))

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
    </div>
  ) : null
}

export default TopToolBar
