<template>
  <tr class="tablerow">
    <!-- Column 1: CP Name and flags-->
    <td class="tablecell left" @click="toggleConfig">
      <i :class="statusIcon" class="me-1" :style="statusColor"></i>
      <span class="me-1" :style="nameCellStyle()"> {{ chargepoint.name }}</span>
      <i v-if="chargepoint.hasPriority" class="fa-solid fa-xs fa-star"> </i>
      <i v-if="chargepoint.scheduledCharging" class="fa-solid fa-xs fa-clock">
      </i>
    </td>
    <!-- Column 2: Vehicle, SoC-->
    <td class="tablecell left">
      {{ chargepoint.vehicleName }} 
      <br />
      <span v-if="chargepoint.isSocConfigured">
        <i class="fa" :class="batterySymbol"></i>
        {{ chargepoint.soc }} %
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
      </span>
    </td>
    <!-- Column 3: Mode, Power -->
    <td class="tablecell left" @click="toggleConfig" >
      <span class="d-flex align-items-center">
        {{ chargePowerString }}
        <span class="badge phasesInUse rounded-pill"> {{ chargePhasesString}}</span>
         {{ chargeAmpereString }}
      </span>
      
      <span :style="modeStyle">
        <i class="fa me-1" :class="modeIcon"> </i> {{ modeString }}
      </span>
      </td>
    <!-- Column 4: Energy, Range -->
    <td class="tablecell left" @click="toggleConfig">
      <span>{{ chargeEnergyString }}</span> <br />
      <span>{{ chargedRangeString }}</span>
    </td>

    <td class="tablecell right">
      <span
        class="fa-solid fa-lg fa-edit ps-1 tableicon"
        @click="toggleConfig"
      ></span>
    </td>
  </tr>
  <tr v-if="showConfig">
    <td  colspan="5" class="px-0">
      <CPChargeConfigPanel
        :chargepoint="chargepoint"
        v-if="showConfig"
        v-on:closeConfig="toggleConfig"
      >
      </CPChargeConfigPanel>
    </td>
    <header></header>
  </tr>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { ChargePoint } from '../model'
import { chargemodes, globalConfig } from '@/assets/js/themeConfig'
import { formatWatt, formatWattH } from '@/assets/js/helpers'
import CPChargeConfigPanel from '../cpConfig/CPChargeConfigPanel.vue'
const props = defineProps<{
  chargepoint: ChargePoint
}>()
const phaseSymbols = ['/', '\u2460', '\u2461', '\u2462']
const showConfig = ref(false)
const modeIcon = computed(() => {
  return chargemodes[props.chargepoint.chargeMode].icon
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
const statusColor = computed(() => {
  let result = { color: 'var(--color-axis)' }
  if (props.chargepoint.isLocked) {
    result.color = 'var(--color-evu)'
  } else if (props.chargepoint.isCharging) {
    result.color = 'var(--color-charging)'
  } else if (props.chargepoint.isPluggedIn) {
    result.color = 'var(--color-battery)'
  }
  return result
})
const modeStyle = computed(() => {
  switch (props.chargepoint.chargeMode) {
    case 'stop':
      return { color: 'var(--fg)' }
    default:
      return {
        color: chargemodes[props.chargepoint.chargeMode].color,
      }
  }
})
const chargePowerString = computed(() => {
  return (
    formatWatt(props.chargepoint.power, globalConfig.decimalPlaces) 
  )
})
const chargeAmpereString = computed(() => {
  return (props.chargepoint.current + ' A')
})
const chargePhasesString = computed(() => {
  return (props.chargepoint.phasesInUse)
})
const chargeEnergyString = computed(() => {
  if (props.chargepoint.dailyYield > 0) {
    return formatWattH(props.chargepoint.dailyYield, globalConfig.decimalPlaces)
  } else {
    return '0 Wh'
  }
})
const chargedRangeString = computed(() => {
  if (props.chargepoint.averageConsumption > 0 && props.chargepoint.dailyYield > 0) {
    return (
      '(' +
      Math.round(
        props.chargepoint.dailyYield / props.chargepoint.averageConsumption,
      ).toString() +
      ' km)'
    )
  } else {
    return ''
  }
})
const modeString = computed(() => {
  return chargemodes[props.chargepoint.chargeMode].name
})
const batterySymbol = computed(() => {
  if (props.chargepoint.soc <= 10) {
    return 'fa-battery-empty'
  } else if (props.chargepoint.soc < 50) {
    return 'fa-battery-quarter'
  } else if (props.chargepoint.soc < 75) {
    return 'fa-battery-half'
  } else if (props.chargepoint.soc < 95) {
    return 'fa-battery-three-quarters'
  } else {
    return 'fa-battery-full'
  }
})

function nameCellStyle() {
  return { color: props.chargepoint.color }
}
function toggleConfig() {
  showConfig.value = !showConfig.value
}
</script>

<style scoped>
.tablerow {
  margin: 14px;
  
}
.tablecell {
  color: var(--color-fg);
  text-align: center;
  
  padding-top: 2px;
  padding-left: 2px;
  padding-right: 2px;
  vertical-align:baseline;
  line-height: 1.4rem;
}
.tablecell.left {
  text-align: left;
}
.tablecell.right {
  text-align: right;
  
}
.tablecolum1 {
  color: var(--color-fg);
  text-align: left;
  margin: 0;
  padding: 0;
}

.tableicon {
  color: var(--color-menu);
}
.fa-star {
  color: var(--color-evu);
}
.fa-clock {
  color: var(--color-battery);
}

</style>
