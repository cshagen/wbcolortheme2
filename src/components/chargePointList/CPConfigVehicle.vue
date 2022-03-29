<template>
  <p class="settingsheader mt-2 ms-1">Profile für Fahrzeug {{ vehicles[vehicleId].name }}:</p>
  <!-- Select the charge mode -->
  <CPChargeConfigItem title="Ladeprofil">
    <SelectInput
      :options="Object.keys(chargeTemplates).map((v) => [chargeTemplates[+v].name, v])"
      v-model.number="vehicles[vehicleId].chargeTemplateId"
     ></SelectInput>
  </CPChargeConfigItem>
  <!-- Select the Vehicle Template -->
  <CPChargeConfigItem title="Fahrzeugprofil">
    <SelectInput
      :options="Object.keys(evTemplates).map((v) => [evTemplates[+v].name, v])"
      v-model.number="vehicles[vehicleId].evTemplateId"
      ></SelectInput>
  </CPChargeConfigItem>
 
  
</template>

<script setup lang="ts">
import { vehicles, chargeTemplates, evTemplates } from './model'
import CPChargeConfigItem from './CPChargeConfigItem.vue'
import SelectInput from '@/components/shared/SelectInput.vue'
const props = defineProps<{
  vehicleId: number
}>()
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
