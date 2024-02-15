import { describe, it, expect } from 'vitest'
import { Not } from '@/inventory/logical_gates/Not'
import { IOState } from '@/models/io_gate/IOGate'

describe('NOT', () => {

  it('NOT False => True', async () => {
    const nand = new Not('NOT')

    nand.start()
    
    nand.inputs[0].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 5)

    })
  })

  it('NOT True => False', async () => {
    const nand = new Not('NOT')

    nand.start()
    
    nand.inputs[0].forceState(IOState.HI)

    nand.inputs[0].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.LOW)

        resolve(true)
      }, 50)

    })
  })

  it('DISCONNECTED => DISCONNECTED', async () => {
    const nand = new Not('NOT')

    nand.inputs[0].start()
    nand.inputs[0].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.DISCONNECTED)

        resolve(true)
      }, 50)

    })
  })

})