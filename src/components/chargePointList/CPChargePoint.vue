<template>
  <WBWidget>
    <template v-slot:title>
      <span :style="cpNameStyle" @click="toggleConfig">{{
        props.chargepoint.name
      }}</span>
    </template>

    <template v-slot:buttons>
      <span class="ms-2 pt-1" :style="modePillStyle" @click="toggleConfig">
        <i class="fa me-1" :class="modeIcon"> </i> {{ modeString }}
        <span class="fa-solid fa-lg ps-1 buttonIcon" :class="buttonIcon"></span>
      </span>
    </template>
    <!-- First row -->
    <div class="row m-0 p-1 mt-1">
      <div class="col m-0 p-0 d-flex justify-content-between">
        <!-- Car info -->
        <p
          class="tablecell carinfo p-0 m-0"
          :style="{ color: chargepoint.color }"
          @click="toggleConfig"
        >
          <i class="fa-solid fa-sm fa-car"> </i>
          <span class="ps-2 pe-1 vehicleName">{{
            chargepoint.vehicleName
          }}</span>

          <span
            v-if="chargepoint.hasPriority"
            class="fa-solid fa-xs fa-star ps-1"
          >
          </span>
          <span
            v-if="chargepoint.scheduledCharging"
            class="fa-solid fa-xs fa-clock ps-1"
          >
          </span>
        </p>
        <!-- SoC Info -->
        <p
          class="tablecell p-0 m-0"
          style="text-align: right; vertical-align: middle"
        >
          <BatterySymbol
            v-if="chargepoint.isSocConfigured"
            :soc="soc"
            class="me-1"
          ></BatterySymbol>
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
    <!-- Second row -->
    <div class="row m-1 mt-2 p-0" @click="toggleConfig">
      <div class="col tablecell m-0 mb-1 p-0 d-flex justify-content-between">
        <!-- Status information -->
        <span class="d-flex align-items-baseline">
          <span class="me-2" :style="{ color: statusColor }">
            <i :class="statusIcon"></i>
            {{ statusString }}
          </span>
          <span
            v-if="chargepoint.isCharging && !chargepoint.isLocked"
            class="mx-1"
          >
            <span class="d-flex align-items-center">
              <FormatWatt :watt="chargepoint.power"></FormatWatt>
              <span class="badge phasesInUse rounded-pill">
                {{ chargePhasesString }}</span
              >
              {{ chargeAmpereString }}
            </span>
          </span>
        </span>
        <span>
          <span class="energylabel me-2">Geladen:</span>
          <span>
            <FormatWattH :wattH="chargepoint.dailyYield * 1000"></FormatWattH>
            {{ chargedRangeString }}
          </span>
        </span>
      </div>
    </div>
    <CPChargeConfigPanel
      :chargepoint="chargepoint"
      v-if="showConfig"
      v-on:closeConfig="toggleConfig"
    >
    </CPChargeConfigPanel>
  </WBWidget>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { ChargePoint } from './model'
import { chargemodes } from '@/assets/js/themeConfig'
import WBWidget from '@/components/shared/WBWidget.vue'
import CPChargeConfigPanel from './cpConfig/CPChargeConfigPanel.vue'
import BatterySymbol from '@/components/shared/BatterySymbol.vue'
import FormatWatt from '@/components/shared/FormatWatt.vue'
import FormatWattH from '../shared/FormatWattH.vue'

const props = defineProps<{
  chargepoint: ChargePoint
}>()
// state
let showConfig = ref(false)

// computed
const chargeAmpereString = computed(() => {
  return props.chargepoint.current + ' A'
})
const chargePhasesString = computed(() => {
  return props.chargepoint.phasesInUse
})
const chargedRangeString = computed(() => {
  if (props.chargepoint.dailyYield > 0) {
    return props.chargepoint.averageConsumption
      ? ' / ' +
          (Math.round(
            (props.chargepoint.dailyYield /
              props.chargepoint.averageConsumption) *
              100,
          ) +
            ' km')
      : ''
  } else {
    return ''
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
const buttonIcon = computed(() => {
  return showConfig.value ? 'fa-caret-square-up' : 'fa-caret-square-down'
})
const soc = computed(() => {
  return props.chargepoint.soc
})
const cpNameStyle = computed(() => {
  return { color: props.chargepoint.color }
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
  color: var(--color-menu);
}

.fa-star {
  color: var(--color-evu);
}
.fa-clock {
  color: var(--color-battery);
}
.energylabel {
  color: var(--color-menu);
}
.vehicleName {
  color: var(--color-fg);
}
</style>
>
