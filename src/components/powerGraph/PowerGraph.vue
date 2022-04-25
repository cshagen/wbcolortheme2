<template>
  <WBWidget>
    <template v-slot:title>{{ heading }}</template>
    <template v-slot:buttons>
      <PGMenu @change-stack-order="changeStackOrder"></PGMenu>
    </template>
    <figure id="powergraph" class="p-0 m-0">
      <svg :viewBox="'0 0 ' + width + ' ' + height">
        <!-- Draw the source graph -->
        <PGSourceGraph
          :width="width - margin.left - margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
        />
        <PGUsageGraph
          :width="width - margin.left - margin.right"
          :height="(height - margin.top - margin.bottom) / 2"
          :margin="margin"
          :stack-order="stackOrder"
        />
        <PGXAxis
          :width="width - margin.left - margin.right"
          :height="height - margin.top - margin.bottom"
          :margin="margin"
          :graphData="graphData"
        />
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
import { graphData } from '@/components/powerGraph/processGraphData'
// state
const width = 500
const height = 500
const margin = { top: 10, right: 20, bottom: 10, left: 25 }
const stackOrderMax = 2;
const stackOrder = ref(0)
// computed
const heading = computed(() => {
  let heading = 'Leistung / Ladestand '
  if (graphData.data.length) {
    const startTime = graphData.data[0].date
    const endTime = graphData.data[graphData.data.length - 1].date
    const liveGraphMinutes = Math.round((endTime - startTime) / 60000)
    heading = heading + liveGraphMinutes + ' min'
  } else {
    console.warn('Graph Data empty.')
  }
  return heading
})
function changeStackOrder() {
  stackOrder.value=stackOrder.value+1;
  if (stackOrder.value > stackOrderMax) {
    stackOrder.value = 0;
  }
}
</script>

<style></style>
