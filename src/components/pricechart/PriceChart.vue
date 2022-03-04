<template>
  <wbWidget>
    <template v-slot:title> Preisbasiertes Laden </template>
    <div class="row p-0 m-0">
      <div class="col-12 pricechartColumn p-0 m-0">
        <figure id="pricechart" class="p-0 m-0">
          <svg viewBox="0 0 400 120">
            <g
              :transform="
                'translate(' + this.margin.left + ',' + this.margin.right + ')'
              "
              id="priceChartCanvas"
            ></g>
          </svg>
        </figure>
      </div>
    </div>
    <div class="row vaRow m-0 p-0">
      <div class="col-2 m-0 p-0">
        <button type="button" class="btn btn-secondary priceLess">
          <i class="far fa-minus-square"></i>
        </button>
      </div>
      <div class="col-8">
        <input
          type="range"
          class="form-control-range maxPriceInput"
          id="maxPrice"
          min="-25"
          max="95"
          step="0.1"
          value="0"
          data-initialized="0"
        />
      </div>
      <div class="col-2 m-0 p-0 text-right">
        <button type="button" class="btn btn-secondary priceMore">
          <i class="far fa-plus-square"></i>
        </button>
      </div>
    </div>
    <div class="form-row vaRow p-0 m-0">
      <div class="col m-0 p-0 tablecell maxPrice">
        <label for="maxPrice" class="col-form-label p-0 m-0"
          >Max. Preis:
        </label>
        <label
          for="maxPrice"
          class="labelMaxPrice col-form-label p-0 m-0"
          data-suffix="ct"
        ></label>
      </div>
    </div>
  </wbWidget>
</template>

<script>
import * as d3 from "d3";
import wbWidget from "../wbWidget.vue";
export default {
  name: "priceChart",
  components: {
    wbWidget,
  },
  props: {
    globalData: Object,
    etPriceList: String,
  },
  data() {
    return {
      width: 400,
      height: 120,
      margin: { top: 5, bottom: 15, left: 15, right: 5 },
    };
  },
  computed: {
    plotdata() {
      let result = [];
      if (this.etPriceList != "") {
        let result = this.etPriceList.split(/\r?\n|\r/); // split into lines
        result.shift(); // remove first line
        result = result
          .map((line) => {
            // split lines into tuples [time,price]
            return line.split(",");
          })
          .map((line) => [line[0] * 1000, +line[1]]); // multiply timestamps by 1000
      }
      return result;
    },
    barwidth() {
      if (this.plotdata.length > 1) {
        return (
          (this.width - this.margin.left - this.margin.right) /
            this.plotdata.length -
          1
        );
      } else {
        return 0;
      }
    },
    xScale() {
      let xdomain = d3.extent(this.plotdata, (d) => d[0]);
      xdomain[1] = xdomain[1] + 3600000;
      return d3
        .scaleTime()
        .range([0, this.width - this.margin.left - this.margin.right])
        .domain(xdomain);
    },
    yScale() {
      let ydomain = d3.extent(this.plotdata, (d) => d[1]);
      if (ydomain[0] > 0) {
        ydomain[0] = 0;
      }
      ydomain[1] = Math.floor(ydomain[1] + 1);
      return d3
        .scaleLinear()
        .range([this.height - this.margin.bottom - this.margin.top, 0])
        .domain(ydomain);
    },
    linePath() {
      const generator = d3.line();
      const points = [
        [0, this.yScale(this.globalData.etMaxPrice)],
        [
          this.width - this.margin.left - this.margin.right,
          this.yScale(this.globalData.etMaxPrice),
        ],
      ];
      return generator(points);
    },
    xAxisGenerator() {
      return d3
        .axisBottom(this.xScale)
        .ticks(4)
        .tickFormat(d3.timeFormat("%H:%M"));
    },
    yAxisGenerator() {
      return d3
        .axisLeft(this.yScale)
        .ticks(6)
        .tickSizeInner(-(this.width - this.margin.right - this.margin.left))
        .tickFormat((d) => d);
    },
    draw() {
      let svg = d3.select("g#priceChartCanvas");
      svg.selectAll("*").remove();
      const bargroups = svg
        .selectAll("bar")
        .data(this.plotdata)
        .enter()
        .append("g");
      bargroups
        .append("rect")
        .attr("class", "bar")
        .attr("x", (d) => this.xScale(d[0]))
        .attr("y", (d) => (d[1] >= 0 ? this.yScale(d[1]) : this.yScale(0)))
        .attr("width", this.barwidth)
        .attr("height", (d) =>
          d[1] >= 0
            ? this.yScale(0) - this.yScale(d[1])
            : this.yScale(d[1]) - this.yScale(0)
        )
        .attr("fill", (d) =>
          d[1] <= this.globalData.etMaxPrice
            ? "var(--color-charging)"
            : "var(--color-axis"
        );
      // Line for max price
      svg.append("path").attr("d", this.linePath).attr("stroke", "yellow");
      // X Axis
      const xAxis = this.svg
        .append("g")
        .attr("class", "axis")
        .call(this.xAxisGenerator);
      xAxis.attr(
        "transform",
        "translate(" +
          this.margin.left +
          "," +
          (this.height - this.margin.bottom) +
          ")"
      );
      xAxis
        .selectAll(".tick")
        .attr("font-size", 8)
        .attr("color", "var(--color-bg)");
      xAxis
        .selectAll(".tick line")
        .attr("stroke", "var(--color-bg)")
        .attr("stroke-width", "0.5");
      xAxis.select(".domain").attr("stroke", "var(--color-bg");
      // Y Axis
      const yAxis = this.svg
        .append("g")
        .attr("class", "axis")
        .call(this.yAxisGenerator);
      yAxis.attr(
        "transform",
        "translate(" + this.margin.left + "," + this.margin.top + ")"
      );
      yAxis
        .selectAll(".tick")
        .attr("font-size", 8)
        .attr("color", "var(--color-bg)");

      yAxis
        .selectAll(".tick line")
        .attr("stroke", "var(--color-bg)")
        .attr("stroke-width", "0.5");

      yAxis.select(".domain").attr("stroke", "var(--color-bg)");

      return "PriceChart.vue";
    },
  },
};
</script>

<style></style>
