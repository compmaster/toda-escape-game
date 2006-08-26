// Scene has fixed size 570x380. Scale the viewport on mobile devices for better UX.
// https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
(function(){
	var SCENE_WIDTH = 570;
	var SCENE_HEIGHT = 380;
	var SCENE_RATIO = 3/2;
	
	var hasTouchScreen = false;
	if ("maxTouchPoints" in navigator) {
	  hasTouchScreen = navigator.maxTouchPoints > 0;
	} else if ("msMaxTouchPoints" in navigator) {
	  hasTouchScreen = navigator.msMaxTouchPoints > 0;
	} else {
	  var mQ = window.matchMedia && matchMedia("(pointer:coarse)");
	  if (mQ && mQ.media === "(pointer:coarse)") {
		hasTouchScreen = !!mQ.matches;
	  } else if ("orientation" in window) {
		hasTouchScreen = true; // deprecated, but good fallback
	  } else {
		// Only as a last resort, fall back to user agent sniffing
		var UA = navigator.userAgent;
		hasTouchScreen =
		  /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
		  /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA);
	  }
	}

	if (hasTouchScreen) {
		addEvent('orientationchange', setViewport);
		addEvent('resize', setViewport);
		addEvent('load', setViewport);
		addEvent('DOMContentLoaded', setViewport);
		addEvent('visibilitychange', setViewport, document);
		screen.orientation && screen.orientation.addEventListener('change', setViewport);
	}

	function setViewport() {
		var viewport = document.querySelector && document.querySelector('meta[name=viewport]');
		var w,h;
		if (viewport) {
			if (window.innerWidth / window.innerHeight > SCENE_RATIO) {
				w = 'auto';
				h = SCENE_HEIGHT;
			} else {
				w = SCENE_WIDTH;
				h = 'auto';
			}
			viewport.setAttribute('content', 'width='+w+', height='+h+', maximum-scale=1.0, initial-scale=1.0');
		}
	}

	function isHorizontal() {
		if ("orientation" in window) {
			return Math.abs(window.orientation) === 90;
		} else if (window.screen && screen.orientation && screen.orientation.type) {
			return screen.orientation.type.indexOf('landscape') === 0;
		} else {
			return false;
		}
	}
})();