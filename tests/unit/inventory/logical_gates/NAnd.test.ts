import { describe, it, expect } from 'vitest'
import { NAnd } from '@/inventory/logical_gates/NAnd'
import { IOState } from '@/models/io_gate/IOGate'

describe('NAND', () => {

  it('False NAND False => True', async () => {
    const nand = new NAnd('NAND')

    nand.start()
    
    nand.inputs[0].run()
    nand.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 50)

    })
  })

  it('True NAND False => True', async () => {
    const nand = new NAnd('NAND')

    nand.start()
    
    nand.inputs[0].forceState(IOState.HI)

    nand.inputs[0].run()
    nand.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 50)

    })
  })

  it('False NAND True => True', async () => {
    const nand = new NAnd('NAND')
    
    nand.start()

    nand.inputs[1].forceState(IOState.HI)

    nand.inputs[0].run()
    nand.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.HI)

        resolve(true)
      }, 50)

    })
  })

  it('True NAND True => False', async () => {
    const nand = new NAnd('NAND')

    nand.start()

    nand.inputs[0].forceState(IOState.HI)
    nand.inputs[1].forceState(IOState.HI)

    nand.inputs[0].run()
    nand.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.LOW)

        resolve(true)
      }, 50)

    })
  })

})