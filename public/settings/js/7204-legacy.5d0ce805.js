"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[7204],{7204:function(e,n,t){t.r(n),t.d(n,{default:function(){return c}});t(8309);var i=t(6252),a=t(3577),u={class:"device-janitza"},o=(0,i.Uk)(" Einstellungen für Janitza "),r={class:"small"};function s(e,n,t,s,d,l){var p=(0,i.up)("openwb-base-heading"),c=(0,i.up)("openwb-base-text-input");return(0,i.wg)(),(0,i.iD)("div",u,[(0,i.Wm)(p,null,{default:(0,i.w5)((function(){return[o,(0,i._)("span",r,"(Modul: "+(0,a.zw)(e.$options.name)+")",1)]})),_:1}),(0,i.Wm)(c,{title:"IP oder Hostname",subtype:"host","model-value":t.configuration.ip_address,"onUpdate:modelValue":n[0]||(n[0]=function(e){return l.updateConfiguration(e,"configuration.ip_address")})},null,8,["model-value"])])}var d={name:"DeviceJanitza",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},componentId:{required:!0}},methods:{updateConfiguration:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.$emit("update:configuration",{value:e,object:n})}}},l=t(8118);const p=(0,l.Z)(d,[["render",s]]);var c=p}}]);
//# sourceMappingURL=7204-legacy.5d0ce805.js.map