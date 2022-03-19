import { usageSummary, sourceSummary, globalData } from '@/assets/js/model'
import { batteries } from './model'
export function processBatteryMessages(topic: string, message: string) {
  if (topic == 'openWB/bat/config/configured') {
    globalData.isBatteryConfigured = message == 'true'
  } else if (topic == 'openWB/bat/get/power') {
    if (+message > 0) {
      usageSummary.batIn.power = +message
      sourceSummary.batOut.power = 0
    } else {
      usageSummary.batIn.power = 0
      sourceSummary.batOut.power = -message
    }
  } else if (topic == 'openWB/bat/get/soc') {
    globalData.batterySoc = +message
  } else if (topic == 'openWB/bat/get/daily_yield_export') {
    sourceSummary.batOut.energy = +message / 1000
  } else if (topic == 'openWB/bat/get/daily_yield_import') {
    usageSummary.batIn.energy = +message / 1000
  } else if (topic.match(/^openwb\/bat\/[0-9]+\/get\/daily_yield_export$/i)) {
    batteries[getIndex(topic)].dailyYieldExport = +message
  } else if (topic.match(/^openwb\/bat\/[0-9]+\/get\/daily_yield_import$/i)) {
    batteries[getIndex(topic)].dailyYieldImport = +message
  } else if (topic.match(/^openwb\/bat\/[0-9]+\/get\/exported$/i)) {
    batteries[getIndex(topic)].exported = +message
  } else if (topic.match(/^openwb\/bat\/[0-9]+\/get\/fault_state$/i)) {
    batteries[getIndex(topic)].faultState = +message
  } else if (topic.match(/^openwb\/bat\/[0-9]+\/get\/fault_str$/i)) {
    batteries[getIndex(topic)].faultStr = message
  } else if (topic.match(/^openwb\/bat\/[0-9]+\/get\/imported$/i)) {
    batteries[getIndex(topic)].imported = +message
  } else if (topic.match(/^openwb\/bat\/[0-9]+\/get\/power$/i)) {
    batteries[getIndex(topic)].power = +message
  } else if (topic.match(/^openwb\/bat\/[0-9]+\/get\/soc$/i)) {
    batteries[getIndex(topic)].soc = +message
  } else {
    console.warn('Ignored BATTERY message: ' + topic)
  }
}

function getIndex(topic: string): number {
  // get occurrence of numbers between / / in topic
  // since  is supposed to be the index like in openwb/lp/4/w
  // no lookbehind supported by safari, so workaround with replace needed
  let index = 0
  try {
    var matches = topic.match(/(?:\/)([0-9]+)(?=\/)/g)
    if (matches) {
      index = +matches[0].replace(/[^0-9]+/g, '')
    }
  } catch (e) {
    console.warn('Parser error in getIndex for topic ' + topic)
  }
  if (typeof index != 'undefined') {
    index = +index
  }
  return index
}
