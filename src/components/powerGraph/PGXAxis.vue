<template>
  <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
    <g
      id="PGXAxis"
      class="axis"
      :origin="drawAxis1"
      :transform="'translate(0,' + (height / 2 - 6) + ')'"
    ></g>
    <g
      id="PGXAxis2"
      class="axis"
      :origin="drawAxis2"
      :transform="'translate(0,' + (height / 2 + 10) + ')'"
    ></g>
    <g v-if="globalConfig.showGrid">
      <rect
        x="0"
        y="0"
        :width="width"
        :height="height / 2 - 10"
        fill="none"
        stroke="var(--color-grid)"
        stroke-width="0.5"
      ></rect>
    </g>
    <g v-if="globalConfig.showGrid">
      <rect
        x="0"
        :y="height / 2 + 10"
        :width="width"
        :height="height / 2 - 10"
        fill="none"
        stroke="var(--color-grid)"
        stroke-width="0.5"
      ></rect>
    </g>
  </g>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import * as d3 from 'd3'
import { globalConfig } from '@/assets/js/themeConfig'
import { graphData } from './model'

const props = defineProps<{
  width: number
  height: number
  margin: { left: number; top: number; right: number; bottom: number }
}>()
// state
const fontsize = 12

// computed
const xAxisGenerator = computed(() => {
  return d3
    .axisBottom<Date>(xScale.value)
    .ticks(4)
    .tickSizeInner(ticksize.value)
    .tickFormat(d3.timeFormat('%H:%M'))
})
const ticksize = computed(() => {
  return globalConfig.showGrid ? -(props.height / 2 - 7) : -10
})
const xAxisGenerator2 = computed(() => {
  const ticksize2 = -(props.height / 2 - 10)
  return d3
    .axisTop<Date>(xScale.value)
    .ticks(4)
    .tickSizeInner(ticksize2)
    .tickFormat((d) => '')
})
const xScale = computed(() => {
  let e = d3.extent(graphData.data, (d) => d.date)
  if (e[0] && e[1]) {
    return d3.scaleTime<number>().domain(e).range([0, props.width])
  } else {
    return d3.scaleTime().range([0, 0])
  }
})
const drawAxis1 = computed(() => {
  let axis = d3.select<d3.AxisContainerElement, number>('g#PGXAxis')
  axis.selectAll('*').remove()
  axis.call(xAxisGenerator.value)
  /* axis.attr(
    'transform',
    'translate(0,' + (props.height / 2 - 6) + ')',  */
  //)
  axis
    .selectAll('.tick')
    .attr('color', 'var(--color-axis)')
    .attr('font-size', fontsize)

  if (globalConfig.showGrid) {
    axis
      .selectAll('.tick line')
      .attr('stroke', 'var(--color-grid)')
      .attr('stroke-width', '0.5')
  } else {
    axis.selectAll('.tick line').attr('stroke', 'var(--color-bg)')
  }
  axis.select('.domain').attr('stroke', 'var(--color-bg)')
  axis
    .append('text')
    .attr('x', -props.margin.left)
    .attr('y', 12)
    .attr('fill', 'var(--color-axis)')
    .attr('font-size', fontsize)
    .text('kW')
    .attr('text-anchor', 'start')
  return 'PGXAxis.vue'
})
const drawAxis2 = computed(() => {
  let axis = d3.select<d3.AxisContainerElement, Date>('g#PGXAxis2')
  axis.selectAll('*').remove()
  if (globalConfig.showGrid) {
    axis.call(xAxisGenerator2.value)
    axis
      .selectAll('.tick')
      .attr('color', 'var(--color-axis)')
      .attr('font-size', fontsize)
    axis
      .selectAll('.tick line')
      .attr('stroke', 'var(--color-grid)')
      .attr('stroke-width', '0.5')
    axis.select('.domain').attr('stroke', 'var(--color-bg)')
    }
  return 'PGXAxis.vue'
})
</script>

<style></style>
