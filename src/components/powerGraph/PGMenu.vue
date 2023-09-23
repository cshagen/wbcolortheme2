<template>
  <div class="d-flex flex-column graphsettings px-2 mb-2">
    <div class="d-flex justify-content-between">
      <div class="d-flex flex-column">
        <button class="btn badge rounded-pill graphmodebutton p-2 m-1 mt-2" @click="liveButtonClicked"
          :style="buttonStyle('live')">Live</button>
        <button class="btn badge rounded-pill graphmodebutton p-2 m-1" @click="dayButtonClicked"
          :style="buttonStyle('day')">Tag</button>
        <button class="btn badge rounded-pill graphmodebutton p-2 m-1" @click="todayButtonClicked"
          :style="buttonStyle('today')">Heute</button>
      </div>
      <div class="d-flex justify-content-center align-items-center mt-1">
        <button class="btn btn-outline-secondary btn-lg arrowButton" :class="{ disabled: !props.showLeftButton }"
          id="graphLeftButton" @click="$emit('shiftLeft')">
          <span class="fa-solid fa-xl fa-chevron-circle-left px-0"></span>
        </button>
        <DateInput :model-value="graphdate" :mode="graphData.graphMode"  @update:modelValue="setDate"></DateInput>
        <button class="btn btn-outline-secondary btn-lg arrowButton" :class="{ disabled: !props.showRightButton }"
          id="graphRightButton" @click="$emit('shiftRight')">
          <span class="fa-solid fa-xl fa-chevron-circle-right px-0"></span>
        </button>
      </div>
      <div class="d-flex flex-column">
        <button class="btn badge p-2 m-1 mt-2 rounded-pill graphmodebutton" @click="monthButtonClicked"
          :style="buttonStyle('month')">Monat</button>
        <button class="btn badge p-2 m-1 rounded-pill graphmodebutton" @click="yearButtonClicked"
          :style="buttonStyle('year')">Jahr</button>
        <button class="btn btn-sm align-self-end float-end m-1 mx-2 p-2 closebutton" data-bs-toggle="collapse"
          :data-bs-target="'#' + props.widgetid">
          <span class="fa-solid fa-xl ps-1 fa-circle-check"></span>
        </button>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DateInput from '../shared/DateInput.vue'
import { dayGraph, graphData, initGraph, setGraphDate } from './model'
import { monthGraph } from './model';

const props = defineProps<{
  showLeftButton: boolean
  showRightButton: boolean
  widgetid: string
}>()

const graphdate = computed(() => {
  switch (graphData.graphMode) {
    case 'live':
    case 'today':
      return dayGraph.getDate()
    case 'month':
      return monthGraph.getDate()
    default: return dayGraph.getDate()
  }
})
function setDate(v: Date) {
  setGraphDate(v)
}
function buttonStyle(kind: string) {
  if (graphData.graphMode == kind) {
    return {
      'background-color': 'var(--color-menu)',
      'color': 'var(--color-bg)'
    }
  } else {
    return {
      'background-color': 'var(--color-bg)',
      'color': 'var(--color-menu)',
    }
  }
}
function liveButtonClicked() {
  if (graphData.graphMode != 'live') {
    graphData.graphMode = 'live'
    initGraph()
  }
}

function dayButtonClicked() {
  if (graphData.graphMode != 'day' && graphData.graphMode != 'today') {
    graphData.graphMode = 'day'
    initGraph()
  }
}
function todayButtonClicked() {
  if (graphData.graphMode != 'today') {
    graphData.graphMode = 'today'
    setGraphDate(new Date())
  }
}
function monthButtonClicked() {
  if (graphData.graphMode != 'month') {
    graphData.graphMode = 'month'
    initGraph()
  }
}
function yearButtonClicked() {
  if (graphData.graphMode != 'year') {
    graphData.graphMode = 'year'
    initGraph()
  }
}


</script>

<style scoped>
.graphsettings {
  background: var(--color-bg);
  border: 1px solid var(--color-frame);
  border-radius: 10px;

}

.rounded-pill {
  background-color: var(--color-menu);
}

.arrowButton {
  border: 0;
}

.closebutton {
  background-color: var(--color-bg);
  color: var(--color-menu);
}

.graphmodebutton {
  border: 0.5px solid var(--color-menu);
  font-size: var(--font-small);
}
</style>
