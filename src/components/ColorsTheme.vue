/*
 * ColorsTheme.vue
 * colors theme for openwb 2.0
 * Copyright (c) 2022 Claus Hagen
 */

<template>
  <div class="container-fluid px-2 m-0 theme-colors">
    <!-- Button Bar -->
    <ButtonBar></ButtonBar>
    
    <!-- Main Widgets -->
    <div class="row py-0 px-0 m-0">
      <PowerMeter></PowerMeter>
      <PowerGraph></PowerGraph>
      <EnergyMeter :usageDetails="usageDetails"></EnergyMeter>
    </div>
    <!-- Detail configuration list -->
     <div class="row py-0 m-0 d-flex justify-content-center" v-if="!globalConfig.showQuickAccess">
          <ChargePointList> </ChargePointList>
          <BatteryList> </BatteryList>
          <SmartHomeList> </SmartHomeList>
          <PriceChart> </PriceChart>
        </div>
    <!-- Tabbed area -->
    <nav class="nav nav-tabs nav-justified mx-1 mt-2" role="tablist" v-if="(globalConfig.showQuickAccess)">
      <a class="nav-link active" data-bs-toggle="tab" data-bs-target="#showAll">
        <i class="fa-solid fa-lg fa-circle-info me-1"></i>
        <span class="d-none d-md-inline ms-2">Details</span>
      </a>
      <a
        class="nav-link"
        data-bs-toggle="tab"
        data-bs-target="#chargepointlist"
      >
        <i class="fa-solid fa-lg fa-charging-station"></i>
        <span class="d-none d-md-inline ms-2">Ladepunkte</span>
      </a>
      <a
        class="nav-link"
        data-bs-toggle="tab"
        data-bs-target="#batterylist"
        v-if="globalData.isBatteryConfigured"
      >
        <i class="fa-solid fa-lg fa-car-battery"></i>
        <span class="d-none d-md-inline ms-2">Speicher</span>
      </a>
      <a class="nav-link" data-bs-toggle="tab" data-bs-target="#smarthomelist">
        <i class="fa-solid fa-lg fa-plug"></i>
        <span class="d-none d-md-inline ms-2">Smart Home</span>
      </a>
      <a
        class="nav-link"
        data-bs-toggle="tab"
        data-bs-target="#etPricing"
        v-if="etData.isEtEnabled"
      >
        <i class="fa-solid fa-lg fa-money-bill-1-wave"></i>
        <span class="d-none d-md-inline ms-2">Strompreis</span>
      </a>
    </nav>
    <!-- Tab panes -->
    <div class="tab-content mx-0 pt-1" id="cpContent" v-if="(globalConfig.showQuickAccess)">
      <div
        class="tab-pane active"
        id="showAll"
        role="tabpanel"
        aria-labelledby="showall-tab"
      >
        <div class="row py-0 m-0 d-flex justify-content-center">
          <ChargePointList> </ChargePointList>
          <BatteryList> </BatteryList>
          <SmartHomeList> </SmartHomeList>
          <PriceChart> </PriceChart>
        </div>
      </div>
      <div
        class="tab-pane"
        id="chargepointlist"
        role="tabpanel"
        aria-labelledby="chargepoint-tab"
      >
        <div class="row py-0 m-0 d-flex justify-content-center">
          <ChargePointList>
          </ChargePointList>
        </div>
      </div>
      <div
        class="tab-pane"
        id="batterylist"
        role="tabpanel"
        aria-labelledby="battery-tab"
      >
        <div class="row py-0 m-0 d-flex justify-content-center">
          <BatteryList></BatteryList>
        </div>
      </div>
      <div
        class="tab-pane"
        id="smarthomelist"
        role="tabpanel"
        aria-labelledby="smarthome-tab"
      >
        <div class="row py-0 m-0 d-flex justify-content-center">
          <SmartHomeList></SmartHomeList>
        </div>
      </div>
      <div
        class="tab-pane"
        id="etPricing"
        role="tabpanel"
        aria-labelledby="pricechart-tab"
      >
        <div class="row py-0 m-0 d-flex justify-content-center">
          <PriceChart></PriceChart>
        </div>
      </div>
    </div>
  </div>
  <!-- Footer -->
  <div class="row p-2 mt-5">
    <div class="col p-2">
      <hr />
      <div class="d-flex justify-content-between">
      <p class="mx-4">Screen Width: {{ screensize.x }}</p>
      <button class="btn btn-sm btn-secondary mx-4" @click="toggleMqViewer">MQ Viewer</button>
      </div>
      <hr v-if="showMQ"/>
      <MQTTViewer v-if="showMQ"></MQTTViewer>
      </div>
    </div>
  
</template>

<script setup lang="ts">
import { ref, reactive, computed, onMounted, provide } from 'vue'
import { usageSummary, shDevices, globalData } from '../assets/js/model'
import { chargePoints } from './chargePointList/model'
import { etData } from './priceChart/model'
import { initConfig } from '@/assets/js/themeConfig'
import PowerMeter from './powerMeter/PowerMeter.vue'
import PowerGraph from './powerGraph/PowerGraph.vue'
import EnergyMeter from './energyMeter/EnergyMeter.vue'
import ChargePointList from './chargePointList/ChargePointList.vue'
import ButtonBar from './buttonBar/ButtonBar.vue'
import BatteryList from './batteryList/BatteryList.vue'
import PriceChart from './priceChart/PriceChart.vue'
import SmartHomeList from './smartHome/SmartHomeList.vue'
import { msgInit } from '@/assets/js/processMessages'
import MQTTViewer from './mqttViewer/MQTTViewer.vue'
import { globalConfig } from '@/assets/js/themeConfig'

// state
const screensize = reactive({
  x: document.documentElement.clientWidth,
  y: document.documentElement.clientHeight,
})
function updateDimensions() {
  screensize.x = document.documentElement.clientWidth
  screensize.y = document.documentElement.clientHeight
}
const usageDetails = computed(() => {
  return [usageSummary.evuOut]
    .concat(Object.values(chargePoints).map(cp => cp.toPowerItem()))
    .concat(
      Object.values(shDevices).filter(
        (row) => row.configured && row.showInGraph,
      ),
    )
    .concat([usageSummary.batIn, usageSummary.house])
})
const showMQ = ref(false)
// methods
function init() {
  initConfig()
}
function toggleMqViewer() {
  showMQ.value = !showMQ.value
}
// lifecycle
onMounted(() => {
  init()
  window.addEventListener('resize', updateDimensions)
  msgInit()
})
</script>

<style scoped>
.nav-tabs {
  border-bottom: 0.5px solid var(--color-menu);
  background-color: var(--color-bg);
}
.nav-tabs .nav-link {
  color: var(--color-menu);
  opacity: 0.5;
}
.nav-tabs .nav-link.disabled {
  color: var(--color-axis);
  border: 0.5px solid var(--color-axis);
}

.nav-tabs .nav-link.active {
  color: var(--color-fg);
  background-color: var(--color-bg);
  opacity: 1;
  border: .5px solid var(--color-menu);
  border-bottom: 0px solid var(--color-menu);
  box-shadow: 0 .5rem 1rem rgba(0,0,0,.15);
}
.fa-circle-info {
  color: var(--color-fg);
}
.fa-charging-station {
  color: var(--color-charging);
}
.fa-car-battery {
  color: var(--color-battery);
}
.fa-plug {
  color: var(--color-devices);
}
.fa-money-bill-1-wave {
  color: var(--color-pv);
}
</style>
