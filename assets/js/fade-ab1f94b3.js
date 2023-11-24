import{af as i,aU as s}from"./index-791c0cb3.js";const r=new i("antFadeIn",{"0%":{opacity:0},"100%":{opacity:1}}),c=new i("antFadeOut",{"0%":{opacity:1},"100%":{opacity:0}}),u=function(t){let e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!1;const{antCls:o}=t,n=`${o}-fade`,a=e?"&":"";return[s(n,r,c,t.motionDurationMid,e),{[`
        ${a}${n}-enter,
        ${a}${n}-appear
      `]:{opacity:0,animationTimingFunction:"linear"},[`${a}${n}-leave`]:{animationTimingFunction:"linear"}}]};export{u as i};
