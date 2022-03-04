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
      topicsToSubscribe: [
      "openWB/counter/#",
      "openWB/bat/get/#",
      "openWB/pv/get/#",
      "openWB/chargepoint/#",
      //  "openWB/graph/#",
      "openWB/vehicle/#",
      "openWB/general/chargemode_config/pv_charging/#",
      "openWB/optional/et/#",
    ]
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
        console.error("MQTT connection failed", error);
      });
      this.client.on("message", callback);
    },
    subscribe(toTopic) {
      this.subscription.topic = toTopic;
      const { topic, qos } = this.subscription;
      this.client.subscribe(topic, { qos }, (error) => {
        if (error) {
          console.error("MQTT Subscription error: " + error);
          return;
        }
        // this.subscriptionSuccess = true
         console.info("MQTT Subscription successful: " + toTopic);
      });
    },
    unsubscribe(fromTopic) {
      this.subscription.topic = fromTopic;
      const { topic } = this.subscription;
      this.client.unsubscribe(topic, (error) => {
        if (error) {
          console.error(
            "MQTT Unsubscribe from " + fromTopic + " failed: " + error
          );
          return;
        }
        // console.info ('MQTT unsubscribe successful: ' + topic)
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
      } else if (topic.match(/^openwb\/vehicle\/template\//i)) {
        this.processVehicleTemplateMessages(topic, message);
      } else if (topic.match(/^openwb\/vehicle\//i)) {
        this.processVehicleMessages(topic, message);
      } else if (
        topic.match(/^openwb\/general\/chargemode_config\/pv_charging\//i)
      ) {
        this.processPvConfigMessages(topic, message);
      } else if (topic.match(/^openwb\/graph\//i)) {
        this.processGraphMessages(topic, message);
      } else if (topic.match(/^openwb\/optional\/et\//i)) {
        this.processEtProviderMessages(topic, message);
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
        // console.debug("config for counter " + elements[2]);
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
            console.warn("Ignored COUNTER message: " + topic);
        }
      }
    },
    processGlobalCounterMessages(topic, message) {
        if (topic.match(/^openwb\/counter\/get\/hierarchy$/i)) {
          var hierarchy = JSON.parse(message);
          if (hierarchy.length) {
            for (const element of hierarchy) {
              if (element.type == 'counter') {
                this.evuId = hierarchy[0].id;
                console.info("EVU counter is " + this.evuId);
              }
            }
            this.addChargepoint(hierarchy[0]);
          }
        } else if (topic.match(/^openwb\/counter\/set\/home_consumption$/i)) {
          this.usageSummary.house.power = message;
        } else if (topic.match(/^openwb\/counter\/set\/daily_yield_home_consumption$/i)) {
          this.usageSummary.house.energy = +message / 1000;
        } else { 
        console.warn("Ignored GLOBAL COUNTER message: " + topic);
      }
    },
    processBatteryMessages(topic, message) {
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
         console.warn("Ignored BATTERY message: " + topic)
      }
    },
    processPvMessages(topic, message) {
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
        // General Chargepoint messages
        if (topic == 'openWB/chargepoint/get/power') {
          this.usageSummary.charging.power = +message;
        } else if (topic == 'openWB/chargepoint/get/daily_yield') {
          this.usageSummary.charging.energy = +message / 1000;
        } if (topic == 'openWB/chargepoint/get/daily_exported') {
          this.globalData.cpDailyExported = +message
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/config$/i)) {
          let index=this.getIndex(topic)
          if (this.chargePoints[index]) {
            var configMessage = JSON.parse(message);
            this.chargePoints[index].name = configMessage.name;
          } else {
            console.warn("invalid chargepoint index: " + index);
          }
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/state_str$/i)) {
          // ignore
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/fault_str$/i)) {
          //ignore
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/fault_state$/i)) {
          //ignore
        } else if (topic.match(/^openWB\/chargepoint\/[0-9]+\/get\/power$/i)) {
          this.updateCP(topic, "power", message)
        } else if (topic.match(/^openWB\/chargepoint\/[0-9]+\/set\/log\/charged_since_plugged_counter$/i)) {
          this.updateCP(topic, "energy", +message);   
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/plug_state$/i)) {
          this.updateCP(topic, "isPluggedIn", message == "true");
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/charge_state$/i)) {
          this.updateCP(topic, "isCharging", message == "true");
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/manual_lock$/i)) {
          this.updateCP(topic, "isLocked", message == "true");
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/enabled$/i)) {
          this.updateCP(topic, "enabled", message == "1");
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/phases_in_use/i)) {
          this.updateCP(topic, "phasesInUse", message)
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/set\/current/i)) {
          this.updateCP(topic, "current", message);
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/connected_vehicle\/soc$/i)) {
         // let socInfo = JSON.parse(message)
         // this.updateCP(topic, 'soc', socInfo.soc)
          console.info ("Ignored Connected Vehicle SOC " + topic + " : " + message)
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/connected_vehicle\/soc_config$/i)) {
          this.updateCP(topic, 'isSocManual', (message=='manual'))
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/connected_vehicle\/info$/i)) {
          var info = JSON.parse(message);
          this.updateCP(topic, "carName", String(info.name));
          this.updateCP(topic, "carId", info.id);
        } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/connected_vehicle\/config$/i)) {
          var config = JSON.parse(message);
          this.updateCP(topic, "chargeMode", config.chargemode);
          this.updateCP(topic, "chargeTemplate", config.charge_template)
        } else {
          console.warn("Ignored CHARGEPOINT message: " + topic);
        }
        
        
                
    },
    updateCP(topic, attribute, value) {
      let index = this.getIndex(topic);
      let cp = this.chargePoints[index];
      //console.info ("Update CP " + index + " : " + attribute + "  = " + value)
     
      if (cp) {
        cp[attribute] = value;
      }
      //console.dir(cp)
    },
    processVehicleMessages(topic, message) {
      if (topic.match(/^openwb\/vehicle\/[0-9]+\/name$/i)) {
        let index=this.getIndex(topic)
        // Create vehicle if not yet existing
        if (!(index in this.vehicles)){
          let v = this.createVehicle(index)
          this.$set(this.vehicles, index,  v)
        }
        // set car Name for charge point
        Object.keys(this.chargePoints).forEach((k) => {
          if (this.chargePoints[k].carId == index) {
            this.chargePoints[k].carName = JSON.parse(message);
          }
        })
        this.vehicles[index].name = JSON.parse(message);
      } else if (topic.match(/^openwb\/vehicle\/[0-9]+\/get\/soc$/i)) {
        let index=this.getIndex(topic)
        if (!(index in this.vehicles)) {
          let v = this.createVehicle(index)
          this.$set(this.vehicles, index, v)
        }
        // set soc for cp
        Object.keys(this.chargePoints).forEach((k) => {
          if (this.chargePoints[k].carId == index) {
            this.chargePoints[k].soc = JSON.parse(message);
          }
        })
      } else {
        console.warn("Ignored VEHICLE message [" + topic + "]=" + message);
      }
    },
    processVehicleTemplateMessages(topic, message) {
      console.info("VEH TMPL MSG " + topic + " : " + message)
      if (topic.match(/^openwb\/vehicle\/template\/charge_template\/[0-9]+$/i)) {
        let index = +topic.match(/[0-9]+$/i);
        let template = JSON.parse(message);
        this.chargeTemplates[index] = template
        this.updateCpFromChargeTemplate (index, template)
      /* } else if (topic.match(/^openwb\/vehicle\/template\/charge_template\/[0-9]+\/chargemode\/instant_charging\/soc$/i)) {
        let index=this.getIndex(topic)
        let soc = JSON.parse(message)
        this.chargeTemplates[index].chargemode.instant_charging.limit.soc = soc
        this.updateCpFromChargeTemplate (index, this.chargeTemplates[index]) */
      } else {
        console.warn("Ignored VEHICLE TEMPLATE message [" + topic + "]=" + message);
      }
    },
    updateCpFromChargeTemplate (index, template) {
      Object.keys(this.chargePoints).forEach((k) => {
        if (this.chargePoints[k].chargeTemplate == index) {
          this.chargePoints[k].hasPriority = template.prio
          this.chargePoints[k].chargeMode = template.chargemode.selected;
          this.chargePoints[k].instantChargeLimitMode =
            template.chargemode.instant_charging.limit.selected
          this.chargePoints[k].instantTargetCurrent =
            template.chargemode.instant_charging.current;
          this.chargePoints[k].instantTargetSoc = template.chargemode.instant_charging.limit.soc
          this.chargePoints[k].instantMaxEnergy = template.chargemode.instant_charging.limit.amount
          this.chargePoints[k].scheduledCharging = template.time_charging.active
          this.chargePoints[k].pvFeedInLimit = template.chargemode.pv_charging.feed_in_limit
          this.chargePoints[k].pvMinCurrent = template.chargemode.pv_charging.min_current
          this.chargePoints[k].pvMaxSoc = template.chargemode.pv_charging.max_soc
          this.chargePoints[k].pvMinSoc = template.chargemode.pv_charging.min_soc
          this.chargePoints[k].pvMinSocCurrent = template.chargemode.pv_charging.min_soc_current
        }
      })
    },
    processPvConfigMessages(topic, message) {
      let elements = topic.split("/");
      if (elements.length > 0) {
        switch (elements[4]) {
          case "bat_prio":
            this.globalData.pvBatteryPriority = message == "true";
            break;
          default:
            console.warn("Ignored PV CONFIG msg: [" + topic + "] " + message);
        }
      }
    },
    processGraphMessages(topic, message) {
      if (topic == "openWB/graph/boolDisplayLiveGraph") {
        this.globalData.displayLiveGraph = message == 1;
      } else if (
        topic.match(/^openwb\/graph\/alllivevaluesJson[1-9][0-9]*$/i)
      ) {
        // graph messages if local connection
        this.reloadLiveGraph(topic, message);
      } else if (topic == "openWB/graph/lastlivevaluesJson") {
        this.updateLiveGraph(topic, message);
      } else if (topic == "openWB/graph/config/duration") {
        this.updateGlobal("liveGraphDuration", JSON.parse(message));
      } else {
        console.warn("Ignored GRAPH message: [" + topic + "](" + message + ")");
      }
    }, // end processGraphMessages

    processEtProviderMessages(topic, message) {
      if (topic == "openWB/optional/et/active") {
        this.globalData.isEtEnabled = JSON.parse(message);
      } else if (topic == "openWB/optional/et/get/price") {
        this.globalData.etCurrentPrice = parseFloat(message);
      } else if (topic == "openWB/optional/et/config/max_price") {
        this.globalData.etMaxPrice = parseFloat(message);
      } else if (topic == "openWB/optional/et/provider") {
        this.globalData.etProvider = JSON.parse(message);
      } else {
        console.warn('Ignored ET Provider message: ' + topic)
      }
      // else if ( mqttTopic == 'openWB/global/ETProvider/modulePath' ) {
      // 	$('.etproviderLink').attr("href", "/openWB/modules/"+mqttPayload+"/stromtarifinfo/infopage.php");
      // }
      // else if ( mqttTopic == 'openWB/global/awattar/pricelist' ) {
      // 	// read etprovider values and trigger graph creation
      // 	// loadElectricityPriceChart will show electricityPriceChartCanvas if etprovideraktiv=1 in openwb.conf
      // 	// graph will be redrawn after 5 minutes (new data pushed from cron5min.sh)
      // 	var csvData = [];
      // 	var rawcsv = mqttPayload.split(/\r?\n|\r/);
      // 	// skip first entry: it is module-name responsible for list
      // 	for (var i = 1; i < rawcsv.length; i++) {
      // 		csvData.push(rawcsv[i].split(','));
      // 	}
      // 	// Timeline (x-Achse) ist UNIX Timestamp in UTC, deshalb Umrechnung (*1000) in Javascript-Timestamp (mit Millisekunden)
      // 	electricityPriceTimeline = getCol(csvData, 0).map(function(x) { return x * 1000; });
      // 	// Chartline (y-Achse) ist Preis in ct/kWh
      // 	electricityPriceChartline = getCol(csvData, 1);

      // 	loadElectricityPriceChart();
      // }
    },

    processEvuMessages(topic, message) {
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
      if (hierarchy.type == 'cp') {
        var chargePointIndex = hierarchy.id;
        if (!(chargePointIndex in this.chargePoints)) {
          this.$set(this.chargePoints, chargePointIndex, {});
          const cp = this.createChargepoint(chargePointIndex);
          const keys = Object.keys(cp);
          keys.forEach((v) => {
            this.$set(this.chargePoints[chargePointIndex], v, cp[v]);
          });
          console.info("Added chargepoint " + chargePointIndex);
        } else {
          console.info("Duplicate chargepoint message: " + chargePointIndex);
        }
      }
      // recursively add more chargepoints
      hierarchy.children.forEach((element) => {
        this.addChargepoint(element);
      });
      // assign colors for the chargepoints
      Object.values(this.chargePoints).forEach((cp, index) => {
        cp.color = "var(--color-cp" + (index + 1) + ")";
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
        console.warn("Parser error in getIndex for topic " + topic);
      }
      if (typeof index != "undefined") {
        index = +index;
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
    subscribeMqttLiveGraphRefresh() {
      for (var chunk = 1; chunk < 17; chunk++) {
        let topic = "openWB/graph/" + "alllivevaluesJson" + chunk;
        this.subscribe(topic);
      }
    },
    unsubscribeMqttLiveGraphRefresh() {
      for (var segments = 1; segments < 17; segments++) {
        let topic = "openWB/graph/" + "alllivevaluesJson" + segments;
        this.unsubscribe(topic);
      }
    },
    subscribeMqttLiveGraphUpdates() {
      let topic = "openWB/graph/lastlivevaluesJson";
      this.subscribe(topic);
    },
    unsubscribeMqttLiveGraphUpdates() {
      let topic = "openWB/graph/lastlivevaluesJson";
      this.unsubscribe(topic);
    },
  },
  mounted() {
    // console.log("initiate mqtt")
    this.connect(this.processMqttMessage, this.topicsToSubscribe);
    this.subscribeMqttLiveGraphRefresh();
  },
};
