<template>
  
    <CPChargePoint
      v-for="chargepoint in chargepointsToDisplay"
      :chargepoint="chargepoint"
      ></CPChargePoint>
  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { chargePoints } from './model'
import CPChargePoint from './CPChargePoint.vue'

const chargepointsToDisplay = computed(() => {
  return Object.values(chargePoints)
})
</script>
