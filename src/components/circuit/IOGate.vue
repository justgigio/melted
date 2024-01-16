<script setup lang="ts">

  import { IOGate, IOState } from '@/models/IOGate';
import type { CircleConfig } from 'konva/lib/shapes/Circle';
import type { TextConfig } from 'konva/lib/shapes/Text';

  const props = defineProps<{
    gate: IOGate,
    position: Position
  }>()

  const getFill = (gate: IOGate): string => {
    switch (gate.getState()) {
      case IOState.LOW:
        return "grey"
      case IOState.HI:
        return "red"
    }
    return "black"
  }

  const { x, y } = props.position

  const configCircle: CircleConfig = {
    x,
    y,
    radius: 10,
    fill: getFill(props.gate),
    stroke: "black",
    strokeWidth: 2
  }

  const configText: TextConfig = {
    x: x + 15,
    y: y - 5,
    fill: "white",
    text: props.gate.label
  }

</script>

<template>
  <v-circle :config="configCircle"></v-circle>
  <v-text :config="configText"></v-text>
</template>

<style scoped>

</style>
