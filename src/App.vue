<template>

  <div id="app" class="m-0 p-0">
<navbar></navbar>
<div class="container-fluid">    
      <div class="row p-0 m-0">
        <div class="col-12 p-0 m-0">
          <theme></theme>
        </div>
      </div>
    </div>
  </div>
  </template>

<script>
import theme from "./components/theme.vue";
import navbar from './components/navbar.vue'
export default {
  name: "App",

  components: {
    theme,
    navbar
  },
};
</script>

<style>
@import "./assets/css/style.css";
@import "./assets/fonts/fontawesome-free-5.15.4-web/css/all.css";
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-top: 60px;
}
</style>
