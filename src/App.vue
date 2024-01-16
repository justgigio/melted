<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
import MainStage from './components/MainStage.vue'
</script>

<template>
  <header>
    Melted v0.0.1
  </header>

  <MainStage :width="1000" :height="800" />
</template>

<style scoped>

</style>
