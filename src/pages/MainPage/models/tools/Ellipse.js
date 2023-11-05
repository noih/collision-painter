import numeric from '/src/utils/numeric'

import * as Tools from './'
import Tool from './Tool'

import { Ellipse } from '../shapes'

class EllipseTool extends Tool {
  constructor() {
    super('ellipse')
  }

  onPointerUp = (ev) => {
    console.log('Ellipse.onPointerUp', ev)
    const { scene } = this.state

    const local = scene.toLocal(ev.data.global)

    const e = new Ellipse({
      x: numeric.round(local.x, this.state.precision),
      y: numeric.round(local.y, this.state.precision),
      width: 4,
      height: 3
    }).draw()

    // zIndex 0 = sprite (background)
    e.container.zIndex = scene.children.length

    scene.addChild(e.container)
    this.actions.addShape(e)
    this.actions.setShape(e)
    this.actions.setTool(Tools.Select)
  }
}

// singleton
const tool = new EllipseTool()
export default tool
