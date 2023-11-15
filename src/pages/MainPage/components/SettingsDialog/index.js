import { useCallback, useEffect } from 'react'
import { useShallow } from 'zustand/react/shallow'
import clsx from 'clsx'

import Autocomplete from '@mui/material/Autocomplete'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'

import DecimalArrowRight from 'jsx:/src/assets/decimal-arrow-right.svg'

import { useAppStore, useFileStore, useShapeStore } from '/src/stores'

import * as styles from './styles.module.css'

const SettingsDialog = (props) => {
  const { isOpen, onClose } = props

  const [precision, setPrecision, tags, setTags] = useAppStore(
    useShallow((state) => [state.precision, state.setPrecision, state.tags, state.setTags])
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
      for (const shape of shapes) {
        shape.draw()
      }
    },
    [precision]
  )

  const onTagsChange = useCallback(
    (ev, value) => setTags(value),
    [setTags]
  )

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      fullWidth
      maxWidth="md"
      scroll="paper"
    >
      <DialogTitle>
        Settings
      </DialogTitle>

      <DialogContent>
        <div className={styles.col}>
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
          <Autocomplete
            multiple
            freeSolo
            options={[]}
            value={tags}
            onChange={onTagsChange}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Tags"
                placeholder="Tag"
              />
            )}
          />
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default SettingsDialog
