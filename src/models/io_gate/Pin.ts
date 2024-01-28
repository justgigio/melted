import { Connection } from './Connection'
import type { IOGate } from './IOGate'

class Pin {
  public connections: Connection[] = []
  public gate: IOGate

  constructor(gate: IOGate) {
    this.gate = gate
  }

  public connect(pin: Pin): Connection | undefined {
    const connBs = this.connections.map((conn) => conn.b)
    if (!connBs.includes(pin)) {
      const conn = new Connection(this, pin)

      this.connections.push(conn)
      pin.connect(this)

      return conn
    }
  }

  public disconnect(pin: Pin) {
    const connBs = this.connections.map((conn) => conn.b)
    if (connBs.includes(pin)) {
      const pinIndex = connBs.indexOf(pin)
      this.connections.splice(pinIndex, 1)
      pin.disconnect(this)
    }
  }
}

export { Pin }
