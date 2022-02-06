<template>
  <div class="row p-1">
      <div class="col-4">
          {{ title }}
        </div>
    <div class="col-8">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'cpChargeConfigItem',
  props: {
    title: String,
  }
}
</script>

<style>

</style>