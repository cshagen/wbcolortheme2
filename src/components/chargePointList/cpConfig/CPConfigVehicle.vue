<template>
  <p class="settingsheader mt-2 ms-1">
    Profile für {{ vehicles[vehicleId].name }}:
  </p>
  <!-- Select the charge mode -->
  <ConfigItem title="Ladeprofil" icon="fa-sliders">
    <RadioInput
      :options="
        Object.keys(chargeTemplates).map((v) => [chargeTemplates[+v].name, v])
      "
      v-model.number="vehicles[vehicleId].chargeTemplateId"
    ></RadioInput>
  </ConfigItem>
  <!-- Select the Vehicle Template -->
  <ConfigItem title="Fahrzeug-Vorlage" icon="fa-sliders" class="mb-2">
    <RadioInput
      :options="Object.keys(evTemplates).map((v) => [evTemplates[+v].name, v])"
      v-model.number="vehicles[vehicleId].evTemplateId"
    ></RadioInput>
  </ConfigItem>
</template>

<script setup lang="ts">
import { vehicles, chargeTemplates, evTemplates } from '../model'
import ConfigItem from '../../shared/ConfigItem.vue'
import RadioInput from '../../shared/RadioInput.vue'
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
