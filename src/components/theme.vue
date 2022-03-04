<template>
  <div class="container-fluid p-0 m-0 theme-colors">
    <buttonBar
      :chargepoints="chargePoints"
      :globalData="globalData"
      :vehicles="Object.values(vehicles)"
      :chargeTemplates="chargeTemplates"
    ></buttonBar>
    <hr />
    <div class="row py-0 px-0 m-0">
      <powermeter
        :globalData="globalData"
        :sourceSummary="sourceSummary"
        :usageSummary="usageSummary"
        :chargePoint="chargePoints"
        :vehicle="Object.values(vehicles)"
        :shDevice="shDevice"
      ></powermeter>
      <powergraph :graphData="graphData"></powergraph>
      <EnergyMeter
        :sourceSummary="sourceSummary"
        :usageDetails="usageDetails"
      ></EnergyMeter>
    </div>
    
    <hr/>
    <nav class="nav nav-pills nav-justified" id="sectionTab" role="tablist">
        <button
          class="nav-link active tabButton"
          id="home-tab"
          data-bs-toggle="tab"
          data-bs-target="#chargepointlist"
          type="button"
          role="tab"
          aria-controls="home"
          aria-selected="true"
        >
          Ladepunkte
        </button>
        <button v-if="globalData.isEtEnabled"
          class="nav-link disabled tabButton"
          id="profile-tab"
          data-bs-toggle="tab"
          data-bs-target="#pricebasedcharging"
          type="button"
          role="tab"
          aria-controls="profile"
          aria-selected="false"
        >
          Strompreis
        </button>
        <button v-if="globalData.isBatteryConfigured"
          class="nav-link tabButton"
          id="contact-tab"
          data-bs-toggle="tab"
          data-bs-target="#batterylist"
          type="button"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Speicher
        </button>
        <button
          class="nav-link disabled tabButton"
          id="contact-tab"
          data-bs-toggle="tab"
          data-bs-target="#smarthomelist"
          type="button"
          role="tab"
          aria-controls="contact"
          aria-selected="false"
        >
          Smart Home
        </button>
    </nav>
    <div class="tab-content" id="myTabContent">
      <div
        class="tab-pane show active"
        id="chargepointlist"
        role="tabpanel"
        aria-labelledby="chargepoint-tab"
      >
      <div class="row py-0 m-0">
        <cpChargepoint
          v-for="(chargepoint, index) in chargepointsToDisplay"
          :key="index"
          :chargepoint="chargepoint"
          :vehicles="Object.values(vehicles)"
          :chargeTemplates="chargeTemplates"
        ></cpChargepoint>
      </div>
      </div>
      <div
        class="tab-pane "
        id="pricebasedcharging"
        role="tabpanel"
        aria-labelledby="pricebased-tab"
      >
      <PriceChart></PriceChart>
      </div>
      <div
        class="tab-pane "
        id="batterylist"
        role="tabpanel"
        aria-labelledby="battery-tab"
      >
        <batterylist
          :globalConf="globalData"
          :sourceSummary="sourceSummary"
          :usageSummary="usageSummary"
        >
        </batterylist>
      </div>
      <div
        class="tab-pane "
        id="smarthomelist"
        role="tabpanel"
        aria-labelledby="smarthome-tab"
      >
        ...
      </div>
    </div>
    
    <div class="row">
      <div class="col">
        <hr />
        Screen Width: {{ screensize.x }}
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from "d3";
import powermeter from "./powermeter/powermeter.vue";
import powergraph from "./powergraph/powergraph.vue";
import EnergyMeter from "./energymeter/EnergyMeter.vue";
import buttonBar from "./buttonBar/buttonBar.vue";
import model from "../assets/mixins/model.js";
import config from "@/assets/mixins/themeConfig";
import messages from "@/assets/mixins/rcvMessages";
import prefs from "@/assets/mixins/handleCookies";
import setValues from "@/assets/mixins/sendMessages.js";
import Batterylist from "./batterylist/batterylist.vue";
import cpChargepoint from "./chargepointlist/cpChargePoint.vue";
import priceChart from './pricechart/PriceChart.vue'
import handleGraphData from "../assets/mixins/handleGraphData";
import PriceChart from './pricechart/PriceChart.vue';

export default {
  name: "theme",
  mixins: [config, messages, model, prefs, setValues, handleGraphData],
  components: {
    powermeter,
    powergraph,
    EnergyMeter,
    Batterylist,
    buttonBar,
    cpChargepoint,
    priceChart,
    PriceChart
  },
  data() {
    return {
      screensize: {
        x: document.documentElement.clientWidth,
        y: document.documentElement.clientHeight,
      },
    };
  },
  mounted() {
    // console.log("theme mounted")
    this.init();
    window.addEventListener("resize", this.updateDimensions);
  },
  methods: {
    // initialize the theme
    init() {
      this.readCookie();
      // set the background
      const doc = d3.select("html");
      doc.classed("theme-dark", this.config.displayMode == "dark");
      doc.classed("theme-light", this.config.displayMode == "light");
      doc.classed("theme-gray", this.config.displayMode == "gray");
      // set the color scheme for devices
      doc.classed(
        "shcolors-standard",
        this.config.smartHomeColors == "standard"
      );
      doc.classed(
        "shcolors-advanced",
        this.config.smartHomeColors == "advanced"
      );
      doc.classed("shcolors-normal", this.config.smartHomeColors == "normal");
    },
    updateDimensions() {
      this.screensize.x = document.documentElement.clientWidth;
      this.screensize.y = document.documentElement.clientHeight;
    },
  },
  computed: {
    usageDetails() {
      return [this.usageSummary.evuOut, this.usageSummary.charging]
        .concat(
          this.shDevice.filter((row) => row.configured && row.showInGraph)
        )
        .concat([this.usageSummary.batIn, this.usageSummary.house]);
    },
    chargepointsToDisplay() {
      return Object.values(this.chargePoints).filter((cp) => cp.configured);
    },
  },
  beforeUpdate() {
    // console.log("theme.vue: beforeUpdate()");
  },
};
</script>

<style scoped>
  .nav-pills .nav-link {
    color: var(--color-menu);
    border: 1px solid var(--color-frame);
    margin: 0px 2px 0px 2px;
  }
  .nav-pills .nav-link.disabled {
    color: var(--color-axis);
    border: 0.5px solid var(--color-axis);
  }

  .nav-pills .nav-link.active {
    color: var(--color-bg);
    background-color: var(--color-frame) ;
  }

</style>
