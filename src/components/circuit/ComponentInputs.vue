<script setup lang="ts">
  import type { IOGate } from '@/models/IOGate'
  import IOGateVue from './IOGate.vue'

  const props = defineProps<{
    gates: IOGate[],
  }>()

  const canClick = props.gates[0].component.isRoot()

</script>
<template>
  <IOGateVue v-for="(gate, index) in gates" :key="index" :drawable-gate="gate.graphic!" :can-click="canClick" />
</template>