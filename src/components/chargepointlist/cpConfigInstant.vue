<template>
  <div v-if="cp.chargeMode == 'instant_charging'">
    <hr />
    <p style="text-align:center; color: var(--color-menu);">Einstellungen für Sofortladen</p>
    
    <!-- Ampere -->
    <cp-charge-config-item title="Stromstärke:">
      <input type="range" class="form-range " id="targetCurrent" 
      min="6" max="32"
      v-model="cp.instantTargetCurrent"
      @change="setTargetCurrent">
      <span class="d-flex justify-content-center align-items-center">{{ cp.targetCurrent }} A</span>
    </cp-charge-config-item>

    <hr v-if="cp.instantChargeLimitMode != 'none'" />
    <!-- Limit Mode -->
    <cp-charge-config-item :title="'Begrenzung:'">
        <select v-model="cp.instantChargeLimitMode" 
          class="form-select chargeConfigSelect" 
          @change="setChargeLimitMode"
        >
          <option v-for="(mode, index) in instantChargeLimitModes" 
            :key="index"
            :value="mode.id"
            class="d-flex justify-content-center align-items-center"
          >
          <span class="d-flex justify-content-center align-items-center">{{ mode.name }}</span>
          </option>
        </select>
    </cp-charge-config-item>
    <!-- Max SoC -->
    <cp-charge-config-item 
      v-if="cp.instantChargeLimitMode == 'soc'"
      title="Maximaler SoC:">
      <input type="range" class="form-range" id="maxSoc" 
      min="0" max="100"
      v-model="cp.instantTargetSoc"
      @change="setTargetSoc"
      >
     <span class="d-flex justify-content-center align-items-center"> {{ cp.targetSoc }} %</span>
    </cp-charge-config-item>
    
    <!-- Max Energy -->
    <cp-charge-config-item 
      v-if="cp.instantChargeLimitMode == 'amount'"
      title="Zu ladende Energie:">
      
      <input type="range" class="form-range" id="maxEnergy" 
      min="0" max="100"
      v-model="cp.instantMaxEnergy"
      @change="setMaxEnergy"
      >
      <span class="d-flex justify-content-center align-items-center">{{ cp.maxEnergy }} kW</span>
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
      cp : this.chargepoint,
      instantChargeLimitModes: [
        {name: "keine", id: 'none'},
        {name: 'EV-SoC', id: 'soc'},
        {name: 'Energiemenge', id: 'amount'}
      ]
    }
  },
  methods: {
    setTargetCurrent () {
      eventBus.$emit ('update', 'instantTargetCurrent', +this.cp.instantTargetCurrent, this.chargeTemplateId)
    },
    setChargeLimitMode() {
      eventBus.$emit('update', 'instantChargeLimit', this.cp.instantChargeLimitMode, this.chargeTemplateId)
    },
    setTargetSoc() {
      eventBus.$emit('update', 'instantTargetSoc', +this.cp.instantTargetSoc, this.chargeTemplateId)
    },
    setMaxEnergy() {
      eventBus.$emit('update', 'instantMaxEnergy', +this.cp.instantMaxEnergy, this.chargeTemplateId)
    }
  },
  computed: {
    chargeTemplateId() {
      console.log (this.cp)
      return this.cp.chargeTemplate
    }
  }

}
</script>

<style scoped>
.chargeConfigSelect {
  background: var(--color-bg);
  color: var(--color-fg);
}
</style>