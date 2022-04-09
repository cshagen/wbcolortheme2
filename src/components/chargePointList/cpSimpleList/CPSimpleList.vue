<template>
  <WBWidget>
    <template v-slot:title> Ladepunkte </template>
    <table class="table table-borderless px-2">
      <thead>
        <tr>
          <th class="tableheader alignleft">Ladepunkt</th>
          <th class="tableheader alignleft">Fahrzeug</th>
          <th class="tableheader alignleft">Ladung</th>
          <th class="tableheader alignleft">heute</th>
          <th class="tableheader alignright"></th>
        </tr>
      </thead>
      <tbody>
        <CPSListItem
          :chargepoint="chargepoint"
          v-for="chargepoint in chargepointsToDisplay"
        ></CPSListItem>
      </tbody>
    </table>
  </WBWidget>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { chargePoints, type ChargePoint } from '../model'
import { chargemodes } from '@/assets/js/themeConfig'
import CPChargePoint from '../CPChargePoint.vue'
import WBWidget from '@/components/shared/WBWidget.vue'
import CPSListItem from './CPSListItem.vue'
const chargepointsToDisplay = computed(() => {
  return Object.values(chargePoints)
})
</script>

<style scoped>
.title {
  color: var(--color-fg);
}
.tableheader {
  margin: 0;
  padding-left: 0;
}
.alignleft {
  text-align: left;
}
.aligncenter {
  text-align: center;
}
.alignright {
  text-align: right;
}
.table {
  border-spacing: 1rem;
}
</style>
