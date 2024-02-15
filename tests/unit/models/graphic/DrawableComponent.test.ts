import { describe, expect, it } from 'vitest'
import drawableComponentFactory from '../../../factories/models/graphic/DrawableComponentFactory'
import componentFactory from '../../../factories/models/component/ComponentFactory'
import iOGateFactory from '../../../factories/models/io_gate/IOGateFactory'
import drawableGateFactory from '../../../factories/models/graphic/DrawableGateFactory'
import drawableConnectionFactory from '../../../factories/models/graphic/DrawableConnectionFactory'
import { BOARD_DEFAULT_COLOR, BOARD_MARGIN, ROOT_COMPONENT_SIZE } from '@/models/constants'

describe('DrawableComponent', () => {

  it('initialize with custom size and position', () => {
    const position = { x: 200, y: 300 }
    const size = { width: 752, height: 345 }
    const dComponent = drawableComponentFactory.build({position, size})

    expect(dComponent.position).toStrictEqual({x: 200, y: 300})
    expect(dComponent.size).toStrictEqual({ width: 752, height: 345 })

  })

  it('returns its own drawable connections and from first level children', () => {
    const parentDComponent = drawableComponentFactory.build()
    const compA = componentFactory.build({}, {associations: {parent: parentDComponent.component}})
    const compB = componentFactory.build({}, {associations: {parent: parentDComponent.component}})

    const gateInP = iOGateFactory.build({}, {associations: {component: parentDComponent.component}})
    const gateOutP = iOGateFactory.build({}, {associations: {component: parentDComponent.component}})

    const gateInA = iOGateFactory.build({}, {associations: {component: compA}})
    const gateOutA = iOGateFactory.build({}, {associations: {component: compA}})

    const gateInB = iOGateFactory.build({}, {associations: {component: compB}})
    const gateOutB = iOGateFactory.build({}, {associations: {component: compB}})

    parentDComponent.component.inputs = [gateInP]
    parentDComponent.component.outputs = [gateOutP]
    parentDComponent.component.components = [compA, compB]

    compA.inputs = [gateInA]
    compA.outputs = [gateOutA]

    compB.inputs = [gateInB]
    compB.outputs = [gateOutB]

    drawableGateFactory.build({}, {associations: {gate: gateInP}})
    drawableGateFactory.build({}, {associations: {gate: gateOutP}})
    drawableGateFactory.build({}, {associations: {gate: gateInA}})
    drawableGateFactory.build({}, {associations: {gate: gateOutA}})
    drawableGateFactory.build({}, {associations: {gate: gateInB}})
    drawableGateFactory.build({}, {associations: {gate: gateOutB}})

    drawableConnectionFactory.build({}, {associations: {connection: gateInP.connect(gateInA)}})
    drawableConnectionFactory.build({}, {associations: {connection: gateInA.connect(gateOutA)}})
    drawableConnectionFactory.build({}, {associations: {connection: gateOutA.connect(gateInB)}})
    drawableConnectionFactory.build({}, {associations: {connection: gateInB.connect(gateOutB)}})
    drawableConnectionFactory.build({}, {associations: {connection: gateOutB.connect(gateOutP)}})

    drawableComponentFactory.build({}, {associations: {component: compA}})
    drawableComponentFactory.build({}, {associations: {component: compB}})

    const connections = parentDComponent.getConnections()

    expect(connections.length).toBe(3)

    expect(connections).toContain(gateInP.out.connections[0].graphic)
    expect(connections).not.toContain(gateInA.out.connections[0].graphic)
    expect(connections).toContain(gateOutA.out.connections[0].graphic)
    expect(connections).not.toContain(gateInB.out.connections[0].graphic)
    expect(connections).toContain(gateOutB.out.connections[0].graphic)
  })

  it('sets color', () => {
    const dComponent = drawableComponentFactory.build()

    expect(dComponent.fillColor).toBe(BOARD_DEFAULT_COLOR)

    dComponent.setColor('blue')

    expect(dComponent.fillColor).toBe('blue')
  })

  it('sets position', () => {
    const dComponent = drawableComponentFactory.build()

    expect(dComponent.position).toStrictEqual({x: BOARD_MARGIN, y: BOARD_MARGIN})

    dComponent.setPosition({x: -13, y: 44})

    expect(dComponent.position).toStrictEqual({x: -13, y: 44})
  })

  it('sets size', () => {
    const dComponent = drawableComponentFactory.build()

    expect(dComponent.size).toStrictEqual(ROOT_COMPONENT_SIZE)

    dComponent.setSize({width: 120, height: 70})

    expect(dComponent.size).toStrictEqual({width: 120, height: 70})
  })

})