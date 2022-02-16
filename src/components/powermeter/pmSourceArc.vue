<template>
<g id="pmSourceArc" :origin='draw'>
  </g>
</template>

<script>
import * as d3 from "d3";
export default {
  name: "pmSourceArc",
    props: {
    sourceSummary: {},
    radius: Number,
    cornerRadius: Number,
    circleGapSize: Number,
    emptyPower: Number,
    scaleColor: String,
    bgColor: String
  },
  computed: {
    draw ()  { // Draw the arc using d3
      const arcCount = Object.values(this.sourceSummary).length
      const pieGenerator = d3.pie()
        .value((record) => Number(record.power))
        .startAngle(-Math.PI / 2 + this.circleGapSize)
        .endAngle(Math.PI / 2 - this.circleGapSize)
        .sort(null)
      const plotdata = Object.values(this.sourceSummary).concat([{ "power": this.emptyPower, "color": this.bgColor }])
      const arc = d3.arc()
        .innerRadius((this.radius / 6) * 5)
        .outerRadius(this.radius)
        .cornerRadius(this.cornerRadius)
        .padAngle(0)
      const graph = d3.select("g#pmSourceArc")
      graph.selectAll("*").remove()
      graph.selectAll("sources")
        .data(pieGenerator(plotdata)).enter()
        .append("path")
          .attr("d", arc)
          .attr("fill", (d) => d.data.color)
          .attr("stroke", (d, i) => (i == arcCount ? (d.data.power > 0 ? this.scaleColor : "null") : d.data.color));
    return "pmSourceArc.vue"}
  },
};
</script>

<style>
</style> 