import { Component } from '@/models/component/Component'
import { IOGate, IOState } from '@/models/io_gate/IOGate'

import { DrawableComponent } from '@/models/graphic/DrawableComponent'
import { DrawableConnection } from '@/models/graphic/DrawableConnection'
import { DrawableGate } from '@/models/graphic/DrawableGate'

class AndIOGate extends IOGate {
  protected calculateState(inStates: IOState[]): IOState {
    let state: IOState = IOState.DISCONNECTED

    const hasHI = inStates.includes(IOState.HI)
    const hasLOW = inStates.includes(IOState.LOW)
    const hasDisc = inStates.includes(IOState.DISCONNECTED)

    if (hasHI || hasLOW) {
      state = IOState.HI

      if (hasDisc || hasLOW) {
        state = IOState.LOW
      }
    }

    return state
  }
}

class And extends Component {
  inputs: IOGate[]
  outputs: IOGate[]
  components: Component[] = []

  constructor(name: string, parent?: Component) {
    super(name, parent)

    const inputa = new IOGate('ina', this)
    const inputb = new IOGate('inb', this)

    const outputa = new AndIOGate('out', this)

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

export { And }
