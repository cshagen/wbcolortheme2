"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[1128],{6940:function(e,t,n){n.r(t),n.d(t,{default:function(){return f}});n(8309);var u=n(6252),o=n(3577),i={class:"device-studer-inverter"},r=(0,u.Uk)(" Einstellungen für Studer Wechselrichter "),a={class:"small"},l=(0,u.Uk)("Hilfetext");function d(e,t,n,d,c,p){var s=(0,u.up)("openwb-base-heading"),f=(0,u.up)("openwb-base-button-group-input"),v=(0,u.up)("openwb-base-number-input");return(0,u.wg)(),(0,u.iD)("div",i,[(0,u.Wm)(s,null,{default:(0,u.w5)((function(){return[r,(0,u._)("span",a,"(Modul: "+(0,o.zw)(e.$options.name)+")",1)]})),_:1}),(0,u.Wm)(f,{title:"Typ der MPPT Solarladeregler",buttons:[{buttonValue:"VT",text:"VT"},{buttonValue:"VS",text:"VS"}],"model-value":n.configuration.vc_type,"onUpdate:modelValue":t[0]||(t[0]=function(e){return p.updateConfiguration(e,"configuration.vc_type")})},{help:(0,u.w5)((function(){return[l]})),_:1},8,["model-value"]),(0,u.Wm)(v,{title:"Anzahl MPPT Solarladeregler","model-value":n.configuration.vc_count,min:"1",max:"9","onUpdate:modelValue":t[1]||(t[1]=function(e){return p.updateConfiguration(e,"configuration.vc_count")})},null,8,["model-value"])])}var c={name:"DeviceStuderInverter",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.$emit("update:configuration",{value:e,object:t})}}},p=n(8118);const s=(0,p.Z)(c,[["render",d]]);var f=s}}]);
//# sourceMappingURL=1128-legacy.a5b6b187.js.map