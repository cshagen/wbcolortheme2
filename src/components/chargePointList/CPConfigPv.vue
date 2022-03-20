<template>
  <div v-if="cp.chargeMode == 'pv_charging'">
    <hr />
    <p style="text-align: center; color: var(--color-menu)">
      Einstellungen für PV-Laden
    </p>

    <!-- Priority -->
    <CPChargeConfigItem title="Einspeisegrenze beachten">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="feedInLimitSwitch"
          v-model="cp.pvFeedInLimit"
        />
      </div>
    </CPChargeConfigItem>
    <!-- Minimum Current -->
    <CPChargeConfigItem title="Minimale Stromstärke">
      <RangeInput
        id="minCurrent"
        :min="6"
        :max="32"
        :step="1"
        unit="A"
        v-model="cp.pvMinCurrent"
      ></RangeInput>
    </CPChargeConfigItem>
    <!-- Maximum SoC -->
    <CPChargeConfigItem title="Maximaler SoC">
      <RangeInput
        id="maxSoc"
        :min="0"
        :max="100"
        :step="1"
        unit="%"
        v-model="cp.pvMaxSoc"
      ></RangeInput>
    </CPChargeConfigItem>
    <hr />
    <p style="text-align: center; color: var(--color-menu)">
      Netz-Laden bis zu Mindest-SoC
    </p>
    <!-- Minimum SoC -->
    <CPChargeConfigItem title="Mindest-SoC">
      <RangeInput
        id="minSoc"
        :min="0"
        :max="100"
        :step="1"
        unit="%"
        v-model="cp.pvMinSoc"
      ></RangeInput>
    </CPChargeConfigItem>
    <!-- Minimum Soc Current -->
    <CPChargeConfigItem title="Stromstärke bis Mindest-SoC">
      <RangeInput
        id="minSocCurrent"
        :min="6"
        :max="32"
        :step="1"
        unit="A"
        v-model="cp.pvMinSocCurrent"
      ></RangeInput>
    </CPChargeConfigItem>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ChargePoint } from './model'
import CPChargeConfigItem from './CPChargeConfigItem.vue'
import RangeInput from '../RangeInput.vue'
const props = defineProps<{
  chargepoint: ChargePoint
}>()
const cp = ref(props.chargepoint)

// methods:
function setFeedInLimit() {
  // eventBus.$emit ('update', 'pvFeedInLimit', this.cp.pvFeedInLimit, this.chargeTemplateId)
}
function setMinCurrent() {
  // eventBus.$emit('update', 'pvMinCurrent', +this.cp.pvMinCurrent, this.chargeTemplateId)
}
function setMaxSoc() {
  // eventBus.$emit('update', 'pvMaxSoc', +this.cp.pvMaxSoc, this.chargeTemplateId)
}
function setMinSoc() {
  // eventBus.$emit('update', 'pvMinSoc', +this.cp.pvMinSoc, this.chargeTemplateId)
}
function setMinSocCurrent() {
  // eventBus.$emit('update', 'pvMinSocCurrent', +this.cp.pvMinSocCurrent, this.chargeTemplateId)
}

// computed
const chargeTemplateId = computed(() => {
  console.log(cp.value)
  return cp.value.chargeTemplate
})
</script>

<style scoped>
.chargeConfigSelect {
  background: var(--color-bg);
  color: var(--color-fg);
}
</style>
