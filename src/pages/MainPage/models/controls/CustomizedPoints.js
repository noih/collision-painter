import * as PIXI from 'pixi.js'

import MovePoint from './MovePoint'

class CustomizedPointsControl {
  container = null

  points = []

  callbacks = {
    onMove: null
  }

  create = () => {
    if (this.container) { return }
    this.container = new PIXI.Container()
    this.container.zIndex = 1000
  }

  setup = (callbacks) => {
    this.callbacks = callbacks
  }

  update = (shape, scale) => {
    if (shape?.type !== 'customized') { return }

    // if points length changed
    if (this.points.length !== shape.points.length) {
      this.points.forEach((p) => p.destroy())
      this.points = shape.points.map((p) => {
        const point = new MovePoint(0, 0x9fcfed)
        return point.create()
      })
    }

    for (let i = 0; i < this.points.length; i++) {
      this.points[i]
        .setup(this.genCallbacks(shape.points[i]))
        .draw(shape.points[i].x, shape.points[i].y, scale)
    }

    // if container children length not equal to points length
    if (this.container.children.length !== this.points.length) {
      this.container.removeChildren()

      for (let i = 0; i < this.points.length; i++) {
        this.container.addChild(this.points[i].graphics)
      }
    }
  }

  genCallbacks = (point) => {
    return {
      onMove: this.callbacks.onMove ? (pos) => this.callbacks.onMove(point, pos) : null
    }
  }

  destroy = () => {
    this.points.forEach((p) => p.destroy())
    this.points.length = 0

    this.container.destroy()
    this.container = null
  }
}

const ctrl = new CustomizedPointsControl()
export default ctrl
