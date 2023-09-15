<template>
    <div>
        <div class="btn-group" role="group" aria-label="radiobar">
      <button
        v-for="(element, index) in options"
        class="btn  btn-outline-secondary btn-sm radiobutton mx-0 mb-0 px-2"
        :id="'radio-' + element[1]"
        :value="element[1]"
        :style="getColor(index)"
        :class="element[1] == v ? 'active' : ''"
        @click="setValue"
      >
        <span :style="getColor(index)">
          <i v-if="element[3]" class="fa-solid" :class="element[3]"></i>
          {{ element[0] }}
        </span>
      </button>
      </div>
    </div>
    
  </template>
  
  <script setup lang="ts">
  import { computed } from 'vue'
  const props = defineProps<{
    options: [number | string, number | string, string?, string?, boolean?][] // name, object, color, icon, active
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
    let clr = (props.options[index][2]) ? props.options[index][2] : 'var(--color-fg'
    if (props.options[index][4]) {
      
      return { color: 'var(--color-bg)', background: clr }
    } else {
      return { color: clr }
    }
  }
  function setValue(event: Event) {
    let element = event.target as HTMLButtonElement
    while (element && !(element.value) && element.parentElement) { // we need to move up the DOM in case a sub element of the button was clicked 
      element = element.parentElement as HTMLButtonElement
    }
    if (element.value) {
      v.value = element.value
    }
  }
  </script>
  
  <style scoped>
  .radiobutton {
    border: 0px solid var(--color-menu);
    opacity: 1;
  }
  .btn-outline-secondary.active {
    background-color: var(--color-bg);
    border: 0px solid var(--color-fg);
    /* box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15); */
    opacity: 0.8;
  }
  .btn-group {
    border: 1px solid var(--color-menu);
  }
  </style>
  