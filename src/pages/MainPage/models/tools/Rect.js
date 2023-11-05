import numeric from '/src/utils/numeric'

import * as Tools from './'
import Tool from './Tool'

import { Rect } from '../shapes'

class RectTool extends Tool {
  constructor() {
    super('rect')
  }

  onPointerUp = (ev) => {
    console.log('Rect.onPointerUp', ev)
    const { scene } = this.state

    const local = scene.toLocal(ev.data.global)

    const r = new Rect({
      x: numeric.round(local.x, this.state.precision),
      y: numeric.round(local.y, this.state.precision),
      width: 8,
      height: 8
    }).draw()

    // zIndex 0 = sprite (background)
    r.container.zIndex = scene.children.length

    scene.addChild(r.container)
    this.actions.addShape(r)
    this.actions.setShape(r)
    this.actions.setTool(Tools.Select)
  }
}

// singleton
const tool = new RectTool()
export default tool
