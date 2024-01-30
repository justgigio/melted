import { describe, expect, it } from 'vitest'
import pinFactory from '../../../factories/models/io_gate/PinFactory'


describe('Pin', () => {

  it('Connect to other Pin', () => {
    const pinA = pinFactory.build()
    const pinB = pinFactory.build()

    pinA.connect(pinB)

    const connectionAB = pinA.connections[0]
    const connectionBA = pinB.connections[0]

    expect(connectionAB.a).toBe(pinA)
    expect(connectionAB.b).toBe(pinB)
    expect(connectionBA.a).toBe(pinB)
    expect(connectionBA.b).toBe(pinA)
  })

  it('Disconnect to other Pin', () => {
    const pinA = pinFactory.build()
    const pinB = pinFactory.build()
    const pinC = pinFactory.build()

    pinA.connect(pinB)
    pinA.connect(pinC)

    const connectionAB = pinA.connections[0]
    const connectionAC = pinA.connections[1]
    const connectionBA = pinB.connections[0]
    const connectionCA = pinC.connections[0]

    expect(connectionAB.a).toBe(pinA)
    expect(connectionAC.a).toBe(pinA)

    expect(connectionAB.b).toBe(pinB)
    expect(connectionAC.b).toBe(pinC)

    expect(connectionBA.a).toBe(pinB)
    expect(connectionBA.b).toBe(pinA)

    expect(connectionCA.a).toBe(pinC)
    expect(connectionCA.b).toBe(pinA)

    pinB.disconnect(pinA)

    expect(pinA.connections.length).toBe(1)
    expect(pinA.connections[0].a).toStrictEqual(pinC)
  })
})
