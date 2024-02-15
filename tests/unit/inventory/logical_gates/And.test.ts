import { describe, it, expect } from 'vitest'
import { And } from '@/inventory/logical_gates/And'
import { IOState } from '@/models/io_gate/IOGate'

describe('AND', () => {

  it('False AND False => False', async () => {
    const and = new And('AND')

    and.start()
    
    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.LOW)

        resolve(true)
      }, 5)

    })
  })

  it('True AND False => False', async () => {
    const and = new And('AND')

    and.start()
    
    and.inputs[0].forceState(IOState.HI)

    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.LOW)

        resolve(true)
      }, 5)

    })
  })

  it('False AND True => False', async () => {
    const and = new And('AND')
    
    and.start()

    and.inputs[1].forceState(IOState.HI)

    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.LOW)

        resolve(true)
      }, 5)

    })
  })

  it('True AND True => True', async () => {
    const and = new And('AND')

    and.start()

    and.inputs[0].forceState(IOState.HI)
    and.inputs[1].forceState(IOState.HI)

    and.inputs[0].run()
    and.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(and.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 5)

    })
  })

})