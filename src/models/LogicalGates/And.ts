import { Component, DrawableComponent } from "../Component";
import { IOGate, IOState, Pin } from "../IOGate";


class AndIOGate extends IOGate {
  public run(): IOGate[] {
    const inStates: IOState[] = this.in.connections.map((pin: Pin) => pin.gate.getState())

    let state: IOState = IOState.DISCONNECTED

    const hasHI = inStates.includes(IOState.HI)
    const hasLOW = inStates.includes(IOState.LOW)
    const hasDisc = inStates.includes(IOState.DISCONNECTED)

    if (hasHI || hasLOW) {
      state = IOState.HI

      if (hasDisc || hasLOW) {
        state = IOState.LOW
      }
    }

    this.setState(state)

    return this.out.connections.map((pin: Pin) => pin.gate)
  }
}


class And extends Component {
  inputs: IOGate[]
  outputs: IOGate[]
  components: Component[] = []

  constructor(name: string, parent?: Component){
    super(name, parent)
    
    const inputa = new IOGate('a', this)
    const inputb = new IOGate('b', this)

    const outputa = new AndIOGate('a', this)

    inputa.connect(outputa)
    inputb.connect(outputa)

    this.inputs = [inputa, inputb]

    this.outputs = [outputa]

    new DrawableComponent(this)
  }
}

export { And }
