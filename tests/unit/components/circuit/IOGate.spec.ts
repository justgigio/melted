import { describe, it, expect, beforeEach } from 'vitest'

import { mount } from '@vue/test-utils'
import type { IOGate } from '@/models/io_gate/IOGate'
import IOGateVue from '@/components/circuit/IOGate.vue'
import iOGAteFactory from '../../../factories/models/io_gate/IOGateFactory'
import { DrawableGate } from '@/models/graphic/DrawableGate'

interface LocalTestContext {
  gate: IOGate
}

describe('IOGateVue', () => {
  beforeEach<LocalTestContext>(async (context) => {
    const gate = iOGAteFactory.build({label: 'ina'})

    Object.assign(context, {gate})
  })

  it<LocalTestContext>('renders properly', ({gate}) => {
    const dGate = new DrawableGate(gate)
    const wrapper = mount(IOGateVue, { props: { drawableGate: dGate } })
    expect(wrapper.text()).toContain('ina')
  })
})
