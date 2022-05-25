<template>
  <WBWidget>
    <template v-slot:title>{{ heading }}</template>
    <template v-slot:buttons>
      <PGMenu
        @change-stack-order="changeStackOrder"
        @shiftLeft="shiftLeft"
        @shiftRight="shiftRight"
        :show-left-button="showLeftButton"
        :show-right-button="showRightButton"
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
          v-if="graphConfig.graphMode=='day'"
          :width="width - margin.left - 2 * margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
          :cp-id="1"
        ></PgSoc>
        <PgSoc
          v-if="graphConfig.graphMode=='day'"
          :width="width - margin.left - 2 * margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
          :cp-id="2"
        ></PgSoc>
        <PgSocAxis 
          v-if="graphConfig.graphMode=='day'"
          :width="width - margin.left - margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
        ></PgSocAxis>
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
import { graphData, graphConfig, initGraph } from './model'
import { globalConfig } from '@/assets/js/themeConfig'
import PgSoc from './PgSoc.vue'
import PgSocAxis from './PgSocAxis.vue'
// state
const width = 500
const height = 500
const margin = { top: 10, right: 20, bottom: 10, left: 25 }
const stackOrderMax = 2
const stackOrder = ref(0)
const showLeftButton = ref(true)
const showRightButton = ref(true)

// computed
const heading = computed(() => {
  let heading = 'Leistung / Ladestand '
  switch (graphConfig.graphMode) {
    case 'live':
      if (graphData.data.length) {
        const startTime = graphData.data[0].date
        const endTime = graphData.data[graphData.data.length - 1].date
        const liveGraphMinutes = Math.round((endTime - startTime) / 60000)
        heading = heading + liveGraphMinutes + ' min'
      } else {
        console.warn('Graph Data empty.')
      }
      break
    case 'day':
      heading = heading + 'heute'
  }
  return heading
})
function changeStackOrder() {
  stackOrder.value = stackOrder.value + 1
  if (stackOrder.value > stackOrderMax) {
    stackOrder.value = 0
  }
}
function shiftLeft() {
  switch (graphConfig.graphMode) {
    case 'live':
      graphConfig.graphMode = 'day'
      globalConfig.graphPreference = 'day'
      graphConfig.showTodayGraph = true
      showRightButton.value = true
      initGraph()
      break
    case 'day':
      graphConfig.showTodayGraph = false
      graphConfig.dayBack()
      break
    case 'month':
      graphConfig.monthBack()
      break
    default:
      break
  }
}
function shiftRight() {
  switch (graphConfig.graphMode) {
    case 'live':
      break
    case 'day':
      graphConfig.graphMode = 'live'
      globalConfig.graphPreference = 'live'
      graphConfig.showTodayGraph = false
      showRightButton.value = false
      initGraph()
      break
    case 'month':
      // graphConfig.monthforward()
      break
    default:
      break
  }
}
</script>

<style></style>
