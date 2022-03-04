import { eventBus } from "@/main.js";
import * as d3 from "d3";

var configT = {
  showRelativeArcs: false,
  showTodayGraph: true,
  graphMode: "live",
  graphPreference: "live",
  usageStackOrder: 0,
  displayMode: "gray",
  showGrid: false,
  smartHomeColors: "normal",
  decimalPlaces: 1,
  maxPower: 4000,
  isEtEnabled: false,
  etPrice: 20.5,
};

export default {
  data() {
    return {
      config: configT,
      chargemodes: {
        instant_charging: { name: "Sofort", color: "var(--color-charging)", icon: 'fa-bolt' },
        pv_charging: { name: "PV", color: "var(--color-pv", icon: 'fa-solar-panel' },
        scheduled_charging: { name: "Zielladen", color: "var(--color-battery", icon: 'fa-clock' },
        standby: { name: "Standby", color: "var(--color-axis", icon: 'fa-pause' },
        stop: { name: "Stop", color: "black", icon: 'fa-power-off' },
      },
    };

  },
  methods: {
    savePrefs () {
      eventBus.$emit('writeCookie')
    },
   
    switchTheme() {
      const doc = d3.select("html");
      switch (this.config.displayMode) {
        case "gray":
          this.config.displayMode = "light";
          break;
        case "light":
          this.config.displayMode = "dark";
          break;
        case "dark":
          this.config.displayMode = "gray";
          break;
        default:
          break;
      }
      doc.classed("theme-dark", this.config.displayMode == "dark");
      doc.classed("theme-light", this.config.displayMode == "light");
      doc.classed("theme-gray", this.config.displayMode == "gray");
      this.savePrefs();
    },
    toggleGrid() {
      this.$set(this.config,'showGrid',  !this.config.showGrid);
      this.savePrefs();
    },

    toggleFixArcs() {
      this.config.etPrice = this.config.etPrice + 10;
      this.config.showRelativeArcs = !this.config.showRelativeArcs;
      this.savePrefs();
    },
    resetArcs(maxp) {
      this.config.maxPower = maxp;
      this.savePrefs();
    },
    switchDecimalPlaces() {
      if (this.config.decimalPlaces < 3) {
        this.config.decimalPlaces = this.config.decimalPlaces + 1;
      } else {
        this.config.decimalPlaces = 0;
      }
      this.savePrefs();
    },

    switchSmarthomeColors() {
      const doc = d3.select("html");
      switch (this.config.smartHomeColors) {
        case "normal":
          this.config.smartHomeColors = "standard";
          doc.classed("shcolors-normal", false);
          doc.classed("shcolors-standard", true);
          doc.classed("shcolors-advanced", false);
          break;
        case "standard":
          this.config.smartHomeColors = "advanced";
          doc.classed("shcolors-normal", false);
          doc.classed("shcolors-standard", false);
          doc.classed("shcolors-advanced", true);
          break;
        case "advanced":
          this.config.smartHomeColors = "normal";
          doc.classed("shcolors-normal", true);
          doc.classed("shcolors-standard", false);
          doc.classed("shcolors-advanced", false);
          break;
        default:
          this.config.smartHomeColors = "normal";
          doc.classed("shcolors-normal", true);
          doc.classed("shcolors-standard", false);
          doc.classed("shcolors-advanced", false);
          break;
      }
      this.savePrefs();
    },
  },
};
