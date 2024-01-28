import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import IOGateVue from '@/components/circuit/IOGate.vue'
import type { DrawableGate, IOState } from '@/models/io_gate/IOGate'
import type { Component } from '@/models/component/Component'

describe('IOGateVue', () => {
  beforeEach(() => {
    const mockedDrawableGate: DrawableGate = {
      position: {x: 20, y: 30},
      size: {width: 5, height: 5},
      getColor() { return "#955995" },
      lowStateColor: "gray",
      gate: {
        component: {
          inputs: [],
          outputs: [],
          components: [],
          name: '',
          
          isRoot() { return false },
          graphic: { textColor: '#fdfdfd' },
          label: "inputa"
        } as Component,
        getState() { return 1 },
        forceState(_state: IOState) {}
       }
    } as DrawableGate

  })

  it('renders properly', () => {
    const wrapper = mount(IOGateVue, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
