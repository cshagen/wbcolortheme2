<template>
  
  <div class="shadow m-2 mt-4 p-1 rounded">
  <CPChargeConfigItem title="Status">
    <span class="status-string">{{ cp.stateStr }}</span>
  </CPChargeConfigItem>
  </div>
  <CPChargeConfigItem v-if="cp.faultState != 0" title="Fehler">
    <span style="color: red"> {{ cp.faultStr }} </span>
  </CPChargeConfigItem>
  
  <div class="m-0 mt-4 p-1">
    <p class="heading ms-0">Konfiguration</p>
  <nav class="nav nav-tabs nav-justified mx-1 mt-1" role="tablist">
    <a
      class="nav-link active"
      data-bs-toggle="tab"
      :data-bs-target="'#chargeSettings'+cpid"
    >
      <i class="fa-solid fa-charging-station"></i>
    </a>
    <a
      class="nav-link"
      data-bs-toggle="tab"
      :data-bs-target="'#instantSettings'+cpid"
      v-if="chargepoint.chargeMode == 'instant_charging'"
    >
      <i class="fa-solid fa-lg fa-bolt"></i>
    </a>
    <a
      class="nav-link"
      data-bs-toggle="tab"
      :data-bs-target="'#pvSettings'+cpid"
      v-if="chargepoint.chargeMode == 'pv_charging'"
    >
      <i class="fa-solid fa-solar-panel me-1"></i>
    </a>
    <a
      class="nav-link"
      data-bs-toggle="tab"
      :data-bs-target="'#timeSettings'+cpid"
      v-if="chargepoint.scheduledCharging"
    >
      <i class="fa-solid fa-clock"></i>
    </a>
    <a
      class="nav-link"
      data-bs-toggle="tab"
      :data-bs-target="'#carSettings'+cpid"
      v-if="chargepoint.isPluggedIn"      
    >
      <i class="fa-solid fa-car"></i>
    </a>
  </nav>
  <!-- Tab panes -->
  <div class="shadow tab-content mx-1 p-1" id="settingsPanes">
    <div
      class="tab-pane active"
      :id="'chargeSettings'+cpid"
      role="tabpanel"
      aria-labelledby="instant-tab"
    >
      <CPChargeConfig :chargepoint="chargepoint"></CPChargeConfig>
    </div>
    <div
      class="tab-pane"
      :id="'instantSettings'+cpid"
      role="tabpanel"
      aria-labelledby="instant-tab"
    >
      <CPConfigInstant
        :chargepoint="cp"
        :vehicles="vehicles"
        :chargeTemplates="chargeTemplates"
      >
      </CPConfigInstant>
    </div>

    <div
      class="tab-pane"
      :id="'pvSettings'+cpid"
      role="tabpanel"
      aria-labelledby="pv-tab"
    >
      <CPConfigPv
        :chargepoint="cp"
        :vehicles="vehicles"
        :chargeTemplates="chargeTemplates"
      >
      </CPConfigPv>
    </div>
   
    <div
      class="tab-pane"
      :id="'timeSettings'+cpid"
      role="tabpanel"
      aria-labelledby="time-tab"
    >
      <CPConfigSchedule 
      :chargeTemplate="chargeTemplate"
      :chargeTemplateId="cp.chargeTemplate"></CPConfigSchedule>
    </div>
  
   <div
      class="tab-pane"
      :id="'carSettings'+cpid"
      role="tabpanel"
      aria-labelledby="car-tab"
    >
      <CPConfigVehicle
      :vehicleId="cp.connectedVehicle"
      ></CPConfigVehicle>
    </div>
  </div>
  <div class="row mt-2">
    <div class="col">
      <button
        type="button"
        class="btn btn-outline-success float-end m-2"
        @click="toggleConfig"
      >
        OK
      </button>
    </div>
  </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { ChargePoint, vehicles, chargeTemplates } from './model'
import CPChargeConfigItem from './CPChargeConfigItem.vue'
import CPConfigInstant from './CPConfigInstant.vue'
import CPConfigPv from './CPConfigPv.vue'
import CPConfigSchedule from './CPConfigSchedule.vue'
import CPConfigVehicle from './CPConfigVehicle.vue'
import CPChargeConfig from './CPChargeConfig.vue'
const props = defineProps<{
  chargepoint: ChargePoint
}>()
const emit = defineEmits(['closeConfig'])
//state
const cp = props.chargepoint

// computed
const chargeTemplate = computed(() => {
  return chargeTemplates[cp.chargeTemplate];
})
const cpid = computed(() => {
  return cp.id
})
// methods
function toggleConfig() {
  emit('closeConfig')
}
// lifecycle
onMounted(() => {
  })
</script>

<style scoped>
.status-string {
  font-size: var(--font-normal);
  font-style: italic;
  color: var(--color-battery);
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
  border-bottom: 0px solid var(--color-menu);
}
.heading {
  color: var(--color-menu);
  
}
</style>
