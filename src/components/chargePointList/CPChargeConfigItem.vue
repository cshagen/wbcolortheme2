<template>
  <div class="row p-1 pt-2 d-flex align-items-center">
    <div class="col-4">
      <span @click="toggleInfo">{{ title }}</span>
    </div>
    <div class="col-8">
      
      <span class="d-flex justify-content-stretch">
        <span class="flex-fill"><slot></slot></span>
        <i
          class="fa-solid fa-circle-info ms-2"
          :style="iconstyle"
          @click="toggleInfo"
        ></i>
      </span>
      <p
        v-if="showInfo"
        @click="toggleInfo"
        class="infotext shadow m-0 ps-2 mb-1 p-1"
      >
        <i class="me-1 fa-solid fa-sm fa-circle-info"></i>
        {{ infotext }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  title: string
  infotext?: string
}>()
const showInfo = ref(false)
function toggleInfo() {
  showInfo.value = !showInfo.value
}
const iconstyle = computed(() => {
  let style = { color: 'var(--color-menu)' }
  if (showInfo.value) {
    style.color = 'var(--color-battery)'
  }
  return style
})
</script>

<style scoped>
.infotext {
  font-size: var(--font-small);
  color: var(--color-battery);
}
</style>
