
import { reactive } from 'vue'
import * as d3 from 'd3';
import { mqttSubscribe, mqttUnsubscribe } from "../../assets/js/mqttClient";
import { globalData } from '../../assets/js/model'

export interface GraphDataItem {
  [key: string]: number

}
export interface RawGraphDataItem {
  [key: string]: string
}
export const graphData : {data: GraphDataItem[]}= reactive({ 
  data:  []
})
export function setGraphData (d: GraphDataItem[]) {
  graphData.data = d
}
let staging = []
let rawData = []
let initCounter = 0
let graphRefreshCounter = 0
let rawDataPacks: RawGraphDataItem[][] = []
let initialized = false


// methods: 
export function initGraph() {
  subscribeMqttLiveGraphRefresh()
}
export function processGraphMessages(topic: string, message: string) {
  if (topic == "openWB/graph/boolDisplayLiveGraph") {
    globalData.displayLiveGraph = (+message == 1);
  } else if (
    topic.match(/^openwb\/graph\/alllivevaluesJson[1-9][0-9]*$/i)
  ) {
    // graph messages if local connection
    reloadLiveGraph(topic, message);
  } else if (topic == "openWB/graph/lastlivevaluesJson") {
     updateLiveGraph(topic, message);
  } else if (topic == "openWB/graph/config/duration") {
    //  updateGlobal("liveGraphDuration", JSON.parse(message));
  } else {
    console.warn("Ignored GRAPH message: [" + topic + "](" + message + ")");
  }
}
// incremental update message for the day graph
export function updateLiveGraph(topic: string, rawString: string) {
  console.debug ("updatelivegraph")
  let rawItem = (JSON.parse(rawString) as RawGraphDataItem);
  const values = extractValues(rawItem);
  graphRefreshCounter++;
  graphData.data.push(values);
  if (graphRefreshCounter > 60) {
    resetLiveGraph();
  }
}
export function resetLiveGraph() {
  initialized = false;
  initCounter = 0;
  rawDataPacks = [];
  // this.graphData = [];
  graphRefreshCounter = 0;
  unsubscribeMqttLiveGraphUpdates();
  subscribeMqttLiveGraphRefresh();
}
// initial/refresh delivery of all graph data
export function reloadLiveGraph(topic: string, rawMessage: string) {
  if (initialized) {
  } else {
    let dataCache: GraphDataItem[] = []
    let rawStrings = rawMessage.toString().split("\n");
    if (rawStrings.length > 1) {
      var rawItems: RawGraphDataItem[] = rawStrings.map((rawString) =>
        (JSON.parse(rawString) as RawGraphDataItem)
      )
      let matches = topic.match(/(\d+)$/g)
      if (matches) {
        const serialNo = matches[0];
        if (serialNo != "") {
          if (typeof rawDataPacks[+serialNo - 1] === "undefined") {
            rawDataPacks[+serialNo - 1] = rawItems;
            initCounter++;
          }
        }
      }
    }
    if (initCounter == 15) {
      // Initialization complete
      unsubscribeMqttLiveGraphRefresh();
      subscribeMqttLiveGraphUpdates();
      initialized = true;
      rawDataPacks.map((dataPack) => {
        dataPack.map((rawItem) => {
          const values = extractValues(rawItem);
          dataCache.push(values);
        });
      });
    }
    setGraphData(dataCache)
  }
}
function extractValues(data: RawGraphDataItem): GraphDataItem {
  let values: GraphDataItem = {};
  values.date = fullDate(data.time).valueOf();
  if (+data.grid > 0) {
    values.gridPull = +data.grid;
    values.gridPush = 0;
  } else if(+data.grid <= 0) {
    values.gridPull = 0;
    values.gridPush = -data.grid;
  } else {
    values.gridPull = 0;
    values.gridPush = 0;
  }
  if (+data["pv-all"] <= 0) {
    values.solarPower = -data["pv-all"];
    values.inverter = 0;
  } else {
    values.solarPower = 0;
    values.inverter = +data["pv-all"];
  }
  values.housePower = +data["house-power"];
  //battery
  if (+data["bat-all-power"] > 0) {
    values.batOut = 0;
    values.batIn = +data["bat-all-power"];
  } else if (+data["bat-all-power"] < 0) {
    values.batOut = -data["bat-all-power"];
    values.batIn = 0;
  } else {
    values.batOut = 0;
    values.batIn = 0;
  }
  values.batterySoc = +data["bat-all-soc"];
  values.charging = +data["charging-all"];
  // charge points - we only show a maximum of 10 chargepoints in the graph
  for (let i = 0; i < 10; i++) {
    if (data['cp' + i + '-power']) {
      values['cp' + i] = +data['cp' + i + '-power']
    } else {
      values['cp' + i] = 0
    }
  }
  values.batterySoc = +data["bat-all-soc"];
  values.selfUsage = values.solarPower - values.gridPush;
  if (values.selfUsage < 0) {
    values.selfUsage = 0;
  }
  return values;
}
function fullDate(timeString: string) {
  const now = new Date(Date.now());
  const mSecondsPerDay = 86400000; // milliseconds in a day
  let date = new Date()
  let parsedDate = d3.timeParse("%H:%M:%S")(timeString);
  if (parsedDate) {
    date = parsedDate
    date.setDate(now.getDate());
    date.setMonth(now.getMonth());
    date.setFullYear(now.getFullYear());
    if (date.getHours() > now.getHours()) {
      // this is an entry from yesterday
      date = new Date(date.getTime() - mSecondsPerDay); // change date to yesterday
    }
  }
  return date;
}
function subscribeMqttLiveGraphRefresh() {
  for (var chunk = 1; chunk < 17; chunk++) {
    let topic = "openWB/graph/" + "alllivevaluesJson" + chunk;
    mqttSubscribe(topic);
  }
}
function unsubscribeMqttLiveGraphRefresh() {
  for (var segments = 1; segments < 17; segments++) {
    let topic = "openWB/graph/" + "alllivevaluesJson" + segments;
    mqttUnsubscribe(topic);
  }
}
function subscribeMqttLiveGraphUpdates() {
  let topic = "openWB/graph/lastlivevaluesJson";
  mqttSubscribe(topic);
}
function unsubscribeMqttLiveGraphUpdates() {
  let topic = "openWB/graph/lastlivevaluesJson";
  mqttUnsubscribe(topic);
}