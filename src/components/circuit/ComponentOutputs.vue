<script setup lang="ts">
  import type { IOGate } from '@/models/IOGate'
  import IOGateVue from './IOGate.vue'

  defineProps<{
    gates: IOGate[]
  }>()

</script>
<template>
  <IOGateVue v-for="(gate, index) in gates" :key="index" :drawable-gate="gate.graphic!" :is-output="true" />
</template>