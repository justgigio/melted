import { describe, it, expect, beforeEach } from 'vitest'
import type { Component } from '@/models/component/Component'
import { IOState } from '@/models/io_gate/IOGate'
import componentFactory from '../../../factories/models/component/ComponentFactory'
import drawableComponentFactory from '../../../factories/models/graphic/DrawableComponentFactory'
import iOGateFactory from '../../../factories/models/io_gate/IOGateFactory'

interface LocalTestContext {
  parentComponent: Component,
  component: Component
}

describe('Component', () => {
  beforeEach<LocalTestContext>(async (context) => {
    const parentComponent = componentFactory.build({name: 'Parent'})
    const component = componentFactory.build({name: 'Test 1'}, {associations: {parent: parentComponent}})

    Object.assign(context, {parentComponent, component})
  })

  it<LocalTestContext>('Initializes properly', ({ parentComponent, component }) => {
    expect(parentComponent.name).toBe('Parent')
    expect(parentComponent.parent).toBeUndefined()
    expect(component.name).toBe('Test 1')
    expect(component.parent).toBe(parentComponent)
  })

  it<LocalTestContext>('Checks root right', ({ parentComponent, component }) => {
    expect(parentComponent.isRoot()).toBeTruthy()
    expect(component.isRoot()).toBeFalsy()
  })

  it<LocalTestContext>('Sets graphic', ({ component }) => {
    const dComponent = drawableComponentFactory.build({}, { associations: { component } })
    expect(component.graphic).toBe(dComponent)
  })

  it<LocalTestContext>('starts', ({ component }) => {
    const gateA = iOGateFactory.build({label: 'ina'})
    const gateB = iOGateFactory.build({label: 'inb'})

    component.inputs = [gateA, gateB]

    expect(gateA.running).toBeFalsy()
    expect(gateB.running).toBeFalsy()

    expect(gateA.getState()).toBe(IOState.DISCONNECTED)
    expect(gateB.getState()).toBe(IOState.DISCONNECTED)

    component.start()

    expect(gateA.running).toBeTruthy()
    expect(gateB.running).toBeTruthy()

    expect(gateA.getState()).toBe(IOState.LOW)
    expect(gateB.getState()).toBe(IOState.LOW)
  })
  
  it<LocalTestContext>('stops', ({ component }) => {
    const gateA = iOGateFactory.build({label: 'ina'})
    const gateB = iOGateFactory.build({label: 'inb'})

    component.inputs = [gateA, gateB]

    component.start()

    expect(gateA.running).toBeTruthy()
    expect(gateB.running).toBeTruthy()

    component.stop()

    expect(gateA.running).toBeFalsy()
    expect(gateB.running).toBeFalsy()
  })

})