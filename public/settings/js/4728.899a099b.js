"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[4728],{4728:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var u=t(6252),o=t(3577);const i={class:"device-discovergy"},a={class:"small"};function s(e,n,t,s,r,d){const l=(0,u.up)("openwb-base-heading"),p=(0,u.up)("openwb-base-text-input");return(0,u.wg)(),(0,u.iD)("div",i,[(0,u.Wm)(l,null,{default:(0,u.w5)((()=>[(0,u.Uk)(" Einstellungen für Discovergy "),(0,u._)("span",a,"(Modul: "+(0,o.zw)(e.$options.name)+")",1)])),_:1}),(0,u.Wm)(p,{title:"Benutzername",subtype:"user",required:"","model-value":t.configuration.user,"onUpdate:modelValue":n[0]||(n[0]=e=>d.updateConfiguration(e,"configuration.user"))},null,8,["model-value"]),(0,u.Wm)(p,{title:"Passwort",subtype:"password",required:"","model-value":t.configuration.password,"onUpdate:modelValue":n[1]||(n[1]=e=>d.updateConfiguration(e,"configuration.password"))},null,8,["model-value"])])}var r={name:"DeviceDiscovergy",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0}},methods:{updateConfiguration(e,n){this.$emit("update:configuration",{value:e,object:n})}}},d=t(3744);const l=(0,d.Z)(r,[["render",s]]);var p=l}}]);
//# sourceMappingURL=4728.899a099b.js.map