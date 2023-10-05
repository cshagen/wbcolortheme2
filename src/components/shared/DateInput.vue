<template>
  <div v-if="!editMode" class="d-flex align-items-start align-self-top">
    <button class="btn btn-secondary d-flex align-self-top" @click="editMode = true">{{  formatDate(modelValue, props.mode) }} <span class="ms-2 fa-solid fa-caret-down"></span></button>
  </div>
    <span v-if="editMode" class="d-flex flex-column align-items-start">
      <span class="d-flex align-self-top">
        <select class="form-select" v-if="props.mode == 'day' || props.mode == 'today'" v-model="day" id="selectday">
          <option v-for="element in days" :value="element">
            {{ element }}
          </option>
        </select>
        <select class="form-select" v-if="props.mode !== 'year' && props.mode != 'live'" v-model="month" id="selectmonth">
          <option v-for="element in months" :value="element">
            {{ element }}
          </option>
        </select>
      </span>
      <span class="d-flex">
        <select class="form-select yearselector" v-if="props.mode != 'live'" v-model="_year" id="selectyear">
          <option v-for="element in years" :value="element">
            {{ element }}
          </option>

        </select>
        <button v-if="props.mode != 'live'" class="btn commitbutton" @click="updateDate"><span class="fa-solid fa-lg ps-1 fa-circle-check"></span></button>
        <span v-if="props.mode == 'live'">live</span>
      </span>
    </span>
  </template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { formatDate } from '@/assets/js/helpers'
import { graphData } from '../powerGraph/model';
const props = defineProps<{
  modelValue: Date,
  mode: string
}>()

const editMode = ref(false)

const emit = defineEmits(['update:modelValue'])

const days = Array.from({ length: 31 }, (_, i) => i + 1)
const months = Array.from({ length: 12 }, (_, i) => i + 1)
const years = Array.from({ length: 30 }, (_, i) => 2000 + i)

let _day = props.modelValue.getDate()
let _month = props.modelValue.getMonth()+1
let _year = props.modelValue.getFullYear()

const day = computed({
  get() {
    return props.modelValue.getDate()
  },
  set(value: number) {
    _day = value
  },
})
const month = computed({
  get() {
    return props.modelValue.getMonth()
  },
  set(value: number) {
    _month = value
  },
})
const year = computed({
  get() {
    return props.modelValue.getFullYear()
  },
  set(value: number) {
    _year = value
  },
})
function updateDate() {
  let d = new Date(_year, _month -1, _day)
  emit('update:modelValue', d)
  editMode.value = false
}
</script>

<style scoped>
.form-select {
  background-color: var(--color-input);
  border:1;
  border-color: var(--color-bg);
  color: var(--color-bg);
  text-align: start;
  font-size: var(--font-small);
}
.commitbutton {
  background-color: var(--color-bg);
  color: var(--color-input);
}


option {
  color: green;
}
</style>
