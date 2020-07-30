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
})({"app.css":[function(require,module,exports) {
var reloadCSS = require('_css_loader');

module.hot.dispose(reloadCSS);
module.hot.accept(reloadCSS);
},{"./fonts/brandon_med_it-webfont.woff2":[["brandon_med_it-webfont.0be9855c.woff2","fonts/brandon_med_it-webfont.woff2"],"fonts/brandon_med_it-webfont.woff2"],"./fonts/brandon_med_it-webfont.woff":[["brandon_med_it-webfont.f562e862.woff","fonts/brandon_med_it-webfont.woff"],"fonts/brandon_med_it-webfont.woff"],"./fonts/brandon_med-webfont.woff2":[["brandon_med-webfont.1c5fad54.woff2","fonts/brandon_med-webfont.woff2"],"fonts/brandon_med-webfont.woff2"],"./fonts/brandon_med-webfont.woff":[["brandon_med-webfont.13e3d22a.woff","fonts/brandon_med-webfont.woff"],"fonts/brandon_med-webfont.woff"],"./fonts/brandon_reg_it-webfont.woff2":[["brandon_reg_it-webfont.ae428111.woff2","fonts/brandon_reg_it-webfont.woff2"],"fonts/brandon_reg_it-webfont.woff2"],"./fonts/brandon_reg_it-webfont.woff":[["brandon_reg_it-webfont.9ec4f86d.woff","fonts/brandon_reg_it-webfont.woff"],"fonts/brandon_reg_it-webfont.woff"],"./fonts/brandon_reg-webfont.woff2":[["brandon_reg-webfont.143d3f4b.woff2","fonts/brandon_reg-webfont.woff2"],"fonts/brandon_reg-webfont.woff2"],"./fonts/brandon_reg-webfont.woff":[["brandon_reg-webfont.b155912d.woff","fonts/brandon_reg-webfont.woff"],"fonts/brandon_reg-webfont.woff"],"./fonts/ApercuMonoPro-Bold.woff2":[["ApercuMonoPro-Bold.7cb8a4fc.woff2","fonts/ApercuMonoPro-Bold.woff2"],"fonts/ApercuMonoPro-Bold.woff2"],"./fonts/ApercuPro-Light.woff2":[["ApercuPro-Light.1f31c7ce.woff2","fonts/ApercuPro-Light.woff2"],"fonts/ApercuPro-Light.woff2"],"./fonts/ApercuPro-MediumItalic.woff2":[["ApercuPro-MediumItalic.48f7b691.woff2","fonts/ApercuPro-MediumItalic.woff2"],"fonts/ApercuPro-MediumItalic.woff2"],"./fonts/ApercuPro-BlackItalic.woff2":[["ApercuPro-BlackItalic.24a63f2a.woff2","fonts/ApercuPro-BlackItalic.woff2"],"fonts/ApercuPro-BlackItalic.woff2"],"./fonts/ApercuPro-ExtraBoldItalic.woff2":[["ApercuPro-ExtraBoldItalic.60e28811.woff2","fonts/ApercuPro-ExtraBoldItalic.woff2"],"fonts/ApercuPro-ExtraBoldItalic.woff2"],"./fonts/ApercuMonoPro-Light.woff2":[["ApercuMonoPro-Light.23e0b577.woff2","fonts/ApercuMonoPro-Light.woff2"],"fonts/ApercuMonoPro-Light.woff2"],"./fonts/ApercuPro-Regular.woff2":[["ApercuPro-Regular.c8b553be.woff2","fonts/ApercuPro-Regular.woff2"],"fonts/ApercuPro-Regular.woff2"],"./fonts/ApercuMonoPro-Medium.woff2":[["ApercuMonoPro-Medium.75a29d2e.woff2","fonts/ApercuMonoPro-Medium.woff2"],"fonts/ApercuMonoPro-Medium.woff2"],"./fonts/ApercuPro-Medium.woff2":[["ApercuPro-Medium.7950b7f6.woff2","fonts/ApercuPro-Medium.woff2"],"fonts/ApercuPro-Medium.woff2"],"./fonts/ApercuPro-Thin.woff2":[["ApercuPro-Thin.f0c523b3.woff2","fonts/ApercuPro-Thin.woff2"],"fonts/ApercuPro-Thin.woff2"],"./fonts/ApercuPro-Bold.woff2":[["ApercuPro-Bold.b43e9351.woff2","fonts/ApercuPro-Bold.woff2"],"fonts/ApercuPro-Bold.woff2"],"./fonts/ApercuPro-LightItalic.woff2":[["ApercuPro-LightItalic.8f6efb5a.woff2","fonts/ApercuPro-LightItalic.woff2"],"fonts/ApercuPro-LightItalic.woff2"],"./fonts/ApercuPro-ExtraLight.woff2":[["ApercuPro-ExtraLight.5b33b394.woff2","fonts/ApercuPro-ExtraLight.woff2"],"fonts/ApercuPro-ExtraLight.woff2"],"./fonts/ApercuPro-BoldItalic.woff2":[["ApercuPro-BoldItalic.ed14143a.woff2","fonts/ApercuPro-BoldItalic.woff2"],"fonts/ApercuPro-BoldItalic.woff2"],"./fonts/ApercuPro-Italic.woff2":[["ApercuPro-Italic.ebce6f31.woff2","fonts/ApercuPro-Italic.woff2"],"fonts/ApercuPro-Italic.woff2"],"./fonts/ApercuPro-ExtraLightItalic.woff2":[["ApercuPro-ExtraLightItalic.02a07d6b.woff2","fonts/ApercuPro-ExtraLightItalic.woff2"],"fonts/ApercuPro-ExtraLightItalic.woff2"],"./fonts/ApercuPro-Black.woff2":[["ApercuPro-Black.692d641e.woff2","fonts/ApercuPro-Black.woff2"],"fonts/ApercuPro-Black.woff2"],"./fonts/ApercuPro-ThinItalic.woff2":[["ApercuPro-ThinItalic.b403930b.woff2","fonts/ApercuPro-ThinItalic.woff2"],"fonts/ApercuPro-ThinItalic.woff2"],"./fonts/ApercuPro-ExtraBold.woff2":[["ApercuPro-ExtraBold.4b013d43.woff2","fonts/ApercuPro-ExtraBold.woff2"],"fonts/ApercuPro-ExtraBold.woff2"],"./fonts/ApercuMonoPro-Regular.woff2":[["ApercuMonoPro-Regular.b8d45ed2.woff2","fonts/ApercuMonoPro-Regular.woff2"],"fonts/ApercuMonoPro-Regular.woff2"],"_css_loader":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/css-loader.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js":[function(require,module,exports) {
var bundleURL = null;

function getBundleURLCached() {
  if (!bundleURL) {
    bundleURL = getBundleURL();
  }

  return bundleURL;
}

function getBundleURL() {
  // Attempt to find the URL of the current script and use that as the base URL
  try {
    throw new Error();
  } catch (err) {
    var matches = ('' + err.stack).match(/(https?|file|ftp|chrome-extension|moz-extension):\/\/[^)\n]+/g);

    if (matches) {
      return getBaseURL(matches[0]);
    }
  }

  return '/';
}

function getBaseURL(url) {
  return ('' + url).replace(/^((?:https?|file|ftp|chrome-extension|moz-extension):\/\/.+)\/[^/]+$/, '$1') + '/';
}

exports.getBundleURL = getBundleURLCached;
exports.getBaseURL = getBaseURL;
},{}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js":[function(require,module,exports) {
var getBundleURL = require('./bundle-url').getBundleURL;

function loadBundlesLazy(bundles) {
  if (!Array.isArray(bundles)) {
    bundles = [bundles];
  }

  var id = bundles[bundles.length - 1];

  try {
    return Promise.resolve(require(id));
  } catch (err) {
    if (err.code === 'MODULE_NOT_FOUND') {
      return new LazyPromise(function (resolve, reject) {
        loadBundles(bundles.slice(0, -1)).then(function () {
          return require(id);
        }).then(resolve, reject);
      });
    }

    throw err;
  }
}

function loadBundles(bundles) {
  return Promise.all(bundles.map(loadBundle));
}

var bundleLoaders = {};

function registerBundleLoader(type, loader) {
  bundleLoaders[type] = loader;
}

module.exports = exports = loadBundlesLazy;
exports.load = loadBundles;
exports.register = registerBundleLoader;
var bundles = {};

function loadBundle(bundle) {
  var id;

  if (Array.isArray(bundle)) {
    id = bundle[1];
    bundle = bundle[0];
  }

  if (bundles[bundle]) {
    return bundles[bundle];
  }

  var type = (bundle.substring(bundle.lastIndexOf('.') + 1, bundle.length) || bundle).toLowerCase();
  var bundleLoader = bundleLoaders[type];

  if (bundleLoader) {
    return bundles[bundle] = bundleLoader(getBundleURL() + bundle).then(function (resolved) {
      if (resolved) {
        module.bundle.register(id, resolved);
      }

      return resolved;
    }).catch(function (e) {
      delete bundles[bundle];
      throw e;
    });
  }
}

function LazyPromise(executor) {
  this.executor = executor;
  this.promise = null;
}

LazyPromise.prototype.then = function (onSuccess, onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.then(onSuccess, onError);
};

LazyPromise.prototype.catch = function (onError) {
  if (this.promise === null) this.promise = new Promise(this.executor);
  return this.promise.catch(onError);
};
},{"./bundle-url":"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-url.js"}],"../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js":[function(require,module,exports) {
module.exports = function loadJSBundle(bundle) {
  return new Promise(function (resolve, reject) {
    var script = document.createElement('script');
    script.async = true;
    script.type = 'text/javascript';
    script.charset = 'utf-8';
    script.src = bundle;

    script.onerror = function (e) {
      script.onerror = script.onload = null;
      reject(e);
    };

    script.onload = function () {
      script.onerror = script.onload = null;
      resolve();
    };

    document.getElementsByTagName('head')[0].appendChild(script);
  });
};
},{}],0:[function(require,module,exports) {
var b=require("../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/bundle-loader.js");b.register("js",require("../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/loaders/browser/js-loader.js"));b.load([]);
},{}]},{},["../../../../../usr/local/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js",0], null)
//# sourceMappingURL=/app.ae05fb60.js.map