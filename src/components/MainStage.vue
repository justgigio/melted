<script setup lang="ts">
  import { Component, DrawableComponent } from '@/models/Component';
  import { Runner } from '@/Runner';

  import { useComponentsStore } from '@/stores/components'

  import ComponentBoard from './circuit/ComponentBoard.vue';

  import { reactive } from 'vue';
  import { IOState } from '@/models/IOGate';

  const props = defineProps<{
    componentId: string
    width: Number
    height: Number
  }>()

  const configKonva = {...props}

  const store = useComponentsStore()

  store.setComponent(props.componentId)

  const component: Component = store.getComponent!

  component.inputs.forEach((gate) => gate.forceState(IOState.LOW))

  const position: Position = {x: 0, y: 0}

  const drawable: DrawableComponent = reactive(new DrawableComponent(component, position))

  const runner = new Runner(component)
  runner.run()

</script>

<template>
  <v-stage :config="configKonva">
    <ComponentBoard :drawable-component="drawable" :is-root="true" />
  </v-stage>
</template>

<style scoped>

</style>
