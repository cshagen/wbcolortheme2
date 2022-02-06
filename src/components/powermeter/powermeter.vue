<template>
  <wbWidget>
    <template v-slot:title> Aktuelle Leistung </template>
    <template v-slot:buttons>
      <pmMenu v-on:resetArcs="resetArcs"></pmMenu>
    </template>
    <figure id="powermeter" class="p-0 m-0">
      <svg :viewBox="'0 0 ' + width + ' ' + height">
        <g :transform="'translate(' + width / 2 + ',' + height / 2 + ')'">
          <!-- Show the two arcs -->
          <pmSourceArc
            :sourceSummary="sourceSummary"
            :radius="radius"
            :cornerRadius="cornerRadius"
            :circleGapSize="circleGapSize"
            :emptyPower="emptyPower"
            :scaleColor="scaleColor"
            :bgColor="bgColor"
          ></pmSourceArc>
          <pmUsageArc
            :usageSummary="usageSummary"
            :shDevice="shDevice"
            :radius="radius"
            :cornerRadius="cornerRadius"
            :circleGapSize="circleGapSize"
            :emptyPower="emptyPower"
            :scaleColor="scaleColor"
            :bgColor="bgColor"
          ></pmUsageArc>
          <!-- Show the values for the different categories -->
          <pmLabel
            :x="0"
            :y="((-height / 2) * 3) / 5"
            :data="sourceSummary.pv"
            :anchor="'middle'"
            :config="config"
          ></pmLabel>
          <pmLabel
            :x="0"
            :y="((-height / 2) * 2) / 5"
            :data="sourceSummary.evuIn"
            :anchor="'middle'"
            :config="config"
          ></pmLabel>
          <pmLabel
            :x="width / 2 - margin / 4"
            :y="height / 2 - margin + 15"
            :data="sourceSummary.batOut"
            :anchor="'end'"
            :config="config"
          ></pmLabel>
          <pmLabel
            :x="0"
            :y="((-height / 2) * 2) / 5"
            :data="usageSummary.evuOut"
            :anchor="'middle'"
            :config="config"
          ></pmLabel>
          <pmLabel
            :x="0"
            :y="((height / 2) * 1) / 5"
            :data="usageSummary.charging"
            :anchor="'middle'"
            :config="config"
          ></pmLabel>
          <pmLabel
            :x="0"
            :y="((height / 2) * 3) / 5"
            :data="usageSummary.devices"
            :anchor="'middle'"
            :config="config"
          ></pmLabel>
          <pmLabel
            :x="width / 2 - margin / 4"
            :y="height / 2 - margin + 15"
            :data="usageSummary.batIn"
            :anchor="'end'"
            :config="config"
          ></pmLabel>
          <pmLabel
            :x="0"
            :y="((height / 2) * 2) / 5"
            :data="usageSummary.house"
            :anchor="'middle'"
            :config="config"
          ></pmLabel>
          <!-- Show the SoC for the first two cars -->
          <pmLabel
            v-if="chargepoints.length > 0 && chargepoints[0].isSocConfigured"
            :x="-width / 2 - margin / 4 + 10"
            :y="-height / 2 + margin + 5"
            :labeltext="chargepoints[0].name + ': ' + soc(0) + '%'"
            :labelcolor="chargepoints[0].color"
            :anchor="'start'"
            :config="config"
          ></pmLabel>
          <pmLabel
            v-if="chargepoints.length > 1 && chargepoints[1].isSocConfigured"
            :x="width / 2 + margin / 4 - 10"
            :y="-height / 2 + margin + 5"
            :labeltext="chargepoints[1].name + ': ' + soc(1) + '%'"
            :labelcolor="chargepoints[1].color"
            :anchor="'end'"
            :config="config"
          ></pmLabel>
          <!-- Show the SoC of the 1st battery -->
          <pmLabel
            v-if="globalData.batterySoc > 0"
            :x="-width / 2 - margin / 4 + 10"
            :y="height / 2 - margin + 15"
            :labeltext="'Speicher: ' + globalData.batterySoc + '%'"
            :labelcolor="usageSummary.batIn.color"
            :anchor="'start'"
            :config="config"
          ></pmLabel>
          <!-- Show the current consumption -->
          <pmLabel
            :x="0"
            :y="0"
            :labeltext="'Aktueller Verbrauch: ' + currentConsumptionString"
            :labelcolor="fgColor"
            :anchor="'middle'"
            :config="config"
          ></pmLabel>
          <!-- Show the Peak value if we use relative arc lengths -->
          <text
            v-if="config.showRelativeArcs"
            :x="width / 2 - 44"
            y="2"
            text-anchor="middle"
            :fill="axisColor"
            font-size="12"
          >
            Peak: {{ maxPowerString }}
          </text>
        </g>
      </svg>
    </figure>
  </wbWidget>
</template>

<script>
import pmMenu from "./pmMenu";
import pmSourceArc from "./pmSourceArc.vue";
import pmUsageArc from "./pmUsageArc.vue";
import pmLabel from "./pmLabel.vue";
import wbWidget from "../wbWidget.vue";
import config from "@/assets/mixins/themeConfig.js";
import { formatWatt } from "@/assets/js/helpers.js";
import { eventBus } from "@/main.js";

export default {
  name: "powermeter",
  mixins: [config],
  components: {
    pmMenu,
    pmSourceArc,
    pmUsageArc,
    pmLabel,
    wbWidget,
  },
  props: {
    globalData: Object,
    sourceSummary: Object,
    usageSummary: Object,
    chargePoint: Object,
    vehicle: Array,
    shDevice: [],
  },
  data() {
    return {
      width: 500,
      margin: 20,
      cornerRadius: 1,
      // maxPower: this.config.maxPower,
      scaleColor: "var(--color-scale)",
      bgColor: "var(--color-bg)",
      fgColor: "var(--color-fg)",
      axisColor: "var(--color-axis)",
    };
  },
  computed: {
    height() {
      return this.width;
    },
    radius() {
      return this.width / 2 - this.margin;
    },
    circleGapSize: () => Math.PI / 40,
    emptyPower: function () {
      // with relative arcs, this is the empty portion of the arc
      let result = 0;
      if (this.config.showRelativeArcs) {
        result =
          this.config.maxPower -
          (+this.sourceSummary.pv.power +
            this.sourceSummary.evuIn.power +
            this.sourceSummary.batOut.power);
      }
      return result < 0 ? 0 : result;
    },
    currentConsumptionString() {
      return formatWatt(
        this.globalData.housePower +
          this.usageSummary.charging.power +
          this.usageSummary.devices.power +
          this.usageSummary.batIn.power,
        this.config.decimalPlaces
      );
    },
    maxPowerString() {
      let currentPower =
        +this.sourceSummary.pv.power +
        this.sourceSummary.evuIn.power +
        this.sourceSummary.batOut.power;
      return this.config.maxPower > currentPower
        ? formatWatt(this.config.maxPower, this.config.decimalPlaces)
        : formatWatt(currentPower, this.config.decimalPlaces);
    },
    chargepoints() {
      return Object.values(this.chargePoint);
    },
    
  },
  methods: {
    // Toggle the view between fixed and variable arc lengths
    toggleFixArcs() {
      this.config.showRelativeArcs = !this.config.showRelativeArcs;
      eventBus.$emit("writeCookie");
    },
    resetArcs() {
      let maxPower =
        +this.sourceSummary.pv.power +
        this.sourceSummary.evuIn.power +
        this.sourceSummary.batOut.power;
      // this.config.maxPower = this.maxPower;
      eventBus.$emit("resetArcs", maxPower);
    },
    soc(i) {
      let carId = this.chargepoints[i].carId
      return (this.vehicle.length > carId) ? this.vehicle[carId].soc : 0
      
    }
  },
  mounted() {
    // this.maxPower = this.config.maxPower;
  },
};
</script>

<style></style>
