<script setup lang="ts">
  import type { DrawableComponent } from '@/models/Component';
  import ComponentBoard from './ComponentBoard.vue';

  defineProps<{
    drawableComponents: DrawableComponent[],
  }>()

</script>
<template>
  <ComponentBoard v-for="(dComp, index) in drawableComponents" :drawable-component="dComp" :key="index + dComp.component.name" />
</template>