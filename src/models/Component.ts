import { IOGate, IOState, DrawableConnection } from './IOGate'
import {
  BOARD_DEFAULT_COLOR,
  BOARD_MARGIN,
  BOARD_STROKE_WIDTH,
  CHILD_COMPONENT_SIZE,
  CHILD_GATE_RADIUS,
  COMPONENT_DEFAULT_COLOR,
  ROOT_COMPONENT_SIZE,
  ROOT_GATE_RADIUS,
  STROKE_COLOR,
  TEXT_PRIMARY_COLOR
} from './constants'

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

  public isRoot(): boolean {
    return this.parent === undefined
  }

  public start() {
    this.inputs.forEach((gate) => {
      gate.start()
      gate.forceState(IOState.LOW)
    })
  }

  public stop() {
    this.inputs.forEach((gate) => gate.stop())
  }
}

class DrawableComponent {
  public component: Component
  public position: Position
  public size: Size
  public textColor: string = TEXT_PRIMARY_COLOR
  public fillColor: string = COMPONENT_DEFAULT_COLOR
  public strokeColor: string = STROKE_COLOR
  public strokeWidth: number = BOARD_STROKE_WIDTH / 2

  constructor(component: Component, position?: Position, size?: Size) {
    component.setGraphic(this)
    // this.component = new Proxy(component, { set: (target, property, value) => {
    //   Object.assign(target, {[property]: value})
    //   this.update()
    //   return true
    // }})
    this.component = component

    if (position !== undefined) {
      this.position = position
    } else {
      this.position = { x: BOARD_MARGIN, y: BOARD_MARGIN }
    }
    if (size !== undefined) {
      this.size = size
    } else {
      this.size = this.calculateSize()
    }

    if (this.component.isRoot()) {
      this.fillColor = BOARD_DEFAULT_COLOR
      this.strokeWidth = BOARD_STROKE_WIDTH
    }

    this.update()
  }

  public update() {
    this.setInputsPosition()
    this.setOutputsPosition()
    this.component.parent?.graphic?.update()
  }

  public getConnections(): DrawableConnection[] {
    let cons: DrawableConnection[] = []

    if (this.component.isRoot()) {
      this.component.inputs.forEach((input) => {
        cons = cons.concat(input.out.connections.map((conn) => conn.graphic!))
      })

      this.component.components.forEach((comp) => {
        comp.outputs.forEach((input) => {
          cons = cons.concat(input.out.connections.map((conn) => conn.graphic!))
        })
      })
    }
    return cons
  }

  public setColor(color: string) {
    this.fillColor = color
  }

  public setPosition(position: Position) {
    this.position = position
    this.update()
  }

  public setSize(size: Size) {
    this.size = size
  }

  private setInputsPosition() {
    const { x, y } = this.position

    const gateSpace = this.size.height / (this.component.inputs.length + 1)

    const gateX = x
    const gateY = y + gateSpace

    this.component.inputs.forEach((gate, index) =>
      gate.graphic?.setPosition({ x: gateX, y: gateY + gateSpace * index })
    )
  }

  private setOutputsPosition() {
    const { x, y } = this.position

    const gateSpace = this.size.height / (this.component.outputs.length + 1)

    const gateX = x + this.size.width
    const gateY = y + gateSpace

    this.component.outputs.forEach((gate, index) =>
      gate.graphic?.setPosition({ x: gateX, y: gateY + gateSpace * index })
    )
  }

  private calculateSize(): Size {
    let { width, height } = CHILD_COMPONENT_SIZE

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

    return { width, height }
  }
}

export { Component, DrawableComponent }
