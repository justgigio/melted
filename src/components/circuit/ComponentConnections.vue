<script setup lang="ts">

  import type { DrawableConnection } from '@/models/IOGate';
  import IOConnection from './IOConnection.vue'

  defineProps<{
    drawableConnections: DrawableConnection[]
  }>()

  const getKey = (dConn: DrawableConnection): string => {
    const componentA = dConn.connection.a.gate.component
    const componentB = dConn.connection.b.gate.component
    return `${componentA.name}:${dConn.connection.a.gate.label}>${componentB.name}:${dConn.connection.b.gate.label}`
  }

</script>
<template>
  <IOConnection v-for="dConn in drawableConnections" :drawable-connection="dConn" :key="getKey(dConn)" />
</template>