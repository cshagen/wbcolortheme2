"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[5854],{5854:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var o=t(6252),u=t(3577);const a={class:"device-sunways"},i={class:"small"};function s(e,n,t,s,r,d){const l=(0,o.up)("openwb-base-heading"),p=(0,o.up)("openwb-base-text-input");return(0,o.wg)(),(0,o.iD)("div",a,[(0,o.Wm)(l,null,{default:(0,o.w5)((()=>[(0,o.Uk)(" Einstellungen für Sunways "),(0,o._)("span",i,"(Modul: "+(0,u.zw)(e.$options.name)+")",1)])),_:1}),(0,o.Wm)(p,{title:"IP oder Hostname",subtype:"host",required:"","model-value":t.configuration.ip_address,"onUpdate:modelValue":n[0]||(n[0]=e=>d.updateConfiguration(e,"configuration.ip_address"))},null,8,["model-value"]),(0,o.Wm)(p,{title:"Passwort",subtype:"password",required:"","model-value":t.configuration.password,"onUpdate:modelValue":n[1]||(n[1]=e=>d.updateConfiguration(e,"configuration.password"))},null,8,["model-value"])])}var r={name:"DeviceSunways",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},componentId:{required:!0}},methods:{updateConfiguration(e,n){this.$emit("update:configuration",{value:e,object:n})}}},d=t(3744);const l=(0,d.Z)(r,[["render",s]]);var p=l}}]);
//# sourceMappingURL=5854.26a31d5e.js.map