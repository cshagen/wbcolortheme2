"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[968],{968:function(e,n,u){u.r(n),u.d(n,{default:function(){return c}});var t=u(6252),o=u(3577);const i={class:"device-huawei"},a=(0,t.Uk)(" Einstellungen für Huawei "),s={class:"small"};function d(e,n,u,d,l,r){const p=(0,t.up)("openwb-base-heading"),c=(0,t.up)("openwb-base-text-input"),m=(0,t.up)("openwb-base-number-input");return(0,t.wg)(),(0,t.iD)("div",i,[(0,t.Wm)(p,null,{default:(0,t.w5)((()=>[a,(0,t._)("span",s,"(Modul: "+(0,o.zw)(e.$options.name)+")",1)])),_:1}),(0,t.Wm)(c,{title:"IP oder Hostname",subtype:"host","model-value":u.configuration.ip_address,"onUpdate:modelValue":n[0]||(n[0]=e=>r.updateConfiguration(e,"configuration.ip_address"))},null,8,["model-value"]),(0,t.Wm)(m,{title:"Modbus ID","model-value":u.configuration.modbus_id,min:"1",max:"255","onUpdate:modelValue":n[1]||(n[1]=e=>r.updateConfiguration(e,"configuration.modbus_id"))},null,8,["model-value"])])}var l={name:"DeviceHuawei",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},componentId:{required:!0}},methods:{updateConfiguration(e,n){this.$emit("update:configuration",{value:e,object:n})}}},r=u(8118);const p=(0,r.Z)(l,[["render",d]]);var c=p}}]);
//# sourceMappingURL=968.4c9f1026.js.map