<template>
  <WBWidget :full-width="true">
    <template v-slot:title>{{ heading }}</template>
    <template v-slot:buttons>
      <PGMenu
        @change-stack-order="changeStackOrder"
        @shiftLeft="shiftLeft"
        @shiftRight="shiftRight"
        :show-left-button="globalConfig.showLeftButton"
        :show-right-button="globalConfig.showRightButton"
      >
      </PGMenu>
    </template>
    <figure id="powergraph" class="p-0 m-0">
      <svg :viewBox="'0 0 ' + width + ' ' + height">
       

        <!-- Draw the source graph -->
        <PGSourceGraph
          :width="width - margin.left - 2 * margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
        />
        <PGUsageGraph
          :width="width - margin.left - 2 * margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
          :stack-order="stackOrder"
        />
        <PGXAxis
          :width="width - margin.left - 2 * margin.right"
          :height="height - margin.top - margin.bottom"
          :margin="margin"
          :graphData="graphData"
        />
        <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
        <PgSoc
          v-if="graphData.graphMode=='day' || graphData.graphMode == 'today'"
          :width="width - margin.left - 2 * margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
          :cp-id="1"
        ></PgSoc>
        <PgSoc
          v-if="graphData.graphMode=='day' || graphData.graphMode == 'today'"
          :width="width - margin.left - 2 * margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
          :cp-id="2"
        ></PgSoc>
        <PgSocAxis 
          v-if="graphData.graphMode=='day' || graphData.graphMode == 'today'"
          :width="width - margin.left - margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
        ></PgSocAxis>
        </g>
        
        <g id="rect">
          <rect :x="margin.left + 5" y="0" rx="15" ry="15" width="80" height="25" fill="var(--color-menu)" stroke="var(--color-bg)"/>
        
        </g>
        <g id="date">
          <text :x="margin.left + 45" y="17" font-size="16" fill="var(--color-bg)"  text-anchor="middle">{{ displayDate }}</text>
          </g>
      </svg>
    </figure>
  </WBWidget>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import WBWidget from '../shared/WBWidget.vue'
import PGSourceGraph from './PGSourceGraph.vue'
import PGUsageGraph from './PGUsageGraph.vue'
import PGXAxis from './PGXAxis.vue'
import PGMenu from './PGMenu.vue'
import { graphData, initGraph, dayGraph, monthGraph, setInitializeUsageGraph } from './model'
import { globalConfig, shiftLeft, shiftRight } from '@/assets/js/themeConfig'
import PgSoc from './PgSoc.vue'
import PgSocAxis from './PgSocAxis.vue'
import { formatMonth } from '@/assets/js/helpers'

// state
const width = 500
const height = 500
const margin = { top: 10, right: 20, bottom: 10, left: 25 }
const stackOrderMax = 2
const stackOrder = ref(0)

// computed
const heading = computed(() => {
  let heading = 'Leistung / Ladestand '
  switch (graphData.graphMode) {
    case 'live':
      if (graphData.data.length) {
        const startTime = graphData.data[0].date
        const endTime = graphData.data[graphData.data.length - 1].date
        const liveGraphMinutes = Math.round((endTime - startTime) / 60000)
       // heading = heading + liveGraphMinutes + ' min'
      } else {
        console.warn('Graph Data empty.')
      }
      break
    case 'today':
     // heading = heading + 'heute'
      break
    case 'day':
      let d = dayGraph.date
    //  heading = heading + (dayGraph.date.getDate()) + '.' + (dayGraph.date.getMonth()+1) 
  }
  return heading
})

const displayDate = computed(() => {
  let text = ''
  switch (graphData.graphMode) {
    case 'live':
      if (graphData.data.length) {
        const startTime = graphData.data[0].date
        const endTime = graphData.data[graphData.data.length - 1].date
        const liveGraphMinutes = Math.round((endTime - startTime) / 60000)
        return liveGraphMinutes + ' min'
      } else {
        console.warn('Graph Data empty.')
      }
      break
    case 'today':
      return 'heute'
      break
    case 'day':
      let d = dayGraph.date
      return (dayGraph.date.getDate()) + '.' + (dayGraph.date.getMonth()+1)+'.' 
      break
    case "month":
      return formatMonth(monthGraph.month-1, monthGraph.year)
  }
  return heading
})
function changeStackOrder() {
  stackOrder.value = stackOrder.value + 1
  if (stackOrder.value > stackOrderMax) {
    stackOrder.value = 0
  }
  setInitializeUsageGraph(true)
}

</script>

<style></style>
