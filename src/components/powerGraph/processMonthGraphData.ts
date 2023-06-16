import * as d3 from 'd3'
import { globalConfig } from '@/assets/js/themeConfig'
import {
  type GraphDataItem,
  type RawDayGraphDataItem,
  setGraphData,
  initGraph,
  dayGraph
  } from './model'
import { historicSummary } from '@/assets/js/model'
let startValues : GraphDataItem = {}
let endValues : GraphDataItem = {}
let pvChargeCounter = 0
let batChargeCounter = 0
import { mqttSubscribe, mqttUnsubscribe } from '../../assets/js/mqttClient'
import { globalData } from '../../assets/js/model'

// methods:
export function processMonthGraphMessages(topic: string, message: string) {
  let rawValues: RawDayGraphDataItem[] = JSON.parse(message).entries
  setGraphData(calculateGraphDataList(rawValues))
  updateEnergyValues (startValues, endValues)

  console.log("Monthly graph")
  console.log('[' + topic + ']:')
  console.log(JSON.parse(message).entries)
  reloadMonthGraph(topic, message)
}
function calculateGraphDataList(table: RawDayGraphDataItem[]) : GraphDataItem[] {
  let result: GraphDataItem[] = []
  let lastItem: GraphDataItem = {}
  let currentItem: GraphDataItem = {}
  for (let index = 0; index < table.length; index++) {
    currentItem = extractCounters (table[index])
    if (index > 0) {
      result.push(calculatePowerValues(currentItem, lastItem))
    } else {
      startValues = currentItem
      startValues.chargingPv = 0
      startValues.chargingBat = 0
      pvChargeCounter = 0
      batChargeCounter = 0
    }
    lastItem = currentItem
  }
  endValues = currentItem
  endValues.chargingPv = pvChargeCounter
  endValues.chargingBat = batChargeCounter
  
  return result
}
// initial/refresh delivery of all graph data
export function reloadMonthGraph(topic: string, rawMessage: string) {
    let graphRecords: RawDayGraphDataItem[] = JSON.parse (rawMessage).entries
    
    let newGraphData: GraphDataItem[] = []
    graphRecords.map((dayData) => {
      
        const values = extractCounters(dayData)
        newGraphData.push(values)
        console.log (values)
      })
    
    console.log (newGraphData)
    // setGraphData(newGraphData)
    // liveGraph.subscribeUpdates()
  }

// incremental update message for the live graph
/* export function updateLiveGraph(topic: string, rawString: string) {
  let rawItem = JSON.parse(rawString) as RawDayGraphDataItem
  const values = extractCounters(rawItem)
  liveGraph.graphRefreshCounter++
  setGraphData(graphData.data.concat(values))
  if (liveGraph.graphRefreshCounter > 60) {
    liveGraph.activate()
  }
} */
function extractCounters(currentRow: RawDayGraphDataItem): GraphDataItem {
  let currentItem : GraphDataItem = {}
  console.log (currentRow.date)
  let d = d3.timeParse('%Y%m%d')(currentRow.date)
  console.log(d)
    if (d) {
      currentItem.date = d.getDate()
    }
    Object.entries(currentRow.counter).forEach(([id, values]) => {
      currentItem.gridPush = values.exported
      currentItem.gridPull = values.imported
    })
    Object.entries(currentRow.pv).forEach(([id, values]) => {
      if (id == 'all') {
        currentItem.solarPower = values.exported
      }
    })
    if (Object.entries(currentRow.bat).length > 0) {
      Object.entries(currentRow.bat).forEach(([id, values]) => {
        if (id == 'all') {
          currentItem.batIn = values.imported
          currentItem.batOut = values.exported
        }
      })
    } else {
      currentItem.batIn = 0
      currentItem.batOut = 0
    }
    Object.entries(currentRow.cp).forEach(([id, values]) => {
      if (id != 'all') {
        currentItem[id] = values.imported
        currentItem['soc' + id] = values.soc
      } else {
        currentItem['charging'] = values.imported
      }
    })
    Object.entries(currentRow.ev).forEach(([id, values]) => {
      if (id != 'all') {
        currentItem['soc-' + id] = values.soc
      }
    })
    
    return currentItem
}
function fullDate(timeString: string) {
  const now = new Date(Date.now())
  const mSecondsPerDay = 86400000 // milliseconds in a day
  let date = new Date()
  let parsedDate = d3.timeParse('%H:%M:%S')(timeString)
  if (parsedDate) {
    date = parsedDate
    date.setDate(now.getDate())
    date.setMonth(now.getMonth())
    date.setFullYear(now.getFullYear())
    if (date.getHours() > now.getHours()) {
      // this is an entry from yesterday
      date = new Date(date.getTime() - mSecondsPerDay) // change date to yesterday
    }
  }
  return date
}
const cps = [
  'cp0',
  'cp1',
  'cp2',
  'cp3',
  'cp4',
  'cp5',
  'cp6',
  'cp7',
  'cp8',
  'cp9',
]
function calculatePowerValues(
  currentRow: GraphDataItem,
  previousRow: GraphDataItem,
): GraphDataItem {
  let result: GraphDataItem = {}
  result.date = currentRow.date
  const cats = ['gridPull', 'gridPush', 'solarPower', 'batIn', 'batOut', 'charging']
  
  const evSocs = [
    'soc-ev0',
    'soc-ev1',
    'soc-ev2',
    'soc-ev3',
    'soc-ev4',
    'soc-ev5',
    'soc-ev6',
    'soc-ev7',
    'soc-ev8',
    'soc-ev9',
  ]
  cats.concat(cps).forEach((category) => {
    result[category] = calculatePower(currentRow, previousRow, category)
  })
  let socs: number[] = []
  evSocs.forEach((label) => {
    if (currentRow[label] != undefined) {
      socs.push(currentRow[label])
    }
  })
  result.soc1 = socs[0]
  result.soc2 = socs[1]
  result.selfUsage = result.solarPower - result.gridPush
  result.housePower =
    result.solarPower +
    result.gridPull +
    result.batOut -
    result.gridPush -
    result.batIn -
    result.cp0 -
    result.cp1 -
    result.cp2 -
    result.cp3 -
    result.cp4 -
    result.cp5 -
    result.cp6 -
    result.cp7 -
    result.cp8 -
    result.cp9
  result.inverter = 0

  let usedEnergy = (result.gridPull + result.batOut + result.solarPower)
    if (usedEnergy > 0){
      pvChargeCounter += (result.charging * result.solarPower / usedEnergy  / 12 * 1000)
      batChargeCounter += (result.charging * result.batOut / usedEnergy  / 12 * 1000)
    }
  return result
}
function calculatePower(
  currentRow: { [key: string]: number },
  previousRow: { [key: string]: number },
  category: string,
) {
  if (currentRow[category] !== undefined) {
    return (12 * (currentRow[category] - previousRow[category])) / 1000
  } else {
    return 0
  }
}

function updateEnergyValues(startValues: GraphDataItem, endValues: GraphDataItem) {
  //const startValues = extractCounters (rawData[0]);
  //const endValues = extractCounters(rawData[rawData.length - 1]);
  historicSummary.pv.energy = (endValues.solarPower - startValues.solarPower) / 1000
  historicSummary.evuIn.energy = (endValues.gridPull - startValues.gridPull) / 1000
  historicSummary.batOut.energy = (endValues.batOut - startValues.batOut) / 1000
  historicSummary.evuOut.energy = (endValues.gridPush - startValues.gridPush) / 1000
  historicSummary.batIn.energy = (endValues.batIn - startValues.batIn) / 1000
  historicSummary.charging.energy = (endValues.charging - startValues.charging) / 1000
  historicSummary.charging.energyPv = (endValues.chargingPv - startValues.chargingPv) / 1000
  historicSummary.charging.energyBat = (endValues.chargingBat - startValues.chargingBat) / 1000
  historicSummary.charging.pvPercentage = Math.round((historicSummary.charging.energyPv + historicSummary.charging.energyBat)/ historicSummary.charging.energy * 100)
  
  historicSummary.house.energy = historicSummary.evuIn.energy + historicSummary.pv.energy 
    + historicSummary.batOut.energy - historicSummary.evuOut.energy - historicSummary.batIn.energy 
    - historicSummary.charging.energy - historicSummary.devices.energy;
}
