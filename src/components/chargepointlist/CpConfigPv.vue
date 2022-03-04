<template>
  <div v-if="cp.chargeMode == 'pv_charging'">
    <hr />
    <p style="text-align:center; color: var(--color-menu);">Einstellungen für PV-Laden</p>
    
     <!-- Priority -->
     <cp-charge-config-item title="Einspeisegrenze beachten">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="feedInLimitSwitch"
          v-model="cp.pvFeedInLimit"
          @change="setFeedInLimit"
        />
      </div>
      </cp-charge-config-item>
    <!-- Minimum Current -->
    <cp-charge-config-item title="Minimale Stromstärke">
      <input type="range" class="form-range " id="minCurrent" 
      min="6" max="32"
      v-model="cp.pvMinCurrent"
      @change="setMinCurrent">
      <span class="d-flex justify-content-center align-items-center">{{ cp.pvMinCurrent }} A</span>
    </cp-charge-config-item>
    <!-- Maximum SoC -->
    <cp-charge-config-item title="Maximaler SoC">
      <input type="range" class="form-range " id="maxSoc" 
      min="0" max="100"
      v-model="cp.pvMaxSoc"
      @change="setMaxSoc">
      <span class="d-flex justify-content-center align-items-center">{{ cp.pvMaxSoc }} %</span>
    </cp-charge-config-item>
    <hr />
    <p style="text-align:center; color: var(--color-menu);">Netz-Laden bis zu Mindest-SoC</p>
    <!-- Minimum SoC -->
    <cp-charge-config-item title="Mindest-SoC">
      <input type="range" class="form-range " id="minSoC" 
      min="0" max="100"
      v-model="cp.pvMinSoc"
      @change="setMinSoc">
      <span class="d-flex justify-content-center align-items-center">{{ cp.pvMinSoc }} %</span>
    </cp-charge-config-item>
    <!-- Minimum Soc Current -->
    <cp-charge-config-item title="Stromstärke bis Mindest-SoC">
      <input type="range" class="form-range " id="minSocCurrent" 
      min="6" max="32"
      v-model="cp.pvMinSocCurrent"
      @change="setMinSocCurrent">
      <span class="d-flex justify-content-center align-items-center">{{ cp.pvMinSocCurrent }} A</span>
    </cp-charge-config-item>
  </div>
</template>

<script>
import { eventBus } from '@/main.js'
import cpChargeConfigItem from './cpChargeConfigItem.vue'
export default {
  name: 'CpConfigPv',
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
      }
  },
  methods: {
    setFeedInLimit () {
      eventBus.$emit ('update', 'pvFeedInLimit', this.cp.pvFeedInLimit, this.chargeTemplateId)
    },
    setMinCurrent() {
      eventBus.$emit('update', 'pvMinCurrent', +this.cp.pvMinCurrent, this.chargeTemplateId)
    },
    setMaxSoc() {
      eventBus.$emit('update', 'pvMaxSoc', +this.cp.pvMaxSoc, this.chargeTemplateId)
    },
    setMinSoc() {
      eventBus.$emit('update', 'pvMinSoc', +this.cp.pvMinSoc, this.chargeTemplateId)
    },
    setMinSocCurrent() {
      eventBus.$emit('update', 'pvMinSocCurrent', +this.cp.pvMinSocCurrent, this.chargeTemplateId)
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