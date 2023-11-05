import polylabel from 'polylabel'

import MovePoint from './MovePoint'

class ShapeMovingControl extends MovePoint {
  update = (shape, scale, callbacks) => {
    const center = this.getCenter(shape)
    if (!center) {
      this.clear()
      return
    }

    this
      .setup(callbacks)
      .draw(center.x, center.y, scale)
  }

  getCenter = (shape) => {
    switch (shape?.type) {
      case 'customized': {
        if (shape.points.length < 2) {
          return null
        }

        if (shape.points.length === 2) {
          return {
            x: (shape.points[0].x + shape.points[1].x) / 2,
            y: (shape.points[0].y + shape.points[1].y) / 2
          }
        }

        const center = polylabel([shape.points.map((p) => [p.x, p.y])], 1.0)

        return {
          x: center[0],
          y: center[1]
        }
      }

      case 'rect':
      case 'circle':
      case 'ellipse': {
        return {
          x: shape.x,
          y: shape.y
        }
      }

      default:
        return null
    }
  }
}

const ctrl = new ShapeMovingControl(1000, 0x00FF00)
export default ctrl
