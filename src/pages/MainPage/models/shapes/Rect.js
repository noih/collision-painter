import * as PIXI from 'pixi.js'

import numeric from '/src/utils/numeric'

import Shape from './Shape'

class Rect extends Shape {
  constructor(params) {
    super('rect')

    this._graphics = new PIXI.Graphics()
    this._graphics.alpha = 0.25
    this.container.addChild(this._graphics)

    this.x = params.x || 0
    this.y = params.y || 0
    this.width = params.width || 0
    this.height = params.height || 0
  }

  static parse(params) {
    return new Rect(params)
  }

  draw = () => {
    this._graphics
      .clear()
      .beginFill(0xFF0000, 1)
      .drawRect(0, 0, this.width, this.height)
      .endFill()

    this.container.position.set(this.x - (this.width / 2), this.y - (this.height / 2))

    return this
  }

  onPrecisionChange = (precision) => {
    this.x = numeric.round(this.x, precision)
    this.y = numeric.round(this.y, precision)
    this.width = numeric.round(this.width, precision)
    this.height = numeric.round(this.height, precision)
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
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height
    }
  }
}

export default Rect
