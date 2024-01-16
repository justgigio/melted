import { Component } from "../Component";
import { IOGate } from "../IOGate";
import { And } from "./And";
import { Not } from "./Not";
import { Or } from "./Or";


class XOr extends Component {
	inputs: IOGate[]
	outputs: IOGate[]
	components: Component[]

	constructor(name: String) {
		super(name)

		const anda = new And('AND')
		const andb = new And('AND')
 
		const nota = new Not('NOT')
		const notb = new Not('NOT')

		const or = new Or('OR')

		const inputa = new IOGate('a')
		const inputb = new IOGate('b')

		const outputa = new IOGate('a')

		inputa.connect(anda.inputs[0])
		inputb.connect(nota.inputs[0])
		nota.outputs[0].connect(anda.inputs[1])

		inputa.connect(notb.inputs[0])
		notb.outputs[0].connect(andb.inputs[0])
		inputb.connect(andb.inputs[1])

		anda.outputs[0].connect(or.inputs[0])
		andb.outputs[0].connect(or.inputs[1])

		or.outputs[0].connect(outputa)

		this.inputs = [inputa, inputb]
		this.outputs = [outputa]
		this.components = [anda, andb, nota, notb, or]
	}
}

export { XOr }
