"use strict";var FRAME_ID="bt-frame",FRAME_CONTAINER_ID="bt-frame-container",config={};if("undefined"!=typeof _bt&&_bt.length>0){var _config=_bt.reduce(function(e,t){return e[t[0]]=t[1],e},{});Object.assign(config,_config)}var parseUrl=function(e){var t={};return e.split("&").forEach(function(e){var n=e.split("=");t[n[0]]=n[1]}),t},getDomain=function(){return"//"+config.project+"."+config.host},getFrameUrl=function(){var e=parseUrl(window.location.search.substring(1));return""+getDomain()+(e._bt||"")},createFrame=function(){var e=document.createElement("iframe");return e.setAttribute("frameborder","0"),e.id="bt-frame",e.scrolling="no",e.src=getFrameUrl(),e.width=config.width||"100%",e.height=config.height||1e3,e},getPosition=function(e){var t=e.offsetLeft,n=e.offsetTop;if(e.offsetParent){var a=e.offsetParent;do{t+=a.offsetLeft,n+=a.offsetTop}while(a=a.offsetParent)}return{left:t,top:n}},listenMessages=function(e){var t=function(t){var n=JSON.parse(t.data);e({message:t,data:n})};window.addEventListener?window.addEventListener("message",t):window.attachEvent("onmessage",t)},logMessage=function(e){e.message;var t=e.data;console.group("message"),console.log("%c type","color: #2196F3",t.type),console.log("%c data","color: #4CAF50",t.message),console.groupEnd("message")},messageHandler=function(e){var t=e.message,n=e.data;config.debug&&logMessage({message:t,data:n});var a=document.getElementById("bt-frame");switch(n.type){case"location":var o=parseUrl(window.location.search.substring(1)),r=window.location.toString();void 0===o._bt?r+="?_bt="+n.message.pathname:r=r.replace(/_bt=[^\&#]+/,"_bt="+n.message.pathname),window.history.replaceState({},window.title,r);var i=getPosition(a);window.scrollTo(i.left,i.top);break;case"resize":var s=n.message.height;a.height=s>config.height?s:config.height}},init=function(){document.write('<div id="bt-frame-container"></div>');var e=document.getElementById(FRAME_CONTAINER_ID),t=createFrame();e.appendChild(t),listenMessages(messageHandler)};init();