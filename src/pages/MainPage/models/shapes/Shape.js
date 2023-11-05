import * as PIXI from 'pixi.js'
import { v4 as uuidv4 } from 'uuid'

export default class Shape {
  id = uuidv4()
  type = 'shape'

  container = new PIXI.Container()

  // mainly used to trigger control update
  modifiedAt = 0

  constructor(type) {
    this.type = type

    this.serialize = this.serialize.bind(this)
    this.draw = this.draw.bind(this)
    this.onPrecisionChange = this.onPrecisionChange.bind(this)
    this.move = this.move.bind(this)
    this.destroy = this.destroy.bind(this)

    this.container.eventMode = 'static'
    this.container.data = this // ! Note: inject data to container
  }

  draw() {
    throw new Error(`'draw' must be overridden`)
  }

  onPrecisionChange(precision) {
    throw new Error(`'onPrecisionChange' must be overridden`)
  }

  move(x, y) {
    throw new Error(`'move' must be overridden`)
  }

  /**
   * ! Note: do not use a Container after calling destroy
   */
  destroy(children = false) {
    this.container.destroy({ children })
    delete this.container.data
  }

  serialize() {
    return {
      type: this.type
    }
  }
}
