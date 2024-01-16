import { Component } from "../Component";
import { IOGate, IOState } from "../IOGate";


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

  constructor(name: String){
    super(name)

    const inputa = new IOGate('a')

    const middleNot = new NotIOGate('!')

    const outputa = new IOGate('a')

    inputa.connect(middleNot)

    middleNot.connect(outputa)

    this.inputs = [inputa]

    this.outputs = [outputa]
  }
}

export { Not }
