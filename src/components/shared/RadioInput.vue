<template>
  <div class="form-check" v-for="(element,index) in options">
  <input class="form-check-input"   type="radio" :id="'radio-' + element[1]" :value="element[1]" v-model="v">
  <label class="form-check-label" :for="'radio' + element[1]">
  
       <span :style="getColor(index)"> 
       <i class="fa-solid" :class="getIcon(index)"></i>
       {{ element[0] }}
       </span> 
    </label>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
const props = defineProps<{
  options: [number | string, number | string, string?, string?][]
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
function getColor(index: number) {
  if (props.options[index][2]) {
    return {color: props.options[index][2]}
  } else {
    return {color: 'var(--color-fg)'}
  }
}
function getIcon(index: number) {
  if (props.options[index][3]) {
    return props.options[index][3]
  } else {
    return ''
  }
}
</script>

<style scoped>
.form-select {
  background-color: var(--color-input);
  color: black;
  border: 1px solid var(--color-bg);
}
</style>
