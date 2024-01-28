<script setup lang="ts">
import { computed, reactive } from 'vue'

import type { RectConfig } from 'konva/lib/shapes/Rect'
import type { TextConfig } from 'konva/lib/shapes/Text'

import type { Component } from '@/models/component/Component'
import type { IOGate } from '@/models/io_gate/IOGate'
import type { DrawableComponent } from '@/models/graphic/DrawableComponent'
import type { DrawableGate } from '@/models/graphic/DrawableGate'

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
const { fillColor, strokeColor, strokeWidth } = props.drawableComponent

const configRect: RectConfig = reactive({
  x,
  y,
  width: boardWidth,
  height: boardHeight,
  fill: fillColor,
  stroke: strokeColor,
  strokeWidth: strokeWidth
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

const { inputs, outputs, components } = props.drawableComponent.component

const drawableInputs = computed<DrawableGate[]>(() => inputs.map((gate: IOGate) => gate.graphic!))
const drawableOutputs = computed<DrawableGate[]>(() => outputs.map((gate: IOGate) => gate.graphic!))
const drawableComponents = computed<DrawableComponent[]>(() =>
  components.map((comp: Component) => comp.graphic!)
)

const drawableConnections = props.drawableComponent.getConnections()
</script>

<template>
  <v-group>
    <v-rect :config="configRect"></v-rect>
    <v-text :config="configText"></v-text>
    <ComponentConnections :drawable-connections="drawableConnections" v-if="isRoot" />
    <ComponentInputs :drawable-gates="drawableInputs" />
    <ComponentOutputs :drawable-gates="drawableOutputs" />
  </v-group>
  <ComponentComponents :drawable-components="drawableComponents" v-if="isRoot" />
</template>

<style scoped></style>
@/models/Component/Component
