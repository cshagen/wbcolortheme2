<template>
  <div class="row p-0 m-0">
    <bbSelectModal
     :chargepoint="cpToConfigure"
     :globalData="globalData"
     ></bbSelectModal>
    
    <div class="col p-0 m-0">
      <div class="container-fluid p-0 m-0 ">
        <div class="row p-0 m-0">
    <bbChargeButton
      v-for="(cp, index) in chargepointsToDisplay"
      :key="index"
      :chargepoint="cp"
      :globalData="globalData"
      @cpSelected="cpSelected"
    ></bbChargeButton>
        </div>
      </div>
    </div>
  
     
</div>
</template>

<script>
import { eventBus } from '@/main.js'
import bbChargeButton from './bbChargeButton.vue'
import bbSelectModal from './bbSelectModal.vue'
export default {
  name: "buttonBar",
  props: {
    chargepoints: [],
    globalData: Object
  },
  components: { 
    bbChargeButton,
    bbSelectModal,
     },
  data () {
    return {
      cpToConfigure : {}
    }
  },
  computed: {
    chargepointsToDisplay() {
      return Object.values(this.chargepoints).filter((cp) => cp.configured);
    },
  },
  methods: {
    cpSelected (cp) {
      eventBus.$emit('showChargeModal', cp)
    }
  }
};
</script>

<style>
</style>