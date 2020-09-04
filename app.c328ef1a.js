// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"node_modules/@swup/plugin/lib/index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Plugin = function () {
    function Plugin() {
        _classCallCheck(this, Plugin);

        this.isSwupPlugin = true;
    }

    _createClass(Plugin, [{
        key: "mount",
        value: function mount() {
            // this is mount method rewritten by class extending
            // and is executed when swup is enabled with plugin
        }
    }, {
        key: "unmount",
        value: function unmount() {
            // this is unmount method rewritten by class extending
            // and is executed when swup with plugin is disabled
        }
    }, {
        key: "_beforeMount",
        value: function _beforeMount() {
            // here for any future hidden auto init
        }
    }, {
        key: "_afterUnmount",
        value: function _afterUnmount() {}
        // here for any future hidden auto-cleanup


        // this is here so we can tell if plugin was created by extending this class

    }]);

    return Plugin;
}();

exports.default = Plugin;
},{}],"node_modules/scrl/lib/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Scrl = function Scrl(options) {
    var _this = this;

    _classCallCheck(this, Scrl);

    this._raf = null;
    this._positionY = 0;
    this._velocityY = 0;
    this._targetPositionY = 0;
    this._targetPositionYWithOffset = 0;
    this._direction = 0;

    this.scrollTo = function (offset) {
        if (offset && offset.nodeType) {
            // the offset is element
            _this._targetPositionY = Math.round(offset.getBoundingClientRect().top + window.pageYOffset);
        } else if (parseInt(_this._targetPositionY) === _this._targetPositionY) {
            // the offset is a number
            _this._targetPositionY = Math.round(offset);
        } else {
            console.error('Argument must be a number or an element.');
            return;
        }

        // don't animate beyond the document height
        if (_this._targetPositionY > document.documentElement.scrollHeight - window.innerHeight) {
            _this._targetPositionY = document.documentElement.scrollHeight - window.innerHeight;
        }

        // calculated required values
        _this._positionY = document.body.scrollTop || document.documentElement.scrollTop;
        _this._direction = _this._positionY > _this._targetPositionY ? -1 : 1;
        _this._targetPositionYWithOffset = _this._targetPositionY + _this._direction;
        _this._velocityY = 0;

        if (_this._positionY !== _this._targetPositionY) {
            // start animation
            _this.options.onStart();
            _this._animate();
        } else {
            // page is already at the position
            _this.options.onAlreadyAtPositions();
        }
    };

    this._animate = function () {
        var distance = _this._update();
        _this._render();

        if (_this._direction === 1 && _this._targetPositionY > _this._positionY || _this._direction === -1 && _this._targetPositionY < _this._positionY) {
            // calculate next position
            _this._raf = requestAnimationFrame(_this._animate);
            _this.options.onTick();
        } else {
            // finish and set position to the final position
            _this._positionY = _this._targetPositionY;
            _this._render();
            _this._raf = null;
            _this.options.onTick();
            _this.options.onEnd();
            // this.triggerEvent('scrollDone')
        }
    };

    this._update = function () {
        var distance = _this._targetPositionYWithOffset - _this._positionY;
        var attraction = distance * _this.options.acceleration;

        _this._velocityY += attraction;

        _this._velocityY *= _this.options.friction;
        _this._positionY += _this._velocityY;

        return Math.abs(distance);
    };

    this._render = function () {
        window.scrollTo(0, _this._positionY);
    };

    // default options
    var defaults = {
        onAlreadyAtPositions: function onAlreadyAtPositions() {},
        onCancel: function onCancel() {},
        onEnd: function onEnd() {},
        onStart: function onStart() {},
        onTick: function onTick() {},
        friction: .7, // 1 - .3
        acceleration: .04

        // merge options
    };this.options = _extends({}, defaults, options);

    // set reverse friction
    if (options && options.friction) {
        this.options.friction = 1 - options.friction;
    }

    // register listener for cancel on wheel event
    window.addEventListener('mousewheel', function (event) {
        if (_this._raf) {
            _this.options.onCancel();
            cancelAnimationFrame(_this._raf);
            _this._raf = null;
        }
    }, {
        passive: true
    });
};

exports.default = Scrl;
},{}],"node_modules/@swup/scroll-plugin/lib/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _plugin = require('@swup/plugin');

var _plugin2 = _interopRequireDefault(_plugin);

var _scrl = require('scrl');

var _scrl2 = _interopRequireDefault(_scrl);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ScrollPlugin = function (_Plugin) {
    _inherits(ScrollPlugin, _Plugin);

    function ScrollPlugin(options) {
        _classCallCheck(this, ScrollPlugin);

        var _this = _possibleConstructorReturn(this, (ScrollPlugin.__proto__ || Object.getPrototypeOf(ScrollPlugin)).call(this));

        _this.name = "ScrollPlugin";

        _this.onSamePage = function () {
            _this.swup.scrollTo(0);
        };

        _this.onSamePageWithHash = function (event) {
            var link = event.delegateTarget;
            var element = document.querySelector(link.hash);
            var top = element.getBoundingClientRect().top + window.pageYOffset;
            _this.swup.scrollTo(top);
        };

        _this.onTransitionStart = function (popstate) {
            if (_this.options.doScrollingRightAway && !_this.swup.scrollToElement) {
                _this.doScrolling(popstate);
            }
        };

        _this.onContentReplaced = function (popstate) {
            if (!_this.options.doScrollingRightAway || _this.swup.scrollToElement) {
                _this.doScrolling(popstate);
            }
        };

        _this.doScrolling = function (popstate) {
            var swup = _this.swup;

            if (!popstate || swup.options.animateHistoryBrowsing) {
                if (swup.scrollToElement != null) {
                    var element = document.querySelector(swup.scrollToElement);
                    if (element != null) {
                        var top = element.getBoundingClientRect().top + window.pageYOffset;
                        swup.scrollTo(top);
                    } else {
                        console.warn('Element ' + swup.scrollToElement + ' not found');
                    }
                    swup.scrollToElement = null;
                } else {
                    swup.scrollTo(0);
                }
            }
        };

        var defaultOptions = {
            doScrollingRightAway: false,
            animateScroll: true,
            scrollFriction: 0.3,
            scrollAcceleration: 0.04
        };

        _this.options = _extends({}, defaultOptions, options);
        return _this;
    }

    _createClass(ScrollPlugin, [{
        key: 'mount',
        value: function mount() {
            var _this2 = this;

            var swup = this.swup;

            // add empty handlers array for submitForm event
            swup._handlers.scrollDone = [];
            swup._handlers.scrollStart = [];

            this.scrl = new _scrl2.default({
                onStart: function onStart() {
                    return swup.triggerEvent('scrollStart');
                },
                onEnd: function onEnd() {
                    return swup.triggerEvent('scrollDone');
                },
                onCancel: function onCancel() {
                    return swup.triggerEvent('scrollDone');
                },
                friction: this.options.scrollFriction,
                acceleration: this.options.scrollAcceleration
            });

            // set scrollTo method of swup and animate based on current animateScroll option
            swup.scrollTo = function (offset) {
                if (_this2.options.animateScroll) {
                    _this2.scrl.scrollTo(offset);
                } else {
                    swup.triggerEvent('scrollStart');
                    window.scrollTo(0, offset);
                    swup.triggerEvent('scrollDone');
                }
            };

            // disable browser scroll control on popstates when
            // animateHistoryBrowsing option is enabled in swup
            if (swup.options.animateHistoryBrowsing) {
                window.history.scrollRestoration = 'manual';
            }

            // scroll to the top of the page
            swup.on('samePage', this.onSamePage);

            // scroll to referenced element on the same page
            swup.on('samePageWithHash', this.onSamePageWithHash);

            // scroll to the referenced element
            swup.on('transitionStart', this.onTransitionStart);

            // scroll to the referenced element when it's in the page (after render)
            swup.on('contentReplaced', this.onContentReplaced);
        }
    }, {
        key: 'unmount',
        value: function unmount() {
            this.swup.scrollTo = null;

            delete this.scrl;
            this.scrl = null;

            this.swup.off('samePage', this.onSamePage);
            this.swup.off('samePageWithHash', this.onSamePageWithHash);
            this.swup.off('transitionStart', this.onTransitionStart);
            this.swup.off('contentReplaced', this.onContentReplaced);

            this.swup._handlers.scrollDone = null;
            this.swup._handlers.scrollStart = null;

            window.history.scrollRestoration = 'auto';
        }
    }]);

    return ScrollPlugin;
}(_plugin2.default);

exports.default = ScrollPlugin;
},{"@swup/plugin":"node_modules/@swup/plugin/lib/index.js","scrl":"node_modules/scrl/lib/index.js"}],"node_modules/delegate/src/closest.js":[function(require,module,exports) {
var DOCUMENT_NODE_TYPE = 9;

/**
 * A polyfill for Element.matches()
 */
if (typeof Element !== 'undefined' && !Element.prototype.matches) {
    var proto = Element.prototype;

    proto.matches = proto.matchesSelector ||
                    proto.mozMatchesSelector ||
                    proto.msMatchesSelector ||
                    proto.oMatchesSelector ||
                    proto.webkitMatchesSelector;
}

/**
 * Finds the closest parent that matches a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @return {Function}
 */
function closest (element, selector) {
    while (element && element.nodeType !== DOCUMENT_NODE_TYPE) {
        if (typeof element.matches === 'function' &&
            element.matches(selector)) {
          return element;
        }
        element = element.parentNode;
    }
}

module.exports = closest;

},{}],"node_modules/delegate/src/delegate.js":[function(require,module,exports) {
var closest = require('./closest');

/**
 * Delegates event to a selector.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @param {Boolean} useCapture
 * @return {Object}
 */
function delegate(element, selector, type, callback, useCapture) {
    var listenerFn = listener.apply(this, arguments);

    element.addEventListener(type, listenerFn, useCapture);

    return {
        destroy: function() {
            element.removeEventListener(type, listenerFn, useCapture);
        }
    }
}

/**
 * Finds closest match and invokes callback.
 *
 * @param {Element} element
 * @param {String} selector
 * @param {String} type
 * @param {Function} callback
 * @return {Function}
 */
function listener(element, selector, type, callback) {
    return function(e) {
        e.delegateTarget = closest(e.target, selector);

        if (e.delegateTarget) {
            callback.call(element, e);
        }
    }
}

module.exports = delegate;

},{"./closest":"node_modules/delegate/src/closest.js"}],"node_modules/swup/lib/modules/Cache.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Cache = exports.Cache = function () {
	function Cache() {
		_classCallCheck(this, Cache);

		this.pages = {};
		this.last = null;
	}

	_createClass(Cache, [{
		key: 'cacheUrl',
		value: function cacheUrl(page) {
			if (page.url in this.pages === false) {
				this.pages[page.url] = page;
			}
			this.last = this.pages[page.url];
			this.swup.log('Cache (' + Object.keys(this.pages).length + ')', this.pages);
		}
	}, {
		key: 'getPage',
		value: function getPage(url) {
			return this.pages[url];
		}
	}, {
		key: 'getCurrentPage',
		value: function getCurrentPage() {
			return this.getPage(window.location.pathname + window.location.search);
		}
	}, {
		key: 'exists',
		value: function exists(url) {
			return url in this.pages;
		}
	}, {
		key: 'empty',
		value: function empty() {
			this.pages = {};
			this.last = null;
			this.swup.log('Cache cleared');
		}
	}, {
		key: 'remove',
		value: function remove(url) {
			delete this.pages[url];
		}
	}]);

	return Cache;
}();

exports.default = Cache;
},{}],"node_modules/swup/lib/helpers/classify.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var classify = function classify(text) {
	var output = text.toString().toLowerCase().replace(/\s+/g, '-') // Replace spaces with -
	.replace(/\//g, '-') // Replace / with -
	.replace(/[^\w\-]+/g, '') // Remove all non-word chars
	.replace(/\-\-+/g, '-') // Replace multiple - with single -
	.replace(/^-+/, '') // Trim - from start of text
	.replace(/-+$/, ''); // Trim - from end of text
	if (output[0] === '/') output = output.splice(1);
	if (output === '') output = 'homepage';
	return output;
};

exports.default = classify;
},{}],"node_modules/swup/lib/helpers/createHistoryRecord.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var createHistoryRecord = function createHistoryRecord(url) {
	window.history.pushState({
		url: url || window.location.href.split(window.location.hostname)[1],
		random: Math.random(),
		source: 'swup'
	}, document.getElementsByTagName('title')[0].innerText, url || window.location.href.split(window.location.hostname)[1]);
};

exports.default = createHistoryRecord;
},{}],"node_modules/swup/lib/utils/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var query = exports.query = function query(selector) {
	var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

	if (typeof selector !== 'string') {
		return selector;
	}

	return context.querySelector(selector);
};

var queryAll = exports.queryAll = function queryAll(selector) {
	var context = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : document;

	if (typeof selector !== 'string') {
		return selector;
	}

	return Array.prototype.slice.call(context.querySelectorAll(selector));
};
},{}],"node_modules/swup/lib/helpers/getDataFromHtml.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _utils = require('../utils');

var getDataFromHtml = function getDataFromHtml(html, containers) {
	var fakeDom = document.createElement('html');
	fakeDom.innerHTML = html;
	var blocks = [];

	var _loop = function _loop(i) {
		if (fakeDom.querySelector(containers[i]) == null) {
			// page in invalid
			return {
				v: null
			};
		} else {
			(0, _utils.queryAll)(containers[i]).forEach(function (item, index) {
				(0, _utils.queryAll)(containers[i], fakeDom)[index].setAttribute('data-swup', blocks.length); // marks element with data-swup
				blocks.push((0, _utils.queryAll)(containers[i], fakeDom)[index].outerHTML);
			});
		}
	};

	for (var i = 0; i < containers.length; i++) {
		var _ret = _loop(i);

		if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
	}

	var json = {
		title: fakeDom.querySelector('title').innerText,
		pageClass: fakeDom.querySelector('body').className,
		originalContent: html,
		blocks: blocks
	};

	// to prevent memory leaks
	fakeDom.innerHTML = '';
	fakeDom = null;

	return json;
};

exports.default = getDataFromHtml;
},{"../utils":"node_modules/swup/lib/utils/index.js"}],"node_modules/swup/lib/helpers/fetch.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var fetch = function fetch(setOptions) {
	var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

	var defaults = {
		url: window.location.pathname + window.location.search,
		method: 'GET',
		data: null,
		headers: {}
	};

	var options = _extends({}, defaults, setOptions);

	var request = new XMLHttpRequest();

	request.onreadystatechange = function () {
		if (request.readyState === 4) {
			if (request.status !== 500) {
				callback(request);
			} else {
				callback(request);
			}
		}
	};

	request.open(options.method, options.url, true);
	Object.keys(options.headers).forEach(function (key) {
		request.setRequestHeader(key, options.headers[key]);
	});
	request.send(options.data);
	return request;
};

exports.default = fetch;
},{}],"node_modules/swup/lib/helpers/transitionEnd.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var transitionEnd = function transitionEnd() {
	var el = document.createElement('div');

	var transEndEventNames = {
		WebkitTransition: 'webkitTransitionEnd',
		MozTransition: 'transitionend',
		OTransition: 'oTransitionEnd otransitionend',
		transition: 'transitionend'
	};

	for (var name in transEndEventNames) {
		if (el.style[name] !== undefined) {
			return transEndEventNames[name];
		}
	}

	return false;
};

exports.default = transitionEnd;
},{}],"node_modules/swup/lib/helpers/getCurrentUrl.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var getCurrentUrl = function getCurrentUrl() {
	return window.location.pathname + window.location.search;
};

exports.default = getCurrentUrl;
},{}],"node_modules/swup/lib/helpers/markSwupElements.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('../utils');

var markSwupElements = function markSwupElements(element, containers) {
	var blocks = 0;

	var _loop = function _loop(i) {
		if (element.querySelector(containers[i]) == null) {
			console.warn('Element ' + containers[i] + ' is not in current page.');
		} else {
			(0, _utils.queryAll)(containers[i]).forEach(function (item, index) {
				(0, _utils.queryAll)(containers[i], element)[index].setAttribute('data-swup', blocks);
				blocks++;
			});
		}
	};

	for (var i = 0; i < containers.length; i++) {
		_loop(i);
	}
};

exports.default = markSwupElements;
},{"../utils":"node_modules/swup/lib/utils/index.js"}],"node_modules/swup/lib/helpers/Link.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Link = function () {
	function Link(elementOrUrl) {
		_classCallCheck(this, Link);

		if (elementOrUrl instanceof Element || elementOrUrl instanceof SVGElement) {
			this.link = elementOrUrl;
		} else {
			this.link = document.createElement('a');
			this.link.href = elementOrUrl;
		}
	}

	_createClass(Link, [{
		key: 'getPath',
		value: function getPath() {
			var path = this.link.pathname;
			if (path[0] !== '/') {
				path = '/' + path;
			}
			return path;
		}
	}, {
		key: 'getAddress',
		value: function getAddress() {
			var path = this.link.pathname + this.link.search;

			if (this.link.getAttribute('xlink:href')) {
				path = this.link.getAttribute('xlink:href');
			}

			if (path[0] !== '/') {
				path = '/' + path;
			}
			return path;
		}
	}, {
		key: 'getHash',
		value: function getHash() {
			return this.link.hash;
		}
	}]);

	return Link;
}();

exports.default = Link;
},{}],"node_modules/swup/lib/helpers/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Link = exports.markSwupElements = exports.getCurrentUrl = exports.transitionEnd = exports.fetch = exports.getDataFromHtml = exports.createHistoryRecord = exports.classify = undefined;

var _classify = require('./classify');

var _classify2 = _interopRequireDefault(_classify);

var _createHistoryRecord = require('./createHistoryRecord');

var _createHistoryRecord2 = _interopRequireDefault(_createHistoryRecord);

var _getDataFromHtml = require('./getDataFromHtml');

var _getDataFromHtml2 = _interopRequireDefault(_getDataFromHtml);

var _fetch = require('./fetch');

var _fetch2 = _interopRequireDefault(_fetch);

var _transitionEnd = require('./transitionEnd');

var _transitionEnd2 = _interopRequireDefault(_transitionEnd);

var _getCurrentUrl = require('./getCurrentUrl');

var _getCurrentUrl2 = _interopRequireDefault(_getCurrentUrl);

var _markSwupElements = require('./markSwupElements');

var _markSwupElements2 = _interopRequireDefault(_markSwupElements);

var _Link = require('./Link');

var _Link2 = _interopRequireDefault(_Link);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var classify = exports.classify = _classify2.default;
var createHistoryRecord = exports.createHistoryRecord = _createHistoryRecord2.default;
var getDataFromHtml = exports.getDataFromHtml = _getDataFromHtml2.default;
var fetch = exports.fetch = _fetch2.default;
var transitionEnd = exports.transitionEnd = _transitionEnd2.default;
var getCurrentUrl = exports.getCurrentUrl = _getCurrentUrl2.default;
var markSwupElements = exports.markSwupElements = _markSwupElements2.default;
var Link = exports.Link = _Link2.default;
},{"./classify":"node_modules/swup/lib/helpers/classify.js","./createHistoryRecord":"node_modules/swup/lib/helpers/createHistoryRecord.js","./getDataFromHtml":"node_modules/swup/lib/helpers/getDataFromHtml.js","./fetch":"node_modules/swup/lib/helpers/fetch.js","./transitionEnd":"node_modules/swup/lib/helpers/transitionEnd.js","./getCurrentUrl":"node_modules/swup/lib/helpers/getCurrentUrl.js","./markSwupElements":"node_modules/swup/lib/helpers/markSwupElements.js","./Link":"node_modules/swup/lib/helpers/Link.js"}],"node_modules/swup/lib/modules/loadPage.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _helpers = require('../helpers');

var loadPage = function loadPage(data, popstate) {
	var _this = this;

	// create array for storing animation promises
	var animationPromises = [],
	    xhrPromise = void 0;
	var animateOut = function animateOut() {
		_this.triggerEvent('animationOutStart');

		// handle classes
		document.documentElement.classList.add('is-changing');
		document.documentElement.classList.add('is-leaving');
		document.documentElement.classList.add('is-animating');
		if (popstate) {
			document.documentElement.classList.add('is-popstate');
		}
		document.documentElement.classList.add('to-' + (0, _helpers.classify)(data.url));

		// animation promise stuff
		animationPromises = _this.getAnimationPromises('out');
		Promise.all(animationPromises).then(function () {
			_this.triggerEvent('animationOutDone');
		});

		// create history record if this is not a popstate call
		if (!popstate) {
			// create pop element with or without anchor
			var state = void 0;
			if (_this.scrollToElement != null) {
				state = data.url + _this.scrollToElement;
			} else {
				state = data.url;
			}

			(0, _helpers.createHistoryRecord)(state);
		}
	};

	this.triggerEvent('transitionStart', popstate);

	// set transition object
	if (data.customTransition != null) {
		this.updateTransition(window.location.pathname, data.url, data.customTransition);
		document.documentElement.classList.add('to-' + (0, _helpers.classify)(data.customTransition));
	} else {
		this.updateTransition(window.location.pathname, data.url);
	}

	// start/skip animation
	if (!popstate || this.options.animateHistoryBrowsing) {
		animateOut();
	} else {
		this.triggerEvent('animationSkipped');
	}

	// start/skip loading of page
	if (this.cache.exists(data.url)) {
		xhrPromise = new Promise(function (resolve) {
			resolve();
		});
		this.triggerEvent('pageRetrievedFromCache');
	} else {
		if (!this.preloadPromise || this.preloadPromise.route != data.url) {
			xhrPromise = new Promise(function (resolve, reject) {
				(0, _helpers.fetch)(_extends({}, data, { headers: _this.options.requestHeaders }), function (response) {
					if (response.status === 500) {
						_this.triggerEvent('serverError');
						reject(data.url);
						return;
					} else {
						// get json data
						var page = _this.getPageData(response);
						if (page != null) {
							page.url = data.url;
						} else {
							reject(data.url);
							return;
						}
						// render page
						_this.cache.cacheUrl(page);
						_this.triggerEvent('pageLoaded');
					}
					resolve();
				});
			});
		} else {
			xhrPromise = this.preloadPromise;
		}
	}

	// when everything is ready, handle the outcome
	Promise.all(animationPromises.concat([xhrPromise])).then(function () {
		// render page
		_this.renderPage(_this.cache.getPage(data.url), popstate);
		_this.preloadPromise = null;
	}).catch(function (errorUrl) {
		// rewrite the skipPopStateHandling function to redirect manually when the history.go is processed
		_this.options.skipPopStateHandling = function () {
			window.location = errorUrl;
			return true;
		};

		// go back to the actual page were still at
		window.history.go(-1);
	});
};

exports.default = loadPage;
},{"../helpers":"node_modules/swup/lib/helpers/index.js"}],"node_modules/swup/lib/modules/renderPage.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('../utils');

var _helpers = require('../helpers');

var renderPage = function renderPage(page, popstate) {
	var _this = this;

	document.documentElement.classList.remove('is-leaving');

	// replace state in case the url was redirected
	var link = new _helpers.Link(page.responseURL);
	if (window.location.pathname !== link.getPath()) {
		window.history.replaceState({
			url: link.getPath(),
			random: Math.random(),
			source: 'swup'
		}, document.title, link.getPath());

		// save new record for redirected url
		this.cache.cacheUrl(_extends({}, page, { url: link.getPath() }));
	}

	// only add for non-popstate transitions
	if (!popstate || this.options.animateHistoryBrowsing) {
		document.documentElement.classList.add('is-rendering');
	}

	this.triggerEvent('willReplaceContent', popstate);

	// replace blocks
	for (var i = 0; i < page.blocks.length; i++) {
		document.body.querySelector('[data-swup="' + i + '"]').outerHTML = page.blocks[i];
	}

	// set title
	document.title = page.title;

	this.triggerEvent('contentReplaced', popstate);
	this.triggerEvent('pageView', popstate);

	// empty cache if it's disabled (because pages could be preloaded and stuff)
	if (!this.options.cache) {
		this.cache.empty();
	}

	// start animation IN
	setTimeout(function () {
		if (!popstate || _this.options.animateHistoryBrowsing) {
			_this.triggerEvent('animationInStart');
			document.documentElement.classList.remove('is-animating');
		}
	}, 10);

	// handle end of animation
	var animationPromises = this.getAnimationPromises('in');
	if (!popstate || this.options.animateHistoryBrowsing) {
		Promise.all(animationPromises).then(function () {
			_this.triggerEvent('animationInDone');
			_this.triggerEvent('transitionEnd', popstate);
			// remove "to-{page}" classes
			document.documentElement.className.split(' ').forEach(function (classItem) {
				if (new RegExp('^to-').test(classItem) || classItem === 'is-changing' || classItem === 'is-rendering' || classItem === 'is-popstate') {
					document.documentElement.classList.remove(classItem);
				}
			});
		});
	} else {
		this.triggerEvent('transitionEnd', popstate);
	}

	// reset scroll-to element
	this.scrollToElement = null;
};

exports.default = renderPage;
},{"../utils":"node_modules/swup/lib/utils/index.js","../helpers":"node_modules/swup/lib/helpers/index.js"}],"node_modules/swup/lib/modules/triggerEvent.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var triggerEvent = function triggerEvent(eventName, originalEvent) {
	// call saved handlers with "on" method and pass originalEvent object if available
	this._handlers[eventName].forEach(function (handler) {
		try {
			handler(originalEvent);
		} catch (error) {
			console.error(error);
		}
	});

	// trigger event on document with prefix "swup:"
	var event = new CustomEvent('swup:' + eventName, { detail: eventName });
	document.dispatchEvent(event);
};

exports.default = triggerEvent;
},{}],"node_modules/swup/lib/modules/on.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var on = function on(event, handler) {
	if (this._handlers[event]) {
		this._handlers[event].push(handler);
	} else {
		console.warn("Unsupported event " + event + ".");
	}
};

exports.default = on;
},{}],"node_modules/swup/lib/modules/off.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var off = function off(event, handler) {
	var _this = this;

	if (event != null) {
		if (handler != null) {
			if (this._handlers[event] && this._handlers[event].filter(function (savedHandler) {
				return savedHandler === handler;
			}).length) {
				var toRemove = this._handlers[event].filter(function (savedHandler) {
					return savedHandler === handler;
				})[0];
				var index = this._handlers[event].indexOf(toRemove);
				if (index > -1) {
					this._handlers[event].splice(index, 1);
				}
			} else {
				console.warn("Handler for event '" + event + "' no found.");
			}
		} else {
			this._handlers[event] = [];
		}
	} else {
		Object.keys(this._handlers).forEach(function (keys) {
			_this._handlers[keys] = [];
		});
	}
};

exports.default = off;
},{}],"node_modules/swup/lib/modules/updateTransition.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
var updateTransition = function updateTransition(from, to, custom) {
	// transition routes
	this.transition = {
		from: from,
		to: to,
		custom: custom
	};
};

exports.default = updateTransition;
},{}],"node_modules/swup/lib/modules/getAnimationPromises.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _utils = require('../utils');

var _helpers = require('../helpers');

var getAnimationPromises = function getAnimationPromises() {
	var promises = [];
	var animatedElements = (0, _utils.queryAll)(this.options.animationSelector);
	animatedElements.forEach(function (element) {
		var promise = new Promise(function (resolve) {
			element.addEventListener((0, _helpers.transitionEnd)(), function (event) {
				if (element == event.target) {
					resolve();
				}
			});
		});
		promises.push(promise);
	});
	return promises;
};

exports.default = getAnimationPromises;
},{"../utils":"node_modules/swup/lib/utils/index.js","../helpers":"node_modules/swup/lib/helpers/index.js"}],"node_modules/swup/lib/modules/getPageData.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _helpers = require('../helpers');

var getPageData = function getPageData(request) {
	// this method can be replaced in case other content than html is expected to be received from server
	// this function should always return {title, pageClass, originalContent, blocks, responseURL}
	// in case page has invalid structure - return null
	var html = request.responseText;
	var pageObject = (0, _helpers.getDataFromHtml)(html, this.options.containers);

	if (pageObject) {
		pageObject.responseURL = request.responseURL ? request.responseURL : window.location.href;
	} else {
		console.warn('Received page is invalid.');
		return null;
	}

	return pageObject;
};

exports.default = getPageData;
},{"../helpers":"node_modules/swup/lib/helpers/index.js"}],"node_modules/swup/lib/modules/plugins.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var use = exports.use = function use(plugin) {
	if (!plugin.isSwupPlugin) {
		console.warn('Not swup plugin instance ' + plugin + '.');
		return;
	}

	this.plugins.push(plugin);
	plugin.swup = this;
	if (typeof plugin._beforeMount === 'function') {
		plugin._beforeMount();
	}
	plugin.mount();

	return this.plugins;
};

var unuse = exports.unuse = function unuse(plugin) {
	var pluginReference = void 0;

	if (typeof plugin === 'string') {
		pluginReference = this.plugins.find(function (p) {
			return plugin === p.name;
		});
	} else {
		pluginReference = plugin;
	}

	if (!pluginReference) {
		console.warn('No such plugin.');
		return;
	}

	pluginReference.unmount();

	if (typeof pluginReference._afterUnmount === 'function') {
		pluginReference._afterUnmount();
	}

	var index = this.plugins.indexOf(pluginReference);
	this.plugins.splice(index, 1);

	return this.plugins;
};

var findPlugin = exports.findPlugin = function findPlugin(pluginName) {
	return this.plugins.find(function (p) {
		return pluginName === p.name;
	});
};
},{}],"node_modules/swup/lib/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

// modules


var _delegate = require('delegate');

var _delegate2 = _interopRequireDefault(_delegate);

var _Cache = require('./modules/Cache');

var _Cache2 = _interopRequireDefault(_Cache);

var _loadPage = require('./modules/loadPage');

var _loadPage2 = _interopRequireDefault(_loadPage);

var _renderPage = require('./modules/renderPage');

var _renderPage2 = _interopRequireDefault(_renderPage);

var _triggerEvent = require('./modules/triggerEvent');

var _triggerEvent2 = _interopRequireDefault(_triggerEvent);

var _on = require('./modules/on');

var _on2 = _interopRequireDefault(_on);

var _off = require('./modules/off');

var _off2 = _interopRequireDefault(_off);

var _updateTransition = require('./modules/updateTransition');

var _updateTransition2 = _interopRequireDefault(_updateTransition);

var _getAnimationPromises = require('./modules/getAnimationPromises');

var _getAnimationPromises2 = _interopRequireDefault(_getAnimationPromises);

var _getPageData = require('./modules/getPageData');

var _getPageData2 = _interopRequireDefault(_getPageData);

var _plugins = require('./modules/plugins');

var _utils = require('./utils');

var _helpers = require('./helpers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Swup = function () {
	function Swup(setOptions) {
		_classCallCheck(this, Swup);

		// default options
		var defaults = {
			animateHistoryBrowsing: false,
			animationSelector: '[class*="transition-"]',
			linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]), a[href^="#"]:not([data-no-swup])',
			cache: true,
			containers: ['#swup'],
			requestHeaders: {
				'X-Requested-With': 'swup',
				Accept: 'text/html, application/xhtml+xml'
			},
			plugins: [],
			skipPopStateHandling: function skipPopStateHandling(event) {
				return !(event.state && event.state.source === 'swup');
			}
		};

		// merge options
		var options = _extends({}, defaults, setOptions);

		// handler arrays
		this._handlers = {
			animationInDone: [],
			animationInStart: [],
			animationOutDone: [],
			animationOutStart: [],
			animationSkipped: [],
			clickLink: [],
			contentReplaced: [],
			disabled: [],
			enabled: [],
			openPageInNewTab: [],
			pageLoaded: [],
			pageRetrievedFromCache: [],
			pageView: [],
			popState: [],
			samePage: [],
			samePageWithHash: [],
			serverError: [],
			transitionStart: [],
			transitionEnd: [],
			willReplaceContent: []
		};

		// variable for id of element to scroll to after render
		this.scrollToElement = null;
		// variable for promise used for preload, so no new loading of the same page starts while page is loading
		this.preloadPromise = null;
		// variable for save options
		this.options = options;
		// variable for plugins array
		this.plugins = [];
		// variable for current transition object
		this.transition = {};
		// variable for keeping event listeners from "delegate"
		this.delegatedListeners = {};
		// so we are able to remove the listener
		this.boundPopStateHandler = this.popStateHandler.bind(this);

		// make modules accessible in instance
		this.cache = new _Cache2.default();
		this.cache.swup = this;
		this.loadPage = _loadPage2.default;
		this.renderPage = _renderPage2.default;
		this.triggerEvent = _triggerEvent2.default;
		this.on = _on2.default;
		this.off = _off2.default;
		this.updateTransition = _updateTransition2.default;
		this.getAnimationPromises = _getAnimationPromises2.default;
		this.getPageData = _getPageData2.default;
		this.log = function () {}; // here so it can be used by plugins
		this.use = _plugins.use;
		this.unuse = _plugins.unuse;
		this.findPlugin = _plugins.findPlugin;

		// enable swup
		this.enable();
	}

	_createClass(Swup, [{
		key: 'enable',
		value: function enable() {
			var _this = this;

			// check for Promise support
			if (typeof Promise === 'undefined') {
				console.warn('Promise is not supported');
				return;
			}

			// add event listeners
			this.delegatedListeners.click = (0, _delegate2.default)(document, this.options.linkSelector, 'click', this.linkClickHandler.bind(this));
			window.addEventListener('popstate', this.boundPopStateHandler);

			// initial save to cache
			var page = (0, _helpers.getDataFromHtml)(document.documentElement.outerHTML, this.options.containers);
			page.url = page.responseURL = (0, _helpers.getCurrentUrl)();
			if (this.options.cache) {
				this.cache.cacheUrl(page);
			}

			// mark swup blocks in html
			(0, _helpers.markSwupElements)(document.documentElement, this.options.containers);

			// mount plugins
			this.options.plugins.forEach(function (plugin) {
				_this.use(plugin);
			});

			// modify initial history record
			window.history.replaceState(Object.assign({}, window.history.state, {
				url: window.location.href,
				random: Math.random(),
				source: 'swup'
			}), document.title, window.location.href);

			// trigger enabled event
			this.triggerEvent('enabled');

			// add swup-enabled class to html tag
			document.documentElement.classList.add('swup-enabled');

			// trigger page view event
			this.triggerEvent('pageView');
		}
	}, {
		key: 'destroy',
		value: function destroy() {
			var _this2 = this;

			// remove delegated listeners
			this.delegatedListeners.click.destroy();

			// remove popstate listener
			window.removeEventListener('popstate', this.boundPopStateHandler);

			// empty cache
			this.cache.empty();

			// unmount plugins
			this.options.plugins.forEach(function (plugin) {
				_this2.unuse(plugin);
			});

			// remove swup data atributes from blocks
			(0, _utils.queryAll)('[data-swup]').forEach(function (element) {
				element.removeAttribute('data-swup');
			});

			// remove handlers
			this.off();

			// trigger disable event
			this.triggerEvent('disabled');

			// remove swup-enabled class from html tag
			document.documentElement.classList.remove('swup-enabled');
		}
	}, {
		key: 'linkClickHandler',
		value: function linkClickHandler(event) {
			// no control key pressed
			if (!event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) {
				// index of pressed button needs to be checked because Firefox triggers click on all mouse buttons
				if (event.button === 0) {
					this.triggerEvent('clickLink', event);
					event.preventDefault();
					var link = new _helpers.Link(event.delegateTarget);
					if (link.getAddress() == (0, _helpers.getCurrentUrl)() || link.getAddress() == '') {
						// link to the same URL
						if (link.getHash() != '') {
							// link to the same URL with hash
							this.triggerEvent('samePageWithHash', event);
							var element = document.querySelector(link.getHash());
							if (element != null) {
								history.replaceState({
									url: link.getAddress() + link.getHash(),
									random: Math.random(),
									source: 'swup'
								}, document.title, link.getAddress() + link.getHash());
							} else {
								// referenced element not found
								console.warn('Element for offset not found (' + link.getHash() + ')');
							}
						} else {
							// link to the same URL without hash
							this.triggerEvent('samePage', event);
						}
					} else {
						// link to different url
						if (link.getHash() != '') {
							this.scrollToElement = link.getHash();
						}

						// get custom transition from data
						var customTransition = event.delegateTarget.getAttribute('data-swup-transition');

						// load page
						this.loadPage({ url: link.getAddress(), customTransition: customTransition }, false);
					}
				}
			} else {
				// open in new tab (do nothing)
				this.triggerEvent('openPageInNewTab', event);
			}
		}
	}, {
		key: 'popStateHandler',
		value: function popStateHandler(event) {
			if (this.options.skipPopStateHandling(event)) return;
			var link = new _helpers.Link(event.state ? event.state.url : window.location.pathname);
			if (link.getHash() !== '') {
				this.scrollToElement = link.getHash();
			} else {
				event.preventDefault();
			}
			this.triggerEvent('popState', event);
			this.loadPage({ url: link.getAddress() }, event);
		}
	}]);

	return Swup;
}();

exports.default = Swup;
},{"delegate":"node_modules/delegate/src/delegate.js","./modules/Cache":"node_modules/swup/lib/modules/Cache.js","./modules/loadPage":"node_modules/swup/lib/modules/loadPage.js","./modules/renderPage":"node_modules/swup/lib/modules/renderPage.js","./modules/triggerEvent":"node_modules/swup/lib/modules/triggerEvent.js","./modules/on":"node_modules/swup/lib/modules/on.js","./modules/off":"node_modules/swup/lib/modules/off.js","./modules/updateTransition":"node_modules/swup/lib/modules/updateTransition.js","./modules/getAnimationPromises":"node_modules/swup/lib/modules/getAnimationPromises.js","./modules/getPageData":"node_modules/swup/lib/modules/getPageData.js","./modules/plugins":"node_modules/swup/lib/modules/plugins.js","./utils":"node_modules/swup/lib/utils/index.js","./helpers":"node_modules/swup/lib/helpers/index.js"}],"node_modules/simple-parallax-js/dist/simpleParallax.min.js":[function(require,module,exports) {
var define;
/*!
 * simpleParallax.min - simpleParallax is a simple JavaScript library that gives your website parallax animations on any images or videos, 
 * @date: 20-08-2020 14:0:14, 
 * @version: 5.6.2,
 * @link: https://simpleparallax.com/
 */
!function (t, e) {
  "object" == typeof exports && "object" == typeof module ? module.exports = e() : "function" == typeof define && define.amd ? define("simpleParallax", [], e) : "object" == typeof exports ? exports.simpleParallax = e() : t.simpleParallax = e();
}(window, function () {
  return function (t) {
    var e = {};

    function n(i) {
      if (e[i]) return e[i].exports;
      var r = e[i] = {
        i: i,
        l: !1,
        exports: {}
      };
      return t[i].call(r.exports, r, r.exports, n), r.l = !0, r.exports;
    }

    return n.m = t, n.c = e, n.d = function (t, e, i) {
      n.o(t, e) || Object.defineProperty(t, e, {
        enumerable: !0,
        get: i
      });
    }, n.r = function (t) {
      "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
        value: "Module"
      }), Object.defineProperty(t, "__esModule", {
        value: !0
      });
    }, n.t = function (t, e) {
      if (1 & e && (t = n(t)), 8 & e) return t;
      if (4 & e && "object" == typeof t && t && t.__esModule) return t;
      var i = Object.create(null);
      if (n.r(i), Object.defineProperty(i, "default", {
        enumerable: !0,
        value: t
      }), 2 & e && "string" != typeof t) for (var r in t) n.d(i, r, function (e) {
        return t[e];
      }.bind(null, r));
      return i;
    }, n.n = function (t) {
      var e = t && t.__esModule ? function () {
        return t.default;
      } : function () {
        return t;
      };
      return n.d(e, "a", e), e;
    }, n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    }, n.p = "", n(n.s = 0);
  }([function (t, e, n) {
    "use strict";

    n.r(e), n.d(e, "default", function () {
      return x;
    });

    var i = function () {
      return Element.prototype.closest && "IntersectionObserver" in window;
    };

    function r(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }

    var s = new (function () {
      function t() {
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.positions = {
          top: 0,
          bottom: 0,
          height: 0
        };
      }

      var e, n, i;
      return e = t, (n = [{
        key: "setViewportTop",
        value: function (t) {
          return this.positions.top = t ? t.scrollTop : window.pageYOffset, this.positions;
        }
      }, {
        key: "setViewportBottom",
        value: function () {
          return this.positions.bottom = this.positions.top + this.positions.height, this.positions;
        }
      }, {
        key: "setViewportAll",
        value: function (t) {
          return this.positions.top = t ? t.scrollTop : window.pageYOffset, this.positions.height = t ? t.clientHeight : document.documentElement.clientHeight, this.positions.bottom = this.positions.top + this.positions.height, this.positions;
        }
      }]) && r(e.prototype, n), i && r(e, i), t;
    }())(),
        o = function (t) {
      return NodeList.prototype.isPrototypeOf(t) || HTMLCollection.prototype.isPrototypeOf(t) ? Array.from(t) : "string" == typeof t || t instanceof String ? document.querySelectorAll(t) : [t];
    },
        a = function () {
      for (var t, e = "transform webkitTransform mozTransform oTransform msTransform".split(" "), n = 0; void 0 === t;) t = void 0 !== document.createElement("div").style[e[n]] ? e[n] : void 0, n += 1;

      return t;
    }(),
        l = function (t) {
      return "img" !== t.tagName.toLowerCase() && "picture" !== t.tagName.toLowerCase() || !!t && !!t.complete && (void 0 === t.naturalWidth || 0 !== t.naturalWidth);
    };

    function u(t) {
      return function (t) {
        if (Array.isArray(t)) return c(t);
      }(t) || function (t) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
      }(t) || function (t, e) {
        if (!t) return;
        if ("string" == typeof t) return c(t, e);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        "Object" === n && t.constructor && (n = t.constructor.name);
        if ("Map" === n || "Set" === n) return Array.from(t);
        if ("Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return c(t, e);
      }(t) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function c(t, e) {
      (null == e || e > t.length) && (e = t.length);

      for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];

      return i;
    }

    function h(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }

    var f = function () {
      function t(e, n) {
        var i = this;
        !function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), this.element = e, this.elementContainer = e, this.settings = n, this.isVisible = !0, this.isInit = !1, this.oldTranslateValue = -1, this.init = this.init.bind(this), this.customWrapper = this.settings.customWrapper && this.element.closest(this.settings.customWrapper) ? this.element.closest(this.settings.customWrapper) : null, l(e) ? this.init() : this.element.addEventListener("load", function () {
          setTimeout(function () {
            i.init(!0);
          }, 50);
        });
      }

      var e, n, i;
      return e = t, (n = [{
        key: "init",
        value: function (t) {
          var e = this;
          this.isInit || (t && (this.rangeMax = null), this.element.closest(".simpleParallax") || (!1 === this.settings.overflow && this.wrapElement(this.element), this.setTransformCSS(), this.getElementOffset(), this.intersectionObserver(), this.getTranslateValue(), this.animate(), this.settings.delay > 0 ? setTimeout(function () {
            e.setTransitionCSS(), e.elementContainer.classList.add("simple-parallax-initialized");
          }, 10) : this.elementContainer.classList.add("simple-parallax-initialized"), this.isInit = !0));
        }
      }, {
        key: "wrapElement",
        value: function () {
          var t = this.element.closest("picture") || this.element,
              e = this.customWrapper || document.createElement("div");
          e.classList.add("simpleParallax"), e.style.overflow = "hidden", this.customWrapper || (t.parentNode.insertBefore(e, t), e.appendChild(t)), this.elementContainer = e;
        }
      }, {
        key: "unWrapElement",
        value: function () {
          var t = this.elementContainer;
          this.customWrapper ? (t.classList.remove("simpleParallax"), t.style.overflow = "") : t.replaceWith.apply(t, u(t.childNodes));
        }
      }, {
        key: "setTransformCSS",
        value: function () {
          !1 === this.settings.overflow && (this.element.style[a] = "scale(".concat(this.settings.scale, ")")), this.element.style.willChange = "transform";
        }
      }, {
        key: "setTransitionCSS",
        value: function () {
          this.element.style.transition = "transform ".concat(this.settings.delay, "s ").concat(this.settings.transition);
        }
      }, {
        key: "unSetStyle",
        value: function () {
          this.element.style.willChange = "", this.element.style[a] = "", this.element.style.transition = "";
        }
      }, {
        key: "getElementOffset",
        value: function () {
          var t = this.elementContainer.getBoundingClientRect();

          if (this.elementHeight = t.height, this.elementTop = t.top + s.positions.top, this.settings.customContainer) {
            var e = this.settings.customContainer.getBoundingClientRect();
            this.elementTop = t.top - e.top + s.positions.top;
          }

          this.elementBottom = this.elementHeight + this.elementTop;
        }
      }, {
        key: "buildThresholdList",
        value: function () {
          for (var t = [], e = 1; e <= this.elementHeight; e++) {
            var n = e / this.elementHeight;
            t.push(n);
          }

          return t;
        }
      }, {
        key: "intersectionObserver",
        value: function () {
          var t = {
            root: null,
            threshold: this.buildThresholdList()
          };
          this.observer = new IntersectionObserver(this.intersectionObserverCallback.bind(this), t), this.observer.observe(this.element);
        }
      }, {
        key: "intersectionObserverCallback",
        value: function (t) {
          var e = this;
          t.forEach(function (t) {
            t.isIntersecting ? e.isVisible = !0 : e.isVisible = !1;
          });
        }
      }, {
        key: "checkIfVisible",
        value: function () {
          return this.elementBottom > s.positions.top && this.elementTop < s.positions.bottom;
        }
      }, {
        key: "getRangeMax",
        value: function () {
          var t = this.element.clientHeight;
          this.rangeMax = t * this.settings.scale - t;
        }
      }, {
        key: "getTranslateValue",
        value: function () {
          var t = ((s.positions.bottom - this.elementTop) / ((s.positions.height + this.elementHeight) / 100)).toFixed(1);
          return t = Math.min(100, Math.max(0, t)), 0 !== this.settings.maxTransition && t > this.settings.maxTransition && (t = this.settings.maxTransition), this.oldPercentage !== t && (this.rangeMax || this.getRangeMax(), this.translateValue = (t / 100 * this.rangeMax - this.rangeMax / 2).toFixed(0), this.oldTranslateValue !== this.translateValue && (this.oldPercentage = t, this.oldTranslateValue = this.translateValue, !0));
        }
      }, {
        key: "animate",
        value: function () {
          var t,
              e = 0,
              n = 0;
          (this.settings.orientation.includes("left") || this.settings.orientation.includes("right")) && (n = "".concat(this.settings.orientation.includes("left") ? -1 * this.translateValue : this.translateValue, "px")), (this.settings.orientation.includes("up") || this.settings.orientation.includes("down")) && (e = "".concat(this.settings.orientation.includes("up") ? -1 * this.translateValue : this.translateValue, "px")), t = !1 === this.settings.overflow ? "translate3d(".concat(n, ", ").concat(e, ", 0) scale(").concat(this.settings.scale, ")") : "translate3d(".concat(n, ", ").concat(e, ", 0)"), this.element.style[a] = t;
        }
      }]) && h(e.prototype, n), i && h(e, i), t;
    }();

    function m(t) {
      return function (t) {
        if (Array.isArray(t)) return y(t);
      }(t) || function (t) {
        if ("undefined" != typeof Symbol && Symbol.iterator in Object(t)) return Array.from(t);
      }(t) || d(t) || function () {
        throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function p(t, e) {
      return function (t) {
        if (Array.isArray(t)) return t;
      }(t) || function (t, e) {
        if ("undefined" == typeof Symbol || !(Symbol.iterator in Object(t))) return;
        var n = [],
            i = !0,
            r = !1,
            s = void 0;

        try {
          for (var o, a = t[Symbol.iterator](); !(i = (o = a.next()).done) && (n.push(o.value), !e || n.length !== e); i = !0);
        } catch (t) {
          r = !0, s = t;
        } finally {
          try {
            i || null == a.return || a.return();
          } finally {
            if (r) throw s;
          }
        }

        return n;
      }(t, e) || d(t, e) || function () {
        throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
      }();
    }

    function d(t, e) {
      if (t) {
        if ("string" == typeof t) return y(t, e);
        var n = Object.prototype.toString.call(t).slice(8, -1);
        return "Object" === n && t.constructor && (n = t.constructor.name), "Map" === n || "Set" === n ? Array.from(t) : "Arguments" === n || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n) ? y(t, e) : void 0;
      }
    }

    function y(t, e) {
      (null == e || e > t.length) && (e = t.length);

      for (var n = 0, i = new Array(e); n < e; n++) i[n] = t[n];

      return i;
    }

    function v(t, e) {
      for (var n = 0; n < e.length; n++) {
        var i = e[n];
        i.enumerable = i.enumerable || !1, i.configurable = !0, "value" in i && (i.writable = !0), Object.defineProperty(t, i.key, i);
      }
    }

    var g,
        b,
        w = !1,
        T = [],
        x = function () {
      function t(e, n) {
        if (function (t, e) {
          if (!(t instanceof e)) throw new TypeError("Cannot call a class as a function");
        }(this, t), e && i()) {
          if (this.elements = o(e), this.defaults = {
            delay: 0,
            orientation: "up",
            scale: 1.3,
            overflow: !1,
            transition: "cubic-bezier(0,0,0,1)",
            customContainer: "",
            customWrapper: "",
            maxTransition: 0
          }, this.settings = Object.assign(this.defaults, n), this.settings.customContainer) {
            var r = p(o(this.settings.customContainer), 1);
            this.customContainer = r[0];
          }

          this.lastPosition = -1, this.resizeIsDone = this.resizeIsDone.bind(this), this.refresh = this.refresh.bind(this), this.proceedRequestAnimationFrame = this.proceedRequestAnimationFrame.bind(this), this.init();
        }
      }

      var e, n, r;
      return e = t, (n = [{
        key: "init",
        value: function () {
          var t = this;
          s.setViewportAll(this.customContainer), T = [].concat(m(this.elements.map(function (e) {
            return new f(e, t.settings);
          })), m(T)), w || (this.proceedRequestAnimationFrame(), window.addEventListener("resize", this.resizeIsDone), w = !0);
        }
      }, {
        key: "resizeIsDone",
        value: function () {
          clearTimeout(b), b = setTimeout(this.refresh, 200);
        }
      }, {
        key: "proceedRequestAnimationFrame",
        value: function () {
          var t = this;
          s.setViewportTop(this.customContainer), this.lastPosition !== s.positions.top ? (s.setViewportBottom(), T.forEach(function (e) {
            t.proceedElement(e);
          }), g = window.requestAnimationFrame(this.proceedRequestAnimationFrame), this.lastPosition = s.positions.top) : g = window.requestAnimationFrame(this.proceedRequestAnimationFrame);
        }
      }, {
        key: "proceedElement",
        value: function (t) {
          (this.customContainer ? t.checkIfVisible() : t.isVisible) && t.getTranslateValue() && t.animate();
        }
      }, {
        key: "refresh",
        value: function () {
          s.setViewportAll(this.customContainer), T.forEach(function (t) {
            t.getElementOffset(), t.getRangeMax();
          }), this.lastPosition = -1;
        }
      }, {
        key: "destroy",
        value: function () {
          var t = this,
              e = [];
          T = T.filter(function (n) {
            return t.elements.includes(n.element) ? (e.push(n), !1) : n;
          }), e.forEach(function (e) {
            e.unSetStyle(), !1 === t.settings.overflow && e.unWrapElement();
          }), T.length || (window.cancelAnimationFrame(g), window.removeEventListener("resize", this.refresh), w = !1);
        }
      }]) && v(e.prototype, n), r && v(e, r), t;
    }();
  }]).default;
});
},{}],"node_modules/is-dom-node/dist/is-dom-node.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*! @license is-dom-node v1.0.4

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
function isDomNode(x) {
  return typeof window.Node === 'object' ? x instanceof window.Node : x !== null && typeof x === 'object' && typeof x.nodeType === 'number' && typeof x.nodeName === 'string';
}

var _default = isDomNode;
exports.default = _default;
},{}],"node_modules/is-dom-node-list/dist/is-dom-node-list.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isDomNode = _interopRequireDefault(require("is-dom-node"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*! @license is-dom-node-list v1.2.1

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
function isDomNodeList(x) {
  var prototypeToString = Object.prototype.toString.call(x);
  var regex = /^\[object (HTMLCollection|NodeList|Object)\]$/;
  return typeof window.NodeList === 'object' ? x instanceof window.NodeList : x !== null && typeof x === 'object' && typeof x.length === 'number' && regex.test(prototypeToString) && (x.length === 0 || (0, _isDomNode.default)(x[0]));
}

var _default = isDomNodeList;
exports.default = _default;
},{"is-dom-node":"node_modules/is-dom-node/dist/is-dom-node.es.js"}],"node_modules/tealight/dist/tealight.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _isDomNode = _interopRequireDefault(require("is-dom-node"));

var _isDomNodeList = _interopRequireDefault(require("is-dom-node-list"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*! @license Tealight v0.3.6

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
function tealight(target, context) {
  if (context === void 0) context = document;

  if (target instanceof Array) {
    return target.filter(_isDomNode.default);
  }

  if ((0, _isDomNode.default)(target)) {
    return [target];
  }

  if ((0, _isDomNodeList.default)(target)) {
    return Array.prototype.slice.call(target);
  }

  if (typeof target === "string") {
    try {
      var query = context.querySelectorAll(target);
      return Array.prototype.slice.call(query);
    } catch (err) {
      return [];
    }
  }

  return [];
}

var _default = tealight;
exports.default = _default;
},{"is-dom-node":"node_modules/is-dom-node/dist/is-dom-node.es.js","is-dom-node-list":"node_modules/is-dom-node-list/dist/is-dom-node-list.es.js"}],"node_modules/rematrix/dist/rematrix.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = format;
exports.identity = identity;
exports.inverse = inverse;
exports.multiply = multiply;
exports.parse = parse;
exports.rotate = rotate;
exports.rotateX = rotateX;
exports.rotateY = rotateY;
exports.rotateZ = rotateZ;
exports.scale = scale;
exports.scaleX = scaleX;
exports.scaleY = scaleY;
exports.scaleZ = scaleZ;
exports.skew = skew;
exports.skewX = skewX;
exports.skewY = skewY;
exports.toString = toString;
exports.translate = translate;
exports.translateX = translateX;
exports.translateY = translateY;
exports.translateZ = translateZ;

/*! @license Rematrix v0.3.0

	Copyright 2018 Julian Lloyd.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in
	all copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
	THE SOFTWARE.
*/

/**
 * @module Rematrix
 */

/**
 * Transformation matrices in the browser come in two flavors:
 *
 *  - `matrix` using 6 values (short)
 *  - `matrix3d` using 16 values (long)
 *
 * This utility follows this [conversion guide](https://goo.gl/EJlUQ1)
 * to expand short form matrices to their equivalent long form.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */
function format(source) {
  if (source.constructor !== Array) {
    throw new TypeError('Expected array.');
  }

  if (source.length === 16) {
    return source;
  }

  if (source.length === 6) {
    var matrix = identity();
    matrix[0] = source[0];
    matrix[1] = source[1];
    matrix[4] = source[2];
    matrix[5] = source[3];
    matrix[12] = source[4];
    matrix[13] = source[5];
    return matrix;
  }

  throw new RangeError('Expected array with either 6 or 16 values.');
}
/**
 * Returns a matrix representing no transformation. The product of any matrix
 * multiplied by the identity matrix will be the original matrix.
 *
 * > **Tip:** Similar to how `5 * 1 === 5`, where `1` is the identity.
 *
 * @return {array}
 */


function identity() {
  var matrix = [];

  for (var i = 0; i < 16; i++) {
    i % 5 == 0 ? matrix.push(1) : matrix.push(0);
  }

  return matrix;
}
/**
 * Returns a matrix describing the inverse transformation of the source
 * matrix. The product of any matrix multiplied by its inverse will be the
 * identity matrix.
 *
 * > **Tip:** Similar to how `5 * (1/5) === 1`, where `1/5` is the inverse.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {array}
 */


function inverse(source) {
  var m = format(source);
  var s0 = m[0] * m[5] - m[4] * m[1];
  var s1 = m[0] * m[6] - m[4] * m[2];
  var s2 = m[0] * m[7] - m[4] * m[3];
  var s3 = m[1] * m[6] - m[5] * m[2];
  var s4 = m[1] * m[7] - m[5] * m[3];
  var s5 = m[2] * m[7] - m[6] * m[3];
  var c5 = m[10] * m[15] - m[14] * m[11];
  var c4 = m[9] * m[15] - m[13] * m[11];
  var c3 = m[9] * m[14] - m[13] * m[10];
  var c2 = m[8] * m[15] - m[12] * m[11];
  var c1 = m[8] * m[14] - m[12] * m[10];
  var c0 = m[8] * m[13] - m[12] * m[9];
  var determinant = 1 / (s0 * c5 - s1 * c4 + s2 * c3 + s3 * c2 - s4 * c1 + s5 * c0);

  if (isNaN(determinant) || determinant === Infinity) {
    throw new Error('Inverse determinant attempted to divide by zero.');
  }

  return [(m[5] * c5 - m[6] * c4 + m[7] * c3) * determinant, (-m[1] * c5 + m[2] * c4 - m[3] * c3) * determinant, (m[13] * s5 - m[14] * s4 + m[15] * s3) * determinant, (-m[9] * s5 + m[10] * s4 - m[11] * s3) * determinant, (-m[4] * c5 + m[6] * c2 - m[7] * c1) * determinant, (m[0] * c5 - m[2] * c2 + m[3] * c1) * determinant, (-m[12] * s5 + m[14] * s2 - m[15] * s1) * determinant, (m[8] * s5 - m[10] * s2 + m[11] * s1) * determinant, (m[4] * c4 - m[5] * c2 + m[7] * c0) * determinant, (-m[0] * c4 + m[1] * c2 - m[3] * c0) * determinant, (m[12] * s4 - m[13] * s2 + m[15] * s0) * determinant, (-m[8] * s4 + m[9] * s2 - m[11] * s0) * determinant, (-m[4] * c3 + m[5] * c1 - m[6] * c0) * determinant, (m[0] * c3 - m[1] * c1 + m[2] * c0) * determinant, (-m[12] * s3 + m[13] * s1 - m[14] * s0) * determinant, (m[8] * s3 - m[9] * s1 + m[10] * s0) * determinant];
}
/**
 * Returns a 4x4 matrix describing the combined transformations
 * of both arguments.
 *
 * > **Note:** Order is very important. For example, rotating 45°
 * along the Z-axis, followed by translating 500 pixels along the
 * Y-axis... is not the same as translating 500 pixels along the
 * Y-axis, followed by rotating 45° along on the Z-axis.
 *
 * @param  {array} m - Accepts both short and long form matrices.
 * @param  {array} x - Accepts both short and long form matrices.
 * @return {array}
 */


function multiply(m, x) {
  var fm = format(m);
  var fx = format(x);
  var product = [];

  for (var i = 0; i < 4; i++) {
    var row = [fm[i], fm[i + 4], fm[i + 8], fm[i + 12]];

    for (var j = 0; j < 4; j++) {
      var k = j * 4;
      var col = [fx[k], fx[k + 1], fx[k + 2], fx[k + 3]];
      var result = row[0] * col[0] + row[1] * col[1] + row[2] * col[2] + row[3] * col[3];
      product[i + k] = result;
    }
  }

  return product;
}
/**
 * Attempts to return a 4x4 matrix describing the CSS transform
 * matrix passed in, but will return the identity matrix as a
 * fallback.
 *
 * > **Tip:** This method is used to convert a CSS matrix (retrieved as a
 * `string` from computed styles) to its equivalent array format.
 *
 * @param  {string} source - `matrix` or `matrix3d` CSS Transform value.
 * @return {array}
 */


function parse(source) {
  if (typeof source === 'string') {
    var match = source.match(/matrix(3d)?\(([^)]+)\)/);

    if (match) {
      var raw = match[2].split(', ').map(parseFloat);
      return format(raw);
    }
  }

  return identity();
}
/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * > **Tip:** This is just an alias for `Rematrix.rotateZ` for parity with CSS
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */


function rotate(angle) {
  return rotateZ(angle);
}
/**
 * Returns a 4x4 matrix describing X-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */


function rotateX(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[5] = matrix[10] = Math.cos(theta);
  matrix[6] = matrix[9] = Math.sin(theta);
  matrix[9] *= -1;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Y-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */


function rotateY(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[10] = Math.cos(theta);
  matrix[2] = matrix[8] = Math.sin(theta);
  matrix[2] *= -1;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Z-axis rotation.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */


function rotateZ(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[0] = matrix[5] = Math.cos(theta);
  matrix[1] = matrix[4] = Math.sin(theta);
  matrix[4] *= -1;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing 2D scaling. The first argument
 * is used for both X and Y-axis scaling, unless an optional
 * second argument is provided to explicitly define Y-axis scaling.
 *
 * @param  {number} scalar    - Decimal multiplier.
 * @param  {number} [scalarY] - Decimal multiplier.
 * @return {array}
 */


function scale(scalar, scalarY) {
  var matrix = identity();
  matrix[0] = scalar;
  matrix[5] = typeof scalarY === 'number' ? scalarY : scalar;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing X-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */


function scaleX(scalar) {
  var matrix = identity();
  matrix[0] = scalar;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Y-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */


function scaleY(scalar) {
  var matrix = identity();
  matrix[5] = scalar;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Z-axis scaling.
 *
 * @param  {number} scalar - Decimal multiplier.
 * @return {array}
 */


function scaleZ(scalar) {
  var matrix = identity();
  matrix[10] = scalar;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing shear. The first argument
 * defines X-axis shearing, and an optional second argument
 * defines Y-axis shearing.
 *
 * @param  {number} angleX   - Measured in degrees.
 * @param  {number} [angleY] - Measured in degrees.
 * @return {array}
 */


function skew(angleX, angleY) {
  var thetaX = Math.PI / 180 * angleX;
  var matrix = identity();
  matrix[4] = Math.tan(thetaX);

  if (angleY) {
    var thetaY = Math.PI / 180 * angleY;
    matrix[1] = Math.tan(thetaY);
  }

  return matrix;
}
/**
 * Returns a 4x4 matrix describing X-axis shear.
 *
 * @param  {number} angle - Measured in degrees.
 * @return {array}
 */


function skewX(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[4] = Math.tan(theta);
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Y-axis shear.
 *
 * @param  {number} angle - Measured in degrees
 * @return {array}
 */


function skewY(angle) {
  var theta = Math.PI / 180 * angle;
  var matrix = identity();
  matrix[1] = Math.tan(theta);
  return matrix;
}
/**
 * Returns a CSS Transform property value equivalent to the source matrix.
 *
 * @param  {array} source - Accepts both short and long form matrices.
 * @return {string}
 */


function toString(source) {
  return "matrix3d(" + format(source).join(', ') + ")";
}
/**
 * Returns a 4x4 matrix describing 2D translation. The first
 * argument defines X-axis translation, and an optional second
 * argument defines Y-axis translation.
 *
 * @param  {number} distanceX   - Measured in pixels.
 * @param  {number} [distanceY] - Measured in pixels.
 * @return {array}
 */


function translate(distanceX, distanceY) {
  var matrix = identity();
  matrix[12] = distanceX;

  if (distanceY) {
    matrix[13] = distanceY;
  }

  return matrix;
}
/**
 * Returns a 4x4 matrix describing X-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */


function translateX(distance) {
  var matrix = identity();
  matrix[12] = distance;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Y-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */


function translateY(distance) {
  var matrix = identity();
  matrix[13] = distance;
  return matrix;
}
/**
 * Returns a 4x4 matrix describing Z-axis translation.
 *
 * @param  {number} distance - Measured in pixels.
 * @return {array}
 */


function translateZ(distance) {
  var matrix = identity();
  matrix[14] = distance;
  return matrix;
}
},{}],"node_modules/miniraf/dist/miniraf.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

/*! @license miniraf v1.0.0

	Copyright 2018 Fisssion LLC.

	Permission is hereby granted, free of charge, to any person obtaining a copy
	of this software and associated documentation files (the "Software"), to deal
	in the Software without restriction, including without limitation the rights
	to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	copies of the Software, and to permit persons to whom the Software is
	furnished to do so, subject to the following conditions:

	The above copyright notice and this permission notice shall be included in all
	copies or substantial portions of the Software.

	THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	SOFTWARE.

*/
var polyfill = function () {
  var clock = Date.now();
  return function (callback) {
    var currentTime = Date.now();

    if (currentTime - clock > 16) {
      clock = currentTime;
      callback(currentTime);
    } else {
      setTimeout(function () {
        return polyfill(callback);
      }, 0);
    }
  };
}();

var index = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || polyfill;
var _default = index;
exports.default = _default;
},{}],"node_modules/scrollreveal/dist/scrollreveal.es.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _tealight = _interopRequireDefault(require("tealight"));

var _rematrix = require("rematrix");

var _miniraf = _interopRequireDefault(require("miniraf"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/*! @license ScrollReveal v4.0.7

	Copyright 2020 Fisssion LLC.

	Licensed under the GNU General Public License 3.0 for
	compatible open source projects and non-commercial use.

	For commercial sites, themes, projects, and applications,
	keep your source code private/proprietary by purchasing
	a commercial license from https://scrollrevealjs.org/
*/
var defaults = {
  delay: 0,
  distance: '0',
  duration: 600,
  easing: 'cubic-bezier(0.5, 0, 0, 1)',
  interval: 0,
  opacity: 0,
  origin: 'bottom',
  rotate: {
    x: 0,
    y: 0,
    z: 0
  },
  scale: 1,
  cleanup: false,
  container: document.documentElement,
  desktop: true,
  mobile: true,
  reset: false,
  useDelay: 'always',
  viewFactor: 0.0,
  viewOffset: {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  afterReset: function afterReset() {},
  afterReveal: function afterReveal() {},
  beforeReset: function beforeReset() {},
  beforeReveal: function beforeReveal() {}
};

function failure() {
  document.documentElement.classList.remove('sr');
  return {
    clean: function clean() {},
    destroy: function destroy() {},
    reveal: function reveal() {},
    sync: function sync() {},

    get noop() {
      return true;
    }

  };
}

function success() {
  document.documentElement.classList.add('sr');

  if (document.body) {
    document.body.style.height = '100%';
  } else {
    document.addEventListener('DOMContentLoaded', function () {
      document.body.style.height = '100%';
    });
  }
}

var mount = {
  success: success,
  failure: failure
};

function isObject(x) {
  return x !== null && x instanceof Object && (x.constructor === Object || Object.prototype.toString.call(x) === '[object Object]');
}

function each(collection, callback) {
  if (isObject(collection)) {
    var keys = Object.keys(collection);
    return keys.forEach(function (key) {
      return callback(collection[key], key, collection);
    });
  }

  if (collection instanceof Array) {
    return collection.forEach(function (item, i) {
      return callback(item, i, collection);
    });
  }

  throw new TypeError('Expected either an array or object literal.');
}

function logger(message) {
  var details = [],
      len = arguments.length - 1;

  while (len-- > 0) details[len] = arguments[len + 1];

  if (this.constructor.debug && console) {
    var report = "%cScrollReveal: " + message;
    details.forEach(function (detail) {
      return report += "\n — " + detail;
    });
    console.log(report, 'color: #ea654b;'); // eslint-disable-line no-console
  }
}

function rinse() {
  var this$1 = this;

  var struct = function () {
    return {
      active: [],
      stale: []
    };
  };

  var elementIds = struct();
  var sequenceIds = struct();
  var containerIds = struct();
  /**
   * Take stock of active element IDs.
   */

  try {
    each((0, _tealight.default)('[data-sr-id]'), function (node) {
      var id = parseInt(node.getAttribute('data-sr-id'));
      elementIds.active.push(id);
    });
  } catch (e) {
    throw e;
  }
  /**
   * Destroy stale elements.
   */


  each(this.store.elements, function (element) {
    if (elementIds.active.indexOf(element.id) === -1) {
      elementIds.stale.push(element.id);
    }
  });
  each(elementIds.stale, function (staleId) {
    return delete this$1.store.elements[staleId];
  });
  /**
   * Take stock of active container and sequence IDs.
   */

  each(this.store.elements, function (element) {
    if (containerIds.active.indexOf(element.containerId) === -1) {
      containerIds.active.push(element.containerId);
    }

    if (element.hasOwnProperty('sequence')) {
      if (sequenceIds.active.indexOf(element.sequence.id) === -1) {
        sequenceIds.active.push(element.sequence.id);
      }
    }
  });
  /**
   * Destroy stale containers.
   */

  each(this.store.containers, function (container) {
    if (containerIds.active.indexOf(container.id) === -1) {
      containerIds.stale.push(container.id);
    }
  });
  each(containerIds.stale, function (staleId) {
    var stale = this$1.store.containers[staleId].node;
    stale.removeEventListener('scroll', this$1.delegate);
    stale.removeEventListener('resize', this$1.delegate);
    delete this$1.store.containers[staleId];
  });
  /**
   * Destroy stale sequences.
   */

  each(this.store.sequences, function (sequence) {
    if (sequenceIds.active.indexOf(sequence.id) === -1) {
      sequenceIds.stale.push(sequence.id);
    }
  });
  each(sequenceIds.stale, function (staleId) {
    return delete this$1.store.sequences[staleId];
  });
}

function clean(target) {
  var this$1 = this;
  var dirty;

  try {
    each((0, _tealight.default)(target), function (node) {
      var id = node.getAttribute('data-sr-id');

      if (id !== null) {
        dirty = true;
        var element = this$1.store.elements[id];

        if (element.callbackTimer) {
          window.clearTimeout(element.callbackTimer.clock);
        }

        node.setAttribute('style', element.styles.inline.generated);
        node.removeAttribute('data-sr-id');
        delete this$1.store.elements[id];
      }
    });
  } catch (e) {
    return logger.call(this, 'Clean failed.', e.message);
  }

  if (dirty) {
    try {
      rinse.call(this);
    } catch (e) {
      return logger.call(this, 'Clean failed.', e.message);
    }
  }
}

function destroy() {
  var this$1 = this;
  /**
   * Remove all generated styles and element ids
   */

  each(this.store.elements, function (element) {
    element.node.setAttribute('style', element.styles.inline.generated);
    element.node.removeAttribute('data-sr-id');
  });
  /**
   * Remove all event listeners.
   */

  each(this.store.containers, function (container) {
    var target = container.node === document.documentElement ? window : container.node;
    target.removeEventListener('scroll', this$1.delegate);
    target.removeEventListener('resize', this$1.delegate);
  });
  /**
   * Clear all data from the store
   */

  this.store = {
    containers: {},
    elements: {},
    history: [],
    sequences: {}
  };
}

var getPrefixedCssProp = function () {
  var properties = {};
  var style = document.documentElement.style;

  function getPrefixedCssProperty(name, source) {
    if (source === void 0) source = style;

    if (name && typeof name === 'string') {
      if (properties[name]) {
        return properties[name];
      }

      if (typeof source[name] === 'string') {
        return properties[name] = name;
      }

      if (typeof source["-webkit-" + name] === 'string') {
        return properties[name] = "-webkit-" + name;
      }

      throw new RangeError("Unable to find \"" + name + "\" style property.");
    }

    throw new TypeError('Expected a string.');
  }

  getPrefixedCssProperty.clearCache = function () {
    return properties = {};
  };

  return getPrefixedCssProperty;
}();

function style(element) {
  var computed = window.getComputedStyle(element.node);
  var position = computed.position;
  var config = element.config;
  /**
   * Generate inline styles
   */

  var inline = {};
  var inlineStyle = element.node.getAttribute('style') || '';
  var inlineMatch = inlineStyle.match(/[\w-]+\s*:\s*[^;]+\s*/gi) || [];
  inline.computed = inlineMatch ? inlineMatch.map(function (m) {
    return m.trim();
  }).join('; ') + ';' : '';
  inline.generated = inlineMatch.some(function (m) {
    return m.match(/visibility\s?:\s?visible/i);
  }) ? inline.computed : inlineMatch.concat(['visibility: visible']).map(function (m) {
    return m.trim();
  }).join('; ') + ';';
  /**
   * Generate opacity styles
   */

  var computedOpacity = parseFloat(computed.opacity);
  var configOpacity = !isNaN(parseFloat(config.opacity)) ? parseFloat(config.opacity) : parseFloat(computed.opacity);
  var opacity = {
    computed: computedOpacity !== configOpacity ? "opacity: " + computedOpacity + ";" : '',
    generated: computedOpacity !== configOpacity ? "opacity: " + configOpacity + ";" : ''
  };
  /**
   * Generate transformation styles
   */

  var transformations = [];

  if (parseFloat(config.distance)) {
    var axis = config.origin === 'top' || config.origin === 'bottom' ? 'Y' : 'X';
    /**
     * Let’s make sure our our pixel distances are negative for top and left.
     * e.g. { origin: 'top', distance: '25px' } starts at `top: -25px` in CSS.
     */

    var distance = config.distance;

    if (config.origin === 'top' || config.origin === 'left') {
      distance = /^-/.test(distance) ? distance.substr(1) : "-" + distance;
    }

    var ref = distance.match(/(^-?\d+\.?\d?)|(em$|px$|%$)/g);
    var value = ref[0];
    var unit = ref[1];

    switch (unit) {
      case 'em':
        distance = parseInt(computed.fontSize) * value;
        break;

      case 'px':
        distance = value;
        break;

      case '%':
        /**
         * Here we use `getBoundingClientRect` instead of
         * the existing data attached to `element.geometry`
         * because only the former includes any transformations
         * current applied to the element.
         *
         * If that behavior ends up being unintuitive, this
         * logic could instead utilize `element.geometry.height`
         * and `element.geoemetry.width` for the distance calculation
         */
        distance = axis === 'Y' ? element.node.getBoundingClientRect().height * value / 100 : element.node.getBoundingClientRect().width * value / 100;
        break;

      default:
        throw new RangeError('Unrecognized or missing distance unit.');
    }

    if (axis === 'Y') {
      transformations.push((0, _rematrix.translateY)(distance));
    } else {
      transformations.push((0, _rematrix.translateX)(distance));
    }
  }

  if (config.rotate.x) {
    transformations.push((0, _rematrix.rotateX)(config.rotate.x));
  }

  if (config.rotate.y) {
    transformations.push((0, _rematrix.rotateY)(config.rotate.y));
  }

  if (config.rotate.z) {
    transformations.push((0, _rematrix.rotateZ)(config.rotate.z));
  }

  if (config.scale !== 1) {
    if (config.scale === 0) {
      /**
       * The CSS Transforms matrix interpolation specification
       * basically disallows transitions of non-invertible
       * matrixes, which means browsers won't transition
       * elements with zero scale.
       *
       * That’s inconvenient for the API and developer
       * experience, so we simply nudge their value
       * slightly above zero; this allows browsers
       * to transition our element as expected.
       *
       * `0.0002` was the smallest number
       * that performed across browsers.
       */
      transformations.push((0, _rematrix.scale)(0.0002));
    } else {
      transformations.push((0, _rematrix.scale)(config.scale));
    }
  }

  var transform = {};

  if (transformations.length) {
    transform.property = getPrefixedCssProp('transform');
    /**
     * The default computed transform value should be one of:
     * undefined || 'none' || 'matrix()' || 'matrix3d()'
     */

    transform.computed = {
      raw: computed[transform.property],
      matrix: (0, _rematrix.parse)(computed[transform.property])
    };
    transformations.unshift(transform.computed.matrix);
    var product = transformations.reduce(_rematrix.multiply);
    transform.generated = {
      initial: transform.property + ": matrix3d(" + product.join(', ') + ");",
      final: transform.property + ": matrix3d(" + transform.computed.matrix.join(', ') + ");"
    };
  } else {
    transform.generated = {
      initial: '',
      final: ''
    };
  }
  /**
   * Generate transition styles
   */


  var transition = {};

  if (opacity.generated || transform.generated.initial) {
    transition.property = getPrefixedCssProp('transition');
    transition.computed = computed[transition.property];
    transition.fragments = [];
    var delay = config.delay;
    var duration = config.duration;
    var easing = config.easing;

    if (opacity.generated) {
      transition.fragments.push({
        delayed: "opacity " + duration / 1000 + "s " + easing + " " + delay / 1000 + "s",
        instant: "opacity " + duration / 1000 + "s " + easing + " 0s"
      });
    }

    if (transform.generated.initial) {
      transition.fragments.push({
        delayed: transform.property + " " + duration / 1000 + "s " + easing + " " + delay / 1000 + "s",
        instant: transform.property + " " + duration / 1000 + "s " + easing + " 0s"
      });
    }
    /**
     * The default computed transition property should be undefined, or one of:
     * '' || 'none 0s ease 0s' || 'all 0s ease 0s' || 'all 0s 0s cubic-bezier()'
     */


    var hasCustomTransition = transition.computed && !transition.computed.match(/all 0s|none 0s/);

    if (hasCustomTransition) {
      transition.fragments.unshift({
        delayed: transition.computed,
        instant: transition.computed
      });
    }

    var composed = transition.fragments.reduce(function (composition, fragment, i) {
      composition.delayed += i === 0 ? fragment.delayed : ", " + fragment.delayed;
      composition.instant += i === 0 ? fragment.instant : ", " + fragment.instant;
      return composition;
    }, {
      delayed: '',
      instant: ''
    });
    transition.generated = {
      delayed: transition.property + ": " + composed.delayed + ";",
      instant: transition.property + ": " + composed.instant + ";"
    };
  } else {
    transition.generated = {
      delayed: '',
      instant: ''
    };
  }

  return {
    inline: inline,
    opacity: opacity,
    position: position,
    transform: transform,
    transition: transition
  };
}

function animate(element, force) {
  if (force === void 0) force = {};
  var pristine = force.pristine || this.pristine;
  var delayed = element.config.useDelay === 'always' || element.config.useDelay === 'onload' && pristine || element.config.useDelay === 'once' && !element.seen;
  var shouldReveal = element.visible && !element.revealed;
  var shouldReset = !element.visible && element.revealed && element.config.reset;

  if (force.reveal || shouldReveal) {
    return triggerReveal.call(this, element, delayed);
  }

  if (force.reset || shouldReset) {
    return triggerReset.call(this, element);
  }
}

function triggerReveal(element, delayed) {
  var styles = [element.styles.inline.generated, element.styles.opacity.computed, element.styles.transform.generated.final];

  if (delayed) {
    styles.push(element.styles.transition.generated.delayed);
  } else {
    styles.push(element.styles.transition.generated.instant);
  }

  element.revealed = element.seen = true;
  element.node.setAttribute('style', styles.filter(function (s) {
    return s !== '';
  }).join(' '));
  registerCallbacks.call(this, element, delayed);
}

function triggerReset(element) {
  var styles = [element.styles.inline.generated, element.styles.opacity.generated, element.styles.transform.generated.initial, element.styles.transition.generated.instant];
  element.revealed = false;
  element.node.setAttribute('style', styles.filter(function (s) {
    return s !== '';
  }).join(' '));
  registerCallbacks.call(this, element);
}

function registerCallbacks(element, isDelayed) {
  var this$1 = this;
  var duration = isDelayed ? element.config.duration + element.config.delay : element.config.duration;
  var beforeCallback = element.revealed ? element.config.beforeReveal : element.config.beforeReset;
  var afterCallback = element.revealed ? element.config.afterReveal : element.config.afterReset;
  var elapsed = 0;

  if (element.callbackTimer) {
    elapsed = Date.now() - element.callbackTimer.start;
    window.clearTimeout(element.callbackTimer.clock);
  }

  beforeCallback(element.node);
  element.callbackTimer = {
    start: Date.now(),
    clock: window.setTimeout(function () {
      afterCallback(element.node);
      element.callbackTimer = null;

      if (element.revealed && !element.config.reset && element.config.cleanup) {
        clean.call(this$1, element.node);
      }
    }, duration - elapsed)
  };
}

var nextUniqueId = function () {
  var uid = 0;
  return function () {
    return uid++;
  };
}();

function sequence(element, pristine) {
  if (pristine === void 0) pristine = this.pristine;
  /**
   * We first check if the element should reset.
   */

  if (!element.visible && element.revealed && element.config.reset) {
    return animate.call(this, element, {
      reset: true
    });
  }

  var seq = this.store.sequences[element.sequence.id];
  var i = element.sequence.index;

  if (seq) {
    var visible = new SequenceModel(seq, 'visible', this.store);
    var revealed = new SequenceModel(seq, 'revealed', this.store);
    seq.models = {
      visible: visible,
      revealed: revealed
    };
    /**
     * If the sequence has no revealed members,
     * then we reveal the first visible element
     * within that sequence.
     *
     * The sequence then cues a recursive call
     * in both directions.
     */

    if (!revealed.body.length) {
      var nextId = seq.members[visible.body[0]];
      var nextElement = this.store.elements[nextId];

      if (nextElement) {
        cue.call(this, seq, visible.body[0], -1, pristine);
        cue.call(this, seq, visible.body[0], +1, pristine);
        return animate.call(this, nextElement, {
          reveal: true,
          pristine: pristine
        });
      }
    }
    /**
     * If our element isn’t resetting, we check the
     * element sequence index against the head, and
     * then the foot of the sequence.
     */


    if (!seq.blocked.head && i === [].concat(revealed.head).pop() && i >= [].concat(visible.body).shift()) {
      cue.call(this, seq, i, -1, pristine);
      return animate.call(this, element, {
        reveal: true,
        pristine: pristine
      });
    }

    if (!seq.blocked.foot && i === [].concat(revealed.foot).shift() && i <= [].concat(visible.body).pop()) {
      cue.call(this, seq, i, +1, pristine);
      return animate.call(this, element, {
        reveal: true,
        pristine: pristine
      });
    }
  }
}

function Sequence(interval) {
  var i = Math.abs(interval);

  if (!isNaN(i)) {
    this.id = nextUniqueId();
    this.interval = Math.max(i, 16);
    this.members = [];
    this.models = {};
    this.blocked = {
      head: false,
      foot: false
    };
  } else {
    throw new RangeError('Invalid sequence interval.');
  }
}

function SequenceModel(seq, prop, store) {
  var this$1 = this;
  this.head = [];
  this.body = [];
  this.foot = [];
  each(seq.members, function (id, index) {
    var element = store.elements[id];

    if (element && element[prop]) {
      this$1.body.push(index);
    }
  });

  if (this.body.length) {
    each(seq.members, function (id, index) {
      var element = store.elements[id];

      if (element && !element[prop]) {
        if (index < this$1.body[0]) {
          this$1.head.push(index);
        } else {
          this$1.foot.push(index);
        }
      }
    });
  }
}

function cue(seq, i, direction, pristine) {
  var this$1 = this;
  var blocked = ['head', null, 'foot'][1 + direction];
  var nextId = seq.members[i + direction];
  var nextElement = this.store.elements[nextId];
  seq.blocked[blocked] = true;
  setTimeout(function () {
    seq.blocked[blocked] = false;

    if (nextElement) {
      sequence.call(this$1, nextElement, pristine);
    }
  }, seq.interval);
}

function initialize() {
  var this$1 = this;
  rinse.call(this);
  each(this.store.elements, function (element) {
    var styles = [element.styles.inline.generated];

    if (element.visible) {
      styles.push(element.styles.opacity.computed);
      styles.push(element.styles.transform.generated.final);
      element.revealed = true;
    } else {
      styles.push(element.styles.opacity.generated);
      styles.push(element.styles.transform.generated.initial);
      element.revealed = false;
    }

    element.node.setAttribute('style', styles.filter(function (s) {
      return s !== '';
    }).join(' '));
  });
  each(this.store.containers, function (container) {
    var target = container.node === document.documentElement ? window : container.node;
    target.addEventListener('scroll', this$1.delegate);
    target.addEventListener('resize', this$1.delegate);
  });
  /**
   * Manually invoke delegate once to capture
   * element and container dimensions, container
   * scroll position, and trigger any valid reveals
   */

  this.delegate();
  /**
   * Wipe any existing `setTimeout` now
   * that initialization has completed.
   */

  this.initTimeout = null;
}

function isMobile(agent) {
  if (agent === void 0) agent = navigator.userAgent;
  return /Android|iPhone|iPad|iPod/i.test(agent);
}

function deepAssign(target) {
  var sources = [],
      len = arguments.length - 1;

  while (len-- > 0) sources[len] = arguments[len + 1];

  if (isObject(target)) {
    each(sources, function (source) {
      each(source, function (data, key) {
        if (isObject(data)) {
          if (!target[key] || !isObject(target[key])) {
            target[key] = {};
          }

          deepAssign(target[key], data);
        } else {
          target[key] = data;
        }
      });
    });
    return target;
  } else {
    throw new TypeError('Target must be an object literal.');
  }
}

function reveal(target, options, syncing) {
  var this$1 = this;
  if (options === void 0) options = {};
  if (syncing === void 0) syncing = false;
  var containerBuffer = [];
  var sequence$$1;
  var interval = options.interval || defaults.interval;

  try {
    if (interval) {
      sequence$$1 = new Sequence(interval);
    }

    var nodes = (0, _tealight.default)(target);

    if (!nodes.length) {
      throw new Error('Invalid reveal target.');
    }

    var elements = nodes.reduce(function (elementBuffer, elementNode) {
      var element = {};
      var existingId = elementNode.getAttribute('data-sr-id');

      if (existingId) {
        deepAssign(element, this$1.store.elements[existingId]);
        /**
         * In order to prevent previously generated styles
         * from throwing off the new styles, the style tag
         * has to be reverted to its pre-reveal state.
         */

        element.node.setAttribute('style', element.styles.inline.computed);
      } else {
        element.id = nextUniqueId();
        element.node = elementNode;
        element.seen = false;
        element.revealed = false;
        element.visible = false;
      }

      var config = deepAssign({}, element.config || this$1.defaults, options);

      if (!config.mobile && isMobile() || !config.desktop && !isMobile()) {
        if (existingId) {
          clean.call(this$1, element);
        }

        return elementBuffer; // skip elements that are disabled
      }

      var containerNode = (0, _tealight.default)(config.container)[0];

      if (!containerNode) {
        throw new Error('Invalid container.');
      }

      if (!containerNode.contains(elementNode)) {
        return elementBuffer; // skip elements found outside the container
      }

      var containerId;
      {
        containerId = getContainerId(containerNode, containerBuffer, this$1.store.containers);

        if (containerId === null) {
          containerId = nextUniqueId();
          containerBuffer.push({
            id: containerId,
            node: containerNode
          });
        }
      }
      element.config = config;
      element.containerId = containerId;
      element.styles = style(element);

      if (sequence$$1) {
        element.sequence = {
          id: sequence$$1.id,
          index: sequence$$1.members.length
        };
        sequence$$1.members.push(element.id);
      }

      elementBuffer.push(element);
      return elementBuffer;
    }, []);
    /**
     * Modifying the DOM via setAttribute needs to be handled
     * separately from reading computed styles in the map above
     * for the browser to batch DOM changes (limiting reflows)
     */

    each(elements, function (element) {
      this$1.store.elements[element.id] = element;
      element.node.setAttribute('data-sr-id', element.id);
    });
  } catch (e) {
    return logger.call(this, 'Reveal failed.', e.message);
  }
  /**
   * Now that element set-up is complete...
   * Let’s commit any container and sequence data we have to the store.
   */


  each(containerBuffer, function (container) {
    this$1.store.containers[container.id] = {
      id: container.id,
      node: container.node
    };
  });

  if (sequence$$1) {
    this.store.sequences[sequence$$1.id] = sequence$$1;
  }
  /**
   * If reveal wasn't invoked by sync, we want to
   * make sure to add this call to the history.
   */


  if (syncing !== true) {
    this.store.history.push({
      target: target,
      options: options
    });
    /**
     * Push initialization to the event queue, giving
     * multiple reveal calls time to be interpreted.
     */

    if (this.initTimeout) {
      window.clearTimeout(this.initTimeout);
    }

    this.initTimeout = window.setTimeout(initialize.bind(this), 0);
  }
}

function getContainerId(node) {
  var collections = [],
      len = arguments.length - 1;

  while (len-- > 0) collections[len] = arguments[len + 1];

  var id = null;
  each(collections, function (collection) {
    each(collection, function (container) {
      if (id === null && container.node === node) {
        id = container.id;
      }
    });
  });
  return id;
}
/**
 * Re-runs the reveal method for each record stored in history,
 * for capturing new content asynchronously loaded into the DOM.
 */


function sync() {
  var this$1 = this;
  each(this.store.history, function (record) {
    reveal.call(this$1, record.target, record.options, true);
  });
  initialize.call(this);
}

var polyfill = function (x) {
  return (x > 0) - (x < 0) || +x;
};

var mathSign = Math.sign || polyfill;

function getGeometry(target, isContainer) {
  /**
   * We want to ignore padding and scrollbars for container elements.
   * More information here: https://goo.gl/vOZpbz
   */
  var height = isContainer ? target.node.clientHeight : target.node.offsetHeight;
  var width = isContainer ? target.node.clientWidth : target.node.offsetWidth;
  var offsetTop = 0;
  var offsetLeft = 0;
  var node = target.node;

  do {
    if (!isNaN(node.offsetTop)) {
      offsetTop += node.offsetTop;
    }

    if (!isNaN(node.offsetLeft)) {
      offsetLeft += node.offsetLeft;
    }

    node = node.offsetParent;
  } while (node);

  return {
    bounds: {
      top: offsetTop,
      right: offsetLeft + width,
      bottom: offsetTop + height,
      left: offsetLeft
    },
    height: height,
    width: width
  };
}

function getScrolled(container) {
  var top, left;

  if (container.node === document.documentElement) {
    top = window.pageYOffset;
    left = window.pageXOffset;
  } else {
    top = container.node.scrollTop;
    left = container.node.scrollLeft;
  }

  return {
    top: top,
    left: left
  };
}

function isElementVisible(element) {
  if (element === void 0) element = {};
  var container = this.store.containers[element.containerId];

  if (!container) {
    return;
  }

  var viewFactor = Math.max(0, Math.min(1, element.config.viewFactor));
  var viewOffset = element.config.viewOffset;
  var elementBounds = {
    top: element.geometry.bounds.top + element.geometry.height * viewFactor,
    right: element.geometry.bounds.right - element.geometry.width * viewFactor,
    bottom: element.geometry.bounds.bottom - element.geometry.height * viewFactor,
    left: element.geometry.bounds.left + element.geometry.width * viewFactor
  };
  var containerBounds = {
    top: container.geometry.bounds.top + container.scroll.top + viewOffset.top,
    right: container.geometry.bounds.right + container.scroll.left - viewOffset.right,
    bottom: container.geometry.bounds.bottom + container.scroll.top - viewOffset.bottom,
    left: container.geometry.bounds.left + container.scroll.left + viewOffset.left
  };
  return elementBounds.top < containerBounds.bottom && elementBounds.right > containerBounds.left && elementBounds.bottom > containerBounds.top && elementBounds.left < containerBounds.right || element.styles.position === 'fixed';
}

function delegate(event, elements) {
  var this$1 = this;
  if (event === void 0) event = {
    type: 'init'
  };
  if (elements === void 0) elements = this.store.elements;
  (0, _miniraf.default)(function () {
    var stale = event.type === 'init' || event.type === 'resize';
    each(this$1.store.containers, function (container) {
      if (stale) {
        container.geometry = getGeometry.call(this$1, container, true);
      }

      var scroll = getScrolled.call(this$1, container);

      if (container.scroll) {
        container.direction = {
          x: mathSign(scroll.left - container.scroll.left),
          y: mathSign(scroll.top - container.scroll.top)
        };
      }

      container.scroll = scroll;
    });
    /**
     * Due to how the sequencer is implemented, it’s
     * important that we update the state of all
     * elements, before any animation logic is
     * evaluated (in the second loop below).
     */

    each(elements, function (element) {
      if (stale || element.geometry === undefined) {
        element.geometry = getGeometry.call(this$1, element);
      }

      element.visible = isElementVisible.call(this$1, element);
    });
    each(elements, function (element) {
      if (element.sequence) {
        sequence.call(this$1, element);
      } else {
        animate.call(this$1, element);
      }
    });
    this$1.pristine = false;
  });
}

function isTransformSupported() {
  var style = document.documentElement.style;
  return 'transform' in style || 'WebkitTransform' in style;
}

function isTransitionSupported() {
  var style = document.documentElement.style;
  return 'transition' in style || 'WebkitTransition' in style;
}

var version = "4.0.7";
var boundDelegate;
var boundDestroy;
var boundReveal;
var boundClean;
var boundSync;
var config;
var debug;
var instance;

function ScrollReveal(options) {
  if (options === void 0) options = {};
  var invokedWithoutNew = typeof this === 'undefined' || Object.getPrototypeOf(this) !== ScrollReveal.prototype;

  if (invokedWithoutNew) {
    return new ScrollReveal(options);
  }

  if (!ScrollReveal.isSupported()) {
    logger.call(this, 'Instantiation failed.', 'This browser is not supported.');
    return mount.failure();
  }

  var buffer;

  try {
    buffer = config ? deepAssign({}, config, options) : deepAssign({}, defaults, options);
  } catch (e) {
    logger.call(this, 'Invalid configuration.', e.message);
    return mount.failure();
  }

  try {
    var container = (0, _tealight.default)(buffer.container)[0];

    if (!container) {
      throw new Error('Invalid container.');
    }
  } catch (e) {
    logger.call(this, e.message);
    return mount.failure();
  }

  config = buffer;

  if (!config.mobile && isMobile() || !config.desktop && !isMobile()) {
    logger.call(this, 'This device is disabled.', "desktop: " + config.desktop, "mobile: " + config.mobile);
    return mount.failure();
  }

  mount.success();
  this.store = {
    containers: {},
    elements: {},
    history: [],
    sequences: {}
  };
  this.pristine = true;
  boundDelegate = boundDelegate || delegate.bind(this);
  boundDestroy = boundDestroy || destroy.bind(this);
  boundReveal = boundReveal || reveal.bind(this);
  boundClean = boundClean || clean.bind(this);
  boundSync = boundSync || sync.bind(this);
  Object.defineProperty(this, 'delegate', {
    get: function () {
      return boundDelegate;
    }
  });
  Object.defineProperty(this, 'destroy', {
    get: function () {
      return boundDestroy;
    }
  });
  Object.defineProperty(this, 'reveal', {
    get: function () {
      return boundReveal;
    }
  });
  Object.defineProperty(this, 'clean', {
    get: function () {
      return boundClean;
    }
  });
  Object.defineProperty(this, 'sync', {
    get: function () {
      return boundSync;
    }
  });
  Object.defineProperty(this, 'defaults', {
    get: function () {
      return config;
    }
  });
  Object.defineProperty(this, 'version', {
    get: function () {
      return version;
    }
  });
  Object.defineProperty(this, 'noop', {
    get: function () {
      return false;
    }
  });
  return instance ? instance : instance = this;
}

ScrollReveal.isSupported = function () {
  return isTransformSupported() && isTransitionSupported();
};

Object.defineProperty(ScrollReveal, 'debug', {
  get: function () {
    return debug || false;
  },
  set: function (value) {
    return debug = typeof value === 'boolean' ? value : debug;
  }
});
ScrollReveal();
var _default = ScrollReveal;
exports.default = _default;
},{"tealight":"node_modules/tealight/dist/tealight.es.js","rematrix":"node_modules/rematrix/dist/rematrix.es.js","miniraf":"node_modules/miniraf/dist/miniraf.es.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _scrollPlugin = _interopRequireDefault(require("@swup/scroll-plugin"));

var _swup = _interopRequireDefault(require("swup"));

var _simpleParallaxJs = _interopRequireDefault(require("simple-parallax-js"));

var _scrollreveal = _interopRequireDefault(require("scrollreveal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var swup = new _swup.default({
  animateHistoryBrowsing: true,
  linkSelector: 'a[href^="' + window.location.origin + '"]:not([data-no-swup]), a[href^="/"]:not([data-no-swup]):not([target="_blank"])',
  plugins: [new _scrollPlugin.default({
    animateScroll: false
  })]
});
document.addEventListener('swup:animationInStart', function () {
  if (document.URL.includes("aboutme.html")) {
    document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)";
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("ericZ").style.color = "#edeee9";
    document.getElementById("menu-burg").style.color = "#edeee9";
    document.getElementById("rightAbout").style.color = "#edeee9";
    document.getElementById("rightWork").style.color = "#edeee9";
  } else if (document.URL.includes("BART.html")) {
    document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)";
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0)";
    document.getElementById("ericZ").style.color = "#edeee9";
    document.getElementById("menu-burg").style.color = "#edeee9";
    document.getElementById("rightAbout").style.color = "#edeee9";
    document.getElementById("rightWork").style.color = "#edeee9";
  } else {
    document.getElementById("myNav").style.backgroundColor = "#edeee9";
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0)";
  }
});
document.addEventListener('swup:enabled', function () {});
document.addEventListener('swup:contentReplaced', function () {
  if (document.URL.includes("aboutme.html")) {
    new _simpleParallaxJs.default(document.getElementsByClassName('EZportrait'));
    (0, _scrollreveal.default)().reveal('.row', {
      distance: '50px'
    });
  } else if (document.URL.includes("BART.html") || document.URL.includes("takeaction.html")) {
    var isSafari = window.safari !== undefined;

    if (isSafari && windowWatch) {
      alert("bruh");
      var overviewHeight = document.querySelector(".overview").offsetHeight;
      document.querySelector(".videoWrapper").style.height = overviewHeight + "px";
    } else if (isSafari && !windowWatch) {
      document.querySelector(".videoWrapper").style.height = '30vh';
    }

    var movedScreensFlag = true;
    var screensReady = false;
    var movedScreensFlag2 = true;
    anime.timeline({
      loop: false
    }).add({
      targets: '.caseHeadline, .caseSubtitle',
      translateY: [40, 0],
      opacity: [0, 1],
      easing: 'easeInOutQuart',
      duration: 1000
    });
    var windowWatch = window.matchMedia("(max-width: 600px)");

    if (windowWatch) {
      anime.timeline({
        loop: false
      }).add({
        targets: '.row1',
        translateY: [40, 0],
        opacity: [0, 1],
        easing: 'easeInOutQuart',
        duration: 1000
      });
    }

    if (movedScreensFlag) {
      window.onscroll = function () {
        var currentScrollpos = window.pageYOffset;

        if (prevScrollpos > currentScrollpos) {
          document.getElementById("navbar").style.top = "0";
        } else if (prevScrollpos <= 82) {
          document.getElementById("navbar").style.top = "0";
        } else {
          document.getElementById("navbar").style.top = "-90px";
        }

        prevScrollpos = currentScrollpos;
        console.log("before detecting elements");

        if (document.querySelector('.flagpole') != null && document.querySelector('.flagpole2') != null && document.querySelector('.mapsHomeSS') != null && document.querySelector('.mapsOverlaySS') != null) {
          if (isElementInViewport(document.querySelector('.flagpole')) && movedScreensFlag && movedScreensFlag2) {
            console.log("after detecting elements");
            screensReady = true;
            movedScreensFlag = false;
            anime.timeline({
              loop: false
            }).add({
              targets: '.mapsOverlaySS',
              translateY: ['5vw', 0],
              translateX: ['5vw', 0],
              opacity: [0, 1],
              easing: 'easeInOutQuart',
              duration: 1500
            }).add({
              offset: '-=1500',
              targets: '.mapsHomeSS',
              translateY: ['-5vw', 0],
              translateX: ['-5vw', 0],
              opacity: [0, 1],
              easing: 'easeInOutQuart',
              duration: 1500
            });
          }

          if (isElementInViewport(document.querySelector('.flagpole2')) && !movedScreensFlag && movedScreensFlag2) {
            movedScreensFlag2 = false;
            anime.timeline({
              loop: false
            }).add({
              targets: '.posterFlat',
              translateY: ['5vw', 0],
              translateX: ['5vw', 0],
              opacity: [0, 1],
              easing: 'easeInOutQuart',
              duration: 1500
            }).add({
              offset: '-=1500',
              targets: '.mapsAdvisorySS',
              translateY: ['-5vw', 0],
              translateX: ['-5vw', 0],
              opacity: [0, 1],
              transform: "rotate(-7deg)",
              easing: 'easeInOutQuart',
              duration: 1500
            }).add({
              targets: '.forwardCase',
              translateY: [0, '-30px'],
              opacity: [0, 1],
              easing: 'easeInOutQuart',
              duration: 1500
            });
          }

          if (isElementInViewport(document.querySelector('.mapsHomeSS')) && isElementInViewport(document.querySelector('.mapsOverlaySS'))) {}
        } else {
          return;
        }
      };
    }
  } else if (document.URL.includes("work.html")) {
    var _openCase = document.getElementById("casePreviewID");

    var _isCaseOpen = false;

    var _menuBART = document.getElementById("menu-item-BART");

    _menuBART.addEventListener('click', function () {
      var valuesFrom = document.querySelector('.casePreview').getBoundingClientRect();
      var valuesFromTitle = document.querySelector('.titleCaption').getBoundingClientRect();
      console.log(valuesFrom.top);
      document.querySelector('.casePreview').style.filter = "none";
      document.querySelector('.casePreview').style.transformOrigin = "50% 50%";
      var x = window.innerWidth / 2;
      var y = window.innerHeight / 2;
      anime.timeline({
        loop: false
      }).add({
        targets: '.containerProcess',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#h2rec',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#secondCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.followUp',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.columnLabel',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.casePreview',
        translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
        translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
        scale: [1, 1.25],
        zIndex: 9999999,
        easing: 'easeOutExpo',
        duration: 700,
        offset: '-=600'
      }).add({
        targets: '.titleCaption',
        translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
        translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
        zIndex: 99999999,
        opacity: [0, 1],
        duration: 600,
        easing: 'easeInOutQuart',
        delay: '600',
        scale: [1.5, 1.5]
      }).add({
        targets: '#firstCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400',
        delay: 1400,
        complete: function complete(anim) {
          document.getElementById('mediumID').click();
        }
      });
    });

    _openCase.addEventListener('click', function () {
      var valuesFrom = document.querySelector('.casePreview').getBoundingClientRect();
      var valuesFromTitle = document.querySelector('.titleCaption').getBoundingClientRect();
      console.log(valuesFrom.top);
      document.querySelector('.casePreview').style.filter = "none";
      document.querySelector('.casePreview').style.transformOrigin = "50% 50%";
      var x = window.innerWidth / 2;
      var y = window.innerHeight / 2;
      anime.timeline({
        loop: false
      }).add({
        targets: '.containerProcess',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#h2rec',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#secondCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.followUp',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.columnLabel',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.casePreview',
        translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
        translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
        scale: [1, 1.25],
        zIndex: 9999999,
        easing: 'easeOutExpo',
        duration: 700,
        offset: '-=600'
      }).add({
        targets: '.titleCaption',
        translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
        translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
        zIndex: 99999999,
        opacity: [0, 1],
        duration: 600,
        easing: 'easeInOutQuart',
        delay: '600',
        scale: [1.5, 1.5]
      }).add({
        targets: '#firstCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400',
        delay: 1000,
        complete: function complete(anim) {
          document.getElementById('mediumID').click();
        }
      });
    });

    var _openCaseTA = document.getElementById("casePreviewIDTA");

    var _menuTA = document.getElementById("menu-item-TA");

    _menuTA.addEventListener('click', function () {
      var valuesFrom = document.querySelector('#casePreviewIDTA').getBoundingClientRect();
      var valuesFromTitle = document.querySelector('#TACaption').getBoundingClientRect();
      console.log(valuesFrom.top);
      document.querySelector('#casePreviewIDTA').style.filter = "none";
      document.querySelector('#casePreviewIDTA').style.transformOrigin = "50% 50%";
      var x = window.innerWidth / 2;
      var y = window.innerHeight / 2;
      anime.timeline({
        loop: false
      }).add({
        targets: '.containerProcess',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#h2rec',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#firstCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.followUp',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.columnLabel',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#casePreviewIDTA',
        translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
        translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
        scale: [1, 1.25],
        zIndex: 9999999,
        easing: 'easeOutExpo',
        duration: 700,
        offset: '-=600'
      }).add({
        targets: '#TACaption',
        translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
        translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
        zIndex: 99999999,
        opacity: [0, 1],
        duration: 600,
        easing: 'easeInOutQuart',
        delay: '600',
        scale: [1.5, 1.5]
      }).add({
        targets: '#secondCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400',
        delay: 1000,
        complete: function complete(anim) {
          document.getElementById('mediumIDTA').click();
        }
      });
    });

    _openCaseTA.addEventListener('click', function () {
      var valuesFrom = document.querySelector('#casePreviewIDTA').getBoundingClientRect();
      var valuesFromTitle = document.querySelector('#TACaption').getBoundingClientRect();
      console.log(valuesFrom.top);
      document.querySelector('#casePreviewIDTA').style.filter = "none";
      document.querySelector('#casePreviewIDTA').style.transformOrigin = "50% 50%";
      var x = window.innerWidth / 2;
      var y = window.innerHeight / 2;
      anime.timeline({
        loop: false
      }).add({
        targets: '.containerProcess',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#h2rec',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#firstCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.followUp',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.columnLabel',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#casePreviewIDTA',
        translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
        translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
        scale: [1, 1.25],
        zIndex: 9999999,
        easing: 'easeOutExpo',
        duration: 700,
        offset: '-=600'
      }).add({
        targets: '#TACaption',
        translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
        translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
        zIndex: 99999999,
        opacity: [0, 1],
        duration: 600,
        easing: 'easeInOutQuart',
        delay: '600',
        scale: [1.5, 1.5]
      }).add({
        targets: '#secondCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400',
        delay: 1000,
        complete: function complete(anim) {
          document.getElementById('mediumIDTA').click();
        }
      });
    });

    var casePreviewIDTA = document.querySelector('#casePreviewIDTA');
    var itemWrapperHoverIDTA = document.querySelector('#menu-item-wrapper-homeIDTA');
    var previousLeftValTA = itemWrapperHoverIDTA.style.left;

    casePreviewIDTA.onmouseover = function () {
      itemWrapperHoverIDTA.style.left = "0";
      casePreviewIDTA.style.filter = "grayscale(0%)";
    };

    casePreviewIDTA.onmouseout = function () {
      itemWrapperHoverIDTA.style.left = previousLeftValTA;
      casePreviewIDTA.style.filter = "grayscale(100%)";
    };

    itemWrapperHoverIDTA.onmouseover = function () {
      itemWrapperHoverIDTA.style.left = "0";
      casePreviewIDTA.style.filter = "grayscale(0%)";
    };

    itemWrapperHoverIDTA.onmouseout = function () {
      itemWrapperHoverIDTA.style.left = previousLeftValTA;
      casePreviewIDTA.style.filter = "grayscale(100%)";
    };

    var casePreviewHover = document.querySelector('.casePreview');
    var itemWrapperHover = document.querySelector('#menu-item-wrapper-homeID');
    var previousLeftVal = itemWrapperHover.style.left;

    casePreviewHover.onmouseover = function () {
      itemWrapperHover.style.left = "0";
      casePreviewHover.style.filter = "grayscale(0%)";
    };

    casePreviewHover.onmouseout = function () {
      itemWrapperHover.style.left = previousLeftVal;
      casePreviewHover.style.filter = "grayscale(100%)";
    };

    itemWrapperHover.onmouseover = function () {
      itemWrapperHover.style.left = "0";
      casePreviewHover.style.filter = "grayscale(0%)";
    };

    itemWrapperHover.onmouseout = function () {
      itemWrapperHover.style.left = previousLeftVal;
      casePreviewHover.style.filter = "grayscale(100%)";
    };
  } else if (!(document.URL.includes("BART.html") || document.URL.includes("aboutme.html") || document.URL.includes("work.html") || document.URL.includes("takeaction.html"))) {
    var casePreviewHover = document.querySelector('.casePreview');
    var itemWrapperHover = document.querySelector('#menu-item-wrapper-homeID');
    var previousLeftVal = itemWrapperHover.style.left;

    casePreviewHover.onmouseover = function () {
      itemWrapperHover.style.left = "0";
      casePreviewHover.style.filter = "grayscale(0%)";
    };

    casePreviewHover.onmouseout = function () {
      itemWrapperHover.style.left = previousLeftVal;
      casePreviewHover.style.filter = "grayscale(100%)";
    };

    itemWrapperHover.onmouseover = function () {
      itemWrapperHover.style.left = "0";
      casePreviewHover.style.filter = "grayscale(0%)";
    };

    itemWrapperHover.onmouseout = function () {
      itemWrapperHover.style.left = previousLeftVal;
      casePreviewHover.style.filter = "grayscale(100%)";
    }; // var itemWrapperHoverTA = document.querySelector('#menu-item-wrapper-homeIDTA');
    // itemWrapperHoverTA.onmouseover = function() {
    //     itemWrapperHoverTA.style.left = "0";
    // }
    // itemWrapperHoverTA.onmouseout = function() {
    //     itemWrapperHoverTA.style.left = previousLeftVal;
    // }


    var researchImagepar = document.querySelector('.researchImage');
    var ideationImagepar = document.querySelector('.ideationImage');
    var engineerImagepar = document.querySelector('.engineerImage');
    new _simpleParallaxJs.default(researchImagepar);
    new _simpleParallaxJs.default(ideationImagepar);
    new _simpleParallaxJs.default(engineerImagepar);

    window.onscroll = function () {
      var currentScrollpos = window.pageYOffset;

      if (prevScrollpos > currentScrollpos) {
        document.getElementById("navbar").style.top = "0";
      } else if (prevScrollpos <= 82) {
        document.getElementById("navbar").style.top = "0";
      } else {
        document.getElementById("navbar").style.top = "-90px";
      }

      prevScrollpos = currentScrollpos;

      if (!(document.URL.includes("BART.html") || document.URL.includes("aboutme.html") || document.URL.includes("work.html") || document.URL.includes("takeaction.html"))) {
        if (window.innerWidth > 600) {
          if (currentScrollpos > window.innerHeight) {
            document.getElementById("demoReelmp4").style.filter = "blur(10px)";
          } else {
            document.getElementById("demoReelmp4").style.filter = "blur(0px)";
          }

          if (isElementInViewport(document.getElementById("ideateTitle"))) {
            document.getElementById("rrowid").style.filter = "blur(10px)";
            document.getElementById("irowid").style.filter = "blur(0px)";
            document.getElementById("erowid").style.filter = "blur(10px)";
          } else if (isElementInViewport(document.getElementById("rrowid"))) {
            document.getElementById("rrowid").style.filter = "blur(0px)";
            document.getElementById("irowid").style.filter = "blur(10px)";
            document.getElementById("erowid").style.filter = "blur(10px)";
          } else if (isElementInViewport(document.getElementById("engineerTitle"))) {
            document.getElementById("rrowid").style.filter = "blur(10px)";
            document.getElementById("irowid").style.filter = "blur(10px)";
            document.getElementById("erowid").style.filter = "blur(0px)";
            document.getElementById("coverOverID").style.opacity = "1";
            document.getElementById("overlapContactStatement").style.opacity = "1";
            document.getElementById("overlapContactFields").style.opacity = "1";
            document.getElementById("overlapContactStatement").style.zIndex = "1";
            document.getElementById("overlapContactFields").style.zIndex = "1";
            document.getElementById("contactStatement").style.backgroundImage = "linear-gradient(45deg, #108dc7,#ef8e38)";
            document.getElementById("contactFields").style.backgroundImage = "linear-gradient(45deg, #108dc7,#ef8e38)";
          } else if (isElementInViewport(document.getElementById("contactStatement"))) {
            document.getElementById("coverOverID").style.opacity = "0";
            document.getElementById("overlapContactStatement").style.opacity = "0";
            document.getElementById("overlapContactStatement").style.zIndex = "-1";
            document.getElementById("overlapContactFields").style.opacity = "0";
            document.getElementById("overlapContactFields").style.zIndex = "-1";
            document.getElementById("contactStatement").style.backgroundImage = "none";
            document.getElementById("contactFields").style.backgroundImage = "none";
            document.getElementById("wrapperID").style.background = "linear-gradient(45deg, #108dc7,#ef8e38)";
            document.getElementById("wrapperID").style.backgroundSize = "200% 100%";
            document.getElementById("wrapperID").style.animation = "gradient 2s ease-in-out infinite";
            document.getElementById("wrapperID").style.animationDirection = "alternate";
            document.getElementById("erowid").style.filter = "blur(10px)";
          }
        } else {
          if (!isElementInViewport(document.getElementById("demoReelmp4"))) {
            document.getElementById("demoReelmp4").style.filter = "blur(10px)";
          } else if (isElementInViewport(document.getElementById("ideateTitle"))) {} else {
            document.getElementById("demoReelmp4").style.filter = "blur(0px)";
          }

          if (isElementInViewport(document.getElementById("ideateTitle"))) {
            document.getElementById("rrowid").style.filter = "blur(10px)";
            document.getElementById("irowid").style.filter = "blur(0px)";
            document.getElementById("erowid").style.filter = "blur(10px)";
          } else if (isElementInViewport(document.getElementById("rrowid"))) {
            document.getElementById("rrowid").style.filter = "blur(0px)";
            document.getElementById("irowid").style.filter = "blur(10px)";
            document.getElementById("erowid").style.filter = "blur(10px)";
          } else if (isElementInViewport(document.getElementById("engineerTitle"))) {
            document.getElementById("rrowid").style.filter = "blur(10px)";
            document.getElementById("irowid").style.filter = "blur(10px)";
            document.getElementById("erowid").style.filter = "blur(0px)";
            document.getElementById("coverOverID").style.opacity = "1";
            document.getElementById("overlapContactStatement").style.opacity = "1";
            document.getElementById("overlapContactFields").style.opacity = "1";
            document.getElementById("overlapContactStatement").style.zIndex = "1";
            document.getElementById("overlapContactFields").style.zIndex = "1";
            document.getElementById("contactStatement").style.backgroundImage = "linear-gradient(45deg, #108dc7,#ef8e38)";
            document.getElementById("contactFields").style.backgroundImage = "linear-gradient(45deg, #108dc7,#ef8e38)";
          } else if (isElementInViewport(document.getElementById("contactStatement"))) {
            document.getElementById("coverOverID").style.opacity = "0";
            document.getElementById("overlapContactStatement").style.opacity = "0";
            document.getElementById("overlapContactStatement").style.zIndex = "-1";
            document.getElementById("overlapContactFields").style.opacity = "0";
            document.getElementById("overlapContactFields").style.zIndex = "-1";
            document.getElementById("contactStatement").style.backgroundImage = "none";
            document.getElementById("contactFields").style.backgroundImage = "none";
            document.getElementById("wrapperID").style.background = "linear-gradient(45deg, #108dc7,#ef8e38)";
            document.getElementById("wrapperID").style.backgroundSize = "200% 100%";
            document.getElementById("wrapperID").style.animation = "gradient 2s ease-in-out infinite";
            document.getElementById("wrapperID").style.animationDirection = "alternate";
            document.getElementById("erowid").style.filter = "blur(10px)";
          }
        }
      }
    };

    var _openCaseTA2 = document.getElementById("casePreviewIDTA");

    var _menuTA2 = document.getElementById("menu-item-TA");

    _menuTA2.addEventListener('click', function () {
      var valuesFrom = document.querySelector('#casePreviewIDTA').getBoundingClientRect();
      var valuesFromTitle = document.querySelector('#TACaption').getBoundingClientRect();
      console.log(valuesFrom.top);
      document.querySelector('#casePreviewIDTA').style.filter = "none";
      document.querySelector('#casePreviewIDTA').style.transformOrigin = "50% 50%";
      var x = window.innerWidth / 2;
      var y = window.innerHeight / 2;
      anime.timeline({
        loop: false
      }).add({
        targets: '.containerProcess',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#h2rec',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#firstCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.followUp',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.columnLabel',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#casePreviewIDTA',
        translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
        translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
        scale: [1, 1.25],
        zIndex: 9999999,
        easing: 'easeOutExpo',
        duration: 700,
        offset: '-=600'
      }).add({
        targets: '#TACaption',
        translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
        translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
        zIndex: 99999999,
        opacity: [0, 1],
        duration: 600,
        easing: 'easeInOutQuart',
        delay: '600',
        scale: [1.5, 1.5]
      }).add({
        targets: '#secondCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400',
        delay: 1000,
        complete: function complete(anim) {
          document.getElementById('mediumIDTA').click();
        }
      });
    });

    _openCaseTA2.addEventListener('click', function () {
      var valuesFrom = document.querySelector('#casePreviewIDTA').getBoundingClientRect();
      var valuesFromTitle = document.querySelector('#TACaption').getBoundingClientRect();
      console.log(valuesFrom.top);
      document.querySelector('#casePreviewIDTA').style.filter = "none";
      document.querySelector('#casePreviewIDTA').style.transformOrigin = "50% 50%";
      var x = window.innerWidth / 2;
      var y = window.innerHeight / 2;
      anime.timeline({
        loop: false
      }).add({
        targets: '.containerProcess',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#h2rec',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#firstCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.followUp',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.columnLabel',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#casePreviewIDTA',
        translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
        translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
        scale: [1, 1.25],
        zIndex: 9999999,
        easing: 'easeOutExpo',
        duration: 700,
        offset: '-=600'
      }).add({
        targets: '#TACaption',
        translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
        translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
        zIndex: 99999999,
        opacity: [0, 1],
        duration: 600,
        easing: 'easeInOutQuart',
        delay: '600',
        scale: [1.5, 1.5]
      }).add({
        targets: '#secondCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400',
        delay: 1000,
        complete: function complete(anim) {
          document.getElementById('mediumIDTA').click();
        }
      });
    });

    var casePreviewIDTA = document.querySelector('#casePreviewIDTA');
    var itemWrapperHoverIDTA = document.querySelector('#menu-item-wrapper-homeIDTA');
    var previousLeftValTA = itemWrapperHoverIDTA.style.left;

    casePreviewIDTA.onmouseover = function () {
      itemWrapperHoverIDTA.style.left = "0";
      casePreviewIDTA.style.filter = "grayscale(0%)";
    };

    casePreviewIDTA.onmouseout = function () {
      itemWrapperHoverIDTA.style.left = previousLeftValTA;
      casePreviewIDTA.style.filter = "grayscale(100%)";
    };

    itemWrapperHoverIDTA.onmouseover = function () {
      itemWrapperHoverIDTA.style.left = "0";
      casePreviewIDTA.style.filter = "grayscale(0%)";
    };

    itemWrapperHoverIDTA.onmouseout = function () {
      itemWrapperHoverIDTA.style.left = previousLeftValTA;
      casePreviewIDTA.style.filter = "grayscale(100%)";
    };

    var _openCase2 = document.getElementById("casePreviewID");

    var _isCaseOpen2 = false;

    var _menuBART2 = document.getElementById("menu-item-BART");

    _menuBART2.addEventListener('click', function () {
      var valuesFrom = document.querySelector('.casePreview').getBoundingClientRect();
      var valuesFromTitle = document.querySelector('.titleCaption').getBoundingClientRect();
      console.log(valuesFrom.top);
      document.querySelector('.casePreview').style.filter = "none";
      document.querySelector('.casePreview').style.transformOrigin = "50% 50%";
      var x = window.innerWidth / 2;
      var y = window.innerHeight / 2;
      anime.timeline({
        loop: false
      }).add({
        targets: '.containerProcess',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#h2rec',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#secondCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.followUp',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.columnLabel',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.casePreview',
        translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
        translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
        scale: [1, 1.25],
        zIndex: 9999999,
        easing: 'easeOutExpo',
        duration: 700,
        offset: '-=600'
      }).add({
        targets: '.titleCaption',
        translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
        translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
        zIndex: 99999999,
        opacity: [0, 1],
        duration: 600,
        easing: 'easeInOutQuart',
        delay: '600',
        scale: [1.5, 1.5]
      }).add({
        targets: '#firstCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400',
        delay: 1400,
        complete: function complete(anim) {
          document.getElementById('mediumID').click();
        }
      });
    });

    _openCase2.addEventListener('click', function () {
      var valuesFrom = document.querySelector('.casePreview').getBoundingClientRect();
      var valuesFromTitle = document.querySelector('.titleCaption').getBoundingClientRect();
      console.log(valuesFrom.top);
      document.querySelector('.casePreview').style.filter = "none";
      document.querySelector('.casePreview').style.transformOrigin = "50% 50%";
      var x = window.innerWidth / 2;
      var y = window.innerHeight / 2;
      anime.timeline({
        loop: false
      }).add({
        targets: '.containerProcess',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#h2rec',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '#secondCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.followUp',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.columnLabel',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400'
      }).add({
        targets: '.casePreview',
        translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
        translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
        scale: [1, 1.25],
        zIndex: 9999999,
        easing: 'easeOutExpo',
        duration: 700,
        offset: '-=600'
      }).add({
        targets: '.titleCaption',
        translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
        translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
        zIndex: 99999999,
        opacity: [0, 1],
        duration: 600,
        easing: 'easeInOutQuart',
        delay: '600',
        scale: [1.5, 1.5]
      }).add({
        targets: '#firstCell',
        translateY: [0, 25],
        opacity: [1, 0],
        easing: 'easeInOutQuart',
        duration: 600,
        offset: '-=400',
        delay: 1400,
        complete: function complete(anim) {
          document.getElementById('mediumID').click();
        }
      });
    });
  }

  if (document.URL.includes("work.html") || document.URL.includes("index.html")) {}

  var pID = document.getElementById("preloadID");

  if (pID !== null) {
    pID.remove();
  }

  var windowWatch = window.matchMedia("(max-width: 600px)");

  if (windowWatch.matches) {
    anime.timeline({
      loop: false
    }).add({
      targets: '#all',
      translateY: [100, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
      offset: '-=500',
      delay: 400
    }).add({
      targets: '#hero',
      height: ["100vh", "66vh"],
      easing: 'easeInOutQuart',
      duration: 1000,
      offset: '-=900',
      delay: 400
    }).add({});
  } else {
    anime.timeline({
      loop: false
    }).add({
      targets: '#all',
      translateY: [100, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
      offset: '-=500',
      delay: 400
    }).add({
      targets: '#stage',
      translateY: [100, 0],
      opacity: [0, 1],
      easing: 'easeOutExpo',
      duration: 1000,
      offset: '-=900'
    }).add({
      targets: '#hero',
      height: ["100vh", "90vh"],
      easing: 'easeInOutQuart',
      duration: 1000,
      offset: '-=900',
      delay: 400
    }).add({});
  }

  anime.timeline({
    loop: false
  }).add({
    targets: '#abouth2',
    translateY: [60, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    delay: 200
  }).add({
    targets: '.biodesc',
    translateY: [60, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    offset: '-=500'
  }).add({
    targets: '.portraitGray',
    translateY: [60, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    offset: '-=500'
  }).add({
    targets: '.links',
    translateY: [60, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    offset: '-=500'
  }).add({});
  anime.timeline({
    loop: false
  }).add({
    targets: '#h2rec',
    translateY: [60, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    // delay: 600,
    duration: 600 // offset: '-=400',

  }).add({
    targets: '.rowWork',
    translateY: [60, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    offset: '-=400'
  }).add({});
  anime.timeline({
    loop: false
  }).add({
    targets: '#workh2',
    translateY: [60, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    delay: 600
  }).add({
    targets: '.workPreview',
    translateY: [60, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    offset: '-=500'
  }).add({
    targets: '.columnLabel',
    translateY: [60, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    offset: '-=500'
  }).add({});
});
var menuBtn = document.querySelector('.menu-btn');
var subNav = document.querySelector('.overlay a');
var aboutMe = document.getElementById("aboutMe");
var myWork = document.getElementById("myWork");
var home = document.getElementById("ericZ");
subNav.addEventListener('click', function () {
  closeOverlay();
});
home.addEventListener('click', function () {
  closeOverlay();
});
var menuOpen = false;
menuBtn.addEventListener('click', function () {
  if (!menuOpen) {
    openOverlay();
  } else {
    closeOverlay();
  }
});
var textWrapper = document.querySelector(".intro-title");
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
var windowWatch = window.matchMedia("(max-width: 600px)");

if (windowWatch.matches) {
  anime.timeline({
    loop: false
  }).add({
    targets: ".intro-title .letter",
    translateY: [75, 0],
    translateZ: 0,
    scale: 1,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1400,
    delay: function delay(el, i) {
      return 200 + 50 * i;
    }
  }).add({
    targets: ".intro-title .letter",
    translateY: [0, -75],
    scale: 1,
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 1200,
    delay: function delay(el, i) {
      return 50 * i;
    }
  }).add({
    targets: '#all',
    translateY: [25, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    delay: 300
  }).add({
    targets: '#ericZ',
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeInExpo',
    duration: 400,
    delay: 300
  }).add({
    targets: '#rightWork',
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeInExpo',
    duration: 400,
    offset: '-=300'
  }).add({
    targets: '#rightAbout',
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeInExpo',
    duration: 400,
    offset: '-=300'
  }).add({
    targets: '.columnLabel',
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeInExpo',
    duration: 400,
    offset: '-=300'
  }).add({
    targets: '.menu-btn__burger',
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 400,
    offset: '-=600'
  }).add({
    targets: '#hero',
    height: ["85vh", "66vh"],
    easing: 'easeInOutQuart',
    duration: 1000,
    offset: '-=900',
    delay: 400
  }).add({});
  TweenMax.to(".preload", 2.2, {
    delay: 3,
    opacity: "0",
    ease: Expo.easeInOut
  });
  TweenMax.to(".preload", 0.1, {
    delay: 5,
    top: "-100%"
  });
} else {
  anime.timeline({
    loop: false
  }).add({
    targets: ".intro-title .letter",
    translateY: [200, 0],
    translateZ: 0,
    scale: 1,
    opacity: [0, 1],
    easing: "easeOutExpo",
    duration: 1400,
    delay: function delay(el, i) {
      return 200 + 50 * i;
    }
  }).add({
    targets: ".intro-title .letter",
    translateY: [0, -200],
    scale: 1,
    opacity: [1, 0],
    easing: "easeInExpo",
    duration: 1200,
    delay: function delay(el, i) {
      return 50 * i;
    }
  }).add({
    targets: '#all',
    translateY: [100, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 600,
    delay: 300
  }).add({
    targets: '#ericZ',
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeInExpo',
    duration: 400,
    delay: 300
  }).add({
    targets: '#rightWork',
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeInExpo',
    duration: 400,
    offset: '-=300'
  }).add({
    targets: '#rightAbout',
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeInExpo',
    duration: 400,
    offset: '-=300'
  }).add({
    targets: '.columnLabel',
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeInExpo',
    duration: 400,
    offset: '-=300'
  }).add({
    targets: '.menu-btn__burger',
    translateY: [20, 0],
    opacity: [0, 1],
    easing: 'easeOutExpo',
    duration: 400,
    offset: '-=600'
  }).add({
    targets: '#hero',
    height: ["100vh", "90vh"],
    easing: 'easeInOutQuart',
    duration: 1000,
    offset: '-=900',
    delay: 400
  }).add({});
  TweenMax.to(".preload", 2.2, {
    delay: 3,
    opacity: "0",
    ease: Expo.easeInOut
  });
  TweenMax.to(".preload", 0.1, {
    delay: 5,
    top: "-100%"
  });
}

if (TweenMax.isTweening(".preload")) {
  console.log("scroll");
} else {
  console.log("not tweening");
}

aboutMe.addEventListener('click', function () {
  menuBtn.classList.remove('open');
  document.getElementById("myNav").style.height = "0%";
  document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)";
  document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0)";
  document.documentElement.style.overflow = 'scroll';
  document.body.scroll = "yes";
  menuOpen = false;
});
myWork.addEventListener('click', function () {
  menuBtn.classList.remove('open');
  document.getElementById("myNav").style.height = "0%";
  document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)";
  document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0)";
  document.documentElement.style.overflow = 'scroll';
  document.body.scroll = "yes";
  menuOpen = false;
});
var openCase = document.getElementById("casePreviewID");
var isCaseOpen = false;
var menuBART = document.getElementById("menu-item-BART");
menuBART.addEventListener('click', function () {
  var valuesFrom = document.querySelector('.casePreview').getBoundingClientRect();
  var valuesFromTitle = document.querySelector('.titleCaption').getBoundingClientRect();
  console.log(valuesFrom.top);
  document.querySelector('.casePreview').style.filter = "none";
  document.querySelector('.casePreview').style.transformOrigin = "50% 50%";
  var x = window.innerWidth / 2;
  var y = window.innerHeight / 2;
  anime.timeline({
    loop: false
  }).add({
    targets: '.containerProcess',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '#h2rec',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '#secondCell',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '.followUp',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '.columnLabel',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '.casePreview',
    translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
    translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
    scale: [1, 1.25],
    zIndex: 9999999,
    easing: 'easeOutExpo',
    duration: 700,
    offset: '-=600'
  }).add({
    targets: '.titleCaption',
    translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
    translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
    zIndex: 99999999,
    opacity: [0, 1],
    duration: 600,
    easing: 'easeInOutQuart',
    delay: '600',
    scale: [1.5, 1.5]
  }).add({
    targets: '#firstCell',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400',
    delay: 1400,
    complete: function complete(anim) {
      document.getElementById('mediumID').click();
    }
  });
});
openCase.addEventListener('click', function () {
  var valuesFrom = document.querySelector('.casePreview').getBoundingClientRect();
  var valuesFromTitle = document.querySelector('.titleCaption').getBoundingClientRect();
  console.log(valuesFrom.top);
  document.querySelector('.casePreview').style.filter = "none";
  document.querySelector('.casePreview').style.transformOrigin = "50% 50%";
  var x = window.innerWidth / 2;
  var y = window.innerHeight / 2;
  anime.timeline({
    loop: false
  }).add({
    targets: '.containerProcess',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '#h2rec',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '#secondCell',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '.followUp',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '.columnLabel',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '.casePreview',
    translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
    translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
    scale: [1, 1.25],
    zIndex: 9999999,
    easing: 'easeOutExpo',
    duration: 700,
    offset: '-=600'
  }).add({
    targets: '.titleCaption',
    translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
    translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
    zIndex: 99999999,
    opacity: [0, 1],
    duration: 600,
    easing: 'easeInOutQuart',
    delay: '600',
    scale: [1.5, 1.5]
  }).add({
    targets: '#firstCell',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400',
    delay: 1000,
    complete: function complete(anim) {
      document.getElementById('mediumID').click();
    }
  });
});
var openCaseTA = document.getElementById("casePreviewIDTA");
var menuTA = document.getElementById("menu-item-TA");
menuTA.addEventListener('click', function () {
  var valuesFrom = document.querySelector('#casePreviewIDTA').getBoundingClientRect();
  var valuesFromTitle = document.querySelector('#TACaption').getBoundingClientRect();
  console.log(valuesFrom.top);
  document.querySelector('#casePreviewIDTA').style.filter = "none";
  document.querySelector('#casePreviewIDTA').style.transformOrigin = "50% 50%";
  var x = window.innerWidth / 2;
  var y = window.innerHeight / 2;
  anime.timeline({
    loop: false
  }).add({
    targets: '.containerProcess',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '#h2rec',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '#firstCell',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '.followUp',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '.columnLabel',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '#casePreviewIDTA',
    translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
    translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
    scale: [1, 1.25],
    zIndex: 9999999,
    easing: 'easeOutExpo',
    duration: 700,
    offset: '-=600'
  }).add({
    targets: '#TACaption',
    translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
    translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
    zIndex: 99999999,
    opacity: [0, 1],
    duration: 600,
    easing: 'easeInOutQuart',
    delay: '600',
    scale: [1.5, 1.5]
  }).add({
    targets: '#secondCell',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400',
    delay: 1000,
    complete: function complete(anim) {
      document.getElementById('mediumIDTA').click();
    }
  });
});
openCaseTA.addEventListener('click', function () {
  var valuesFrom = document.querySelector('#casePreviewIDTA').getBoundingClientRect();
  var valuesFromTitle = document.querySelector('#TACaption').getBoundingClientRect();
  console.log(valuesFrom.top);
  document.querySelector('#casePreviewIDTA').style.filter = "none";
  document.querySelector('#casePreviewIDTA').style.transformOrigin = "50% 50%";
  var x = window.innerWidth / 2;
  var y = window.innerHeight / 2;
  anime.timeline({
    loop: false
  }).add({
    targets: '.containerProcess',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '#h2rec',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '#firstCell',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '.followUp',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '.columnLabel',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400'
  }).add({
    targets: '#casePreviewIDTA',
    translateX: [0, x - valuesFrom.left - valuesFrom.width / 2],
    translateY: [0, y - valuesFrom.top - valuesFrom.height / 2],
    scale: [1, 1.25],
    zIndex: 9999999,
    easing: 'easeOutExpo',
    duration: 700,
    offset: '-=600'
  }).add({
    targets: '#TACaption',
    translateX: [x - valuesFromTitle.left - valuesFromTitle.width / 2, x - valuesFromTitle.left - valuesFromTitle.width / 2],
    translateY: [y - 25 - valuesFromTitle.top - valuesFromTitle.height / 2, y - valuesFromTitle.top - valuesFromTitle.height / 2],
    zIndex: 99999999,
    opacity: [0, 1],
    duration: 600,
    easing: 'easeInOutQuart',
    delay: '600',
    scale: [1.5, 1.5]
  }).add({
    targets: '#secondCell',
    translateY: [0, 25],
    opacity: [1, 0],
    easing: 'easeInOutQuart',
    duration: 600,
    offset: '-=400',
    delay: 1000,
    complete: function complete(anim) {
      document.getElementById('mediumIDTA').click();
    }
  });
});
var casePreviewIDTA = document.querySelector('#casePreviewIDTA');
var itemWrapperHoverIDTA = document.querySelector('#menu-item-wrapper-homeIDTA');
var previousLeftValTA = itemWrapperHoverIDTA.style.left;

casePreviewIDTA.onmouseover = function () {
  itemWrapperHoverIDTA.style.left = "0";
  casePreviewIDTA.style.filter = "grayscale(0%)";
};

casePreviewIDTA.onmouseout = function () {
  itemWrapperHoverIDTA.style.left = previousLeftValTA;
  casePreviewIDTA.style.filter = "grayscale(100%)";
};

itemWrapperHoverIDTA.onmouseover = function () {
  itemWrapperHoverIDTA.style.left = "0";
  casePreviewIDTA.style.filter = "grayscale(0%)";
};

itemWrapperHoverIDTA.onmouseout = function () {
  itemWrapperHoverIDTA.style.left = previousLeftValTA;
  casePreviewIDTA.style.filter = "grayscale(100%)";
};

var casePreviewHover = document.querySelector('.casePreview');
var itemWrapperHover = document.querySelector('#menu-item-wrapper-homeID');
var previousLeftVal = itemWrapperHover.style.left;

casePreviewHover.onmouseover = function () {
  itemWrapperHover.style.left = "0";
  casePreviewHover.style.filter = "grayscale(0%)";
};

casePreviewHover.onmouseout = function () {
  itemWrapperHover.style.left = previousLeftVal;
  casePreviewHover.style.filter = "grayscale(100%)";
};

itemWrapperHover.onmouseover = function () {
  itemWrapperHover.style.left = "0";
  casePreviewHover.style.filter = "grayscale(0%)";
};

itemWrapperHover.onmouseout = function () {
  itemWrapperHover.style.left = previousLeftVal;
  casePreviewHover.style.filter = "grayscale(100%)";
}; // var itemWrapperHoverTA = document.querySelector('#menu-item-wrapper-homeIDTA');
// itemWrapperHoverTA.onmouseover = function() {
//     itemWrapperHoverTA.style.left = "0";
// }
// itemWrapperHoverTA.onmouseout = function() {
//     itemWrapperHoverTA.style.left = previousLeftVal;
// }


var researchImagepar = document.querySelector('.researchImage');
var ideationImagepar = document.querySelector('.ideationImage');
var engineerImagepar = document.querySelector('.engineerImage');
new _simpleParallaxJs.default(researchImagepar);
new _simpleParallaxJs.default(ideationImagepar);
new _simpleParallaxJs.default(engineerImagepar);

function closeOverlay() {
  if (document.URL.includes("aboutme.html")) {
    menuBtn.classList.remove('open');
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)";
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0)";
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
    menuOpen = false;
  } else {
    menuBtn.classList.remove('open');
    document.getElementById("myNav").style.height = "0%";
    document.getElementById("myNav").style.backgroundColor = "#edeee9";
    document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0)";
    document.documentElement.style.overflow = 'scroll';
    document.body.scroll = "yes";
    menuOpen = false;
  }
}

function openOverlay() {
  menuBtn.classList.add('open');
  document.getElementById("myNav").style.height = "100%";
  document.getElementById("myNav").style.backgroundColor = "rgba(0,0,0,1)";
  document.getElementById("navbar").style.backgroundColor = "rgba(0,0,0,0)";
  document.documentElement.style.overflow = 'hidden';
  document.body.scroll = "no";
  menuOpen = true;
}

function isElementInViewport(el) {
  var rect = el.getBoundingClientRect();
  return rect.top >= 0 && rect.left >= 0 && rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) && rect.right <= (window.innerWidth || document.documentElement.clientWidth);
}

var prevScrollpos = window.pageYOffset;

window.onscroll = function () {
  var currentScrollpos = window.pageYOffset;

  if (prevScrollpos > currentScrollpos) {
    document.getElementById("navbar").style.top = "0";
  } else if (prevScrollpos <= 82) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-90px";
  }

  prevScrollpos = currentScrollpos;

  if (!(document.URL.includes("BART.html") || document.URL.includes("aboutme.html") || document.URL.includes("work.html"))) {
    if (window.innerWidth > 600) {
      if (currentScrollpos > window.innerHeight) {
        document.getElementById("demoReelmp4").style.filter = "blur(10px)";
      } else {
        document.getElementById("demoReelmp4").style.filter = "blur(0px)";
      }

      if (isElementInViewport(document.getElementById("ideateTitle"))) {
        document.getElementById("rrowid").style.filter = "blur(10px)";
        document.getElementById("irowid").style.filter = "blur(0px)";
        document.getElementById("erowid").style.filter = "blur(10px)";
      } else if (isElementInViewport(document.getElementById("rrowid"))) {
        document.getElementById("rrowid").style.filter = "blur(0px)";
        document.getElementById("irowid").style.filter = "blur(10px)";
        document.getElementById("erowid").style.filter = "blur(10px)";
      } else if (isElementInViewport(document.getElementById("engineerTitle"))) {
        document.getElementById("rrowid").style.filter = "blur(10px)";
        document.getElementById("irowid").style.filter = "blur(10px)";
        document.getElementById("erowid").style.filter = "blur(0px)";
        document.getElementById("coverOverID").style.opacity = "1";
        document.getElementById("overlapContactStatement").style.opacity = "1";
        document.getElementById("overlapContactFields").style.opacity = "1";
        document.getElementById("overlapContactStatement").style.zIndex = "1";
        document.getElementById("overlapContactFields").style.zIndex = "1";
        document.getElementById("contactStatement").style.backgroundImage = "linear-gradient(45deg, #108dc7,#ef8e38)";
        document.getElementById("contactFields").style.backgroundImage = "linear-gradient(45deg, #108dc7,#ef8e38)";
      } else if (isElementInViewport(document.getElementById("contactStatement"))) {
        document.getElementById("coverOverID").style.opacity = "0";
        document.getElementById("overlapContactStatement").style.opacity = "0";
        document.getElementById("overlapContactStatement").style.zIndex = "-1";
        document.getElementById("overlapContactFields").style.opacity = "0";
        document.getElementById("overlapContactFields").style.zIndex = "-1";
        document.getElementById("contactStatement").style.backgroundImage = "none";
        document.getElementById("contactFields").style.backgroundImage = "none";
        document.getElementById("wrapperID").style.background = "linear-gradient(45deg, #108dc7,#ef8e38)";
        document.getElementById("wrapperID").style.backgroundSize = "200% 100%";
        document.getElementById("wrapperID").style.animation = "gradient 2s ease-in-out infinite";
        document.getElementById("wrapperID").style.animationDirection = "alternate";
        document.getElementById("erowid").style.filter = "blur(10px)";
      }
    } else {
      if (!isElementInViewport(document.getElementById("demoReelmp4"))) {
        document.getElementById("demoReelmp4").style.filter = "blur(10px)";
      } else if (isElementInViewport(document.getElementById("ideateTitle"))) {} else {
        document.getElementById("demoReelmp4").style.filter = "blur(0px)";
      }

      if (isElementInViewport(document.getElementById("ideateTitle"))) {
        document.getElementById("rrowid").style.filter = "blur(10px)";
        document.getElementById("irowid").style.filter = "blur(0px)";
        document.getElementById("erowid").style.filter = "blur(10px)";
      } else if (isElementInViewport(document.getElementById("rrowid"))) {
        document.getElementById("rrowid").style.filter = "blur(0px)";
        document.getElementById("irowid").style.filter = "blur(10px)";
        document.getElementById("erowid").style.filter = "blur(10px)";
      } else if (isElementInViewport(document.getElementById("engineerTitle"))) {
        document.getElementById("rrowid").style.filter = "blur(10px)";
        document.getElementById("irowid").style.filter = "blur(10px)";
        document.getElementById("erowid").style.filter = "blur(0px)";
        document.getElementById("coverOverID").style.opacity = "1";
        document.getElementById("overlapContactStatement").style.opacity = "1";
        document.getElementById("overlapContactFields").style.opacity = "1";
        document.getElementById("overlapContactStatement").style.zIndex = "1";
        document.getElementById("overlapContactFields").style.zIndex = "1";
        document.getElementById("contactStatement").style.backgroundImage = "linear-gradient(45deg, #108dc7,#ef8e38)";
        document.getElementById("contactFields").style.backgroundImage = "linear-gradient(45deg, #108dc7,#ef8e38)";
      } else if (isElementInViewport(document.getElementById("contactStatement"))) {
        document.getElementById("coverOverID").style.opacity = "0";
        document.getElementById("overlapContactStatement").style.opacity = "0";
        document.getElementById("overlapContactStatement").style.zIndex = "-1";
        document.getElementById("overlapContactFields").style.opacity = "0";
        document.getElementById("overlapContactFields").style.zIndex = "-1";
        document.getElementById("contactStatement").style.backgroundImage = "none";
        document.getElementById("contactFields").style.backgroundImage = "none";
        document.getElementById("wrapperID").style.background = "linear-gradient(45deg, #108dc7,#ef8e38)";
        document.getElementById("wrapperID").style.backgroundSize = "200% 100%";
        document.getElementById("wrapperID").style.animation = "gradient 2s ease-in-out infinite";
        document.getElementById("wrapperID").style.animationDirection = "alternate";
        document.getElementById("erowid").style.filter = "blur(10px)";
      }
    }
  }
};

function handleFirstTab(e) {
  if (e.keyCode === 9) {
    // the "I am a keyboard user" key
    document.body.classList.add('user-is-tabbing');
    window.removeEventListener('keydown', handleFirstTab);
  }
}

window.addEventListener('keydown', handleFirstTab);
},{"@swup/scroll-plugin":"node_modules/@swup/scroll-plugin/lib/index.js","swup":"node_modules/swup/lib/index.js","simple-parallax-js":"node_modules/simple-parallax-js/dist/simpleParallax.min.js","scrollreveal":"node_modules/scrollreveal/dist/scrollreveal.es.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62047" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map