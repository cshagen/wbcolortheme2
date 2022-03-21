"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[8268],{45:function(e,t,o){o.r(t),o.d(t,{default:function(){return W}});var n=o(6252),a=o(3577);const i={class:"debugging"},s={name:"debugConfigForm"},l={key:0},d=(0,n.Uk)(' Diese Einstellungen sind nicht verfügbar, solange sich diese openWB im Modus "Nur Ladepunkt" befindet. '),u={key:1},r=(0,n.Uk)(' Wenn der Debug Level auf "Info" oder "Details" gesetzt wird, werden mehr Informationen in die Logdateien geschrieben. Im normalen Betrieb sollte immer "Warnungen und Fehler" gewählt werden, um die Schreibvorgänge auf der SD-Karte zu reduzieren. ');function g(e,t,o,g,c,m){const p=(0,n.up)("openwb-base-alert"),b=(0,n.up)("openwb-base-button-group-input"),w=(0,n.up)("openwb-base-card"),f=(0,n.up)("openwb-base-submit-buttons"),h=(0,n.up)("font-awesome-icon"),W=(0,n.up)("openwb-base-avatar");return(0,n.wg)(),(0,n.iD)("div",i,[(0,n._)("form",s,[(0,n.Wm)(w,{title:"Protokollierung"},{default:(0,n.w5)((()=>[!0===e.$store.state.mqtt["openWB/general/extern"]?((0,n.wg)(),(0,n.iD)("div",l,[(0,n.Wm)(p,{subtype:"info"},{default:(0,n.w5)((()=>[d])),_:1})])):((0,n.wg)(),(0,n.iD)("div",u,[(0,n.Wm)(b,{title:"Debug Level",buttons:[{buttonValue:30,text:"Warnungen und Fehler"},{buttonValue:20,text:"Info"},{buttonValue:10,text:"Details"}],"model-value":e.$store.state.mqtt["openWB/system/debug_level"],"onUpdate:modelValue":t[0]||(t[0]=t=>e.updateState("openWB/system/debug_level",t))},{help:(0,n.w5)((()=>[r])),_:1},8,["model-value"])]))])),_:1}),(0,n.Wm)(f,{formName:"debugConfigForm",onSave:t[1]||(t[1]=t=>e.$emit("save")),onReset:t[2]||(t[2]=t=>e.$emit("reset")),onDefaults:t[3]||(t[3]=t=>e.$emit("defaults"))})]),(0,n.Wm)(w,{title:"Main.log",class:"mt-3",collapsible:!0,collapsed:!0},{actions:(0,n.w5)((()=>[(0,n.Wm)(W,{class:"bg-success clickable",onClick:t[4]||(t[4]=e=>m.loadMainLog(e))},{default:(0,n.w5)((()=>[(0,n.Wm)(h,{"fixed-width":"",icon:["fas","file-download"]})])),_:1})])),default:(0,n.w5)((()=>[(0,n._)("pre",null,(0,a.zw)(c.mainLog),1)])),_:1}),(0,n.Wm)(w,{title:"Mqtt.log",class:"mt-3",collapsible:!0,collapsed:!0},{actions:(0,n.w5)((()=>[(0,n.Wm)(W,{class:"bg-success clickable",onClick:t[5]||(t[5]=e=>m.loadMqttLog(e))},{default:(0,n.w5)((()=>[(0,n.Wm)(h,{"fixed-width":"",icon:["fas","file-download"]})])),_:1})])),default:(0,n.w5)((()=>[(0,n._)("pre",null,(0,a.zw)(c.mqttLog),1)])),_:1}),(0,n.Wm)(w,{title:"Protokoll des letzten Updates",class:"mt-3",collapsible:!0,collapsed:!0},{actions:(0,n.w5)((()=>[(0,n.Wm)(W,{class:"bg-success clickable",onClick:t[6]||(t[6]=e=>m.loadUpdateLog(e))},{default:(0,n.w5)((()=>[(0,n.Wm)(h,{"fixed-width":"",icon:["fas","file-download"]})])),_:1})])),default:(0,n.w5)((()=>[(0,n._)("pre",null,(0,a.zw)(c.updateLog),1)])),_:1})])}var c=o(8947),m=o(1436),p=o(7810),b=o(6061);c.vI.add(m.kwI);var w={name:"OpenwbDebugging",mixins:[b.Z],components:{FontAwesomeIcon:p.GN},data(){return{mqttTopicsToSubscribe:["openWB/general/extern","openWB/system/debug_level"],mainLog:"-- noch nicht geladen --",mqttLog:"-- noch nicht geladen --",updateLog:"-- noch nicht geladen --"}},methods:{async getFilePromise(e){return this.axios.get(location.protocol+"//"+location.host+e).then((e=>e.data)).catch((e=>e.response?"A 404 is expected if running node.js dev server!\n"+e.response.data:e.request?e.request:e.message))},loadMainLog(e){e.stopPropagation(),this.mainLog="wird aktualisiert...",this.getFilePromise("/openWB/ramdisk/main.log").then((e=>{this.mainLog=e}))},loadMqttLog(e){e.stopPropagation(),this.mqttLog="wird aktualisiert...",this.getFilePromise("/openWB/ramdisk/mqtt.log").then((e=>{this.mqttLog=e}))},loadUpdateLog(e){e.stopPropagation(),this.updateLog="wird aktualisiert...",this.getFilePromise("/openWB/data/log/update.log").then((e=>{this.updateLog=e}))}}},f=o(8118);const h=(0,f.Z)(w,[["render",g]]);var W=h}}]);
//# sourceMappingURL=DebugConfig.d229e27a.js.map