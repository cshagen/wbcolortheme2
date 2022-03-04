<template>
  <div>
    <hr />
    <cp-charge-config-item :title="'Ladepunkt sperren?'">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="lockCPSwitch"
          v-model="cp.isLocked"
          @change="lockCP"
        />
      </div>
    </cp-charge-config-item>
    <!-- Select the vehicle -->
    <cp-charge-config-item :title="'Fahrzeug:'">
        <select v-model="cp.carId" 
          class="form-select chargeConfigSelect" 
          @change="setVehicle"
        >
          <option v-for="(car, index) in vehicles" 
            :key="index"
            :value="index"
            
          >
          {{ car.name }}
          </option>
        </select>
      
    </cp-charge-config-item>
    <!-- Select the charge mode -->
    <cp-charge-config-item :title="'Lademodus:'">
        <select v-model="cp.chargeMode" 
          class="form-select chargeConfigSelect" 
          @change="setChargeMode"
        >
          <option v-for="(key, index) in Object.keys(chargemodes)" 
            :key="index"
            :value="key"
          >
            {{ chargemodes[key].name }} 
          </option>
        </select>
    </cp-charge-config-item>
    <!-- Priority -->
    <cp-charge-config-item title="Priorität:">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="prioritySwitch"
          v-model="cp.hasPriority"
          @change="setPriority"
        />
      </div>
      </cp-charge-config-item>
    <!-- Scheduled Charging -->
    <cp-charge-config-item title="Zeitladen:">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          role="switch"
          id="scheduledChargingSwitch"
          v-model="cp.scheduledCharging"
          @change="setScheduledCharging"
        />
      </div>
    </cp-charge-config-item>
   
   <cpConfigInstant
    :chargepoint="cp"
    :vehicles="vehicles"
    :chargeTemplates="chargeTemplates">
    </cpConfigInstant>
    <CpConfigPv
    :chargepoint="cp"
    :vehicles="vehicles"
    :chargeTemplates="chargeTemplates">
    </CpConfigPv>
    <hr />
<div class=" row ">
  <div class="col">
    <button type="button" class="btn btn-outline-success float-end" @click="toggleConfig">
      OK
    </button>
</div>
</div>
  </div>
</template>

<script>
import globalConf from "@/assets/mixins/themeConfig.js";
import cpChargeConfigItem from "./cpChargeConfigItem.vue";
import cpConfigInstant from './cpConfigInstant.vue'
import CpConfigPv from './CpConfigPv.vue'
import { eventBus } from '@/main.js'

export default {
  name: "cpChargeConfig",
  props: {
    chargepoint: Object,
    vehicles: Array,
    chargeTemplates: Array
  },
  mixins: [globalConf],
  components: {
    cpChargeConfigItem,
    cpConfigInstant,
    CpConfigPv,
  },
  data() {
    return {
      cp: this.chargepoint,
  };
  },
  methods: {
    toggleConfig() {
      this.$emit("closeConfig");
    },
    lockCP() {
      eventBus.$emit ('update', 'cpLock', this.cp.isLocked, this.cp.cpId)
    },
    setChargeMode() {
      eventBus.$emit ('update', 'chargeMode', this.cp.chargeMode, this.cp.chargeTemplate)
    },
    setPriority() {
      eventBus.$emit ('update', 'cpPriority', this.cp.hasPriority, this.cp.chargeTemplate)
    },
    setScheduledCharging() {
      eventBus.$emit ('update', 'scheduledCharging', this.cp.scheduledCharging, this.cp.chargeTemplate)
    },
    setVehicle() {
      this.cp.carName=this.vehicles[this.cp.carId].name
      eventBus.$emit ('update', 'cpVehicle', this.cp.carId, this.cp.cpId)
    }
  },
};
</script>

<style scoped>

.chargeConfigSelect {
  background: var(--color-bg);
  color: var(--color-fg);
}
.chargeModeOption {
  background: green;
  color: blue;
}
</style>
