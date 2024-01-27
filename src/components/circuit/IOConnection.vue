<script setup lang="ts">
import { computed } from 'vue'
import { DrawableConnection } from '@/models/IOGate'
import type { LineConfig } from 'konva/lib/shapes/Line'

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
