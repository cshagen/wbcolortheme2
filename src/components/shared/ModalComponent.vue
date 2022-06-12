<template>
  <div class="modal fade" :id="modalId">
    <div class="modal-dialog modal-lg modal-fullscreen-lg-down">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title">
            <slot name="title"></slot>
          </h3>
          <button
            type="button"
            class="btn-close buttonTextSize d-flex justify-content-center pt-3 pb-0"
            data-bs-dismiss="modal"
          >
            <i class="fa-solid fa-lg fa-rectangle-xmark m-0 p-0"></i>
          </button>
        </div>
        <div class="modal-body" style="background-color: var(--color-bg)">
          <slot></slot>
          <button
          class="btn btn-secondary float-end mt-3 ms-1"
          data-bs-dismiss="modal"
        >
          Schließen
        </button>
          
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { onMounted } from 'vue'
import { Modal } from 'bootstrap'

const props = defineProps<{
  modalId: string
}>()
// state
let target = document.getElementById(props.modalId)
var mod: Modal
if (target) {
  mod = new Modal(target)
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
