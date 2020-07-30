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
})({"SwupScrollPlugin.min.js":[function(require,module,exports) {
var define;
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function t(e, n) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && (typeof module === "undefined" ? "undefined" : _typeof(module)) === "object") module.exports = n();else if (typeof define === "function" && define.amd) define([], n);else if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object") exports["SwupScrollPlugin"] = n();else e["SwupScrollPlugin"] = n();
})(window, function () {
  return function (t) {
    var e = {};

    function n(o) {
      if (e[o]) {
        return e[o].exports;
      }

      var i = e[o] = {
        i: o,
        l: false,
        exports: {}
      };
      t[o].call(i.exports, i, i.exports, n);
      i.l = true;
      return i.exports;
    }

    n.m = t;
    n.c = e;

    n.d = function (t, e, o) {
      if (!n.o(t, e)) {
        Object.defineProperty(t, e, {
          enumerable: true,
          get: o
        });
      }
    };

    n.r = function (t) {
      if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        Object.defineProperty(t, Symbol.toStringTag, {
          value: "Module"
        });
      }

      Object.defineProperty(t, "__esModule", {
        value: true
      });
    };

    n.t = function (t, e) {
      if (e & 1) t = n(t);
      if (e & 8) return t;
      if (e & 4 && _typeof(t) === "object" && t && t.__esModule) return t;
      var o = Object.create(null);
      n.r(o);
      Object.defineProperty(o, "default", {
        enumerable: true,
        value: t
      });
      if (e & 2 && typeof t != "string") for (var i in t) {
        n.d(o, i, function (e) {
          return t[e];
        }.bind(null, i));
      }
      return o;
    };

    n.n = function (t) {
      var e = t && t.__esModule ? function e() {
        return t["default"];
      } : function e() {
        return t;
      };
      n.d(e, "a", e);
      return e;
    };

    n.o = function (t, e) {
      return Object.prototype.hasOwnProperty.call(t, e);
    };

    n.p = "";
    return n(n.s = 0);
  }([function (t, e, n) {
    "use strict";

    var o = n(1);
    var i = r(o);

    function r(t) {
      return t && t.__esModule ? t : {
        default: t
      };
    }

    t.exports = i.default;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: true
    });

    var o = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];

        for (var o in n) {
          if (Object.prototype.hasOwnProperty.call(n, o)) {
            t[o] = n[o];
          }
        }
      }

      return t;
    };

    var i = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || false;
          o.configurable = true;
          if ("value" in o) o.writable = true;
          Object.defineProperty(t, o.key, o);
        }
      }

      return function (e, n, o) {
        if (n) t(e.prototype, n);
        if (o) t(e, o);
        return e;
      };
    }();

    var r = n(2);
    var l = u(r);
    var a = n(3);
    var s = u(a);

    function u(t) {
      return t && t.__esModule ? t : {
        default: t
      };
    }

    function c(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    function f(t, e) {
      if (!t) {
        throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
      }

      return e && (_typeof(e) === "object" || typeof e === "function") ? e : t;
    }

    function p(t, e) {
      if (typeof e !== "function" && e !== null) {
        throw new TypeError("Super expression must either be null or a function, not " + _typeof(e));
      }

      t.prototype = Object.create(e && e.prototype, {
        constructor: {
          value: t,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
      if (e) Object.setPrototypeOf ? Object.setPrototypeOf(t, e) : t.__proto__ = e;
    }

    var d = function (t) {
      p(e, t);

      function e(t) {
        c(this, e);
        var n = f(this, (e.__proto__ || Object.getPrototypeOf(e)).call(this));
        n.name = "ScrollPlugin";

        n.onSamePage = function () {
          n.swup.scrollTo(0);
        };

        n.onSamePageWithHash = function (t) {
          var e = t.delegateTarget;
          var o = document.querySelector(e.hash);
          var i = o.getBoundingClientRect().top + window.pageYOffset;
          n.swup.scrollTo(i);
        };

        n.onTransitionStart = function (t) {
          if (n.options.doScrollingRightAway && !n.swup.scrollToElement) {
            n.doScrolling(t);
          }
        };

        n.onContentReplaced = function (t) {
          if (!n.options.doScrollingRightAway || n.swup.scrollToElement) {
            n.doScrolling(t);
          }
        };

        n.doScrolling = function (t) {
          var e = n.swup;

          if (!t || e.options.animateHistoryBrowsing) {
            if (e.scrollToElement != null) {
              var o = document.querySelector(e.scrollToElement);

              if (o != null) {
                var i = o.getBoundingClientRect().top + window.pageYOffset;
                e.scrollTo(i);
              } else {
                console.warn("Element " + e.scrollToElement + " not found");
              }

              e.scrollToElement = null;
            } else {
              e.scrollTo(0);
            }
          }
        };

        var i = {
          doScrollingRightAway: false,
          animateScroll: true,
          scrollFriction: .3,
          scrollAcceleration: .04
        };
        n.options = o({}, i, t);
        return n;
      }

      i(e, [{
        key: "mount",
        value: function t() {
          var e = this;
          var n = this.swup;
          n._handlers.scrollDone = [];
          n._handlers.scrollStart = [];
          this.scrl = new s.default({
            onStart: function t() {
              return n.triggerEvent("scrollStart");
            },
            onEnd: function t() {
              return n.triggerEvent("scrollDone");
            },
            onCancel: function t() {
              return n.triggerEvent("scrollDone");
            },
            friction: this.options.scrollFriction,
            acceleration: this.options.scrollAcceleration
          });

          n.scrollTo = function (t) {
            if (e.options.animateScroll) {
              e.scrl.scrollTo(t);
            } else {
              n.triggerEvent("scrollStart");
              window.scrollTo(0, t);
              n.triggerEvent("scrollDone");
            }
          };

          if (n.options.animateHistoryBrowsing) {
            window.history.scrollRestoration = "manual";
          }

          n.on("samePage", this.onSamePage);
          n.on("samePageWithHash", this.onSamePageWithHash);
          n.on("transitionStart", this.onTransitionStart);
          n.on("contentReplaced", this.onContentReplaced);
        }
      }, {
        key: "unmount",
        value: function t() {
          this.swup.scrollTo = null;
          delete this.scrl;
          this.scrl = null;
          this.swup.off("samePage", this.onSamePage);
          this.swup.off("samePageWithHash", this.onSamePageWithHash);
          this.swup.off("transitionStart", this.onTransitionStart);
          this.swup.off("contentReplaced", this.onContentReplaced);
          this.swup._handlers.scrollDone = null;
          this.swup._handlers.scrollStart = null;
          window.history.scrollRestoration = "auto";
        }
      }]);
      return e;
    }(l.default);

    e.default = d;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: true
    });

    var o = function () {
      function t(t, e) {
        for (var n = 0; n < e.length; n++) {
          var o = e[n];
          o.enumerable = o.enumerable || false;
          o.configurable = true;
          if ("value" in o) o.writable = true;
          Object.defineProperty(t, o.key, o);
        }
      }

      return function (e, n, o) {
        if (n) t(e.prototype, n);
        if (o) t(e, o);
        return e;
      };
    }();

    function i(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var r = function () {
      function t() {
        i(this, t);
        this.isSwupPlugin = true;
      }

      o(t, [{
        key: "mount",
        value: function t() {}
      }, {
        key: "unmount",
        value: function t() {}
      }]);
      return t;
    }();

    e.default = r;
  }, function (t, e, n) {
    "use strict";

    Object.defineProperty(e, "__esModule", {
      value: true
    });

    var o = Object.assign || function (t) {
      for (var e = 1; e < arguments.length; e++) {
        var n = arguments[e];

        for (var o in n) {
          if (Object.prototype.hasOwnProperty.call(n, o)) {
            t[o] = n[o];
          }
        }
      }

      return t;
    };

    function i(t, e) {
      if (!(t instanceof e)) {
        throw new TypeError("Cannot call a class as a function");
      }
    }

    var r = function t(e) {
      var n = this;
      i(this, t);
      this._raf = null;
      this._positionY = 0;
      this._velocityY = 0;
      this._targetPositionY = 0;
      this._targetPositionYWithOffset = 0;
      this._direction = 0;

      this.scrollTo = function (t) {
        if (t && t.nodeType) {
          n._targetPositionY = Math.round(t.getBoundingClientRect().top + window.pageYOffset);
        } else if (parseInt(n._targetPositionY) === n._targetPositionY) {
          n._targetPositionY = Math.round(t);
        } else {
          console.error("Argument must be a number or an element.");
          return;
        }

        if (n._targetPositionY > document.documentElement.scrollHeight - window.innerHeight) {
          n._targetPositionY = document.documentElement.scrollHeight - window.innerHeight;
        }

        n._positionY = document.body.scrollTop || document.documentElement.scrollTop;
        n._direction = n._positionY > n._targetPositionY ? -1 : 1;
        n._targetPositionYWithOffset = n._targetPositionY + n._direction;
        n._velocityY = 0;

        if (n._positionY !== n._targetPositionY) {
          n.options.onStart();

          n._animate();
        } else {
          n.options.onAlreadyAtPositions();
        }
      };

      this._animate = function () {
        var t = n._update();

        n._render();

        if (n._direction === 1 && n._targetPositionY > n._positionY || n._direction === -1 && n._targetPositionY < n._positionY) {
          n._raf = requestAnimationFrame(n._animate);
          n.options.onTick();
        } else {
          n._positionY = n._targetPositionY;

          n._render();

          n._raf = null;
          n.options.onTick();
          n.options.onEnd();
        }
      };

      this._update = function () {
        var t = n._targetPositionYWithOffset - n._positionY;
        var e = t * n.options.acceleration;
        n._velocityY += e;
        n._velocityY *= n.options.friction;
        n._positionY += n._velocityY;
        return Math.abs(t);
      };

      this._render = function () {
        window.scrollTo(0, n._positionY);
      };

      var r = {
        onAlreadyAtPositions: function t() {},
        onCancel: function t() {},
        onEnd: function t() {},
        onStart: function t() {},
        onTick: function t() {},
        friction: .7,
        acceleration: .04
      };
      this.options = o({}, r, e);

      if (e && e.friction) {
        this.options.friction = 1 - e.friction;
      }

      window.addEventListener("mousewheel", function (t) {
        if (n._raf) {
          n.options.onCancel();
          cancelAnimationFrame(n._raf);
          n._raf = null;
        }
      }, {
        passive: true
      });
    };

    e.default = r;
  }]);
});
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "49868" + '/');

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
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","SwupScrollPlugin.min.js"], null)
//# sourceMappingURL=/SwupScrollPlugin.min.889fd9df.js.map