<template>
  <div class="row p-1 pt-2 d-flex align-items-center">
    <div class="col-4">
      <span @click="toggleInfo">
        <i v-if="icon" class="fa-solid fa-sm me-1 item-icon" :class="icon"></i>
        {{ title }}</span
      >
    </div>
    <div class="col-8">
      <span class="d-flex justify-content-stretch align-items-center">
        <span class="flex-fill"><slot></slot></span>
        <i
          class="fa-solid fa-sm fa-circle-question ms-2"
          :style="iconstyle"
          @click="toggleInfo"
          v-if="infotext"
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
  icon?: string
}>()
const showInfo = ref(false)
function toggleInfo() {
  showInfo.value = !showInfo.value
}
const iconstyle = computed(() => {
  let style = { color: 'var(--color-charging)' }
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


.item-icon {
  color: var(--color-menu);;
}
</style>
