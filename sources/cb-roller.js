// Licensed as Apache License 2.0 by Cubic Creative Company Limited

/* global console,performance */

var RNR = {};

RNR.parallaxEnabled = false;
RNR.fixedEnabled = false;

RNR.arrFixedObj = [];
RNR.arrSnapInObj = [];
RNR.arrScroll = [];
RNR.arrScrollOnce = [];
RNR.arrVideoObj = [];

RNR.windowHeight = 700;
RNR.windowHeightHalf = 350;
RNR.currentScrollY = 0;
RNR.lastPeriodicRan = 0;
RNR.lastTimestamp = performance.now();
RNR.periodicInterval = 500;



// Data updating functions

RNR.updateGlobalData = function() {
	RNR.windowHeight = document.documentElement.clientHeight;
	RNR.windowHeightHalf = RNR.windowHeight / 2;
};

RNR.updateClippingData = function() {
	var elems = document.getElementsByClassName('rnr-fixclip');
	for (var i = 0; i < elems.length; i++) {
		var t = Math.ceil(elems[i].parentNode.getBoundingClientRect().top-(RNR.windowHeight/2)+elems[i].offsetHeight/2);
		var b = t + elems[i].parentNode.offsetHeight;
		elems[i].dataClipTop = t;
		elems[i].dataClipBottom = b;
	}
};

RNR.updateSnapInData = function() {
	var elems = document.getElementsByClassName('rnr-snapin');
	for (var i = 0; i < elems.length; i++) {
		var target = document.getElementById(elems[i].getAttribute('rnr-snapin-to'));
		elems[i].dataSnapIn = target.getBoundingClientRect().top + (target.offsetHeight / 2);
		elems[i].dataSnapInTo = elems[i].getAttribute('rnr-snapin-to');
		elems[i].dataSnapInFrom = elems[i].getAttribute('rnr-snapin-from');
	}
};

RNR.updateScrollData = function() {
	var elems = document.getElementsByClassName('rnr-scroll');
	for (var i = 0; i < elems.length; i++) {
		elems[i].parentNode.dataTop = document.body.scrollTop + elems[i].parentNode.getBoundingClientRect().top;
		elems[i].parentNode.dataHeight = elems[i].parentNode.offsetHeight;
		elems[i].dataScrollRatio = elems[i].getAttribute('rnr-scroll-ratio') || 0;
		elems[i].dataScrollOffset = elems[i].getAttribute('rnr-scroll-offset') || 0;
	}
};

RNR.verticalCenterUpdate = function() {
	var elems = document.getElementsByClassName('rnr-vertcenter');
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.marginTop = '-' + elems[i].offsetHeight / 2 + 'px';
	}
};

RNR.horzCenterUpdate = function() {
	var elems = document.getElementsByClassName('rnr-horzcenter');
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.marginLeft = '-' + elems[i].offsetWidth / 2 + 'px';
	}
};



// Handlers

    // A task which does not require to run every frame.
RNR.periodicHandler = function() {
	//var d = performance.now();
	var t = RNR.currentScrollY;
	var w = document.documentElement.offsetWidth;
	var i;
	// Recalculate many datas.
	RNR.updateGlobalData();
	RNR.updateClippingData();
	RNR.updateSnapInData();
	RNR.updateScrollData();
	RNR.verticalCenterUpdate();
	RNR.horzCenterUpdate();
	// Resize checking
	if(w <= 768) {
		RNR.parallaxEnabled = false;
		// Parallax
		for (i = 0; i < RNR.arrScroll.length; i++) {
			RNR.arrScroll[i].style.transform = 'translateY(0px)';
			RNR.arrScroll[i].style.msTransform = 'translateY(0px)';
			RNR.arrScroll[i].style.webkitTransform = 'translateY(0px)';
		}
	} else {
		RNR.parallaxEnabled = true;
	}
	if(w < 940) {
		RNR.fixedEnabled = false;
		// Fixed header
		for (i = 0; i < RNR.arrFixedObj.length; i++) {
			RNR.arrFixedObj[i].style.clip = 'auto';
		}
		// snapin
		for (i = 0; i < RNR.arrSnapInObj.length; i++) {
			document.getElementById(RNR.arrSnapInObj[i].dataSnapInTo).appendChild(RNR.arrSnapInObj[i]);
		}
	} else {
		RNR.fixedEnabled = true;
	}
	// Videos
	if (RNR.parallaxEnabled) {
		for (i = 0; i < RNR.arrVideoObj.length; i++) {
			var p = RNR.arrVideoObj[i].parentNode.parentNode.dataTop;
			var h = RNR.arrVideoObj[i].parentNode.parentNode.dataHeight;
			if ( (t > (p - RNR.windowHeight)) && (t < p + h) ) {
				RNR.arrVideoObj[i].play();
			} else {
				RNR.arrVideoObj[i].pause();
			}
		}
	}
	// Change class when scrolled
	for (i = 0; i < RNR.arrScrollOnce.length; i++) {
		if(t > (RNR.arrScrollOnce[i].dataTop + RNR.arrScrollOnce[i].dataScrollOffset) - RNR.windowHeightHalf) {
			RNR.arrScrollOnce[i].classList.add('rnr-scrolled');
			RNR.arrScrollOnce.splice(i,1);
		}
	}
	// console.log('Periodic time taken: ' + (performance.now() - d));
};

// Update animation frames based on current scroll position.
RNR.updateFrame = function(timestamp) {
	var t = RNR.currentScrollY;
	var i,p,h,r,o;
	var baseY,y;
	if (RNR.parallaxEnabled) {
		// All scroll effects (parallax/blur/zoom)
		for (i = 0; i < RNR.arrScroll.length; i++) {
			p = RNR.arrScroll[i].parentNode.dataTop;
			h = RNR.arrScroll[i].parentNode.dataHeight;
            r = RNR.arrScroll[i].dataScrollRatio;
            o = RNR.arrScroll[i].dataScrollOffset;
			if ( (t > (p - RNR.windowHeight)) && (t < p + h) ) {
				baseY = (t - p) / RNR.windowHeight;
				if(r) {
					baseY = baseY * r;
				}
                if(o) {
                    baseY -= o;
                }
				// Parallax
				if (RNR.arrScroll[i].classList.contains('rnr-para')) {
					y = baseY * 100;
					RNR.arrScroll[i].style.transform = 'translateY(' + y + 'px)';
					RNR.arrScroll[i].style.msTransform = 'translateY(' + y + 'px)';
					RNR.arrScroll[i].style.webkitTransform = 'translateY(' + y + 'px)';
				}
				// Blur
				if (RNR.arrScroll[i].classList.contains('rnr-blur')) {
					y = (baseY + 1) * 30;
					if(y > 0) {
						RNR.arrScroll[i].style.filter = 'blur(' + y + 'px)';
						RNR.arrScroll[i].style.webkitFilter = 'blur(' + y + 'px)';
					} else {
						RNR.arrScroll[i].style.filter = '';
						RNR.arrScroll[i].style.webkitFilter = '';
					}
				}
				// Zoom
				if (RNR.arrScroll[i].classList.contains('rnr-zoom')) {
					y = 1 + ((baseY + 1) * 0.2);
					if(y > 1) {
						RNR.arrScroll[i].style.transform = 'scale3d(' + y + ',' + y + ',1)';
						RNR.arrScroll[i].style.msTransform = 'scale3d(' + y + ',' + y + ',1)';
						RNR.arrScroll[i].style.webkitTransform = 'scale3d(' + y + ',' + y + ',1)';
					} else {
						RNR.arrScroll[i].style.transform = '';
						RNR.arrScroll[i].style.msTransform = '';
						RNR.arrScroll[i].style.webkitTransform = '';
					}
				}
				// Fade
				if (RNR.arrScroll[i].classList.contains('rnr-fade')) {
					y = (baseY + 1) / 2;
					if(y > 0) {
						RNR.arrScroll[i].style.opacity = 1 - y;
					} else {
						RNR.arrScroll[i].style.opacity = 1;
					}
				}
			}
		}
	}
	if (RNR.fixedEnabled) {
		// Fixed header
		for (i = 0; i < RNR.arrFixedObj.length; i++) {
			RNR.arrFixedObj[i].style.clip = 'rect(' +
				(RNR.arrFixedObj[i].dataClipTop - t) +
				'px,auto,' +
				(RNR.arrFixedObj[i].dataClipBottom - t) +
				'px,0)';
		}
		// Snapin
		try {
			for (i = 0; i < RNR.arrSnapInObj.length; i++) {
				if ((t + RNR.windowHeightHalf) > RNR.arrSnapInObj[i].dataSnapIn) {
					document.getElementById(RNR.arrSnapInObj[i].dataSnapInTo).appendChild(RNR.arrSnapInObj[i]);
				}
				else {
					document.getElementById(RNR.arrSnapInObj[i].dataSnapInFrom).appendChild(RNR.arrSnapInObj[i]);
				}
			}
		} catch (e) {
			console.log(RNR.arrSnapInObj[i].dataSnapInTo);
		}
	}

	// Run periodic function when time met.
	if (RNR.lastPeriodicRan + RNR.periodicInterval < timestamp) {
		RNR.periodicHandler();
		RNR.lastPeriodicRan = timestamp;
	}

	// Calculate FPS
	// console.log(parseInt(1 / ((timestamp - lastTimestamp) / 1000)));
	// lastTimestamp = timestamp;

	// Request next animation frame.
	requestAnimationFrame(RNR.updateFrame);
};

RNR.scrollHandler = function() {
	RNR.currentScrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};



// Initializer

RNR.readyHandler = function() {
    console.log(RNR);
	window.scrollTo(0,0);
	RNR.arrScroll = document.getElementsByClassName('rnr-scroll');
	RNR.arrFixedObj = document.getElementsByClassName('rnr-fixed-clipped');
	RNR.arrSnapInObj = document.getElementsByClassName('rnr-snapin');
	RNR.arrScrollOnce = document.getElementsByClassName('rnr-scrollonce');
    document.addEventListener("scroll", RNR.scrollHandler);
    window.addEventListener("resize", RNR.periodicHandler);
	requestAnimationFrame(RNR.updateFrame);
    console.log('init');
};

if (document.readyState !== 'loading'){
	RNR.readyHandler();
} else {
	document.addEventListener('DOMContentLoaded', RNR.readyHandler);
}
