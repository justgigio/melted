import { IOGate, Pin } from "./IOGate";


type Connection = {
  a: Pin
  b: Pin
}


abstract class Component {

  abstract inputs: IOGate[]
  abstract outputs: IOGate[]
  abstract components: Component[]
  
  public name: string
  public parent?: Component
  public graphic?: DrawableComponent

  constructor(name: string, parent?: Component) {
    this.name = name
    this.parent = parent
  }

  public setGraphic(graphic: DrawableComponent) {
    this.graphic = graphic
  }

  public getConnections(): Connection[] {
    let cons: Connection[] = []

    this.inputs.forEach((input) => {
      const iCons = input.out.connections
      cons = cons.concat(iCons.map(con => <Connection>{a: input.out, b: con}))
    })

    this.components.forEach((comp) => {
      comp.inputs.forEach((input) => {
        const iCons = input.out.connections
        cons = cons.concat(iCons.map(con => <Connection>{a: input.out, b: con}))
      })

      comp.outputs.forEach((input) => {
        const oCons = input.out.connections
        cons = cons.concat(oCons.map(con => <Connection>{a: input.out, b: con}))
      })
    })

    return cons
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
export type { Connection }
