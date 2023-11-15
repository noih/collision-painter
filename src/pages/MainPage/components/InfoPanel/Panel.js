import { useShapeStore } from '/src/stores'

import Circle from './Circle'
import Customized from './Customized'
import Ellipse from './Ellipse'
import Rect from './Rect'

const Panel = (props) => {
  // FIXME: shallow
  const [selected] = useShapeStore((state) => [state.selected])

  switch (selected?.type) {
    case 'circle': return <Circle />
    case 'customized': return <Customized />
    case 'ellipse': return <Ellipse />
    case 'rect': return <Rect />
    default: return null
  }
}

export default Panel
