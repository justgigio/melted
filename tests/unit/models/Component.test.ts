import { describe, it, expect, beforeEach } from 'vitest'
import componentFactory from '../../factories/models/ComponentFactory'
import type { Component } from '@/models/component/Component'

interface LocalTestContext {
  parentComponent: Component,
  component: Component
}

describe('Component', () => {
  beforeEach<LocalTestContext>(async (context) => {
    const parentComponent = componentFactory.build({name: 'Parent'})
    const component = componentFactory.build({name: 'Test 1', parent: parentComponent})

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
})
