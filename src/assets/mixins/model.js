  // this is our model. It contains all values required by the different parts of the front end
  // it is constantly updated when new MQTT events come in

  export default  {
    data () {
      return {
        historicSummary : {
          "evuIn": { name: "Netz", power: 0, energy: 0, color: "white" },
          "pv": { name: "PV", power: 0, energy: 0, color: "white" },
          "batOut": { name: "Bat >", power: 0, energy: 0, color: "white" },
          "evuOut": { name: "Export", power: 0, energy: 0, color: "white" },
          "charging": { name: "Laden", power: 0, energy: 0, color: "white" },
          "devices": { name: "Geräte", power: 0, energy: 0, color: "white" },
          "batIn": { name: "> Bat", power: 0, energy: 0, color: "white" },
          "house": { name: "Haus", power: 0, energy: 0, color: "white" }
        },
        sourceSummary : {
          "evuIn": { name: "Netz", power: 0, energy: 0, color: "white" },
          "pv": { name: "PV", power: 0, energy: 0, color: "white" },			
          "batOut": { name: "Bat >", power: 0, energy: 0, color: "white" }
        },
        usageSummary : {
        "evuOut": { name: "Export", power: 0, energy: 0, color: "white" },
        "charging": { name: "Laden", power: 0, energy: 0, color: "white" },
        "devices": { name: "Geräte", power: 0, energy: 0, color: "white" },
        "batIn": { name: "> Bat", power: 0, energy: 0, color: "white" },
        "house": { name: "Haus", power: 0, energy: 0, color: "white" }
        },
        chargePoints : {},
        shDevice : [],
        consumer : [],
        vehicles: {}, // the list of vehicles, key is the vehicle ID
        chargeTemplates: {},
        globalData : {
          batterySoc : 0,
          isBatteryConfigured: true,
          chargeMode : '0',
          housePower : 0,
          pvBatteryPriority: false,
          displayLiveGraph: true,
          isEtEnabled: true,
          etMaxPrice: 0,
          etCurrentPrice: 0,
          cpDailyExported: 0,
        },
        graphData : [],
        etPriceList: ""
      }
    },
    created () { // Initiate the model
     // Array.from({ length: 9 }, (v, i) => this.chargePoints.push(this.createChargepoint(i)))
      Array.from({ length: 9 }, (v, i) => this.shDevice.push(this.createSHDevice(i)))
      // init colors
      this.sourceSummary.pv.color = 'var(--color-pv)';
      this.sourceSummary.evuIn.color = 'var(--color-evu)';
      this.sourceSummary.batOut.color = 'var(--color-battery)';
      this.usageSummary.evuOut.color = 'var(--color-export)';
      this.usageSummary.charging.color = 'var(--color-charging)';
      this.usageSummary.devices.color = 'var(--color-devices)';
      this.usageSummary.batIn.color = 'var(--color-battery)';
      this.usageSummary.house.color = 'var(--color-house)';
     /*  for (let i = 0; i < 8; i++) {
        this.chargePoints[i].color = 'var(--color-cp' + (i + 1) + ')';
      } */
      for (let i = 0; i < 9; i++) {
        this.shDevice[i].color = 'var(--color-sh' + (i + 1) + ')';
      }
    },
    methods :  {
      createChargepoint(cpId = 0, name = "Auto", power = 0, dailyYield = 0,  isSocConfigured = true, isSocManual = false, soc = 0) {
        return {
          
          cpId,
          name,
          power,
          energy : dailyYield,
          configured : true,
          isSocConfigured,
          isSocManual,
          isLocked: false,
          phasesInUse : 0,
          current: 16,
          energyPer100km: 18,
          soc,
          color : 'white', // we assign correct colors later
          isCharging: false,
          isPluggedIn: false,
          carId: 0,
          carName: 'unknown',
          chargeMode: 'stop',
          enabled: true,
          hasPriority: true,
          scheduledCharging: false,
          instantChargeLimitMode: 'none',
          instantTargetCurrent:16,
          instantTargetSoc: 80,
          instantMaxEnergy: 0,
          pvFeedInLimit: false,
          pvMinCurrent: 0,
          pvMaxSoc: 100,
          pvMinSoc: 0,
          pvMinSocCurrent: 16,
        }
      },
      createVehicle (index, name='', chargeTemplateId=0, evTemplateId=0, tags=[], soc=0 ) {
        return {
          id: index,
          name,
          chargeTemplateId,
          evTemplateId,
          tags,
          soc
        }
      },
      createSHDevice (index, name = "", power = 0, dailyYield = 0, configured = false, color = "white") {
        return {
          id : index,
          name,
          power,
          energy : dailyYield,
          configured : configured,
          showInGraph : true,
          color,
          countAsHouse : false
        }
      },
      updateGlobal (item, value) {
        this.globalData[item] = value
      }
    },
    
  }
  

    /* date : new Date(),
    pvwatt : 0,
    pvDailyYield : 0,
    chargePower : 0,
    chargeSum : 0,
    housePower : 0,
    smartHomePower : 0,
    houseEnergy : 0,
    batteryEnergyExport : 0,
    batteryEnergyImport : 0,
    batteryPowerExport : 0,
    batteryPowerImport : 0,
    batterySoc: 44,
    chargeMode:"0",
    graphDate : new Date(),
    graphMonth : {
        "month": 1,
        "year": 1900
    },
    
    usageDetails : [], */
