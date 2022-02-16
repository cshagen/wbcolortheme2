<template>
  <g :transform="'translate(' + margin.left + ',' + margin.top + ')'">
  <g
    id="pgXAxis"
    class="axis"
    :origin="draw"
    
  ></g>
  <g
    id="pgXAxis2"
    class="axis"
    :origin="drawAxis2"
    v-if="config.showGrid"
  ></g>
    <g v-if="config.showGrid"
  >
      <rect
        x="0"
        y="0"
        :width= "this.width - this.margin.right"
        :height= "this.height"
        fill= "none"
        stroke= "var(--color-grid)"
        stroke-width= "0.5"></rect>
      </g>
  
  </g>
</template>

<script>
import * as d3 from "d3";
import config from "@/assets/mixins/themeConfig.js";

export default {
  props: {
    width: Number,
    height: Number,
    margin: Object,
    graphData: Array,
    xScale: Function,
  },
  mixins: [config],
  data() {
    return {
      fontsize: 12,
    };
  },
  computed: {
    /*  xScale() {
    return d3.scaleTime()
      .range([0, this.width - this.margin.right])
      .domain (d3.extent(this.graphData, d => d.date))
  }, */
    xAxisGenerator() {
      return d3
        .axisBottom(this.xScale)
        .ticks(4)
        .tickSizeInner(this.ticksize)
        .tickFormat(d3.timeFormat("%H:%M"))
        .ticks(4);
    },
    ticksize () {
      return this.config.showGrid ? -(this.height / 2 - 7) : -10;
    },
    xAxisGenerator2() {
      const ticksize2 = -(this.height / 2 - 10);
      return d3
        .axisTop(this.xScale)
        .ticks(4)
        .tickSizeInner(ticksize2)
        .tickFormat("");
    },
    draw() {
      let svg = d3.select("g#pgXAxis");
      svg.selectAll("*").remove();
      const axis = svg.append("g").attr("class", "axis").call(this.xAxisGenerator);
      axis.attr("transform", "translate(0," + (this.height / 2 - 6) + ")");
      axis
        .selectAll(".tick")
        .attr("color", "var(--color-axis)")
        .attr("font-size", this.fontsize);

      if (this.config.showGrid) {
        axis
          .selectAll(".tick line")
          .attr("stroke", "var(--color-grid)")
          .attr("stroke-width", "0.5");
      } else {
        axis.selectAll(".tick line").attr("stroke", "var(--color-bg)");
      }
      axis.select(".domain").attr("stroke", 'var(--color-bg)');
      svg
        .append("text")
        .attr("x", -this.margin.left)
        .attr("y", this.height / 2 + 5)
        .attr("fill", 'var(--color-axis)')
        .attr("font-size", this.fontsize)
        .text("kW");
      return "pgXAxis.vue";
    },
    drawAxis2 () {
      const svg = d3.select("g#pgXAxis2");
      svg.selectAll('*').remove()
        const axis2 = svg
          .call(this.xAxisGenerator2);
        axis2.attr("transform", "translate(0," + (this.height / 2 + 10) + ")");
        axis2
          .selectAll(".tick")
          .attr("color", "var(--color-axis)")
          .attr("font-size", this.fontsize);
        axis2
          .selectAll(".tick line")
          .attr("stroke", "var(--color-grid)")
          .attr("stroke-width", "0.5");

        axis2.select(".domain").attr("stroke", "var(--color-bg)");
        // add a rectangle around the graph
        /* svg
          .append("g")
          .append("rect")
          .attr("x", 0)
          .attr("y", 0)
          .attr("width", this.width - this.margin.right)
          .attr("height", this.height)
          .attr("fill", "none")
          .attr("stroke", 'var(--color-grid)')
          .attr("stroke-width", "0.5"); */
      
      return 'pgXAxis2.vue'
      
    }
  },
};
</script>

<style></style>
