import * as d3 from 'd3'
import {
  type GraphDataItem,
  type RawDayGraphDataItem,
  setGraphData,
  initGraph,
  dayGraph,
  graphConfig
  } from './model'
import { historicSummary } from '@/assets/js/model'
// methods:
export function processDayGraphMessages(topic: string, message: string) {
  let rawValues: RawDayGraphDataItem[] = JSON.parse(message)
  setGraphData(calculateGraphDataList(rawValues))
  updateEnergyValues (rawValues)
  if (graphConfig.graphMode == 'today') {
    setTimeout(() => initGraph(), 300000)
  }
}
function calculateGraphDataList(table: RawDayGraphDataItem[]) {
  let result: GraphDataItem[] = []
  let lastItem: GraphDataItem = {}
  let currentItem: GraphDataItem = {}
  for (let index = 0; index < table.length; index++) {
    //currentItem = {}
    //let currentRow = table[index]
    currentItem = extractValues (table[index])
    /* let d = d3.timeParse('%H:%M')(currentRow.date)
    if (d) {
      d.setMonth(dayGraph.date.getMonth())
      d.setDate(dayGraph.date.getDate())
      d.setFullYear(dayGraph.date.getFullYear())
      currentItem.date = d.getTime()
    }
    Object.entries(currentRow.counter).forEach(([id, values]) => {
      currentItem.gridPush = values.exported
      currentItem.gridPull = values.imported
    })
    Object.entries(currentRow.pv).forEach(([id, values]) => {
      if (id == 'all') {
        currentItem.solarPower = values.imported
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
      }
    })
    Object.entries(currentRow.ev).forEach(([id, values]) => {
      if (id != 'all') {
        currentItem['soc-' + id] = values.soc
      }
    }) */

    if (index > 0) {
      result.push(calculateValues(currentItem, lastItem))
    }
    lastItem = currentItem
  }
  return result
}
function extractValues (currentRow: RawDayGraphDataItem) : GraphDataItem {
  let currentItem : GraphDataItem = {}
  let d = d3.timeParse('%H:%M')(currentRow.date)
    if (d) {
      d.setMonth(dayGraph.date.getMonth())
      d.setDate(dayGraph.date.getDate())
      d.setFullYear(dayGraph.date.getFullYear())
      currentItem.date = d.getTime()
    }
    Object.entries(currentRow.counter).forEach(([id, values]) => {
      currentItem.gridPush = values.exported
      currentItem.gridPull = values.imported
    })
    Object.entries(currentRow.pv).forEach(([id, values]) => {
      if (id == 'all') {
        currentItem.solarPower = values.imported
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
      }
    })
    Object.entries(currentRow.ev).forEach(([id, values]) => {
      if (id != 'all') {
        currentItem['soc-' + id] = values.soc
      }
    })
    return currentItem
}
function calculateValues(
  currentRow: GraphDataItem,
  previousRow: GraphDataItem,
): GraphDataItem {
  let result: GraphDataItem = {}
  result.date = currentRow.date
  const cats = ['gridPull', 'gridPush', 'solarPower', 'batIn', 'batOut']
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

function updateEnergyValues(rawData: RawDayGraphDataItem[]) {
  const startValues = extractValues (rawData[0]);
  const endValues = extractValues(rawData[rawData.length - 1]);
  historicSummary.pv.energy = (endValues.solarPower - startValues.solarPower) / 1000;
  historicSummary.evuIn.energy = (endValues.gridPull - startValues.gridPull) / 1000;
  historicSummary.batOut.energy = (endValues.batOut - startValues.batOut) / 1000;
  historicSummary.evuOut.energy = (endValues.gridPush - startValues.gridPush) / 1000;
  //historicSummary.charging.energy = (endValues.charging - startValues.charging) / 1000;
  //var deviceEnergy = 0;
  /* for (var i = 0; i < 10; i++) {
    if (wbdata.graphMode == 'day') {
      deviceEnergy = deviceEnergy + (endValues[26 + i] - startValues[26 + i]) / 1000;
    } else {
      deviceEnergy = deviceEnergy + (endValues[19 + i] - startValues[19 + i]) / 1000;
    }} 
  deviceEnergy = deviceEnergy + (endValues[10] - startValues[10]) / 1000;
  deviceEnergy = deviceEnergy + (endValues[12] - startValues[12]) / 1000;

  wbdata.historicSummary.devices.energy = deviceEnergy;
  */
  historicSummary.batIn.energy = (endValues.batIn - startValues.batIn) / 1000;
  historicSummary.house.energy = historicSummary.evuIn.energy + historicSummary.pv.energy 
    + historicSummary.batOut.energy - historicSummary.evuOut.energy - historicSummary.batIn.energy 
    - historicSummary.charging.energy - historicSummary.devices.energy;
}
