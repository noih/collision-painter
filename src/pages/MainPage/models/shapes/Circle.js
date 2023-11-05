import * as PIXI from 'pixi.js'

import numeric from '/src/utils/numeric'

import Shape from './Shape'

class Circle extends Shape {
  constructor(params) {
    super('circle')

    this._graphics = new PIXI.Graphics()
    this._graphics.alpha = 0.25
    this.container.addChild(this._graphics)

    this.x = params.x || 0
    this.y = params.y || 0
    this.radius = params.radius || 0
  }

  static parse(params) {
    return new Circle(params)
  }

  draw = () => {
    this._graphics
      .clear()
      .lineStyle(0) // without outline
      .beginFill(0xFF0000, 1)
      .drawCircle(0, 0, this.radius || 0)
      .endFill()

    this.container.position.set(this.x, this.y)

    return this
  }

  onPrecisionChange = (precision) => {
    this.x = numeric.round(this.x, precision)
    this.y = numeric.round(this.y, precision)
    this.radius = numeric.round(this.radius, precision)
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
      radius: this.radius
    }
  }
}

export default Circle
