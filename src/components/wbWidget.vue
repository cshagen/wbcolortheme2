<template>
  <div class="col-lg-4 p-1 m-0">
    <div class="wb-widget p-2 m-0 rounded">
      <div class="container-fluid p-0 m-0">
        <div class="row m-0 mb-1 p-0">
          <div class="col-9 m-0 p-0">
            <h3 class="mt-0">
              <slot name="title">
                      (title goes here)
                </slot>
              <slot name="subtitle"></slot>
            </h3>
          </div>
          <div class="col-3 m-0 p-0" style="text-align: right">
            <slot name="buttons"></slot>
          </div>
        </div>

        <div class="p-0 wb-subwidget">
          <div class="container-fluid m-0 p-0">
            <slot></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "wbWidget",
  props: {
    title: String,
  },
};
</script>

<style></style>
