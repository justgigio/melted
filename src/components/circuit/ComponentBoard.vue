<script setup lang="tsx">

  import { Component } from '@/models/Component'

  import ComponentInputs from './ComponentInputs.vue'
  import ComponentOutputs from './ComponentOutputs.vue';

  const props = defineProps<{
    component: Component,
    position: Position
  }>()

  const {x, y} = props.position

  const boardHeight: number = 300
  const boardWidth: number = 600

  const configRect = {
    x: x + 10,
    y: y + 10,
    width: boardWidth,
    height: boardHeight,
    fill: "green",
    stroke: "black",
    strokeWidth: 4
  }

</script>

<template>
  <v-layer>
    <v-rect :config="configRect" ></v-rect>
  </v-layer>
  <ComponentInputs :gates="component.inputs" :position="position" :height="boardHeight" />
  <ComponentOutputs :gates="component.outputs" :position="position" :height="boardHeight" :width="boardWidth" />
</template>

<style scoped>

</style>
