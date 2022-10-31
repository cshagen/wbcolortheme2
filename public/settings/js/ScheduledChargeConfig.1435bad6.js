"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[1124],{2151:function(e,n,t){t.r(n),t.d(n,{default:function(){return h}});var a=t(6252);const u={class:"scheduledChargeConfig"},s={name:"scheduledChargeConfigForm"},i={key:0},o={key:1};function r(e,n,t,r,d,l){const g=(0,a.up)("openwb-base-alert"),m=(0,a.up)("openwb-base-button-group-input"),h=(0,a.up)("openwb-base-card"),c=(0,a.up)("openwb-base-submit-buttons");return(0,a.wg)(),(0,a.iD)("div",u,[(0,a._)("form",s,[(0,a.Wm)(h,{title:"Phasenumschaltung"},{default:(0,a.w5)((()=>[!0===e.$store.state.mqtt["openWB/general/extern"]?((0,a.wg)(),(0,a.iD)("div",i,[(0,a.Wm)(g,{subtype:"info"},{default:(0,a.w5)((()=>[(0,a.Uk)(' Diese Einstellungen sind nicht verfügbar, solange sich diese openWB im Modus "Nur Ladepunkt" befindet. ')])),_:1})])):((0,a.wg)(),(0,a.iD)("div",o,[(0,a.Wm)(m,{title:"Anzahl Phasen",buttons:[{buttonValue:1,text:"1"},{buttonValue:3,text:"Maximum"},{buttonValue:0,text:"Automatik"}],"model-value":e.$store.state.mqtt["openWB/general/chargemode_config/scheduled_charging/phases_to_use"],"onUpdate:modelValue":n[0]||(n[0]=n=>e.updateState("openWB/general/chargemode_config/scheduled_charging/phases_to_use",n))},{help:(0,a.w5)((()=>[(0,a.Uk)(' Hier kann eingestellt werden, ob Ladevorgänge im Modus "Zielladen" mit nur einer Phase oder dem möglichen Maximum in Abhängigkeit vom Ladepunkt und Fahrzeug durchgeführt werden. Im Modus "Automatik" entscheidet die Regelung, welche Einstellung genutzt wird, um das Ziel zu erreichen. ')])),_:1},8,["model-value"])]))])),_:1}),(0,a.Wm)(c,{formName:"scheduledChargeConfigForm",onSave:n[1]||(n[1]=n=>e.$emit("save")),onReset:n[2]||(n[2]=n=>e.$emit("reset")),onDefaults:n[3]||(n[3]=n=>e.$emit("defaults"))})])])}var d=t(7029),l={name:"OpenwbScheduledChargeConfig",mixins:[d.Z],data(){return{mqttTopicsToSubscribe:["openWB/general/extern","openWB/general/chargemode_config/scheduled_charging/phases_to_use"]}}},g=t(3744);const m=(0,g.Z)(l,[["render",r]]);var h=m}}]);
//# sourceMappingURL=ScheduledChargeConfig.1435bad6.js.map