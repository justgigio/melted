import { Component } from "../Component";
import { IOGate, IOState, Pin } from "../IOGate";


class AndIOGate extends IOGate {
  public run(): IOGate[] {
    const inStates: IOState[] = this.in.connections.map((pin: Pin) => pin.gate.getState())

    let state: IOState = IOState.DISCONNECTED

    if (inStates.includes(IOState.HI)) {
      state = IOState.HI
      if (inStates.includes(IOState.LOW)) {
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

  constructor(name: String){
    super(name)
    
    const inputa = new IOGate('a')
    const inputb = new IOGate('b')

    const middleAnd = new AndIOGate('AND')

    const outputa = new IOGate('a')

    inputa.connect(middleAnd)

    middleAnd.connect(outputa)

    this.inputs = [inputa, inputb]

    this.outputs = [outputa]
  }
}

export { And }
