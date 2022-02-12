import mqtt from "mqtt";

export default {
  data() {
    return {
      mqttConnection: {
        host: location.hostname,
        port: 9001,
        endpoint: "/",
        clean: true,
        connectTimeout: 4000,
        reconnectPeriod: 4000,
        clientId: Math.random()
          .toString(36)
          .replace(/[^a-z]+/g, "")
          .substring(0, 6),
        username: "openWB",
        password: "openWB",
      },
      subscription: {
        topic: "",
        qos: 0,
      },
      client: {
        connected: false,
      },
      evuId: 0,
    };
  },
  methods: {
    connect(callback, topiclist) {
      const { host, port, endpoint, ...options } = this.mqttConnection;
      const connectUrl = `ws://${host}:${port}${endpoint}`;
      try {
        this.client = mqtt.connect(connectUrl, options);
      } catch (error) {
        console.error("mqtt connect error ", error);
      }
      this.client.on("connect", () => {
        console.info("MQTT connection successful");
        topiclist.forEach((topic) => {
          this.subscribe(topic);
        });
      });
      this.client.on("error", (error) => {
        console.log("MQTT connection failed", error);
      });
      this.client.on("message", callback);
    },
    subscribe(toTopic) {
      // console.log("SUBSCRIBE TO " + toTopic)
      this.subscription.topic = toTopic;
      const { topic, qos } = this.subscription;
      this.client.subscribe(topic, { qos }, (error, res) => {
        if (error) {
          console.error("MQTT Subscription error: " + error);
          return;
        }
        // this.subscriptionSuccess = true
        console.info("MQTT Subscription successful: ", res);
      });
    },
    
    processMqttMessage(topic, message) {
      if (topic.match(/^openwb\/counter\/[0-9]+\//i)) {
        this.processCounterMessages(topic, message);
      } else if (topic.match(/^openwb\/counter\//i)) {
        this.processGlobalCounterMessages(topic, message);
      } else if (topic.match(/^openwb\/bat\//i)) {
        this.processBatteryMessages(topic, message);
      } else if (topic.match(/^openwb\/pv\//i)) {
        this.processPvMessages(topic, message);
      } else if (topic.match(/^openwb\/chargepoint\//i)) {
        this.processChargepointMessages(topic, message);
      } else if (topic.match(/^openwb\/vehicle\//i)) {
        this.processVehicleMessages(topic, message);
      } else if (
        topic.match(/^openwb\/general\/chargemode_config\/pv_charging\//i)
      ) {
        this.processPvConfigMessages(topic, message);
      } else if (topic.match(/^openwb\/graph\//i)) {
        this.processGraphMessages(topic, message);
      } else if (topic.match(/^openwb\/optional\/et\//i)) {
        this.processETProviderMessages(topic, message);
      }
      // else if ( mqttTopic.match( /^openwb\/global\//i) ) { processGlobalMessages(mqttTopic, message); }
      // else if ( mqttTopic.match( /^openwb\/system\//i) ) { processSystemMessages(mqttTopic, message); }
      // else if ( mqttTopic.match( /^openwb\/verbraucher\//i) ) { processVerbraucherMessages(mqttTopic, message); }
      // else if ( mqttTopic.match( /^openwb\/hook\//i) ) { processHookMessages(mqttTopic, message); }
      // else if ( mqttTopic.match( /^openwb\/SmartHome\/Devices\//i) ) { processSmartHomeDevicesMessages(mqttTopic, message); }
      // else if ( mqttTopic.match( /^openwb\/config\/get\/SmartHome\/Devices\//i) ) { processSmartHomeDevicesConfigMessages(mqttTopic, message); }
      // else if ( mqttTopic.match( /^openwb\/config\/get\/sofort\/lp\//i) ) { processSofortConfigMessages(mqttTopic, message); }
      else {
        console.error("UNCAUGHT MESSAGE [" + topic + "] " + message);
      }
    },
    processCounterMessages(topic, message) {
      let elements = topic.split("/");
      if (+elements[2] == this.evuId) {
        // console.debug("evu counter message received");
        this.processEvuMessages(topic, message);
      } else if (elements[3] == "config") {
        console.debug("config for counter " + elements[2]);
      } else {
        //let index = elements[2]
        switch (elements[4]) {
          case "power":
          case "config":
          case "fault_str":
          case "fault_state":
          case "power_factors":
          case "imported":
          case "exported":
          case "frequency":
          case "daily_yield_import":
          case "daily_yield_export":
            break;
          default:
            console.warn("UNPROCESSED COUNTER MESSAGE: " + topic);
        }
      }
    },
    processGlobalCounterMessages(topic, message) {
      let elements = topic.split("/");
      switch (elements[3]) {
        case "hierarchy":
          var hierarchy = JSON.parse(message);
          if (hierarchy.length) {
            this.evuId = hierarchy[0].id.match(/[\d]+$/)[0];
            console.warn ("EVU counter is " + this.evuId)
            this.addChargepoint(hierarchy[0]);
          }
          break;
        case "home_consumption":
          this.usageSummary.house.power = message;
          break;
        case "daily_yield_home_consumption":
          this.usageSummary.house.energy = +message / 1000;
          break;
        case "invalid_home_consumption":
          // console.log('invalid home consumption:' + message)
          break;
        case "fault_state":
          // console.log('fault_state:' + message)
          break;
        case "fault_str":
          // console.log('fault_str' + message)
          break;
        default:
          console.warn("UNMATCHED GLOBAL COUNTER MESSAGE: " + topic);
      }
    },
    processBatteryMessages(topic, message) {
      // console.log('bat [' + topic + '] ' + message)
      switch (topic) {
        case "openWB/bat/get/power":
          if (message > 0) {
            this.usageSummary.batIn.power = +message;
            this.sourceSummary.batOut.power = 0;
          } else {
            this.usageSummary.batIn.power = 0;
            this.sourceSummary.batOut.power = -message;
          }
          break;
        case "openWB/bat/get/daily_yield_import":
          this.usageSummary.batIn.energy = +message / 1000;
          break;
        case "openWB/bat/get/daily_yield_export":
          this.sourceSummary.batOut.energy = +message / 1000;
          break;
        case "openWB/bat/get/soc":
          this.globalData.batterySoc = message;
          break;
        default:
          console.warn("BATTERY MSG")
      }
    },
    processPvMessages(topic, message) {
      //console.log("pv [" + topic + '] ' + message)
      switch (topic) {
        case "openWB/pv/get/power":
          this.sourceSummary.pv.power = -message;
          break;
        case "openWB/pv/get/daily_yield":
          this.sourceSummary.pv.energy = +message / 1000;
          break;
        default:
      }
    },
    processChargepointMessages(topic, message) {
      let elements = topic.split("/");
      let index;
      //console.info (topic)
      switch (elements[2]) {
        // General Chargepoint messages
        case "get":
          switch (elements[3]) {
            case "power":
              this.usageSummary.charging.power = +message;
              break;
            case "daily_yield":
              this.usageSummary.charging.energy = +message / 1000;
              break;
            case "daily_exported":
              // console.debug('CP daily_exported: ' + message)
              break;
            case "counter":
              // console.debug('CP counter: ' + message)
              break;
            default:
              console.warn("CP general get message missed: " + topic);
              break;
          }
          break;
        case "template":
          // console.debug('template: ' + message)
          break;
        default:
          // Chargepoint specific messages
          index = elements[2];
          switch (elements[3]) {
            case "config":
              if (this.chargePoints[index]) {
                console.log ("INDEX: " + index)
                var configMessage = JSON.parse(message);
                this.chargePoints[index].name = configMessage.name;
              } else {
                console.warn ("invalid chargepoint index: " + index)
              }
              break;
            default:
              switch (elements[4]) {
                case "enabled":
                  this.updateCP(topic, "enabled", message == "1");
                  break;
                case "current":
                  this.updateCP(topic, "current", message);
                  break;
                case "power":
                  this.updateCP(topic, "power", message);
                  break;
                case "phases_in_use":
                  this.updateCP(topic, "phasesInUse", message);
                  break;
                case "charge_state":
                  this.updateCP(topic, "isCharging", message == "true");
                  break;
                case "plug_state":
                  this.updateCP(topic, "isPluggedIn", message == "true");
                  break;
                case "state_str":
                  // console.debug('state_str ' + index)
                  break;
                case "fault_state":
                  // console.debug('fault_state ' + index)
                  break;
                case "fault_str":
                  // console.debug('fault_str ' + index)
                  break;
                case "manual_lock":
                  this.updateCP(topic, "isLocked", message == "true");
                  break;
                // Connected Vehicle...
                case "connected_vehicle":
                console.info ("Connected Vehicle " + topic)
                  switch (elements[5]) {
                    // ...info
                    case "info":
                      var info = JSON.parse(message);
                      this.updateCP(topic, "carName", info.name);
                      this.updateCP (topic, 'carId', info.id)
                      break
                      // ...config
                    case "config":
                      //var config = JSON.parse(message);
                      console.warn('Ignoring CP config messages')
                     // this.updateCP(topic, "chargeMode", config.chargemode);
                      //this.updateCP(
                      //  topic,
                      //  "chargeTemplate",
                      //  config.charge_template
                     // )
                      break
                    case 'soc':
                      break
                    default:
                      console.warn("Ignored CONNECTED VEHICLE MESSAGE: " + topic);
                      break;
                  }
                  break;
                default:
                  console.warn(
                    "CP SPECIFIC MESSAGE " +
                      elements[4] +
                      " for index " +
                      index +
                      ": " +
                      message
                  );
                  break;
              }
              break;
          }
          break;
      }
    },
    updateCP(topic, attribute, value) {
      let index = this.getIndex(topic);
      let cp = this.chargePoints[index];
      if (cp) {
        cp[attribute] = value;
        console.info("Update Chargepoint " + cp.cpId + ": " + attribute + "=" + value)
        }
    },
    processVehicleMessages(topic, message) {
      let elements = topic.split("/");
      if (elements.length > 0) {
        if (elements[2] == 'template') {
          this.processVehicleTemplateMessages(topic,message)
        } else {
        let index = +elements[2];
        if (!(index in this.vehicles)) {
          this.$set(this.vehicles, index, {});
          const vh = this.createVehicle(index);
          const keys = Object.keys(vh);
          keys.forEach((v) => {
            this.$set(this.vehicles[index], v, vh[v]);
          });
        }

        switch (elements[3]) {
          case "name":
            this.vehicles[index].name = JSON.parse(message);
            break;
          case "get": 
            if (elements[4] == 'soc') {
            this.vehicles[index].soc = +message;
            }
            break
            case "charge_template":
              this.vehicles[index].chargeTemplateId= +message
              Object.keys(this.chargePoints).forEach (k => {
                if (this.chargePoints[k].carId == index) {
                  this.chargePoints[k].chargeTemplate = +message
                  let template = this.chargeTemplates[+message]
                  if (template) {
                  this.chargePoints[k].chargeMode = template.chargemode.selected
                  }}
              })
              break
          default:
            console.warn("Ignored VEHICLE message: [" + topic + "] " + message);
            break;
        }
        }
    }
      },
      processVehicleTemplateMessages (topic, message) {
        const elements = topic.split('/')
        if (elements.length > 0) {
          switch (elements[3]) {
            case 'charge_template':
              console.log("msg: " +message)
              var index = +elements[4]
              var template = JSON.parse(message)
              while (this.chargeTemplates.length <= index) {
                this.chargeTemplates.push({})
              }
              this.chargeTemplates[index] = template

              /* if (index > 0) {
                eventBus.$emit ('update', 'chargeTemplate', template, 0)
                console.error ("CORRECTED CHARGE TEMPLATE")
              } */
               Object.keys(this.chargePoints).forEach(k => {
                if (this.chargePoints[k].chargeTemplate == index) {
                  this.chargePoints[k].targetcurrent = template.chargemode.instant_charging.current
                  this.chargePoints[k].chargeMode = template.chargemode.selected
                  console.log ('--- updated chargeMode: ' + this.chargePoints[k].chargeMode)
                }
              }) 
              break
            default:
              console.warn ("Ignored template message [" + topic + ']=' + message)
          }
        }
      },
    processPvConfigMessages(topic, message) {
      let elements = topic.split('/')
      if (elements.length > 0) {
        switch (elements[4]) {
          case 'bat_prio':
            this.globalData.pvBatteryPriority = (message == "true")
            break
            default:
              console.warn("Ignored PV config msg: [" + topic + "] " + message);
        }
      }
    },
    processGraphMessages(topic, message) {
      console.debug("Graph [" + topic + "] " + message);
    },
    processEtProviderMessages(topic, message) {
      if (topic == "huhu") {
        console.log("cp [" + topic + "] " + message);
      }
    },

    processEvuMessages(topic, message) {
       // console.log("EVU [" + topic + ']' + message)
      let elements = topic.split("/");
      switch (elements[4]) {
        case "power":
          if (+message > 0) {
            this.sourceSummary.evuIn.power = +message;
            this.usageSummary.evuOut.power = 0;
          } else {
            this.sourceSummary.evuIn.power = 0;
            this.usageSummary.evuOut.power = -message;
          }
          break;
        case "daily_yield_import":
          this.sourceSummary.evuIn.energy = +message / 1000;
          break;
        case "daily_yield_export":
          this.usageSummary.evuOut.energy = +message / 1000;
          break;
        default:
      }
    },
    addChargepoint(hierarchy) {
      if (hierarchy.id.match(/cp[0-9]+/g)) {
        var chargePointIndex = hierarchy.id.replace("cp", "");
        this.$set(this.chargePoints, chargePointIndex, {});
        const cp = this.createChargepoint(
          Object.keys(this.chargePoints).length - 1,
          chargePointIndex
        );
        const keys = Object.keys(cp);
        keys.forEach((v) => {
          this.$set(this.chargePoints[chargePointIndex], v, cp[v]);
        });
        console.info("Added chargepoint " + chargePointIndex)
      }

      hierarchy.children.forEach((element) => {
        this.addChargepoint(element);
      });
    },

    getIndex(topic) {
      // get occurrence of numbers between / / in topic
      // since this is supposed to be the index like in openwb/lp/4/w
      // no lookbehind supported by safari, so workaround with replace needed
      try {
      var index = topic
        .match(/(?:\/)([0-9]+)(?=\/)/g)[0]
        .replace(/[^0-9]+/g, "");
       } catch (e) {
         console.warn ("Parser error in getIndex for topic " + topic)
       }
      if (typeof index === "undefined") {
        index = "";
      }
      return index;
    },
    /* updateData(topic, value) {
			this.processMqttMessage(
				topic,
				value,
				this.wbdata,
				this.sourceSummary,
				this.usageSummary
			);
			this.usageSummary.charging.power = 400;
		}, */
  },
  mounted() {
    // console.log("initiate mqtt")
    this.connect(this.processMqttMessage, [
      "openWB/counter/#",
      "openWB/bat/get/#",
      "openWB/pv/get/#",
      "openWB/chargepoint/#",
      "openWB/graph/#",
      "openWB/vehicle/#",
      "openWB/general/chargemode_config/pv_charging/#"
    ]);
  },
};
