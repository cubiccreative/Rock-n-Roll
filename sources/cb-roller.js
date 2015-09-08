// Licensed as Apache License 2.0 by Cubic Creative Company Limited

/* global console,performance */

var Roller = {};

Roller.parallaxEnabled = false;
Roller.fixedEnabled = false;

Roller.arrFixedObj = [];
Roller.arrSnapInObj = [];
Roller.arrScroll = [];
Roller.arrScrollOnce = [];
Roller.arrVideoObj = [];

Roller.windowHeight = 700;
Roller.windowHeightHalf = 350;
Roller.currentScrollY = 0;
Roller.lastPeriodicRan = 0;
Roller.lastTimestamp = performance.now();
Roller.periodicInterval = 500;



// Data updating functions

Roller.updateGlobalData = function() {
	Roller.windowHeight = document.documentElement.clientHeight;
	Roller.windowHeightHalf = Roller.windowHeight / 2;
};

Roller.updateClippingData = function() {
	var elems = document.getElementsByClassName('roller-fixclip');
	for (var i = 0; i < elems.length; i++) {
		var t = Math.ceil(elems[i].parentNode.getBoundingClientRect().top-(Roller.windowHeight/2)+elems[i].offsetHeight/2);
		var b = t + elems[i].parentNode.offsetHeight;
		elems[i].dataClipTop = t;
		elems[i].dataClipBottom = b;
	}
};

Roller.updateSnapInData = function() {
	var elems = document.getElementsByClassName('roller-snapin');
	for (var i = 0; i < elems.length; i++) {
		var target = document.getElementById(elems[i].getAttribute('roller-snapin-to'));
		elems[i].dataSnapIn = target.getBoundingClientRect().top + (target.offsetHeight / 2);
		elems[i].dataSnapInTo = elems[i].getAttribute('roller-snapin-to');
		elems[i].dataSnapInFrom = elems[i].getAttribute('roller-snapin-from');
	}
};

Roller.updateScrollData = function() {
	var elems = document.getElementsByClassName('roller-scroll');
	for (var i = 0; i < elems.length; i++) {
		elems[i].parentNode.dataTop = document.body.scrollTop + elems[i].parentNode.getBoundingClientRect().top;
		elems[i].parentNode.dataHeight = elems[i].parentNode.offsetHeight;
		elems[i].dataScrollRatio = elems[i].getAttribute('roller-scroll-ratio') || 0;
		elems[i].dataScrollOffset = elems[i].getAttribute('roller-scroll-offset') || 0;
	}
};

Roller.verticalCenterUpdate = function() {
	var elems = document.getElementsByClassName('roller-vertcenter');
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.marginTop = '-' + elems[i].offsetHeight / 2 + 'px';
	}
};

Roller.horzCenterUpdate = function() {
	var elems = document.getElementsByClassName('roller-horzcenter');
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.marginLeft = '-' + elems[i].offsetWidth / 2 + 'px';
	}
};



// Handlers

    // A task which does not require to run every frame.
Roller.periodicHandler = function() {
	//var d = performance.now();
	var t = Roller.currentScrollY;
	var w = document.documentElement.offsetWidth;
	var i;
	// Recalculate many datas.
	Roller.updateGlobalData();
	Roller.updateClippingData();
	Roller.updateSnapInData();
	Roller.updateScrollData();
	Roller.verticalCenterUpdate();
	Roller.horzCenterUpdate();
	// Resize checking
	if(w <= 768) {
		Roller.parallaxEnabled = false;
		// Parallax
		for (i = 0; i < Roller.arrScroll.length; i++) {
			Roller.arrScroll[i].style.transform = 'translateY(0px)';
			Roller.arrScroll[i].style.msTransform = 'translateY(0px)';
			Roller.arrScroll[i].style.webkitTransform = 'translateY(0px)';
		}
	} else {
		Roller.parallaxEnabled = true;
	}
	if(w < 940) {
		Roller.fixedEnabled = false;
		// Fixed header
		for (i = 0; i < Roller.arrFixedObj.length; i++) {
			Roller.arrFixedObj[i].style.clip = 'auto';
		}
		// snapin
		for (i = 0; i < Roller.arrSnapInObj.length; i++) {
			document.getElementById(Roller.arrSnapInObj[i].dataSnapInTo).appendChild(Roller.arrSnapInObj[i]);
		}
	} else {
		Roller.fixedEnabled = true;
	}
	// Videos
	if (Roller.parallaxEnabled) {
		for (i = 0; i < Roller.arrVideoObj.length; i++) {
			var p = Roller.arrVideoObj[i].parentNode.parentNode.dataTop;
			var h = Roller.arrVideoObj[i].parentNode.parentNode.dataHeight;
			if ( (t > (p - Roller.windowHeight)) && (t < p + h) ) {
				Roller.arrVideoObj[i].play();
			} else {
				Roller.arrVideoObj[i].pause();
			}
		}
	}
	// Change class when scrolled
	for (i = 0; i < Roller.arrScrollOnce.length; i++) {
		if(t > (Roller.arrScrollOnce[i].dataTop + Roller.arrScrollOnce[i].dataScrollOffset) - Roller.windowHeightHalf) {
			Roller.arrScrollOnce[i].classList.add('roller-scrolled');
			Roller.arrScrollOnce.splice(i,1);
		}
	}
	// console.log('Periodic time taken: ' + (performance.now() - d));
};

// Update animation frames based on current scroll position.
Roller.updateFrame = function(timestamp) {
	var t = Roller.currentScrollY;
	var i,p,h,r,o;
	var baseY,y;
	if (Roller.parallaxEnabled) {
		// All scroll effects (parallax/blur/zoom)
		for (i = 0; i < Roller.arrScroll.length; i++) {
			p = Roller.arrScroll[i].parentNode.dataTop;
			h = Roller.arrScroll[i].parentNode.dataHeight;
            r = Roller.arrScroll[i].dataScrollRatio;
            o = Roller.arrScroll[i].dataScrollOffset;
			if ( (t > (p - Roller.windowHeight)) && (t < p + h) ) {
				baseY = (t - p) / Roller.windowHeight;
				if(r) {
					baseY = baseY * r;
				}
                if(o) {
                    baseY -= o;
                }
				// Parallax
				if (Roller.arrScroll[i].classList.contains('roller-para')) {
					y = baseY * 100;
					Roller.arrScroll[i].style.transform = 'translateY(' + y + 'px)';
					Roller.arrScroll[i].style.msTransform = 'translateY(' + y + 'px)';
					Roller.arrScroll[i].style.webkitTransform = 'translateY(' + y + 'px)';
				}
				// Blur
				if (Roller.arrScroll[i].classList.contains('roller-blur')) {
					y = (baseY + 1) * 30;
					if(y > 0) {
						Roller.arrScroll[i].style.filter = 'blur(' + y + 'px)';
						Roller.arrScroll[i].style.webkitFilter = 'blur(' + y + 'px)';
					} else {
						Roller.arrScroll[i].style.filter = '';
						Roller.arrScroll[i].style.webkitFilter = '';
					}
				}
				// Zoom
				if (Roller.arrScroll[i].classList.contains('roller-zoom')) {
					y = 1 + ((baseY + 1) * 0.2);
					if(y > 1) {
						Roller.arrScroll[i].style.transform = 'scale3d(' + y + ',' + y + ',1)';
						Roller.arrScroll[i].style.msTransform = 'scale3d(' + y + ',' + y + ',1)';
						Roller.arrScroll[i].style.webkitTransform = 'scale3d(' + y + ',' + y + ',1)';
					} else {
						Roller.arrScroll[i].style.transform = '';
						Roller.arrScroll[i].style.msTransform = '';
						Roller.arrScroll[i].style.webkitTransform = '';
					}
				}
				// Fade
				if (Roller.arrScroll[i].classList.contains('roller-fade')) {
					y = (baseY + 1) / 2;
					if(y > 0) {
						Roller.arrScroll[i].style.opacity = 1 - y;
					} else {
						Roller.arrScroll[i].style.opacity = 1;
					}
				}
			}
		}
	}
	if (Roller.fixedEnabled) {
		// Fixed header
		for (i = 0; i < Roller.arrFixedObj.length; i++) {
			Roller.arrFixedObj[i].style.clip = 'rect(' +
				(Roller.arrFixedObj[i].dataClipTop - t) +
				'px,auto,' +
				(Roller.arrFixedObj[i].dataClipBottom - t) +
				'px,0)';
		}
		// Snapin
		try {
			for (i = 0; i < Roller.arrSnapInObj.length; i++) {
				if ((t + Roller.windowHeightHalf) > Roller.arrSnapInObj[i].dataSnapIn) {
					document.getElementById(Roller.arrSnapInObj[i].dataSnapInTo).appendChild(Roller.arrSnapInObj[i]);
				}
				else {
					document.getElementById(Roller.arrSnapInObj[i].dataSnapInFrom).appendChild(Roller.arrSnapInObj[i]);
				}
			}
		} catch (e) {
			console.log(Roller.arrSnapInObj[i].dataSnapInTo);
		}
	}

	// Run periodic function when time met.
	if (Roller.lastPeriodicRan + Roller.periodicInterval < timestamp) {
		Roller.periodicHandler();
		Roller.lastPeriodicRan = timestamp;
	}

	// Calculate FPS
	// console.log(parseInt(1 / ((timestamp - lastTimestamp) / 1000)));
	// lastTimestamp = timestamp;

	// Request next animation frame.
	requestAnimationFrame(Roller.updateFrame);
};

Roller.scrollHandler = function() {
	Roller.currentScrollY = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
};



// Initializer

Roller.readyHandler = function() {
    console.log(Roller);
	window.scrollTo(0,0);
	Roller.arrScroll = document.getElementsByClassName('roller-scroll');
	Roller.arrFixedObj = document.getElementsByClassName('roller-fixed-clipped');
	Roller.arrSnapInObj = document.getElementsByClassName('roller-snapin');
	Roller.arrScrollOnce = document.getElementsByClassName('roller-scrollonce');
    document.addEventListener("scroll", Roller.scrollHandler);
    window.addEventListener("resize", Roller.periodicHandler);
	requestAnimationFrame(Roller.updateFrame);
    console.log('init');
};

if (document.readyState !== 'loading'){
	Roller.readyHandler();
} else {
	document.addEventListener('DOMContentLoaded', Roller.readyHandler);
}
