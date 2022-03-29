<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import { msgInit } from "./processMessages";
import { topicTree } from './model'
import Node from './MqttNode.vue'

onMounted(() => {
  msgInit();
});

const expandAll = ref(false)
function toggle() {
  expandAll.value = !expandAll.value
}
const isActive = computed(() => {
  if (expandAll.value) {
    return 'active'
  } else {
    return ''
  }
}) 

</script>

<template>
    <div class="row">
      <div class="col">
        <h3>MQTT Message Viewer</h3>
    <hr/>
  <button
        class="btn btn-small btn-outline-primary"
        @click="toggle"
        :class="isActive"
      >Expand All</button> 
      <hr/> 
    </div>
    </div>
      
        <Node v-if="topicTree[0]" v-for="node in topicTree[0].children.sort((n1, n2) => (n1.name < n2.name) ? -1 : 1)" :node="node" :level="1" :hide=true :expandAll="expandAll"></Node>
      
  </template>

<style>
</style>
