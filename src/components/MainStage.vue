<script setup lang="ts">
  import { Runner } from '@/Runner';

  import { useComponentsStore } from '@/stores/components'

  import ComponentBoard from './circuit/ComponentBoard.vue';

  import { IOState } from '@/models/IOGate';

  const props = defineProps<{
    componentId: string
    width: Number
    height: Number
  }>()

  const configKonva = {...props}

  const store = useComponentsStore()

  const component = store.getComponentById(props.componentId)!

  component.inputs.forEach((gate) => gate.forceState(IOState.LOW))

  const runner = Runner.getInstance()
  runner.setComponent(component)
  
  runner.run()

</script>

<template>
  <v-stage :config="configKonva">
    <v-layer>
      <ComponentBoard :drawable-component="component.graphic!" />
    </v-layer>
  </v-stage>
</template>

<style scoped>

</style>
