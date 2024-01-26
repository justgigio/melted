import { Component } from "./Component"
import { CHILD_GATE_RADIUS, CONNECTION_STROKE_WIDTH, GATE_DEFAULT_COLOR, GATE_DISCONNECTED_COLOR, GATE_LOW_STATE_COLOR, ROOT_GATE_RADIUS, STROKE_COLOR } from "./constants"


enum IOState {
  LOW,
  HI,
  DISCONNECTED,
}


class Pin {
  public connections: Connection[] = []
  public gate: IOGate

  constructor(gate: IOGate) {
    this.gate = gate
  }

  public connect(pin: Pin): Connection | undefined {
    const connBs = this.connections.map(conn => conn.b)
    if (!connBs.includes(pin)) {
      const conn = new Connection(this, pin)

      this.connections.push(conn)
      pin.connect(this)

      return conn
    }
  }

  public disconnect(pin: Pin) {
    const connBs = this.connections.map(conn => conn.b)
    if (connBs.includes(pin)) {
      const pinIndex = connBs.indexOf(pin)
      this.connections.splice(pinIndex, 1)
      pin.disconnect(this)
    }
  }
}


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


class DrawableConnection {
  public connection: Connection
  public strokeWidth: number = CONNECTION_STROKE_WIDTH
  public middlePoints: Position[] = []
  public startPoint: Position
  public endPoint: Position

  constructor(connection: Connection) {
    connection.setGraphic(this)
    this.connection = connection

    this.startPoint = connection.a.gate.graphic!.position
    this.endPoint = connection.b.gate.graphic!.position
  }

  public getPoints(): number[] {
    const points = [this.startPoint.x, this.startPoint.y]

    this.middlePoints.forEach(pos => {
      points.push(pos.x, pos.y)
    })

    points.push(this.endPoint.x, this.endPoint.y)
    return points
  }

  public getColor(): string {
    return this.connection.a.gate.graphic!.getColor()
  }

  public setPath(path: Position[]) {
    this.middlePoints = path
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

    return {width, height}
  }
}


class IOGate {
  public label: string
  public component: Component
  protected state: IOState = IOState.DISCONNECTED
  private forcedState?: IOState
  private timeout?: ReturnType<typeof setTimeout>
  public running: boolean = false
  public in: Pin
  public out: Pin
  public graphic?: DrawableGate

  constructor(label:string, component: Component) {
    this.label = label
    this.component = component

    this.in = new Pin(this)
    this.out = new Pin(this)
  }

  public connect(gate: IOGate): Connection | undefined {
    return this.out.connect(gate.in)
  }

  public forceState(state : IOState) {
    this.forcedState = state
    this.run()
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

  public isHIState(): boolean {
    return this.getState() === IOState.HI
  }

  public isLOWState(): boolean {
    return this.getState() === IOState.LOW
  }

  public start() {
    if (!this.running) {
      this.running = true
      this.out.connections.forEach(conn => conn.b.gate.start())
    }
  }

  public run() {
    if (this.running) {

      const inStates: IOState[] = this.in.connections.map(conn => conn.b.gate.getState())

  
      let state: IOState = IOState.DISCONNECTED
  
      if (inStates.includes(IOState.LOW)) {
        state = IOState.LOW 
      }
      if (inStates.includes(IOState.HI)) {
        state = IOState.HI
      }
  
      this.setState(state)
  
      clearTimeout(this.timeout)
      this.running = true
      this.timeout = setTimeout(() => {
        this.out.connections.forEach(conn => conn.b.gate.run())
      }, 1)
    }
  }

  public stop() {
    if (this.running) {
      clearTimeout(this.timeout)
      this.running = false
      this.out.connections.forEach(conn => conn.b.gate.stop())
    }
  }

  public setGraphic(graphic: DrawableGate) {
    this.graphic = graphic
  }
}

export { IOGate, DrawableGate, DrawableConnection, IOState, Pin }
export type { Connection }
