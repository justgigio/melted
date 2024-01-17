import { IOGate } from "./IOGate";


abstract class Component {

  abstract inputs: IOGate[]
  abstract outputs: IOGate[]
  abstract components: Component[]
  
  public name: String
  public parent?: Component
  public graphic?: DrawableComponent

  constructor(name: String, parent?: Component) {
    this.name = name
    this.parent = parent
  }

  public setGraphic(graphic: DrawableComponent) {
    this.graphic = graphic
  }
}


enum DrawMode {
  Explicit,
  Compact
}


class DrawableComponent {

  drawMode: DrawMode = DrawMode.Explicit
  component: Component
  position: Position
  width: number
  height: number

  constructor(component: Component, position?: Position, width?: number, height?: number) {
    this.component = component
    this.component.setGraphic(this)

    if (position !== undefined) {
      this.position = position
    } else {
      this.position = this.calculatePosition()
    }
    if (width !== undefined) {
      this.width = width
    } else {
      this.width = this.calculateWidth()
    }
    if (height !== undefined) {
      this.height = height
    } else {
      this.height = this.calculateHeight()
    }
  }

  private calculatePosition(): Position {
    return {x: 0, y: 0}
  }

  private calculateWidth(): number {
    return 800
  }

  private calculateHeight(): number {
    return 600
  }
}

export { Component, DrawableComponent, DrawMode }
