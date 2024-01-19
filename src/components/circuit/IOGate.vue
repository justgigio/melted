<script setup lang="ts">

  import { IOGate, IOState, DrawableGate } from '@/models/IOGate';
  import type { CircleConfig } from 'konva/lib/shapes/Circle';
  import type { TextConfig } from 'konva/lib/shapes/Text';

  import { reactive, computed } from 'vue'

  const props = defineProps<{
    drawableGate: DrawableGate,
    isRoot?: boolean
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

  const { x, y } = props.drawableGate.position

  const fill = computed<string>(() => getFill(props.drawableGate.gate))

  const configCircle: CircleConfig = reactive({
    x,
    y,
    radius: 10,
    fill: fill,
    stroke: "black",
    strokeWidth: 2.
  })

  const configText: TextConfig = reactive({
    x: x + 15,
    y: y - 5,
    fill: "white",
    text: props.drawableGate.gate.label
  })

  const circleClick = () => {
    const gate = props.drawableGate.gate
    if (props.isRoot) {
      if (gate.getState() === IOState.LOW) {
        gate.forceState(IOState.HI)
      } else {
        gate.forceState(IOState.LOW)
      }
    }
  }

</script>

<template>
  <v-circle :config="configCircle" @click="circleClick"></v-circle>
  <v-text :config="configText"></v-text>
</template>

<style scoped>

</style>
