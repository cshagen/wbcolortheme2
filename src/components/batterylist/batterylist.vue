<template>
  <wbWidget v-if="globalConf.isBatteryConfigured">
    <template v-slot:title> Speicher </template>
    <table class="table table-borderless table-condensed p-0 m-0">
      <thead>
        <tr>
          <th
            class="tablecell"
            v-for="(title,index) in headers"
            :key="index"
            :style="{ 'text-align': index==0 ? 'left' : index == 3 ? 'right' : 'center' }"
          >
            {{ title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          :style="{ color: sourceSummary.batOut.color, 'text-align': 'center' }"
        >
          <!-- Current power -->
          <td class="tablecell py-1 px-1" style="text-align:left;">
            {{ powerstring }}
          </td>
          <!-- Daily import -->
          <td class="tablecell py-1 px-1" style="vertical-align: middle">
            {{ importstring }}
          </td>
          <!-- Daily export -->
          <td class="tablecell py-1 px-1" style="vertical-align: middle">
            {{ exportstring }}
          </td>
          <td class="tablecell py-1 px-1" style="vertical-align: middle; text-align: right;">
            {{ globalConf.batterySoc }} %
          </td>
        </tr>
      </tbody>
    </table>
  </wbWidget>
</template>

<script>
import config from "@/assets/mixins/themeConfig.js";
import wbWidget from "../wbWidget.vue";
import { formatWatt, formatWattH } from "@/assets/js/helpers.js";
export default {
  name: "batteryList",
  props: {
    globalConf: Object,
    sourceSummary: Object,
    usageSummary: Object,
  },
  components: { wbWidget },
  mixins: [config],
  data() {
    return {
      headers: ["Leistung", "Geladen", "Geliefert", "Ladestand"],
    };
  },
  computed: {
    powerstring() {
      let result = "";
      if (this.usageSummary.batIn.power > 0) {
        result = "Ladung: " + formatWatt(this.usageSummary.batIn.power);
      } else if (this.sourceSummary.batOut.power > 0) {
        result = "Lieferung: " + formatWatt(this.sourceSummary.batOut.power);
      } else {
        result = "0 W";
      }
      return result;
    },
    importstring() {
      return formatWattH(this.usageSummary.batIn.energy * 1000);
    },
    exportstring() {
      return formatWattH(this.sourceSummary.batOut.energy * 1000);
    },
  },
};
</script>

<style></style>
