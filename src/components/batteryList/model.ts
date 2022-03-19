import { reactive } from 'vue'
export class Battery {
  id: number
  dailyYieldExport = 0
  dailyYieldImport = 0
  exported = 0
  faultState = 0
  faultStr = ""
  imported = 0
  power = 0
  soc = 0
  constructor(index: number) {
    this.id = index
  }
}

export const batteries: { [key: number]: Battery } = reactive({})

export function addBattery(index: number) {
    if (!(index in batteries)) {
      batteries[index] = new Battery(index)
      console.info('Added battery ' + index)
    } else {
      console.info('Duplicate battery message: ' + index)
    }
  }
  