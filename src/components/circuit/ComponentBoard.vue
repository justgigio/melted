<script setup lang="tsx">

  import { reactive } from 'vue'

  import type { RectConfig } from 'konva/lib/shapes/Rect'
  import type { TextConfig } from 'konva/lib/shapes/Text'

  import { DrawableComponent } from '@/models/Component'
  
  import ComponentComponents from './ComponentComponents.vue'
  import ComponentConnections from './ComponentConnections.vue'
  import ComponentInputs from './ComponentInputs.vue'
  import ComponentOutputs from './ComponentOutputs.vue'


  const props = defineProps<{
    drawableComponent: DrawableComponent
  }>()

  const { position } = props.drawableComponent
  const { x, y } = position

  const boardWidth: number = props.drawableComponent.size.width
  const boardHeight: number = props.drawableComponent.size.height
  const {fillColor, strokeColor, strokeWidth} = props.drawableComponent

  const configRect: RectConfig = reactive({
    x,
    y,
    width: boardWidth,
    height: boardHeight,
    fill: fillColor,
    stroke: strokeColor,
    strokeWidth: strokeWidth,
  })

  let textAlign = 'center'
  let textVAlign = 'middle'

  const isRoot = props.drawableComponent.component.isRoot()

  if (isRoot) {
    textAlign = 'left'
    textVAlign = 'top'
  }

  const configText: TextConfig = reactive({
    x: x,
    y: y,
    width: boardWidth,
    height: boardHeight,
    padding: 20,
    align: textAlign,
    verticalAlign: textVAlign,
    fill: props.drawableComponent.textColor,
    text: props.drawableComponent.component.name
  })

  const {inputs, outputs, components} = props.drawableComponent.component

</script>

<template>
  <v-layer>
    <v-rect :config="configRect" ></v-rect>
    <v-text :config="configText" ></v-text>
    <ComponentConnections :drawable-component="drawableComponent" v-if="isRoot" />
    <ComponentInputs :gates="inputs" />
    <ComponentOutputs :gates="outputs" />
  </v-layer>
  <ComponentComponents :components="components" v-if="isRoot" />
</template>

<style scoped>

</style>
