<template>
  <g id="pmUsageArc" :origin="draw"> </g>
</template>

<script>
import * as d3 from "d3";
export default {
  data() {
    return {
      name: "pmUsageArc",
    };
  },
  props: {
    usageSummary: {},
    shDevice: [],
    radius: Number,
    cornerRadius: Number,
    circleGapSize: Number,
    emptyPower: Number,
    bgColor: String,
    scaleColor: String,
  },
  computed: {
    draw() {
      // Draw the arc using d3
      const pieGenerator = d3.pie()
        .value((record) => Number(record.power))
        .startAngle(Math.PI * 1.5 - this.circleGapSize)
        .endAngle(Math.PI / 2 + this.circleGapSize)        
        .sort(null);
      const plotdata = [this.usageSummary.evuOut, this.usageSummary.charging]
        .concat(
          this.shDevice
            .filter((row) => row.configured && !row.countAsHouse)
            .sort((a, b) => {
              return b.power - a.power;
            })
        )
        //.concat(this.consumer.filter((row) => row.configured))
        .concat([this.usageSummary.batIn, this.usageSummary.house])
        .concat([{ power: this.emptyPower, color: this.bgColor }]);
      const arcCount = plotdata.length - 1;
      const arc = d3
        .arc()
        .innerRadius((this.radius / 6) * 5)
        .outerRadius(this.radius)
        .cornerRadius(this.cornerRadius);
      const graph = d3.select("g#pmUsageArc");
      graph.selectAll("*").remove();
      graph
        .selectAll("consumers")
        .data(pieGenerator(plotdata)).enter()
        .append("path")
        .attr("d", arc)
        .attr("fill", (d) => d.data.color)
        .attr("stroke", (d, i) =>
          (i == arcCount ? (d.data.power > 0 ? this.scaleColor : "null") : d.data.color)
        );
      return "pmUsageArc.vue";
    },
  },
};
</script>

<style>
</style>  