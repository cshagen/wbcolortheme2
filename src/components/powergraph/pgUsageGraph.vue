<template>
  <g id="pgUsageGraph" :origin='draw' :transform="'translate(' + margin.left + ',' + margin.top + ')' ">
  </g>
</template>

<script>
import * as d3 from 'd3'
import config from '@/assets/mixins/themeConfig.js'
export default {
  name: 'pgUsageGraph',
  props: {
    graphData: Array,
    width: Number,
    height: Number,
    margin: Object,
    xScale: Function,

  },
  mixins: [config],
  data() {
    return {
      keys : [["cp3", "cp1", "cp2", "housePower", "batIn", "inverter"],
    ["housePower", "cp0", "cp1", "cp2", "cp3", "cp4",
      "cp5", "cp6", "cp7",
      "sh0", "sh1", "sh2", "sh3", "sh4",
      "sh5", "sh6", "sh7", "co0", "co1", "batIn", "inverter"],
    ["sh0", "sh1", "sh2", "sh3", "sh4",
      "sh5", "sh6", "sh7", "co0", "co1", "housePower", "cp0", "cp1", "cp2", "cp3", "cp4",
      "cp5", "cp6", "cp7",
      "batIn", "inverter"]
    ],
    colors : {
        'housePower': 'var(--color-house)',
    'batIn' : 'var(--color-battery)',
    'inverter' : 'var(--color-pv)',
    'batOut' : 'var(--color-battery)',
    'selfUsage' : 'var(--color-pv)',
    'gridPush' : 'var(--color-export)',
    'gridPull' : 'var(--color-evu)',
    'cp0' : 'var(--color-cp0)',
    'cp1' : 'var(--color-cp1)',
    'cp2' : 'var(--color-cp2)',
    'cp3' : 'var(--color-cp3)',
    
      },
    usageStackOrder : 0
    }
  },
  computed: {
    draw() {
      const graph = d3.select("g#pgUsageGraph")
      graph.selectAll("*").remove()
      graph.selectAll(".targetareas")
        .data(this.stackedSeries)
        .join("path")
        .attr("d", d3.area()
          .x((d, i) => this.xScale(this.graphData[i].date))
          .y0((d) => this.yScale(d[0]))
          .y1((d) => this.yScale(d[1]))
        )
        .attr("fill", (d, i) => this.colors[this.keys[this.usageStackOrder][i]]);

      const yAxis = graph.append("g")
        .attr("class", "axis")
      yAxis.call(this.yAxisGenerator)
      yAxis.selectAll(".tick")
        .attr("font-size", 12)
        .attr("color", 'var(--color-axis)');
      if (this.config.showGrid) {
        yAxis.selectAll(".tick line")
          .attr("stroke", 'var(--color-grid)')
          .attr("stroke-width", "0.5");
      } else {
        yAxis.selectAll(".tick line").attr("stroke", 'var(--color-bg)');
      }
    yAxis.select(".domain")
      .attr("stroke", 'var(--color-bg)')
      ;
        return ('pgUsageGraph.vue')
    },
   /*  xScale() {
      return d3.scaleTime().domain(d3.extent(this.graphData, d => d.date))
        .range([0, this.width - this.margin.right])
    }, */
    yScale() {
      return d3.scaleLinear()
        .range ([this.height + 10, 2* this.height])
        .domain ([0, Math.ceil(this.extent[1]) ])
    },
    extent() {
      let result = d3.extent(this.graphData, (d) => {
        return (d.housePower + d.cp1 + d.cp2 + d.cp3 +  d.batIn + d.inverter)
      })
        return result
    },
    stackedSeries() {
      const stackGen = d3.stack().keys(this.keys[this.usageStackOrder])
      return stackGen (this.graphData)
    },
    yAxisGenerator() {
      return d3.axisLeft(this.yScale)
        .tickSizeInner(-(this.width - this.margin.right))
        .ticks(4)
        .tickFormat((d) => (d == 0) ? "" : (Math.round(d *10) / 10))
    }
  }
}
</script>

<style>

</style>