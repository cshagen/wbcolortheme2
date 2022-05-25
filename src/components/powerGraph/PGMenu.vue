<template>
  <div>
    <button
      class="btn btn-outline-secondary btn-sm"
      id="graphChangeButton"
      @click="$emit('changeStackOrder')"
    >
      <span class="fa-solid fa-sort px-0"></span>
    </button>
    <button
      class="btn btn-outline-secondary btn-sm"
      :class="{ disabled: !showLeftButton }"
      id="graphLeftButton"
      @click="$emit('shiftLeft')"
    >
      <span class="fa-solid fa-chevron-circle-left px-0"></span>
    </button>
    <button
      class="btn btn-outline-secondary btn-sm"
      :class="{ disabled: !showRightButton }"
      id="graphRightButton"
      @click="$emit('shiftRight')"
    >
      <span class="fa-solid fa-chevron-circle-right px-0"></span>
    </button>
  </div>
</template>

<script setup lang="ts">
//import { computed } from 'vue'
const props = defineProps<{
  showLeftButton: boolean
  showRightButton: boolean
}>()
</script>

<style></style>
