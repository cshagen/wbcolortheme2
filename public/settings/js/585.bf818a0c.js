"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[585],{585:function(e,n,t){t.r(n),t.d(n,{default:function(){return m}});var o=t(6252),i=t(3577);const u={class:"device-fronius"},a=(0,o.Uk)(" Einstellungen für Fronius "),r={class:"small"},s=(0,o.Uk)(' ToDo: Einstellung "Meter ID" ist nur für Zähler relevant. In diese Komponenten verschieben. ');function l(e,n,t,l,d,p){const c=(0,o.up)("openwb-base-heading"),m=(0,o.up)("openwb-base-text-input"),f=(0,o.up)("openwb-base-number-input"),b=(0,o.up)("openwb-base-alert");return(0,o.wg)(),(0,o.iD)("div",u,[(0,o.Wm)(c,null,{default:(0,o.w5)((()=>[a,(0,o._)("span",r,"(Modul: "+(0,i.zw)(e.$options.name)+")",1)])),_:1}),(0,o.Wm)(m,{title:"IP oder Hostname",subtype:"host","model-value":t.configuration.ip_address,"onUpdate:modelValue":n[0]||(n[0]=e=>p.updateConfiguration(e,"configuration.ip_address"))},null,8,["model-value"]),(0,o.Wm)(f,{title:"Meter ID","model-value":t.configuration.meter_id,min:"0",max:"1","onUpdate:modelValue":n[1]||(n[1]=e=>p.updateConfiguration(e,"configuration.meter_id"))},null,8,["model-value"]),(0,o.Wm)(b,{subtype:"warning"},{default:(0,o.w5)((()=>[s])),_:1})])}var d={name:"DeviceFronius",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},componentId:{required:!0}},methods:{updateConfiguration(e,n){this.$emit("update:configuration",{value:e,object:n})}}},p=t(8118);const c=(0,p.Z)(d,[["render",l]]);var m=c}}]);
//# sourceMappingURL=585.bf818a0c.js.map