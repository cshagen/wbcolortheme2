"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[1258],{1258:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var i=t(6252),o=t(3577);const u={class:"device-siemens-inverter"},s=(0,i.Uk)(" Einstellungen für Siemens Wechselrichter "),a={class:"small"};function r(e,n,t,r,d,l){const c=(0,i.up)("openwb-base-heading"),p=(0,i.up)("openwb-base-text-input");return(0,i.wg)(),(0,i.iD)("div",u,[(0,i.Wm)(c,null,{default:(0,i.w5)((()=>[s,(0,i._)("span",a,"(Modul: "+(0,o.zw)(e.$options.name)+")",1)])),_:1}),(0,i.Wm)(p,{title:"IP oder Hostname",subtype:"host","model-value":t.configuration.ip_address,"onUpdate:modelValue":n[0]||(n[0]=e=>l.updateConfiguration(e,"configuration.ip_address"))},null,8,["model-value"])])}var d={name:"DeviceSiemensInverter",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration(e,n){this.$emit("update:configuration",{value:e,object:n})}}},l=t(8118);const c=(0,l.Z)(d,[["render",r]]);var p=c}}]);
//# sourceMappingURL=1258.73bf0c82.js.map