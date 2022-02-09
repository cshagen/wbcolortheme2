<template>
  <div v-if="cp.chargeMode == 'instant_charging'">
    <hr />
    <p>Einstellungen für Sofortladen:</p>
    
    <!-- Ampere -->
    <cp-charge-config-item title="Stromstärke:">
      <input type="range" class="form-range" id="targetCurrent" 
      min="6" max="32"
      v-model="cp.targetCurrent"
      @change="setTargetCurrent">
      <span>{{ cp.targetCurrent }} A</span>
    </cp-charge-config-item>
    <!-- Max SoC -->
    <cp-charge-config-item title="Maximaler Soc:">
      <input type="range" class="form-range" id="maxSoc" 
      min="0" max="100"
      v-model="cp.targetSoc">
      {{ cp.targetSoc }} %
    </cp-charge-config-item>
  </div>
  
</template>

<script>
import { eventBus } from '@/main.js'
import cpChargeConfigItem from './cpChargeConfigItem.vue'
export default {
  name: 'cpConfigInstant',
  props: {
    chargepoint: Object,
    vehicles: Array,
    chargeTemplates: Array
  },
  components: {
    cpChargeConfigItem
  },
  data() {
    return {
      cp : this.chargepoint
    }
  },
  methods: {
    setTargetCurrent () {
      let vId = this.cp.carId
      let tId  = this.vehicles[vId].chargeTemplateId
      let t = this.chargeTemplates[tId]
      t.chargemode.instant_charging.current=this.cp.targetCurrent
      eventBus.$emit ('update', 'chargeTemplate', t, tId)
    }
  }

}
</script>

<style scoped>

</style>