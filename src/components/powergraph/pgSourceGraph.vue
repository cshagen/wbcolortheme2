<template>

  <g id="pgSourceGraph" :origin='draw' :transform="'translate(' + margin.left + ',' + margin.top + ')'">
    
  </g>
  
</template>

<script>
import * as d3 from 'd3'
import config from "@/assets/mixins/themeConfig.js";
export default {
  name: 'pgSourceGraph',
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
      keys : ["selfUsage", "gridPush", "batOut", "gridPull"],
      colors : {
        'housePower': 'var(--color-house)',
    'batIn' : 'var(--color-battery)',
    'inverter' : 'var(--color-pv)',
    'batOut' : 'var(--color-battery)',
    'selfUsage' : 'var(--color-pv)',
    'gridPush' : 'var(--color-export)',
    'gridPull' : 'var(--color-evu)',
      }
    }
  },
  computed: {
    draw() {
     // console.log (this.stackedSeries)
      const graph = d3.select("g#pgSourceGraph")
      graph.selectAll("*").remove()
      graph.selectAll(".sourceareas")
        .data(this.stackedSeries)
        .join("path")
        .attr("d", d3.area()
          .x((d, i) => this.xScale(this.graphData[i].date))
          .y0((d) => this.yScale(d[0]))
          .y1((d) => this.yScale(d[1]))
        )
        .attr("fill", (d, i) => this.colors[this.keys[i]]);

        const yAxis = graph.append("g")
          .attr("class", "axis")

      yAxis.call (this.yAxisGenerator)
      yAxis.selectAll(".tick")
        .attr("font-size", 12);
        yAxis.selectAll(".tick line")
          .attr("stroke", this.ticklineColor)
          .attr("stroke-width", this.ticklineWidth);
    
    yAxis.select(".domain")
      .attr("stroke", 'var(--color-bg)')
      ;
        return ('pgSourceGraph.vue')
    },
    yScale() {
      return d3.scaleLinear()
        .range ([this.height - 10, 0])
        .domain ([0, Math.ceil(this.extent[1]) ])
    },
    extent() {
     // console.log(this.graphData)
      let result = d3.extent(this.graphData, (d) =>
        Math.max(d.solarPower + d.gridPull + d.batOut, d.selfUsage + d.gridPush));
     // console.log(result)
      return result
    },
    stackedSeries() {
      const stackGen = d3.stack().keys(this.keys)
      return stackGen (this.graphData)
    },
    yAxisGenerator() {
      return d3.axisLeft (this.yScale)
        .tickSizeInner(-(this.width - this.margin.right))
        .ticks(4)
        .tickFormat((d) => (d == 0) ? "" : (Math.round(d * 10) / 10))
      ;
    },
    ticklineWidth() {
      if (this.config.showGrid) {
        return "0.5"
      } else {
        return "1"
      }

      },
      ticklineColor() {
        return (this.config.showGrid) ? 'var(--color-grid)' : 'var(--color-bg)'
      }
    
   /*  drawYAxis() {
      const yAxis = d3.select("g#pgsYAxis")
      yAxis.call (this.yAxisGenerator)
      yAxis.selectAll(".tick")
        .attr("font-size", 12);
      if (this.config.showGrid) {
        yAxis.selectAll(".tick line")
          .attr("stroke", 'var(--color-grid')
          .attr("stroke-width", "0.5");
    } else {
      yAxis.selectAll(".tick line").attr("stroke", 'var(--color-bg');
    }
    yAxis.select(".domain")
      .attr("stroke", 'var(--color-bg)')
      ;

		
      return 'pgSourceGraph.vue'
    } */

    
  }
}
</script>

<style>

</style>