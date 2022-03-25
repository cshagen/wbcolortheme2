<template>
  <div class="pt-2">
    <p class="heading ms-1">
      Minimaler Ladestand (PV-Laden):
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
import RangeInput from '@/components/shared/RangeInput.vue'
const props = defineProps<{
  chargepoint: ChargePoint
}>()
const cp = ref(props.chargepoint)

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
