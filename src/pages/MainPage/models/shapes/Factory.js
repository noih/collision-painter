
import Circle from './Circle'
import Customized from './Customized'
import Ellipse from './Ellipse'
import Rect from './Rect'

export default function Factory(shape) {
  switch (shape?.type) {
    case 'circle': return Circle.parse(shape)
    case 'customized': return Customized.parse(shape)
    case 'ellipse': return Ellipse.parse(shape)
    case 'rect': return Rect.parse(shape)
    default:
      return null
  }
}
