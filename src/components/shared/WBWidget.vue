<template>
  <div class="col-lg-4 p-1 m-0 d-flex">
    <div class="wb-widget p-2 m-0 rounded shadow">
            <div class="d-flex justify-content-between">
            <h3 class="mt-0">
              <slot name="title"> (title goes here) </slot>
              <slot name="subtitle"></slot>
            </h3>
          <div class="col-4 m-0 p-0" style="text-align: right">
            <slot name="buttons"></slot>
          </div>
      </div>
        <div class="p-0 wb-subwidget">
          <div class="row">
            <div class="col">
              <div class="container-fluid m-0 p-0">
                <slot></slot>
              </div>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.wb-widget {
  width: 100%;
}
</style>
