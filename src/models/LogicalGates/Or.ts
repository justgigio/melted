import { Component } from "../Component";
import { IOGate } from "../IOGate";


class Or extends Component {
  inputs: IOGate[]
  outputs: IOGate[]
  components: Component[] = []

  constructor(name: string, parent?: Component){
    super(name, parent)

    const inputa = new IOGate('a', this)
    const inputb = new IOGate('b', this)

    const outputa = new IOGate('a', this)

    inputa.connect(outputa)
    inputb.connect(outputa)

    this.inputs = [inputa, inputb]

    this.outputs = [outputa]
  }
}

export { Or }
