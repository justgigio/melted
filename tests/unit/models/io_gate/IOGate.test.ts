import { describe, expect, it } from 'vitest'
import iOGAteFactory from '../../../factories/models/io_gate/IOGateFactory'
import { IOState } from '@/models/io_gate/IOGate'

describe('IOGate', () => {
  it('connect to other gate', () => {
    const gateA = iOGAteFactory.build()
    const gateB = iOGAteFactory.build()

    gateA.connect(gateB)

    expect(gateA.out.connections[0].b).toBe(gateB.in)
  })

  it('forces state',async () => {
    const gateA = iOGAteFactory.build()
    const gateB = iOGAteFactory.build()

    gateA.connect(gateB)

    expect(gateA.out.connections[0].b).toBe(gateB.in)
    expect(gateB.getState()).toBe(IOState.DISCONNECTED)

    gateA.forceState(IOState.HI)

    expect(gateA.getState()).toBe(IOState.HI)

    gateA.start()
    gateA.run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(gateB.getState()).toBe(IOState.HI)

        gateB.forceState(IOState.LOW)

        expect(gateB.getState()).toBe(IOState.LOW)

        resolve(true)
      }, 50)

    })

  })


})
