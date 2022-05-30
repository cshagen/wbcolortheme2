<template>
  <WBWidget>
    <template v-slot:title>{{ heading }}</template>
    <template v-slot:buttons>
      <EMMenu
        @shiftLeft="shiftLeft"
        @shiftRight="shiftRight"
        :show-left-button="globalConfig.showLeftButton"
        :show-right-button="globalConfig.showRightButton"
      ></EMMenu>
    </template>
    <figure id="energymeter" class="p-0 m-0">
      <svg viewBox="0 0 500 500">
        <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
          <!--  Bar Graph -->
          <EMBarGraph
            :plotdata="plotdata"
            :xScale="xScale"
            :yScale="yScale"
            :height="height"
            :margin="margin"
          ></EMBarGraph>
          <!-- Y Axis -->
          <EMYAxis
            :yScale="yScale"
            :width="width"
            :fontsize="axisFontsize"
            :config="globalConfig"
          ></EMYAxis>
          <text
            :x="-margin.left"
            y="-15"
            fill="var(--color-axis)"
            :font-size="axisFontsize"
          >
            kWh
          </text>
          <EMLabels
            :plotdata="plotdata"
            :xScale="xScale"
            :yScale="yScale"
            :height="height"
            :margin="margin"
            :config="globalConfig"
          ></EMLabels>
        </g>
      </svg>
    </figure>
  </WBWidget>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import * as d3 from 'd3'
import type { ItemList, PowerItem } from '@/assets/js/types'
import { sourceSummary, historicSummary } from '@/assets/js/model'
import { formatMonth } from '@/assets/js/helpers'
import EMMenu from './EMMenu.vue'
import EMBarGraph from './EMBarGraph.vue'
import EMYAxis from './EMYAxis.vue'
import EMLabels from './EMLabels.vue'
import WBWidget from '../shared/WBWidget.vue'
import { globalConfig, shiftLeft, shiftRight } from '@/assets/js/themeConfig'
import { dayGraph } from '@/components/powerGraph/model'

// props
const props = defineProps<{
  usageDetails: PowerItem[]
}>()
//state
const width = 500
const height = 500
const margin = {
  top: 25,
  bottom: 30,
  left: 25,
  right: 0,
}
const axisFontsize = 12
// computed
const plotdata = computed(() => {
  let result: PowerItem[] = []
  switch (globalConfig.graphMode) {
    default:
    case 'live':
      result = Object.values(sourceSummary)
        .concat(props.usageDetails)
        .filter((row) => row.energy > 0)
      break
    case 'today':
      result = Object.values(sourceSummary)
        .concat(props.usageDetails)
        .filter((row) => row.energy > 0)
      break
    case 'day':
      result = Object.values(historicSummary).filter((row) => row.energy > 0)
      break
    case 'month':
    //result = Object.values(this.historicSummary).filter(
    //  (row) => row.energy > 0
    // );
    // break;
  }
  return result
})
const xScale = computed(() => {
  return d3
    .scaleBand()
    .range([0, width - margin.left - margin.right])
    .domain(plotdata.value.map((d) => d.name))
    .padding(0.4)
})
const yScale = computed(() => {
  return d3
    .scaleLinear()
    .range([height - margin.bottom - margin.top, 0])
    .domain([0, d3.max(plotdata.value, (d: PowerItem) => d.energy) as number])
})
const heading = computed(() => {
  let result = 'Energie '
  switch (globalConfig.graphMode) {
    case 'live':
    case 'today':
      result = result + ' heute'
      break
    case 'day':
      result =
        result +
        dayGraph.date.getDate() +
        '.' +
        (dayGraph.date.getMonth() + 1) +
        '.'
      break
    case 'month':
      /*  result =
            "Monatswerte " +
            formatMonth(
              globalConfig.graphMonth.month,
              globalConfig.graphMonth.year
            ); */
      break
    default:
      break
  }
  return result
})
</script>

<style></style>
