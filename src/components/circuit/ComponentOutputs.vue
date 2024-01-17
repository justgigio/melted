<script setup lang="ts">
  import { IOGate } from '@/models/IOGate';
  import IOGateVue from './IOGate.vue'

  const props = defineProps<{
    gates: IOGate[],
    position: Position,
    height: number,
    width: number
  }>()

  const {x, y} = props.position

  const gateSpace = props.height / (props.gates.length + 1)

  const gateX = x + props.width + 10
  const gateY = y + gateSpace

</script>
<template>
  <IOGateVue v-for="(gate, index) in gates" :key="index" :gate="gate" :position="{x: gateX, y: gateY + (gateSpace * index)}" />
</template>