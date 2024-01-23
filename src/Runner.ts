import type { Component } from "./models/Component";
import type { IOGate } from "./models/IOGate";


class Runner {

  private rootComponent: Component
  private clock: number = 1000 // Hz
  private interval?: ReturnType<typeof setInterval>

  constructor(rootComponent: Component, clock?: number) {
    this.rootComponent = rootComponent
    if (clock !== undefined) {
      this.clock = clock
    }
  }

  public* tick() {
    let gates: IOGate[] = this.rootComponent.inputs
    
    while (gates.length > 0) {
      console.log(gates.length)
      let newGates: IOGate[] = []

      gates.forEach((gate) => {
        newGates = newGates.concat(gate.run())
      })

      gates = newGates
      yield true
    }
  }

  public run(){
    let tick = this.tick()
    this.interval = setInterval(() => {
      const res = tick.next()
      if (res.value === undefined) {
        tick = this.tick()
      }
    }, 1)
  }

  public stop(){
    clearInterval(this.interval)
  }

}

export { Runner }
