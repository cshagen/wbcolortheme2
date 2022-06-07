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
  ev: Object
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
export function usageGraphIsInitialized () {
  initializeUsageGraph = false
}
export function setInitializeUsageGraph (val: boolean) {
  initializeUsageGraph = val
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
export const monthGraph = {
  year: new Date().getFullYear(),
  month: new Date().getMonth(),
  activate() {},
  deactivate() {},
  back () {
    this.month = this.month - 1
    if (this.month < 0) {
      this.month = 11
      this.year = this.year - 1
    }
  },
  forward () {
    this.month = this.month + 1
    if (this.month > 11) {
      this.month = 0
      this.year = this.year + 1
    }
  }
}
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
      dayGraph.activate()  
      break
    case 'day':
      liveGraph.deactivate()
      dayGraph.activate()  
      break
  }
}
