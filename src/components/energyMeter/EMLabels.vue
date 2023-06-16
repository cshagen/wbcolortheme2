<template>
  <g id="emLabels" :origin="drawLabels"></g>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import * as d3 from 'd3'
import { globalConfig } from '@/assets/js/themeConfig'
import type { PowerItem, MarginType } from '@/assets/js/types'
import { formatWattH } from '@/assets/js/helpers'
const props = defineProps<{
  plotdata: PowerItem[]
  xScale: d3.ScaleBand<string>
  yScale: d3.ScaleLinear<number, number>
  height: number
  margin: MarginType
}>()
// computed
const drawLabels = computed(() => {
  const g = d3.select('g#emLabels')
  g.selectAll('*').remove()
  const labels = g
    .selectAll<d3.ContainerElement, PowerItem>('.label')
    .data(props.plotdata)
    .enter()
    .append('g')
  labels
    .append('text')
    .attr(
      'x',
      (d) => (props.xScale(d.name) as number) + props.xScale.bandwidth() / 2,
    )
    .attr('y', (d) => (
      (d.pvPercentage > 0) ? props.yScale(d.energy) - 25
        : props.yScale(d.energy) - 10))
    .attr('font-size', labelfontsize.value)
    .attr('text-anchor', 'middle')
    .attr('fill', (d) => d.color)
    .text((d) => formatWattH(d.energy * 1000, globalConfig.decimalPlaces))
  // add a PV percentage tag to the charging bar
  labels.append("text")
    .attr("x", (d) => (props.xScale(d.name) as number)+ props.xScale.bandwidth() / 2)
    .attr("y", (d) => props.yScale(d.energy) - 10)
    .attr("font-size", labelfontsize.value - 2)
    .attr("text-anchor", "middle")
    .attr("fill", (d) => 'var(--color-pv)')
    .text((d) => pvString(d));
  // Add category labels
  labels
    .append('text')
    .attr(
      'x',
      (d) => (props.xScale(d.name) as number) + props.xScale.bandwidth() / 2,
    )
    .attr('y', props.height - props.margin.bottom - 5)
    .attr('font-size', labelfontsize.value)
    .attr('text-anchor', 'middle')
    .attr('fill', (d) => d.color)
    .text((d) => truncateCategory(d.name,d.icon))
    .classed("fas",(d) => d.icon.length <= 2);

  return 'emLabels.vue'
})
const labelfontsize = computed(() => {
  let fontsize = 16
  let xCount = props.plotdata.length
  if (xCount <= 5) {
    fontsize = 16
  } else if (xCount == 6) {
    fontsize = 14
  } else if (xCount > 6 && xCount <= 8) {
    fontsize = 13
  } else if (xCount == 9) {
    fontsize = 11
  } else if (xCount == 10) {
    fontsize = 10
  } else {
    fontsize = 9
  }
  return fontsize
})
const maxTextLength = computed(() => {
  let textLength = 12
  let xCount = props.plotdata.length
  if (xCount <= 5) {
    textLength = 12
  } else if (xCount == 6) {
    textLength = 11
  } else if (xCount > 6 && xCount <= 8) {
    textLength = 8
  } else if (xCount == 9) {
    textLength = 8
  } else if (xCount == 10) {
    textLength = 7
  } else {
    textLength = 6
  }
  return textLength
})

// methods
function truncateCategory(id:string, name: string) {
  if (name.length > maxTextLength.value) {
    return name.substring(0, maxTextLength.value) + '.'
  } else {
    return name
  }
}
function pvString (item: PowerItem) : string {
  if (item.pvPercentage > 0) {
			return ("(PV: " + item.pvPercentage.toLocaleString(undefined) + " %)");
		} else {
			return "";
		}
	}

</script>

<style>

</style>
