<template>
<g id="pmLabel" v-if="showMe">
  <text :x="x" :y="y" :fill="color" :text-anchor = "anchor" :font-size="labelfontsize"  class="pmLabel">
      {{ text }} <FormatWatt :watt="data.power" v-if="data !== undefined"></FormatWatt>
  </text>
</g>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { PowerItem } from '@/assets/js/types'
import { formatWatt } from '@/assets/js/helpers'
import { globalConfig } from '@/assets/js/themeConfig'
import FormatWatt from '../shared/FormatWatt.vue'
  
  //props 
  const props = defineProps<{
      x: number
      y: number
      data?: PowerItem
      anchor: string
      labeltext?: string 
      labelcolor?: string 
  }>()

  //state
    const labelfontsize = 22
      
    // computed
      const power = computed (() => {
        return (props.data) ? formatWatt (props.data.power, globalConfig.decimalPlaces) : 0
      })
      const text = computed (() => {
        return (props.labeltext) ? props.labeltext : ((props.data) ? (props.data.name + ": ") : '')      
        })
      const color  = computed(() => {
        return (props.labelcolor) ? props.labelcolor : ((props.data) ? props.data.color : '')      
      })
      const showMe = computed (() => {
        return (!(props.data) || props.data.power > 0) 
      })
    

</script>

<style scoped>

</style>