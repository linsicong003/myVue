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
})({"Binding.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 观察者队列
var Binding =
/*#__PURE__*/
function () {
  // 初始化
  function Binding() {
    _classCallCheck(this, Binding);

    this.subs = {};
  } // 增加订阅


  _createClass(Binding, [{
    key: "addSub",
    value: function addSub(sub) {
      if (sub.key) this.subs[sub.key.trim()] = [];
      this.subs[sub.key.trim()].push(sub);
    } // 通知事件

  }, {
    key: "notify",
    value: function notify() {
      this.subs.filter(function (item) {
        return typeof item !== 'string';
      }).forEach(function (sub) {
        sub.update();
      });
    }
  }]);

  return Binding;
}();

var _default = Binding;
exports.default = _default;
},{}],"Watcher.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// 发布订阅队列
var Watcher =
/*#__PURE__*/
function () {
  function Watcher(node, attr, data, key) {
    _classCallCheck(this, Watcher);

    this.node = node;
    this.attr = attr;
    this.data = data;
    this.key = key;
  }

  _createClass(Watcher, [{
    key: "update",
    value: function update() {
      this.node[this.attr] = this.data[this.key];
    }
  }]);

  return Watcher;
}();

var _default = Watcher;
exports.default = _default;
},{}],"Compile.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Watcher = _interopRequireDefault(require("./Watcher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Compile =
/*#__PURE__*/
function () {
  function Compile(el, vm) {
    _classCallCheck(this, Compile);

    // 取已做好拦截操作的数据源
    this.data = vm._data; // 获取根节点

    var root = this.root = document.querySelector(el); // 获取根节点下所有子节点集合

    var nodes = root.childNodes;
    this.nodes = nodes; // 存储全局 this

    this.vm = vm; // 订阅列表

    this.binding = vm.binding; // 开始编译

    this.compile(nodes);
  } // 编译函数


  _createClass(Compile, [{
    key: "compile",
    value: function compile(nodes) {
      var _this = this;

      var vm = this.vm;
      var data = vm._data; // 遍历子节点

      Array.from(nodes).forEach(function (node) {
        // 获取节点类型
        // 1: 元素节点  3： 内容节点
        // https://developer.mozilla.org/zh-CN/docs/Web/API/Node/nodeType
        var type = node.nodeType; // 文字节点

        if (type === 3) {
          var text = node.textContent.trim();
          if (!text) return true;

          _this.compileText(node, 'textContent');
        } // 编译元素节点
        else if (type === 1) {
            // 如果有子节点则先放入递归
            if (node && node.children.length > 0) _this.compile(node); // 处理 input 或 textarea 中的 v-model

            if (node.hasAttribute('v-model') && (node.tagName === 'INPUT' || node.tagName === 'TEXTAREA')) {
              node.addEventListener('input', function () {
                var key = node.getAttribute('v-model').trim(); // 加入该项至监听队列

                _this.vm.binding.addSub(new _Watcher.default(node, 'value', data, key)); // 删除该项属性


                node.removeAttribute('v-model'); // 修改值

                return function () {
                  data[key] = node.value;
                };
              }());
            } // 处理 v-html 


            if (node.hasAttribute('v-html')) {
              var key = node.getAttribute('v-html').trim();

              _this.vm.binding.addSub(new _Watcher.default(node, 'innerHTML', data, key));

              node.removeAttribute('v-html');
            } // 处理点击事件 onClick || @click || onTap || @tap


            if (node.hasAttribute('onClick') || node.hasAttribute('@click')) {
              var methods = vm.$options.methods;
              if (!methods) return;

              var _key = node.getAttribute('onClick') || node.getAttribute('@click'); // 转发至对应处理方法


              var method = methods[_key].bind(data); // 绑定点击事件


              node.addEventListener('click', method); // 删除对应的属性

              node.hasAttribute('onClick') && node.removeAttribute('onClick');
              node.hasAttribute('@click') && node.removeAttribute('@click');
            }

            _this.compileText(node, 'innerHTML');
          }
      });
    } // 编译文字节点

  }, {
    key: "compileText",
    value: function compileText(node, type) {
      var _this2 = this;

      var vm = this.vm;
      var txt = node.textContent;
      var data = vm._data;
      var reg = /\{\{(.*?)\}\}/g; // 存放该节点下的键值数组

      var valueArr = []; // 编译双花括号

      if (reg.test(txt)) {
        // 将原 HTML 中的花括号写法替换
        node.innerHTML = txt.replace(reg, function (matched, value) {
          // node.textContent = txt.replace(reg, (matched, value) => {
          valueArr.push(value.trim()); // 返回对应值
          // value 是正则第一个括号匹配到的子串

          if (value.split('.').length > 1) {
            var v = null; // 返回花括号中的属性的值

            value.split('.').forEach(function (val, i) {
              v = !v ? vm[val] : v[val];
            });
            return "<span myvue>".concat(v, "</span>");
          } else {
            return "<span myvue>".concat(data[value.trim()], "</span>");
          }
        }); // 过滤出新编译进去的元素

        var tArr = [];
        node.childNodes.forEach(function (item) {
          // 判断是否为双向绑定编译后的标签
          if (item.nodeType === 1 && item.hasAttribute('myvue')) tArr.push(item);
        }); // 放置监听
        // 订阅花括号包裹内容

        tArr.forEach(function (item, index) {
          _this2.vm.binding.addSub(new _Watcher.default(item, type, data, valueArr[index]));
        });
      }
    }
  }]);

  return Compile;
}();

var _default = Compile;
exports.default = _default;
},{"./Watcher":"Watcher.js"}],"myVue.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Binding = _interopRequireDefault(require("./Binding"));

var _Compile = _interopRequireDefault(require("./Compile"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// import { createComputed, createMounted } from './lifecycle'
var myVue3 =
/*#__PURE__*/
function () {
  // 初始化
  function myVue3() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, myVue3);

    // 保留配置项
    this.$options = options; // 获取数据

    var data = this._data = this.$options.data; // 初始化监听数组

    this.binding = new _Binding.default(); // 订阅数据

    this._data = this.observe.call(this, data); // 初始化计算属性
    // createComputed.call(this);
    // 编译 DOM 中的 Vue 语法元素

    new _Compile.default(options.el, this);
  } // 双向绑定订阅数据


  _createClass(myVue3, [{
    key: "observe",
    value: function observe(data) {
      var that = this; // 如果不存在或不是对象则返回原数据

      if (!data || _typeof(data) !== 'object') return data; // 否则加入订阅

      return new Proxy(data, {
        get: function get(target, prop) {
          return Reflect.get(target, prop);
        },
        set: function set(target, prop, value) {
          // 更新对应数据
          var result = Reflect.set(target, prop, value); // 发布订阅

          that.binding.subs[prop].forEach(function (item) {
            item.update();
          });
          return result;
        }
      });
    }
  }]);

  return myVue3;
}();

var _default = myVue3;
exports.default = _default;
},{"./Binding":"Binding.js","./Compile":"Compile.js"}],"index.js":[function(require,module,exports) {
"use strict";

var _myVue = _interopRequireDefault(require("./myVue.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

new _myVue.default({
  el: '#app',
  data: {
    count: 0,
    other: 10
  },
  methods: {
    changeCount: function changeCount() {
      console.log('值增加啦');
      this.count++;
    },
    changeOther: function changeOther() {
      console.log('值减少啦');
      this.other--;
    }
  }
});
},{"./myVue.js":"myVue.js"}],"C:/Users/gutong/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "56633" + '/');

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
      } else {
        window.location.reload();
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
},{}]},{},["C:/Users/gutong/AppData/Local/Yarn/Data/global/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","index.js"], null)
//# sourceMappingURL=/myVue3.e31bb0bc.js.map