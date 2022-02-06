<template>
  <div class="dropdown pmMenu">
    <button
      class="btn btn-outline-secondary btn-sm dropdown-toggle"
      type="button"
      data-bs-toggle="dropdown"
    >
      <span class="fa fa-bars fa-sm"></span>
    </button>
    <div class="dropdown-menu dropdown-menu-right colormenu">
      <a class="dropdown-item" href="#" v-on:click="switchTheme"
        ><span class="fa fa-adjust px-0"></span> Hintergrund ändern</a
      >
      <a class="dropdown-item" href="#" v-on:click="toggleGrid"
        ><span class="fa fa-th px-0"></span> Graph: Raster an/aus</a
      >
      <a class="dropdown-item" href="#" v-on:click="toggleFixArcs"
        ><span class="fa fa-chart-area px-0"></span> Fixe Bögen an/aus </a
      >
      <a
        v-if="config.showRelativeArcs"
        class="dropdown-item"
        id="meterResetButton"
        href="#"
        v-on:click="resetArcs"
        ><span class="fa fa-undo"></span> Bögen reset</a
      >
      <a class="dropdown-item" href="#" v-on:click="switchDecimalPlaces"
        ><span class="fa fa-sliders-h px-0"></span> Dezimalstellen kW & kWh
        ändern</a
      >
      <a class="dropdown-item" href="#" v-on:click="switchSmarthomeColors"
        ><span class="fa fa-palette px-0"></span> Farbschema Smart-Home-Geräte
        ändern</a
      >
    </div>
  </div>
</template>

<script>
import globalConf  from '@/assets/mixins/themeConfig.js'

export default {
  name: "pmMenu",
  mixins: [
    globalConf
  ],
};
</script>

<style>
</style>