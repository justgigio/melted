import { Component } from "../Component";
import { IOGate } from "../IOGate";


class Or extends Component {
  inputs: IOGate[]
  outputs: IOGate[]
  components: Component[] = []

  constructor(name: String){
    super(name)

    const inputa = new IOGate('a')
    const inputb = new IOGate('b')

    const outputa = new IOGate('a')

    inputa.connect(outputa)
    inputb.connect(outputa)

    this.inputs = [inputa, inputb]

    this.outputs = [outputa]
  }
}

export { Or }
