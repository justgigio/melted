import { describe, expect, it } from 'vitest'
import connectionFactory from '../../../factories/models/io_gate/ConnectionFactory'
import drawableConnectionFactory from '../../../factories/models/graphic/DrawableConnectionFactory'
import drawableGateFactory from '../../../factories/models/graphic/DrawableGateFactory'


describe('Connection', () => {

  it('sets graphic', () => {
    const connection = connectionFactory.build()

    drawableGateFactory.build({}, {associations: {gate: connection.a.gate}})
    drawableGateFactory.build({}, {associations: {gate: connection.b.gate}})
    
    expect(connection.graphic).toBeUndefined()

    const dConnection = drawableConnectionFactory.build({}, {associations: {connection}})

    expect(dConnection.connection).toBe(connection)
    expect(connection.graphic).toBe(dConnection)
  })

})
