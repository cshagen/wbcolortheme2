<template>
  <div class="container-fluid p-0 m-0">
    <CPChargeConfigItem title="Beginn">
      <TimeInput v-model="plan.time[0]"> </TimeInput>
    </CPChargeConfigItem>

    <CPChargeConfigItem title="Ende">
      <TimeInput v-model="plan.time[1]"> </TimeInput>
    </CPChargeConfigItem>
    <CPChargeConfigItem title="Ladestrom">
      <RangeInput
        id="current"
        :min="6"
        :max="32"
        :step="1"
        unit="A"
        v-model="plan.current"
      ></RangeInput>
    </CPChargeConfigItem>
    <CPChargeConfigItem title="Wiederholungen">
      <SelectInput
        :options="frequencies"
        v-model="plan.frequency.selected"
      ></SelectInput>
    </CPChargeConfigItem>
    <CPChargeConfigItem
      v-if="plan.frequency.selected == 'once'"
      title="Gültig ab"
    >
      <DateInput v-model="plan.frequency.once[0]"> </DateInput>
    </CPChargeConfigItem>
    <CPChargeConfigItem
      v-if="plan.frequency.selected == 'once'"
      title="Gültig bis"
    >
      <DateInput v-model="plan.frequency.once[1]"> </DateInput>
    </CPChargeConfigItem>
    <CPChargeConfigItem
      v-if="plan.frequency.selected == 'weekly'"
      title="Wochentage"
    >
      <CheckBoxInput
        :options="days"
        v-model="plan.frequency.weekly"
      ></CheckBoxInput>
    </CPChargeConfigItem>
    <div class="row">
      <div class="col d-flex justify-content-end">
        <button
          class="btn btn-danger"
          @click="$emit('deletePlan', planId)"
          data-bs-dismiss="modal"
        >
          Löschen
        </button>
        <button
          class="btn btn-warning"
          @click="$emit('abort')"
          data-bs-dismiss="modal"
        >
          Abbrechen
        </button>
        <button
          class="btn btn-success float-end"
          @click="$emit('savePlan', planId)"
          data-bs-dismiss="modal"
        >
          Speichern
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { chargeTemplates } from './model'
import CPChargeConfigItem from './CPChargeConfigItem.vue'
import RangeInput from '@/components/shared/RangeInput.vue'
import SelectInput from '@/components/shared/SelectInput.vue'
import CheckBoxInput from '@/components/shared/CheckBoxInput.vue'
import TimeInput from '@/components/shared/TimeInput.vue'
import DateInput from '@/components/shared/DateInput.vue'
const props = defineProps<{
  chargeTemplateId: number
  planId: string
}>()
const emit = defineEmits(['deletePlan', 'abort', 'savePlan'])

const frequencies: [string | number, string | number][] = [
  ['Einmalig', 'once'],
  ['Täglich', 'daily'],
  ['Wöchentlich', 'weekly'],
]
const days = [
  'Montag',
  'Dienstag',
  'Mittwoch',
  'Donnerstag',
  'Freitag',
  'Samstag',
  'Sonntag',
]
const template = computed(() => {
  console.dir(chargeTemplates)
  return chargeTemplates[props.chargeTemplateId]
})
const plan = computed(() => {
  console.dir(template.value)
  return template.value.time_charging.plans[props.planId] 
   
})
</script>

<style scoped>
.time-input {
  background-color: var(--color-bg);
  color: var(--color-fg);
  border: 1px solid var(--color-menu);
}
</style>
