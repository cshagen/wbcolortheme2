<template>
  <BLBattery v-for="battery in batteries" :bat="battery" :variableWidth="variableWidth"> </BLBattery>
</template>

<script setup lang="ts">
import { batteries } from './model'
import BLBattery from './BLBattery.vue'

const props = defineProps<{
  variableWidth: boolean
}>()
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
