import { usageSummary, globalData } from '@/assets/js/model'
import {
  chargePoints,
  vehicles,
  chargeTemplates,
  Vehicle,
  ChargeMode,
} from './model'
import type { ConnectedVehicleConfig, ChargeTemplate } from './model'

export function processChargepointMessages(topic: string, message: string) {
  // General Chargepoint messages
  if (topic == 'openWB/chargepoint/get/power') {
    usageSummary.charging.power = +message
  } else if (topic == 'openWB/chargepoint/get/daily_yield') {
    usageSummary.charging.energy = +message / 1000
  }
  if (topic == 'openWB/chargepoint/get/daily_exported') {
    globalData.cpDailyExported = +message
  } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/config$/i)) {
    let index = getIndex(topic)
    if (chargePoints[index]) {
      var configMessage = JSON.parse(message)
      chargePoints[index].name = configMessage.name
    } else {
      console.warn('invalid chargepoint index: ' + index)
    }
  } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/state_str$/i)) {
    chargePoints[getIndex(topic)].stateStr = JSON.parse(message)
  } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/fault_str$/i)) {
    chargePoints[getIndex(topic)].faultStr = JSON.parse(message)
  } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/fault_state$/i)) {
    chargePoints[getIndex(topic)].faultState = +message
  } else if (topic.match(/^openWB\/chargepoint\/[0-9]+\/get\/power$/i)) {
    chargePoints[getIndex(topic)].power = +message
  } else if (
    topic.match(
      /^openWB\/chargepoint\/[0-9]+\/set\/log\/charged_since_plugged_counter$/i,
    )
  ) {
    chargePoints[getIndex(topic)].chargedSincePlugged = +message
  } else if (topic.match(/^openWB\/chargepoint\/[0-9]+\/get\/daily_yield$/i)) {
    chargePoints[getIndex(topic)].dailyYield = +message
  } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/plug_state$/i)) {
    chargePoints[getIndex(topic)].isPluggedIn = message == 'true'
  } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/charge_state$/i)) {
    chargePoints[getIndex(topic)].isCharging = message == 'true'
  } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/set\/manual_lock$/i)) {
    chargePoints[getIndex(topic)].updateIsLocked(message == 'true')
  } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/enabled$/i)) {
    chargePoints[getIndex(topic)].isEnabled = message == '1'
  } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/phases_in_use/i)) {
    chargePoints[getIndex(topic)].phasesInUse = +message
  } else if (topic.match(/^openwb\/chargepoint\/[0-9]+\/set\/current/i)) {
    chargePoints[getIndex(topic)].current = +message
  } else if (
    topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/connected_vehicle\/soc$/i)
  ) {
    console.warn('Ignored Connected Vehicle SOC ' + topic + ' : ' + message)
  } else if (
    topic.match(
      /^openwb\/chargepoint\/[0-9]+\/get\/connected_vehicle\/soc_config$/i,
    )
  ) {
    chargePoints[getIndex(topic)].isSocManual = message == 'manual'
  } else if (
    topic.match(/^openwb\/chargepoint\/[0-9]+\/get\/connected_vehicle\/info$/i)
  ) {
    let info = JSON.parse(message)
    chargePoints[getIndex(topic)].vehicleName = String(info.name)
    chargePoints[getIndex(topic)].updateConnectedVehicle(+info.id)
  } else if (
    topic.match(
      /^openwb\/chargepoint\/[0-9]+\/get\/connected_vehicle\/config$/i,
    )
  ) {
    let config: ConnectedVehicleConfig = JSON.parse(message)
    switch (config.chargemode) {
      case 'instant_charging':
        chargePoints[getIndex(topic)].updateChargeMode(
          ChargeMode.instant_charging,
        )
        break
      case 'pv_charging':
        chargePoints[getIndex(topic)].updateChargeMode(ChargeMode.pv_charging)
        break
      case 'scheduled_charging':
        chargePoints[getIndex(topic)].updateChargeMode(
          ChargeMode.scheduled_charging,
        )
        break
      case 'standby':
        chargePoints[getIndex(topic)].updateChargeMode(ChargeMode.standby)
        break
      case 'stop':
        chargePoints[getIndex(topic)].updateChargeMode(ChargeMode.stop)
        break
      
    }
    chargePoints[getIndex(topic)].chargeTemplate = config.charge_template
    chargePoints[getIndex(topic)].averageConsumption = config.average_consumption
  } else {
    console.warn('Ignored CHARGEPOINT message: ' + topic)
  }
}
export function processVehicleMessages(topic: string, message: string) {
  if (topic.match(/^openwb\/vehicle\/[0-9]+\/name$/i)) {
    let index = getIndex(topic)
    // Create vehicle if not yet existing
    if (!(index in vehicles)) {
      let v = new Vehicle(index)
      vehicles[index] = v
    }
    // set car Name for charge point
    Object.values(chargePoints).forEach((cp) => {
      if (cp.connectedVehicle == index) {
        cp.vehicleName = JSON.parse(message)
      }
    })
    vehicles[index].name = JSON.parse(message)
  } else if (topic.match(/^openwb\/vehicle\/[0-9]+\/get\/soc$/i)) {
    let index = getIndex(topic)
    if (!(index in vehicles)) {
      let v = new Vehicle(index)
      vehicles[index] = v
    }
    // set soc for cp
    Object.values(chargePoints).forEach((cp) => {
      if (cp.connectedVehicle == index) {
        cp.soc = JSON.parse(message)
      }
    })
  } else {
    console.warn('Ignored VEHICLE message [' + topic + ']=' + message)
  }
}
export function processVehicleTemplateMessages(topic: string, message: string) {
  // console.info("VEH TMPL MSG " + topic + " : " + message)
  if (topic.match(/^openwb\/vehicle\/template\/charge_template\/[0-9]+$/i)) {
    let match = topic.match(/[0-9]+$/i)
    if (match) {
      let index = +match
      let template: ChargeTemplate = JSON.parse(message)
      chargeTemplates[index] = template
      updateCpFromChargeTemplate(index, template)
    }
  } else {
    console.warn('Ignored VEHICLE TEMPLATE message [' + topic + ']=' + message)
  }
}
function updateCpFromChargeTemplate(index: number, template: ChargeTemplate) {
  Object.values(chargePoints).forEach((cp) => {
    if (cp.chargeTemplate == index) {
      cp.updateCpPriority(template.prio)
      // cp.updateChargeMode(template.chargemode.selected)
      cp.updateInstantChargeLimitMode(
        template.chargemode.instant_charging.limit.selected,
      )
      cp.updateInstantTargetCurrent(
        template.chargemode.instant_charging.current,
      )
      cp.updateInstantTargetSoc(template.chargemode.instant_charging.limit.soc)
      cp.updateInstantMaxEnergy(template.chargemode.instant_charging.limit.amount)
      cp.updateScheduledCharging(template.time_charging.active)
      cp.updatePvFeedInLimit (template.chargemode.pv_charging.feed_in_limit)
      cp.updatePvMinCurrent (template.chargemode.pv_charging.min_current)
      cp.updatePvMaxSoc (template.chargemode.pv_charging.max_soc)
      cp.updatePvMinSoc (template.chargemode.pv_charging.min_soc)
      cp.updatePvMinSocCurrent (template.chargemode.pv_charging.min_soc_current)
    }
  })
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
