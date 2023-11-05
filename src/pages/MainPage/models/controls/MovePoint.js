import * as PIXI from 'pixi.js'

import App from '/src/modules/PIXI.js'

export default class MovePoint {
  zIndex = 1000
  color = 0x00FF00

  graphics = null

  isDragging = false

  callbacks = {
    onDragStart: null,
    onDragEnd: null,
    onMove: null
  }

  constructor(zIndex = 1000, color = 0x00FF00) {
    this.zIndex = zIndex
    this.color = color

    this.create = this.create.bind(this)
    this.setup = this.setup.bind(this)
    this.draw = this.draw.bind(this)
    this.clear = this.clear.bind(this)
    this.destroy = this.destroy.bind(this)
    this.onDragStart = this.onDragStart.bind(this)
    this.onDragEnd = this.onDragEnd.bind(this)
    this.onDragMove = this.onDragMove.bind(this)
  }

  create() {
    if (this.graphics) { return }

    this.graphics = new PIXI.Graphics()
    this.graphics.eventMode = 'static'
    this.graphics.cursor = 'move'
    this.graphics.zIndex = this.zIndex

    this.graphics.on('pointerdown', this.onDragStart)
    App.stage.on('pointerup', this.onDragEnd)
    App.stage.on('pointerupoutside', this.onDragEnd)

    return this
  }

  setup(callbacks) {
    this.callbacks = callbacks
    return this
  }

  clear() {
    this.graphics?.clear()
    return this
  }

  draw(x, y, scale) {
    if (!this.graphics) { return }
    this.graphics.clear()
    this.graphics.position.set(x, y)
    this.graphics
      .lineStyle(1 / scale, 0x00000, 1)
      .beginFill(this.color, 1)
      .drawCircle(0, 0, 6 / scale)
      .endFill()

    return this
  }

  destroy() {
    this.graphics.off('pointerdown', this.onDragStart)
    this.graphics.destroy()
    this.graphics = null

    this.isDragging = false
    this.callbacks = {}

    App.stage.off('pointerup', this.onDragEnd)
    App.stage.off('pointerupoutside', this.onDragEnd)

    return this
  }

  onDragStart(ev) {
    this.callbacks.onDragStart && this.callbacks.onDragStart()

    this.isDragging = true
    App.stage.on('pointermove', this.onDragMove)
  }

  onDragEnd(ev) {
    if (!this.isDragging) { return }

    this.callbacks.onDragEnd && this.callbacks.onDragEnd()

    this.isDragging = false
    App.stage.off('pointermove', this.onDragMove)
  }

  onDragMove(ev) {
    if (this.isDragging) {
      const pos = ev.data.getLocalPosition(this.graphics.parent)
      this.callbacks.onMove && this.callbacks.onMove(pos)
    }
  }
}
