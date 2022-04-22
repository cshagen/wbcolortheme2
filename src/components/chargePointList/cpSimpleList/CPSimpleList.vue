<template>
  <WBWidget>
    <template v-slot:title> Ladepunkte </template>
    <table class="table table-borderless px-0">
      <thead>
        <tr>
          <th class="tableheader alignleft"><i class="fa-solid fa-lg fa-charging-station ps-4"></i></th>
          <th class="tableheader alignleft"><i class="fa-solid fa-lg fa-car ps-2"></i></th>
          <th class="tableheader alignleft"><i class="fa-solid fa-lg fa-bolt ps-2"></i></th>
          <th class="tableheader alignleft"><i class="fa-solid fa-lg fa-car-battery ps-2"></i></th>
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
import { chargePoints } from '../model'
import WBWidget from '@/components/shared/WBWidget.vue'
import CPSListItem from './CPSListItem.vue'
const chargepointsToDisplay = computed(() => {
  return Object.values(chargePoints)
})
</script>

<style scoped>
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
