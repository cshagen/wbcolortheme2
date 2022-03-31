<template>
  <p class="settingsheader mt-2 ms-1">Ladepunkt:</p>
  <!-- Select the charge mode -->
  <CPChargeConfigItem title="Lademodus" :infotext="infotext['chargemode']">
    <SelectInput
      :options="Object.keys(chargemodes).map((v) => [chargemodes[v].name, v])"
      v-model="cp.chargeMode"
    ></SelectInput>
  </CPChargeConfigItem>
  <!-- Select the vehicle -->
  <CPChargeConfigItem title="Fahrzeug" :infotext="infotext['vehicle']">
    <SelectInput
      :options="Object.values(vehicles).map((v) => [v.name, v.id])"
      v-model.number="cp.connectedVehicle"
    ></SelectInput>
  </CPChargeConfigItem>
  <CPChargeConfigItem title="Sperren" :infotext="infotext['locked']">
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="lockCPSwitch"
        v-model="cp.isLocked"
      />
    </div>
  </CPChargeConfigItem>
  <!-- Priority -->
  <CPChargeConfigItem title="Priorität" :infotext="infotext['priority']">
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="prioritySwitch"
        v-model="cp.hasPriority"
      />
    </div>
  </CPChargeConfigItem>
  <!-- Scheduled Charging -->
  <CPChargeConfigItem title="Zeitplan" :infotext="infotext['timeplan']">
    <div class="form-check form-switch">
      <input
        class="form-check-input"
        type="checkbox"
        role="switch"
        id="scheduledChargingSwitch"
        v-model="cp.scheduledCharging"
      />
    </div>
  </CPChargeConfigItem>
</template>

<script setup lang="ts">
import { chargemodes } from '@/assets/js/themeConfig'
import { ChargePoint, vehicles } from './model'
import CPChargeConfigItem from './CPChargeConfigItem.vue'
import SelectInput from '@/components/shared/SelectInput.vue'
import { infotext } from '@/assets/js/themeConfig'
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
