import { reactive } from 'vue'
import { mqttSubscribe, mqttUnsubscribe } from '../../assets/js/mqttClient'
import { sendCommand } from '@/assets/js/sendMessages'
import { globalConfig } from '@/assets/js/themeConfig'

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
export const graphData: { data: GraphDataItem[] } = reactive({
  data: [],
})
export function setGraphData(d: GraphDataItem[]) {
  graphData.data = d
}

export const graphConfig = reactive({
  graphMode: globalConfig.graphPreference,
  showTodayGraph: true,
  graphDate: new Date(),
  graphMonth: {
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  },
  dayBack() {
    this.graphDate.setTime(this.graphDate.getTime() - 86400000)
  },
  monthBack() {
    this.graphMonth.month = this.graphMonth.month - 1
    if (this.graphMonth.month < 0) {
      this.graphMonth.month = 11
      this.graphMonth.year = this.graphMonth.year - 1
    }
  },
})
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
export const dayGraph = {
  topic: 'openWB/log/daily/#',
  activate() {
    let today = new Date()
    let todayString = today.getFullYear().toString() 
      + (today.getMonth()+1).toString().padStart(2,'0') 
      + today.getDate().toString().padStart(2,'0')
    mqttSubscribe (this.topic)
    sendCommand({command: 'getDailyLog', 
      data: {day: todayString}
    })
  },
  deactivate() {
    mqttUnsubscribe(this.topic)
  }
}
export function initGraph() {
  graphConfig.graphMode = globalConfig.graphPreference
  graphData.data=[]
  switch (graphConfig.graphMode) {
    case 'live':
      dayGraph.deactivate()
      liveGraph.activate()
      break
    case 'day':
      liveGraph.deactivate()
      dayGraph.activate()  
  }
}