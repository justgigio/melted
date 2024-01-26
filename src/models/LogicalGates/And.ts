import { Component, DrawableComponent } from "../Component";
import { DrawableConnection, DrawableGate, IOGate, IOState, Pin } from "../IOGate";


class AndIOGate extends IOGate {
  public run() {
    const inStates: IOState[] = this.in.connections.map(conn => conn.b.gate.getState())

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

    this.out.connections.forEach(conn => setTimeout(() => conn.b.gate.run(), 1))
  }
}


class And extends Component {
  inputs: IOGate[]
  outputs: IOGate[]
  components: Component[] = []

  constructor(name: string, parent?: Component){
    super(name, parent)
    
    const inputa = new IOGate('ina', this)
    const inputb = new IOGate('inb', this)

    const outputa = new AndIOGate('out', this)

    const connAA = inputa.connect(outputa)
    const connAB = inputb.connect(outputa)

    this.inputs = [inputa, inputb]

    this.outputs = [outputa]

    new DrawableGate(inputa)
		new DrawableGate(inputb)
		new DrawableGate(outputa)

    new DrawableComponent(this)

    new DrawableConnection(connAA!)
    new DrawableConnection(connAB!)
  }
}

export { And }
