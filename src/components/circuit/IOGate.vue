<script setup lang="ts">

  import { IOGate, IOState } from '@/models/IOGate';
  import type { CircleConfig } from 'konva/lib/shapes/Circle';
  import type { TextConfig } from 'konva/lib/shapes/Text';

  import { reactive, computed } from 'vue'

  const props = defineProps<{
    gate: IOGate,
    position: Position,
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

  const { x, y } = props.position

  const fill = computed<string>(() => getFill(props.gate))

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
    text: props.gate.label
  })

  const circleClick = () => {
    if (props.isRoot) {
      if (props.gate.getState() === IOState.LOW) {
        props.gate.forceState(IOState.HI)
      } else {
        props.gate.forceState(IOState.LOW)
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
