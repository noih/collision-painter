import numeric from '/src/utils/numeric'

import * as Tools from './'
import Tool from './Tool'

import { Circle } from '../shapes'

class CircleTool extends Tool {
  constructor() {
    super('circle')
  }

  onPointerUp = (ev) => {
    console.log('Circle.onPointerUp', ev)
    const { scene } = this.state

    const local = scene.toLocal(ev.data.global)

    const c = new Circle({
      x: numeric.round(local.x, this.state.precision),
      y: numeric.round(local.y, this.state.precision),
      radius: 4
    }).draw()

    // zIndex 0 = sprite (background)
    c.container.zIndex = scene.children.length

    scene.addChild(c.container)
    this.actions.addShape(c)
    this.actions.setShape(c)
    this.actions.setTool(Tools.Select)
  }
}

// singleton
const tool = new CircleTool()
export default tool
