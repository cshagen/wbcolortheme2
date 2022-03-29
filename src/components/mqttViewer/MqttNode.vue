<template>
  <div class="row p-0 mb-0 mx-0">
    <div
      class="col-md m-0 px-2"
      :style="leafStyle"
      style="font-size: 1rem; border: 1px solid white"
      @click="toggle"
    >
      <p class="py-2 m-0">{{ displaytext }}{{ counter }}</p>
      <hr v-if="showContent" />
      <p v-if="showContent" style="background-color: white" class="p-2">
        <code>{{ props.node.lastValue }}</code>
      </p>
    </div>
    <div
      class="col-md-9 m-0 p-0 ps-2"
      v-if="(expanded || props.expandAll) && childCount > 0"
    >
      <div class="container-fluid m-0 p-0">
        <MqttNode
          v-for="child in items"
          :level="props.level + 1"
          :node="child"
          :hide="true"
          :expandAll="props.expandAll"
        ></MqttNode>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import type { node } from './model'
const props = defineProps<{
  node: node
  level: number
  hide: boolean
  expandAll: boolean
}>()

let expanded = ref(!props.hide)
let showContent = ref(false)
const displaytext = computed(() => {
  return props.node.name
})
const items = computed(() => {
  return props.node.children.sort((n1, n2) => (n1.name < n2.name ? -1 : 1))
})
const counter = computed(() => {
  if (props.node.count > 0) {
    return '(' + props.node.count + ')'
  } else {
    return ''
  }
})

const leftclass = computed(() => {
  if (expanded.value) {
    return 'col-md-3 m-0 p-2'
  } else {
    return 'col-md m-0 p-2'
  }
})
const childCount = computed(() => {
  return props.node.children.length
})
const buttonText = computed(() => {
  if (expanded.value) {
    return '-'
  } else {
    return '+'
  }
})
const leafStyle = computed(() => {
  if (childCount.value == 0) {
    return { 'background-color': 'lightgoldenrodyellow' }
  } else {
    return { 'background-color': 'lightsteelblue' }
  }
})

function toggle() {
  if (childCount.value > 0) {
    expanded.value = !expanded.value
  } else {
    showContent.value = !showContent.value
  }
}
</script>

<style scoped></style>
