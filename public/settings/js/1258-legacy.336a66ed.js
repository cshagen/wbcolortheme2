"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[1258],{1258:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});t(8309);var i=t(6252),u=t(3577),o={class:"device-siemens-inverter"},r=(0,i.Uk)(" Einstellungen für Siemens Wechselrichter "),a={class:"small"};function s(e,n,t,s,d,l){var c=(0,i.up)("openwb-base-heading"),p=(0,i.up)("openwb-base-text-input");return(0,i.wg)(),(0,i.iD)("div",o,[(0,i.Wm)(c,null,{default:(0,i.w5)((function(){return[r,(0,i._)("span",a,"(Modul: "+(0,u.zw)(e.$options.name)+")",1)]})),_:1}),(0,i.Wm)(p,{title:"IP oder Hostname",subtype:"host","model-value":t.configuration.ip_address,"onUpdate:modelValue":n[0]||(n[0]=function(e){return l.updateConfiguration(e,"configuration.ip_address")})},null,8,["model-value"])])}var d={name:"DeviceSiemensInverter",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.$emit("update:configuration",{value:e,object:n})}}},l=t(8118);const c=(0,l.Z)(d,[["render",s]]);var p=c}}]);
//# sourceMappingURL=1258-legacy.336a66ed.js.map