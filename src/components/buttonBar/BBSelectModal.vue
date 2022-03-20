<template>
  <div class="modal" :id="modalId">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Lademodus für Ladepunkt {{ cp.name }}</h3>

          <button
            type="button"
            class="btn-close buttonTextSize d-flex justify-content-center pt-3 pb-0"
            data-bs-dismiss="modal"
          >
            <i class="fa-solid fa-lg fa-rectangle-xmark m-0 p-0"></i>
          </button>
        </div>
        <div class="modal-body" style="background-color: var(--color-bg)">
          <div class="container-fluid p-0 m-0">
            <div class="row p-0 m-0">
              <div v-for="(bt, id) in buttons" :key="id" class="col-md-4 p-1">
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    :class="buttonClass(bt.mode as ChargeMode)"
                    :style="{}"
                    @click="selectChargeMode(bt.mode as ChargeMode)"
                  >
                    {{ bt.name }}
                  </button>
                </div>
              </div>
              <!-- Lock buttons -->
              <div class="col-md-4 p-1">
                <div class="d-grid gap-2">
                  <button
                    v-if="cp.isLocked"
                    type="button"
                    class="btn btn-outline-success buttonTextSize"
                    @click="lockCP(false)"
                  >
                    Entsperren
                  </button>
                  <button
                    v-if="!cp.isLocked"
                    type="button"
                    class="btn btn-outline-danger buttonTextSize"
                    @click="lockCP(true)"
                  >
                    Sperren
                  </button>
                </div>
              </div>
            </div>
            <!-- Battery priority settings -->
            <div
              v-if="
                globalData.isBatteryConfigured && cp.chargeMode == 'pv_charging'
              "
            >
              <hr />
              <div class="row">
                <div class="col text-center">
                  Vorrang im Lademodus PV-Laden:
                </div>
              </div>
              <div class="row justify-content-center m-1 p-0">
                <div class="col-6 p-1 m-0">
                  <div class="d-grid gap-2">
                    <button
                      id="evPriorityBtn"
                      type="button"
                      class="priorityModeBtn btn btn-secondary buttonTextSize"
                      :class="priorityButtonClass('ev')"
                      @click="setBatteryPriority(false)"
                      data-dismiss="modal"
                      priority="1"
                    >
                      EV
                      <span class="fas fa-car">&nbsp;</span>
                    </button>
                  </div>
                </div>
                <div class="col-6 p-1 m-0">
                  <div class="d-grid gap-2">
                    <button
                      id="batteryPriorityBtn"
                      type="button"
                      class="priorityModeBtn btn btn-secondary buttonTextSize"
                      :class="priorityButtonClass('bat')"
                      @click="setBatteryPriority(true)"
                      data-dismiss="modal"
                      priority="0"
                    >
                      Speicher
                      <span class="fas fa-car-battery">&nbsp;</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-success buttonTextSize"
              data-bs-dismiss="modal"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { Modal } from 'bootstrap'
import { globalData } from '@/assets/js/model'
import type { ChargeMode } from '../chargePointList/model'
import { chargePoints } from '@/components/chargePointList/model'

const props = defineProps<{
  cpId: number
  modalId: string
}>()

// state
const buttons = [
  {
    mode: 'instant_charging',
    name: 'Sofort',
    color: 'var(--color-charging)',
  },
  { mode: 'pv_charging', name: 'PV', color: 'var(--color-pv)' },
  {
    mode: 'scheduled_charging',
    name: 'Zielladen',
    color: 'var(--color-battery)',
  },
  { mode: 'standby', name: 'Standby', color: 'var(--color-axis)' },
  { mode: 'stop', name: 'Stop', color: 'var(--color-axis)' },
]
let target = document.getElementById('chargeModal' + props.cpId)
var mod: Modal
if (target) {
  mod = new Modal(target)
}

const cp = computed(() => {
  return chargePoints[props.cpId]
})

// methods

function buttonClass(chargemode: ChargeMode) {
  if (chargemode == cp.value.chargeMode) {
    return 'btn btn-success buttonTextSize'
  } else {
    return 'btn btn-secondary buttonTextSize'
  }
}

function priorityButtonClass(m: string) {
  switch (m) {
    case 'ev':
      return globalData.pvBatteryPriority ? 'btn-secondary' : 'btn-success'
    case 'bat':
      return globalData.pvBatteryPriority ? 'btn-success' : 'btn-secondary'
    default:
      return ''
  }
}
function selectChargeMode(mode: ChargeMode) {
  cp.value.chargeMode = mode
}
function lockCP(flag: boolean) {
  cp.value.isLocked = flag
  mod.hide()
}
function setBatteryPriority(flag: boolean) {
  globalData.pvBatteryPriority = flag
}

// lifecycle
onMounted(() => {
  let target = document.getElementById(props.modalId)
  if (target) {
    mod = new Modal(target, {})
  }
})
</script>

<style scoped>
.modal-footer,
.modal-header,
.modal-body {
  background: var(--color-bg);
}
.btn-close {
  color: var(--color-fg);
}
.modal-footer {
  text-align: right;
}
.modal-header .btn-close {
  color: var(--color-fg);
  background: var(--color-bg);
  border: 0px;
}
</style>
>
