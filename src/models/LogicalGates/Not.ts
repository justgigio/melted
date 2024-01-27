import { Component, DrawableComponent } from '../Component'
import { DrawableConnection, DrawableGate, IOGate, IOState } from '../IOGate'

class NotIOGate extends IOGate {
  protected setState(state: IOState): void {
    if (state === IOState.HI) {
      this.state = IOState.LOW
    } else if (state === IOState.LOW) {
      this.state = IOState.HI
    } else if (state === IOState.DISCONNECTED) {
      this.state = IOState.DISCONNECTED
    }
  }
}

class Not extends Component {
  inputs: IOGate[]
  outputs: IOGate[]
  components: Component[] = []

  constructor(name: string, parent?: Component) {
    super(name, parent)

    const inputa = new IOGate('in', this)

    const outputa = new NotIOGate('out', this)

    const connAB = inputa.connect(outputa)

    this.inputs = [inputa]

    this.outputs = [outputa]

    new DrawableGate(inputa)
    new DrawableGate(outputa)

    new DrawableComponent(this)

    new DrawableConnection(connAB!)
  }
}

export { Not }
