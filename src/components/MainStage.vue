<script setup lang="ts">
import { useComponentsStore } from '@/stores/components'

import ComponentBoard from './circuit/ComponentBoard.vue'

const props = defineProps<{
  componentId: string
  width: Number
  height: Number
}>()

const configKonva = { ...props }

const store = useComponentsStore()

const component = store.getComponentById(props.componentId)!
component.start()
</script>

<template>
  <v-stage :config="configKonva">
    <v-layer>
      <ComponentBoard :drawable-component="component.graphic!" />
    </v-layer>
  </v-stage>
</template>

<style scoped></style>
