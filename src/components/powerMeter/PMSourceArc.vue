<template>
  <g id="pmSourceArc" :origin="draw"></g>
</template>

<script setup lang="ts">
import { defineProps, computed, watchEffect } from 'vue'
import { globalConfig } from '@/assets/js/themeConfig'
import type { PowerItem, ItemList } from '@/assets/js/types'
import { sourceSummary } from '@/assets/js/model'
import * as d3 from 'd3'
// props
const props = defineProps<{
  sourceSummary: ItemList
  radius: number
  cornerRadius: number
  circleGapSize: number
  emptyPower: number
}>()
//  computed: {
const draw = computed(() => {
  console.log (sourceSummary)
  // Draw the arc using d3
  const arcCount = Object.values(sourceSummary).length
  let emptyPowerItem: PowerItem = {
    name: '',
    power: props.emptyPower,
    energy: 0,
    color: 'var(--color-bg)',
  }
  const plotdata = Object.values(sourceSummary).concat([emptyPowerItem])
  const pieGenerator = d3
    .pie<PowerItem>()
    .value((record: PowerItem) => record.power)
    .startAngle(-Math.PI / 2 + props.circleGapSize)
    .endAngle(Math.PI / 2 - props.circleGapSize)
    .sort(null)
  const path = d3
    .arc<d3.PieArcDatum<PowerItem>>()
    .innerRadius((props.radius / 6) * 5)
    .outerRadius(props.radius)
    .cornerRadius(props.cornerRadius)
    .padAngle(0)
  const graph = d3.select('g#pmSourceArc')
  graph.selectAll('*').remove()
  graph
    .selectAll('sources')
    .data(pieGenerator(plotdata))
    .enter()
    .append('path')
    .attr('d', path)
    .attr('fill', (d) => d.data.color)
    .attr('stroke', (d, i) =>
      i == arcCount
        ? d.data.power > 0
          ? 'var(--color-scale)'
          : 'null'
        : d.data.color,
    )
  return 'pmSourceArc.vue'
})

watchEffect(() => {
  let currentMax =
    sourceSummary.pv.power +
    sourceSummary.evuIn.power +
    sourceSummary.batOut.power
  if (currentMax > globalConfig.maxPower) {
    globalConfig.maxPower = currentMax
  }
})
</script>

<style></style>
