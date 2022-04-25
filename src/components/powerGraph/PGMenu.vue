<template>
  <div>
    <button class="btn btn-outline-secondary btn-sm" id="graphChangeButton" @click="$emit('changeStackOrder')">
      <span class="fa-solid fa-sort px-0"></span>
    </button>
    <button class="btn btn-outline-secondary btn-sm" id="graphLeftButton">
      <span class="fa-solid fa-chevron-circle-left px-0"></span>
    </button>
    <button class="btn btn-outline-secondary btn-sm" id="graphRightButton">
      <span class="fa-solid fa-chevron-circle-right px-0"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
//import { computed } from 'vue'
</script>

<style>
</style>