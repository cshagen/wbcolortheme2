import { reactive } from 'vue'
import { updateServer } from '@/assets/js/sendMessages'
export class ChargePoint {
  id: number
  name = 'Ladepunkt'
  type = ''
  ev = 0
  template = 0
  connectedPhases = 0
  phase_1 = 0
  autoPhaseSwitchHw = false
  controlPilotInterruptionHw = false
  isEnabled = true
  isPluggedIn = false
  isCharging = false
  private _isLocked = false
  private _connectedVehicle = 0
  chargeTemplate = 0
  evTemplate = 0
  private _chargeMode = ChargeMode.pv_charging
  private _hasPriority = false
  currentPlan = ''
  averageConsumption = 0
  vehicleName = ''
  range = 0
  rangeUnit = ''
  counter = 0
  dailyYield = 0
  faultState = 0
  faultStr = ''
  phasesInUse = 0
  power = 0
  chargedSincePlugged = 0
  stateStr = ''
  current = 0
  phasesToUse = 0
  soc = 0
  isSocConfigured = true
  isSocManual = false
  color = 'white'
  private _scheduledCharging = false
  private _instantChargeLimitMode = ''
  private _instantTargetCurrent = 0
  private _instantTargetSoc = 0
  private _instantMaxEnergy = 0
  private _pvFeedInLimit = false
  private _pvMinCurrent = 0
  private _pvMaxSoc = 0
  private _pvMinSoc = 0
  private _pvMinSocCurrent = 0
  constructor(index: number) {
    this.id = index
  }
  get isLocked() {
    return this._isLocked
  }
  set isLocked(locked: boolean) {
    this._isLocked = locked
    updateServer ('cpLock', locked, this.id)
  }
  updateIsLocked (locked: boolean) {
    this._isLocked = locked
  }
  get connectedVehicle() {
    return this._connectedVehicle
  }
  set connectedVehicle(vId: number) {
    this._connectedVehicle = vId
    updateServer ('cpVehicle', +vId, this.id)
  }
  updateConnectedVehicle (id: number) {
    this._connectedVehicle = id
  }
  get chargeMode() {
    return this._chargeMode
  }
  set chargeMode(cm: ChargeMode) {
    this._chargeMode = cm
    updateServer ('chargeMode', cm, this.id)
    }
  updateChargeMode (cm: ChargeMode) {
    this._chargeMode = cm
  }
  get hasPriority() {
    return this._hasPriority
  }
  set hasPriority(prio: boolean) {
    this._hasPriority = prio
    updateServer ('cpPriority', prio, this.id)
    }
  updateCpPriority (prio: boolean) {
    this._hasPriority = prio
  }
  get scheduledCharging() {
    return this._scheduledCharging
  }
  set scheduledCharging(setting: boolean) {
    this._scheduledCharging = setting
    updateServer ('cpScheduledCharging', setting, this.id)
  }
  updateScheduledCharging (setting: boolean) {
    this._scheduledCharging = setting
  }
  get instantTargetCurrent() {
    return this._instantTargetCurrent
  }
  set instantTargetCurrent(current: number) {
    this._instantTargetCurrent = current
    updateServer ('cpInstantTargetCurrent', current, this.id)
  }
  updateInstantTargetCurrent (current: number) {
    this._instantTargetCurrent = current
  }
  get instantChargeLimitMode() {
    return this._instantChargeLimitMode
  }
  set instantChargeLimitMode(mode: string) {
    this._instantChargeLimitMode = mode
    updateServer ('cpInstantChargeLimitMode', mode, this.id)
  }
  updateInstantChargeLimitMode (mode: string) {
    this._instantChargeLimitMode = mode
  }
  get instantTargetSoc() {
    return this._instantTargetSoc
  }
  set instantTargetSoc(soc: number) {
    this._instantTargetSoc = soc
    updateServer ('cpInstantTargetSoc', soc, this.id)
  }
  updateInstantTargetSoc (soc: number) {
    this._instantTargetSoc = soc
  }
  get instantMaxEnergy() {
    return this._instantMaxEnergy
  }
  set instantMaxEnergy(max: number) {
    this._instantMaxEnergy = max
    updateServer ('cpInstantMaxEnergy', max, this.id)
  }
  updateInstantMaxEnergy (max: number) {
    this._instantMaxEnergy = max
  }
  get pvFeedInLimit() {
    return this._pvFeedInLimit
  }
  set pvFeedInLimit(setting: boolean) {
    this._pvFeedInLimit = setting
    updateServer ('cpPvFeedInLimit', setting, this.id)
  }
  updatePvFeedInLimit (setting: boolean) {
    this._pvFeedInLimit = setting
  }
  get pvMinCurrent() {
    return this._pvMinCurrent
  }
  set pvMinCurrent(min: number) {
    this._pvMinCurrent = min
    updateServer ('cpPvMinCurrent', min, this.id)
  }
  updatePvMinCurrent (min: number) {
    this._pvMinCurrent = min
  }
  get pvMaxSoc() {
    return this._pvMaxSoc
  }
  set pvMaxSoc(max: number) {
    this._pvMaxSoc = max
    updateServer ('cpPvMaxSoc', max, this.id)
  }
  updatePvMaxSoc (max: number) {
    this._pvMaxSoc = max
  }
  get pvMinSoc() {
    return this._pvMinSoc
  }
  set pvMinSoc(min: number) {
    this._pvMinSoc = min
    updateServer ('cpPvMinSoc', min, this.id)
  }
  updatePvMinSoc (min: number) {
    this._pvMinSoc = min
  }
  get pvMinSocCurrent() {
    return this._pvMinSocCurrent
  }
  set pvMinSocCurrent(a: number) {
    this._pvMinSocCurrent = a
    updateServer ('cpPvMinSocCurrent', a, this.id)
  }
  updatePvMinSocCurrent (a: number) {
    this._pvMinSocCurrent = a
  }
}
export class Vehicle {
  id: number
  name = ''
  chargeTemplateId = 0
  evTemplateId = 0
  tags: Array<string> = []
  soc = 0
  constructor(index: number) {
    this.id = index
  }
}
export interface ConnectedVehicleConfig {
  average_consumption: number
  charge_template: number
  chargemode: string
  current_plan: string
  ev_template: number
  priority: boolean
}
export enum ChargeMode {
  instant_charging = 'instant_charging',
  pv_charging = 'pv_charging',
  scheduled_charging = 'scheduled_charging',
  standby = 'standby',
  stop = 'stop',
}
export interface ChargeTemplate {
  prio: boolean
  time_charging: {
    active: boolean
  }
  chargemode: {
    selected: ChargeMode
    instant_charging: {
      current: number
      limit: {
        selected: string
        soc: number
        amount: number
      }
    }
    pv_charging: {
      feed_in_limit: boolean
      min_current: number
      max_soc: number
      min_soc: number
      min_soc_current: number
    }
  }
}

export const chargePoints: { [key: number]: ChargePoint } = reactive({})
export const vehicles: { [key: number]: Vehicle } = reactive({}) // the list of vehicles, key is the vehicle ID
export const chargeTemplates: { [key: number]: ChargeTemplate } = reactive({})

export function addChargePoint(chargePointIndex: number) {
  if (!(chargePointIndex in chargePoints)) {
    chargePoints[chargePointIndex] = new ChargePoint(chargePointIndex)
    chargePoints[chargePointIndex].color =
      'var(--color-cp' + (Object.values(chargePoints).length) + ')'
    console.info('Added chargepoint ' + chargePointIndex)
  } else {
    console.info('Duplicate chargepoint message: ' + chargePointIndex)
  }
}
