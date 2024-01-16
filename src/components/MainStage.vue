<script setup lang="ts">
  import { XOr } from '@/models/LogicalGates/XOr';

  import ComponentBoard from './circuit/ComponentBoard.vue';

  const props = defineProps<{
    width: Number,
    height: Number
  }>()

  const configKonva = {...props}

  const xor = new XOr('XOR')

  const position: Position = {x: 0, y: 0}
  
</script>

<template>
  <v-stage :config="configKonva">
    <ComponentBoard :component="xor" :position="position" />
  </v-stage>
</template>

<style scoped>

</style>
