import * as d3 from "d3";

export default {
  data() {
    return {
      staging: [],
      rawData: [],
      initCounter: 0,
      graphRequestCounter: 0,
      initialGraphData: [],
      initialized: false,
    };
  },
  methods: {
    // incremental update message for the day graph
    updateLiveGraph(topic, data) {
      // console.log(data)
      data = JSON.parse(data);
      const values = this.extractValues(data);
      // console.log(values)
      this.graphRefreshCounter++;
      this.graphData.push(values);
      if (this.graphRefreshCounter > 60) {
        this.resetLiveGraph();

        //
      }
    },
    resetLiveGraph() {
      this.initialized = false;
      this.initCounter = 0;
      this.initialGraphData = [];
      this.graphData = [];
      this.graphRefreshCounter = 0;
      this.unsubscribeMqttLiveGraphUpdates();
      this.subscribeMqttLiveGraphRefresh();
    },
    // initial/refresh delivery of all graph data
    reloadLiveGraph(topic, data) {
      if (this.initialized) {
       // console.log("graph initialized. Ignoring message");
      } else {
        let datapointStrings = data.toString().split("\n");
        if (datapointStrings.length > 1) {
          var datapoints = datapointStrings.map((datapoint) =>
            JSON.parse(datapoint)
          );
          const serialNo = topic.match(/(\d+)$/g)[0];
          if (serialNo != "") {
            if (typeof this.initialGraphData[+serialNo - 1] === "undefined") {
              this.initialGraphData[+serialNo - 1] = datapoints;
              this.initCounter++;
            }
          }
          if (this.initCounter == 15) {
            // Initialization complete
            this.unsubscribeMqttLiveGraphRefresh();
            this.subscribeMqttLiveGraphUpdates();
            this.initialized = true;
            this.initialGraphData.map((datapoints) => {
              datapoints.map((datapoint) => {
                const values = this.extractValues(datapoint);
                this.graphData.push(values);
              });
            });
            //  const startTime = this.graphData[0].date;
            //  const endTime = this.graphData[this.graphData.length - 1].date;
            //  this.liveGraphMinutes = Math.round((endTime - startTime) / 60000);
            //  this.updateHeading();
          }
        }
      }
    },
    extractValues(data) {
      let values = {};
      values.date = this.fullDate(data.time);
      if (data.grid > 0) {
        values.gridPull = data.grid;
        values.gridPush = 0;
      } else {
        values.gridPull = 0;
        values.gridPush = -data.grid;
      }
      if (data["pv-all"] <= 0) {
        values.solarPower = -data["pv-all"];
        values.inverter = 0;
      } else {
        values.solarPower = 0;
        values.inverter = data["pv-all"];
      }
      values.housePower = data["house-power"];
      //battery
      if (data["bat-all-power"] > 0) {
        values.batOut = 0;
        values.batIn = data["bat-all-power"];
      } else if (data["bat-all-power"] < 0) {
        values.batOut = -data["bat-all-power"];
        values.batIn = 0;
      } else {
        values.batOut = 0;
        values.batIn = 0;
      }
      values.batterySoc = data["bat-all-soc"];
      values.charging = data["charging-all"];
      // charge points - we only show a maximum of 10 chargepoints in the graph
      for (let i = 0; i < 10; i++) {
        let dataIndex = "cp" + i + "-power";
        let valuesIndex = "cp" + i;
        if (data[dataIndex]) {
          values[valuesIndex] = data[dataIndex];
        } else {
          values[valuesIndex] = 0 
        }
      }
      values.batterySoc = data["bat-all-soc"];
      values.selfUsage = values.solarPower - values.gridPush;
      if (values.selfUsage < 0) {
        values.selfUsage = 0;
      }
      return values;
    },
    fullDate(time) {
      const now = new Date(Date.now());
      const mSecondsPerDay = 86400000; // milliseconds in a day
      let date = new Date(d3.timeParse("%H:%M:%S")(time));
      date.setDate(now.getDate());
      date.setMonth(now.getMonth());
      date.setFullYear(now.getFullYear());
      if (date.getHours() > now.getHours()) {
        // this is an entry from yesterday
        date = new Date(date.getTime() - mSecondsPerDay); // change date to yesterday
      }
      return date;
    },
  },
};
