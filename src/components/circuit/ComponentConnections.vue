<script setup lang="ts">
  import type { Component, Connection } from '@/models/Component'
  import IOConnection from './IOConnection.vue'
  
  import { computed } from 'vue'

  const props = defineProps<{
    component: Component
  }>()

  const connections = computed<Connection[]>(() => props.component.getConnections())

  const getKey = (conn: Connection): string => {
    return `${props.component.name}:${conn.a.gate.label}>${conn.b.gate.label}`
  }

</script>
<template>
  <IOConnection v-for="conn in connections" :connection="conn" :key="getKey(conn)" />
</template>