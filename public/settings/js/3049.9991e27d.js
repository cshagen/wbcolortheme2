"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[3049],{3049:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var u=t(6252),o=t(3577);const i={class:"device-victron-inverter"},a={class:"small"};function r(e,n,t,r,l,d){const s=(0,u.up)("openwb-base-heading"),p=(0,u.up)("openwb-base-number-input"),c=(0,u.up)("openwb-base-button-group-input");return(0,u.wg)(),(0,u.iD)("div",i,[(0,u.Wm)(s,null,{default:(0,u.w5)((()=>[(0,u.Uk)(" Einstellungen für Victron Wechselrichter "),(0,u._)("span",a,"(Modul: "+(0,o.zw)(e.$options.name)+")",1)])),_:1}),(0,u.Wm)(p,{title:"Modbus-ID",min:1,max:255,required:"","model-value":t.configuration.modbus_id,"onUpdate:modelValue":n[0]||(n[0]=e=>d.updateConfiguration(e,"configuration.modbus_id"))},null,8,["model-value"]),(0,u.Wm)(c,{title:"MPPT",buttons:[{buttonValue:!1,text:"Nein"},{buttonValue:!0,text:"Ja"}],"model-value":t.configuration.mppt,"onUpdate:modelValue":n[1]||(n[1]=e=>d.updateConfiguration(e,"configuration.mppt"))},null,8,["model-value"])])}var l={name:"DeviceVictronInverter",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration(e,n){this.$emit("update:configuration",{value:e,object:n})}}},d=t(3744);const s=(0,d.Z)(l,[["render",r]]);var p=s}}]);
//# sourceMappingURL=3049.9991e27d.js.map