<script setup lang="ts">

  import { IOGate, IOState, DrawableGate } from '@/models/IOGate';
  import type { CircleConfig } from 'konva/lib/shapes/Circle';
  import type { TextConfig } from 'konva/lib/shapes/Text';

  import { reactive, computed } from 'vue'

  const props = defineProps<{
    drawableGate: DrawableGate,
    canClick?: boolean,
    isOutput?: boolean
  }>()

  const { x, y } = props.drawableGate.position

  const fill = computed<string>(() => props.drawableGate.getColor())

  const configCircle: CircleConfig = reactive({
    x,
    y,
    radius: props.drawableGate.size.width / 2,
    fill: fill,
  })

  let textPosition = {x: x + 8, y: y - 6}
  let fontSize = 11

  if (props.drawableGate.gate.component.isRoot()) {
    textPosition = {x: x + 10, y: y - 22}
    fontSize = 16
  }

  if (props.isOutput) {
    textPosition.x -= fontSize + 12 
  }

  const configText: TextConfig = reactive({
    x: textPosition.x,
    y: textPosition.y,
    fill: props.drawableGate.gate.component.graphic?.textColor,
    text: props.drawableGate.gate.label,
    fontSize: fontSize
  })

  const circleClick = () => {
    const gate = props.drawableGate.gate
    if (props.canClick) {
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
