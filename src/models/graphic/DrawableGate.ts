import {
  CHILD_GATE_RADIUS,
  GATE_DEFAULT_COLOR,
  GATE_DISCONNECTED_COLOR,
  GATE_LOW_STATE_COLOR,
  ROOT_GATE_RADIUS,
  STROKE_COLOR
} from '../constants'
import { IOGate, IOState } from '../io_gate/IOGate'

class DrawableGate {
  public gate: IOGate
  public position: Position
  public size: Size
  public color: string = GATE_DEFAULT_COLOR
  public lowStateColor: string = GATE_LOW_STATE_COLOR
  public diconnectedColor: string = GATE_DISCONNECTED_COLOR
  public strokeColor: string = STROKE_COLOR

  constructor(gate: IOGate, position?: Position, size?: Size) {
    gate.setGraphic(this)
    this.gate = gate

    if (position !== undefined) {
      this.position = position
    } else {
      this.position = { x: 0, y: 0 }
    }
    if (size !== undefined) {
      this.size = size
    } else {
      this.size = this.calculateSize()
    }
  }

  public setColor(color: string) {
    this.color = color
  }

  public getColor(): string {
    const state = this.gate.getState()
    switch (state) {
      case IOState.LOW:
        return this.lowStateColor
      case IOState.HI:
        return this.hiStateColor
    }
    return this.diconnectedColor
  }

  public get hiStateColor(): string {
    return this.color
  }

  public setPosition(position: Position) {
    this.position = position
  }

  public setSize(size: Size) {
    this.size = size
  }

  private calculateSize(): Size {
    let width = CHILD_GATE_RADIUS * 2
    let height = CHILD_GATE_RADIUS * 2

    if (this.gate.component.isRoot()) {
      width = ROOT_GATE_RADIUS * 2
      height = ROOT_GATE_RADIUS * 2
    }

    return { width, height }
  }
}

export { DrawableGate }
