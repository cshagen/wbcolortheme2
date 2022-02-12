<template>
<wbWidget>
    <template v-slot:title> Leistung/Ladestand heute </template>
    
        <figure id="powergraph" class="p-0 m-0">
      <svg :viewBox="'0 0 ' + width + ' ' + height">
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
    width : 500,
    height: 500,
    graphMode:'day',
    
    })
},

}
</script>

<style>

</style>