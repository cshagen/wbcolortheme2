// ButtonBar.vue
// Display configuration buttons for all chargepoints

<template>
  <div class="row p-0 m-0">
    
    
    <div class="col p-0 m-0">
      <div class="container-fluid p-0 m-0">
        <div class="row p-0 m-0">
          <BbChargeButton
            v-for="(cp, index) in chargepointsToDisplay"
            :key="index"
            :chargepoint="cp"
            @cpSelected="cpSelected"
          ></BbChargeButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { globalData } from '../../assets/js/model'
import type { ChargePoint, Vehicle } from '../chargePointList/model';
import { chargePoints, vehicles } from '../chargePointList/model';
// import { eventBus } from '@/main.js'
import BbChargeButton from './BbChargeButton.vue'
import BBSelectModal from './BBSelectModal.vue'
import { modalConfig } from './model';

// state  
const showChargeModal = ref(false)
const chargePointsToConfigure : ChargePoint[] = reactive([])
// computed
const chargepointsToDisplay = computed(() => {
  return chargePoints
})
// methods
function cpSelected(cp: ChargePoint) {
  console.log ("click")
  modalConfig.chargePointToConfigure = cp.id
  chargePointsToConfigure[0]=cp
  // modalConfig.showSelectModal = true
  console.log (showChargeModal.value)
  // eventBus.$emit('showChargeModal', cp)
}
</script>

<style>
</style>