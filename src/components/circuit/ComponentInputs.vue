<script setup lang="ts">
import { computed } from 'vue'

import type { DrawableGate } from '@/models/graphic/DrawableGate'

import IOGateVue from './IOGate.vue'

const props = defineProps<{
  drawableGates: DrawableGate[]
}>()

const canClick = props.drawableGates[0].gate.component.isRoot()

const keys = computed<string[]>(() => {
  return props.drawableGates.map(
    (dGate) => `[${dGate.gate.component.name}]${dGate.gate.label}:${dGate.getColor()}`
  )
})
</script>
<template>
  <IOGateVue
    v-for="(dGate, index) in drawableGates"
    :key="keys[index]"
    :drawable-gate="dGate"
    :can-click="canClick"
  />
</template>
