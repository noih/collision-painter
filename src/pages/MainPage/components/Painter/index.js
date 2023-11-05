import clsx from 'clsx'

import * as styles from './styles.module.css'

import useInitPainter from '../../hooks/useInitPainter'
import useInitScene from '../../hooks/useInitScene'
import useShapeMoving from '../../hooks/useShapeMoving'
import useCustomizedPoints from '../../hooks/useCustomizedPoints'
import useZoom from '../../hooks/useZoom'

function Painter(props) {
  useInitPainter()
  useInitScene()
  useZoom()

  useCustomizedPoints()
  useShapeMoving()

  return (
    <div
      id="painter"
      className={clsx(styles.painter, props.className)}
    />
  )
}

export default Painter
