<template>
  <g
    id="pgUsageGraph"
    :origin="draw"
    :transform="'translate(' + margin.left + ',' + margin.top + ')'"
  ></g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as d3 from 'd3'
import { globalConfig } from '@/assets/js/themeConfig'
import {
  graphData,
  initializeUsageGraph,
  usageGraphIsInitialized,
} from './model'

const props = defineProps<{
  width: number
  height: number
  margin: { left: number; top: number; right: number; bottom: number }
  stackOrder: number
}>()

//state
const keys = [
  [
    'cp0',
    'cp1',
    'cp2',
    'cp3',
    'cp4',
    'cp5',
    'cp6',
    'cp7',
    'cp8',
    'cp9',
    'housePower',
    'batIn',
    'inverter',
  ],
  [
    'housePower',
    'cp0',
    'cp1',
    'cp2',
    'cp3',
    'cp4',
    'cp5',
    'cp6',
    'cp7',
    'sh0',
    'sh1',
    'sh2',
    'sh3',
    'sh4',
    'sh5',
    'sh6',
    'sh7',
    'batIn',
    'inverter',
  ],
  [
    'sh0',
    'sh1',
    'sh2',
    'sh3',
    'sh4',
    'sh5',
    'sh6',
    'sh7',
    'housePower',
    'cp0',
    'cp1',
    'cp2',
    'cp3',
    'cp4',
    'cp5',
    'cp6',
    'cp7',
    'batIn',
    'inverter',
  ],
]
const colors: { [key: string]: string } = {
  housePower: 'var(--color-house)',
  batIn: 'var(--color-battery)',
  inverter: 'var(--color-pv)',
  batOut: 'var(--color-battery)',
  selfUsage: 'var(--color-pv)',
  gridPush: 'var(--color-export)',
  gridPull: 'var(--color-evu)',
  cp0: 'var(--color-cp0)',
  cp1: 'var(--color-cp1)',
  cp2: 'var(--color-cp2)',
  cp3: 'var(--color-cp3)',
}
var paths: d3.Selection<SVGPathElement, [number, number][], d3.BaseType, any>
// computed:
const draw = computed(() => {
  if (graphData.data.length > 0) {
    const graph = d3.select('g#pgUsageGraph')
    const stackGen = d3.stack().keys(keys[props.stackOrder])
    const stackedSeries = stackGen(graphData.data) as unknown
    const iScale = d3
      .scaleLinear()
      .domain([0, graphData.data.length - 1])
      .range([0, props.width])
    const area0 = d3
      .area()
      .x((d, i) => iScale(i))
      .y(yScale.value(0))
    const area = d3
      .area()
      .x((d, i) => iScale(i))
      .y0((d) => yScale.value(d[0]))
      .y1((d) => yScale.value(d[1]))
    if (globalConfig.showAnimations) {
      if (initializeUsageGraph) {
        graph.selectAll('*').remove()
        paths = graph
          .selectAll('.usageareas')
          .data(stackedSeries as [number, number][][])
          .enter()
          .append('path')
          .attr('d', (series) => area0(series))
          .attr('fill', (d, i: number) => colors[keys[props.stackOrder][i]])
        paths
          .transition()
          .duration(300)
          .delay(100)
          .ease(d3.easeLinear)
          .attr('d', (series) => area(series))
        usageGraphIsInitialized()
      } else {
        paths
          .data(stackedSeries as [number, number][][])
          .transition()
          .duration(100)
          .ease(d3.easeLinear)
          .attr('d', (series) => area(series))
      }
    } else {
      graph.selectAll('*').remove()
      graph
        .selectAll('.usageareas')
        .data(stackedSeries as [number, number][][])
        .enter()
        .append('path')
        .attr('d', (series) => area(series))
        .attr('fill', (d, i: number) => colors[keys[props.stackOrder][i]])
    }
    const yAxis = graph.append('g').attr('class', 'axis')
    yAxis.call(yAxisGenerator.value)
    yAxis
      .selectAll('.tick')
      .attr('font-size', 12)
      .attr('color', 'var(--color-axis)')
    if (globalConfig.showGrid) {
      yAxis
        .selectAll('.tick line')
        .attr('stroke', 'var(--color-grid)')
        .attr('stroke-width', '0.5')
    } else {
      yAxis.selectAll('.tick line').attr('stroke', 'var(--color-bg)')
    }
    yAxis.select('.domain').attr('stroke', 'var(--color-bg)')
    return 'pgUsageGraph.vue'
  }
})
const yScale = computed(() => {
  return d3
    .scaleLinear()
    .range([props.height + 10, 2 * props.height])
    .domain([0, Math.ceil(extent.value[1])])
})
const extent = computed(() => {
  let result = d3.extent(
    graphData.data,
    (d) => d.housePower + d.cp1 + d.cp2 + d.cp3 + d.batIn + d.inverter,
  )
  if (result[0] != undefined && result[1] != undefined) {
    return result
  } else {
    return [0, 0]
  }
})
const yAxisGenerator = computed(() => {
  return d3
    .axisLeft<number>(yScale.value)
    .tickSizeInner(-props.width)
    .ticks(4)
    .tickFormat((d: number) =>
      (d == 0 ? '' : Math.round(d * 10) / 10).toLocaleString(undefined),
    )
})
</script>

<style></style>
