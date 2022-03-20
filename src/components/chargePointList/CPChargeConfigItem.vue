<template>
  <div class="row p-1 pt-2 d-flex align-items-center">
    <div class="col-4">
      {{ title }}
    </div>
    <div class="col-8">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title: string
}>()

</script>

<style></style>
