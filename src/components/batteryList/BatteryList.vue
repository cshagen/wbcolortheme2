/*
 * BatteryList.vue
 * colors theme for openwb 2.0
 * Copyright (c) 2022 Claus Hagen
 */

<template>
  <BLBattery v-for="battery in batteries" :bat="battery"> </BLBattery>
</template>

<script setup lang="ts">
import { batteries } from './model'
import BLBattery from './BLBattery.vue'
</script>

<style scoped>
.battery-color {
  color: var(--color-battery);
}
.fg-color {
  color: var(--color-fg);
}
.menu-color {
  color: var(--color-menu);
}
</style>
