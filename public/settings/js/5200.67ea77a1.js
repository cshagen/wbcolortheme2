"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[5200],{5200:function(e,n,t){t.r(n),t.d(n,{default:function(){return c}});var u=t(6252),o=t(3577);const i={class:"device-studer"},a=(0,u.Uk)(" Einstellungen für Studer "),s={class:"small"};function r(e,n,t,r,d,p){const l=(0,u.up)("openwb-base-heading"),c=(0,u.up)("openwb-base-text-input");return(0,u.wg)(),(0,u.iD)("div",i,[(0,u.Wm)(l,null,{default:(0,u.w5)((()=>[a,(0,u._)("span",s,"(Modul: "+(0,o.zw)(e.$options.name)+")",1)])),_:1}),(0,u.Wm)(c,{title:"IP oder Hostname",subtype:"host","model-value":t.configuration.ip_address,"onUpdate:modelValue":n[0]||(n[0]=e=>p.updateConfiguration(e,"configuration.ip_address"))},null,8,["model-value"])])}var d={name:"DeviceStuder",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},componentId:{required:!0}},methods:{updateConfiguration(e,n){this.$emit("update:configuration",{value:e,object:n})}}},p=t(8118);const l=(0,p.Z)(d,[["render",r]]);var c=l}}]);
//# sourceMappingURL=5200.67ea77a1.js.map