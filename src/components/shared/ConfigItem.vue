<template>
  <div class="row ms-1 p-0 pt-2 d-flex align-items-center">
    <div class="col-4 titlecolumn m-0 p-0">
      <span @click="toggleInfo" class="d-flex align-items-baseline m-0 p-0">
        <i
          v-if="icon"
          class="fa-solid fa-sm m-0 p-0 me-2 item-icon"
          :class="icon"
        ></i>
        {{ title }}</span
      >
    </div>
    <div class="col me-1 p-0 ps-4">
      <span class="d-flex justify-content-stretch align-items-center">
        <span class="flex-fill"><slot></slot></span>
        <span>
          <i
            class="fa-solid fa-sm fa-circle-question ms-4 me-2"
            :style="iconstyle"
            @click="toggleInfo"
            v-if="infotext"
          ></i>
        </span>
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
  color: var(--color-menu);
}
.titlecolumn {
  color: var(--color-fg);
}

</style>
