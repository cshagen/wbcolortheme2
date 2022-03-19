// this is the model for global data. It contains all values required by the different parts of the front end
// Components have their local model

import { reactive, ref } from 'vue'
import { ShDevice, GlobalData } from './types'
import type { PowerItem } from './types'

export const historicSummary: { [key: string]: PowerItem } = reactive({
  evuIn: { name: 'Netz', power: 0, energy: 0, color: 'white' },
  pv: { name: 'PV', power: 0, energy: 0, color: 'white' },
  batOut: { name: 'Bat >', power: 0, energy: 0, color: 'white' },
  evuOut: { name: 'Export', power: 0, energy: 0, color: 'white' },
  charging: { name: 'Laden', power: 0, energy: 0, color: 'white' },
  devices: { name: 'Geräte', power: 0, energy: 0, color: 'white' },
  batIn: { name: '> Bat', power: 0, energy: 0, color: 'white' },
  house: { name: 'Haus', power: 0, energy: 0, color: 'white' },
})
export const sourceSummary: { [key: string]: PowerItem } = reactive({
  evuIn: { name: 'Netz', power: 0, energy: 0, color: 'white' },
  pv: { name: 'PV', power: 0, energy: 0, color: 'white' },
  batOut: { name: 'Bat >', power: 0, energy: 0, color: 'white' },
})
export const usageSummary: { [key: string]: PowerItem } = reactive({
  evuOut: { name: 'Export', power: 0, energy: 0, color: 'white' },
  charging: { name: 'Laden', power: 0, energy: 0, color: 'white' },
  devices: { name: 'Geräte', power: 0, energy: 0, color: 'white' },
  batIn: { name: '> Bat', power: 0, energy: 0, color: 'white' },
  house: { name: 'Haus', power: 0, energy: 0, color: 'white' },
})
export const shDevices: { [key: number]: ShDevice }= reactive([])
export const globalData = reactive(new GlobalData())
export const etPriceList = ref('')
// Initiate the model
Array.from({ length: 9 }, (v, i) => shDevices[i]= new ShDevice(i))
// init colors
sourceSummary.pv.color = 'var(--color-pv)'
sourceSummary.evuIn.color = 'var(--color-evu)'
sourceSummary.batOut.color = 'var(--color-battery)'
usageSummary.evuOut.color = 'var(--color-export)'
usageSummary.charging.color = 'var(--color-charging)'
usageSummary.devices.color = 'var(--color-devices)'
usageSummary.batIn.color = 'var(--color-battery)'
usageSummary.house.color = 'var(--color-house)'
Object.values(shDevices).forEach (device => {
  device.color = 'var(--color-sh' + (device.id + 1) + ')'
})
