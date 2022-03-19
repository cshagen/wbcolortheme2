<template>
  <div v-if="cp.chargeMode == 'instant_charging'">
    <hr />
    <p style="text-align: center; color: var(--color-menu)">
      Einstellungen für Sofortladen
    </p>

    <!-- Ampere -->
    <CPChargeConfigItem title="Stromstärke:">
      <input
        type="range"
        class="form-range"
        id="targetCurrent"
        min="6"
        max="32"
        v-model.number="cp.instantTargetCurrent"
      />
      <span class="d-flex justify-content-center align-items-center"
        >{{ cp.instantTargetCurrent }} A</span
      >
    </CPChargeConfigItem>

    <hr v-if="cp.instantChargeLimitMode != 'none'" />
    <!-- Limit Mode -->
    <CPChargeConfigItem :title="'Begrenzung:'">
      <select
        v-model="cp.instantChargeLimitMode"
        class="form-select chargeConfigSelect"
      >
        <option
          v-for="(mode, index) in instantChargeLimitModes"
          :key="index"
          :value="mode.id"
          class="d-flex justify-content-center align-items-center"
        >
          <span class="d-flex justify-content-center align-items-center">{{
            mode.name
          }}</span>
        </option>
      </select>
    </CPChargeConfigItem>
    <!-- Max SoC -->
    <CPChargeConfigItem
      v-if="cp.instantChargeLimitMode == 'soc'"
      title="Maximaler SoC:"
    >
      <input
        type="range"
        class="form-range"
        id="maxSoc"
        min="0"
        max="100"
        v-model.number="cp.instantTargetSoc"
      />
      <span class="d-flex justify-content-center align-items-center">
        {{ cp.instantTargetSoc }} %</span
      >
    </CPChargeConfigItem>

    <!-- Max Energy -->
    <CPChargeConfigItem
      v-if="cp.instantChargeLimitMode == 'amount'"
      title="Zu ladende Energie:"
    >
      <input
        type="range"
        class="form-range"
        id="maxEnergy"
        min="0"
        max="100"
        v-model.number="cp.instantMaxEnergy"
        
      />
      <span class="d-flex justify-content-center align-items-center"
        >{{ cp.instantMaxEnergy }} kW</span
      >
    </CPChargeConfigItem>
  </div>
</template>

<script setup lang="ts">
// import { eventBus } from '@/main.js'
import { ref, computed } from 'vue'
import { vehicles, chargeTemplates } from './model'
import type { ChargePoint } from './model'
import CPChargeConfigItem from './CPChargeConfigItem.vue'
  const props = defineProps<{
    chargepoint: ChargePoint
  }>()
      const cp = ref(props.chargepoint)
      const instantChargeLimitModes= [
        {name: "keine", id: 'none'},
        {name: 'EV-SoC', id: 'soc'},
        {name: 'Energiemenge', id: 'amount'}
      ]
  // methods
    function setTargetCurrent () {
      // eventBus.$emit ('update', 'instantTargetCurrent', +this.cp.instantTargetCurrent, this.chargeTemplateId)
    }
    function setChargeLimitMode() {
      // eventBus.$emit('update', 'instantChargeLimit', this.cp.instantChargeLimitMode, this.chargeTemplateId)
    }
    function setTargetSoc() {
      // eventBus.$emit('update', 'instantTargetSoc', +this.cp.instantTargetSoc, this.chargeTemplateId)
    }
    function setMaxEnergy() {
      // eventBus.$emit('update', 'instantMaxEnergy', +this.cp.instantMaxEnergy, this.chargeTemplateId)
    }
  // computed
    const chargeTemplateId = computed (() => {
      console.log (cp.value)
      return cp.value.chargeTemplate
    })
</script>

<style scoped>
.chargeConfigSelect {
  background: var(--color-bg);
  color: var(--color-fg);
}
</style>
