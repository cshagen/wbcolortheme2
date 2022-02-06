<template>
<wbWidget>
    <template v-slot:title> Leistung/Ladestand heute </template>
    
    <figure id="powergraph" class="m-0 p-0">
      <svg :viewBox="'0 0 500 500'">
      </svg>
    </figure>
</wbWidget>
</template>

<script>
import wbWidget from '../wbWidget.vue'
export default {
name: "powergraph",
components: {
  wbWidget
  },
  data () {
    return ({
    value : "123"
    })
},

}
</script>

<style>

</style>