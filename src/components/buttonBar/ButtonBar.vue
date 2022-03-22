// ButtonBar.vue
// Display configuration buttons for all chargepoints

<template>
  <div class="row p-0 m-0">
    
    
    <div class="col p-0 m-0">
      <div class="container-fluid p-0 m-0">
        <div class="row p-0 m-0 d-flex justify-content-center">
          <BbChargeButton
            v-for="(cp, index) in chargepointsToDisplay"
            :key="index"
            :chargepoint="cp"
            :chargePointCount="Object.values(chargePoints).length"
            @cpSelected="cpSelected"
          ></BbChargeButton>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { ChargePoint} from '../chargePointList/model';
import { chargePoints } from '../chargePointList/model';
// import { eventBus } from '@/main.js'
import BbChargeButton from './BbChargeButton.vue'
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