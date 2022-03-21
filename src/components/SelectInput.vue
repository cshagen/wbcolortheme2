<template>
  <select class="form-select" v-model="v">
    <option v-for="element in options" :value="element[1]">
      {{ element[0] }}
    </option>
  </select>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  options: [number | string, number | string][]
  modelValue: number | string
}>()
const emit = defineEmits(['update:modelValue'])
const v = computed({
  get() {
    return props.modelValue
  },
  set(value: number | string) {
    emit('update:modelValue', value)
  },
})
</script>

<style scoped>
.form-select {
  background-color: var(--color-bg);
  color: var(--color-fg);
  border: 1px solid var(--color-menu    );
}
</style>
