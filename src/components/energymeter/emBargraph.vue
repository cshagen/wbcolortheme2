<template>
  <g id="emBargraph" :origin="drawBargraph">
    
  </g>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "emBargraph",
  components: {
   
  },
  props: {
    plotdata: [],
    xScale: {},
    yScale: {},
    margin: {},
    height: Number
  },
  data () {
    return {
      
    }
  },
  computed: {
    drawBargraph() {
      const g = d3.select('g#emBargraph')
      g.selectAll('*').remove()
      const bargroups = g.selectAll(".bar")
        .data(this.plotdata)
        .enter()
        .append("g");
      bargroups
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => this.xScale(d.name))
        .attr("y", (d) => this.yScale(d.energy))
        .attr("width", this.xScale.bandwidth())
        .attr(
          "height",
          (d) =>
            this.height -
            this.yScale(d.energy) -
            this.margin.top -
            this.margin.bottom
        )
        .attr("fill", (d) => d.color);
      return "emBargraph.vue";
    },
  },
};
</script>

<style>
</style>