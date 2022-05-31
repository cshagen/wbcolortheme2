<template>
  <g id="emBargraph" :origin="drawBargraph"> </g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as d3 from 'd3'
import type { MarginType, PowerItem } from '@/assets/js/types'
const props = defineProps<{
  plotdata: PowerItem[]
  xScale: d3.ScaleBand<string>
  yScale: d3.ScaleLinear<number, number, never>
  margin: MarginType
  height: number
}>()
// computed: {
const drawBargraph = computed(() => {
  const g = d3.select('g#emBargraph')
  g.selectAll('*').remove()
  const bargroups = g.selectAll('.bar')
    .data(props.plotdata)
    .enter()
    .append('g')
  const rects = bargroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => props.xScale(d.name) as number)
    .attr('y', (d) => props.yScale(0))
    .attr('width', props.xScale.bandwidth())
    .attr('height',0)
  rects
  .transition()
    .duration((d,i) => 300)
    .delay((d,i) => i* 100)
    .ease(d3.easeCubic)
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
    
    
  return 'emBargraph.vue'
})
</script>

<style></style>
