<template>
  <ConfigItem title="Farbschema" icon="fa-adjust" infotext="Hintergrundfarbe">
    <RadioInput
      :options="colorschemes"
      v-model="globalConfig.displayMode"
    ></RadioInput>
  </ConfigItem>
  <ConfigItem
    title="Grafik: Raster"
    icon="fa-th"
    infotext="Verwende ein Hintergrundraster in den Grafiken"
  >
    <SwitchInput v-model="globalConfig.showGrid"></SwitchInput>
  </ConfigItem>
  <ConfigItem
    title="Variable Bogenlänge"
    icon="fa-chart-area"
    infotext="Im Graph 'Aktuelle Leistung' können die Bögen immer die volle Länge haben, oder entsprechend des aktuellen Gesamtleistung verkürzt dargestellt werden."
  >
    <SwitchInput v-model="globalConfig.showRelativeArcs"></SwitchInput>
  </ConfigItem>
  <ConfigItem
    title="Bögen zurücksetzen"
    icon="fa-undo"
    infotext="Durch Click auf den Button wird die Maximallänge der Bögen auf den aktuellen Wert gesetzt."
    v-if="globalConfig.showRelativeArcs"
  >
    <button
      v-if="globalConfig.showRelativeArcs"
      class="btn btn-secondary"
      @click="emit('resetArcs')"
    >
      Reset
    </button>
  </ConfigItem>
  <ConfigItem
    title="Anzahl Dezimalstellen"
    icon="fa-sliders-h"
    infotext="Alle kW- und kWh-Werte werden mit der gewählten Anzahl an Stellen angezeigt."
  >
    <SelectInput
      :options="decimalDisplay"
      v-model="globalConfig.decimalPlaces"
    ></SelectInput>
  </ConfigItem>
  <ConfigItem
    title="Farbschema Smart-Home-Geräte"
    icon="fa-palette"
    infotext="Für die Smart-Home-Geräte stehen mehrere Schemata zur Verfügung."
  >
    <RadioInput
      :options="shSchemes"
      v-model="globalConfig.smartHomeColors"
    ></RadioInput>
  </ConfigItem>
  <ConfigItem
    title="Kompakte Ladepunktliste"
    icon="fa-list"
    infotext="Zeige eine einzelne Ladepunktliste statt separater Element pro Ladepunkt."
  >
    <SwitchInput v-model="globalConfig.simpleCpList"></SwitchInput>
  </ConfigItem>
  <ConfigItem
    title="Filter-Buttons"
    icon="fa-filter"
    infotext="Hauptseite mit Buttons zur Auswahl der Kategorie."
  >
    <SwitchInput v-model="globalConfig.showQuickAccess"></SwitchInput>
  </ConfigItem>
  <ConfigItem
    title="Animationen"
    icon="fa-film"
    infotext="Animationen anzeigen"
  >
    <SwitchInput v-model="globalConfig.showAnimations"></SwitchInput>
  </ConfigItem>
</template>

<script setup lang="ts">
import { globalConfig } from '@/assets/js/themeConfig'
import SelectInput from '@/components/shared/SelectInput.vue'
import ConfigItem from '@/components/shared/ConfigItem.vue'
import SwitchInput from './shared/SwitchInput.vue'
import RadioInput from './shared/RadioInput.vue'
const emit = defineEmits(['resetArcs'])
const colorschemes: [string, string][] = [
  ['Dunkel', 'dark'],
  ['Hell', 'light'],
  ['Blau', 'blue'],
]
const decimalDisplay: [string, string][] = [
  ['3 kW', '0'],
  ['3,1 kW', '1'],
  ['3,14 kW', '2'],
  ['3,141 kW', '3'],
  ['3141 W', '4'],
]
const shSchemes: [string, string][] = [
  ['Orange', 'normal'],
  ['Grün/Violett', 'standard'],
  ['Bunt', 'advanced'],
]
</script>
