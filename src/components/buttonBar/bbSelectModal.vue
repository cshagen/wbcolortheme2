<template>
  <div class="modal fade" id="chargeModal">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">Lademodus für Ladepunkt {{ cp.name }}</h3>

          <button
            type="button"
            class="btn-close buttonTextSize"
            data-bs-dismiss="modal"
          ></button>
        </div>
        <div class="modal-body" style="background-color: var(--color-bg);">
          <div class="container-fluid p-0 m-0">
            <div class="row p-0 m-0">
              <div v-for="(bt, id) in buttons" :key="id" class="col-md-4 p-1">
                <div class="d-grid gap-2">
                  <button
                    type="button"
                    :class="buttonClass(bt.mode)"
                    :style="{}"
                    @click="selectChargeMode(bt.mode)"
                  >
                    {{ bt.name }}
                  </button>
                </div>
              </div>
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
            <div v-if="globalData.isBatteryConfigured && cp.chargeMode=='pv_charging'"
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
                  EV <span class="fas fa-car">&nbsp;</span>
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
                  Speicher <span class="fas fa-car-battery">&nbsp;</span>
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

<script>
import { eventBus } from "@/main.js";
import { Modal } from "bootstrap";
export default {
  name: "bbSelectModal",
  props: {
    chargepoint: Object,
    globalData: Object,
    vehicles: Array
  },
  data() {
    return {
      buttons: [
        {
          mode: "instant_charging",
          name: "Sofort",
          color: "var(--color-charging",
        },
        { mode: "pv_charging", name: "PV", color: "var(--color-pv" },
        {
          mode: "scheduled_charging",
          name: "Zielladen",
          color: "var(--color-battery",
        },
        { mode: "standby", name: "Standby", color: "var(--color-axis" },
        { mode: "stop", name: "Stop", color: "var(--color-axis" },
      ],
      cp: this.chargepoint,
      // currentChargemode: this.cp ? this.cp.chargeMode : "",
      modal: Object,
    };
  },
  methods: {
    selectChargeMode(mode) {
      eventBus.$emit ('update', 'chargeMode', mode, this.cp.chargeTemplate)
      this.modal.hide();
    },
    lockCP(value) {
      console.log (value)
      this.cp.isLocked = value
      eventBus.$emit ('update', 'cpLock', value, this.cp.cpId)
      this.modal.hide()
    },
    buttonClass(chargemode) {
      if (chargemode == this.cp.chargeMode) {
        return "btn btn-success buttonTextSize";
      } else {
        return "btn btn-secondary buttonTextSize";
      }
    },
    priorityButtonClass(m) {
      switch(m) {
        case 'ev':
          return (this.globalData.pvBatteryPriority) ? 'btn-secondary' : 'btn-success' 
        case 'bat':
          return (this.globalData.pvBatteryPriority) ? 'btn-success' : 'btn-secondary' 
        default: 
          return ""
      }
    },
    setBatteryPriority (flag) {
        this.globalData.pvBatteryPriority = flag
        eventBus.$emit ('update', 'pvBatteryPriority', flag)
        this.modal.hide()
    }
  },
  mounted() {
    let target = document.getElementById("chargeModal");
    this.modal = new Modal(target, {});
    eventBus.$on("showChargeModal", (cp) => {
      this.cp = cp;
      this.currentChargemode = cp.mode;
      this.modal.show();
    });
  },
};
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
  text-align:right;
}
</style>>

