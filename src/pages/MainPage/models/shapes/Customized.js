import * as PIXI from 'pixi.js'
import { v4 as uuidv4 } from 'uuid'

import numeric from '/src/utils/numeric'

import Shape from './Shape'

/**
 * a point, a few lines, or a polygon
 */
class Customized extends Shape {
  constructor(params) {
    super('customized')

    this._graphics = new PIXI.Graphics()
    this._graphics.alpha = 0.25
    this.container.addChild(this._graphics)

    this.points = params.points?.map((p) => ({
      id: uuidv4(),
      x: p.x || 0,
      y: p.y || 0
    })) || []

    this.isClose = params.isClose || true
  }

  static parse(params) {
    return new Customized(params)
  }

  addPoint = (x, y) => {
    this.points.push({ id: uuidv4(), x, y })
    this.modifiedAt = Date.now()
  }

  removePoint = (id) => {
    this.points = this.points.filter((p) => p.id !== id)
    this.modifiedAt = Date.now()
  }

  swapPoint = (aIdx, bIdx) => {
    if (aIdx === bIdx) { return }

    const tmp = this.points[aIdx]
    this.points[aIdx] = this.points[bIdx]
    this.points[bIdx] = tmp
    this.modifiedAt = Date.now()
  }

  draw = () => {
    this._graphics.clear()

    if (this.isClose) {
      if (this.points.length <= 2) {
        this._graphics.lineStyle(0.5, 0xFF0000, 1)
      }
      this._graphics.beginFill(0xFF0000, 1)
    } else {
      this._graphics.lineStyle(0.5, 0xFF0000, 1)
    }

    for (let i = 0; i < this.points.length; i++) {
      const p = this.points[i]

      if (i === 0) {
        this._graphics.moveTo(p.x, p.y)
      } else {
        this._graphics.lineTo(p.x, p.y)
      }
    }

    if (this.isClose) {
      if (this.points.length > 2) {
        this._graphics.closePath()
      }
      this._graphics.endFill()
    }

    return this
  }

  onPrecisionChange = (precision) => {
    this.points = this.points.map((p) => ({
      id: p.id,
      x: numeric.round(p.x, precision),
      y: numeric.round(p.y, precision)
    }))
    this.modifiedAt = Date.now()
  }

  destroy = (children) => {
    super.destroy(children)

    if (!children) {
      this._graphics.destroy()
    }
  }

  serialize = () => {
    return {
      ...super.serialize(),
      points: this.points
    }
  }
}

export default Customized
