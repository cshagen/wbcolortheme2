"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[3283],{3283:function(e,t,n){n.r(t),n.d(t,{default:function(){return p}});var i=n(6252),o=n(3577);const u={class:"device-solaredge"},a={class:"small"};function r(e,t,n,r,s,d){const l=(0,i.up)("openwb-base-heading"),p=(0,i.up)("openwb-base-alert"),c=(0,i.up)("openwb-base-text-input"),f=(0,i.up)("openwb-base-number-input");return(0,i.wg)(),(0,i.iD)("div",u,[(0,i.Wm)(l,null,{default:(0,i.w5)((()=>[(0,i.Uk)(" Einstellungen für SolarEdge "),(0,i._)("span",a,"(Modul: "+(0,o.zw)(e.$options.name)+")",1)])),_:1}),(0,i.Wm)(p,{subtype:"info"},{default:(0,i.w5)((()=>[(0,i.Uk)(" ModbusTCP muss im Wechselrichter aktiviert werden und der Wechselrichter per LAN angebunden sein. ")])),_:1}),(0,i.Wm)(c,{title:"IP oder Hostname",subtype:"host",required:"","model-value":n.configuration.ip_address,"onUpdate:modelValue":t[0]||(t[0]=e=>d.updateConfiguration(e,"configuration.ip_address"))},null,8,["model-value"]),(0,i.Wm)(f,{title:"Port",required:"","model-value":n.configuration.port,"onUpdate:modelValue":t[1]||(t[1]=e=>d.updateConfiguration(e,"configuration.port"))},{help:(0,i.w5)((()=>[(0,i.Uk)(" Je nach Produktionsdatum und Softwareversion ist 502 oder 1502 ab Werk eingestellt. Bitte im Wechselrichter überprüfen. ")])),_:1},8,["model-value"])])}var s={name:"DeviceSolarEdge",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0}},methods:{updateConfiguration(e,t){this.$emit("update:configuration",{value:e,object:t})}}},d=n(3744);const l=(0,d.Z)(s,[["render",r]]);var p=l}}]);
//# sourceMappingURL=3283.aee5c8d1.js.map