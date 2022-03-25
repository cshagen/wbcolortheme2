<template>
  <WBWidget>
    <template v-slot:title><span class="sh-title">Smart Home</span></template>
    <p class="ms-2">Smart Home ist noch nicht implementiert</p>
  </WBWidget>
</template>

<script setup lang="ts">
import WBWidget from '../shared/WBWidget.vue'
</script>

<style scoped>
.sh-title {
  color: var(--color-devices);
}
  </style>
