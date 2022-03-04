import { eventBus } from '@/main.js'

export default {
  data() {
    return {
      topics : {
        cpLock: 'openWB/set/chargepoint/%/set/manual_lock',
        chargeMode: 'openWB/set/vehicle/template/charge_template/%/chargemode/selected',
        pvBatteryPriority: 'openWB/set/general/chargemode_config/pv_charging/bat_prio',
   //     chargeTemplate: 'openWB/set/vehicle/template/charge_template/%',
        cpVehicle: 'openWB/set/chargepoint/%/config/ev',
        instantChargeLimit: 'openWB/set/vehicle/template/charge_template/%/chargemode/instant_charging/limit/selected',
        targetCurrent: 'openWB/set/vehicle/template/charge_template/%/chargemode/instant_charging/current',
        maxSoc: 'openWB/set/vehicle/template/charge_template/%/chargemode/instant_charging/soc',
      }
  }
},
methods: {
  setupCallbacks () {
    eventBus.$on ('update', (item, value, index) => {
      switch (item) {
        case 'chargeMode': this.setChargeMode (value, +index) 
          break
        
        default:
            var topic = this.topics[item]
            if (isNaN(index)) {
              console.warn ("Invalid index")
              return
            }
            if (topic) {
              topic = topic.replace ('%', index)
              this.publish (topic, JSON.stringify(value))
            } else {
              console.warn ('No topic for update type ' + item)
          }
        }
      })
    
    
  },
    publish(topic, message) {
      const qos = 0;
      this.client.publish(topic, message, qos, (error) => {
        if (error) {
          console.warn("Publish error: ", error);
        }
        console.info("Message sent: [" + topic + "](" + message + ')');
      });
    },
  setChargeMode (value, cpId) {
    let templateId = this.chargePoints[cpId].chargeTemplate
    let topic = this.topics.chargeMode.replace('%', templateId)
    
    console.log (topic)
    this.publish (topic, JSON.stringify(value))
  },
  
},
mounted () {
  this.setupCallbacks()
}
}