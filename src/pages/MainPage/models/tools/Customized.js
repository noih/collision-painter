import numeric from '/src/utils/numeric'

import * as Tools from './'
import Tool from './Tool'

import { Customized } from '../shapes'

class CustomizedTool extends Tool {
  constructor() {
    super('customized')

    this.mode = 'normal' // normal | add
  }

  activate = (params) => {
    super.activate(params)
    this.clear()
  }

  deActivate = () => {
    super.deActivate()
    this.clear()
  }

  clear = () => {
    this.setMode('normal')
  }

  setMode = (mode, shape = null) => {
    switch (mode) {
      case 'normal':
        document.documentElement.style.cursor = 'auto'
        break

      case 'add':
        if (!shape) { return }
        document.documentElement.style.cursor = 'crosshair'
        break

      default:
        // do nothing
    }

    this.mode = mode
  }

  onKeyDown = (ev, source = this) => {
    if (ev.key === 'Alt' || ev.key === 'Meta') {
      this.setMode('add', source.state.shape)
    }
  }

  onKeyUp = (ev, source = this) => {
    if (ev.key === 'Alt' || ev.key === 'Meta') {
      this.setMode('normal', source.state.shape)
    }
  }

  _create = (source, pos) => {
    const { state, actions } = source
    const { scene } = state

    const c = new Customized({
      points: [
        {
          x: numeric.round(pos.x, state.precision),
          y: numeric.round(pos.y, state.precision)
        }
      ]
    }).draw()

    // zIndex 0 = sprite (background)
    c.container.zIndex = scene.children.length

    scene.addChild(c.container)
    actions.addShape(c)
    actions.setShape(c)
  }

  onPointerUp = (ev, source = this) => {
    console.log('Customized.onPointerUp', ev)
    const { scene, shape } = source.state

    const local = scene.toLocal(ev.data.global)

    switch (this.mode) {
      case 'normal': {
        if (source !== this) { return }

        this._create(source, local)
        source.actions.setTool(Tools.Select)
        break
      }

      case 'add': {
        if (!shape) {
          this._create(source, local)
          source.actions.setTool(Tools.Select)
          return
        }

        source.actions.updateShape((state) => {
          const { selected } = state

          selected.addPoint(
            numeric.round(local.x, source.state.precision),
            numeric.round(local.y, source.state.precision)
          )

          state.setSelected(selected)
          selected.draw()
        })
      }

      default:
        // do nothing
    }
  }
}

// singleton
const tool = new CustomizedTool()
export default tool
