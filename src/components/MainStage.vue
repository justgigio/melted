<script setup lang="ts">
  import { DrawableComponent } from '@/models/Component';
  import { Runner } from '@/Runner';

  import { useComponentsStore } from '@/stores/components'

  import ComponentBoard from './circuit/ComponentBoard.vue';

  import { computed } from 'vue';
  import { IOState } from '@/models/IOGate';

  const props = defineProps<{
    componentId: string
    width: Number
    height: Number
  }>()

  const configKonva = {...props}

  const store = useComponentsStore()

  const component = computed(() => store.getComponentById(props.componentId)!)

  component.value.inputs.forEach((gate) => gate.forceState(IOState.LOW))

  const runner = new Runner(component.value)
  runner.run()

</script>

<template>
  <v-stage :config="configKonva">
    <ComponentBoard :drawable-component="component.graphic!" :is-root="true" />
  </v-stage>
</template>

<style scoped>

</style>
