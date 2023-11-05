import { useCallback } from 'react'

import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'

import { useFileStore, useShapeStore } from '/src/stores'

import * as styles from './styles.module.css'

function Explorer(props) {
  const [files, selectedFile] = useFileStore((state) => [state.files, state.selected])

  const onItemClick = useCallback(
    (idx) => {
      const shape = useShapeStore.getState()
      const file = useFileStore.getState()
      file.setSelected(idx)
      shape.setSelected(null)
    },
    []
  )

  return (
    <div className={styles.explorer}>
      <List>
        {
          files.map((file, idx) => (
            <ListItemButton
              className={styles.item}
              key={file.name}
              selected={selectedFile === idx}
              disableRipple
              onClick={() => onItemClick(idx)}
            >
              <img
                className={styles.img}
                src={URL.createObjectURL(file)}
                alt={file.name}
              />
              <div className={styles.label}>{ file.name }</div>
            </ListItemButton>
          ))
        }
      </List>
    </div>
  )
}

export default Explorer
