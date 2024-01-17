<script setup lang="tsx">

  import { DrawableComponent } from '@/models/Component'

  import ComponentInputs from './ComponentInputs.vue'
  import ComponentOutputs from './ComponentOutputs.vue';

  import { reactive } from 'vue'
  import type { RectConfig } from 'konva/lib/shapes/Rect';
  import type { TextConfig } from 'konva/lib/shapes/Text';

  const props = defineProps<{
    drawableComponent: DrawableComponent,
    position: Position,
    isRoot?: boolean
  }>()

  const {x, y} = props.position

  const boardHeight: number = 300
  const boardWidth: number = 600

  const configRect: RectConfig = {
    x: x + 10,
    y: y + 10,
    width: boardWidth,
    height: boardHeight,
    fill: "green",
    stroke: "black",
    strokeWidth: 4
  }

  const configText: TextConfig = reactive({
    x: x + boardWidth / 2,
    y: y + boardHeight / 2,
    fill: "white",
    text: props.drawableComponent.component.name
  })

  const {inputs, outputs} = props.drawableComponent.component

</script>

<template>
  <v-layer>
    <v-rect :config="configRect" ></v-rect>
    <v-text :config="configText" ></v-text>
    <ComponentInputs :gates="inputs" :position="position" :height="boardHeight" :is-root="isRoot" />
    <ComponentOutputs :gates="outputs" :position="position" :height="boardHeight" :width="boardWidth" />
  </v-layer>
</template>

<style scoped>

</style>
