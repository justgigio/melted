import { Component } from "../Component";
import { IOGate } from "../IOGate";
import { And } from "./And";
import { Not } from "./Not";


class NAnd extends Component {
	inputs: IOGate[]
	outputs: IOGate[]
	components: Component[]

	constructor(name: String, parent?: Component) {
		super(name, parent)

		const and = new And('AND', this)
		const not = new Not('NOT', this)

		const inputa = new IOGate('a')
		const inputb = new IOGate('b')

		const outputa = new IOGate('a')

		inputa.connect(and.inputs[0])
		inputb.connect(and.inputs[1])

		and.outputs[0].connect(not.inputs[0])
		not.outputs[0].connect(outputa)

		this.inputs = [inputa, inputb]
		this.outputs = [outputa]
		this.components = [and, not]
	}
}

export { NAnd }
