import { describe, expect, it } from 'vitest'
import iOGateFactory from '../../../factories/models/io_gate/IOGateFactory'
import drawableGateFactory from '../../../factories/models/graphic/DrawableGateFactory'
import { IOState } from '@/models/io_gate/IOGate'

describe('IOGate', () => {
  it('connect to other gate', () => {
    const gateA = iOGateFactory.build()
    const gateB = iOGateFactory.build()

    gateA.connect(gateB)

    expect(gateA.out.connections[0].b).toBe(gateB.in)
  })

  it('forces state',async () => {
    const gateA = iOGateFactory.build()
    const gateB = iOGateFactory.build()

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
      }, 5)

    })

  })

  it('releases state', () => {
    const gateA = iOGateFactory.build()

    expect(gateA.getState()).toBe(IOState.DISCONNECTED)

    gateA.forceState(IOState.HI)

    expect(gateA.getState()).toBe(IOState.HI)

    gateA.releaseState()
    
    expect(gateA.getState()).toBe(IOState.DISCONNECTED)

  })

  it('checks HI state', () => {
    const gateA = iOGateFactory.build()

    expect(gateA.getState()).toBe(IOState.DISCONNECTED)

    gateA.forceState(IOState.HI)

    expect(gateA.isHIState()).toBeTruthy()
    expect(gateA.isLOWState()).toBeFalsy()

  })

  it('checks LOW state', () => {
    const gateA = iOGateFactory.build()

    expect(gateA.getState()).toBe(IOState.DISCONNECTED)

    gateA.forceState(IOState.LOW)

    expect(gateA.isLOWState()).toBeTruthy()
    expect(gateA.isHIState()).toBeFalsy()

  })

  it('starts', () => {
    const gateA = iOGateFactory.build()
    const gateB = iOGateFactory.build()
    const gateC = iOGateFactory.build()

    expect(gateA.running).toBeFalsy()
    expect(gateB.running).toBeFalsy()
    expect(gateC.running).toBeFalsy()

    gateA.connect(gateB)
    gateB.connect(gateC)

    expect(gateA.out.connections[0].b).toBe(gateB.in)
    expect(gateB.out.connections[0].b).toBe(gateC.in)

    gateA.start()

    expect(gateA.running).toBeTruthy()
    expect(gateB.running).toBeTruthy()
    expect(gateC.running).toBeTruthy()

  })

  it('runs', async () => {
    const gateA = iOGateFactory.build()
    const gateB = iOGateFactory.build()
    const gateC = iOGateFactory.build()

    expect(gateA.running).toBeFalsy()
    expect(gateB.running).toBeFalsy()
    expect(gateC.running).toBeFalsy()

    expect(gateA.getState()).toBe(IOState.DISCONNECTED)
    expect(gateB.getState()).toBe(IOState.DISCONNECTED)
    expect(gateC.getState()).toBe(IOState.DISCONNECTED)

    gateA.connect(gateB)
    gateB.connect(gateC)

    expect(gateA.out.connections[0].b).toBe(gateB.in)
    expect(gateB.out.connections[0].b).toBe(gateC.in)

    gateA.forceState(IOState.LOW)

    gateA.run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(gateB.getState()).toBe(IOState.DISCONNECTED)
        expect(gateC.getState()).toBe(IOState.DISCONNECTED)

        resolve(true)
      }, 5)

    })

    gateA.start()
    gateA.run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(gateB.getState()).toBe(IOState.LOW)
        expect(gateC.getState()).toBe(IOState.LOW)

        resolve(true)
      }, 5)

    })

    gateA.forceState(IOState.HI)
    gateA.run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(gateB.getState()).toBe(IOState.HI)
        expect(gateC.getState()).toBe(IOState.HI)

        resolve(true)
      }, 5)

    })

  })

  it('stops', async () => {
    const gateA = iOGateFactory.build()
    const gateB = iOGateFactory.build()
    const gateC = iOGateFactory.build()
    
    expect(gateA.getState()).toBe(IOState.DISCONNECTED)
    expect(gateB.getState()).toBe(IOState.DISCONNECTED)
    expect(gateC.getState()).toBe(IOState.DISCONNECTED)
    
    gateA.connect(gateB)
    gateB.connect(gateC)
    
    expect(gateA.out.connections[0].b).toBe(gateB.in)
    expect(gateB.out.connections[0].b).toBe(gateC.in)
    
    gateA.forceState(IOState.LOW)
    
    gateA.start()
    gateA.run()

    expect(gateA.running).toBeTruthy()
    expect(gateB.running).toBeTruthy()
    expect(gateC.running).toBeTruthy()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(gateB.getState()).toBe(IOState.LOW)
        expect(gateC.getState()).toBe(IOState.LOW)

        resolve(true)
      }, 5)

    })

    gateA.stop()

    expect(gateA.running).toBeFalsy()
    expect(gateB.running).toBeFalsy()
    expect(gateC.running).toBeFalsy()

    gateA.forceState(IOState.HI)
    gateA.run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(gateB.getState()).toBe(IOState.LOW)
        expect(gateC.getState()).toBe(IOState.LOW)

        resolve(true)
      }, 5)

    })

  })

  it('sets graphic', () => {
    const gateA = iOGateFactory.build()
    const dGate = drawableGateFactory.build({}, {associations: {gate: gateA}})

    expect(gateA.graphic).toBe(dGate)
  })

})
