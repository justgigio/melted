import type { Component } from "./models/Component";
import type { IOGate } from "./models/IOGate";


class Runner {

  static instance?: Runner

  private component?: Component
  private cycleQueue: IOGate[] = []
  private running: boolean = false

  private constructor() {}

  public static getInstance(): Runner {
    if (this.instance === undefined){
      this.instance = new Runner()
    }
    return this.instance
  }

  public runCycle() {
    this.cycleQueue = [...this.component!.inputs]
    this.cycle()
    if (this.running) {
      requestAnimationFrame(() => this.runCycle())
    }
  }

  public setComponent(component: Component) {
    this.stop()
    this.component = component
  }

  public cycle() {
    if (this.cycleQueue.length > 0){
      let newGates: IOGate[] = []
      this.cycleQueue.forEach((gate) => {
        newGates = newGates.concat(gate.run())
      })
      this.cycleQueue = newGates
      setTimeout(() => this.cycle(), 1)
    }
  }

  public run(){
    this.running = true
    this.runCycle()
  }

  public stop(){
    this.cycleQueue = []
    this.running = false
  }

}

export { Runner }
