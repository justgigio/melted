<script setup lang="ts">
import type { Connection } from '@/models/Component';
import { IOState } from '@/models/IOGate';
import type { LineConfig } from 'konva/lib/shapes/Line';
import { computed, reactive } from 'vue';

  const props = defineProps<{
    connection: Connection
  }>()

  let p0: Position = {x: 0, y: 0}
  if (props.connection.a.gate.graphic !== undefined) {
    p0 = props.connection.a.gate.graphic.position
  } else if (props.connection.a.gate.component.graphic !== undefined) {
    p0 = props.connection.a.gate.component.graphic.position
  }

  let p1: Position = {x: 0, y: 0}
  if (props.connection.b.gate.graphic !== undefined) {
    p1 = props.connection.b.gate.graphic.position
  } else if (props.connection.b.gate.component.graphic !== undefined) {
    p1 = props.connection.b.gate.component.graphic.position
  }

  const {x: x0, y: y0} = p0
  const {x: x1, y: y1} = p1

  const stroke = computed<string | undefined>(() => {
    const stateA = props.connection.a.gate.getState()

    if (stateA === IOState.HI) {
      return props.connection.a.gate.graphic?.color
    }
    return props.connection.a.gate.graphic?.lowStateColor
  })

  const configLine: LineConfig = reactive({
    points: [x0, y0, x1, y1],
    stroke: stroke,
    strokeWidth: 3
  })

</script>
<template>
  <v-line :config="configLine"></v-line>
</template>