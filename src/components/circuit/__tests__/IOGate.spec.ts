import { describe, it, expect, beforeEach } from 'vitest'

// import VueKonva from 'vue-konva'

import { mount, config } from '@vue/test-utils'
import type { IOGate } from '@/models/io_gate/IOGate'
import IOGateVue from '@/components/circuit/IOGate.vue'
import iOGAteFactory from '../../../../tests/factories/models/io_gate/IOGateFactory'
import { DrawableGate } from '@/models/graphic/DrawableGate'

interface LocalTestContext {
  gate: IOGate
}

describe('IOGateVue', () => {
  beforeEach<LocalTestContext>(async (context) => {
    const gate = iOGAteFactory.build({label: 'ina'})

    Object.assign(context, {gate})
    // config.global.plugins = [VueKonva]
  })

  it.skip<LocalTestContext>('renders properly', ({gate}) => {
    const dGate = new DrawableGate(gate)
    const wrapper = {
      template: "<v-stage :config='stage' ><v-layer><IOGateVue :drawable-gate='dGate' /></v-layer></v-stage>"
    }
    const component = mount(wrapper, { data() { return { dGate, stage: { width: 300, height: 400 } } }, global: { components: { IOGateVue }} })
    expect(component).toMatchSnapshot()
  })
})
