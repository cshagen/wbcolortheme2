"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[7539],{7539:function(e,n,t){t.r(n),t.d(n,{default:function(){return f}});t(8309);var u=t(6252),o=t(3577),i={class:"device-json-inverter"},r=(0,u.Uk)(" Einstellungen für JSON Wechselrichter "),a={class:"small"};function l(e,n,t,l,d,s){var c=(0,u.up)("openwb-base-heading"),f=(0,u.up)("openwb-base-text-input");return(0,u.wg)(),(0,u.iD)("div",i,[(0,u.Wm)(c,null,{default:(0,u.w5)((function(){return[r,(0,u._)("span",a,"(Modul: "+(0,o.zw)(e.$options.name)+")",1)]})),_:1}),(0,u.Wm)(f,{title:"Abfrage für Leistung",subtype:"text",required:"","model-value":t.configuration.jq_power,"onUpdate:modelValue":n[0]||(n[0]=function(e){return s.updateConfiguration(e,"configuration.jq_power")})},null,8,["model-value"]),(0,u.Wm)(f,{title:"Abfrage für Zählerstand",subtype:"text",required:"","model-value":t.configuration.jq_counter,"onUpdate:modelValue":n[1]||(n[1]=function(e){return s.updateConfiguration(e,"configuration.jq_counter")})},null,8,["model-value"])])}var d={name:"DeviceJsonInverter",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration:function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.$emit("update:configuration",{value:e,object:n})}}},s=t(8118);const c=(0,s.Z)(d,[["render",l]]);var f=c}}]);
//# sourceMappingURL=7539-legacy.e42e73f4.js.map