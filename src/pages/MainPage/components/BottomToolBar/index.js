import { useCallback } from 'react'
import clsx from 'clsx'
import { useShallow } from 'zustand/react/shallow'

import { styled } from '@mui/material/styles'
import Slider from '@mui/material/Slider'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import SearchOutlined from '@mui/icons-material/SearchOutlined'

import { useSceneStore } from '/src/stores'

import * as styles from './styles.module.css'

const CustomSlider = styled(Slider)({
  width: 150,
  margin: '0 25px 0 95px'
})

export default function BottomToolBar(props) {
  const [scale, setScale] = useSceneStore(useShallow((state) => [state.scale, state.setScale]))

  const onScaleChange = useCallback((ev) => setScale(ev.target.value / 100), [setScale])
  const onScaleReset = useCallback(() => setScale(1), [setScale])

  return (
    <div className={clsx(styles.toolbar, props.className)}>
      <div className={styles.zoom}>
        <SearchOutlined />
        <Box sx={{ m: '5px' }} />
        { `${Math.floor(scale * 100)}%` }
      </div>
      <CustomSlider
        aria-label="Zoom"
        defaultValue={100}
        step={1}
        min={10}
        max={2000}
        value={scale * 100}
        onChange={onScaleChange}
      />
      <Box sx={{ '& button': { margin: '0 5px' } }}>
        <Button
          size="small"
          variant="outlined"
          onClick={onScaleReset}
        >
          1:1
        </Button>
      </Box>
    </div>
  )
}
