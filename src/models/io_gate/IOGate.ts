import type { Component } from '../component/Component'
import type { Connection } from './Connection'
import { Pin } from './Pin'

import type { DrawableGate } from '../graphic/DrawableGate'

enum IOState {
  LOW,
  HI,
  DISCONNECTED
}

class IOGate {
  public label: string
  public component: Component
  protected state: IOState = IOState.DISCONNECTED
  private forcedState?: IOState
  protected timeout?: ReturnType<typeof setTimeout>
  public running: boolean = false
  public in: Pin
  public out: Pin
  public graphic?: DrawableGate

  constructor(label: string, component: Component) {
    this.label = label
    this.component = component

    this.in = new Pin(this)
    this.out = new Pin(this)
  }

  public connect(gate: IOGate): Connection | undefined {
    return this.out.connect(gate.in)
  }

  public forceState(state: IOState) {
    this.forcedState = state
  }

  public releaseState() {
    delete this.forcedState
  }

  protected setState(state: IOState) {
    this.state = state
  }

  public getState(): IOState {
    if (this.forcedState !== undefined) {
      return this.forcedState
    }
    return this.state
  }

  public isHIState(): boolean {
    return this.getState() === IOState.HI
  }

  public isLOWState(): boolean {
    return this.getState() === IOState.LOW
  }

  public start() {
    if (!this.running) {
      this.running = true
      this.out.connections.forEach((conn) => conn.b.gate.start())
    }
  }

  public run() {
    if (this.running) {
      const inStates: IOState[] = this.in.connections.map((conn) => conn.b.gate.getState())

      let state: IOState = IOState.DISCONNECTED

      if (inStates.includes(IOState.LOW)) {
        state = IOState.LOW
      }
      if (inStates.includes(IOState.HI)) {
        state = IOState.HI
      }

      this.setState(state)

      clearTimeout(this.timeout)

      this.timeout = setTimeout(() => {
        this.out.connections.forEach((conn) => conn.b.gate.run())
      }, 1)
    }
  }

  public stop() {
    if (this.running) {
      clearTimeout(this.timeout)
      this.running = false
      this.out.connections.forEach((conn) => conn.b.gate.stop())
    }
  }

  public setGraphic(graphic: DrawableGate) {
    this.graphic = graphic
  }
}

export { IOGate, IOState }
