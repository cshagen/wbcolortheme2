/*
 * themeConfig.ts
 * colors theme for openwb 2.0
 * Copyright (c) 2022 Claus Hagen
 */

import { reactive } from 'vue'
import * as d3 from 'd3'
import type { ChargeModeInfo } from './types'

import { shDevices } from './model'

export class Config {
  private _showRelativeArcs: boolean = false
  showTodayGraph: boolean = true
  private _graphPreference: string = ''
  usageStackOrder: number = 0
  private _displayMode: string = 'dark'
  private _showGrid: boolean = false
  private _smartHomeColors: string = 'normal'
  private _decimalPlaces: number = 1
  private _showQuickAccess  = true
  private _simpleCpList = false
  maxPower: number = 4000
  isEtEnabled: boolean = false
  etPrice: number = 20.5
  constructor() {}
  get showRelativeArcs() {
    return this._showRelativeArcs
  }
  set showRelativeArcs(setting: boolean) {
    this._showRelativeArcs = setting
    savePrefs()
  }
  get graphPreference() {
    return this._graphPreference
  }
  set graphPreference(mode: string) {
    this._graphPreference = mode
    savePrefs()
  }
  setGraphPreference (mode: string) {
    this._graphPreference = mode
  }
  get displayMode() {
    return this._displayMode
  }
  set displayMode(mode: string) {
    this._displayMode = mode
    switchTheme(mode)
  }
  get showGrid() {
    return this._showGrid
  }
  set showGrid(setting: boolean) {
    this._showGrid = setting
    savePrefs()
  }
  
  get decimalPlaces() {
    return this._decimalPlaces
  }
  set decimalPlaces(setting: number) {
    this._decimalPlaces = setting
    savePrefs()
  }
  get smartHomeColors() {
    return this._smartHomeColors
  }
  set smartHomeColors(setting: string) {
    this._smartHomeColors = setting
    switchSmarthomeColors(setting)
  }
  get showQuickAccess() {
    return this._showQuickAccess
  }
  set showQuickAccess (show: boolean) {
    this._showQuickAccess = show
    savePrefs()
  }
  get simpleCpList() {
    return this._simpleCpList
  }
  set simpleCpList (show: boolean) {
    this._simpleCpList = show
    savePrefs()
  }
}

export function initConfig() {
  readCookie()
  // set the background
  const doc = d3.select('html')
  doc.classed('theme-dark', globalConfig.displayMode == 'dark')
  doc.classed('theme-light', globalConfig.displayMode == 'light')
  doc.classed('theme-blue', globalConfig.displayMode == 'blue')
  // set the color scheme for devices
  doc.classed('shcolors-standard', globalConfig.smartHomeColors == 'standard')
  doc.classed('shcolors-advanced', globalConfig.smartHomeColors == 'advanced')
  doc.classed('shcolors-normal', globalConfig.smartHomeColors == 'normal')
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
    color: 'var(--color-battery)',
    icon: 'fa-bullseye',
  },
  standby: { name: 'Standby', color: 'var(--color-axis', icon: 'fa-pause' },
  stop: { name: 'Stop', color: 'var(--color-fg)', icon: 'fa-power-off' },
}
// methods
export function savePrefs() {
  writeCookie()
}
export function switchTheme(mode: string) {
  const doc = d3.select('html')

  doc.classed('theme-dark', mode == 'dark')
  doc.classed('theme-light', mode == 'light')
  doc.classed('theme-blue', mode == 'blue')
  savePrefs()
}
export function toggleGrid() {
  globalConfig.showGrid = !globalConfig.showGrid
  savePrefs()
}
export function toggleFixArcs() {
  // globalConfig.etPrice = globalConfig.etPrice + 10
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
export function switchSmarthomeColors(setting: string) {
  const doc = d3.select('html')
  doc.classed('shcolors-normal', setting == 'normal')
  doc.classed('shcolors-standard', setting == 'standard')
  doc.classed('shcolors-advanced', setting == 'advanced')
  savePrefs()
}

export const infotext: { [key: string]: string } = {
  chargemode: 'Der Lademodus für diesen Ladepunkt',
  vehicle: 'Das Fahrzeug, das an diesem Ladepounkt geladen wird',
  locked: 'Diesen Ladepunkt sperren',
  priority: 'Diesen Ladepunkt auf hohe Priorität setzen',
  timeplan: 'An diesem Ladepunkt nach dem konfigurierten Zeitplan laden',
  minsoc:
    'Immer mindestens bis zum eingestellten Ladestand laden. Wenn notwendig mit Netzstrom.',
  minpv:
    'Durchgehend mit mindestens dem eingestellten Strom laden. Wenn notwendig mit Netzstrom.',
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
  showQA?: boolean
  simpleCP? : boolean
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
  prefs.showQA = globalConfig.showQuickAccess
  prefs.simpleCP = globalConfig.simpleCpList
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
    if (prefs.decimalP !== undefined) {
      globalConfig.decimalPlaces = prefs.decimalP
    }
    if (prefs.smartHomeC !== undefined) {
      globalConfig.smartHomeColors = prefs.smartHomeC
    }
    if (prefs.hideSH !== undefined) {
      prefs.hideSH.map((i) => (shDevices[i].showInGraph = false))
    }
    if (prefs.showLG !== undefined) {
      globalConfig.setGraphPreference ( prefs.showLG ? 'live' : 'day')
      // console.log (prefs.showLG)
    }
    if (prefs.maxPow !== undefined) {
      globalConfig.maxPower = +prefs.maxPow
    }
    if (prefs.relPM !== undefined) {
      globalConfig.showRelativeArcs = prefs.relPM
    }
    if (prefs.displayM !== undefined) {
      globalConfig.displayMode = prefs.displayM
    }
    if (prefs.stackO !== undefined) {
      globalConfig.usageStackOrder = prefs.stackO
    }
    if (prefs.showGr !== undefined) {
      globalConfig.showGrid = prefs.showGr
    }
    if (prefs.showQA !== undefined) {
      globalConfig.showQuickAccess = prefs.showQA
    }
    if (prefs.simpleCP !== undefined) {
      globalConfig.simpleCpList = prefs.simpleCP
    }
  }
}
