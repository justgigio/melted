import { describe, it, expect } from 'vitest'
import { Or } from '@/inventory/logical_gates/Or'
import { IOState } from '@/models/io_gate/IOGate'

describe('OR', () => {

  it('False OR False => False', async () => {
    const nand = new Or('OR')

    nand.start()
    
    nand.inputs[0].run()
    nand.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.LOW)

        resolve(true)
      }, 5)

    })
  })

  it('True OR False => True', async () => {
    const nand = new Or('OR')

    nand.start()
    
    nand.inputs[0].forceState(IOState.HI)

    nand.inputs[0].run()
    nand.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 5)

    })
  })

  it('False OR True => True', async () => {
    const nand = new Or('OR')
    
    nand.start()

    nand.inputs[1].forceState(IOState.HI)

    nand.inputs[0].run()
    nand.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 5)

    })
  })

  it('True OR True => True', async () => {
    const nand = new Or('OR')

    nand.start()

    nand.inputs[0].forceState(IOState.HI)
    nand.inputs[1].forceState(IOState.HI)

    nand.inputs[0].run()
    nand.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 5)

    })
  })

})