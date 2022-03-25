<template>
  <div class="pt-2">
    <p class="heading ms-1">Zeitpläne:</p>
    <table class="table table-borderless">
      <thead>
        <tr>
          <th class="tableheader left">Von</th>
          <th class="tableheader">Bis</th>
          <th class="tableheader">Ladestrom</th>
          <th class="tableheader right">Wiederholung</th>
          <th class="tableheader"></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="key in Object.keys(plans)">
          <td class="tablecell left">{{ plans[key].time[0] }}</td>
          <td class="tablecell">{{ plans[key].time[1] }}</td>
          <td class="tablecell">{{ plans[key].current }} A</td>
          <td class="tablecell right">
            {{ freqNames[plans[key].frequency.selected] }}
          </td>
          <td>
            <span
              class="editButton"
              data-bs-toggle="modal"
              :data-bs-target="'#' + modalId"
              @click="setPlanToEdit(key)"
            >
              <i class="fas fa-lg fa-pen ms-2"></i>
            </span>
          </td>
        </tr>
        <tr>
          <td></td>
          <td></td>
          <td></td>
          <td></td>
          <td>
            <span
              class="addButton"
              @click="addPlan"
              data-bs-toggle="modal"
              :data-bs-target="'#' + modalId"
            >
              <i class="fa-solid fa-xl fa-square-plus ms-2"></i>
            </span>
          </td>
        </tr>
      </tbody>
    </table>
    <ModalComponent v-if="Object.keys(plans).length > 0" :modalId="modalId">
      <template v-slot:title> Zeitplan bearbeiten </template>
      <CPEditTimeplan
        v-if="Object.keys(plans).length > 0"
        :chargeTemplateId ="chargeTemplateId"
        :planId="planIdToEdit"
        @savePlan="savePlan"
        @deletePlan="deletePlan"
        @abort="abortEdit"
      ></CPEditTimeplan>
    </ModalComponent>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue'
import { Modal } from 'bootstrap'
import type { ChargeTemplate, ChargeTimePlan } from './model'
import { createChargeTimePlan } from './model'
import ModalComponent from '@/components/shared/ModalComponent.vue'
import CPEditTimeplan from './CPEditTimeplan.vue'
import { updateChargeTemplate } from '@/assets/js/sendMessages'

const freqNames : {[key:string]:string} = {
  'daily': 'Täglich',
  'once': 'Einmal',
  'weekly': 'Wöchentlich'
}
const props = defineProps<{
  chargeTemplate: ChargeTemplate
  chargeTemplateId: number
}>()

const modalId = 'timesettingmodal' + props.chargeTemplateId
const planIdToEdit = (Object.keys(props.chargeTemplate.time_charging.plans).length >0) ? ref(Object.keys(props.chargeTemplate.time_charging.plans)[0]) : ref('0')

function setPlanToEdit(key: string) {
  console.log('CLICK')
  planIdToEdit.value = key
}
function savePlansToServer(id: string) {
  updateChargeTemplate(props.chargeTemplateId)
}
function savePlan(id: string) {
  savePlansToServer(id)
}
function abortEdit() {
  console.log('abort')
 }
function deletePlan(id: string) {
  console.log('delete')
  delete props.chargeTemplate.time_charging.plans[id]
  savePlansToServer(id)
}
function addPlan() {
  let p: ChargeTimePlan = createChargeTimePlan()
  if (!(props.chargeTemplate.time_charging.plans)) {
    props.chargeTemplate.time_charging.plans={}
  }
  let max = 0
  Object.keys(plans).forEach((k) => {
    if (+k > max) {
      max = +k
    }
  })
  max = max + 1
  props.chargeTemplate.time_charging.plans[max.toString()] = p
  planIdToEdit.value = max.toString()
}
const plans = computed(() => {
  console.dir(props.chargeTemplate)
  console.dir(props.chargeTemplate.time_charging.plans)
  let result = props.chargeTemplate.time_charging.plans
  return (result)? result : {}
  })
</script>

<style scoped>
.tablecell {
  color: var(--color-fg);
  text-align: center;
}
.tableheader {
  color: var(--color-menu);
  text-align: center;
}
.heading {
  color: var(--color-battery);
}
.editButton {
  color: var(--color-menu);
}
.addButton {
  color: var(--color-menu);
}
.left {
  text-align: left;
}
.right {
  text-align: right;
}
</style>
