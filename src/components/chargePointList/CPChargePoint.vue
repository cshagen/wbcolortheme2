<template>
  <WBWidget>
    <template v-slot:title>
      <span @click="toggleConfig">{{ props.chargepoint.name }}</span>
    </template>
    
    <template v-slot:buttons>
      <span
        class="ms-2 pt-1  "
        :style="modePillStyle"
        @click="toggleConfig"
      >
        <i class="fa me-1" :class="modeIcon"> </i> {{ modeString }}
        <span class="fa-solid fa-lg ps-1 buttonIcon" :class="buttonIcon"></span>
      </span>
    </template>

    <div class="row m-0 ps-1 mt-1" @click="toggleConfig">
      <div class="col-8 m-0 p-0">
        <p
          class="tablecell nameButtonCell p-0 m-0"
          :style="{ color: chargepoint.color }"
        >
          <i class="fa-solid fa-sm fa-car"> </i>
          <span class="px-2">{{ chargepoint.vehicleName }}</span>
          <span
            v-if="chargepoint.scheduledCharging" 
            class="fa-solid fa-xs fa-clock pl-1"
            :style="{ color: 'var(--color-fg)' }"
          >
          </span>
        </p>
      </div>
      <div class="col-4 m-0 p-0">
        <!-- SoC Information -->
        <p
          class="tablecell p-0 m-0"
          style="text-align: right; vertical-align: middle"
        >
          <span v-if="chargepoint.isSocConfigured" class="px-2">
            <i class="fa" :class="batterySymbol"></i>
            {{ soc + '%' }}
          </span>
          <i
            v-if="chargepoint.isSocManual"
            class="fa-solid fa-sm fas fa-edit"
            :style="{ color: 'var(--color-menu)' }"
          ></i>
          <i
            v-if="!chargepoint.isSocManual"
            class="fa-solid fa-sm fa-sync"
            :style="{ color: 'var(--color-menu)' }"
          ></i>
        </p>
      </div>
    </div>
    <div
      class="row m-1 mt-2 p-0"
      style="vertical-align: middle"
      @click="toggleConfig"
    >
      <div class="col-6 tablecell m-0 p-0">
        <span
          class="me-2 "
          :style="{ color: statusColor }"
        >
          <i :class="statusIcon"></i>
          {{ statusString }}
        </span>
        <span
          v-if="chargepoint.isCharging && !chargepoint.isLocked"
          class="mx-1"
        >
          {{ chargePowerString }}
        </span>
      </div>
      <div class="col-6 tablecell m-0 p-0" style="text-align: right">
        Geladen:
        <span>
          {{ chargeEnergyString }}
        </span>
      </div>
    </div>
    <CPChargeConfig
      :chargepoint="chargepoint"
      v-if="showConfig"
      v-on:closeConfig="toggleConfig"
    >
    </CPChargeConfig>
  </WBWidget>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatWatt, formatWattH } from '@/assets/js/helpers'
import type { ChargePoint, Vehicle } from './model'
import { globalConfig, chargemodes } from '@/assets/js/themeConfig'
import WBWidget from '../WBWidget.vue'
import CPChargeConfig from './CPChargeConfig.vue'

const props = defineProps<{
  chargepoint: ChargePoint
}>()
// state
const phaseSymbols = ['/', '\u2460', '\u2461', '\u2462']
let showConfig = ref(false)

// computed
const switchStyle = computed(() => {
  return {
    'fa-toggle-on': true,
    'fa-toggle-off': false,
    'text-green': true,
    'text-red': false,
  }
})
const plugStyle = computed(() => {
  return {
    'text-orange': !props.chargepoint.isCharging,
    'text-green': props.chargepoint.isCharging,
  }
})
const chargePowerString = computed(() => {
  return (
    formatWatt(props.chargepoint.power, globalConfig.decimalPlaces) +
    ' ' +
    phaseSymbols[props.chargepoint.phasesInUse] +
    ' ' +
    props.chargepoint.current +
    ' A'
  )
})
const chargeEnergyString = computed(() => {
  if (props.chargepoint.dailyYield > 0) {
    return (
      formatWattH(props.chargepoint.dailyYield, globalConfig.decimalPlaces) +
         
        ((props.chargepoint.averageConsumption) ?
        ' / ' + (Math.round(props.chargepoint.dailyYield /
          props.chargepoint.averageConsumption /
          10) 
          + ' km') : ""
    ))
  } else {
    return '0 Wh'
  }
})
const statusString = computed(() => {
  if (props.chargepoint.isLocked) {
    return 'Gesperrt'
  } else if (props.chargepoint.isCharging) {
    return 'Lädt'
  } else if (props.chargepoint.isPluggedIn) {
    return 'Bereit'
  } else {
    return 'Frei'
  }
})
const statusColor = computed(() => {
  if (props.chargepoint.isLocked) {
    return 'var(--color-evu)'
  } else if (props.chargepoint.isCharging) {
    return 'var(--color-charging)'
  } else if (props.chargepoint.isPluggedIn) {
    return 'var(--color-battery)'
  } else {
    return 'var(--color-axis)'
  }
})
const statusIcon = computed(() => {
  let icon = ''
  if (props.chargepoint.isLocked) {
    icon = 'fa-lock'
  } else if (props.chargepoint.isCharging) {
    icon = ' fa-bolt'
  } else if (props.chargepoint.isPluggedIn) {
    icon = 'fa-plug'
  }
  return 'fa ' + icon
})

const modePillStyle = computed(() => {
  switch (props.chargepoint.chargeMode) {
    case 'stop':
      return { color: 'var(--fg)' }
    default:
      return {
        color: chargemodes[props.chargepoint.chargeMode].color,
      }
  }
})
const modeString = computed(() => {
  return chargemodes[props.chargepoint.chargeMode].name
})
const modeIcon = computed(() => {
  return chargemodes[props.chargepoint.chargeMode].icon
})
const batterySymbol = computed(() => {
  if (soc.value <= 10) {
    return 'fa-battery-empty'
  } else if (soc.value <= 50) {
    return 'fa-battery-quarter'
  } else if (soc.value <= 75) {
    return 'fa-battery-half'
  } else if (soc.value < 95) {
    return 'fa-battery-three-quarters'
  } else {
    return 'fa-battery-full'
  }
})
const buttonIcon = computed(() => {
  return showConfig.value ? 'fa-caret-square-up' : 'fa-caret-square-down'
})
const soc = computed(() => {
  return props.chargepoint.soc
})

// methods
function toggleConfig() {
  showConfig.value = !showConfig.value
}
</script>

<style scoped>
.modeIndicator {
  color: white;
}
.outlinePill {
  border: 1px solid;
  background: var(--color-bg);
  vertical-align: bottom;
  font-size: var(--font-verysmall);
}
.statusIndicator {
  border: 1px solid;
  background: 'var(--bg) ';
}
.buttonIcon {
  color: var(--color-menu)
}
</style>
>
