(function(){
//easing関数の定義
//defaultは一番下に定義

	VRoid.three.easing = {
		linear: function (t) {
		    return t;
		},
		swing: function (t) {
		    return 0.5 - Math.cos(t * Math.PI) / 2;
		},
		easeInQuad: function (t) {
		    return t * t;
		},
		easeOutQuad: function (t) {
		    return 1 - (1 - t) * (1 - t);
		},
		easeInOutQuad: function (t) {
		    return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
		},
		easeInCubic: function (t) {
		    return t * t * t;
		},
		easeOutCubic: function (t) {
		    return 1 - Math.pow(1 - t, 3);
		},
		easeInOutCubic: function (t) {
		    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
		},
		easeInQuart: function (t) {
		    return t * t * t * t;
		},
		easeOutQuart: function (t) {
		    return 1 - Math.pow(1 - t, 4);
		},
		easeInOutQuart: function (t) {
		    return t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;
		},
		easeInQuint: function (t) {
		    return t * t * t * t * t;
		},
		easeOutQuint: function (t) {
		    return 1 - Math.pow(1 - t, 5);
		},
		easeInOutQuint: function (t) {
		    return t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2;
		},
		easeInExpo: function (t) {
		    return t === 0 ? 0 : Math.pow(2, 10 * (t - 1));
		},
		easeOutExpo: function (t) {
		    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
		},
		easeInOutExpo: function (t) {
		    return t === 0
		        ? 0
		        : t === 1
		        ? 1
		        : t < 0.5
		        ? Math.pow(2, 10 * (2 * t - 1)) / 2
		        : (2 - Math.pow(2, -10 * (2 * t - 1))) / 2;
		},
		easeInSine: function (t) {
		    return 1 - Math.cos((t * Math.PI) / 2);
		},
		easeOutSine: function (t) {
		    return Math.sin((t * Math.PI) / 2);
		},
		easeInOutSine: function (t) {
		    return -(Math.cos(Math.PI * t) - 1) / 2;
		},
		easeInCirc: function (t) {
		    return 1 - Math.sqrt(1 - t * t);
		},
		easeOutCirc: function (t) {
		    return Math.sqrt(1 - Math.pow(t - 1, 2));
		},
		easeInOutCirc: function (t) {
		    return t < 0.5
		        ? (1 - Math.sqrt(1 - Math.pow(2 * t, 2))) / 2
		        : (Math.sqrt(1 - Math.pow(-2 * t + 2, 2)) + 1) / 2;
		},
		easeInElastic: function (t) {
		    return t === 0
		        ? 0
		        : t === 1
		        ? 1
		        : -Math.pow(2, 10 * (t - 1)) * Math.sin(((t - 1) * 2 * Math.PI) / 0.3);
		},
		easeOutElastic: function (t) {
		    return t === 0
		        ? 0
		        : t === 1
		        ? 1
		        : Math.pow(2, -10 * t) * Math.sin((t * 2 * Math.PI) / 0.3) + 1;
		},
		easeInOutElastic: function (t) {
		    return t === 0
		        ? 0
		        : t === 1
		        ? 1
		        : t < 0.5
		        ? -Math.pow(2, 10 * (2 * t - 1)) * Math.sin(((2 * t - 1) * 2 * Math.PI) / 0.45) / 2
		        : Math.pow(2, -10 * (2 * t - 1)) * Math.sin(((2 * t - 1) * 2 * Math.PI) / 0.45) / 2 + 1;
		},
		easeInBack: function (t) {
		    const c1 = 1.70158;
		    const c3 = c1 + 1;

		    return c3 * t * t * t - c1 * t * t;
		},
		easeOutBack: function (t) {
		    const c1 = 1.70158;
		    const c3 = c1 + 1;

		    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
		},
		easeInOutBack: function (t) {
		    const c1 = 1.70158;
		    const c2 = c1 * 1.525;

		    return t < 0.5
		        ? (Math.pow(2 * t, 2) * ((c2 + 1) * 2 * t - c2)) / 2
		        : (Math.pow(2 * t - 2, 2) * ((c2 + 1) * (t * 2 - 2) + c2) + 2) / 2;
		},
		easeInBounce: function (t) {
		    return 1 - easeOutBounce(1 - t);
		},
		easeOutBounce: function (t) {
		    const n1 = 7.5625;
		    const d1 = 2.75;

		    if (t < 1 / d1) {
		        return n1 * t * t;
		    } else if (t < 2 / d1) {
		        return n1 * (t -= 1.5 / d1) * t + 0.75;
		    } else if (t < 2.5 / d1) {
		        return n1 * (t -= 2.25 / d1) * t + 0.9375;
		    } else {
		        return n1 * (t -= 2.625 / d1) * t + 0.984375;
		    }
		},
		easeInOutBounce: function (t) {
		    return t < 0.5 ? (1 - easeOutBounce(1 - 2 * t)) / 2 : (1 + easeOutBounce(2 * t - 1)) / 2;
		},
		jswing: function (t) {
		    return 0.5 - Math.cos(t * Math.PI) / 2;
		},
		def: function (t) {
		    return jswing(t);
		},
	}

	//defaultを書き換えられるように定義
	VRoid.three.easing.default = VRoid.three.easing.easeInOutQuart;

})();
