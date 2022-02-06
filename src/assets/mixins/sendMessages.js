import { eventBus } from '@/main.js'

export default {
  data() {
    return {
      topics : {
        chargeMode: 'openWB/set/vehicle/template/charge_template/%/chargemode/selected',
        cpLock: 'openWB/set/chargepoint/%/set/manual_lock',
        pvBatteryPriority: 'openWB/set/general/chargemode_config/pv_charging/bat_prio'
      }
  }
},
methods: {
  setupCallbacks () {
    eventBus.$on ('update', (item, value, index) => {
      let topic = this.topics[item]
      //if (index) {
        topic = topic.replace ('%', index)
      //}
      switch (value) {
        case true: this.publish (topic, "true")
        break
        case false:
          this.publish (topic, "false")
          break
        default:
          this.publish (topic, '"' + value + '"')
      }
    })
  },
  
  publish(topic, message) {
      const qos = 0;
      this.client.publish(topic, message, qos, (error) => {
        if (error) {
          console.warn("Publish error: ", error);
        }
        console.info("Message to " + topic + " sent: " + message);
      });
    },
},
mounted () {
  this.setupCallbacks()
}
}