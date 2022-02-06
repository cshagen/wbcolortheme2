<template>
  <div class="col-lg-4 p-0 m-0 mt-1">
    <div class="d-grid gap-2">
      <button
        type="button"
        class="btn mx-1 mb-1 p-1 largeTextSize chargeButton"
        @click="cpSelected"
        :style="buttonStyle"
      >
      <div class="container-fluid m-0 p-0">
        <div class="row m-0 p-0">
          <!-- Status indicator -->
          <div class="col-3 m-0 p-0" style="text-align: left;">
      <span v-if="chargepoint.isPluggedIn" 
          class="mx-1 badge rounded-pill smallTextSize plugIndicator" 
          >
          <i :class="plugPillClass"></i>
        </span>
          </div>
          <!-- Chargepoint name -->
          <div class="col-6 m-0 p-0">
        {{ chargepoint.name }}
          </div>
          <!-- Mode indicator -->
          <div class="col-3 m-0 p-0" style="text-align:right">
        <span class="mx-2 badge rounded-pill smallTextSize modeIndicator" :style="modePillStyle">
          <i class="fa me-1" :class="modeIcon">  </i> 
          {{ modeString }}
          <!-- PV priority -->
          <span v-if="chargepoint.chargeMode == 'pv_charging'" class="ps-1">
          (<i 
           class="fa m-0" :class="priorityIcon">  
           </i>)
          </span>
        </span>
          </div>
        </div>
      </div>
      </button>
    </div>
  </div>
</template>

<script>
import globalConf from '@/assets/mixins/themeConfig.js'
export default {
  name: "bbChargeButton",
  props: {
    chargepoint: Object,
    globalData: Object
  },
  mixins: [globalConf],
  computed: {
    modeString() {
      return this.chargemodes[this.chargepoint.chargeMode].name;
    },
    buttonString() {
      return this.chargepoint.name + ": " + this.modeString;
    },
    buttonColor() {
      console.warn (this.chargemodes)
      return this.chargemodes[this.chargepoint.chargeMode].color;
    },
    buttonStyle() {
      let style = {
        background: "var(--color-axis)"
      };
      if (this.chargepoint.isLocked) {
        style.background = 'var(--color-evu)'
      } else if (this.chargepoint.isCharging) {
        style.background = "var(--color-charging)";
      } else  if (this.chargepoint.isPluggedIn) {
        style.background = "var(--color-battery)";
      } else if (this.chargepoint.enabled) {
        style.background = "var(--color-axis)";
      } else {
        style.background = "var(--color-evu)";
      }
      return style;
    },
    modePillStyle() {
      let style = {
        background: this.chargemodes[this.chargepoint.chargeMode].color,
        color: 'white'
      };
      switch (this.chargepoint.chargeMode) {
        case 'instant_charging': 
          if (this.chargepoint.isCharging && !this.chargepoint.isLocked) {
            style = this.swapcolors(style)
          }
          break
        case 'standby':
        case 'stop':
          if (!this.chargepoint.isPluggedIn) {
            style = this.swapcolors(style)
          }
          break
        case 'scheduled_charging':
          if (this.chargepoint.isPluggedIn && !this.chargepoint.isCharging && !this.chargepoint.isLocked) {
            style = this.swapcolors(style)
          }
          break
          default:
          break
      }
      return style;
    },
    modeIcon ()  {
      return this.chargemodes[this.chargepoint.chargeMode].icon
    },
    priorityIcon () {
      if (this.globalData.pvBatteryPriority) {
        return 'fa-car-battery'
      } else {
        return 'fa-car'
      }
    },
    plugPillClass() {
      let icon=""
      if (this.chargepoint.isLocked) {
        icon = 'fa-lock'
      } else if (this.chargepoint.isCharging) {
        icon=' fa-bolt'
      } else if (this.chargepoint.isPluggedIn) {
        icon = 'fa-plug'
      }
      return 'fa '+ icon
    }
  },
  methods: {
    cpSelected() {
      this.$emit("cpSelected", this.chargepoint);
    },
    swapcolors (style) {
      let c = style.color
      style.color = style.background
      style.background = c
      return style
    },
  }
};
</script>

<style scoped>
.plugIndicator {
 
  color: white;
  border: 1px solid white;
  text-align:left;
}

.chargeButton {
  color: white;
}
</style>