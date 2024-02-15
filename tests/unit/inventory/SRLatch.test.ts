import { describe, it, expect } from 'vitest'
import { SRLatch } from '@/inventory/SRLatch'
import { IOState } from '@/models/io_gate/IOGate'

describe('SR Latch', () => {

  it('starts LOW', async () => {
    const and = new SRLatch('SR Latch')

    and.start()
    
    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.LOW)

        resolve(true)
      }, 50)

    })
  })

  it('RESET keeps LOW', async () => {
    const and = new SRLatch('SR Latch')

    and.start()
    
    and.inputs[1].forceState(IOState.HI)

    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.LOW)

        resolve(true)
      }, 50)

    })
  })

  it('SET changes to HI', async () => {
    const and = new SRLatch('SR Latch')
    
    and.start()

    and.inputs[0].forceState(IOState.HI)

    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 50)

    })
  })

  it('keeps HI after SET', async () => {
    const and = new SRLatch('SR Latch')

    and.start()

    and.inputs[0].forceState(IOState.HI)

    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 50)

    })

    and.inputs[0].forceState(IOState.LOW)

    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 50)

    })
  })

  it('resets to LOW after RESET', async () => {
    const and = new SRLatch('SR Latch')

    and.start()

    and.inputs[0].forceState(IOState.HI)

    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 50)

    })

    and.inputs[0].forceState(IOState.LOW)

    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 50)

    })

    and.inputs[1].forceState(IOState.HI)

    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.LOW)

        resolve(true)
      }, 50)

    })
  })

})