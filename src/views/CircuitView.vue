<script setup lang="ts">
import { ref, watch } from 'vue'

import MainStage from '@/components/MainStage.vue'

import { useComponentsStore } from '@/stores/components'

import { And } from '@/models/LogicalGates/And'
import { NAnd } from '@/models/LogicalGates/NAnd'
import { Not } from '@/models/LogicalGates/Not'
import { Or } from '@/models/LogicalGates/Or'
import { XOr } from '@/models/LogicalGates/XOr'
import { Test } from '@/models/LogicalGates/Test'
import { SRLatch } from '@/models/LogicalGates/SRLatch'
import type { Component } from '@/models/Component'

const store = useComponentsStore()

const availableComponents: { [key: string]: Component } = {}

availableComponents['sr_latch'] = new SRLatch('SR Latch')
availableComponents['test'] = new Test('Test')
availableComponents['and'] = new And('AND')
availableComponents['nand'] = new NAnd('NAND')
availableComponents['not'] = new Not('NOT')
availableComponents['or'] = new Or('OR')
availableComponents['xor'] = new XOr('XOR')

for (const compId in availableComponents) {
  store.addComponent(compId, availableComponents[compId])
}

const componentId = ref(Object.keys(availableComponents)[0])

watch(componentId, (_newId, oldId) => {
  availableComponents[oldId].stop()
})
</script>

<template>
  <div class="about">
    <h1>Circuit View</h1>
    <select v-model="componentId">
      <option v-for="(comp, cId) in availableComponents" :key="cId" :value="cId">
        {{ comp.name }}
      </option>
    </select>
  </div>
  <MainStage :component-id="componentId" :width="850" :height="600" :key="componentId" />
</template>

<style></style>
