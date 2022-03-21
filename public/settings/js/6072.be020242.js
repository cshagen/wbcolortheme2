"use strict";(self["webpackChunkopenwb_ui_settings"]=self["webpackChunkopenwb_ui_settings"]||[]).push([[6072],{6072:function(e,n,t){t.r(n),t.d(n,{default:function(){return j}});var r=t(6252),a=t(3577);const i={class:"device-http-counter"},l=(0,r.Uk)(" Einstellungen für Http Zähler "),u={class:"small"},o=(0,r.Uk)(' Diese Angabe wird an die IP bzw. den Hostnamen angehängt und muss mit einem Schrägstrich "/" beginnen.'),d=(0,r._)("br",null,null,-1),s=(0,r.Uk)(" Es wird vom Server eine Zahl (Float mit Punkt als Dezimaltrennzeichen oder Integer) erwartet, welche die aktuelle Leistung in Watt darstellt. "),m=(0,r.Uk)(' Diese Angabe wird an die IP bzw. den Hostnamen angehängt und muss mit einem Schrägstrich "/" beginnen.'),h=(0,r._)("br",null,null,-1),g=(0,r.Uk)(" Es wird vom Server eine Zahl (Float mit Punkt als Dezimaltrennzeichen oder Integer) erwartet, welche den aktuellen absoluten Zählerstand in kWh darstellt."),p=(0,r._)("br",null,null,-1),c=(0,r.Uk)(' Wird hier "none" eingetragen, wird der Zählerstand intern simuliert. '),w=(0,r.Uk)(' Diese Angabe wird an die IP bzw. den Hostnamen angehängt und muss mit einem Schrägstrich "/" beginnen.'),b=(0,r._)("br",null,null,-1),_=(0,r.Uk)(" Es wird vom Server eine Zahl (Float mit Punkt als Dezimaltrennzeichen oder Integer) erwartet, welche den aktuellen absoluten Zählerstand in kWh darstellt."),k=(0,r._)("br",null,null,-1),f=(0,r.Uk)(' Wird hier "none" eingetragen, wird der Zählerstand intern simuliert. '),v=(0,r.Uk)(' Diese Angabe wird an die IP bzw. den Hostnamen angehängt und muss mit einem Schrägstrich "/" beginnen.'),z=(0,r._)("br",null,null,-1),P=(0,r.Uk)(" Es wird vom Server eine Zahl (Float mit Punkt als Dezimaltrennzeichen oder Integer) erwartet, welche die aktuelle Stromstärke der 1. Phase in Ampere darstellt."),U=(0,r._)("br",null,null,-1),Z=(0,r.Uk)(' Wird hier "none" eingetragen, kann kein Lastmanagement berechnet werden! '),S=(0,r.Uk)(' Diese Angabe wird an die IP bzw. den Hostnamen angehängt und muss mit einem Schrägstrich "/" beginnen.'),A=(0,r._)("br",null,null,-1),W=(0,r.Uk)(" Es wird vom Server eine Zahl (Float mit Punkt als Dezimaltrennzeichen oder Integer) erwartet, welche die aktuelle Stromstärke der 2. Phase in Ampere darstellt."),D=(0,r._)("br",null,null,-1),I=(0,r.Uk)(' Wird hier "none" eingetragen, kann kein Lastmanagement berechnet werden! '),C=(0,r.Uk)(' Diese Angabe wird an die IP bzw. den Hostnamen angehängt und muss mit einem Schrägstrich "/" beginnen.'),x=(0,r._)("br",null,null,-1),q=(0,r.Uk)(" Es wird vom Server eine Zahl (Float mit Punkt als Dezimaltrennzeichen oder Integer) erwartet, welche die aktuelle Stromstärke der 3. Phase in Ampere darstellt."),E=(0,r._)("br",null,null,-1),H=(0,r.Uk)(' Wird hier "none" eingetragen, kann kein Lastmanagement berechnet werden! ');function y(e,n,t,y,F,V){const L=(0,r.up)("openwb-base-heading"),j=(0,r.up)("openwb-base-text-input");return(0,r.wg)(),(0,r.iD)("div",i,[(0,r.Wm)(L,null,{default:(0,r.w5)((()=>[l,(0,r._)("span",u,"(Modul: "+(0,a.zw)(e.$options.name)+")",1)])),_:1}),(0,r.Wm)(j,{title:"Pfad für Leistung",subtype:"text",required:"",pattern:"^/[-a-zA-Z0-9@:%_\\+.~#?&/=]*","model-value":t.configuration.power_path,"onUpdate:modelValue":n[0]||(n[0]=e=>V.updateConfiguration(e,"configuration.power_path"))},{help:(0,r.w5)((()=>[o,d,s])),_:1},8,["model-value"]),(0,r.Wm)(j,{title:"Pfad für Zählerstand Bezug",subtype:"text",required:"",pattern:"^(/[-a-zA-Z0-9@:%_\\+.~#?&/=]*)|none","model-value":t.configuration.imported_path,"onUpdate:modelValue":n[1]||(n[1]=e=>V.updateConfiguration(e,"configuration.imported_path"))},{help:(0,r.w5)((()=>[m,h,g,p,c])),_:1},8,["model-value"]),(0,r.Wm)(j,{title:"Pfad für Zählerstand Einspeisung",subtype:"text",required:"",pattern:"^(/[-a-zA-Z0-9@:%_\\+.~#?&/=]*)|none","model-value":t.configuration.exported_path,"onUpdate:modelValue":n[2]||(n[2]=e=>V.updateConfiguration(e,"configuration.exported_path"))},{help:(0,r.w5)((()=>[w,b,_,k,f])),_:1},8,["model-value"]),(0,r.Wm)(j,{title:"Pfad für Strom Phase 1",subtype:"text",required:"",pattern:"^(/[-a-zA-Z0-9@:%_\\+.~#?&/=]*)|none","model-value":t.configuration.current_l1_path,"onUpdate:modelValue":n[3]||(n[3]=e=>V.updateConfiguration(e,"configuration.current_l1_path"))},{help:(0,r.w5)((()=>[v,z,P,U,Z])),_:1},8,["model-value"]),(0,r.Wm)(j,{title:"Pfad für Strom Phase 2",subtype:"text",required:"",pattern:"^(/[-a-zA-Z0-9@:%_\\+.~#?&/=]*)|none","model-value":t.configuration.current_l2_path,"onUpdate:modelValue":n[4]||(n[4]=e=>V.updateConfiguration(e,"configuration.current_l2_path"))},{help:(0,r.w5)((()=>[S,A,W,D,I])),_:1},8,["model-value"]),(0,r.Wm)(j,{title:"Pfad für Strom Phase 3",subtype:"text",required:"",pattern:"^(/[-a-zA-Z0-9@:%_\\+.~#?&/=]*)|none","model-value":t.configuration.current_l3_path,"onUpdate:modelValue":n[5]||(n[5]=e=>V.updateConfiguration(e,"configuration.current_l3_path"))},{help:(0,r.w5)((()=>[C,x,q,E,H])),_:1},8,["model-value"])])}var F={name:"DeviceHttpCounter",emits:["update:configuration"],props:{configuration:{type:Object,required:!0},deviceId:{default:void 0},componentId:{required:!0}},methods:{updateConfiguration(e,n){this.$emit("update:configuration",{value:e,object:n})}}},V=t(8118);const L=(0,V.Z)(F,[["render",y]]);var j=L}}]);
//# sourceMappingURL=6072.be020242.js.map