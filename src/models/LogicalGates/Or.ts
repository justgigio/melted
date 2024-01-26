import { Component, DrawableComponent } from "../Component";
import { DrawableConnection, DrawableGate, IOGate } from "../IOGate";


class Or extends Component {
  inputs: IOGate[]
  outputs: IOGate[]
  components: Component[] = []

  constructor(name: string, parent?: Component){
    super(name, parent)

    const inputa = new IOGate('ina', this)
    const inputb = new IOGate('inb', this)

    const outputa = new IOGate('out', this)

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

export { Or }
