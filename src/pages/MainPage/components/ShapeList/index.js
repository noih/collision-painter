import { useCallback } from 'react'
import { useShallow } from 'zustand/react/shallow'
import clsx from 'clsx'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined'
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined'
import EllipseIcon from 'jsx:/src/assets/ellipse.svg'
import CustomizedIcon from 'jsx:/src/assets/line-segment.svg'

import { useSceneStore, useShapeStore, useFileStore } from '/src/stores'
import useAutoScrollBottom from '/src/hooks/useAutoScrollBottom'

import * as styles from './styles.module.css'

function getIcon(type) {
  switch (type) {
    case 'rect': return <RectangleOutlinedIcon fontSize="medium" color="action" />
    case 'circle': return <CircleOutlinedIcon fontSize="medium" color="action" />
    case 'ellipse': return <EllipseIcon className={clsx(styles.icon, styles.white)} />
    case 'customized': return <CustomizedIcon className={clsx(styles.icon, styles.white)} />
    default: return null
  }
}

const ShapeList = (props) => {
  const selectedFile = useFileStore((state) => state.selected)
  const [shapesMap, selectedShape] = useShapeStore(useShallow((state) => [state.shapesMap, state.selected]))

  const [listRef, anchorRef] = useAutoScrollBottom()

  const onItemClick = useCallback(
    (shape) => {
      const { selected, setSelected } = useShapeStore.getState()
      setSelected(selected === shape ? null : shape) // toggle
    },
    []
  )

  const onRemoveClick = useCallback(
    (ev, shape) => {
      ev.stopPropagation()

      const { selected: selectedFile } = useFileStore.getState()
      const ss = useShapeStore.getState()
      const { scene } = useSceneStore.getState()

      ss.setSelected(null)
      ss.remove(selectedFile, shape)

      scene.removeChild(shape.container)
      shape.destroy(true)
    },
    []
  )

  const list = shapesMap[selectedFile] || []

  return (
    <div className={clsx(styles.list, props.className)}>
      <List
        ref={listRef}
        dense
        disablePadding={!list.length}
      >
        {
          list.map((shape) => {
            return (
              <ListItemButton
                key={shape.id}
                disableRipple
                selected={selectedShape === shape}
                onClick={() => onItemClick(shape)}
              >
                <ListItemIcon>
                  { getIcon(shape.type) }
                </ListItemIcon>

                <ListItemText primary={shape.type} />

                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={(ev) => onRemoveClick(ev, shape)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItemButton>
            )
          })
        }
        <div ref={anchorRef} />
      </List>
    </div>
  )
}

export default ShapeList
