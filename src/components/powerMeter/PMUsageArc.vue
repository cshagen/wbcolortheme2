<template>
  <g id="pmUsageArc" :origin="draw"></g>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { PowerItem, ItemList } from '@/assets/js/types'
import { usageSummary, shDevices } from '@/assets/js/model'
import * as d3 from 'd3'
// props
const props = defineProps<{
  usageSummary: ItemList
  radius: number
  cornerRadius: number
  circleGapSize: number
  emptyPower: number
}>()
//  computed: {
const draw = computed(() => {
  // Draw the arc using d3
  let emptyPowerItem: PowerItem = {
    name: '',
    power: props.emptyPower,
    energy: 0,
    color: 'var(--color-bg)',
  }
  const plotdata = [usageSummary.evuOut, usageSummary.charging]
    .concat(
      Object.values(shDevices)
        .filter((row) => row.configured && !row.countAsHouse)
        .sort((a, b) => {
          return b.power - a.power
        }),
    )
    .concat([usageSummary.batIn, usageSummary.house])
    .concat(emptyPowerItem)
  const arcCount = plotdata.length - 1
  const pieGenerator = d3
    .pie<PowerItem>()
    .value((record: PowerItem) => record.power)
    .startAngle(Math.PI * 1.5 - props.circleGapSize)
    .endAngle(Math.PI / 2 + props.circleGapSize)
    .sort(null)
  const path = d3
    .arc<d3.PieArcDatum<PowerItem>>()
    .innerRadius((props.radius / 6) * 5)
    .outerRadius(props.radius)
    .cornerRadius(props.cornerRadius)
  const graph = d3.select('g#pmUsageArc')
  graph.selectAll('*').remove()
  graph
    .selectAll('consumers')
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
  return 'pmUsageArc.vue'
})
</script>

<style></style>
