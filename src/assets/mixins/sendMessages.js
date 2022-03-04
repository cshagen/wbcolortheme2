import { eventBus } from '@/main.js'

export default {
  data() {
    return {
      topics: {
        cpLock: 'openWB/set/chargepoint/%/set/manual_lock',
        chargeMode: 'openWB/set/vehicle/template/charge_template/%/chargemode/selected',
        pvBatteryPriority: 'openWB/set/general/chargemode_config/pv_charging/bat_prio',
        cpVehicle: 'openWB/set/chargepoint/%/config/ev',
        cpPriority: 'openWB/set/vehicle/template/charge_template/%/prio',
        scheduledCharging: 'openWB/set/vehicle/template/charge_template/%/time_charging/active',
        instantChargeLimit: 'openWB/set/vehicle/template/charge_template/%/chargemode/instant_charging/limit/selected',
        instantTargetCurrent: 'openWB/set/vehicle/template/charge_template/%/chargemode/instant_charging/current',
        instantTargetSoc: 'openWB/set/vehicle/template/charge_template/%/chargemode/instant_charging/limit/soc',
        instantMaxEnergy: 'openWB/set/vehicle/template/charge_template/%/chargemode/instant_charging/limit/amount',
        pvFeedInLimit: 'openWB/set/vehicle/template/charge_template/%/chargemode/pv_charging/feed_in_limit',
        pvMinCurrent: 'openWB/set/vehicle/template/charge_template/%/chargemode/pv_charging/min_current',
        pvMaxSoc: 'openWB/set/vehicle/template/charge_template/%/chargemode/pv_charging/max_soc',
        pvMinSoc: 'openWB/set/vehicle/template/charge_template/%/chargemode/pv_charging/min_soc',
        pvMinSocCurrent: 'openWB/set/vehicle/template/charge_template/%/chargemode/pv_charging/min_soc_current',
      }
    }
  },
  methods: {
    setupCallbacks() {
      eventBus.$on('update', (item, value, index) => {
        var topic = this.topics[item]
        if (isNaN(index)) {
          console.warn("Invalid index")
          return
        }
        if (topic) {
          topic = topic.replace('%', index)
          this.publish(topic, JSON.stringify(value))
        } else {
          console.warn('No topic for update type ' + item)
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


  },
  mounted() {
    this.setupCallbacks()
  }
}