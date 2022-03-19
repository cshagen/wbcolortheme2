// Type definitions for all components
import { updateServer } from '@/assets/js/sendMessages'

export class ShDevice {
  id : number
  name = ''
  power = 0
  energy = 0
  configured = true
  showInGraph = true
  color = 'white'
  countAsHouse = false
  constructor(index: number) {
    this.id = index
  }
}



export class GlobalData {
  batterySoc= 0
  isBatteryConfigured= true
  chargeMode= '0'
  housePower= 0
  private _pvBatteryPriority= false
  displayLiveGraph= true
  isEtEnabled= true
  etMaxPrice= 0
  etCurrentPrice= 0
  cpDailyExported= 0
  evuId = 0
  etProvider = ""
  get pvBatteryPriority () {
    return this._pvBatteryPriority
  }
  set pvBatteryPriority (prio: boolean) {
    this._pvBatteryPriority = prio
    updateServer('pvBatteryPriority', prio)
  }
  updatePvBatteryPriority (prio:boolean) {
    this._pvBatteryPriority = prio
  }
}

export interface Hierarchy {
  id: number,
  type: string,
  children: [Hierarchy]
} 
export interface ChargeModeInfo {
  name:string,
  color:string,
  icon: string,
}


export interface PowerItem {
  name: string,
  power: number,
  energy: number,
  color: string
}

export interface ItemList {
  [key: string] : PowerItem
}

export interface MarginType {
  left: number,
  top: number,
  right: number,
  bottom: number
}