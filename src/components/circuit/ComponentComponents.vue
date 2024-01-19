<script setup lang="ts">
  import { Component, DrawableComponent } from '@/models/Component';
  import ComponentBoard from './ComponentBoard.vue';
import { reactive } from 'vue';

  const props = defineProps<{
    components: Component[],
  }>()

  const positions: Position[] = reactive([
    {x: 330, y: 40},
    {x: 330, y: 290},
    {x: 80, y: 100},
    {x: 80, y: 230},
    {x: 550, y: 160},
  ])

  const dComponents = props.components.map((comp, index) => new DrawableComponent(comp, positions[index]))

</script>
<template>
  <ComponentBoard v-for="(dComp, index) in dComponents" :drawable-component="dComp" :is-root="false" :key="index" />
</template>