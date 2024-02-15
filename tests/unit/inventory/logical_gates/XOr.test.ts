import { describe, it, expect } from 'vitest'
import { XOr } from '@/inventory/logical_gates/XOr'
import { IOState } from '@/models/io_gate/IOGate'

describe('XOR', () => {

  it('False XOR False => False', async () => {
    const nand = new XOr('XOR')

    nand.start()
    
    nand.inputs[0].run()
    nand.inputs[1].run()

    await new Promise((resolve) => {

      setTimeout(() => {
        expect(nand.outputs[0].getState()).toBe(IOState.LOW)

        resolve(true)
      }, 50)

    })
  })

  it('True XOR False => True', async () => {
    const nand = new XOr('XOR')

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

  it('False XOR True => True', async () => {
    const nand = new XOr('XOR')
    
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

  it('True XOR True => False', async () => {
    const nand = new XOr('XOR')

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