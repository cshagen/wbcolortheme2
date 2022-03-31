<template>
  <div class="pt-2">
    <p class="heading ms-1">
      PV-Laden:
    </p>

    <!-- Priority -->
   
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
    <hr/>
    <!-- Min-PV-Laden -->
    <CPChargeConfigItem title="Min-SoC-Laden" :infotext="infotext['minsoc']">
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
    <CPChargeConfigItem title="...bis SoC" v-if="useMinSoc">
    <template v-slot:info>{{ infotext['minsoc'] }}</template>
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
    <CPChargeConfigItem title="...mit Ladestrom" v-if="useMinSoc">
      <RangeInput
        id="minSocCurrent"
        :min="6"
        :max="32"
        :step="1"
        unit="A"
        v-model="cp.pvMinSocCurrent"
      ></RangeInput>
    </CPChargeConfigItem>
    <hr v-if="useMinPV || useMinSoc"/>
    
    <!-- Min+PV-Laden -->
    <CPChargeConfigItem title="Min+PV-Laden" :infotext="infotext['minpv']">
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
    <CPChargeConfigItem title="...bei Ladestrom (minimal)" v-if="useMinPV">
      <RangeInput
        id="minCurrent"
        :min="6"
        :max="32"
        :step="1"
        unit="A"
        v-model="cp.pvMinCurrent"
      ></RangeInput>
      
    </CPChargeConfigItem>
    
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ChargePoint } from './model'
import CPChargeConfigItem from './CPChargeConfigItem.vue'
import RangeInput from '@/components/shared/RangeInput.vue'
import { infotext } from '@/assets/js/themeConfig'
const props = defineProps<{
  chargepoint: ChargePoint
}>()
const cp = ref(props.chargepoint)

// methods:

// computed
const chargeTemplateId = computed(() => {
  console.log(cp.value)
  return cp.value.chargeTemplate
})
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
