"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[498],{8731:function(t,e,n){n.r(e),n.d(e,{default:function(){return f}});n(8309);var o=n(6252),i=n(3577),u={class:"device-http"},a=(0,o.Uk)(" Einstellungen für Http "),r={class:"small"},l=(0,o.Uk)(' An die IP bzw. den Hostnamen kann optional ein Port angehängt werden. Beispiel: "192.168.1.1:8080". Ist kein Port angegeben, so wird je nach Protokoll 80 (http) bzw. 443 (https) genutzt. ');function s(t,e,n,s,p,d){var c=(0,o.up)("openwb-base-heading"),f=(0,o.up)("openwb-base-text-input"),g=(0,o.up)("openwb-base-select-input");return(0,o.wg)(),(0,o.iD)("div",u,[(0,o.Wm)(c,null,{default:(0,o.w5)((function(){return[a,(0,o._)("span",r,"(Modul: "+(0,i.zw)(t.$options.name)+")",1)]})),_:1}),(0,o.Wm)(f,{title:"IP oder Hostname",subtype:"host",required:"","model-value":n.configuration.domain,"onUpdate:modelValue":e[0]||(e[0]=function(t){return d.updateConfiguration(t,"configuration.domain")})},{help:(0,o.w5)((function(){return[l]})),_:1},8,["model-value"]),(0,o.Wm)(g,{title:"Protokoll",options:[{value:"http",text:"Unverschlüsselt (http://)"},{value:"https",text:"Verschlüsselt (https://)"}],"model-value":n.configuration.protocol,"onUpdate:modelValue":e[1]||(e[1]=function(t){return d.updateConfiguration(t,"configuration.protocol")})},null,8,["options","model-value"])])}var p={name:"DeviceHttp",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},componentId:{required:!0}},methods:{updateConfiguration:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:void 0;this.$emit("update:configuration",{value:t,object:e})}}},d=n(8118);const c=(0,d.Z)(p,[["render",s]]);var f=c}}]);
//# sourceMappingURL=498-legacy.4bc43541.js.map