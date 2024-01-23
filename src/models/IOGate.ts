import { Component } from "./Component"
import { CHILD_GATE_RADIUS, GATE_DEFAULT_COLOR, GATE_DISCONNECTED_COLOR, GATE_LOW_STATE_COLOR, ROOT_GATE_RADIUS, STROKE_COLOR } from "./constants"


enum IOState {
  LOW,
  HI,
  DISCONNECTED,
}


class Pin {
  public connections: Pin[] = []
  private value: Number = 1
  public gate: IOGate

  constructor(gate: IOGate) {
    this.gate = gate
  }

  public connect(pin: Pin) {
    if (!this.connections.includes(pin)) {
      this.connections.push(pin)
      pin.connect(this)
    }
  }

  public disconnect(pin: Pin) {
    if (this.connections.includes(pin)) {
      const pinIndex = this.connections.indexOf(pin)
      this.connections.splice(pinIndex, 1)
      pin.disconnect(this)
    }
  }
}


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
      this.position = {x: 0, y: 0}
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
    switch (this.gate.getState()) {
      case IOState.LOW:
        return this.lowStateColor
      case IOState.HI:
        return this.getHighStateColor()
    }
    return this.diconnectedColor
  }

  private getHighStateColor(): string {
    const onInputs = this.gate.in.connections.filter(pin => pin.gate.getState() === IOState.HI)

    if (onInputs.length === 1) {
      return onInputs[0].gate.graphic!.getHighStateColor()
    }
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

    return {width, height}
  }
}


class IOGate {
  public label: string
  public component: Component
  protected state: IOState = IOState.DISCONNECTED
  private forcedState?: IOState
  public in: Pin
  public out: Pin
  public graphic?: DrawableGate

  constructor(label:string, component: Component) {
    this.label = label
    this.component = component

    this.in = new Pin(this)
    this.out = new Pin(this)
  }

  public connect(gate: IOGate) {
    this.out.connect(gate.in)
  }

  public forceState(state : IOState) {
    this.forcedState = state
  }

  public releaseState() {
    delete this.forcedState
  }

  protected setState(state: IOState) {
    this.state = state
  }

  public getState(): IOState {
    if (this.forcedState !== undefined) {
      return this.forcedState
    }
    return this.state
  }

  public run(): IOGate[] {
    const inStates: IOState[] = this.in.connections.map((pin: Pin) => pin.gate.getState())

    let state: IOState = IOState.DISCONNECTED

    if (inStates.includes(IOState.LOW)) {
      state = IOState.LOW 
    }
    if (inStates.includes(IOState.HI)) {
      state = IOState.HI
    }

    this.setState(state)

    return this.out.connections.map((pin: Pin) => pin.gate)
  }

  public setGraphic(graphic: DrawableGate) {
    this.graphic = graphic
  }
}

export { IOGate, DrawableGate, IOState, Pin }
