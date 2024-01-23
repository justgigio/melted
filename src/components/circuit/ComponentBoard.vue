<script setup lang="tsx">

  import { DrawableComponent } from '@/models/Component'

  import ComponentInputs from './ComponentInputs.vue'
  import ComponentOutputs from './ComponentOutputs.vue';

  import { computed, reactive } from 'vue'
  import type { RectConfig } from 'konva/lib/shapes/Rect';
  import type { TextConfig } from 'konva/lib/shapes/Text';
  import ComponentConnections from './ComponentConnections.vue';
  import ComponentComponents from './ComponentComponents.vue';

  const props = defineProps<{
    drawableComponent: DrawableComponent,
    isRoot?: boolean
  }>()

  const { position } = props.drawableComponent
  const { x, y } = position

  const boardWidth: number = props.drawableComponent.size.width
  const boardHeight: number = props.drawableComponent.size.height

  const boardFill = computed<string>(() => props.isRoot ? "" : "darkgray")

  const configRect: RectConfig = reactive({
    x,
    y,
    width: boardWidth,
    height: boardHeight,
    fill: boardFill,
    stroke: "black",
    strokeWidth: 4,
  })

  let textAlign = 'center'
  let textVAlign = 'middle'

  if (props.isRoot) {
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
    fill: "white",
    text: props.drawableComponent.component.name
  })

  const {inputs, outputs, components} = props.drawableComponent.component

</script>

<template>
  <ComponentComponents :components="components" v-if="isRoot" />
  <v-layer>
    <v-rect :config="configRect" ></v-rect>
    <v-text :config="configText" ></v-text>
    <ComponentInputs :gates="inputs" :position="position" :height="boardHeight" :is-root="isRoot" />
    <ComponentOutputs :gates="outputs" :position="position" :height="boardHeight" :width="boardWidth" />
    <ComponentConnections :drawable-component="drawableComponent" v-if="isRoot" />
  </v-layer>
</template>

<style scoped>

</style>
