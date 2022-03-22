(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[8268],{5725:function(t,e,n){"use strict";n.r(e),n.d(e,{default:function(){return L}});var r=n(6252),o=n(3577),i={class:"debugging"},a={name:"debugConfigForm"},u={key:0},c=(0,r.Uk)(' Diese Einstellungen sind nicht verfügbar, solange sich diese openWB im Modus "Nur Ladepunkt" befindet. '),s={key:1},l=(0,r.Uk)(' Wenn der Debug Level auf "Info" oder "Details" gesetzt wird, werden mehr Informationen in die Logdateien geschrieben. Im normalen Betrieb sollte immer "Warnungen und Fehler" gewählt werden, um die Schreibvorgänge auf der SD-Karte zu reduzieren. ');function f(t,e,n,f,h,d){var p=(0,r.up)("openwb-base-alert"),g=(0,r.up)("openwb-base-button-group-input"),m=(0,r.up)("openwb-base-card"),v=(0,r.up)("openwb-base-submit-buttons"),w=(0,r.up)("font-awesome-icon"),y=(0,r.up)("openwb-base-avatar");return(0,r.wg)(),(0,r.iD)("div",i,[(0,r._)("form",a,[(0,r.Wm)(m,{title:"Protokollierung"},{default:(0,r.w5)((function(){return[!0===t.$store.state.mqtt["openWB/general/extern"]?((0,r.wg)(),(0,r.iD)("div",u,[(0,r.Wm)(p,{subtype:"info"},{default:(0,r.w5)((function(){return[c]})),_:1})])):((0,r.wg)(),(0,r.iD)("div",s,[(0,r.Wm)(g,{title:"Debug Level",buttons:[{buttonValue:30,text:"Warnungen und Fehler"},{buttonValue:20,text:"Info"},{buttonValue:10,text:"Details"}],"model-value":t.$store.state.mqtt["openWB/system/debug_level"],"onUpdate:modelValue":e[0]||(e[0]=function(e){return t.updateState("openWB/system/debug_level",e)})},{help:(0,r.w5)((function(){return[l]})),_:1},8,["model-value"])]))]})),_:1}),(0,r.Wm)(v,{formName:"debugConfigForm",onSave:e[1]||(e[1]=function(e){return t.$emit("save")}),onReset:e[2]||(e[2]=function(e){return t.$emit("reset")}),onDefaults:e[3]||(e[3]=function(e){return t.$emit("defaults")})})]),(0,r.Wm)(m,{title:"Main.log",class:"mt-3",collapsible:!0,collapsed:!0},{actions:(0,r.w5)((function(){return[(0,r.Wm)(y,{class:"bg-success clickable",onClick:e[4]||(e[4]=function(t){return d.loadMainLog(t)})},{default:(0,r.w5)((function(){return[(0,r.Wm)(w,{"fixed-width":"",icon:["fas","file-download"]})]})),_:1})]})),default:(0,r.w5)((function(){return[(0,r._)("pre",null,(0,o.zw)(h.mainLog),1)]})),_:1}),(0,r.Wm)(m,{title:"Mqtt.log",class:"mt-3",collapsible:!0,collapsed:!0},{actions:(0,r.w5)((function(){return[(0,r.Wm)(y,{class:"bg-success clickable",onClick:e[5]||(e[5]=function(t){return d.loadMqttLog(t)})},{default:(0,r.w5)((function(){return[(0,r.Wm)(w,{"fixed-width":"",icon:["fas","file-download"]})]})),_:1})]})),default:(0,r.w5)((function(){return[(0,r._)("pre",null,(0,o.zw)(h.mqttLog),1)]})),_:1}),(0,r.Wm)(m,{title:"Protokoll des letzten Updates",class:"mt-3",collapsible:!0,collapsed:!0},{actions:(0,r.w5)((function(){return[(0,r.Wm)(y,{class:"bg-success clickable",onClick:e[6]||(e[6]=function(t){return d.loadUpdateLog(t)})},{default:(0,r.w5)((function(){return[(0,r.Wm)(w,{"fixed-width":"",icon:["fas","file-download"]})]})),_:1})]})),default:(0,r.w5)((function(){return[(0,r._)("pre",null,(0,o.zw)(h.updateLog),1)]})),_:1})])}n(1539);function h(t,e,n,r,o,i,a){try{var u=t[i](a),c=u.value}catch(s){return void n(s)}u.done?e(c):Promise.resolve(c).then(r,o)}function d(t){return function(){var e=this,n=arguments;return new Promise((function(r,o){var i=t.apply(e,n);function a(t){h(i,r,o,a,u,"next",t)}function u(t){h(i,r,o,a,u,"throw",t)}a(void 0)}))}}n(5666);var p=n(8947),g=n(1436),m=n(7810),v=n(4912);p.vI.add(g.kwI);var w={name:"OpenwbDebugging",mixins:[v.Z],components:{FontAwesomeIcon:m.GN},data:function(){return{mqttTopicsToSubscribe:["openWB/general/extern","openWB/system/debug_level"],mainLog:"-- noch nicht geladen --",mqttLog:"-- noch nicht geladen --",updateLog:"-- noch nicht geladen --"}},methods:{getFilePromise:function(t){var e=this;return d(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.abrupt("return",e.axios.get(location.protocol+"//"+location.host+t).then((function(t){return t.data})).catch((function(t){return t.response?"A 404 is expected if running node.js dev server!\n"+t.response.data:t.request?t.request:t.message})));case 1:case"end":return n.stop()}}),n)})))()},loadMainLog:function(t){var e=this;t.stopPropagation(),this.mainLog="wird aktualisiert...",this.getFilePromise("/openWB/ramdisk/main.log").then((function(t){e.mainLog=t}))},loadMqttLog:function(t){var e=this;t.stopPropagation(),this.mqttLog="wird aktualisiert...",this.getFilePromise("/openWB/ramdisk/mqtt.log").then((function(t){e.mqttLog=t}))},loadUpdateLog:function(t){var e=this;t.stopPropagation(),this.updateLog="wird aktualisiert...",this.getFilePromise("/openWB/data/log/update.log").then((function(t){e.updateLog=t}))}}},y=n(8118);const b=(0,y.Z)(w,[["render",f]]);var L=b},5666:function(t){var e=function(t){"use strict";var e,n=Object.prototype,r=n.hasOwnProperty,o="function"===typeof Symbol?Symbol:{},i=o.iterator||"@@iterator",a=o.asyncIterator||"@@asyncIterator",u=o.toStringTag||"@@toStringTag";function c(t,e,n){return Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}),t[e]}try{c({},"")}catch(D){c=function(t,e,n){return t[e]=n}}function s(t,e,n,r){var o=e&&e.prototype instanceof m?e:m,i=Object.create(o.prototype),a=new j(r||[]);return i._invoke=W(t,n,a),i}function l(t,e,n){try{return{type:"normal",arg:t.call(e,n)}}catch(D){return{type:"throw",arg:D}}}t.wrap=s;var f="suspendedStart",h="suspendedYield",d="executing",p="completed",g={};function m(){}function v(){}function w(){}var y={};c(y,i,(function(){return this}));var b=Object.getPrototypeOf,L=b&&b(b(q([])));L&&L!==n&&r.call(L,i)&&(y=L);var x=w.prototype=m.prototype=Object.create(y);function _(t){["next","throw","return"].forEach((function(e){c(t,e,(function(t){return this._invoke(e,t)}))}))}function k(t,e){function n(o,i,a,u){var c=l(t[o],t,i);if("throw"!==c.type){var s=c.arg,f=s.value;return f&&"object"===typeof f&&r.call(f,"__await")?e.resolve(f.__await).then((function(t){n("next",t,a,u)}),(function(t){n("throw",t,a,u)})):e.resolve(f).then((function(t){s.value=t,a(s)}),(function(t){return n("throw",t,a,u)}))}u(c.arg)}var o;function i(t,r){function i(){return new e((function(e,o){n(t,r,e,o)}))}return o=o?o.then(i,i):i()}this._invoke=i}function W(t,e,n){var r=f;return function(o,i){if(r===d)throw new Error("Generator is already running");if(r===p){if("throw"===o)throw i;return O()}n.method=o,n.arg=i;while(1){var a=n.delegate;if(a){var u=E(a,n);if(u){if(u===g)continue;return u}}if("next"===n.method)n.sent=n._sent=n.arg;else if("throw"===n.method){if(r===f)throw r=p,n.arg;n.dispatchException(n.arg)}else"return"===n.method&&n.abrupt("return",n.arg);r=d;var c=l(t,e,n);if("normal"===c.type){if(r=n.done?p:h,c.arg===g)continue;return{value:c.arg,done:n.done}}"throw"===c.type&&(r=p,n.method="throw",n.arg=c.arg)}}}function E(t,n){var r=t.iterator[n.method];if(r===e){if(n.delegate=null,"throw"===n.method){if(t.iterator["return"]&&(n.method="return",n.arg=e,E(t,n),"throw"===n.method))return g;n.method="throw",n.arg=new TypeError("The iterator does not provide a 'throw' method")}return g}var o=l(r,t.iterator,n.arg);if("throw"===o.type)return n.method="throw",n.arg=o.arg,n.delegate=null,g;var i=o.arg;return i?i.done?(n[t.resultName]=i.value,n.next=t.nextLoc,"return"!==n.method&&(n.method="next",n.arg=e),n.delegate=null,g):i:(n.method="throw",n.arg=new TypeError("iterator result is not an object"),n.delegate=null,g)}function P(t){var e={tryLoc:t[0]};1 in t&&(e.catchLoc=t[1]),2 in t&&(e.finallyLoc=t[2],e.afterLoc=t[3]),this.tryEntries.push(e)}function F(t){var e=t.completion||{};e.type="normal",delete e.arg,t.completion=e}function j(t){this.tryEntries=[{tryLoc:"root"}],t.forEach(P,this),this.reset(!0)}function q(t){if(t){var n=t[i];if(n)return n.call(t);if("function"===typeof t.next)return t;if(!isNaN(t.length)){var o=-1,a=function n(){while(++o<t.length)if(r.call(t,o))return n.value=t[o],n.done=!1,n;return n.value=e,n.done=!0,n};return a.next=a}}return{next:O}}function O(){return{value:e,done:!0}}return v.prototype=w,c(x,"constructor",w),c(w,"constructor",v),v.displayName=c(w,u,"GeneratorFunction"),t.isGeneratorFunction=function(t){var e="function"===typeof t&&t.constructor;return!!e&&(e===v||"GeneratorFunction"===(e.displayName||e.name))},t.mark=function(t){return Object.setPrototypeOf?Object.setPrototypeOf(t,w):(t.__proto__=w,c(t,u,"GeneratorFunction")),t.prototype=Object.create(x),t},t.awrap=function(t){return{__await:t}},_(k.prototype),c(k.prototype,a,(function(){return this})),t.AsyncIterator=k,t.async=function(e,n,r,o,i){void 0===i&&(i=Promise);var a=new k(s(e,n,r,o),i);return t.isGeneratorFunction(n)?a:a.next().then((function(t){return t.done?t.value:a.next()}))},_(x),c(x,u,"Generator"),c(x,i,(function(){return this})),c(x,"toString",(function(){return"[object Generator]"})),t.keys=function(t){var e=[];for(var n in t)e.push(n);return e.reverse(),function n(){while(e.length){var r=e.pop();if(r in t)return n.value=r,n.done=!1,n}return n.done=!0,n}},t.values=q,j.prototype={constructor:j,reset:function(t){if(this.prev=0,this.next=0,this.sent=this._sent=e,this.done=!1,this.delegate=null,this.method="next",this.arg=e,this.tryEntries.forEach(F),!t)for(var n in this)"t"===n.charAt(0)&&r.call(this,n)&&!isNaN(+n.slice(1))&&(this[n]=e)},stop:function(){this.done=!0;var t=this.tryEntries[0],e=t.completion;if("throw"===e.type)throw e.arg;return this.rval},dispatchException:function(t){if(this.done)throw t;var n=this;function o(r,o){return u.type="throw",u.arg=t,n.next=r,o&&(n.method="next",n.arg=e),!!o}for(var i=this.tryEntries.length-1;i>=0;--i){var a=this.tryEntries[i],u=a.completion;if("root"===a.tryLoc)return o("end");if(a.tryLoc<=this.prev){var c=r.call(a,"catchLoc"),s=r.call(a,"finallyLoc");if(c&&s){if(this.prev<a.catchLoc)return o(a.catchLoc,!0);if(this.prev<a.finallyLoc)return o(a.finallyLoc)}else if(c){if(this.prev<a.catchLoc)return o(a.catchLoc,!0)}else{if(!s)throw new Error("try statement without catch or finally");if(this.prev<a.finallyLoc)return o(a.finallyLoc)}}}},abrupt:function(t,e){for(var n=this.tryEntries.length-1;n>=0;--n){var o=this.tryEntries[n];if(o.tryLoc<=this.prev&&r.call(o,"finallyLoc")&&this.prev<o.finallyLoc){var i=o;break}}i&&("break"===t||"continue"===t)&&i.tryLoc<=e&&e<=i.finallyLoc&&(i=null);var a=i?i.completion:{};return a.type=t,a.arg=e,i?(this.method="next",this.next=i.finallyLoc,g):this.complete(a)},complete:function(t,e){if("throw"===t.type)throw t.arg;return"break"===t.type||"continue"===t.type?this.next=t.arg:"return"===t.type?(this.rval=this.arg=t.arg,this.method="return",this.next="end"):"normal"===t.type&&e&&(this.next=e),g},finish:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.finallyLoc===t)return this.complete(n.completion,n.afterLoc),F(n),g}},catch:function(t){for(var e=this.tryEntries.length-1;e>=0;--e){var n=this.tryEntries[e];if(n.tryLoc===t){var r=n.completion;if("throw"===r.type){var o=r.arg;F(n)}return o}}throw new Error("illegal catch attempt")},delegateYield:function(t,n,r){return this.delegate={iterator:q(t),resultName:n,nextLoc:r},"next"===this.method&&(this.arg=e),g}},t}(t.exports);try{regeneratorRuntime=e}catch(n){"object"===typeof globalThis?globalThis.regeneratorRuntime=e:Function("r","regeneratorRuntime = r")(e)}}}]);
//# sourceMappingURL=DebugConfig-legacy.696f89d7.js.map