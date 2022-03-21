"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[5595],{193:function(e,a,l){l.r(a),l.d(a,{default:function(){return P}});var t=l(6252);const n={class:"pvChargeConfig"},o={name:"pvChargeConfigForm"},i={key:0},r=(0,t.Uk)(' Diese Einstellungen sind nicht verfügbar, solange sich diese openWB im Modus "Nur Ladepunkt" befindet. '),g={key:1},u=(0,t.Uk)("Hilfetext"),c=(0,t.Uk)(" Untere Grenze des Regelbereichs. "),d=(0,t.Uk)("Obere Grenze des Regelbereichs."),s=(0,t.Uk)(' Parameter für den 70%-Regelpunkt im Modus PV-Laden. Dieser Parameter ist nur wirksam bei der Einstellung "70%-Regelung eingeschaltet". Der hier eingetragene Wert sollte zur optimalen Eigenverbrauchssteuerung 70% der installierten Generatorleistung betragen.'),p=(0,t._)("br",null,null,-1),h=(0,t.Uk)(" Die Nutzung dieser Option ergibt nur Sinn wenn ein Wechselrichter und Smart-Meter verbaut ist welches eine dynamische Begrenzung der Einspeiseleistung bietet. "),_=(0,t._)("hr",null,null,-1),m=(0,t.Uk)("Hilfetext"),v=(0,t.Uk)("Hilfetext"),b=(0,t._)("hr",null,null,-1),f=(0,t.Uk)("Hilfetext"),W=(0,t.Uk)("Hilfetext"),w={key:0},B=(0,t.Uk)(' Diese Einstellungen sind nicht verfügbar, solange sich diese openWB im Modus "Nur Ladepunkt" befindet. '),k={key:1},U=(0,t.Uk)("Hilfetext"),x={key:0},S=(0,t.Uk)(' Diese Einstellungen sind nicht verfügbar, solange sich diese openWB im Modus "Nur Ladepunkt" befindet. '),V={key:1},y=(0,t.Uk)("Hilfetext"),q=(0,t.Uk)("Hilfetext"),$=(0,t.Uk)("Hilfetext"),C=(0,t.Uk)("Zahl mit Einheit"),E=(0,t.Uk)("Zahl mit Einheit"),M=(0,t.Uk)("Hilfetext");function D(e,a,l,D,z,H){const R=(0,t.up)("openwb-base-alert"),A=(0,t.up)("openwb-base-button-group-input"),P=(0,t.up)("openwb-base-number-input"),L=(0,t.up)("openwb-base-card"),N=(0,t.up)("openwb-base-range-input"),Z=(0,t.up)("openwb-base-submit-buttons");return(0,t.wg)(),(0,t.iD)("div",n,[(0,t._)("form",o,[(0,t.Wm)(L,{title:"Regelparameter"},{default:(0,t.w5)((()=>[!0===e.$store.state.mqtt["openWB/general/extern"]?((0,t.wg)(),(0,t.iD)("div",i,[(0,t.Wm)(R,{subtype:"info"},{default:(0,t.w5)((()=>[r])),_:1})])):((0,t.wg)(),(0,t.iD)("div",g,[(0,t.Wm)(A,{title:"Regelmodus",buttons:[{buttonValue:"export",text:"Einspeisung"},{buttonValue:"import",text:"Bezug"},{buttonValue:"individual",text:"Individuell"}],"model-value":H.calculateControlMode(),"onUpdate:modelValue":a[0]||(a[0]=e=>H.setControlMode(e))},{help:(0,t.w5)((()=>[u])),_:1},8,["model-value"]),"individual"===H.calculateControlMode()?((0,t.wg)(),(0,t.j4)(P,{key:0,title:"Minimum",unit:"W","model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/control_range"][0],"onUpdate:modelValue":a[1]||(a[1]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/control_range",a,"0"))},{help:(0,t.w5)((()=>[c])),_:1},8,["model-value"])):(0,t.kq)("",!0),"individual"===H.calculateControlMode()?((0,t.wg)(),(0,t.j4)(P,{key:1,title:"Maximum",unit:"W","model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/control_range"][1],"onUpdate:modelValue":a[2]||(a[2]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/control_range",a,"1"))},{help:(0,t.w5)((()=>[d])),_:1},8,["model-value"])):(0,t.kq)("",!0),(0,t.Wm)(P,{title:"Regelpunkt Einspeisegrenze",min:0,step:50,unit:"W","model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/feed_in_yield"],"onUpdate:modelValue":a[3]||(a[3]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/feed_in_yield",a))},{help:(0,t.w5)((()=>[s,p,h])),_:1},8,["model-value"]),_,(0,t.Wm)(P,{title:"Einschaltschwelle",min:0,step:50,unit:"W","model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/switch_on_threshold"],"onUpdate:modelValue":a[4]||(a[4]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/switch_on_threshold",a))},{help:(0,t.w5)((()=>[m])),_:1},8,["model-value"]),(0,t.Wm)(P,{title:"Einschaltverzögerung",min:0,step:1,unit:"s","model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/switch_on_delay"],"onUpdate:modelValue":a[5]||(a[5]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/switch_on_delay",a))},{help:(0,t.w5)((()=>[v])),_:1},8,["model-value"]),b,(0,t.Wm)(P,{title:"Abschaltschwelle",min:0,step:5,unit:"W","model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/switch_off_threshold"],"onUpdate:modelValue":a[6]||(a[6]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/switch_off_threshold",a))},{help:(0,t.w5)((()=>[f])),_:1},8,["model-value"]),(0,t.Wm)(P,{title:"Abschaltverzögerung",min:0,step:1,unit:"s","model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/switch_off_delay"],"onUpdate:modelValue":a[7]||(a[7]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/switch_off_delay",a))},{help:(0,t.w5)((()=>[W])),_:1},8,["model-value"])]))])),_:1}),(0,t.Wm)(L,{title:"Phasenumschaltung"},{default:(0,t.w5)((()=>[!0===e.$store.state.mqtt["openWB/general/extern"]?((0,t.wg)(),(0,t.iD)("div",w,[(0,t.Wm)(R,{subtype:"info"},{default:(0,t.w5)((()=>[B])),_:1})])):((0,t.wg)(),(0,t.iD)("div",k,[(0,t.Wm)(A,{title:"Anzahl Phasen",buttons:[{buttonValue:1,text:"1"},{buttonValue:3,text:"Maximum"},{buttonValue:0,text:"Automatik"}],"model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/phases_to_use"],"onUpdate:modelValue":a[8]||(a[8]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/phases_to_use",a))},{help:(0,t.w5)((()=>[U])),_:1},8,["model-value"])]))])),_:1}),(0,t.Wm)(L,{title:"Speicher-Beachtung"},{default:(0,t.w5)((()=>[!0===e.$store.state.mqtt["openWB/general/extern"]?((0,t.wg)(),(0,t.iD)("div",x,[(0,t.Wm)(R,{subtype:"info"},{default:(0,t.w5)((()=>[S])),_:1})])):((0,t.wg)(),(0,t.iD)("div",V,[(0,t.Wm)(A,{title:"Priorisierung",buttons:[{buttonValue:!1,text:"Fahrzeuge"},{buttonValue:!0,text:"Speicher"}],"model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/bat_prio"],"onUpdate:modelValue":a[9]||(a[9]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/bat_prio",a))},{help:(0,t.w5)((()=>[y])),_:1},8,["model-value"]),(0,t.Wm)(N,{title:"Einschalt-SoC",min:0,max:19,step:1,unit:"%",labels:[{label:"Aus",value:0},{label:5,value:5},{label:10,value:10},{label:15,value:15},{label:20,value:20},{label:25,value:25},{label:30,value:30},{label:35,value:35},{label:40,value:40},{label:45,value:45},{label:50,value:50},{label:55,value:55},{label:60,value:60},{label:65,value:65},{label:70,value:70},{label:75,value:75},{label:80,value:80},{label:85,value:85},{label:90,value:90},{label:95,value:95}],"model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/switch_on_soc"],"onUpdate:modelValue":a[10]||(a[10]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/switch_on_soc",a))},{help:(0,t.w5)((()=>[q])),_:1},8,["model-value"]),(0,t.Wm)(N,{title:"Ausschalt-SoC",min:0,max:19,step:1,unit:"%",labels:[{label:"Aus",value:0},{label:5,value:5},{label:10,value:10},{label:15,value:15},{label:20,value:20},{label:25,value:25},{label:30,value:30},{label:35,value:35},{label:40,value:40},{label:45,value:45},{label:50,value:50},{label:55,value:55},{label:60,value:60},{label:65,value:65},{label:70,value:70},{label:75,value:75},{label:80,value:80},{label:85,value:85},{label:90,value:90},{label:95,value:95}],"model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/switch_off_soc"],"onUpdate:modelValue":a[11]||(a[11]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/switch_off_soc",a))},{help:(0,t.w5)((()=>[$])),_:1},8,["model-value"]),(0,t.Wm)(P,{title:"Reservierte Ladeleistung",min:0,step:100,unit:"W","model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/charging_power_reserve"],"onUpdate:modelValue":a[12]||(a[12]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/charging_power_reserve",a))},{help:(0,t.w5)((()=>[C])),_:1},8,["model-value"]),(0,t.Wm)(P,{title:"Erlaubte Entladeleistung",min:0,step:100,unit:"W","model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/rundown_power"],"onUpdate:modelValue":a[13]||(a[13]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/rundown_power",a))},{help:(0,t.w5)((()=>[E])),_:1},8,["model-value"]),(0,t.Wm)(N,{title:"Minimaler Entlade-SoC",min:0,max:20,step:1,unit:"%",labels:[{label:0,value:0},{label:5,value:5},{label:10,value:10},{label:15,value:15},{label:20,value:20},{label:25,value:25},{label:30,value:30},{label:35,value:35},{label:40,value:40},{label:45,value:45},{label:50,value:50},{label:55,value:55},{label:60,value:60},{label:65,value:65},{label:70,value:70},{label:75,value:75},{label:80,value:80},{label:85,value:85},{label:90,value:90},{label:95,value:95},{label:"Aus",value:100}],"model-value":e.$store.state.mqtt["openWB/general/chargemode_config/pv_charging/rundown_soc"],"onUpdate:modelValue":a[14]||(a[14]=a=>e.updateState("openWB/general/chargemode_config/pv_charging/rundown_soc",a))},{help:(0,t.w5)((()=>[M])),_:1},8,["model-value"])]))])),_:1}),(0,t.Wm)(Z,{formName:"pvChargeConfigForm",onSave:a[15]||(a[15]=a=>e.$emit("save")),onReset:a[16]||(a[16]=a=>e.$emit("reset")),onDefaults:a[17]||(a[17]=a=>e.$emit("defaults"))})])])}var z=l(6061),H={name:"OpenwbPVChargeConfig",mixins:[z.Z],methods:{calculateControlMode(){const e="openWB/general/chargemode_config/pv_charging/control_range";let a=this.$store.state.mqtt[e];if("undefined"!=typeof a)return-230===a[0]&&0===a[1]?"export":0===a[0]&&230===a[1]?"import":"individual"},setControlMode(e){const a="openWB/general/chargemode_config/pv_charging/control_range";switch(console.debug("set controlMode",e),e){case"export":this.updateState(a,[-230,0]);break;case"import":this.updateState(a,[0,230]);break;case"individual":this.updateState(a,[-230,230]);break}}},data(){return{mqttTopicsToSubscribe:["openWB/general/extern","openWB/general/chargemode_config/pv_charging/control_range","openWB/general/chargemode_config/pv_charging/feed_in_yield","openWB/general/chargemode_config/pv_charging/switch_on_threshold","openWB/general/chargemode_config/pv_charging/switch_on_delay","openWB/general/chargemode_config/pv_charging/switch_off_threshold","openWB/general/chargemode_config/pv_charging/switch_off_delay","openWB/general/chargemode_config/pv_charging/phases_to_use","openWB/general/chargemode_config/pv_charging/bat_prio","openWB/general/chargemode_config/pv_charging/switch_on_soc","openWB/general/chargemode_config/pv_charging/switch_off_soc","openWB/general/chargemode_config/pv_charging/charging_power_reserve","openWB/general/chargemode_config/pv_charging/rundown_power","openWB/general/chargemode_config/pv_charging/rundown_soc"]}}},R=l(8118);const A=(0,R.Z)(H,[["render",D]]);var P=A}}]);
//# sourceMappingURL=PVChargeConfig.df0091cb.js.map