<script setup lang="ts">
  import MainStage from '@/components/MainStage.vue'

  import { useComponentsStore } from '@/stores/components'

  import { And } from '@/models/LogicalGates/And'
  import { NAnd } from '@/models/LogicalGates/NAnd'
  import { Not } from '@/models/LogicalGates/Not'
  import { Or } from '@/models/LogicalGates/Or'
  import { XOr } from '@/models/LogicalGates/XOr'

  const store = useComponentsStore()

  store.addComponent('and', new And('AND'))
  store.addComponent('nand', new NAnd('NAND'))
  store.addComponent('not', new Not('NOT'))
  store.addComponent('or', new Or('OR'))
  store.addComponent('xor', new XOr('XOR'))

  const componentId = 'xor'

</script>

<template>
  <div class="about">
    <h1>Circuit View</h1>
  </div>
  <MainStage :component-id="componentId" :width="1000" :height="800" />
</template>

<style>

</style>
