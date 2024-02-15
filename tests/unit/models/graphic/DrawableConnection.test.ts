import { describe, expect, it } from 'vitest'
import connectionFactory from '../../../factories/models/io_gate/ConnectionFactory'
import drawableConnectionFactory from '../../../factories/models/graphic/DrawableConnectionFactory'
import drawableGateFactory from '../../../factories/models/graphic/DrawableGateFactory'
import { IOState } from '@/models/io_gate/IOGate'


describe('DrawableConnection', () => {

  it('return points based on connection', () => {

    const dGateA = drawableGateFactory.build()
    const dGateB = drawableGateFactory.build()

    dGateB.setPosition({ x: 100, y: 150})

    const connection = connectionFactory.build({}, {associations: {a: dGateA.gate.out, b: dGateB.gate.in }})
    const dConnection = drawableConnectionFactory.build({}, {associations: { connection } }) 

    expect(dConnection.getPoints()).toStrictEqual([0, 0, 100, 150])

  })

  it('get color based on connection', () => {

    const dGateA = drawableGateFactory.build()
    const dGateB = drawableGateFactory.build()

    expect(dGateA.getColor()).toBe('black')

    const connection = connectionFactory.build({}, {associations: {a: dGateA.gate.out, b: dGateB.gate.in }})
    const dConnection = drawableConnectionFactory.build({}, {associations: { connection } }) 

    dGateA.gate.forceState(IOState.HI)
    dGateB.gate.forceState(IOState.HI)

    expect(dConnection.getColor()).toBe('red')

    dGateA.setColor('green')
    dGateB.setColor('blue')

    expect(dConnection.getColor()).toBe('green')
  })

  it('sets line path', () => {

    const dGateA = drawableGateFactory.build()
    const dGateB = drawableGateFactory.build()

    dGateB.setPosition({ x: 100, y: 150})

    const connection = connectionFactory.build({}, {associations: {a: dGateA.gate.out, b: dGateB.gate.in }})
    const dConnection = drawableConnectionFactory.build({}, {associations: { connection } }) 

    expect(dConnection.getPoints()).toStrictEqual([0, 0, 100, 150])

    dConnection.setPath([{x: 50, y: 0}, {x: 50, y: 150}])

    expect(dConnection.getPoints()).toStrictEqual([0, 0, 50, 0, 50, 150, 100, 150])

  })

})