import { reactive } from 'vue'
import { mqttSubscribe, mqttUnsubscribe } from '../../assets/js/mqttClient'
import { sendCommand } from '@/assets/js/sendMessages'
import { globalConfig, setGraphMode } from '@/assets/js/themeConfig'

export interface GraphDataItem {
  [key: string]: number
}
export interface RawGraphDataItem {
  [key: string]: string
}
export interface RawDayGraphDataItem {
  timestamp: number,
  date: string,
  counter: Object,
  pv: Object,
  bat: Object,
  cp: Object,
  ev: Object,
  sh: Object
}
export const graphData: { data: GraphDataItem[], graphMode: string } = reactive({
  data: [],
  graphMode: 'today'
})
export var initializeSourceGraph = true
export var initializeUsageGraph = true
export function sourceGraphIsInitialized () {
  initializeSourceGraph = false
}
export function sourceGraphIsNotInitialized () {
  initializeSourceGraph = true
}

export function usageGraphIsInitialized () {
  initializeUsageGraph = false
}
export function usageGraphIsNotInitialized () {
  initializeUsageGraph = true
}
export function setInitializeUsageGraph (val: boolean) {
  initializeUsageGraph = val
}
export function setInitializeSourceGraph (val: boolean) {
  initializeSourceGraph = val
}
export function setGraphData(d: GraphDataItem[]) {
  graphData.data = d
  graphData.graphMode = globalConfig.graphMode 
}
export const liveGraph = {
  refreshTopicPrefix : 'openWB/graph/' + 'alllivevaluesJson',
  updateTopic : 'openWB/graph/lastlivevaluesJson',
  initialized: false,
  initCounter: 0,
  graphRefreshCounter : 0,
  rawDataPacks: [] as RawGraphDataItem[][],

  activate() {
    this.unsubscribeUpdates()
    this.subscribeRefresh()
    this.initialized=false
    this.initCounter=0
    this.graphRefreshCounter=0
    this.subscribeRefresh()
    this.rawDataPacks = []
  },
  deactivate() {
    this.unsubscribeRefresh()
    this.unsubscribeUpdates()
  },
  subscribeRefresh() {
    for (var segment = 1; segment < 17; segment++) {
      mqttSubscribe(this.refreshTopicPrefix + segment)
    }
  },
  unsubscribeRefresh() {
    for (var segment = 1; segment < 17; segment++) {
      mqttUnsubscribe(this.refreshTopicPrefix + segment)
    }
  },
  subscribeUpdates() {
    mqttSubscribe(this.updateTopic)
  },
  unsubscribeUpdates() {
    mqttUnsubscribe(this.updateTopic)
  }
}
export const dayGraph = reactive({
  topic: 'openWB/log/daily/#',
  date: new Date(),
  activate() {
    let dateString = this.date.getFullYear().toString() 
      + (this.date.getMonth() + 1).toString().padStart(2,'0') 
      + this.date.getDate().toString().padStart(2,'0')
    mqttSubscribe (this.topic)
    sendCommand({command: 'getDailyLog', 
      data: {day: dateString}
    })
  },
  deactivate() {
    mqttUnsubscribe(this.topic)
  },
  back() {
    this.date = new Date(this.date.setTime(this.date.getTime() - 86400000))
  },
  forward() {
    this.date = new Date(this.date.setTime(this.date.getTime() + 86400000))
  }
})
export const monthGraph = reactive({
  topic: 'openWB/log/monthly/#',
  month: new Date().getMonth() +1,
  year: new Date().getFullYear(),
  activate() {
    let dateString = this.year.toString() 
      + this.month.toString().padStart(2,'0')
    mqttSubscribe (this.topic)
    sendCommand({command: 'getMonthlyLog', 
      data: {month: dateString}
    })
  },
  deactivate() {
    mqttUnsubscribe(this.topic)
  },
  back() {
    this.month -= 1
    if (this.month < 1) {
      this.month=12
      this.year -= 1 
    }
    this.activate()
  },
  forward() {
    if ((this.month-1) < new Date().getMonth()) {
      this.month = this.month + 1
      if (this.month > 12) {
        this.month = 1
        this.year += 1
    }
    this.activate()
  }
  }
})
export function initGraph() {
  if (globalConfig.graphMode == '') {
   setGraphMode (globalConfig.graphPreference)
  }
  initializeSourceGraph = true
  initializeUsageGraph = true
  switch (globalConfig.graphMode) {
    case 'live':
      dayGraph.deactivate()
      liveGraph.activate()
      break
    case 'today':
      liveGraph.deactivate()
      monthGraph.deactivate()
      dayGraph.activate()  
      break
    case 'day':
      liveGraph.deactivate()
      monthGraph.deactivate()
      dayGraph.activate()  
      break
    case 'month':
      liveGraph.deactivate()
      dayGraph.deactivate()
      monthGraph.activate()
      break
  }
}

export function calculateAutarchy(cat: string, values: GraphDataItem) {
  values[cat + 'Pv'] =
    (values[cat] * (values.solarPower - values.gridPush)) /
    (values.solarPower - values.gridPush + values.gridPull + values.batOut)
  values[cat + 'Bat'] =
    (values[cat] * values.batOut) /
    (values.solarPower - values.gridPush + values.gridPull + values.batOut)
}