<script setup lang="ts">
  import type { DrawableComponent, Connection } from '@/models/Component'
  import IOConnection from './IOConnection.vue'
  
  import { computed } from 'vue'

  const props = defineProps<{
    drawableComponent: DrawableComponent
  }>()

  const connections = computed<Connection[]>(() => props.drawableComponent.getConnections())

  const getKey = (conn: Connection): string => {
    return `${props.drawableComponent.component.name}:${conn.a.gate.label}>${conn.b.gate.label}`
  }

</script>
<template>
  <IOConnection v-for="conn in connections" :connection="conn" :key="getKey(conn)" />
</template>