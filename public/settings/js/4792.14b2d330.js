"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[4792],{4792:function(e,n,o){o.r(n),o.d(n,{default:function(){return p}});var t=o(6252),u=o(3577);const i={class:"device-goodwe"},a={class:"small"};function d(e,n,o,d,s,l){const r=(0,t.up)("openwb-base-heading"),p=(0,t.up)("openwb-base-text-input"),c=(0,t.up)("openwb-base-number-input");return(0,t.wg)(),(0,t.iD)("div",i,[(0,t.Wm)(r,null,{default:(0,t.w5)((()=>[(0,t.Uk)(" Einstellungen für GoodWe "),(0,t._)("span",a,"(Modul: "+(0,u.zw)(e.$options.name)+")",1)])),_:1}),(0,t.Wm)(p,{title:"IP oder Hostname",subtype:"host",required:"","model-value":o.configuration.ip_address,"onUpdate:modelValue":n[0]||(n[0]=e=>l.updateConfiguration(e,"configuration.ip_address"))},null,8,["model-value"]),(0,t.Wm)(c,{title:"Modbus ID","model-value":o.configuration.modbus_id,min:"1",max:"255","onUpdate:modelValue":n[1]||(n[1]=e=>l.updateConfiguration(e,"configuration.modbus_id"))},null,8,["model-value"])])}var s={name:"DeviceGoodWe",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0}},methods:{updateConfiguration(e,n){this.$emit("update:configuration",{value:e,object:n})}}},l=o(3744);const r=(0,l.Z)(s,[["render",d]]);var p=r}}]);
//# sourceMappingURL=4792.14b2d330.js.map