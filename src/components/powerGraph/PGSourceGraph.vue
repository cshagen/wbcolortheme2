<template>
  <g
    id="pgSourceGraph"
    :origin="draw"
    :transform="'translate(' + margin.left + ',' + margin.top + ')'"
  ></g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as d3 from 'd3'
import { globalConfig } from '@/assets/js/themeConfig'
import { graphData } from './model'

const props = defineProps<{
  width: number
  height: number
  margin: { left: number; top: number; right: number; bottom: number }
}>()

//state
const keys = ['selfUsage', 'gridPush', 'batOut', 'gridPull']
const colors: { [key: string]: string } = {
  housePower: 'var(--color-house)',
  batIn: 'var(--color-battery)',
  inverter: 'var(--color-pv)',
  batOut: 'var(--color-battery)',
  selfUsage: 'var(--color-pv)',
  gridPush: 'var(--color-export)',
  gridPull: 'var(--color-evu)',
}

// computed:
const draw = computed(() => {
  const graph = d3.select('g#pgSourceGraph')
  graph.selectAll('*').remove()
  const stackGen = d3.stack().keys(keys)
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
  const series = graph
    .selectAll('.sourceareas')
    .data(stackedSeries as [number, number][][])
    .enter()
    .append('path')
    .attr('d', (series) => area0(series))
    .attr('fill', (d, i) => colors[keys[i]])
  series
    .transition()
    .duration(500)
    .delay(100)
    .ease(d3.easeCubic)
    .attr('d', (series) => area(series))

  const yAxis = graph.append('g').attr('class', 'axis')
  yAxis.call(yAxisGenerator.value)
  yAxis.selectAll('.tick').attr('font-size', 12)
  yAxis
    .selectAll('.tick line')
    .attr('stroke', ticklineColor.value)
    .attr('stroke-width', ticklineWidth.value)
  yAxis.select('.domain').attr('stroke', 'var(--color-bg)')
  return 'pgSourceGraph.vue'
})
const yScale = computed(() => {
  return d3
    .scaleLinear()
    .range([props.height - 10, 0])
    .domain([0, Math.ceil(extent.value[1])])
})
const extent = computed(() => {
  let result = d3.extent(graphData.data, (d) =>
    Math.max(d.solarPower + d.gridPull + d.batOut, d.selfUsage + d.gridPush),
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
const ticklineWidth = computed(() => {
  if (globalConfig.showGrid) {
    return '0.5'
  } else {
    return '1'
  }
})
const ticklineColor = computed(() => {
  return globalConfig.showGrid ? 'var(--color-grid)' : 'var(--color-bg)'
})
</script>

<style></style>
