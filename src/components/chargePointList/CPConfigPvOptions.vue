<template>
  <div class="pt-2">
    <p class="heading ms-1">
      Optionen für PV-Laden:
    </p>
    <!-- Min-PV-Laden -->
    <CPChargeConfigItem title="Min-PV-Laden">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="feedInLimitSwitch"
          v-model="useMinPV"
        />
      </div>
    </CPChargeConfigItem>
     <!-- Minimum Current -->
    <CPChargeConfigItem title="...mit Stromstärke" v-if="useMinPV">
      <RangeInput
        id="minCurrent"
        :min="6"
        :max="32"
        :step="1"
        unit="A"
        v-model="cp.pvMinCurrent"
      ></RangeInput>
      
    </CPChargeConfigItem>
    <hr v-if="useMinPV || useMinSoc"/>
    <!-- Min-PV-Laden -->
    <CPChargeConfigItem title="Netzladen bis Minimal-SoC" >
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="feedInLimitSwitch"
          v-model="useMinSoc"
        />
      </div>
    </CPChargeConfigItem>
    <!-- Minimum SoC -->
    <CPChargeConfigItem title="...bis zu SoC" v-if="useMinSoc">
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
    <CPChargeConfigItem title="...mit Stromstärke" v-if="useMinSoc">
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
import RangeInput from '@/components/shared/RangeInput.vue'
const props = defineProps<{
  chargepoint: ChargePoint
}>()
const cp = ref(props.chargepoint)
const useMinPV = computed({
  get() {
    return (cp.value.pvMinCurrent > 5)
  },
  set (v: boolean) {
    if (!v) {
      cp.value.pvMinCurrent = 0
    } else {
      cp.value.pvMinCurrent = 6
    }
  }
})
const useMinSoc = computed({
  get() {
    return (cp.value.pvMinSoc > 0)
  },
  set (v:boolean) {
    if (v) {
      cp.value.pvMinSoc = 50
  } else {
    cp.value.pvMinSoc = 0
  }
  }
})
</script>

<style scoped>
.chargeConfigSelect {
  background: var(--color-bg);
  color: var(--color-fg);
}
.heading {
  color: var(--color-pv);
}
</style>
