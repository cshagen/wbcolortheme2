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
    
// computed: {
const drawBargraph = computed(() => {
  if (props.plotdata.length > 0) {
    const g = d3.select('g#emBargraph')
    if (globalConfig.showAnimations) {
      if (initializeEnergyGraph) {
        g.selectAll('*').remove()
        const bargroups = g
        .selectAll('.bar')
        .data(props.plotdata)
        .enter()
        .append('g')
        rects = bargroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => props.xScale(d.name) as number)
        .attr('y', (d) => props.yScale(0))
        .attr('width', props.xScale.bandwidth())
        .attr('height', 0)
        rects
          .transition()
          .duration(300)
          .delay(100)
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
        energyGraphInitialized()
      } else {
        rects
          .transition()
          .duration(0)
          .delay(0)
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
    } else {
      g.selectAll('*').remove()
      const bargroups = g
        .selectAll('.bar')
        .data(props.plotdata)
        .enter()
        .append('g')

      bargroups
        .append('rect')
        .attr('class', 'bar')
        .attr('x', (d) => props.xScale(d.name) as number)
        .attr('y', (d) => props.yScale(d.energy))
        .attr('width', props.xScale.bandwidth())
        .attr('height', 0)
        .attr('fill', (d) => d.color)
        .attr(
          'height',
          (d) =>
            props.height -
            props.yScale(d.energy) -
            props.margin.top -
            props.margin.bottom,
        )
    }

    return 'emBargraph.vue'
  }
})
</script>

<style></style>
