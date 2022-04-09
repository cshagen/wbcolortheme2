<template>
  <CPSimpleList v-if="globalConfig.simpleCpList"></CPSimpleList>

    <CPChargePoint
      v-if="!(globalConfig.simpleCpList)"
      v-for="chargepoint in chargepointsToDisplay"
      :chargepoint="chargepoint"
      ></CPChargePoint>
  
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { chargePoints } from './model'
import { globalConfig } from '@/assets/js/themeConfig';
import CPChargePoint from './CPChargePoint.vue'
import CPSimpleList from './cpSimpleList/CPSimpleList.vue';

const chargepointsToDisplay = computed(() => {
  return Object.values(chargePoints)
})
</script>
