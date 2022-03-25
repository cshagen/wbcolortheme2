<template>
  <div class="mt-2">
    <p class="heading ms-1">
      Sofortladen:
    </p>

    <!-- Ampere -->
    <CPChargeConfigItem title="Stromstärke">
      <RangeInput
        id="targetCurrent"
        :min="6"
        :max="32"
        :step="1"
        unit="A"
        v-model="cp.instantTargetCurrent"
      ></RangeInput>
    </CPChargeConfigItem>
    <hr v-if="cp.instantChargeLimitMode != 'none'" />
    <!-- Limit Mode -->
    <CPChargeConfigItem title="Begrenzung">
      <SelectInput
        :options="instantChargeLimitModes.map((e) => [e.name, e.id])"
        v-model="cp.instantChargeLimitMode"
      
        ></SelectInput
      >
      
    </CPChargeConfigItem>
    <!-- Max SoC -->
    <CPChargeConfigItem
      v-if="cp.instantChargeLimitMode == 'soc'"
      title="Maximaler SoC"
    >
      <RangeInput
        id="maxSoc"
        :min="0"
        :max="100"
        :step="1"
        unit="%"
        v-model="cp.instantTargetSoc"
      ></RangeInput>
    </CPChargeConfigItem>

    <!-- Max Energy -->
    <CPChargeConfigItem
      v-if="cp.instantChargeLimitMode == 'amount'"
      title="Zu ladende Energie"
    >
      <RangeInput
        id="maxEnergy"
        :min="0"
        :max="100"
        :step="1"
        unit="kWh"
        v-model="cp.instantMaxEnergy"
      ></RangeInput>
    </CPChargeConfigItem>
  </div>
</template>

<script setup lang="ts">
// import { eventBus } from '@/main.js'
import { ref, computed } from 'vue'
import type { ChargePoint } from './model'
import CPChargeConfigItem from './CPChargeConfigItem.vue'
import RangeInput from '@/components/shared/RangeInput.vue'
import SelectInput from '@/components/shared/SelectInput.vue'
const props = defineProps<{
  chargepoint: ChargePoint
}>()
const cp = ref(props.chargepoint)
const instantChargeLimitModes = [
  { name: 'keine', id: 'none' },
  { name: 'EV-SoC', id: 'soc' },
  { name: 'Energiemenge', id: 'amount' },
]
// methods
</script>

<style scoped>
.chargeConfigSelect {
  background: var(--color-bg);
  color: var(--color-fg);
}
.heading {
  color: var(--color-charging);
}
</style>
