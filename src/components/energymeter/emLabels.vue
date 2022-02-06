<template>
  <g id="emLabels" :origin="drawLabels"></g>
</template>

<script>
import * as d3 from 'd3'
import { formatWattH } from '@/assets/js/helpers.js'
export default {
  name: "emLabels",
  props: {
    plotdata: {},
    xScale: {},
    yScale: {},
    height: Number,
    margin: {},
		config: Object

  },
  

computed: {
  drawLabels () {
		const g =  d3.select('g#emLabels')
		g.selectAll('*').remove()
		const labels = g.selectAll(".label")
			.data(this.plotdata)
			.enter()
			.append("g");
		labels
			.append("text")
			.attr("x", (d) => this.xScale(d.name) + this.xScale.bandwidth() / 2)
			.attr("y", (d) => this.yScale(d.energy) - 10)
			.attr("font-size", this.labelfontsize)
			.attr("text-anchor", "middle")
			.attr("fill", (d) => d.color)
			.text((d) => (formatWattH(d.energy * 1000, this.config.decimalPlaces)));

		/* const categories = svg.selectAll(".category")
			.data(this.plotdata)
			.enter()
			.append("g"); */
		labels
			.append("text")
			.attr("x", (d) => this.xScale(d.name) + this.xScale.bandwidth() / 2)
			.attr("y", this.height - this.margin.bottom - 5)
			.attr("font-size", this.labelfontsize)
			.attr("text-anchor", "middle")
			.attr("fill", (d) => d.color)
			.text((d) => (this.truncateCategory(d.name)));
	
  return "emLabels.vue"
},
labelfontsize () {
      let fontsize = 16
      let xCount = this.plotdata.length
		if (xCount <= 5) {
			fontsize = 16
		} else if (xCount == 6) {
			fontsize = 14
		} else if (xCount > 6 && xCount <= 8) {
			fontsize = 13
		} else if (xCount == 9) {
			fontsize = 11;
		} else if (xCount == 10) {
			fontsize = 10;
		}
		else {
			fontsize = 9
		}
    return fontsize
    },
    maxTextLength () {
      let textLength = 12
      let xCount = this.plotdata.length
		if (xCount <= 5) {
			textLength = 12;
			} else if (xCount == 6) {
			textLength = 11;
			} else if (xCount > 6 && xCount <= 8) {
			textLength = 8;
			} else if (xCount == 9) {
			textLength = 8;
			} else if (xCount == 10) {
			textLength = 7;
			}
		else {
			textLength = 6;
			}
    return textLength
    }

    
  },
  methods: {
    truncateCategory(name) {
		if (name.length > this.maxTextLength) {
			return name.substr(0, this.maxTextLength) + "."
		} else {
			return name
		}
	}
  }
}

</script>

<style>

</style>