import { Component, DrawableComponent } from "../Component";
import { DrawableConnection, DrawableGate, IOGate } from "../IOGate";
import { XOr } from "./XOr";
import { And } from "./And";


class Test extends Component {
	inputs: IOGate[]
	outputs: IOGate[]
	components: Component[]

	constructor(name: string, parent?: Component) {
		super(name, parent)

		const xora = new XOr('XOR', this)
		const xorb = new XOr('XOR', this)
    const xorc = new XOr('XOR', this)
 
		const and = new And('AND', this)

		const inputa = new IOGate('ina', this)
		const inputb = new IOGate('inb', this)
    const inputc = new IOGate('inc', this)
		const inputd = new IOGate('ind', this)

		const outputa = new IOGate('outa', this)
    const outputb = new IOGate('outb', this)

		const conn1 = inputa.connect(xora.inputs[0])
		const conn2 = inputb.connect(xora.inputs[1])

    const conn3 = inputc.connect(xorb.inputs[0])
		const conn4 = inputd.connect(xorb.inputs[1])

		const conn5 = xora.outputs[0].connect(xorc.inputs[0])
    const conn6 = xorb.outputs[0].connect(xorc.inputs[1])

    const conn7 = xora.outputs[0].connect(and.inputs[0])
    const conn8 = xorb.outputs[0].connect(and.inputs[1])

		const conn9 = xorc.outputs[0].connect(outputa)
    const conn10 = and.outputs[0].connect(outputb)

    const conn11 = xorc.outputs[0].connect(xorb.inputs[1])

		this.inputs = [inputa, inputb, inputc, inputd]
		this.outputs = [outputa, outputb]
		this.components = [xora, xorb, xorc, and]

		new DrawableGate(inputa)
    new DrawableGate(inputb)
    new DrawableGate(inputc)
		new DrawableGate(inputd)
		new DrawableGate(outputa)
    new DrawableGate(outputb)

		const xorDC = new DrawableComponent(this)
		const xorADC = new DrawableComponent(xora)
    const xorBDC = new DrawableComponent(xorb)
    const xorCDC = new DrawableComponent(xorc)
		const andDC = new DrawableComponent(and)

		const {x: rootX, y: rootY} = xorDC.position
		const {width: rootW, height: rootH} = xorDC.size
		const {width: firstW, height: firstH} = xorADC.size
		const {width: secondW, height: secondH} = xorBDC.size

		const {width: thirdW, height: thirdH} = xorCDC.size
		const {width: fourthW, height: fourthH} = andDC.size
		
		const firstY = rootY + (rootH / 3) - (firstH / 2)
		const secondY = rootY + (rootH * 2 / 3) - (secondH / 2)
		const thirdY = rootY + (rootH / 3) - (thirdH / 2)
		const fourthY = rootY + (rootH * 2 / 3) - (fourthH / 2)
		
		const firstX = rootX + (rootW / 3) - (firstW / 2)
		const secondX = rootX + (rootW / 3) - (secondW / 2)
		const thirdX = rootX + (rootW * 2 / 3) - (thirdW / 2)
		const fourthX = rootX + (rootW * 2 / 3) - (fourthW / 2)
		
		
		const firstPos = {x: firstX, y: firstY}
		const secondPos = {x: secondX, y: secondY}
		const thirdPos = {x: thirdX, y: thirdY}
		const fourthPos = {x: fourthX, y: fourthY}

		xorADC.setPosition(firstPos)
		xorBDC.setPosition(secondPos)
		xorCDC.setPosition(thirdPos)
		andDC.setPosition(fourthPos)

		new DrawableConnection(conn1!)
		new DrawableConnection(conn2!)
		new DrawableConnection(conn3!)
		new DrawableConnection(conn4!)
		new DrawableConnection(conn5!)
		new DrawableConnection(conn6!)
		new DrawableConnection(conn7!)
		new DrawableConnection(conn8!)
		new DrawableConnection(conn9!)
		new DrawableConnection(conn10!)
		new DrawableConnection(conn11!)
	}
}

export { Test }
