import type { DrawableConnection } from '../graphic/DrawableConnection'
import type { Pin } from './Pin'

class Connection {
  public a: Pin
  public b: Pin
  public graphic?: DrawableConnection

  constructor(a: Pin, b: Pin) {
    this.a = a
    this.b = b
  }

  public setGraphic(graphic: DrawableConnection) {
    this.graphic = graphic
  }
}

export { Connection }
