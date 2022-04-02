<template>
  <p class="settingsheader mt-2 ms-1">Ladepunkt:</p>
  <!-- Select the charge mode -->
  <ConfigItem title="Lademodus" icon="fa-charging-station" :infotext="infotext['chargemode']">
    <SelectInput
      :options="Object.keys(chargemodes).map((v) => [chargemodes[v].name, v])"
      v-model="cp.chargeMode"
    ></SelectInput>
  </ConfigItem>
  <!-- Select the vehicle -->
  <ConfigItem title="Fahrzeug" icon = "fa-car" :infotext="infotext['vehicle']">
    <SelectInput
      :options="Object.values(vehicles).map((v) => [v.name, v.id])"
      v-model.number="cp.connectedVehicle"
    ></SelectInput>
  </ConfigItem>
  <ConfigItem title="Sperren" icon = "fa-lock" :infotext="infotext['locked']">
    <SwitchInput v-model="cp.isLocked"></SwitchInput> 
  </ConfigItem>
  <!-- Priority -->
  <ConfigItem title="Priorität" icon = "fa-star" :infotext="infotext['priority']">
    <SwitchInput v-model="cp.hasPriority"></SwitchInput> 
  </ConfigItem>
  <!-- Scheduled Charging -->
  <ConfigItem title="Zeitplan" icon = "fa-clock" :infotext="infotext['timeplan']">
    <SwitchInput v-model="cp.scheduledCharging"></SwitchInput> 
  </ConfigItem>
</template>

<script setup lang="ts">
import { chargemodes } from '@/assets/js/themeConfig'
import { ChargePoint, vehicles } from './model'
import ConfigItem from '../shared/ConfigItem.vue'
import SelectInput from '@/components/shared/SelectInput.vue'
import { infotext } from '@/assets/js/themeConfig'
import SwitchInput from '../shared/SwitchInput.vue'
const props = defineProps<{
  chargepoint: ChargePoint
}>()
const emit = defineEmits(['closeConfig'])
//state
const cp = props.chargepoint

// methods
function toggleConfig() {
  console.log(vehicles)
  emit('closeConfig')
}
</script>

<style scoped>
.status-string {
  font-size: var(--font-normal);
  font-style: italic;
  color: var(--color-battery);
}
.chargeConfigSelect {
  background: var(--color-bg);
  color: var(--color-fg);
}
.chargeModeOption {
  background: green;
  color: blue;
}
.nav-tabs .nav-link {
  color: var(--color-menu);
  opacity: 0.5;
}
.nav-tabs .nav-link.disabled {
  color: var(--color-axis);
  border: 0.5px solid var(--color-axis);
}

.nav-tabs .nav-link.active {
  color: var(--color-fg);
  background-color: var(--color-bg);
  opacity: 1;
  border: 1px solid var(--color-menu);
  border-bottom: 1px solid var(--color-menu);
}

.settingsheader {
  color: var(--color-charging);
}
</style>
