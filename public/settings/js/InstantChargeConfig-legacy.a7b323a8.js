"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[7093],{3078:function(e,n,t){t.r(n),t.d(n,{default:function(){return b}});var a=t(6252),u={class:"instantChargeConfig"},o={name:"instantChargeConfigForm"},i={key:0},r=(0,a.Uk)(' Diese Einstellungen sind nicht verfügbar, solange sich diese openWB im Modus "Nur Ladepunkt" befindet. '),s={key:1},g=(0,a.Uk)("Hilfetext");function c(e,n,t,c,f,l){var p=(0,a.up)("openwb-base-alert"),m=(0,a.up)("openwb-base-button-group-input"),b=(0,a.up)("openwb-base-card"),d=(0,a.up)("openwb-base-submit-buttons");return(0,a.wg)(),(0,a.iD)("div",u,[(0,a._)("form",o,[(0,a.Wm)(b,{title:"Phasenumschaltung"},{default:(0,a.w5)((function(){return[!0===e.$store.state.mqtt["openWB/general/extern"]?((0,a.wg)(),(0,a.iD)("div",i,[(0,a.Wm)(p,{subtype:"info"},{default:(0,a.w5)((function(){return[r]})),_:1})])):((0,a.wg)(),(0,a.iD)("div",s,[(0,a.Wm)(m,{title:"Anzahl Phasen",buttons:[{buttonValue:1,text:"1"},{buttonValue:3,text:"Maximum"}],"model-value":e.$store.state.mqtt["openWB/general/chargemode_config/instant_charging/phases_to_use"],"onUpdate:modelValue":n[0]||(n[0]=function(n){return e.updateState("openWB/general/chargemode_config/instant_charging/phases_to_use",n)})},{help:(0,a.w5)((function(){return[g]})),_:1},8,["model-value"])]))]})),_:1}),(0,a.Wm)(d,{formName:"instantChargeConfigForm",onSave:n[1]||(n[1]=function(n){return e.$emit("save")}),onReset:n[2]||(n[2]=function(n){return e.$emit("reset")}),onDefaults:n[3]||(n[3]=function(n){return e.$emit("defaults")})})])])}var f=t(4912),l={name:"OpenwbInstantChargeConfig",mixins:[f.Z],data:function(){return{mqttTopicsToSubscribe:["openWB/general/extern","openWB/general/chargemode_config/instant_charging/phases_to_use"]}}},p=t(8118);const m=(0,p.Z)(l,[["render",c]]);var b=m}}]);
//# sourceMappingURL=InstantChargeConfig-legacy.a7b323a8.js.map