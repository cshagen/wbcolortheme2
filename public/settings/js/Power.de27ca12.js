"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[6136],{6679:function(e,t,n){n.r(t),n.d(t,{default:function(){return L}});var s=n(6252);const a={class:"power"},o=(0,s._)("h2",null,"Achtung!",-1),d=(0,s._)("p",null," Vor allen Aktionen auf dieser Seite ist sicherzustellen, dass kein Ladevorgang aktiv ist! Zur Sicherheit bitte zusätzlich alle Fahrzeuge von der Ladestation / den Ladestationen abstecken! ",-1),i={name:"updateForm"},l=(0,s.Uk)(" Nach einem Update wird die Ladestation direkt neu gestartet! "),r=(0,s._)("p",null," Es werden alle lokalen Änderungen mit dem Update verworfen! ",-1),u=(0,s.Uk)(" ToDo: "),c=(0,s._)("ul",null,[(0,s._)("li",null,"fetch tags from git"),(0,s._)("li",null,"allow tag selection (no downgrade!)"),(0,s._)("li",null,"release notes?")],-1),m={class:"row justify-content-center"},w={class:"col-md-4 d-flex py-1 justify-content-center"},f=(0,s.Uk)(" Update "),p={name:"powerForm"},_=(0,s.Uk)(" Wenn die Ladestation ausgeschaltet wird, muss sie komplett spannungsfrei geschaltet werden. Erst beim erneuten Zuschalten der Spannung fährt das System wieder hoch. "),b={class:"row justify-content-center"},h={class:"col-md-4 d-flex py-1 justify-content-center"},g=(0,s.Uk)(" Neustart "),k={class:"col-md-4 d-flex py-1 justify-content-center"},y=(0,s.Uk)(" Ausschalten ");function v(e,t,n,v,W,C){const S=(0,s.up)("openwb-base-alert"),U=(0,s.up)("font-awesome-icon"),x=(0,s.up)("openwb-base-click-button"),j=(0,s.up)("openwb-base-card");return(0,s.wg)(),(0,s.iD)("div",a,[(0,s.Wm)(S,{subtype:"danger"},{default:(0,s.w5)((()=>[o,d])),_:1}),(0,s._)("form",i,[(0,s.Wm)(j,{title:"Versionsverwaltung"},{footer:(0,s.w5)((()=>[(0,s._)("div",m,[(0,s._)("div",w,[(0,s.Wm)(x,{class:"btn-success",onClick:t[0]||(t[0]=e=>C.sendSystemCommand("systemUpdate"))},{default:(0,s.w5)((()=>[f,(0,s.Wm)(U,{"fixed-width":"",icon:["fas","arrow-alt-circle-up"]})])),_:1})])])])),default:(0,s.w5)((()=>[(0,s.Wm)(S,{subtype:"danger"},{default:(0,s.w5)((()=>[l])),_:1}),(0,s.Wm)(S,{subtype:"warning"},{default:(0,s.w5)((()=>[r,u,c])),_:1})])),_:1})]),(0,s._)("form",p,[(0,s.Wm)(j,{title:"Betrieb"},{footer:(0,s.w5)((()=>[(0,s._)("div",b,[(0,s._)("div",h,[(0,s.Wm)(x,{class:"btn-warning",onClick:t[1]||(t[1]=e=>C.sendSystemCommand("systemReboot"))},{default:(0,s.w5)((()=>[g,(0,s.Wm)(U,{"fixed-width":"",icon:["fas","undo"]})])),_:1})]),(0,s._)("div",k,[(0,s.Wm)(x,{class:"btn-danger",onClick:t[2]||(t[2]=e=>C.sendSystemCommand("systemShutdown"))},{default:(0,s.w5)((()=>[y,(0,s.Wm)(U,{"fixed-width":"",icon:["fas","power-off"]})])),_:1})])])])),default:(0,s.w5)((()=>[(0,s.Wm)(S,{subtype:"danger"},{default:(0,s.w5)((()=>[_])),_:1})])),_:1})])])}var W=n(8947),C=n(1436),S=n(7810),U=n(6061);W.vI.add(C.q9j,C.X7o,C.oTz);var x={name:"OpenwbSupport",mixins:[U.Z],emits:["sendCommand"],components:{FontAwesomeIcon:S.GN},data(){return{mqttTopicsToSubscribe:[]}},methods:{sendSystemCommand(e){this.$emit("sendCommand",{command:e,data:{}})}}},j=n(8118);const z=(0,j.Z)(x,[["render",v]]);var L=z}}]);
//# sourceMappingURL=Power.de27ca12.js.map