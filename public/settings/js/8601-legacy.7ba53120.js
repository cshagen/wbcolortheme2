"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[8601],{8601:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});t(8309);var i=t(6252),o=t(3577),u={class:"device-alphaess-inverter"},a=(0,i.Uk)(" Einstellungen für Alpha ESS Wechselrichter "),r={class:"small"};function s(e,n,t,s,l,d){var c=(0,i.up)("openwb-base-heading"),p=(0,i.up)("openwb-base-select-input");return(0,i.wg)(),(0,i.iD)("div",u,[(0,i.Wm)(c,null,{default:(0,i.w5)((function(){return[a,(0,i._)("span",r,"(Modul: "+(0,o.zw)(e.$options.name)+")",1)]})),_:1}),(0,i.Wm)(p,{title:"Version",notSelected:"Bitte auswählen",options:[{value:0,text:"EMS älter als 1.23V"},{value:1,text:"EMS 1.23V oder neuer"}],"model-value":t.configuration.version,"onUpdate:modelValue":n[0]||(n[0]=function(e){return d.updateConfiguration(e,"configuration.version")})},null,8,["options","model-value"])])}var l={name:"DeviceAlphaessInverter",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.$emit("update:configuration",{value:e,object:n})}}},d=t(8118);const c=(0,d.Z)(l,[["render",s]]);var p=c}}]);
//# sourceMappingURL=8601-legacy.7ba53120.js.map