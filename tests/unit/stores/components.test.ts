import { beforeEach, describe, expect, it } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useComponentsStore } from '@/stores/components'
import componentFactory from '../../factories/models/component/ComponentFactory'

describe('Component Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })
  
  it('adds component to store', () => {
    const store = useComponentsStore()

    const comp1 = componentFactory.build({name: 'Some Component'})
    const comp2 = componentFactory.build({name: 'Component 2'})
    const comp3 = componentFactory.build({name: 'Component Overwrite'})

    expect(store.$state.components['some-component']).toBeUndefined()

    store.addComponent('some-component', comp1)

    expect(store.$state.components['some-component'].name).toBe(comp1.name)
    expect(store.$state.components['component-2']).toBeUndefined()

    store.addComponent('component-2', comp2)

    expect(store.$state.components['some-component'].name).toBe(comp1.name)
    expect(store.$state.components['component-2'].name).toBe(comp2.name)

    store.addComponent('some-component', comp3)

    expect(store.$state.components['some-component'].name).toBe(comp3.name)
    expect(store.$state.components['component-2'].name).toBe(comp2.name)

  })

  it('gets component by id', () => {
    const store = useComponentsStore()

    const comp1 = componentFactory.build({name: 'Some Component'})
    const comp2 = componentFactory.build({name: 'Component 2'})
    const comp3 = componentFactory.build({name: 'Component Overwrite'})

    expect(store.getComponentById('some-component')!).toBeUndefined()

    store.addComponent('some-component', comp1)

    expect(store.getComponentById('some-component')!.name).toBe(comp1.name)
    expect(store.getComponentById('component-2')).toBeUndefined()

    store.addComponent('component-2', comp2)

    expect(store.getComponentById('some-component')!.name).toBe(comp1.name)
    expect(store.getComponentById('component-2')!.name).toBe(comp2.name)

    store.addComponent('some-component', comp3)

    expect(store.getComponentById('some-component')!.name).toBe(comp3.name)
    expect(store.getComponentById('component-2')!.name).toBe(comp2.name)
  })
})