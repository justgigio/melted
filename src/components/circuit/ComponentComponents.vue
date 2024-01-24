<script setup lang="ts">
  import type { Component } from '@/models/Component';
  import ComponentBoard from './ComponentBoard.vue';

  const props = defineProps<{
    components: Component[],
  }>()

  const dComponents = props.components.map(comp => comp.graphic!)

</script>
<template>
  <ComponentBoard v-for="(dComp, index) in dComponents" :drawable-component="dComp" :key="index" />
</template>