var RNR={};RNR.parallaxEnabled=!1,RNR.fixedEnabled=!1,RNR.arrFixedObj=[],RNR.arrSnapInObj=[],RNR.arrScroll=[],RNR.arrScrollOnce=[],RNR.arrVideoObj=[],RNR.windowHeight=700,RNR.windowHeightHalf=350,RNR.currentScrollY=0,RNR.lastPeriodicRan=0,RNR.lastTimestamp=performance.now(),RNR.periodicInterval=500,RNR.updateGlobalData=function(){RNR.windowHeight=document.documentElement.clientHeight,RNR.windowHeightHalf=RNR.windowHeight/2},RNR.updateClippingData=function(){for(var r=document.getElementsByClassName("rnr-fixclip"),e=0;e<r.length;e++){var a=Math.ceil(r[e].parentNode.getBoundingClientRect().top-RNR.windowHeight/2+r[e].offsetHeight/2),t=a+r[e].parentNode.offsetHeight;r[e].dataClipTop=a,r[e].dataClipBottom=t}},RNR.updateSnapInData=function(){for(var r=document.getElementsByClassName("rnr-snapin"),e=0;e<r.length;e++){var a=document.getElementById(r[e].getAttribute("rnr-snapin-to"));r[e].dataSnapIn=a.getBoundingClientRect().top+a.offsetHeight/2,r[e].dataSnapInTo=r[e].getAttribute("rnr-snapin-to"),r[e].dataSnapInFrom=r[e].getAttribute("rnr-snapin-from")}},RNR.updateScrollData=function(){for(var r=document.getElementsByClassName("rnr-scroll"),e=0;e<r.length;e++)r[e].parentNode.dataTop=document.body.scrollTop+r[e].parentNode.getBoundingClientRect().top,r[e].parentNode.dataHeight=r[e].parentNode.offsetHeight,r[e].dataScrollRatio=r[e].getAttribute("rnr-scroll-ratio")||0,r[e].dataScrollOffset=r[e].getAttribute("rnr-scroll-offset")||0},RNR.verticalCenterUpdate=function(){for(var r=document.getElementsByClassName("rnr-vertcenter"),e=0;e<r.length;e++)r[e].style.marginTop="-"+r[e].offsetHeight/2+"px"},RNR.horzCenterUpdate=function(){for(var r=document.getElementsByClassName("rnr-horzcenter"),e=0;e<r.length;e++)r[e].style.marginLeft="-"+r[e].offsetWidth/2+"px"},RNR.periodicHandler=function(){var r=RNR.currentScrollY,e=document.documentElement.offsetWidth,a;if(RNR.updateGlobalData(),RNR.updateClippingData(),RNR.updateSnapInData(),RNR.updateScrollData(),RNR.verticalCenterUpdate(),RNR.horzCenterUpdate(),768>=e)for(RNR.parallaxEnabled=!1,a=0;a<RNR.arrScroll.length;a++)RNR.arrScroll[a].style.transform="translateY(0px)",RNR.arrScroll[a].style.msTransform="translateY(0px)",RNR.arrScroll[a].style.webkitTransform="translateY(0px)";else RNR.parallaxEnabled=!0;if(940>e){for(RNR.fixedEnabled=!1,a=0;a<RNR.arrFixedObj.length;a++)RNR.arrFixedObj[a].style.clip="auto";for(a=0;a<RNR.arrSnapInObj.length;a++)document.getElementById(RNR.arrSnapInObj[a].dataSnapInTo).appendChild(RNR.arrSnapInObj[a])}else RNR.fixedEnabled=!0;if(RNR.parallaxEnabled)for(a=0;a<RNR.arrVideoObj.length;a++){var t=RNR.arrVideoObj[a].parentNode.parentNode.dataTop,n=RNR.arrVideoObj[a].parentNode.parentNode.dataHeight;r>t-RNR.windowHeight&&t+n>r?RNR.arrVideoObj[a].play():RNR.arrVideoObj[a].pause()}for(a=0;a<RNR.arrScrollOnce.length;a++)r>RNR.arrScrollOnce[a].dataTop+RNR.arrScrollOnce[a].dataScrollOffset-RNR.windowHeightHalf&&(RNR.arrScrollOnce[a].classList.add("rnr-scrolled"),RNR.arrScrollOnce.splice(a,1))},RNR.updateFrame=function(r){var e=RNR.currentScrollY,a,t,n,l,R,o,d;if(RNR.parallaxEnabled)for(a=0;a<RNR.arrScroll.length;a++)t=RNR.arrScroll[a].parentNode.dataTop,n=RNR.arrScroll[a].parentNode.dataHeight,l=RNR.arrScroll[a].dataScrollRatio,R=RNR.arrScroll[a].dataScrollOffset,e>t-RNR.windowHeight&&t+n>e&&(o=(e-t)/RNR.windowHeight,l&&(o*=l),R&&(o-=R),RNR.arrScroll[a].classList.contains("rnr-para")&&(d=100*o,RNR.arrScroll[a].style.transform="translateY("+d+"px)",RNR.arrScroll[a].style.msTransform="translateY("+d+"px)",RNR.arrScroll[a].style.webkitTransform="translateY("+d+"px)"),RNR.arrScroll[a].classList.contains("rnr-blur")&&(d=30*(o+1),d>0?(RNR.arrScroll[a].style.filter="blur("+d+"px)",RNR.arrScroll[a].style.webkitFilter="blur("+d+"px)"):(RNR.arrScroll[a].style.filter="",RNR.arrScroll[a].style.webkitFilter="")),RNR.arrScroll[a].classList.contains("rnr-zoom")&&(d=1+.2*(o+1),d>1?(RNR.arrScroll[a].style.transform="scale3d("+d+","+d+",1)",RNR.arrScroll[a].style.msTransform="scale3d("+d+","+d+",1)",RNR.arrScroll[a].style.webkitTransform="scale3d("+d+","+d+",1)"):(RNR.arrScroll[a].style.transform="",RNR.arrScroll[a].style.msTransform="",RNR.arrScroll[a].style.webkitTransform="")),RNR.arrScroll[a].classList.contains("rnr-fade")&&(d=(o+1)/2,d>0?RNR.arrScroll[a].style.opacity=1-d:RNR.arrScroll[a].style.opacity=1));if(RNR.fixedEnabled){for(a=0;a<RNR.arrFixedObj.length;a++)RNR.arrFixedObj[a].style.clip="rect("+(RNR.arrFixedObj[a].dataClipTop-e)+"px,auto,"+(RNR.arrFixedObj[a].dataClipBottom-e)+"px,0)";try{for(a=0;a<RNR.arrSnapInObj.length;a++)e+RNR.windowHeightHalf>RNR.arrSnapInObj[a].dataSnapIn?document.getElementById(RNR.arrSnapInObj[a].dataSnapInTo).appendChild(RNR.arrSnapInObj[a]):document.getElementById(RNR.arrSnapInObj[a].dataSnapInFrom).appendChild(RNR.arrSnapInObj[a])}catch(i){console.log(RNR.arrSnapInObj[a].dataSnapInTo)}}RNR.lastPeriodicRan+RNR.periodicInterval<r&&(RNR.periodicHandler(),RNR.lastPeriodicRan=r),requestAnimationFrame(RNR.updateFrame)},RNR.scrollHandler=function(){RNR.currentScrollY=void 0!==window.pageYOffset?window.pageYOffset:(document.documentElement||document.body.parentNode||document.body).scrollTop},RNR.readyHandler=function(){console.log(RNR),window.scrollTo(0,0),RNR.arrScroll=document.getElementsByClassName("rnr-scroll"),RNR.arrFixedObj=document.getElementsByClassName("rnr-fixed-clipped"),RNR.arrSnapInObj=document.getElementsByClassName("rnr-snapin"),RNR.arrScrollOnce=document.getElementsByClassName("rnr-scrollonce"),document.addEventListener("scroll",RNR.scrollHandler),window.addEventListener("resize",RNR.periodicHandler),requestAnimationFrame(RNR.updateFrame)},"loading"!==document.readyState?RNR.readyHandler():document.addEventListener("DOMContentLoaded",RNR.readyHandler);
//# sourceMappingURL=./cb-rnr-min.js.map