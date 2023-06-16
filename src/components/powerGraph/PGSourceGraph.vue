<template>
  <g id="pgSourceGraph" :origin="draw" :transform="'translate(' + margin.left + ',' + margin.top + ')'"></g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as d3 from 'd3'
import { globalConfig } from '@/assets/js/themeConfig'
import {
  graphData,
  initializeSourceGraph,
  sourceGraphIsInitialized,
} from './model'

const props = defineProps<{
  width: number
  height: number
  margin: { left: number; top: number; right: number; bottom: number }
}>()

//state
const colors: { [key: string]: string } = {
  housePower: 'var(--color-house)',
  batIn: 'var(--color-battery)',
  inverter: 'var(--color-pv)',
  batOut: 'var(--color-battery)',
  selfUsage: 'var(--color-pv)',
  gridPush: 'var(--color-export)',
  gridPull: 'var(--color-evu)',
}
var paths: d3.Selection<SVGPathElement, [number, number][], d3.BaseType, any>
// computed:
const draw = computed(() => {
  if (graphData.data.length > 0) {
    const graph = d3.select('g#pgSourceGraph')
    if (graphData.graphMode == 'month') {
      drawMonthGraph(graph)
    } else {
      drawGraph(graph)
    }
    const yAxis = graph.append('g').attr('class', 'axis')
    yAxis.call(yAxisGenerator.value)
    yAxis.selectAll('.tick').attr('font-size', 12)
    yAxis.selectAll('.tick line')
      .attr('stroke', ticklineColor.value)
      .attr('stroke-width', ticklineWidth.value)
    yAxis.select('.domain').attr('stroke', 'var(--color-bg)')
    return 'pgSourceGraph.vue'
  }
})
const keys = computed(() => {
  return (graphData.graphMode == 'month') ?
    ['gridPull', 'batOut', 'selfUsage', 'gridPush'] :
    ['selfUsage', 'gridPush', 'batOut', 'gridPull']
})
const iScale = computed(() => {
  return d3.scaleLinear()
    .domain([0, graphData.data.length - 1])
    .range([0, props.width])
})

const iScaleMonth = computed(() => {
  let dayRange = d3.extent(graphData.data, d => d.date)
  if (dayRange[0] == undefined || dayRange[1] == undefined) {
    dayRange = [0, 0]
  }
  
  console.log (dayRange)
  const iMin = dayRange[0]
  return d3.scaleBand<number>()
    .domain(Array.from({ length: (dayRange[1] - dayRange[0] + 1) }, (v, k) => k + iMin))
    .range([0, props.width - props.margin.right])
    .paddingInner(0.4);
})
const stackGen = computed(() => d3.stack().keys(keys.value))
const stackedSeries = computed(() => stackGen.value(graphData.data))
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

function drawGraph(graph: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
  const area0 = d3.area()
    .x((d, i) => iScale.value(i))
    .y(yScale.value(0))
  const area = d3.area()
    .x((d, i) => iScale.value(i))
    .y0((d) => yScale.value(d[0]))
    .y1((d) => yScale.value(d[1]))
  const duration = globalConfig.showAnimations ? 300 : 0
  const delay = globalConfig.showAnimations ? 100 : 0
  if (initializeSourceGraph) {
    graph.selectAll('*').remove()
    paths = graph
      .selectAll('.sourceareas')
      .data(stackedSeries.value as [number, number][][])
      .enter()
      .append('path')
      .attr('fill', (d, i) => colors[keys.value[i]])
      .attr('d', (series) => area0(series))
    paths
      .transition()
      .duration(duration)
      .delay(delay)
      .ease(d3.easeLinear)
      .attr('d', (series) => area(series))
    sourceGraphIsInitialized()
  } else {
    paths
      .data(stackedSeries.value as [number, number][][])
      .transition()
      .duration(0)
      .ease(d3.easeLinear)
      .attr('d', (series) => area(series))
  }
}
function drawMonthGraph(graph: d3.Selection<d3.BaseType, unknown, HTMLElement, any>) {
console.info("draw month graph")
const area0 = d3.area()
    .x((d, i) => iScale.value(i))
    .y(yScale.value(0))
  const area = d3.area()
    .x((d, i) => iScale.value(i))
    .y0((d) => yScale.value(d[0]))
    .y1((d) => yScale.value(d[1]))
  const duration = globalConfig.showAnimations ? 300 : 0
  const delay = globalConfig.showAnimations ? 100 : 0
  if (initializeSourceGraph) {
    graph.selectAll('*').remove()
    console.log (stackedSeries.value)
    console.info (iScaleMonth.value.bandwidth())
    var rects = graph.selectAll(".sourcebar")
				.data(stackedSeries.value).enter()
				.append("g")
				.attr("fill", (d, i) => colors[keys.value[i]])
				.selectAll("rect")
				.data((d) => d ).enter()
				.append("rect")
				.attr('x', (d, i) => {
          //console.info (d.data)
         return (iScaleMonth.value(d.data.date) ??  0)}) 
				.attr("y", d => yScale.value(d[1]))
				.attr("height", d => yScale.value(d[0]) - yScale.value(d[1]))
				.attr("width", iScaleMonth.value.bandwidth())
		//	rects.append("svg:title").text((d) => formatWattH(d[1] - d[0]));
    paths
      .transition()
      .duration(duration)
      .delay(delay)
      .ease(d3.easeLinear)
      .attr('d', (series) => area(series))
    sourceGraphIsInitialized()
  } else {
    paths
      .data(stackedSeries.value as [number, number][][])
      .transition()
      .duration(0)
      .ease(d3.easeLinear)
      .attr('d', (series) => area(series))
  }
} 
</script>

<style>

</style>
