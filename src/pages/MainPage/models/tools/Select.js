
import { Customized } from './'
import Tool from './Tool'

/**
 * When any key is down and a shape is selected,
 * the 'pointer' event will be forwarded to the corresponding tool.
 */
class SelectTool extends Tool {
  isKeyDown = false

  constructor() {
    super('select')
  }

  deActivate = () => {
    super.deActivate()

    Customized.clear()
  }

  onKeyDown = (ev) => {
    this.isKeyDown = true

    switch (this.state.shape?.type) {
      case 'customized': return Customized.onKeyDown(ev, this)
      case 'ellipse':
      case 'rect':
      case 'circle':
      default:
        // do nothing
    }
  }

  onKeyUp = (ev) => {
    this.isKeyDown = false

    switch (this.state.shape?.type) {
      case 'customized': return Customized.onKeyUp(ev, this)
      case 'ellipse':
      case 'rect':
      case 'circle':
      default:
        // do nothing
    }
  }

  onPointerUp = (ev) => {
    console.log('Select.onPointerUp', ev)

    if (!this.isKeyDown) {
      if (ev.target?.data) {
        this.actions.setShape(ev.target?.data)
      }

      return
    }

    switch (this.state.shape?.type) {
      case 'customized': return Customized.onPointerUp(ev, this)
      case 'ellipse':
      case 'rect':
      case 'circle':
      default:
        // do nothing
    }
  }
}

// singleton
const tool = new SelectTool()
export default tool
