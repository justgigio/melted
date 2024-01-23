import { IOGate, Pin } from "./IOGate";
import { BOARD_MARGIN, CHILD_COMPONENT_SIZE, CHILD_GATE_RADIUS, ROOT_COMPONENT_SIZE, ROOT_GATE_RADIUS } from "./constants";


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

  public isRoot() :boolean {
    return this.parent === undefined
  }
}


class DrawableComponent {

  component: Component
  position: Position
  size: Size

  constructor(component: Component, position?: Position, size?: Size) {
    this.component = component
    this.component.setGraphic(this)

    if (position !== undefined) {
      this.position = position
    } else {
      this.position = {x: BOARD_MARGIN, y: BOARD_MARGIN}
    }
    if (size !== undefined) {
      this.size = size
    } else {
      this.size = this.calculateSize()
    }
  }

  public getConnections(): Connection[] {
    let cons: Connection[] = []

    this.component.inputs.forEach((input) => {
      const iCons = input.out.connections
      cons = cons.concat(iCons.map(con => <Connection>{a: input.out, b: con}))
    })

    this.component.components.forEach((comp) => {

      comp.outputs.forEach((input) => {
        const oCons = input.out.connections
        cons = cons.concat(oCons.map(con => <Connection>{a: input.out, b: con}))
      })
    })

    return cons
  }

  public setPosition(position: Position) {
    this.position = position
  }

  public setSize(size: Size) {
    this.size = size
  }

  private calculateSize(): Size {
    let width = CHILD_COMPONENT_SIZE.width
    let height = 30

    let gateRadius = CHILD_GATE_RADIUS
    if (this.component.isRoot()) {
      width = ROOT_COMPONENT_SIZE.width
      height = ROOT_COMPONENT_SIZE.height
      gateRadius = ROOT_GATE_RADIUS
    }

    const inLength = this.component.inputs.length
    const outLength = this.component.outputs.length
    
    const newHeight = (1 + Math.max(inLength, outLength) * 2) * gateRadius * 2

    height = Math.max(height, newHeight)

    return {width, height}
  }
}

export { Component, DrawableComponent }
export type { Connection }
