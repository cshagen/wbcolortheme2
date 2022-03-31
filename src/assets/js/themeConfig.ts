import { reactive } from 'vue'
import * as d3 from 'd3'
import type { ChargeModeInfo } from './types'

import { shDevices } from './model'

export class Config {
  showRelativeArcs: boolean = false
  showTodayGraph: boolean = true
  graphMode: string = 'live'
  graphPreference: string = 'live'
  usageStackOrder: number = 0
  displayMode: string = 'gray'
  showGrid: boolean = false
  smartHomeColors: string = 'normal'
  decimalPlaces: number = 1
  maxPower: number = 4000
  isEtEnabled: boolean = false
  etPrice: number = 20.5
  constructor() {}
}

export function initConfig () {
  readCookie()
    // set the background
    const doc = d3.select("html");
    doc.classed("theme-dark", globalConfig.displayMode == "dark");
    doc.classed("theme-light", globalConfig.displayMode == "light");
    doc.classed("theme-gray", globalConfig.displayMode == "gray");
    // set the color scheme for devices
    doc.classed(
      "shcolors-standard",
      globalConfig.smartHomeColors == "standard"
    );
    doc.classed(
      "shcolors-advanced",
      globalConfig.smartHomeColors == "advanced"
    );
    doc.classed("shcolors-normal", globalConfig.smartHomeColors == "normal");
}

export const globalConfig = reactive(new Config())

export const chargemodes: { [key: string]: ChargeModeInfo } = {
  instant_charging: {
    name: 'Sofort',
    color: 'var(--color-charging)',
    icon: 'fa-bolt',
  },
  pv_charging: { name: 'PV', color: 'var(--color-pv', icon: 'fa-solar-panel' },
  scheduled_charging: {
    name: 'Zielladen',
    color: 'var(--color-battery',
    icon: 'fa-bullseye',
  },
  standby: { name: 'Standby', color: 'var(--color-axis', icon: 'fa-pause' },
  stop: { name: 'Stop', color: 'black', icon: 'fa-power-off' },
}
// methods
export function savePrefs() {
  writeCookie()
}
export function switchTheme() {
  const doc = d3.select('html')
  switch (globalConfig.displayMode) {
    case 'gray':
      globalConfig.displayMode = 'light'
      break
    case 'light':
      globalConfig.displayMode = 'dark'
      break
    case 'dark':
      globalConfig.displayMode = 'gray'
      break
    default:
      break
  }
  doc.classed('theme-dark', globalConfig.displayMode == 'dark')
  doc.classed('theme-light', globalConfig.displayMode == 'light')
  doc.classed('theme-gray', globalConfig.displayMode == 'gray')
  savePrefs()
}
export function toggleGrid() {
  globalConfig.showGrid = !globalConfig.showGrid
  savePrefs()
}
export function toggleFixArcs() {
  globalConfig.etPrice = globalConfig.etPrice + 10
  globalConfig.showRelativeArcs = !globalConfig.showRelativeArcs
  savePrefs()
}
export function resetArcs(maxp: number = 4000) {
  globalConfig.maxPower = maxp
  savePrefs()
}
export function switchDecimalPlaces() {
  if (globalConfig.decimalPlaces < 4) {
    globalConfig.decimalPlaces = globalConfig.decimalPlaces + 1
  } else {
    globalConfig.decimalPlaces = 0
  }
  savePrefs()
}
export function switchSmarthomeColors() {
  const doc = d3.select('html')
  switch (globalConfig.smartHomeColors) {
    case 'normal':
      globalConfig.smartHomeColors = 'standard'
      doc.classed('shcolors-normal', false)
      doc.classed('shcolors-standard', true)
      doc.classed('shcolors-advanced', false)
      break
    case 'standard':
      globalConfig.smartHomeColors = 'advanced'
      doc.classed('shcolors-normal', false)
      doc.classed('shcolors-standard', false)
      doc.classed('shcolors-advanced', true)
      break
    case 'advanced':
      globalConfig.smartHomeColors = 'normal'
      doc.classed('shcolors-normal', true)
      doc.classed('shcolors-standard', false)
      doc.classed('shcolors-advanced', false)
      break
    default:
      globalConfig.smartHomeColors = 'normal'
      doc.classed('shcolors-normal', true)
      doc.classed('shcolors-standard', false)
      doc.classed('shcolors-advanced', false)
      break
  }
  savePrefs()
}
export const infotext : {[key:string]:string} = {
  'chargemode': 'Der Lademodus für diesen Ladepunkt',
  'vehicle': 'Das Fahrzeug, das an diesem Ladepounkt geladen wird',
  'locked': 'Diesen Ladepunkt sperren',
  'priority': 'Diesen Ladepunkt auf hohe Priorität setzen',
  'timeplan': 'An diesem Ladepunkt nach dem konfigurierten Zeitplan laden',
  'minsoc': 'Immer mindestens bis zum eingestellten Ladestand laden. Wenn notwendig mit Netzstrom.',
  'minpv': 'Durchgehend mit mindestens dem eingestellten Strom laden. Wenn notwendig mit Netzstrom.'
}
interface Preferences {
  hideSH?: number[]
  showLG?: boolean
  displayM?: string
  stackO?: number
  showGr?: boolean
  decimalP?: number
  smartHomeC?: string
  relPM?: boolean
  maxPow?: number
}

function writeCookie() {
  let prefs: Preferences = {}
  prefs.hideSH = Object.values(shDevices)
    .filter((device) => !device.showInGraph)
    .map((device) => device.id)
  prefs.showLG = globalConfig.graphPreference == 'live'
  prefs.displayM = globalConfig.displayMode
  prefs.stackO = globalConfig.usageStackOrder
  prefs.showGr = globalConfig.showGrid
  prefs.decimalP = globalConfig.decimalPlaces
  prefs.smartHomeC = globalConfig.smartHomeColors
  prefs.relPM = globalConfig.showRelativeArcs
  prefs.maxPow = globalConfig.maxPower
  document.cookie =
    'openWBColorTheme=' + JSON.stringify(prefs) + '; max-age=16000000'
}

function readCookie() {
  const wbCookies = document.cookie.split(';')
  const myCookie = wbCookies.filter(
    (entry) => entry.split('=')[0] === 'openWBColorTheme',
  )
  if (myCookie.length > 0) {
    let prefs = JSON.parse(myCookie[0].split('=')[1]) as Preferences
    if (prefs.decimalP) {
      globalConfig.decimalPlaces = prefs.decimalP
    }
    if (prefs.smartHomeC) {
      globalConfig.smartHomeColors = prefs.smartHomeC
    }
    if (prefs.hideSH) {
      prefs.hideSH.map((i) => (shDevices[i].showInGraph = false))
    }
    if (prefs.showLG) {
      globalConfig.graphPreference = prefs.showLG ? 'live' : 'day'
    }
    if (prefs.maxPow) {
      globalConfig.maxPower = +prefs.maxPow
    }
    if (prefs.relPM) {
      globalConfig.showRelativeArcs = prefs.relPM
    }
    if (prefs.displayM) {
      globalConfig.displayMode = prefs.displayM
    }
    if (prefs.stackO) {
      globalConfig.usageStackOrder = prefs.stackO
    }
    if (prefs.showGr) {
      globalConfig.showGrid = prefs.showGr
    }
  }
}
