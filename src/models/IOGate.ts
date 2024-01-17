enum IOState {
  HI,
  LOW,
  DISCONNECTED
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


class IOGate {
  public label: string
  protected state: IOState = IOState.DISCONNECTED
  private forcedState?: IOState
  public in: Pin
  public out: Pin

  constructor(label:string) {
    this.label = label

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
}

export { IOGate, IOState, Pin }