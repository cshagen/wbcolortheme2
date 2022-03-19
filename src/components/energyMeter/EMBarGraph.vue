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
  bargroups
    .append('rect')
    .attr('class', 'bar')
    .attr('x', (d) => props.xScale(d.name) as number)
    .attr('y', (d) => props.yScale(d.energy))
    .attr('width', props.xScale.bandwidth())
    .attr(
      'height',
      (d) =>
        props.height -
        props.yScale(d.energy) -
        props.margin.top -
        props.margin.bottom,
    )
    .attr('fill', (d) => d.color)
  return 'emBargraph.vue'
})
</script>

<style></style>
