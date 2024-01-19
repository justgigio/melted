<script setup lang="ts">
  import { IOGate, DrawableGate } from '@/models/IOGate';
  import IOGateVue from './IOGate.vue'
  import { computed } from 'vue';

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

  const dGates = computed<DrawableGate[]>(() => props.gates.map((gate, index) => new DrawableGate(gate, {x: gateX, y: gateY + (gateSpace * index)})))

</script>
<template>
  <IOGateVue v-for="(dGate, index) in dGates" :key="index" :drawable-gate="dGate" />
</template>