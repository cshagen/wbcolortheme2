<template>
  <div>
    <hr />
    <CPChargeConfigItem title="Status">
      <span class="status-string">{{ cp.stateStr }}</span>
    </CPChargeConfigItem>
    <CPChargeConfigItem v-if="cp.faultState != 0" title="Fehler">
      <span style="color: red"> {{ cp.faultStr }} </span>
    </CPChargeConfigItem>
    <hr />

    <CPChargeConfigItem :title="'Ladepunkt gesperrt'">
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
    <!-- Select the vehicle -->
    <CPChargeConfigItem title="Fahrzeug">
      <SelectInput
        :options="Object.values(vehicles).map((v) => [v.name, v.id])"
        v-model.number="cp.connectedVehicle"
      ></SelectInput>
    </CPChargeConfigItem>
    <!-- Select the charge mode -->
    <CPChargeConfigItem :title="'Lademodus'">
      <SelectInput
        :options="
          Object.keys(chargemodes).map((v) => [chargemodes[v].name, v])
        "
        v-model="cp.chargeMode"
      ></SelectInput>
    </CPChargeConfigItem>
    <!-- Priority -->
    <CPChargeConfigItem title="Priorität">
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
    <CPChargeConfigItem title="Zeitplan beachten">
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

    <CPConfigInstant
      :chargepoint="cp"
      :vehicles="vehicles"
      :chargeTemplates="chargeTemplates"
    >
    </CPConfigInstant>
    <CPConfigPv
      :chargepoint="cp"
      :vehicles="vehicles"
      :chargeTemplates="chargeTemplates"
    >
    </CPConfigPv>
    <hr />
    <div class="row">
      <div class="col">
        <button
          type="button"
          class="btn btn-outline-success float-end"
          @click="toggleConfig"
        >
          OK
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { chargemodes } from '@/assets/js/themeConfig'
import { ChargePoint, vehicles, chargeTemplates } from './model'
import CPChargeConfigItem from './CPChargeConfigItem.vue'
import CPConfigInstant from './CPConfigInstant.vue'
import CPConfigPv from './CPConfigPv.vue'
import SelectInput from '@/components/SelectInput.vue'
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
</style>
