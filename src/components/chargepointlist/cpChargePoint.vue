<template>
  <wbWidget>
    <template v-slot:title>
      <span @click="toggleConfig">{{ chargepoint.name }}</span>
    </template>
    <template v-slot:subtitle>
      <span class=" ms-2 pt-1 badge rounded-pill smallTextSize modeIndicator outlinePill" :style="modePillStyle" @click="toggleConfig">
        <i class="fa me-1" :class="modeIcon">  </i> {{ modeString }}
      </span>
    </template>
    <template v-slot:buttons>
      <button class="btn btn-outline-secondary btn-sm" 
      id="editButton"
      @click="toggleConfig">
        <span class="fa fa-lg px-0" :class="buttonIcon"></span>
      </button>
    </template>

    <div class="row m-0 p-1 mt-1" @click="toggleConfig">
      <div class="col-8 m-0 p-0">
        <p
          class="tablecell nameButtonCell p-0 m-0"
          :style="{ color: chargepoint.color }"
        >
          <i class="fa fa-s fa-car"> </i>
          <span class="px-2">{{ chargepoint.carName }}</span>
          <span
            v-if="chargepoint.willFinishAtTime"
            class="fa fa-xs fa-flag-checkered pl-1"
            :style="{ color: this.fgColor }"
          >
          </span>
        </p>
      </div>
      <div class="col-4 m-0 p-0">
        <!-- SoC Information -->
        <p
          class="tablecell p-0 m-0"
          style="text-align: right; vertical-align: middle"
        >
          <span v-if="chargepoint.isSocConfigured" class="px-2">
            <i class="fa" :class="batterySymbol"></i>
            {{ soc + "%" }}
          </span>
          <i
            v-if="chargepoint.isSocManual"
            class="small fas fa-edit"
            :style="{ color: fgColor }"
          ></i>
          <i
            v-if="!chargepoint.isSocManual"
            class="small fas fa-redo-alt"
            :id="'soclabel-' + index"
            :style="{ color: fgColor }"
          ></i>
        </p>
      </div>
    </div>
    <div class="row m-1 mt-2 p-0" style="vertical-align: middle" @click="toggleConfig">
      <div class="col-6 tablecell m-0 p-0">
        <span
          class="mr-2 badge rounded-pill statusIndicator"
          :style="{ color: statusColor }"
        >
        <i :class="statusIcon"></i>
          {{ statusString }}
        </span>
        <span v-if="chargepoint.isCharging && !chargepoint.isLocked" class="mx-1">
          {{ chargePowerString }}
        </span>
      </div>
      <div class="col-6 tablecell m-0 p-0" style="text-align: right">
        Geladen:
        <span>
          {{ chargeEnergyString }}
        </span>
      </div>
    </div>
    <cpChargeConfig
      :chargepoint="chargepoint"
      :vehicles="vehicles"
      :chargeTemplates="chargeTemplates"
      v-if="showConfig"
      v-on:closeConfig="toggleConfig">
    </cpChargeConfig>
  </wbWidget>
</template>

<script>
import { formatWatt, formatWattH } from "@/assets/js/helpers.js";
import globalConf from "@/assets/mixins/themeConfig.js";
import wbWidget from "../wbWidget.vue";
import cpChargeConfig from './cpChargeConfig.vue'

export default {
  name: "cpChargepoint",
  mixins: [ globalConf ],
  components: { wbWidget, cpChargeConfig },
  props: {
    chargepoint: Object,
    index: Number,
    vehicles:Array,
    chargeTemplates: Array
  },
  data() {
    return {
      fgColor: "var(--color-fg)",
      
      phaseSymbols: ["/", "\u2460", "\u2461", "\u2462"],
      showConfig: false
    };
  },
  computed: {
    switchStyle() {
      return {
        "fa-toggle-on": this.chargepoint.enabled,
        "fa-toggle-off": !this.chargepoint.enabled,
        "text-green": this.chargepoint.enabled,
        "text-red": !this.chargepoint.enabled,
      };
    },
    plugStyle() {
      return {
        "text-orange": !this.chargepoint.isCharging,
        "text-green": this.chargepoint.isCharging,
      };
    },
    chargePowerString() {
      return (
        formatWatt(this.chargepoint.power, this.config.decimalPlaces) +
        " " +
        this.phaseSymbols[this.chargepoint.phasesInUse] +
        " " +
        this.chargepoint.current +
        " A"
      );
    },
    chargeEnergyString() {
      if (this.chargepoint.energy > 0) {
        return (
          formatWattH(this.chargepoint.energy, this.config.decimalPlaces) +
          " / " +
          Math.round(
            (this.chargepoint.energy / this.chargepoint.energyPer100km / 10) 
          )  +
          " km")
      } else {
        return ("0 Wh")
      }
    },
    statusString() {
      if (this.chargepoint.isLocked) {
        return "Gesperrt";
      } else if (this.chargepoint.isCharging) {
        return "Lädt";
      } else if (this.chargepoint.isPluggedIn) {
        return "Bereit";
      } else {
        return "Frei";
      }
    },
    statusColor() {
      if (this.chargepoint.isLocked) {
        return "var(--color-evu)";
      } else if (this.chargepoint.isCharging) {
        return "var(--color-charging)";
      } else if (this.chargepoint.isPluggedIn) {
        return "var(--color-battery)";
      } else {
        return "var(--color-axis)";
      }
    },
    statusIcon() {
      let icon=""
      if (this.chargepoint.isLocked) {
        icon = 'fa-lock'
      } else if (this.chargepoint.isCharging) {
        icon=' fa-bolt'
      } else if (this.chargepoint.isPluggedIn) {
        icon = 'fa-plug'
      }
      return 'fa '+ icon
    },
  
    modePillStyle() {
      switch (this.chargepoint.chargeMode) {
        case 'stop': return {color: 'var(--fg)'}
        default: return {
              color: this.chargemodes[this.chargepoint.chargeMode].color
          }
      }
    },
    modeString() {
      return this.chargemodes[this.chargepoint.chargeMode].name;
    },
    modeIcon() {
      return this.chargemodes[this.chargepoint.chargeMode].icon
    },
    batterySymbol() {
      if (this.soc <= 10) {
        return 'fa-battery-empty'
      } else if (this.soc <= 50) {
        return 'fa-battery-quarter'
      } else if (this.soc <=75) {
        return 'fa-battery-half'
      } else if (this.soc <95) {
        return 'fa-battery-three-quarters'
      } else {
        return 'fa-battery-full'
      }
    },
    buttonIcon() {
      return (this.showConfig ? 'fa-caret-square-up' : 'fa-caret-square-down'  )
    },
    soc () {
      return this.chargepoint.soc
    }
  },
  methods: {
    toggleConfig () {
      this.showConfig = !this.showConfig
    }
  }
};
</script>

<style scoped>
.modeIndicator {
  color: white;
}
.outlinePill {
  border: 1px solid;
  background: var(--color-bg);
  vertical-align: bottom;
  font-size: var(--font-verysmall);
}
.statusIndicator {
  border: 1px solid;
  background: 'var(--bg) '
}
</style>>
