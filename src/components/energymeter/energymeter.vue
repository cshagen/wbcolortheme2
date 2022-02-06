<template>
  <wbWidget>
    <template v-slot:title> {{ heading }} </template>
    <template v-slot:buttons>
      <emMenu :config="config"></emMenu>
    </template>
    <figure id="energymeter" class="p-0 m-0">
                    <svg viewBox="0 0 500 500">
                <g
                  :transform="
                    'translate(' + margin.left + ',' + margin.top + ')'
                  "
                >
                  <!--  Bar Graph -->
                  <emBargraph
                    :plotdata="plotdata"
                    :xScale="xScale"
                    :yScale="yScale"
                    :height="height"
                    :margin="margin"
                  ></emBargraph>
                  <!-- Y Axis -->
                  <emYAxis
                    :yScale="yScale"
                    :width="width"
                    :fontsize="axisFontsize"
                    :config="config"
                  ></emYAxis>
                  <text
                    :x="-margin.left"
                    y="-15"
                    :fill="axisColor"
                    :font-size="axisFontsize"
                  >
                    kWh
                  </text>
                  <emLabels
                    :plotdata="plotdata"
                    :xScale="xScale"
                    :yScale="yScale"
                    :height="height"
                    :margin="margin"
                    :config="config"
                  ></emLabels>
                </g>
              </svg>
            </figure>
  </wbWidget>
</template>

<script>
import * as d3 from "d3";
import { formatMonth } from "@/assets/js/helpers.js";
import emMenu from "./emMenu.vue";
import emBargraph from "./emBargraph.vue";
import emYAxis from "./emYAxis.vue";
import emLabels from "./emLabels.vue";
import wbWidget from '../wbWidget.vue'
import config from "@/assets/mixins/themeConfig.js";

export default {
  name: "energymeter",
  mixins: [config],
  components: { emMenu, emBargraph, emYAxis, emLabels, wbWidget },
  props: {
    sourceSummary: Object,
    usageDetails: [],
    //   config: {},
  },
  data() {
    return {
      width: 500,
      height: 500,
      margin: {
        top: 25,
        bottom: 30,
        left: 25,
        right: 0,
      },
      axisFontsize: 12,
      houseColor: "var(--color-house)",
      pvColor: "var(--color-pv)",
      exportColor: "var(--color-export)",
      evuColor: "var(--color-evu)",
      bgColor: "var(--color-bg)",
      chargeColor: "var(--color-charging)",
      axisColor: "var(--color-axis)",
      gridColor: "var(--color-grid)",
    };
  },
  computed: {
    plotdata() {
      let result = [];
      switch (this.config.graphMode) {
        default:
        case "live":
          result = Object.values(this.sourceSummary)
            .filter((row) => row.energy > 0)
            .concat(this.usageDetails.filter((row) => row.energy > 0));
          break;
        case "day":
          if (this.config.showTodayGraph) {
            result = Object.values(this.sourceSummary)
              .filter((row) => row.energy > 0)
              .concat(this.usageDetails)
              .filter((row) => row.energy > 0);
          } else {
            result = Object.values(this.historicSummary).filter(
              (row) => row.energy > 0
            );
          }
          break;
        case "month":
          result = Object.values(this.historicSummary).filter(
            (row) => row.energy > 0
          );
          break;
      }
      return result;
    },
    xScale() {
      return d3
        .scaleBand()
        .range([0, this.width - this.margin.left - this.margin.right])
        .domain(this.plotdata.map((d) => d.name))
        .padding(0.4);
    },
    yScale() {
      return d3
        .scaleLinear()
        .range([this.height - this.margin.bottom - this.margin.top, 0])
        .domain([0, d3.max(this.plotdata, (d) => d.energy)]);
    },
    heading() {
      let result = "Energie ";

      switch (this.config.graphMode) {
        case "live":
          result = result + " heute";
          break;
        case "day":
          if (this.config.showTodayGraph) {
            result = result + " heute";
          } else {
            result =
              result +
              this.config.graphDate.getDate() +
              "." +
              (this.config.graphDate.getMonth() + 1) +
              ".";
          }
          break;
        case "month":
          result =
            "Monatswerte " +
            formatMonth(
              this.config.graphMonth.month,
              this.config.graphMonth.year
            );
          break;
        default:
          break;
      }
      return result;
    },
  },
};
</script>

<style></style>
