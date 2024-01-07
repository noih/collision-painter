import { useCallback } from 'react'
import clsx from 'clsx'

import List from '@mui/material/List'
import FormGroup from '@mui/material/FormGroup'
import FormControlLabel from '@mui/material/FormControlLabel'
import Checkbox from '@mui/material/Checkbox'
import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import IconButton from '@mui/material/IconButton'
import AddIcon from '@mui/icons-material/Add'

import { useAppStore, useShapeStore } from '/src/stores'
import useAutoScrollBottom from '/src/hooks/useAutoScrollBottom'

import Item from './Item'

import * as styles from '../styles.module.css'

function Customized(props) {
  const shape = useShapeStore((state) => state.selected)
  const tags = useAppStore((state) => state.tags)

  const [listRef, anchorRef] = useAutoScrollBottom()

  const onAddClick = useCallback(
    () => {
      const ss = useShapeStore.getState()

      ss.update((state) => {
        const { selected, setSelected } = state
        selected.addPoint(0, 0)
        setSelected(selected)
      })

      ss.selected.draw()
    },
    []
  )

  const onCloseChange = useCallback(
    () => {
      const ss = useShapeStore.getState()

      ss.update((state) => {
        const { selected, setSelected } = state

        selected.isClose = !selected.isClose

        selected.modifiedAt = Date.now()
        setSelected(selected)
      })

      ss.selected.draw()
    },
    []
  )

  const onNameChange = useCallback(
    (ev) => {
      const ss = useShapeStore.getState()

      ss.update((state) => {
        const { selected, setSelected } = state

        selected.name = ev.target.value

        selected.modifiedAt = Date.now()
        setSelected(selected)
      })

      ss.selected.draw()
    },
    []
  )

  const onTagsChange = useCallback(
    (ev, value, reason, detail) => {
      const ss = useShapeStore.getState()

      ss.update((state) => {
        const { selected, setSelected } = state

        selected.tags = value

        selected.modifiedAt = Date.now()
        setSelected(selected)
      })

      ss.selected.draw()
    },
    []
  )

  return (
    <div className={styles.customized}>
      <Autocomplete
        className={styles.tags}
        multiple
        filterSelectedOptions
        options={tags}
        value={shape.tags}
        onChange={onTagsChange}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Tags"
            placeholder="Tag"
          />
        )}
      />
      <TextField
        label="name"
        type="text"
        size="small"
        InputLabelProps={{
          shrink: true
        }}
        value={shape.name}
        onChange={onNameChange}
      />
      <div className={styles.points}>
        <List
          ref={listRef}
          disablePadding={!shape.points}
        >
          {
            shape.points.map((p) => (
              <Item key={p.id} point={p} />
            ))
          }
          <div ref={anchorRef} />
        </List>
      </div>

      <div className={clsx(styles.bar, styles.row)}>
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={shape.isClose}
                onChange={onCloseChange}
                name="close"
              />
            }
            label="close"
          />
        </FormGroup>
        <IconButton
          edge="end"
          aria-label="add"
          onClick={onAddClick}
        >
          <AddIcon />
        </IconButton>
      </div>

    </div>
  )
}

export default Customized
