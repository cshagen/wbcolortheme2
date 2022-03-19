<template>
  <div id="app" class="m-0 p-0">
    <Navbar></Navbar>
    <div class="container-fluid p-0">
      <div class="row p-0 m-0">
        <div class="col-12 p-0 m-0"><ColorsTheme></ColorsTheme></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import ColorsTheme from './components/ColorsTheme.vue'
import Navbar from './components/Navbar.vue';
// import navbar from './components/navbar.vue'
</script>

<style>
@import './assets/css/style.css';
@import './assets/fonts/fontawesome-free-6.0.0-web/css/all.css';
</style>
