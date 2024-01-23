import { Component, DrawableComponent } from "../Component";
import { IOGate } from "../IOGate";
import { And } from "./And";
import { Not } from "./Not";

import { CHILD_COMPONENT_SIZE } from "../constants";


class NAnd extends Component {
	inputs: IOGate[]
	outputs: IOGate[]
	components: Component[]

	constructor(name: string, parent?: Component) {
		super(name, parent)

		const and = new And('AND', this)
		const not = new Not('NOT', this)

		const inputa = new IOGate('a', this)
		const inputb = new IOGate('b', this)

		const outputa = new IOGate('a', this)

		inputa.connect(and.inputs[0])
		inputb.connect(and.inputs[1])

		and.outputs[0].connect(not.inputs[0])
		not.outputs[0].connect(outputa)

		this.inputs = [inputa, inputb]
		this.outputs = [outputa]
		this.components = [and, not]

		const nandDC = new DrawableComponent(this)
		const andDC = new DrawableComponent(and)
		const notDC = new DrawableComponent(not)

		const {x: rootX, y: rootY} = nandDC.position
		const {width: rootW, height: rootH} = nandDC.size
		const {width: firstW, height: firstH} = andDC.size
		const {width: secondW, height: secondH} = notDC.size
		
		const firstY = rootY + ((rootH - firstH) / 2)
		const secondY = rootY + ((rootH - secondH) / 2)
		
		const firstX = rootX + (rootW / 3) - (firstW / 2)
		const secondX = rootX + (rootW * 2 / 3) - (secondW / 2)
		
		const firstPos = {x: firstX, y: firstY}
		const secondPos = {x: secondX, y: secondY}

		andDC.setPosition(firstPos)
		notDC.setPosition(secondPos)

	}
}

export { NAnd }
