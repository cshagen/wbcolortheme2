<template>
  
    <CPChargePoint
      v-for="chargepoint in chargepointsToDisplay"
      :chargepoint="chargepoint"
      :variableWidth="variableWidth"
      ></CPChargePoint>
  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { chargePoints } from './model'
import CPChargePoint from './CPChargePoint.vue'

const props=defineProps<{
  variableWidth: boolean
}>()
const chargepointsToDisplay = computed(() => {
  return Object.values(chargePoints)
})
</script>
