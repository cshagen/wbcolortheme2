<template>
<g id="pmLabel" v-if="showMe">
  <text :x="x" :y="y" :fill="color" :text-anchor = "anchor" :font-size="labelfontsize"  class="pmLabel">
      {{ text }}
  </text>
</g>
</template>

<script>
import { formatWatt } from '@/assets/js/helpers.js'
export default {
    name: "pmLabel",
    props: {
      x: Number,
      y: Number,
      data: {},
      anchor: String,
      labeltext: {
        type: String, 
        default: ""
      },
      labelcolor: {
        type: String,  // optional
        default: ""
      },
      config: Object
    },
    data () {
      return {
        labelfontsize : 22
      }
    },
    computed: {
      power () {
        return (this.data) ? formatWatt (this.data.power, this.config.decimalPlaces) : 0
      },
      text () {
        return this.labeltext != "" ? this.labeltext : (this.data.name + ": " + this.power)
      },
      color () {
        return this.labelcolor != "" ? this.labelcolor : this.data.color
      },
      showMe () {
        return (!(this.data) || this.data.power > 0) 
      }
    }
}
</script>

<style scoped>

</style>