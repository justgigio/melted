import type { DrawableComponent } from '../graphic/DrawableComponent'
import { type IOGate, IOState } from '../io_gate/IOGate'

abstract class Component {
  public inputs: IOGate[] = []
  public outputs: IOGate[] = []
  public components: Component[] = []
  public name: string
  public parent?: Component
  public graphic?: DrawableComponent

  constructor(name: string, parent?: Component) {
    this.name = name
    this.parent = parent
  }

  public setGraphic(graphic: DrawableComponent) {
    this.graphic = graphic
  }

  public isRoot(): boolean {
    return this.parent === undefined
  }

  public start() {
    this.inputs.forEach((gate) => {
      gate.start()
      gate.forceState(IOState.LOW)
    })
  }

  public stop() {
    this.inputs.forEach((gate) => gate.stop())
  }
}

export { Component }
