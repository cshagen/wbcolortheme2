<template>
  <g id="emYAxis" class="axis" :origin="drawYAxis"></g>
</template>

<script>
import * as d3 from 'd3'
export default {
name: 'emYAxis',
props: {
  yScale: {},
  width: Number,
  fontsize: Number,
  config: {}  

},
data () {
  return {
    bgColor: "var(--color-bg)",
    gridColor: "var(--color-grid)"
  }
},
computed : {
  yAxisGenerator () {
      return d3.axisLeft (this.yScale)
        .tickFormat ((d) => (d>0) ? d : "")
        .ticks(8)
        .tickSizeInner(-this.width) 
    },
    drawYAxis () {
      const yAxis = d3.select("g#emYAxis")
      yAxis.attr("class", "axis")
       .call (this.yAxisGenerator)

      yAxis.append("text")
			.attr("y", 6)
			.attr("dy", "0.71em")
			.attr("text-anchor", "end")
			.text("energy");

		yAxis.selectAll(".tick").attr("font-size", this.fontsize);
		if (this.config.showGrid) {
			yAxis.selectAll(".tick line")
			.attr("stroke", this.gridColor)
			.attr ("stroke-width", "0.5");			
		} else {
			yAxis.selectAll(".tick line").attr("stroke", this.bgColor);
		}
		yAxis.select(".domain")
			.attr("stroke", this.bgcolor);

      return "emYAxis.vue"
    }
}

}
</script>

<style>

</style>