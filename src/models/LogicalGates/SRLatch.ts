import { Component, DrawableComponent } from '../Component'
import { DrawableConnection, DrawableGate, IOGate } from '../IOGate'
import { And } from './And'
import { Not } from './Not'
import { Or } from './Or'

class SRLatch extends Component {
  inputs: IOGate[]
  outputs: IOGate[]
  components: Component[]

  constructor(name: string, parent?: Component) {
    super(name, parent)

    const and = new And('AND', this)

    const not = new Not('NOT', this)

    const or = new Or('OR', this)

    const inputa = new IOGate('set', this)
    const inputb = new IOGate('reset', this)

    const outputa = new IOGate('out', this)

    const conn1 = inputa.connect(or.inputs[1])
    const conn2 = inputb.connect(not.inputs[0])

    const conn3 = or.outputs[0].connect(and.inputs[0])
    const conn4 = not.outputs[0].connect(and.inputs[1])

    const conn5 = and.outputs[0].connect(or.inputs[0])
    const conn6 = and.outputs[0].connect(outputa)

    this.inputs = [inputa, inputb]
    this.outputs = [outputa]
    this.components = [and, not, or]

    new DrawableGate(inputa)
    new DrawableGate(inputb)
    new DrawableGate(outputa)

    const xorDC = new DrawableComponent(this)
    const andDC = new DrawableComponent(and)
    const notDC = new DrawableComponent(not)
    const orDC = new DrawableComponent(or)

    const { x: rootX, y: rootY } = xorDC.position
    const { width: rootW, height: rootH } = xorDC.size
    const { width: firstW, height: firstH } = andDC.size
    const { width: secondW, height: secondH } = notDC.size

    const { width: thirdW, height: thirdH } = orDC.size

    const firstY = rootY + rootH / 3 - firstH / 2
    const secondY = rootY + (rootH * 2) / 3 - secondH / 2
    const thirdY = rootY + rootH / 2 - thirdH / 2

    const firstX = rootX + rootW / 3 - firstW / 2
    const secondX = rootX + rootW / 3 - secondW / 2
    const thirdX = rootX + (rootW * 2) / 3 - thirdW / 2

    const firstPos = { x: firstX, y: firstY }
    const secondPos = { x: secondX, y: secondY }
    const thirdPos = { x: thirdX, y: thirdY }

    orDC.setPosition(firstPos)
    notDC.setPosition(secondPos)
    andDC.setPosition(thirdPos)

    new DrawableConnection(conn1!)
    new DrawableConnection(conn2!)
    new DrawableConnection(conn3!)
    new DrawableConnection(conn4!)
    const conn5DC = new DrawableConnection(conn5!)
    new DrawableConnection(conn6!)

    const { startPoint } = conn5DC

    const p1: Position = { x: startPoint.x + 20, y: startPoint.y - 50 }
    const p2: Position = { x: p1.x - 200, y: p1.y - 80 }
    const p3: Position = { x: p2.x - 200, y: p2.y }

    conn5DC.setPath([p1, p2, p3])
  }
}

export { SRLatch }
