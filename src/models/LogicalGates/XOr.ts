import { Component, DrawableComponent } from "../Component";
import { DrawableConnection, DrawableGate, IOGate } from "../IOGate";
import { And } from "./And";
import { Not } from "./Not";
import { Or } from "./Or";


class XOr extends Component {
	inputs: IOGate[]
	outputs: IOGate[]
	components: Component[]

	constructor(name: string, parent?: Component) {
		super(name, parent)

		const anda = new And('AND', this)
		const andb = new And('AND', this)
 
		const nota = new Not('NOT', this)
		const notb = new Not('NOT', this)

		const or = new Or('OR', this)

		const inputa = new IOGate('ina', this)
		const inputb = new IOGate('inb', this)

		const outputa = new IOGate('out', this)

		const conn1 = inputa.connect(anda.inputs[0])
		const conn2 = inputb.connect(nota.inputs[0])
		const conn3 = nota.outputs[0].connect(anda.inputs[1])

		const conn4 = inputa.connect(notb.inputs[0])
		const conn5 = notb.outputs[0].connect(andb.inputs[0])
		const conn6 = inputb.connect(andb.inputs[1])

		const conn7 = anda.outputs[0].connect(or.inputs[0])
		const conn8 = andb.outputs[0].connect(or.inputs[1])

		const conn9 = or.outputs[0].connect(outputa)

		this.inputs = [inputa, inputb]
		this.outputs = [outputa]
		this.components = [anda, andb, nota, notb, or]

		new DrawableGate(inputa)
		new DrawableGate(inputb)
		new DrawableGate(outputa)

		const xorDC = new DrawableComponent(this)
		const andADC = new DrawableComponent(anda)
		const andBDC = new DrawableComponent(andb)
		const notADC = new DrawableComponent(nota)
		const notBDC = new DrawableComponent(notb)
		const orDC = new DrawableComponent(or)


		const {x: rootX, y: rootY} = xorDC.position
		const {width: rootW, height: rootH} = xorDC.size
		const {width: firstW, height: firstH} = andADC.size
		const {width: secondW, height: secondH} = notADC.size

		const {width: thirdW, height: thirdH} = andBDC.size
		const {width: fourthW, height: fourthH} = notBDC.size

		const {width: fifthW, height: fifthH} = orDC.size
		
		const firstY = rootY + (rootH / 5) - (firstH / 2)
		const secondY = rootY + (rootH * 3 / 8) - (secondH / 2)
		const thirdY = rootY + (rootH * 5 / 8) - (thirdH / 2)
		const fourthY = rootY + (rootH * 4 / 5) - (fourthH / 2)
		const fifthY = rootY + (rootH / 2) - (fifthH / 2)
		
		const firstX = rootX + (rootW / 2) - (firstW / 2)
		const secondX = rootX + (rootW / 4) - (secondW / 2)
		const thirdX = rootX + (rootW / 4) - (thirdW / 2)
		const fourthX = rootX + (rootW / 2) - (fourthW / 2)
		const fifthX = rootX + (rootW * 3 / 4) - (fifthW / 2)
		
		
		const firstPos = {x: firstX, y: firstY}
		const secondPos = {x: secondX, y: secondY}
		const thirdPos = {x: thirdX, y: thirdY}
		const fourthPos = {x: fourthX, y: fourthY}
		const fifthPos = {x: fifthX, y: fifthY}

		andADC.setPosition(firstPos)
		notADC.setPosition(secondPos)
		notBDC.setPosition(thirdPos)
		andBDC.setPosition(fourthPos)
		orDC.setPosition(fifthPos)

		new DrawableConnection(conn1!)
		new DrawableConnection(conn2!)
		new DrawableConnection(conn3!)
		new DrawableConnection(conn4!)
		new DrawableConnection(conn5!)
		new DrawableConnection(conn6!)
		new DrawableConnection(conn7!)
		new DrawableConnection(conn8!)
		new DrawableConnection(conn9!)
	}
}

export { XOr }
