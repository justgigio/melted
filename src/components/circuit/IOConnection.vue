<script setup lang="ts">
import { computed } from 'vue'

import type { LineConfig } from 'konva/lib/shapes/Line'

import type { DrawableConnection } from '@/models/graphic/DrawableConnection'

const props = defineProps<{
  drawableConnection: DrawableConnection
}>()

const configLine: LineConfig = computed(() => {
  return {
    points: props.drawableConnection.getPoints(),
    stroke: props.drawableConnection.getColor(),
    strokeWidth: props.drawableConnection.strokeWidth
  }
})
</script>
<template>
  <v-line :config="configLine"></v-line>
</template>
