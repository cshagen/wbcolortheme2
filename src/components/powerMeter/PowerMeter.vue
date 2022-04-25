<template>
  <WBWidget>
    <template v-slot:title>Aktuelle Leistung</template>
    <template v-slot:buttons>
      <button class="btn btn-outline-secondary btn-sm" data-bs-toggle="modal" data-bs-target="#themeconfig">
      <span class="fa-solid fa-bars px-0"></span>
    </button>
      </template>
    <figure id="powermeter" class="p-0 m-0">
      <svg :viewBox="'0 0 ' + width + ' ' + height">
        <g :transform="'translate(' + width / 2 + ',' + height / 2 + ')'">
          <!-- Show the two arcs -->
          <PMSourceArc
            :sourceSummary="sourceSummary"
            :radius="radius"
            :cornerRadius="cornerRadius"
            :circleGapSize="circleGapSize"
            :emptyPower="emptyPower"
          ></PMSourceArc>

          <PMUsageArc
            :usageSummary="usageSummary"
            :shDevice="shDevices"
            :radius="radius"
            :cornerRadius="cornerRadius"
            :circleGapSize="circleGapSize"
            :emptyPower="emptyPower"
          ></PMUsageArc>

          <!-- Show the values for the different categories -->
          <PMLabel
            :x="0"
            :y="((-height / 2) * 3) / 5"
            :data="sourceSummary.pv"
            :anchor="'middle'"
            :config="globalConfig"
          />
          <PMLabel
            :x="0"
            :y="((-height / 2) * 2) / 5"
            :data="sourceSummary.evuIn"
            :anchor="'middle'"
            :config="globalConfig"
          />
          <PMLabel
            :x="width / 2 - margin / 4"
            :y="height / 2 - margin + 15"
            :data="sourceSummary.batOut"
            :anchor="'end'"
            :config="globalConfig"
          />
          <PMLabel
            :x="0"
            :y="((-height / 2) * 2) / 5"
            :data="usageSummary.evuOut"
            :anchor="'middle'"
            :config="globalConfig"
          />
          <PMLabel
            :x="0"
            :y="((height / 2) * 1) / 5"
            :data="usageSummary.charging"
            :anchor="'middle'"
            :config="globalConfig"
          />
          <PMLabel
            :x="0"
            :y="((height / 2) * 3) / 5"
            :data="usageSummary.devices"
            :anchor="'middle'"
            :config="globalConfig"
          />
          <PMLabel
            :x="width / 2 - margin / 4"
            :y="height / 2 - margin + 15"
            :data="usageSummary.batIn"
            :anchor="'end'"
            :config="globalConfig"
          />
          <PMLabel
            :x="0"
            :y="((height / 2) * 2) / 5"
            :data="usageSummary.house"
            :anchor="'middle'"
            :config="globalConfig"
          />
          <!-- Show the SoC for the first two cars -->
          <PMLabel
            v-if="chargepoints.length > 0 && chargepoints[0].isSocConfigured"
            :x="-width / 2 - margin / 4 + 10"
            :y="-height / 2 + margin + 5"
            :labeltext="chargepoints[0].name + ': ' + soc(0) + '%'"
            :labelcolor="chargepoints[0].color"
            :anchor="'start'"
            :config="globalConfig"
          />
          <PMLabel
            v-if="chargepoints.length > 1 && chargepoints[1].isSocConfigured"
            :x="width / 2 + margin / 4 - 10"
            :y="-height / 2 + margin + 5"
            :labeltext="chargepoints[1].name + ': ' + soc(1) + '%'"
            :labelcolor="chargepoints[1].color"
            :anchor="'end'"
            :config="globalConfig"
          />
          <!-- Show the SoC of the 1st battery -->
          <PMLabel
            v-if="globalData.batterySoc > 0"
            :x="-width / 2 - margin / 4 + 10"
            :y="height / 2 - margin + 15"
            :labeltext="'Speicher: ' + globalData.batterySoc + '%'"
            :labelcolor="usageSummary.batIn.color"
            :anchor="'start'"
            :config="globalConfig"
          />
          <!-- Show the current consumption -->
          <PMLabel
            :x="0"
            :y="0"
            :labeltext="'Aktueller Verbrauch: ' + currentConsumptionString"
            labelcolor="var(--color-fg)"
            anchor="middle"
            :config="globalConfig"
          />
          <!-- Show the Peak value if we use relative arc lengths -->
          <text
            v-if="globalConfig.showRelativeArcs"
            :x="width / 2 - 44"
            y="2"
            text-anchor="middle"
            fill="var(--color-axis)"
            font-size="12"
          >
            Peak: {{ maxPowerString }}
          </text>
        </g>
      </svg>
    </figure>
    <ModalComponent modal-id="themeconfig">
      <template v-slot:title>Look & Feel</template>
    <ThemeSettings @resetArcs="resetArcs"></ThemeSettings>
    </ModalComponent>
  </WBWidget>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { globalConfig } from '@/assets/js/themeConfig'
import { globalData, shDevices, sourceSummary, usageSummary } from '@/assets/js/model'
import { chargePoints } from '@/components/chargePointList/model'
import PMSourceArc from './PMSourceArc.vue';
import PMUsageArc from './PMUsageArc.vue'
import PMLabel from "./PMLabel.vue";
import WBWidget from "../shared/WBWidget.vue";
import { formatWatt } from "@/assets/js/helpers";
import ModalComponent from "../shared/ModalComponent.vue";
import ThemeSettings from "../ThemeSettings.vue";

// state:
const width = 500
const margin = 20
const cornerRadius = 1
const circleGapSize = Math.PI / 40

// computed
const height = computed(() => {
  return width
})
const radius = computed(() => {
  return width / 2 - margin;
})
const currentConsumptionString = computed(() => {
  return formatWatt(
    usageSummary.house.power +
    usageSummary.charging.power +
    usageSummary.devices.power +
    usageSummary.batIn.power,
    globalConfig.decimalPlaces
  );
})
const maxPowerString = computed(() => {
  let currentPower =
    sourceSummary.pv.power +
    sourceSummary.evuIn.power +
    sourceSummary.batOut.power;
  return globalConfig.maxPower > currentPower
    ? formatWatt(globalConfig.maxPower, globalConfig.decimalPlaces)
    : formatWatt(currentPower, globalConfig.decimalPlaces);
})
const chargepoints  = computed(() => {
  return Object.values(chargePoints);
})
const emptyPower = computed(() => {
  // with relative arcs, this is the empty portion of the arc
  let result = 0
  if (globalConfig.showRelativeArcs) {
    result =
      globalConfig.maxPower -
      (sourceSummary.pv.power +
        sourceSummary.evuIn.power +
        sourceSummary.batOut.power)
  }
  return result < 0 ? 0 : result
})
// methods
function resetArcs() {
  let maxPower =
    sourceSummary.pv.power +
    sourceSummary.evuIn.power +
    sourceSummary.batOut.power;

    globalConfig.maxPower = maxPower
}
function soc(i: number) {
  return chargepoints.value[i].soc
}
</script>

<style></style>
