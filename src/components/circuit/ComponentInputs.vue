<script setup lang="ts">
  import { IOGate } from '@/models/IOGate';
  import IOGateVue from './IOGate.vue'

  const props = defineProps<{
    gates: IOGate[],
    position: Position,
    height: number
  }>()

  const {x, y} = props.position

  const gateSpace = props.height / (props.gates.length + 1)

  const gateX = x + 10
  const gateY = y + gateSpace



</script>
<template>
  <v-layer v-for="(gate, index) in gates" :key="index">
    <IOGateVue :gate="gate" :position="{x: gateX, y: gateY + (gateSpace * index)}" />
  </v-layer>
</template>