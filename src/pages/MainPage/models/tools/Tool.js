import App from '/src/modules/PIXI'

/**
 * Only common events are registered by default. To register more, overwrite.
 */
export default class Tool {
  /**
   * mainly used to avoid instanceof checks
   */
  name = 'tool'

  constructor(name) {
    this.name = name

    // setup when activate
    this.state = {
      scene: null,
      shape: null,
      precision: null
    }

    this.actions = {
      setTool: null,
      setShape: null,
      addShape: null,
      removeShape: null,
      updateShape: null
    }

    this.activate = this.activate.bind(this)
    this.deActivate = this.deActivate.bind(this)

    this.onKeyDown = this.onKeyDown.bind(this)
    this.onKeyUp = this.onKeyUp.bind(this)

    this.onPointerDown = this.onPointerDown.bind(this)
    this.onPointerMove = this.onPointerMove.bind(this)
    this.onPointerUp = this.onPointerUp.bind(this)
    this.onPointerOut = this.onPointerOut.bind(this)
    this.onPointerOver = this.onPointerOver.bind(this)
    this.onPointerOuteside = this.onPointerOuteside.bind(this)
  }

  activate({ state, actions }) {
    console.log(`${this.name}.activate`)

    this.state = state
    this.actions = actions

    App.stage.addEventListener('pointerup', this.onPointerUp)
    App.stage.addEventListener('pointerdown', this.onPointerDown)
    App.stage.addEventListener('pointermove', this.onPointerMove)
    App.stage.addEventListener('pointerout', this.onPointerOut)
    App.stage.addEventListener('pointerover', this.onPointerOver)
    App.stage.addEventListener('pointerupoutside', this.onPointerOuteside)

    window.addEventListener('keyup', this.onKeyUp, true)
    window.addEventListener('keydown', this.onKeyDown, true)
  }

  deActivate() {
    console.log(`${this.name}.deActivate`)

    this.state = {}
    this.actions = {}

    App.stage.removeEventListener('pointerup', this.onPointerUp)
    App.stage.removeEventListener('pointerdown', this.onPointerDown)
    App.stage.removeEventListener('pointermove', this.onPointerMove)
    App.stage.removeEventListener('pointerout', this.onPointerOut)
    App.stage.removeEventListener('pointerover', this.onPointerOver)
    App.stage.removeEventListener('pointerupoutside', this.onPointerOuteside)

    window.removeEventListener('keyup', this.onKeyUp, true)
    window.removeEventListener('keydown', this.onKeyDown, true)
  }

  onKeyDown(ev) {}
  onKeyUp(ev) {}

  onPointerDown(ev) {}
  onPointerMove(ev) {}
  onPointerUp(ev) {}
  onPointerOut(ev) {}
  onPointerOver(ev) {}
  onPointerOuteside(ev) {}
}
