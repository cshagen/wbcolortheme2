<template>
  <div class="p-1 m-0" :class="columnDefinition">
    <div class="wb-widget p-2 m-0 rounded">
            <div class="d-flex justify-content-between">
            <h3 class="mt-0">
              <slot name="title"> (title goes here) </slot>
              <slot name="subtitle"></slot>
            </h3>
          <div class="col-4 m-0 p-0" style="text-align: right">
            <slot name="buttons"></slot>
          </div>
      </div>
        <div class="p-0 wb-subwidget">
          <div class="row">
            <div class="col">
              <div class="container-fluid m-0 p-0">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
 const props = defineProps<{
  variableWidth?: boolean 
 }>()
const varWidth = ref((props.variableWidth != undefined) ? (props.variableWidth) : false)
const columnDefinition = computed(() => {
  if (varWidth.value) {
    return "col-lg"
  } else {
    return "col-lg-4"
  }
})
</script>

<style></style>
