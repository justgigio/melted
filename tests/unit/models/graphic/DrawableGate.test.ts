import { describe, expect, it } from 'vitest'
import drawableGateFactory from '../../../factories/models/graphic/DrawableGateFactory'
import { GATE_DEFAULT_COLOR, GATE_DISCONNECTED_COLOR, GATE_LOW_STATE_COLOR, ROOT_GATE_RADIUS } from '@/models/constants'
import { IOState } from '@/models/io_gate/IOGate'

describe('DrawableGate', () => {
  it('initialize with custom size and position', () => {
    const position = { x: 200, y: 300 }
    const size = { width: 752, height: 345 }
    const dGate = drawableGateFactory.build({position, size})

    expect(dGate.position).toStrictEqual({x: 200, y: 300})
    expect(dGate.size).toStrictEqual({ width: 752, height: 345 })
  })

  it('sets color', () => {
    const dGate = drawableGateFactory.build()

    expect(dGate.color).toBe(GATE_DEFAULT_COLOR)

    dGate.setColor('blue')

    expect(dGate.color).toBe('blue')
  })

  it('gets color based on gate state', () => {

    const dGate = drawableGateFactory.build()

    expect(dGate.getColor()).toBe(GATE_DISCONNECTED_COLOR)

    dGate.gate.forceState(IOState.LOW)

    expect(dGate.getColor()).toBe(GATE_LOW_STATE_COLOR)

    dGate.gate.forceState(IOState.HI)

    expect(dGate.getColor()).toBe(GATE_DEFAULT_COLOR)

    dGate.setColor('blue')

    expect(dGate.getColor()).toBe('blue')
  })

  it('sets size', () => {
    const dGate = drawableGateFactory.build()

    expect(dGate.size).toStrictEqual({width: ROOT_GATE_RADIUS * 2, height: ROOT_GATE_RADIUS * 2})

    dGate.setSize({width: 276, height: 130})

    expect(dGate.size).toStrictEqual({width: 276, height: 130})
  })
})