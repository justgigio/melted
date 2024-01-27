<script setup lang="ts">
import { computed } from 'vue'
import type { DrawableGate } from '@/models/IOGate'
import IOGateVue from './IOGate.vue'

const props = defineProps<{
  drawableGates: DrawableGate[]
}>()

const keys = computed<string[]>(() => {
  return props.drawableGates.map(
    (dGate) => `[${dGate.gate.component.name}]${dGate.gate.label}:${dGate.gate.getState()}`
  )
})
</script>
<template>
  <IOGateVue
    v-for="(dGate, index) in drawableGates"
    :key="keys[index]"
    :drawable-gate="dGate"
    :is-output="true"
  />
</template>
