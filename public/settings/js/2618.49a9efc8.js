"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[2618],{2618:function(e,n,t){t.r(n),t.d(n,{default:function(){return p}});var i=t(6252),o=t(3577);const u={class:"device-json-counter"},r={class:"small"};function a(e,n,t,a,d,l){const s=(0,i.up)("openwb-base-heading"),p=(0,i.up)("openwb-base-text-input");return(0,i.wg)(),(0,i.iD)("div",u,[(0,i.Wm)(s,null,{default:(0,i.w5)((()=>[(0,i.Uk)(" Einstellungen für JSON Zähler "),(0,i._)("span",r,"(Modul: "+(0,o.zw)(e.$options.name)+")",1)])),_:1}),(0,i.Wm)(p,{title:"Abfrage für Leistung",subtype:"text",required:"","model-value":t.configuration.jq_power,"onUpdate:modelValue":n[0]||(n[0]=e=>l.updateConfiguration(e,"configuration.jq_power"))},null,8,["model-value"]),(0,i.Wm)(p,{title:"Abfrage für Zählerstand Bezug",subtype:"text","model-value":t.configuration.jq_imported,"onUpdate:modelValue":n[1]||(n[1]=e=>l.updateConfiguration(e,"configuration.jq_imported"))},{help:(0,i.w5)((()=>[(0,i.Uk)(" Wird dieses Feld leer gelassen, dann werden Zählerstände intern simuliert. ")])),_:1},8,["model-value"]),(0,i.Wm)(p,{title:"Abfrage für Zählerstand Einspeisung",subtype:"text","model-value":t.configuration.jq_exported,"onUpdate:modelValue":n[2]||(n[2]=e=>l.updateConfiguration(e,"configuration.jq_exported"))},{help:(0,i.w5)((()=>[(0,i.Uk)(" Wird dieses Feld leer gelassen, dann werden Zählerstände intern simuliert. ")])),_:1},8,["model-value"])])}var d={name:"DeviceJsonCounter",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration(e,n){this.$emit("update:configuration",{value:e,object:n})}}},l=t(3744);const s=(0,l.Z)(d,[["render",a]]);var p=s}}]);
//# sourceMappingURL=2618.49a9efc8.js.map