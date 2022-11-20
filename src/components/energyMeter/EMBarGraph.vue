<template>
  <g id="emBargraph" :origin="drawBargraph"> </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as d3 from 'd3'
import type { MarginType, PowerItem } from '@/assets/js/types'
import { globalConfig, initializeEnergyGraph, energyGraphInitialized } from '@/assets/js/themeConfig'
const props = defineProps<{
  plotdata: PowerItem[]
  xScale: d3.ScaleBand<string>
  yScale: d3.ScaleLinear<number, number, never>
  margin: MarginType
  height: number
}>()
var rects: d3.Selection<SVGRectElement, PowerItem, d3.BaseType, unknown>
var pvRects: d3.Selection<SVGRectElement, PowerItem, d3.BaseType, unknown>
var batRects: d3.Selection<SVGRectElement, PowerItem, d3.BaseType, unknown>
var duration: number
var delay: number

// computed: {
const drawBargraph = computed(() => {
  if (props.plotdata.length > 0) {
    const g = d3.select('g#emBargraph')
    if (initializeEnergyGraph) {
      g.selectAll('*').remove()
    }
    // set the animation times
    if (initializeEnergyGraph && globalConfig.showAnimations) {
      duration = 300
      delay = 100
    } else {
      duration = 0
      delay = 0
    }
    const bargroups = g
      .selectAll('.bar')
      .data(props.plotdata)
      .enter()
      .append('g')
    rects = drawInitialState(bargroups)
    drawTransition()
    drawInitialInnerState(bargroups)
    drawInnerTransition()
    energyGraphInitialized()
  }
  return 'emBargraph.vue'
})
function drawInitialState(bars: d3.Selection<SVGGElement, PowerItem, d3.BaseType, unknown>): d3.Selection<SVGRectElement, PowerItem, d3.BaseType, unknown> {
  return bars
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => props.xScale(d.name) as number)
    .attr('y', (d) => props.yScale(0))
    .attr('width', props.xScale.bandwidth())
    //.attr('height', 0)
    .attr('fill', (d) => d.color)
    .attr('height', 0)
}
function drawTransition() {
  rects
    .transition()
    .duration(duration)
    .delay(delay)
    .ease(d3.easeLinear)
    .attr('fill', (d) => d.color)
    .attr(
      'height',
      (d) =>
        props.height -
        props.yScale(d.energy) -
        props.margin.top -
        props.margin.bottom,
    )
    .attr('y', (d) => props.yScale(d.energy))
}
function drawInitialInnerState(bars: d3.Selection<SVGGElement, PowerItem, d3.BaseType, unknown>) {
  pvRects = bars
    .append("rect")
    .attr("class", "bar")
    .attr("x", (d) => (props.xScale(d.name) as number) + props.xScale.bandwidth() / 6)
    .attr("y", props.yScale(0))
    .attr("width", props.xScale.bandwidth() * 2 / 3)
    .attr("height", 0)
    .attr("fill", 'var(--color-pv)')
    .attr("fill-opacity", "66%")
  // add inner bars for Bat percentage
  batRects = bars.append("rect")
    .attr("class", "bar")
    .attr("x", (d) => (props.xScale(d.name) as number) + props.xScale.bandwidth() / 6)
    .attr("y", props.yScale(0))
    .attr("width", props.xScale.bandwidth() * 2 / 3)
    .attr("height", 0)
    .attr("fill", 'var(--color-pv)')
    .attr("fill-opacity", "66%");
}
function drawInnerTransition() {
  // PV inner bars
  pvRects
    .transition()
    .duration(duration)
    .delay(delay)
    .ease(d3.easeLinear)
    .attr('height', d => ((d.energyPv > 0) ?
      (props.height - props.yScale(d.energyPv) - props.margin.top - props.margin.bottom)
      : 0)
    )
    .attr('y', (d) => props.yScale(d.energyPv))
  // Bat inner bars
  batRects
    .transition()
    .duration(duration)
    .delay(delay)
    .ease(d3.easeLinear)
    .attr('height', d => ((d.energyBat > 0) ?
      (props.height - props.yScale(d.energyBat) - props.margin.top - props.margin.bottom)
      : 0)
    )
    .attr('y', (d) => props.yScale(d.energyBat))
}
</script>

<style>

</style>
