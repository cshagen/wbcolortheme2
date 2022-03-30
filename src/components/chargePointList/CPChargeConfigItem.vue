<template>
  <div class="row p-1 pt-2 d-flex align-items-center">
    <div class="col-4">
      <i class="fa-solid fa-circle-info me-1" 
      data-bs-toggle="popover" 
      title="Erklärung" 
      :data-bs-content="tooltip"
      data-bs-placement="top"
      
      ></i>
      {{ title }}
    </div>
    <div class="col-8">
      <slot></slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Popover } from 'bootstrap';
import { onMounted } from 'vue';

const props = defineProps<{
  title: string
  tooltip?: string
}>()
onMounted(()=> {
  var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
  var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new Popover(popoverTriggerEl)
})
})
</script>

<style scoped>
.fa-circle-info {
  color: var(--color-menu);
}
</style>
