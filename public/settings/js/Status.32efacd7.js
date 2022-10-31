"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[4614],{7475:function(e,t,l){l.r(t),l.d(t,{default:function(){return y}});var o=l(6252),a=l(3577);const n=e=>((0,o.dD)("data-v-5a6e48bd"),e=e(),(0,o.Cn)(),e),r={class:"status"},i=n((()=>(0,o._)("br",null,null,-1))),s=n((()=>(0,o._)("br",null,null,-1))),u=n((()=>(0,o._)("br",null,null,-1))),d=n((()=>(0,o._)("br",null,null,-1))),p=n((()=>(0,o._)("br",null,null,-1))),m=n((()=>(0,o._)("br",null,null,-1)));function c(e,t,l,n,c,g){const h=(0,o.up)("openwb-base-text-input"),W=(0,o.up)("openwb-base-heading"),f=(0,o.up)("openwb-base-card"),x=(0,o.up)("font-awesome-icon"),v=(0,o.up)("openwb-base-alert"),b=(0,o.up)("openwb-base-checkbox-input"),y=(0,o.up)("openwb-base-number-input");return(0,o.wg)(),(0,o.iD)("div",r,[g.numChargePointsInstalled>1?((0,o.wg)(),(0,o.j4)(f,{key:0,title:"Alle Ladepunkte",subtype:"primary",collapsible:!0,collapsed:!0},{default:(0,o.w5)((()=>[(0,o.Wm)(h,{title:"Leistung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kW","model-value":e.formatNumberTopic("openWB/chargepoint/get/power",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Zählerstand laden",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/chargepoint/get/imported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Zählerstand entladen",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/chargepoint/get/exported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Historie")])),_:1}),(0,o.Wm)(h,{title:"Heute geladen",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/chargepoint/get/daily_imported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Heute entladen",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/chargepoint/get/daily_exported",3,3,.001)},null,8,["model-value"])])),_:1})):(0,o.kq)("",!0),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(g.installedChargePoints,((t,l)=>((0,o.wg)(),(0,o.j4)(f,{key:l,title:t.name+" (ID: "+g.getChargePointIndex(l)+")",collapsible:!0,collapsed:!0,subtype:"primary"},{default:(0,o.w5)((()=>[(0,o.Wm)(v,{subtype:c.statusLevel[e.$store.state.mqtt["openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/fault_state"]]},{default:(0,o.w5)((()=>[1==e.$store.state.mqtt["openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/fault_state"]?((0,o.wg)(),(0,o.j4)(x,{key:0,"fixed-width":"",icon:["fas","exclamation-triangle"]})):2==e.$store.state.mqtt["openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/fault_state"]?((0,o.wg)(),(0,o.j4)(x,{key:1,"fixed-width":"",icon:["fas","times-circle"]})):((0,o.wg)(),(0,o.j4)(x,{key:2,"fixed-width":"",icon:["fas","check-circle"]})),(0,o.Uk)(" Modulmeldung:"),i,(0,o.Uk)(" "+(0,a.zw)(e.$store.state.mqtt["openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/fault_str"]),1)])),_:2},1032,["subtype"]),(0,o.Wm)(v,{subtype:"info"},{default:(0,o.w5)((()=>[(0,o.Uk)(" Statusmeldung:"),s,(0,o.Uk)(" "+(0,a.zw)(e.$store.state.mqtt["openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/state_str"]),1)])),_:2},1024),(0,o.Wm)(b,{title:"Fahrzeug angesteckt",disabled:"","model-value":1==e.$store.state.mqtt["openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/plug_state"]},null,8,["model-value"]),(0,o.Wm)(b,{title:"Ladevorgang aktiv",disabled:"","model-value":1==e.$store.state.mqtt["openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/charge_state"]},null,8,["model-value"]),(0,o.Wm)(h,{title:"Zählerstand laden",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/imported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Zählerstand entladen",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/exported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Heute geladen",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/daily_imported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Heute entladen",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/daily_exported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Leistung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kW","model-value":e.formatNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/power",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Ladestromvorgabe",readonly:"",class:"text-right text-monospace",step:"0.01",unit:"A","model-value":e.formatNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/set/current",2)},null,8,["model-value"]),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Werte pro Phase")])),_:1}),(0,o.Wm)(h,{title:"Spannung",readonly:"",class:"text-right text-monospace",unit:"V","model-value":e.formatPhaseArrayNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/voltages",1)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Strom",readonly:"",class:"text-right text-monospace",unit:"A","model-value":e.formatPhaseArrayNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/currents",2)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Leistungsfaktor",readonly:"",class:"text-right text-monospace","model-value":e.formatPhaseArrayNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/power_factors",2)},null,8,["model-value"]),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Phasen")])),_:1}),(0,o.Wm)(h,{title:"Vorgabe",readonly:"",class:"text-right text-monospace","model-value":e.formatNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/set/phases_to_use")},null,8,["model-value"]),(0,o.Wm)(h,{title:"Aktuell",readonly:"",class:"text-right text-monospace","model-value":e.formatNumberTopic("openWB/chargepoint/"+g.getChargePointIndex(l)+"/get/phases_in_use")},null,8,["model-value"])])),_:2},1032,["title"])))),128)),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(g.counterConfigs,(t=>((0,o.wg)(),(0,o.j4)(f,{key:t.id,title:t.name+" (ID: "+t.id+")",collapsible:!0,collapsed:!0,subtype:"danger"},{default:(0,o.w5)((()=>[(0,o.Wm)(v,{subtype:c.statusLevel[e.$store.state.mqtt["openWB/counter/"+t.id+"/get/fault_state"]]},{default:(0,o.w5)((()=>[1==e.$store.state.mqtt["openWB/counter/"+t.id+"/get/fault_state"]?((0,o.wg)(),(0,o.j4)(x,{key:0,"fixed-width":"",icon:["fas","exclamation-triangle"]})):2==e.$store.state.mqtt["openWB/counter/"+t.id+"/get/fault_state"]?((0,o.wg)(),(0,o.j4)(x,{key:1,"fixed-width":"",icon:["fas","times-circle"]})):((0,o.wg)(),(0,o.j4)(x,{key:2,"fixed-width":"",icon:["fas","check-circle"]})),(0,o.Uk)(" Modulmeldung:"),u,(0,o.Uk)(" "+(0,a.zw)(e.$store.state.mqtt["openWB/counter/"+t.id+"/get/fault_str"]),1)])),_:2},1032,["subtype"]),void 0!=e.$store.state.mqtt["openWB/counter/"+t.id+"/get/state_str"]?((0,o.wg)(),(0,o.j4)(v,{key:0,subtype:"info"},{default:(0,o.w5)((()=>[(0,o.Uk)(" Statusmeldung:"),d,(0,o.Uk)(" "+(0,a.zw)(e.$store.state.mqtt["openWB/counter/"+t.id+"/get/state_str"]),1)])),_:2},1024)):(0,o.kq)("",!0),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Zählerstände")])),_:1}),(0,o.Wm)(h,{title:"Export",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/counter/"+t.id+"/get/exported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Import",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/counter/"+t.id+"/get/imported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Saldierte Werte")])),_:1}),(0,o.Wm)(h,{title:"Leistung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kW","model-value":e.formatNumberTopic("openWB/counter/"+t.id+"/get/power",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Netzfrequenz",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"Hz","model-value":e.formatNumberTopic("openWB/counter/"+t.id+"/get/frequency",3)},null,8,["model-value"]),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Werte pro Phase")])),_:1}),(0,o.Wm)(h,{title:"Spannung",readonly:"",class:"text-right text-monospace",unit:"V","model-value":e.formatPhaseArrayNumberTopic("openWB/counter/"+t.id+"/get/voltages",1)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Strom",readonly:"",class:"text-right text-monospace",unit:"A","model-value":e.formatPhaseArrayNumberTopic("openWB/counter/"+t.id+"/get/currents",2)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Leistung",readonly:"",class:"text-right text-monospace",unit:"kW","model-value":e.formatPhaseArrayNumberTopic("openWB/counter/"+t.id+"/get/powers",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Leistungsfaktor",readonly:"",class:"text-right text-monospace","model-value":e.formatPhaseArrayNumberTopic("openWB/counter/"+t.id+"/get/power_factors",2)},null,8,["model-value"])])),_:2},1032,["title"])))),128)),g.numInvertersInstalled>1?((0,o.wg)(),(0,o.j4)(f,{key:1,title:"Alle Wechselrichter",subtype:"success",collapsible:!0,collapsed:!0},{default:(0,o.w5)((()=>[(0,o.Wm)(h,{title:"Zählerstand",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/pv/get/exported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Leistung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kW","model-value":e.formatNumberTopic("openWB/pv/get/power",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Erträge")])),_:1}),(0,o.Wm)(h,{title:"Heute",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/pv/get/daily_exported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Dieser Monat",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/pv/get/monthly_exported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Dieses Jahr",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/pv/get/yearly_exported",3,3,.001)},null,8,["model-value"])])),_:1})):(0,o.kq)("",!0),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(g.inverterConfigs,(t=>((0,o.wg)(),(0,o.j4)(f,{key:t.id,title:t.name+" (ID: "+t.id+")",collapsible:!0,collapsed:!0,subtype:"success"},{default:(0,o.w5)((()=>[(0,o.Wm)(v,{subtype:c.statusLevel[e.$store.state.mqtt["openWB/pv/"+t.id+"/get/fault_state"]]},{default:(0,o.w5)((()=>[1==e.$store.state.mqtt["openWB/pv/"+t.id+"/get/fault_state"]?((0,o.wg)(),(0,o.j4)(x,{key:0,"fixed-width":"",icon:["fas","exclamation-triangle"]})):2==e.$store.state.mqtt["openWB/pv/"+t.id+"/get/fault_state"]?((0,o.wg)(),(0,o.j4)(x,{key:1,"fixed-width":"",icon:["fas","times-circle"]})):((0,o.wg)(),(0,o.j4)(x,{key:2,"fixed-width":"",icon:["fas","check-circle"]})),(0,o.Uk)(" Modulmeldung:"),p,(0,o.Uk)(" "+(0,a.zw)(e.$store.state.mqtt["openWB/pv/"+t.id+"/get/fault_str"]),1)])),_:2},1032,["subtype"]),(0,o.Wm)(h,{title:"Zählerstand",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/pv/"+t.id+"/get/exported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Leistung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kW","model-value":e.formatNumberTopic("openWB/pv/"+t.id+"/get/power",3,3,.001)},null,8,["model-value"])])),_:2},1032,["title"])))),128)),g.numBatteriesInstalled>1?((0,o.wg)(),(0,o.j4)(f,{key:2,title:"Alle Speicher",subtype:"warning",collapsible:!0,collapsed:!0},{default:(0,o.w5)((()=>[(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Zählerstände")])),_:1}),(0,o.Wm)(h,{title:"Ladung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/bat/get/imported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Entladung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/bat/get/exported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Tageswerte")])),_:1}),(0,o.Wm)(h,{title:"Ladung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/bat/get/daily_imported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Entladung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/bat/get/daily_exported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Saldierte Werte")])),_:1}),(0,o.Wm)(h,{title:"Leistung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kW","model-value":e.formatNumberTopic("openWB/bat/get/power",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(y,{title:"Ladestand",readonly:"",class:"text-right text-monospace",unit:"%","model-value":e.$store.state.mqtt["openWB/bat/get/soc"]},null,8,["model-value"])])),_:1})):(0,o.kq)("",!0),((0,o.wg)(!0),(0,o.iD)(o.HY,null,(0,o.Ko)(g.batteryConfigs,(t=>((0,o.wg)(),(0,o.j4)(f,{key:t.id,title:t.name+" (ID: "+t.id+")",collapsible:!0,collapsed:!0,subtype:"warning"},{default:(0,o.w5)((()=>[(0,o.Wm)(v,{subtype:c.statusLevel[e.$store.state.mqtt["openWB/bat/"+t.id+"/get/fault_state"]]},{default:(0,o.w5)((()=>[1==e.$store.state.mqtt["openWB/bat/"+t.id+"/get/fault_state"]?((0,o.wg)(),(0,o.j4)(x,{key:0,"fixed-width":"",icon:["fas","exclamation-triangle"]})):2==e.$store.state.mqtt["openWB/bat/"+t.id+"/get/fault_state"]?((0,o.wg)(),(0,o.j4)(x,{key:1,"fixed-width":"",icon:["fas","times-circle"]})):((0,o.wg)(),(0,o.j4)(x,{key:2,"fixed-width":"",icon:["fas","check-circle"]})),(0,o.Uk)(" Modulmeldung:"),m,(0,o.Uk)(" "+(0,a.zw)(e.$store.state.mqtt["openWB/bat/"+t.id+"/get/fault_str"]),1)])),_:2},1032,["subtype"]),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Aktuelle Werte")])),_:1}),(0,o.Wm)(h,{title:"Leistung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kW","model-value":e.formatNumberTopic("openWB/bat/"+t.id+"/get/power",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(y,{title:"Ladestand",readonly:"",class:"text-right text-monospace",unit:"%","model-value":e.$store.state.mqtt["openWB/bat/"+t.id+"/get/soc"]},null,8,["model-value"]),(0,o.Wm)(W,null,{default:(0,o.w5)((()=>[(0,o.Uk)("Zählerstände")])),_:1}),(0,o.Wm)(h,{title:"Ladung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/bat/"+t.id+"/get/imported",3,3,.001)},null,8,["model-value"]),(0,o.Wm)(h,{title:"Entladung",readonly:"",class:"text-right text-monospace",step:"0.001",unit:"kWh","model-value":e.formatNumberTopic("openWB/bat/"+t.id+"/get/exported",3,3,.001)},null,8,["model-value"])])),_:2},1032,["title"])))),128))])}l(6699);var g=l(8947),h=l(1436),W=l(7810),f=l(7029);g.vI.add(h.f8k,h.eHv,h.nYk);var x={name:"OpenwbStatus",mixins:[f.Z],components:{FontAwesomeIcon:W.GN},data(){return{mqttTopicsToSubscribe:["openWB/general/extern","openWB/chargepoint/get/power","openWB/chargepoint/get/imported","openWB/chargepoint/get/exported","openWB/chargepoint/get/daily_imported","openWB/chargepoint/get/daily_exported","openWB/chargepoint/+/config","openWB/chargepoint/+/get/+","openWB/chargepoint/+/get/connected_vehicle/info","openWB/chargepoint/+/set/+","openWB/system/device/+/component/+/config","openWB/counter/+/get/+","openWB/pv/get/+","openWB/pv/+/get/+","openWB/bat/get/+","openWB/bat/+/get/+"],statusLevel:["success","warning","danger"]}},computed:{installedChargePoints:{get(){return this.getWildcardTopics("openWB/chargepoint/+/config")}},numChargePointsInstalled:{get(){return Object.keys(this.installedChargePoints).length}},counterConfigs:{get(){return this.filterComponentsByType(this.getWildcardTopics("openWB/system/device/+/component/+/config"),"counter")}},numInvertersInstalled:{get(){return Object.keys(this.inverterConfigs).length}},inverterConfigs:{get(){return this.filterComponentsByType(this.getWildcardTopics("openWB/system/device/+/component/+/config"),"inverter")}},numBatteriesInstalled:{get(){return Object.keys(this.batteryConfigs).length}},batteryConfigs:{get(){return this.filterComponentsByType(this.getWildcardTopics("openWB/system/device/+/component/+/config"),"bat")}}},methods:{filterComponentsByType(e,t){return Object.keys(e).filter((l=>e[l].type.includes(t))).reduce(((t,l)=>({...t,[l]:e[l]})),{})},getChargePointIndex(e){return parseInt(e.match(/(?:\/)(\d+)(?=\/)/)[1])},getComponentIndex(e){return parseInt(e.match(/(?:\/)(\d+)(?=\/)/)[1])}}},v=l(3744);const b=(0,v.Z)(x,[["render",c],["__scopeId","data-v-5a6e48bd"]]);var y=b}}]);
//# sourceMappingURL=Status.32efacd7.js.map