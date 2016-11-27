define("biz_web/lib/video.js", [], function(require, exports, module) {
try {
var report_time_begin = +(new Date);
document.createElement("video"), document.createElement("audio"), document.createElement("track");
var vjs = function(e, t, n) {
var r;
if (typeof e == "string") {
e.indexOf("#") === 0 && (e = e.slice(1));
if (vjs.players[e]) return vjs.players[e];
r = vjs.el(e);
} else r = e;
if (!r || !r.nodeName) throw new TypeError("The element or ID supplied is not valid. (videojs)");
return r.player || new vjs.Player(r, t, n);
}, videojs = vjs;
window.videojs = window.vjs = vjs, vjs.CDN_VERSION = "4.1", vjs.ACCESS_PROTOCOL = "https:" == document.location.protocol ? "https://" : "http://", vjs.options = {
techOrder: [ "html5", "flash" ],
html5: {},
flash: {},
width: 300,
height: 150,
defaultVolume: 0,
children: {
mediaLoader: {},
posterImage: {},
textTrackDisplay: {},
loadingSpinner: {},
bigPlayButton: {},
controlBar: {}
}
}, vjs.CDN_VERSION !== "GENERATED_CDN_VSN" && (videojs.options.flash.swf = vjs.ACCESS_PROTOCOL + "vjs.zencdn.net/" + vjs.CDN_VERSION + "/video-js.swf"), vjs.players = {}, vjs.CoreObject = vjs.CoreObject = function() {}, vjs.CoreObject.extend = function(e) {
var t, n;
e = e || {}, t = e.init || e.init || this.prototype.init || this.prototype.init || function() {}, n = function() {
t.apply(this, arguments);
}, n.prototype = vjs.obj.create(this.prototype), n.prototype.constructor = n, n.extend = vjs.CoreObject.extend, n.create = vjs.CoreObject.create;
for (var r in e) e.hasOwnProperty(r) && (n.prototype[r] = e[r]);
return n;
}, vjs.CoreObject.create = function() {
var e = vjs.obj.create(this.prototype);
return this.apply(e, arguments), e;
}, vjs.on = function(e, t, n) {
var r = vjs.getData(e);
r.handlers || (r.handlers = {}), r.handlers[t] || (r.handlers[t] = []), n.guid || (n.guid = vjs.guid++), r.handlers[t].push(n), r.dispatcher || (r.disabled = !1, r.dispatcher = function(t) {
if (r.disabled) return;
t = vjs.fixEvent(t);
var n = r.handlers[t.type];
if (n) {
var i = n.slice(0);
for (var s = 0, o = i.length; s < o; s++) {
if (t.isImmediatePropagationStopped()) break;
i[s].call(e, t);
}
}
}), r.handlers[t].length == 1 && (document.addEventListener ? e.addEventListener(t, r.dispatcher, !1) : document.attachEvent && e.attachEvent("on" + t, r.dispatcher));
}, vjs.off = function(e, t, n) {
if (!vjs.hasData(e)) return;
var r = vjs.getData(e);
if (!r.handlers) return;
var i = function(t) {
r.handlers[t] = [], vjs.cleanUpEvents(e, t);
};
if (!t) {
for (var s in r.handlers) i(s);
return;
}
var o = r.handlers[t];
if (!o) return;
if (!n) {
i(t);
return;
}
if (n.guid) for (var u = 0; u < o.length; u++) o[u].guid === n.guid && o.splice(u--, 1);
vjs.cleanUpEvents(e, t);
}, vjs.cleanUpEvents = function(e, t) {
var n = vjs.getData(e);
n.handlers[t].length === 0 && (delete n.handlers[t], document.removeEventListener ? e.removeEventListener(t, n.dispatcher, !1) : document.detachEvent && e.detachEvent("on" + t, n.dispatcher)), vjs.isEmpty(n.handlers) && (delete n.handlers, delete n.dispatcher, delete n.disabled), vjs.isEmpty(n) && vjs.removeData(e);
}, vjs.fixEvent = function(e) {
function t() {
return !0;
}
function n() {
return !1;
}
if (!e || !e.isPropagationStopped) {
var r = e || window.event;
e = {};
for (var i in r) i !== "layerX" && i !== "layerY" && (e[i] = r[i]);
e.target || (e.target = e.srcElement || document), e.relatedTarget = e.fromElement === e.target ? e.toElement : e.fromElement, e.preventDefault = function() {
r.preventDefault && r.preventDefault(), e.returnValue = !1, e.isDefaultPrevented = t;
}, e.isDefaultPrevented = n, e.stopPropagation = function() {
r.stopPropagation && r.stopPropagation(), e.cancelBubble = !0, e.isPropagationStopped = t;
}, e.isPropagationStopped = n, e.stopImmediatePropagation = function() {
r.stopImmediatePropagation && r.stopImmediatePropagation(), e.isImmediatePropagationStopped = t, e.stopPropagation();
}, e.isImmediatePropagationStopped = n;
if (e.clientX != null) {
var s = document.documentElement, o = document.body;
e.pageX = e.clientX + (s && s.scrollLeft || o && o.scrollLeft || 0) - (s && s.clientLeft || o && o.clientLeft || 0), e.pageY = e.clientY + (s && s.scrollTop || o && o.scrollTop || 0) - (s && s.clientTop || o && o.clientTop || 0);
}
e.which = e.charCode || e.keyCode, e.button != null && (e.button = e.button & 1 ? 0 : e.button & 4 ? 1 : e.button & 2 ? 2 : 0);
}
return e;
}, vjs.trigger = function(e, t) {
var n = vjs.hasData(e) ? vjs.getData(e) : {}, r = e.parentNode || e.ownerDocument;
typeof t == "string" && (t = {
type: t,
target: e
}), t = vjs.fixEvent(t), n.dispatcher && n.dispatcher.call(e, t);
if (r && !t.isPropagationStopped()) vjs.trigger(r, t); else if (!r && !t.isDefaultPrevented()) {
var i = vjs.getData(t.target);
t.target[t.type] && (i.disabled = !0, typeof t.target[t.type] == "function" && t.target[t.type](), i.disabled = !1);
}
return !t.isDefaultPrevented();
}, vjs.one = function(e, t, n) {
vjs.on(e, t, function() {
vjs.off(e, t, arguments.callee), n.apply(this, arguments);
});
};
var hasOwnProp = Object.prototype.hasOwnProperty;
vjs.createEl = function(e, t) {
var n = document.createElement(e || "div");
for (var r in t) hasOwnProp.call(t, r) && (r.indexOf("aria-") !== -1 || r == "role" ? n.setAttribute(r, t[r]) : n[r] = t[r]);
return n;
}, vjs.capitalize = function(e) {
return e.charAt(0).toUpperCase() + e.slice(1);
}, vjs.obj = {}, vjs.obj.create = Object.create || function(e) {
function t() {}
return t.prototype = e, new t;
}, vjs.obj.each = function(e, t, n) {
for (var r in e) hasOwnProp.call(e, r) && t.call(n || this, r, e[r]);
}, vjs.obj.merge = function(e, t) {
if (!t) return e;
for (var n in t) hasOwnProp.call(t, n) && (e[n] = t[n]);
return e;
}, vjs.obj.deepMerge = function(e, t) {
var n, r, i, s;
s = "[object Object]", e = vjs.obj.copy(e);
for (n in t) hasOwnProp.call(t, n) && (r = e[n], i = t[n], vjs.obj.isPlain(r) && vjs.obj.isPlain(i) ? e[n] = vjs.obj.deepMerge(r, i) : e[n] = t[n]);
return e;
}, vjs.obj.copy = function(e) {
return vjs.obj.merge({}, e);
}, vjs.obj.isPlain = function(e) {
return !!e && typeof e == "object" && e.toString() === "[object Object]" && e.constructor === Object;
}, vjs.bind = function(e, t, n) {
t.guid || (t.guid = vjs.guid++);
var r = function() {
return t.apply(e, arguments);
};
return r.guid = n ? n + "_" + t.guid : t.guid, r;
}, vjs.cache = {}, vjs.guid = 1, vjs.expando = "vdata" + (new Date).getTime(), vjs.getData = function(e) {
var t = e[vjs.expando];
return t || (t = e[vjs.expando] = vjs.guid++, vjs.cache[t] = {}), vjs.cache[t];
}, vjs.hasData = function(e) {
var t = e[vjs.expando];
return !!t && !vjs.isEmpty(vjs.cache[t]);
}, vjs.removeData = function(e) {
var t = e[vjs.expando];
if (!t) return;
delete vjs.cache[t];
try {
delete e[vjs.expando];
} catch (n) {
e.removeAttribute ? e.removeAttribute(vjs.expando) : e[vjs.expando] = null;
}
}, vjs.isEmpty = function(e) {
for (var t in e) if (e[t] !== null) return !1;
return !0;
}, vjs.addClass = function(e, t) {
(" " + e.className + " ").indexOf(" " + t + " ") == -1 && (e.className = e.className === "" ? t : e.className + " " + t);
}, vjs.removeClass = function(e, t) {
if (e.className.indexOf(t) == -1) return;
var n = e.className.split(" ");
for (var r = n.length - 1; r >= 0; r--) n[r] === t && n.splice(r, 1);
e.className = n.join(" ");
}, vjs.TEST_VID = vjs.createEl("video"), vjs.USER_AGENT = navigator.userAgent, vjs.IS_IPHONE = /iPhone/i.test(vjs.USER_AGENT), vjs.IS_IPAD = /iPad/i.test(vjs.USER_AGENT), vjs.IS_IPOD = /iPod/i.test(vjs.USER_AGENT), vjs.IS_IOS = vjs.IS_IPHONE || vjs.IS_IPAD || vjs.IS_IPOD, vjs.IOS_VERSION = function() {
var e = vjs.USER_AGENT.match(/OS (\d+)_/i);
if (e && e[1]) return e[1];
}(), vjs.IS_ANDROID = /Android/i.test(vjs.USER_AGENT), vjs.ANDROID_VERSION = function() {
var e = vjs.USER_AGENT.match(/Android (\d+)(?:\.(\d+))?(?:\.(\d+))*/i), t, n;
return e ? (t = e[1] && parseFloat(e[1]), n = e[2] && parseFloat(e[2]), t && n ? parseFloat(e[1] + "." + e[2]) : t ? t : null) : null;
}(), vjs.IS_OLD_ANDROID = vjs.IS_ANDROID && /webkit/i.test(vjs.USER_AGENT) && vjs.ANDROID_VERSION < 2.3, vjs.IS_FIREFOX = /Firefox/i.test(vjs.USER_AGENT), vjs.IS_CHROME = /Chrome/i.test(vjs.USER_AGENT), vjs.getAttributeValues = function(e) {
var t = {}, n = ",autoplay,controls,loop,muted,default,";
if (e && e.attributes && e.attributes.length > 0) {
var r = e.attributes, i, s;
for (var o = r.length - 1; o >= 0; o--) {
i = r[o].name, s = r[o].value;
if (typeof e[i] == "boolean" || n.indexOf("," + i + ",") !== -1) s = s !== null ? !0 : !1;
t[i] = s;
}
}
return t;
}, vjs.getComputedDimension = function(e, t) {
var n = "";
return document.defaultView && document.defaultView.getComputedStyle ? n = document.defaultView.getComputedStyle(e, "").getPropertyValue(t) : e.currentStyle && (n = e["client" + t.substr(0, 1).toUpperCase() + t.substr(1)] + "px"), n;
}, vjs.insertFirst = function(e, t) {
t.firstChild ? t.insertBefore(e, t.firstChild) : t.appendChild(e);
}, vjs.support = {}, vjs.el = function(e) {
return e.indexOf("#") === 0 && (e = e.slice(1)), document.getElementById(e);
}, vjs.formatTime = function(e, t) {
t = t || e;
var n = Math.floor(e % 60), r = Math.floor(e / 60 % 60), i = Math.floor(e / 3600), s = Math.floor(t / 60 % 60), o = Math.floor(t / 3600);
return i = i > 0 || o > 0 ? i + ":" : "", r = ((i || s >= 10) && r < 10 ? "0" + r : r) + ":", n = n < 10 ? "0" + n : n, i + r + n;
}, vjs.blockTextSelection = function() {
document.body.focus(), document.onselectstart = function() {
return !1;
};
}, vjs.unblockTextSelection = function() {
document.onselectstart = function() {
return !0;
};
}, vjs.trim = function(e) {
return e.toString().replace(/^\s+/, "").replace(/\s+$/, "");
}, vjs.round = function(e, t) {
return t || (t = 0), Math.round(e * Math.pow(10, t)) / Math.pow(10, t);
}, vjs.createTimeRange = function(e, t) {
return {
length: 1,
start: function() {
return e;
},
end: function() {
return t;
}
};
}, vjs.get = function(e, t, n) {
var r = e.indexOf("file:") === 0 || window.location.href.indexOf("file:") === 0 && e.indexOf("http") === -1;
typeof XMLHttpRequest == "undefined" && (window.XMLHttpRequest = function() {
try {
return new window.ActiveXObject("Msxml2.XMLHTTP.6.0");
} catch (e) {}
try {
return new window.ActiveXObject("Msxml2.XMLHTTP.3.0");
} catch (t) {}
try {
return new window.ActiveXObject("Msxml2.XMLHTTP");
} catch (n) {}
throw new Error("This browser does not support XMLHttpRequest.");
});
var i = new XMLHttpRequest;
try {
i.open("GET", e);
} catch (s) {
n(s);
}
i.onreadystatechange = function() {
i.readyState === 4 && (i.status === 200 || r && i.status === 0 ? t(i.responseText) : n && n());
};
try {
i.send();
} catch (s) {
n && n(s);
}
}, vjs.setLocalStorage = function(e, t) {
try {
var n = window.localStorage || !1;
if (!n) return;
n[e] = t;
} catch (r) {
r.code == 22 || r.code == 1014 ? vjs.log("LocalStorage Full (VideoJS)", r) : r.code == 18 ? vjs.log("LocalStorage not allowed (VideoJS)", r) : vjs.log("LocalStorage Error (VideoJS)", r);
}
}, vjs.getAbsoluteURL = function(e) {
return e.match(/^https?:\/\//) || (e = vjs.createEl("div", {
innerHTML: '<a href="' + e + '">x</a>'
}).firstChild.href), e;
}, vjs.log = function() {
vjs.log.history = vjs.log.history || [], vjs.log.history.push(arguments), window.console && window.console.log(Array.prototype.slice.call(arguments));
}, vjs.findPosition = function(e) {
var t, n, r, i, s, o, u, a, f;
return e.getBoundingClientRect && e.parentNode && (t = e.getBoundingClientRect()), t ? (n = document.documentElement, r = document.body, i = n.clientLeft || r.clientLeft || 0, s = window.pageXOffset || r.scrollLeft, o = t.left + s - i, u = n.clientTop || r.clientTop || 0, a = window.pageYOffset || r.scrollTop, f = t.top + a - u, {
left: o,
top: f
}) : {
left: 0,
top: 0
};
}, vjs.Component = vjs.CoreObject.extend({
init: function(e, t, n) {
this.player_ = e, this.options_ = vjs.obj.copy(this.options_), t = this.options(t), this.id_ = t.id || (t.el && t.el.id ? t.el.id : e.id() + "_component_" + vjs.guid++), this.name_ = t.name || null, this.el_ = t.el || this.createEl(), this.children_ = [], this.childIndex_ = {}, this.childNameIndex_ = {}, this.initChildren(), this.ready(n);
}
}), vjs.Component.prototype.dispose = function() {
if (this.children_) for (var e = this.children_.length - 1; e >= 0; e--) this.children_[e].dispose && this.children_[e].dispose();
this.children_ = null, this.childIndex_ = null, this.childNameIndex_ = null, this.off(), this.el_.parentNode && this.el_.parentNode.removeChild(this.el_), vjs.removeData(this.el_), this.el_ = null;
}, vjs.Component.prototype.player_, vjs.Component.prototype.player = function() {
return this.player_;
}, vjs.Component.prototype.options_, vjs.Component.prototype.options = function(e) {
return e === undefined ? this.options_ : this.options_ = vjs.obj.deepMerge(this.options_, e);
}, vjs.Component.prototype.el_, vjs.Component.prototype.createEl = function(e, t) {
return vjs.createEl(e, t);
}, vjs.Component.prototype.el = function() {
return this.el_;
}, vjs.Component.prototype.contentEl_, vjs.Component.prototype.contentEl = function() {
return this.contentEl_ || this.el_;
}, vjs.Component.prototype.id_, vjs.Component.prototype.id = function() {
return this.id_;
}, vjs.Component.prototype.name_, vjs.Component.prototype.name = function() {
return this.name_;
}, vjs.Component.prototype.children_, vjs.Component.prototype.children = function() {
return this.children_;
}, vjs.Component.prototype.childIndex_, vjs.Component.prototype.getChildById = function(e) {
return this.childIndex_[e];
}, vjs.Component.prototype.childNameIndex_, vjs.Component.prototype.getChild = function(e) {
return this.childNameIndex_[e];
}, vjs.Component.prototype.addChild = function(e, t) {
var n, r, i, s;
return typeof e == "string" ? (i = e, t = t || {}, r = t.componentClass || vjs.capitalize(i), t.name = i, n = new window.videojs[r](this.player_ || this, t)) : n = e, this.children_.push(n), typeof n.id == "function" && (this.childIndex_[n.id()] = n), i = i || n.name && n.name(), i && (this.childNameIndex_[i] = n), typeof n.el == "function" && n.el() && this.contentEl().appendChild(n.el()), n;
}, vjs.Component.prototype.removeChild = function(e) {
typeof e == "string" && (e = this.getChild(e));
if (!e || !this.children_) return;
var t = !1;
for (var n = this.children_.length - 1; n >= 0; n--) if (this.children_[n] === e) {
t = !0, this.children_.splice(n, 1);
break;
}
if (!t) return;
this.childIndex_[e.id] = null, this.childNameIndex_[e.name] = null;
var r = e.el();
r && r.parentNode === this.contentEl() && this.contentEl().removeChild(e.el());
}, vjs.Component.prototype.initChildren = function() {
var e = this.options_;
if (e && e.children) {
var t = this;
vjs.obj.each(e.children, function(e, n) {
if (n === !1) return;
var r = function() {
t[e] = t.addChild(e, n);
};
n.loadEvent || r();
});
}
}, vjs.Component.prototype.buildCSSClass = function() {
return "";
}, vjs.Component.prototype.on = function(e, t) {
return vjs.on(this.el_, e, vjs.bind(this, t)), this;
}, vjs.Component.prototype.off = function(e, t) {
return vjs.off(this.el_, e, t), this;
}, vjs.Component.prototype.one = function(e, t) {
return vjs.one(this.el_, e, vjs.bind(this, t)), this;
}, vjs.Component.prototype.trigger = function(e, t) {
return vjs.trigger(this.el_, e, t), this;
}, vjs.Component.prototype.isReady_, vjs.Component.prototype.isReadyOnInitFinish_ = !0, vjs.Component.prototype.readyQueue_, vjs.Component.prototype.ready = function(e) {
return e && (this.isReady_ ? e.call(this) : (this.readyQueue_ === undefined && (this.readyQueue_ = []), this.readyQueue_.push(e))), this;
}, vjs.Component.prototype.triggerReady = function() {
this.isReady_ = !0;
var e = this.readyQueue_;
if (e && e.length > 0) {
for (var t = 0, n = e.length; t < n; t++) e[t].call(this);
this.readyQueue_ = [], this.trigger("ready");
}
}, vjs.Component.prototype.addClass = function(e) {
return vjs.addClass(this.el_, e), this;
}, vjs.Component.prototype.removeClass = function(e) {
return vjs.removeClass(this.el_, e), this;
}, vjs.Component.prototype.show = function() {
return this.el_.style.display = "block", this;
}, vjs.Component.prototype.hide = function() {
return this.el_.style.display = "none", this;
}, vjs.Component.prototype.fadeIn = function() {
return this.removeClass("vjs-fade-out"), this.addClass("vjs-fade-in"), this;
}, vjs.Component.prototype.fadeOut = function() {
return this.removeClass("vjs-fade-in"), this.addClass("vjs-fade-out"), this;
}, vjs.Component.prototype.lockShowing = function() {
return this.addClass("vjs-lock-showing"), this;
}, vjs.Component.prototype.unlockShowing = function() {
return this.removeClass("vjs-lock-showing"), this;
}, vjs.Component.prototype.disable = function() {
this.hide(), this.show = function() {}, this.fadeIn = function() {};
}, vjs.Component.prototype.width = function(e, t) {
return this.dimension("width", e, t);
}, vjs.Component.prototype.height = function(e, t) {
return this.dimension("height", e, t);
}, vjs.Component.prototype.dimensions = function(e, t) {
return this.width(e, !0).height(t);
}, vjs.Component.prototype.dimension = function(e, t, n) {
if (t !== undefined) return ("" + t).indexOf("%") !== -1 || ("" + t).indexOf("px") !== -1 ? this.el_.style[e] = t : t === "auto" ? this.el_.style[e] = "" : this.el_.style[e] = t + "px", n || this.trigger("resize"), this;
if (!this.el_) return 0;
var r = this.el_.style[e], i = r.indexOf("px");
return i !== -1 ? parseInt(r.slice(0, i), 10) : parseInt(this.el_["offset" + vjs.capitalize(e)], 10);
}, vjs.Button = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t);
var n = !1;
this.on("touchstart", function() {
n = !0;
}), this.on("touchmove", function() {
n = !1;
});
var r = this;
this.on("touchend", function(e) {
n && r.onClick(e), e.preventDefault(), e.stopPropagation();
}), this.on("click", this.onClick), this.on("focus", this.onFocus), this.on("blur", this.onBlur);
}
}), vjs.Button.prototype.createEl = function(e, t) {
return t = vjs.obj.merge({
className: this.buildCSSClass(),
innerHTML: '<div class="vjs-control-content"><span class="vjs-control-text">' + (this.buttonText || "Need Text") + "</span></div>",
role: "button",
"aria-live": "polite",
tabIndex: 0
}, t), vjs.Component.prototype.createEl.call(this, e, t);
}, vjs.Button.prototype.buildCSSClass = function() {
return "vjs-control " + vjs.Component.prototype.buildCSSClass.call(this);
}, vjs.Button.prototype.onClick = function() {}, vjs.Button.prototype.onFocus = function() {
vjs.on(document, "keyup", vjs.bind(this, this.onKeyPress));
}, vjs.Button.prototype.onKeyPress = function(e) {
if (e.which == 32 || e.which == 13) e.preventDefault(), this.onClick();
}, vjs.Button.prototype.onBlur = function() {
vjs.off(document, "keyup", vjs.bind(this, this.onKeyPress));
}, vjs.Slider = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), this.bar = this.getChild(this.options_.barName), this.handle = this.getChild(this.options_.handleName), e.on(this.playerEvent, vjs.bind(this, this.update)), this.on("mousedown", this.onMouseDown), this.on("touchstart", this.onMouseDown), this.on("focus", this.onFocus), this.on("blur", this.onBlur), this.on("click", this.onClick), this.player_.on("controlsvisible", vjs.bind(this, this.update)), e.ready(vjs.bind(this, this.update)), this.boundEvents = {};
}
}), vjs.Slider.prototype.createEl = function(e, t) {
return t = t || {}, t.className = t.className + " vjs-slider", t = vjs.obj.merge({
role: "slider",
"aria-valuenow": 0,
"aria-valuemin": 0,
"aria-valuemax": 100,
tabIndex: 0
}, t), vjs.Component.prototype.createEl.call(this, e, t);
}, vjs.Slider.prototype.onMouseDown = function(e) {
e.preventDefault(), vjs.blockTextSelection(), this.boundEvents.move = vjs.bind(this, this.onMouseMove), this.boundEvents.end = vjs.bind(this, this.onMouseUp), vjs.on(document, "mousemove", this.boundEvents.move), vjs.on(document, "mouseup", this.boundEvents.end), vjs.on(document, "touchmove", this.boundEvents.move), vjs.on(document, "touchend", this.boundEvents.end), this.onMouseMove(e);
}, vjs.Slider.prototype.onMouseUp = function() {
vjs.unblockTextSelection(), vjs.off(document, "mousemove", this.boundEvents.move, !1), vjs.off(document, "mouseup", this.boundEvents.end, !1), vjs.off(document, "touchmove", this.boundEvents.move, !1), vjs.off(document, "touchend", this.boundEvents.end, !1), this.update();
}, vjs.Slider.prototype.update = function() {
if (!this.el_) return;
var e, t = this.getPercent(), n = this.handle, r = this.bar;
isNaN(t) && (t = 0), e = t;
if (n) {
var i = this.el_, s = i.offsetWidth, o = n.el().offsetWidth, u = o ? o / s : 0, a = 1 - u, f = t * a;
e = f + u / 2, n.el().style.left = vjs.round(f * 100, 2) + "%";
}
r.el().style.width = vjs.round(e * 100, 2) + "%";
}, vjs.Slider.prototype.calculateDistance = function(e) {
var t, n, r, i, s, o, u, a, f;
t = this.el_, n = vjs.findPosition(t), s = o = t.offsetWidth, u = this.handle;
if (this.options_.vertical) {
i = n.top, e.changedTouches ? f = e.changedTouches[0].pageY : f = e.pageY;
if (u) {
var l = u.el().offsetHeight;
i += l / 2, o -= l;
}
return Math.max(0, Math.min(1, (i - f + o) / o));
}
r = n.left, e.changedTouches ? a = e.changedTouches[0].pageX : a = e.pageX;
if (u) {
var c = u.el().offsetWidth;
r += c / 2, s -= c;
}
return Math.max(0, Math.min(1, (a - r) / s));
}, vjs.Slider.prototype.onFocus = function() {
vjs.on(document, "keyup", vjs.bind(this, this.onKeyPress));
}, vjs.Slider.prototype.onKeyPress = function(e) {
e.which == 37 ? (e.preventDefault(), this.stepBack()) : e.which == 39 && (e.preventDefault(), this.stepForward());
}, vjs.Slider.prototype.onBlur = function() {
vjs.off(document, "keyup", vjs.bind(this, this.onKeyPress));
}, vjs.Slider.prototype.onClick = function(e) {
e.stopImmediatePropagation(), e.preventDefault();
}, vjs.SliderHandle = vjs.Component.extend(), vjs.SliderHandle.prototype.defaultValue = 0, vjs.SliderHandle.prototype.createEl = function(e, t) {
return t = t || {}, t.className = t.className + " vjs-slider-handle", t = vjs.obj.merge({
innerHTML: '<span class="vjs-control-text">' + this.defaultValue + "</span>"
}, t), vjs.Component.prototype.createEl.call(this, "div", t);
}, vjs.Menu = vjs.Component.extend(), vjs.Menu.prototype.addItem = function(e) {
this.addChild(e), e.on("click", vjs.bind(this, function() {
this.unlockShowing();
}));
}, vjs.Menu.prototype.createEl = function() {
var e = this.options().contentElType || "ul";
this.contentEl_ = vjs.createEl(e, {
className: "vjs-menu-content"
});
var t = vjs.Component.prototype.createEl.call(this, "div", {
append: this.contentEl_,
className: "vjs-menu"
});
return t.appendChild(this.contentEl_), vjs.on(t, "click", function(e) {
e.preventDefault(), e.stopImmediatePropagation();
}), t;
}, vjs.MenuItem = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), this.selected(t.selected);
}
}), vjs.MenuItem.prototype.createEl = function(e, t) {
return vjs.Button.prototype.createEl.call(this, "li", vjs.obj.merge({
className: "vjs-menu-item",
innerHTML: this.options_.label
}, t));
}, vjs.MenuItem.prototype.onClick = function() {
this.selected(!0);
}, vjs.MenuItem.prototype.selected = function(e) {
e ? (this.addClass("vjs-selected"), this.el_.setAttribute("aria-selected", !0)) : (this.removeClass("vjs-selected"), this.el_.setAttribute("aria-selected", !1));
}, vjs.MenuButton = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), this.menu = this.createMenu(), this.addChild(this.menu), this.items && this.items.length === 0 && this.hide(), this.on("keyup", this.onKeyPress), this.el_.setAttribute("aria-haspopup", !0), this.el_.setAttribute("role", "button");
}
}), vjs.MenuButton.prototype.buttonPressed_ = !1, vjs.MenuButton.prototype.createMenu = function() {
var e = new vjs.Menu(this.player_);
this.options().title && e.el().appendChild(vjs.createEl("li", {
className: "vjs-menu-title",
innerHTML: vjs.capitalize(this.kind_),
tabindex: -1
})), this.items = this.createItems();
if (this.items) for (var t = 0; t < this.items.length; t++) e.addItem(this.items[t]);
return e;
}, vjs.MenuButton.prototype.createItems = function() {}, vjs.MenuButton.prototype.buildCSSClass = function() {
return this.className + " vjs-menu-button " + vjs.Button.prototype.buildCSSClass.call(this);
}, vjs.MenuButton.prototype.onFocus = function() {}, vjs.MenuButton.prototype.onBlur = function() {}, vjs.MenuButton.prototype.onClick = function() {
this.one("mouseout", vjs.bind(this, function() {
this.menu.unlockShowing(), this.el_.blur();
})), this.buttonPressed_ ? this.unpressButton() : this.pressButton();
}, vjs.MenuButton.prototype.onKeyPress = function(e) {
e.preventDefault(), e.which == 32 || e.which == 13 ? this.buttonPressed_ ? this.unpressButton() : this.pressButton() : e.which == 27 && this.buttonPressed_ && this.unpressButton();
}, vjs.MenuButton.prototype.pressButton = function() {
this.buttonPressed_ = !0, this.menu.lockShowing(), this.el_.setAttribute("aria-pressed", !0), this.items && this.items.length > 0 && this.items[0].el().focus();
}, vjs.MenuButton.prototype.unpressButton = function() {
this.buttonPressed_ = !1, this.menu.unlockShowing(), this.el_.setAttribute("aria-pressed", !1);
}, vjs.Player = vjs.Component.extend({
init: function(e, t, n) {
this.tag = e, t = vjs.obj.merge(this.getTagSettings(e), t), this.cache_ = {}, this.poster_ = t.poster, this.controls_ = t.controls, t.customControlsOnMobile !== !0 && (vjs.IS_IOS || vjs.IS_ANDROID) ? (e.controls = t.controls, this.controls_ = !1) : e.controls = !1, vjs.Component.call(this, this, t, n), this.one("play", function(e) {
var t = {
type: "firstplay",
target: this.el_
}, n = vjs.trigger(this.el_, t);
n || (e.preventDefault(), e.stopPropagation(), e.stopImmediatePropagation());
}), this.on("ended", this.onEnded), this.on("play", this.onPlay), this.on("firstplay", this.onFirstPlay), this.on("pause", this.onPause), this.on("progress", this.onProgress), this.on("durationchange", this.onDurationChange), this.on("error", this.onError), this.on("fullscreenchange", this.onFullscreenChange), vjs.players[this.id_] = this, t.plugins && vjs.obj.each(t.plugins, function(e, t) {
this[e](t);
}, this);
}
}), vjs.Player.prototype.options_ = vjs.options, vjs.Player.prototype.dispose = function() {
vjs.players[this.id_] = null, this.tag && this.tag.player && (this.tag.player = null), this.el_ && this.el_.player && (this.el_.player = null), this.stopTrackingProgress(), this.stopTrackingCurrentTime(), this.tech && this.tech.dispose(), vjs.Component.prototype.dispose.call(this);
}, vjs.Player.prototype.getTagSettings = function(e) {
var t = {
sources: [],
tracks: []
};
vjs.obj.merge(t, vjs.getAttributeValues(e));
if (e.hasChildNodes()) {
var n, r, i, s, o;
n = e.childNodes;
for (s = 0, o = n.length; s < o; s++) r = n[s], i = r.nodeName.toLowerCase(), i === "source" ? t.sources.push(vjs.getAttributeValues(r)) : i === "track" && t.tracks.push(vjs.getAttributeValues(r));
}
return t;
}, vjs.Player.prototype.createEl = function() {
var e = this.el_ = vjs.Component.prototype.createEl.call(this, "div"), t = this.tag;
t.removeAttribute("width"), t.removeAttribute("height");
if (t.hasChildNodes()) {
var n, r, i, s, o, u;
n = t.childNodes, r = n.length, u = [];
while (r--) s = n[r], o = s.nodeName.toLowerCase(), (o === "source" || o === "track") && u.push(s);
for (i = 0; i < u.length; i++) t.removeChild(u[i]);
}
return t.id = t.id || "vjs_video_" + vjs.guid++, e.id = t.id, e.className = t.className, t.id += "_html5_api", t.className = "vjs-tech", t.player = e.player = this, this.addClass("vjs-paused"), this.width(this.options_.width, !0), this.height(this.options_.height, !0), t.parentNode && t.parentNode.insertBefore(e, t), vjs.insertFirst(t, e), e;
}, vjs.Player.prototype.loadTech = function(e, t) {
this.tech ? this.unloadTech() : e !== "Html5" && this.tag && (this.el_.removeChild(this.tag), this.tag.player = null, this.tag = null), this.techName = e, this.isReady_ = !1;
var n = function() {
this.player_.triggerReady(), this.features.progressEvents || this.player_.manualProgressOn(), this.features.timeupdateEvents || this.player_.manualTimeUpdatesOn();
}, r = vjs.obj.merge({
source: t,
parentEl: this.el_
}, this.options_[e.toLowerCase()]);
t && (t.src == this.cache_.src && this.cache_.currentTime > 0 && (r.startTime = this.cache_.currentTime), this.cache_.src = t.src), this.tech = new window.videojs[e](this, r), this.tech.ready(n);
}, vjs.Player.prototype.unloadTech = function() {
this.isReady_ = !1, this.tech.dispose(), this.manualProgress && this.manualProgressOff(), this.manualTimeUpdates && this.manualTimeUpdatesOff(), this.tech = !1;
}, vjs.Player.prototype.manualProgressOn = function() {
this.manualProgress = !0, this.trackProgress(), this.tech.one("progress", function() {
this.features.progressEvents = !0, this.player_.manualProgressOff();
});
}, vjs.Player.prototype.manualProgressOff = function() {
this.manualProgress = !1, this.stopTrackingProgress();
}, vjs.Player.prototype.trackProgress = function() {
this.progressInterval = setInterval(vjs.bind(this, function() {
this.cache_.bufferEnd < this.buffered().end(0) ? this.trigger("progress") : this.bufferedPercent() == 1 && (this.stopTrackingProgress(), this.trigger("progress"));
}), 500);
}, vjs.Player.prototype.stopTrackingProgress = function() {
clearInterval(this.progressInterval);
}, vjs.Player.prototype.manualTimeUpdatesOn = function() {
this.manualTimeUpdates = !0, this.on("play", this.trackCurrentTime), this.on("pause", this.stopTrackingCurrentTime), this.tech.one("timeupdate", function() {
this.features.timeupdateEvents = !0, this.player_.manualTimeUpdatesOff();
});
}, vjs.Player.prototype.manualTimeUpdatesOff = function() {
this.manualTimeUpdates = !1, this.stopTrackingCurrentTime(), this.off("play", this.trackCurrentTime), this.off("pause", this.stopTrackingCurrentTime);
}, vjs.Player.prototype.trackCurrentTime = function() {
this.currentTimeInterval && this.stopTrackingCurrentTime(), this.currentTimeInterval = setInterval(vjs.bind(this, function() {
this.trigger("timeupdate");
}), 250);
}, vjs.Player.prototype.stopTrackingCurrentTime = function() {
clearInterval(this.currentTimeInterval);
}, vjs.Player.prototype.onEnded = function() {
this.options_.loop && (this.currentTime(0), this.play());
}, vjs.Player.prototype.onPlay = function() {
vjs.removeClass(this.el_, "vjs-paused"), vjs.addClass(this.el_, "vjs-playing");
}, vjs.Player.prototype.onFirstPlay = function() {
this.options_.starttime && this.currentTime(this.options_.starttime);
}, vjs.Player.prototype.onPause = function() {
vjs.removeClass(this.el_, "vjs-playing"), vjs.addClass(this.el_, "vjs-paused");
}, vjs.Player.prototype.onProgress = function() {
this.bufferedPercent() == 1 && this.trigger("loadedalldata");
}, vjs.Player.prototype.onDurationChange = function() {
this.duration(this.techGet("duration"));
}, vjs.Player.prototype.onError = function(e) {
vjs.log("Video Error", e);
}, vjs.Player.prototype.onFullscreenChange = function() {
this.isFullScreen ? this.addClass("vjs-fullscreen") : this.removeClass("vjs-fullscreen");
}, vjs.Player.prototype.cache_, vjs.Player.prototype.getCache = function() {
return this.cache_;
}, vjs.Player.prototype.techCall = function(e, t) {
if (this.tech && !this.tech.isReady_) this.tech.ready(function() {
this[e](t);
}); else try {
this.tech[e](t);
} catch (n) {
throw vjs.log(n), n;
}
}, vjs.Player.prototype.techGet = function(e) {
if (this.tech.isReady_) try {
return this.tech[e]();
} catch (t) {
throw this.tech[e] === undefined ? vjs.log("Video.js: " + e + " method not defined for " + this.techName + " playback technology.", t) : t.name == "TypeError" ? (vjs.log("Video.js: " + e + " unavailable on " + this.techName + " playback technology element.", t), this.tech.isReady_ = !1) : vjs.log(t), t;
}
return;
}, vjs.Player.prototype.play = function() {
return this.techCall("play"), this;
}, vjs.Player.prototype.pause = function() {
return this.techCall("pause"), this;
}, vjs.Player.prototype.paused = function() {
return this.techGet("paused") === !1 ? !1 : !0;
}, vjs.Player.prototype.currentTime = function(e) {
return e !== undefined ? (this.cache_.lastSetCurrentTime = e, this.techCall("setCurrentTime", e), this.manualTimeUpdates && this.trigger("timeupdate"), this) : this.cache_.currentTime = this.techGet("currentTime") || 0;
}, vjs.Player.prototype.duration = function(e) {
return e !== undefined ? (this.cache_.duration = parseFloat(e), this) : this.cache_.duration;
}, vjs.Player.prototype.remainingTime = function() {
return this.duration() - this.currentTime();
}, vjs.Player.prototype.buffered = function() {
var e = this.techGet("buffered"), t = 0, n = this.cache_.bufferEnd = this.cache_.bufferEnd || 0;
return e && e.length > 0 && e.end(0) !== n && (n = e.end(0), this.cache_.bufferEnd = n), vjs.createTimeRange(t, n);
}, vjs.Player.prototype.bufferedPercent = function() {
return this.duration() ? this.buffered().end(0) / this.duration() : 0;
}, vjs.Player.prototype.volume = function(e) {
var t;
return e !== undefined ? (t = Math.max(0, Math.min(1, parseFloat(e))), this.cache_.volume = t, this.techCall("setVolume", t), vjs.setLocalStorage("volume", t), this) : (t = parseFloat(this.techGet("volume")), isNaN(t) ? 1 : t);
}, vjs.Player.prototype.muted = function(e) {
return e !== undefined ? (this.techCall("setMuted", e), this) : this.techGet("muted") || !1;
}, vjs.Player.prototype.supportsFullScreen = function() {
return this.techGet("supportsFullScreen") || !1;
}, vjs.Player.prototype.requestFullScreen = function() {
var e = vjs.support.requestFullScreen;
return this.isFullScreen = !0, e ? (vjs.on(document, e.eventName, vjs.bind(this, function(t) {
this.isFullScreen = document[e.isFullScreen], this.isFullScreen === !1 && vjs.off(document, e.eventName, arguments.callee), this.trigger("fullscreenchange");
})), this.el_[e.requestFn]()) : this.tech.supportsFullScreen() ? this.techCall("enterFullScreen") : (this.enterFullWindow(), this.trigger("fullscreenchange")), this;
}, vjs.Player.prototype.cancelFullScreen = function() {
var e = vjs.support.requestFullScreen;
return this.isFullScreen = !1, e ? document[e.cancelFn]() : this.tech.supportsFullScreen() ? this.techCall("exitFullScreen") : (this.exitFullWindow(), this.trigger("fullscreenchange")), this;
}, vjs.Player.prototype.enterFullWindow = function() {
this.isFullWindow = !0, this.docOrigOverflow = document.documentElement.style.overflow, vjs.on(document, "keydown", vjs.bind(this, this.fullWindowOnEscKey)), document.documentElement.style.overflow = "hidden", vjs.addClass(document.body, "vjs-full-window"), this.trigger("enterFullWindow");
}, vjs.Player.prototype.fullWindowOnEscKey = function(e) {
e.keyCode === 27 && (this.isFullScreen === !0 ? this.cancelFullScreen() : this.exitFullWindow());
}, vjs.Player.prototype.exitFullWindow = function() {
this.isFullWindow = !1, vjs.off(document, "keydown", this.fullWindowOnEscKey), document.documentElement.style.overflow = this.docOrigOverflow, vjs.removeClass(document.body, "vjs-full-window"), this.trigger("exitFullWindow");
}, vjs.Player.prototype.selectSource = function(e) {
for (var t = 0, n = this.options_.techOrder; t < n.length; t++) {
var r = vjs.capitalize(n[t]), i = window.videojs[r];
if (i.isSupported()) for (var s = 0, o = e; s < o.length; s++) {
var u = o[s];
if (i.canPlaySource(u)) return {
source: u,
tech: r
};
}
}
return !1;
}, vjs.Player.prototype.src = function(e) {
if (e instanceof Array) {
var t = this.selectSource(e), n;
t ? (e = t.source, n = t.tech, n == this.techName ? this.src(e) : this.loadTech(n, e)) : this.el_.appendChild(vjs.createEl("p", {
innerHTML: 'Sorry, no compatible source and playback technology were found for this video. Try using another browser like <a href="http://bit.ly/ccMUEC">Chrome</a> or download the latest <a href="http://adobe.ly/mwfN1">Adobe Flash Player</a>.'
}));
} else e instanceof Object ? window.videojs[this.techName].canPlaySource(e) ? this.src(e.src) : this.src([ e ]) : (this.cache_.src = e, this.isReady_ ? (this.techCall("src", e), this.options_["preload"] == "auto" && this.load(), this.options_.autoplay && this.play()) : this.ready(function() {
this.src(e);
}));
return this;
}, vjs.Player.prototype.load = function() {
return this.techCall("load"), this;
}, vjs.Player.prototype.currentSrc = function() {
return this.techGet("currentSrc") || this.cache_.src || "";
}, vjs.Player.prototype.preload = function(e) {
return e !== undefined ? (this.techCall("setPreload", e), this.options_.preload = e, this) : this.techGet("preload");
}, vjs.Player.prototype.autoplay = function(e) {
return e !== undefined ? (this.techCall("setAutoplay", e), this.options_.autoplay = e, this) : this.techGet("autoplay", e);
}, vjs.Player.prototype.loop = function(e) {
return e !== undefined ? (this.techCall("setLoop", e), this.options_.loop = e, this) : this.techGet("loop");
}, vjs.Player.prototype.poster_, vjs.Player.prototype.poster = function(e) {
return e !== undefined && (this.poster_ = e), this.poster_;
}, vjs.Player.prototype.controls_, vjs.Player.prototype.controls = function(e) {
return e !== undefined && this.controls_ !== e && (this.controls_ = !!e, this.trigger("controlschange")), this.controls_;
}, vjs.Player.prototype.error = function() {
return this.techGet("error");
}, vjs.Player.prototype.ended = function() {
return this.techGet("ended");
}, function() {
var e, t, n;
n = document.createElement("div"), t = {}, n.cancelFullscreen !== undefined ? (t.requestFn = "requestFullscreen", t.cancelFn = "exitFullscreen", t.eventName = "fullscreenchange", t.isFullScreen = "fullScreen") : (document.mozCancelFullScreen ? (e = "moz", t.isFullScreen = e + "FullScreen") : (e = "webkit", t.isFullScreen = e + "IsFullScreen"), n[e + "RequestFullScreen"] && (t.requestFn = e + "RequestFullScreen", t.cancelFn = e + "CancelFullScreen"), t.eventName = e + "fullscreenchange"), document[t.cancelFn] && (vjs.support.requestFullScreen = t);
}(), vjs.ControlBar = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.controls() || this.disable(), e.one("play", vjs.bind(this, function() {
var e, t = vjs.bind(this, this.fadeIn), n = vjs.bind(this, this.fadeOut);
this.fadeIn(), "ontouchstart" in window || (this.player_.on("mouseover", t), this.player_.on("mouseout", n), this.player_.on("pause", vjs.bind(this, this.lockShowing)), this.player_.on("play", vjs.bind(this, this.unlockShowing))), e = !1, this.player_.on("touchstart", function() {
e = !0;
}), this.player_.on("touchmove", function() {
e = !1;
}), this.player_.on("touchend", vjs.bind(this, function(t) {
var n;
e && (n = this.el().className.search("fade-in"), n !== -1 ? this.fadeOut() : this.fadeIn()), e = !1, this.player_.paused() || t.preventDefault();
}));
}));
}
}), vjs.ControlBar.prototype.options_ = {
loadEvent: "play",
children: {
playToggle: {},
currentTimeDisplay: {},
timeDivider: {},
durationDisplay: {},
remainingTimeDisplay: {},
progressControl: {},
fullscreenToggle: {},
volumeControl: {},
muteToggle: {}
}
}, vjs.ControlBar.prototype.createEl = function() {
return vjs.createEl("div", {
className: "vjs-control-bar"
});
}, vjs.ControlBar.prototype.fadeIn = function() {
vjs.Component.prototype.fadeIn.call(this), this.player_.trigger("controlsvisible");
}, vjs.ControlBar.prototype.fadeOut = function() {
vjs.Component.prototype.fadeOut.call(this), this.player_.trigger("controlshidden");
}, vjs.PlayToggle = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), e.on("play", vjs.bind(this, this.onPlay)), e.on("pause", vjs.bind(this, this.onPause));
}
}), vjs.PlayToggle.prototype.buttonText = "Play", vjs.PlayToggle.prototype.buildCSSClass = function() {
return "vjs-play-control " + vjs.Button.prototype.buildCSSClass.call(this);
}, vjs.PlayToggle.prototype.onClick = function() {
this.player_.paused() ? this.player_.play() : this.player_.pause();
}, vjs.PlayToggle.prototype.onPlay = function() {
vjs.removeClass(this.el_, "vjs-paused"), vjs.addClass(this.el_, "vjs-playing"), this.el_.children[0].children[0].innerHTML = "Pause";
}, vjs.PlayToggle.prototype.onPause = function() {
vjs.removeClass(this.el_, "vjs-playing"), vjs.addClass(this.el_, "vjs-paused"), this.el_.children[0].children[0].innerHTML = "Play";
}, vjs.CurrentTimeDisplay = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.on("timeupdate", vjs.bind(this, this.updateContent));
}
}), vjs.CurrentTimeDisplay.prototype.createEl = function() {
var e = vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-current-time vjs-time-controls vjs-control"
});
return this.content = vjs.createEl("div", {
className: "vjs-current-time-display",
innerHTML: '<span class="vjs-control-text">Current Time </span>0:00',
"aria-live": "off"
}), e.appendChild(vjs.createEl("div").appendChild(this.content)), e;
}, vjs.CurrentTimeDisplay.prototype.updateContent = function() {
var e = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
this.content.innerHTML = '<span class="vjs-control-text">Current Time </span>' + vjs.formatTime(e, this.player_.duration());
}, vjs.DurationDisplay = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.on("timeupdate", vjs.bind(this, this.updateContent));
}
}), vjs.DurationDisplay.prototype.createEl = function() {
var e = vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-duration vjs-time-controls vjs-control"
});
return this.content = vjs.createEl("div", {
className: "vjs-duration-display",
innerHTML: '<span class="vjs-control-text">Duration Time </span>0:00',
"aria-live": "off"
}), e.appendChild(vjs.createEl("div").appendChild(this.content)), e;
}, vjs.DurationDisplay.prototype.updateContent = function() {
this.player_.duration() && (this.content.innerHTML = '<span class="vjs-control-text">Duration Time </span>' + vjs.formatTime(this.player_.duration()));
}, vjs.TimeDivider = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t);
}
}), vjs.TimeDivider.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-time-divider",
innerHTML: "<div><span>/</span></div>"
});
}, vjs.RemainingTimeDisplay = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.on("timeupdate", vjs.bind(this, this.updateContent));
}
}), vjs.RemainingTimeDisplay.prototype.createEl = function() {
var e = vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-remaining-time vjs-time-controls vjs-control"
});
return this.content = vjs.createEl("div", {
className: "vjs-remaining-time-display",
innerHTML: '<span class="vjs-control-text">Remaining Time </span>-0:00',
"aria-live": "off"
}), e.appendChild(vjs.createEl("div").appendChild(this.content)), e;
}, vjs.RemainingTimeDisplay.prototype.updateContent = function() {
this.player_.duration() && this.player_.duration() && (this.content.innerHTML = '<span class="vjs-control-text">Remaining Time </span>-' + vjs.formatTime(this.player_.remainingTime()));
}, vjs.FullscreenToggle = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t);
}
}), vjs.FullscreenToggle.prototype.buttonText = "Fullscreen", vjs.FullscreenToggle.prototype.buildCSSClass = function() {
return "vjs-fullscreen-control " + vjs.Button.prototype.buildCSSClass.call(this);
}, vjs.FullscreenToggle.prototype.onClick = function() {
this.player_.isFullScreen ? (this.player_.cancelFullScreen(), this.el_.children[0].children[0].innerHTML = "Fullscreen") : (this.player_.requestFullScreen(), this.el_.children[0].children[0].innerHTML = "Non-Fullscreen");
}, vjs.ProgressControl = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t);
}
}), vjs.ProgressControl.prototype.options_ = {
children: {
seekBar: {}
}
}, vjs.ProgressControl.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-progress-control vjs-control"
});
}, vjs.SeekBar = vjs.Slider.extend({
init: function(e, t) {
vjs.Slider.call(this, e, t), e.on("timeupdate", vjs.bind(this, this.updateARIAAttributes)), e.ready(vjs.bind(this, this.updateARIAAttributes));
}
}), vjs.SeekBar.prototype.options_ = {
children: {
loadProgressBar: {},
playProgressBar: {},
seekHandle: {}
},
barName: "playProgressBar",
handleName: "seekHandle"
}, vjs.SeekBar.prototype.playerEvent = "timeupdate", vjs.SeekBar.prototype.createEl = function() {
return vjs.Slider.prototype.createEl.call(this, "div", {
className: "vjs-progress-holder",
"aria-label": "video progress bar"
});
}, vjs.SeekBar.prototype.updateARIAAttributes = function() {
var e = this.player_.scrubbing ? this.player_.getCache().currentTime : this.player_.currentTime();
this.el_.setAttribute("aria-valuenow", vjs.round(this.getPercent() * 100, 2)), this.el_.setAttribute("aria-valuetext", vjs.formatTime(e, this.player_.duration()));
}, vjs.SeekBar.prototype.getPercent = function() {
return this.player_.currentTime() / this.player_.duration();
}, vjs.SeekBar.prototype.onMouseDown = function(e) {
vjs.Slider.prototype.onMouseDown.call(this, e), this.player_.scrubbing = !0, this.videoWasPlaying = !this.player_.paused(), this.player_.pause();
}, vjs.SeekBar.prototype.onMouseMove = function(e) {
var t = this.calculateDistance(e) * this.player_.duration();
t == this.player_.duration() && (t -= .1), this.player_.currentTime(t);
}, vjs.SeekBar.prototype.onMouseUp = function(e) {
vjs.Slider.prototype.onMouseUp.call(this, e), this.player_.scrubbing = !1, this.videoWasPlaying && this.player_.play();
}, vjs.SeekBar.prototype.stepForward = function() {
this.player_.currentTime(this.player_.currentTime() + 5);
}, vjs.SeekBar.prototype.stepBack = function() {
this.player_.currentTime(this.player_.currentTime() - 5);
}, vjs.LoadProgressBar = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.on("progress", vjs.bind(this, this.update));
}
}), vjs.LoadProgressBar.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-load-progress",
innerHTML: '<span class="vjs-control-text">Loaded: 0%</span>'
});
}, vjs.LoadProgressBar.prototype.update = function() {
this.el_.style && (this.el_.style.width = vjs.round(this.player_.bufferedPercent() * 100, 2) + "%");
}, vjs.PlayProgressBar = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t);
}
}), vjs.PlayProgressBar.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-play-progress",
innerHTML: '<span class="vjs-control-text">Progress: 0%</span>'
});
}, vjs.SeekHandle = vjs.SliderHandle.extend(), vjs.SeekHandle.prototype.defaultValue = "00:00", vjs.SeekHandle.prototype.createEl = function() {
return vjs.SliderHandle.prototype.createEl.call(this, "div", {
className: "vjs-seek-handle"
});
}, vjs.VolumeControl = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.tech && e.tech.features && e.tech.features.volumeControl === !1 && this.addClass("vjs-hidden"), e.on("loadstart", vjs.bind(this, function() {
e.tech.features && e.tech.features.volumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
}));
}
}), vjs.VolumeControl.prototype.options_ = {
children: {
volumeBar: {}
}
}, vjs.VolumeControl.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-volume-control vjs-control"
});
}, vjs.VolumeBar = vjs.Slider.extend({
init: function(e, t) {
vjs.Slider.call(this, e, t), e.on("volumechange", vjs.bind(this, this.updateARIAAttributes)), e.ready(vjs.bind(this, this.updateARIAAttributes)), setTimeout(vjs.bind(this, this.update), 0);
}
}), vjs.VolumeBar.prototype.updateARIAAttributes = function() {
this.el_.setAttribute("aria-valuenow", vjs.round(this.player_.volume() * 100, 2)), this.el_.setAttribute("aria-valuetext", vjs.round(this.player_.volume() * 100, 2) + "%");
}, vjs.VolumeBar.prototype.options_ = {
children: {
volumeLevel: {},
volumeHandle: {}
},
barName: "volumeLevel",
handleName: "volumeHandle"
}, vjs.VolumeBar.prototype.playerEvent = "volumechange", vjs.VolumeBar.prototype.createEl = function() {
return vjs.Slider.prototype.createEl.call(this, "div", {
className: "vjs-volume-bar",
"aria-label": "volume level"
});
}, vjs.VolumeBar.prototype.onMouseMove = function(e) {
this.player_.volume(this.calculateDistance(e));
}, vjs.VolumeBar.prototype.getPercent = function() {
return this.player_.muted() ? 0 : this.player_.volume();
}, vjs.VolumeBar.prototype.stepForward = function() {
this.player_.volume(this.player_.volume() + .1);
}, vjs.VolumeBar.prototype.stepBack = function() {
this.player_.volume(this.player_.volume() - .1);
}, vjs.VolumeLevel = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t);
}
}), vjs.VolumeLevel.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-volume-level",
innerHTML: '<span class="vjs-control-text"></span>'
});
}, vjs.VolumeHandle = vjs.SliderHandle.extend(), vjs.VolumeHandle.prototype.defaultValue = "00:00", vjs.VolumeHandle.prototype.createEl = function() {
return vjs.SliderHandle.prototype.createEl.call(this, "div", {
className: "vjs-volume-handle"
});
}, vjs.MuteToggle = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), e.on("volumechange", vjs.bind(this, this.update)), e.tech && e.tech.features && e.tech.features.volumeControl === !1 && this.addClass("vjs-hidden"), e.on("loadstart", vjs.bind(this, function() {
e.tech.features && e.tech.features.volumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
}));
}
}), vjs.MuteToggle.prototype.createEl = function() {
return vjs.Button.prototype.createEl.call(this, "div", {
className: "vjs-mute-control vjs-control",
innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
});
}, vjs.MuteToggle.prototype.onClick = function() {
this.player_.muted(this.player_.muted() ? !1 : !0);
}, vjs.MuteToggle.prototype.update = function() {
var e = this.player_.volume(), t = 3;
e === 0 || this.player_.muted() ? t = 0 : e < .33 ? t = 1 : e < .67 && (t = 2), this.player_.muted() ? this.el_.children[0].children[0].innerHTML != "Unmute" && (this.el_.children[0].children[0].innerHTML = "Unmute") : this.el_.children[0].children[0].innerHTML != "Mute" && (this.el_.children[0].children[0].innerHTML = "Mute");
for (var n = 0; n < 4; n++) vjs.removeClass(this.el_, "vjs-vol-" + n);
vjs.addClass(this.el_, "vjs-vol-" + t);
}, vjs.VolumeMenuButton = vjs.MenuButton.extend({
init: function(e, t) {
vjs.MenuButton.call(this, e, t), e.on("volumechange", vjs.bind(this, this.update)), e.tech && e.tech.features && e.tech.features.volumeControl === !1 && this.addClass("vjs-hidden"), e.on("loadstart", vjs.bind(this, function() {
e.tech.features && e.tech.features.volumeControl === !1 ? this.addClass("vjs-hidden") : this.removeClass("vjs-hidden");
})), this.addClass("vjs-menu-button");
}
}), vjs.VolumeMenuButton.prototype.createMenu = function() {
var e = new vjs.Menu(this.player_, {
contentElType: "div"
}), t = new vjs.VolumeBar(this.player_, vjs.obj.merge({
vertical: !0
}, this.options_.volumeBar));
return e.addChild(t), e;
}, vjs.VolumeMenuButton.prototype.onClick = function() {
vjs.MuteToggle.prototype.onClick.call(this), vjs.MenuButton.prototype.onClick.call(this);
}, vjs.VolumeMenuButton.prototype.createEl = function() {
return vjs.Button.prototype.createEl.call(this, "div", {
className: "vjs-volume-menu-button vjs-menu-button vjs-control",
innerHTML: '<div><span class="vjs-control-text">Mute</span></div>'
});
}, vjs.VolumeMenuButton.prototype.update = vjs.MuteToggle.prototype.update, vjs.PosterImage = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), (!e.poster() || !e.controls()) && this.hide(), e.on("play", vjs.bind(this, this.hide));
}
}), vjs.PosterImage.prototype.createEl = function() {
var e = vjs.createEl("div", {
className: "vjs-poster",
tabIndex: -1
}), t = this.player_.poster();
return t && ("backgroundSize" in e.style ? e.style.backgroundImage = 'url("' + t + '")' : e.appendChild(vjs.createEl("img", {
src: t
}))), e;
}, vjs.PosterImage.prototype.onClick = function() {
this.player_.play();
}, vjs.LoadingSpinner = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), e.on("canplay", vjs.bind(this, this.hide)), e.on("canplaythrough", vjs.bind(this, this.hide)), e.on("playing", vjs.bind(this, this.hide)), e.on("seeked", vjs.bind(this, this.hide)), e.on("seeking", vjs.bind(this, this.show)), e.on("seeked", vjs.bind(this, this.hide)), e.on("error", vjs.bind(this, this.show)), e.on("waiting", vjs.bind(this, this.show));
}
}), vjs.LoadingSpinner.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-loading-spinner"
});
}, vjs.BigPlayButton = vjs.Button.extend({
init: function(e, t) {
vjs.Button.call(this, e, t), e.controls() || this.hide(), e.on("play", vjs.bind(this, this.hide));
}
}), vjs.BigPlayButton.prototype.createEl = function() {
return vjs.Button.prototype.createEl.call(this, "div", {
className: "vjs-big-play-button",
innerHTML: "<span></span>",
"aria-label": "play video"
});
}, vjs.BigPlayButton.prototype.onClick = function() {
this.player_.play();
}, vjs.MediaTechController = vjs.Component.extend({
init: function(e, t, n) {
vjs.Component.call(this, e, t, n);
}
}), vjs.MediaTechController.prototype.onClick = function() {
return vjs.IS_ANDROID ? function() {} : function() {
this.player_.controls() && (this.player_.paused() ? this.player_.play() : this.player_.pause());
};
}(), vjs.MediaTechController.prototype.features = {
volumeControl: !0,
fullscreenResize: !1,
progressEvents: !1,
timeupdateEvents: !1
}, vjs.media = {}, vjs.media.ApiMethods = "play,pause,paused,currentTime,setCurrentTime,duration,buffered,volume,setVolume,muted,setMuted,width,height,supportsFullScreen,enterFullScreen,src,load,currentSrc,preload,setPreload,autoplay,setAutoplay,loop,setLoop,error,networkState,readyState,seeking,initialTime,startOffsetTime,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks,defaultPlaybackRate,playbackRate,mediaGroup,controller,controls,defaultMuted".split(",");
function createMethod(e) {
return function() {
throw new Error('The "' + e + "\" method is not available on the playback technology's API");
};
}
for (var i = vjs.media.ApiMethods.length - 1; i >= 0; i--) {
var methodName = vjs.media.ApiMethods[i];
vjs.MediaTechController.prototype[vjs.media.ApiMethods[i]] = createMethod(methodName);
}
vjs.Html5 = vjs.MediaTechController.extend({
init: function(e, t, n) {
this.features.volumeControl = vjs.Html5.canControlVolume(), this.features.movingMediaElementInDOM = !vjs.IS_IOS, this.features.fullscreenResize = !0, vjs.MediaTechController.call(this, e, t, n);
var r = t.source;
r && this.el_.currentSrc == r.src ? e.trigger("loadstart") : r && (this.el_.src = r.src), e.ready(function() {
this.tag && this.options_.autoplay && this.paused() && (delete this.tag.poster, this.play());
}), this.on("click", this.onClick), this.setupTriggers(), this.triggerReady();
}
}), vjs.Html5.prototype.dispose = function() {
vjs.MediaTechController.prototype.dispose.call(this);
}, vjs.Html5.prototype.createEl = function() {
var e = this.player_, t = e.tag, n;
if (!t || this.features.movingMediaElementInDOM === !1) t ? (t.player = null, e.tag = null, e.el().removeChild(t), t = t.cloneNode(!1)) : t = vjs.createEl("video", {
id: e.id() + "_html5_api",
className: "vjs-tech"
}), t.player = e, vjs.insertFirst(t, e.el());
var r = [ "autoplay", "preload", "loop", "muted" ];
for (var i = r.length - 1; i >= 0; i--) {
var s = r[i];
e.options_[s] !== null && (t[s] = e.options_[s]);
}
return t;
}, vjs.Html5.prototype.setupTriggers = function() {
for (var e = vjs.Html5.Events.length - 1; e >= 0; e--) vjs.on(this.el_, vjs.Html5.Events[e], vjs.bind(this.player_, this.eventHandler));
}, vjs.Html5.prototype.eventHandler = function(e) {
this.trigger(e), e.stopPropagation();
}, vjs.Html5.prototype.play = function() {
this.el_.play();
}, vjs.Html5.prototype.pause = function() {
this.el_.pause();
}, vjs.Html5.prototype.paused = function() {
return this.el_.paused;
}, vjs.Html5.prototype.currentTime = function() {
return this.el_.currentTime;
}, vjs.Html5.prototype.setCurrentTime = function(e) {
try {
this.el_.currentTime = e;
} catch (t) {
vjs.log(t, "Video is not ready. (Video.js)");
}
}, vjs.Html5.prototype.duration = function() {
return this.el_.duration || 0;
}, vjs.Html5.prototype.buffered = function() {
return this.el_.buffered;
}, vjs.Html5.prototype.volume = function() {
return this.el_.volume;
}, vjs.Html5.prototype.setVolume = function(e) {
this.el_.volume = e;
}, vjs.Html5.prototype.muted = function() {
return this.el_.muted;
}, vjs.Html5.prototype.setMuted = function(e) {
this.el_.muted = e;
}, vjs.Html5.prototype.width = function() {
return this.el_.offsetWidth;
}, vjs.Html5.prototype.height = function() {
return this.el_.offsetHeight;
}, vjs.Html5.prototype.supportsFullScreen = function() {
if (typeof this.el_.webkitEnterFullScreen == "function") if (/Android/.test(vjs.USER_AGENT) || !/Chrome|Mac OS X 10.5/.test(vjs.USER_AGENT)) return !0;
return !1;
}, vjs.Html5.prototype.enterFullScreen = function() {
var e = this.el_;
e.paused && e.networkState <= e.HAVE_METADATA ? (this.el_.play(), setTimeout(function() {
e.pause(), e.webkitEnterFullScreen();
}, 0)) : e.webkitEnterFullScreen();
}, vjs.Html5.prototype.exitFullScreen = function() {
this.el_.webkitExitFullScreen();
}, vjs.Html5.prototype.src = function(e) {
this.el_.src = e;
}, vjs.Html5.prototype.load = function() {
this.el_.load();
}, vjs.Html5.prototype.currentSrc = function() {
return this.el_.currentSrc;
}, vjs.Html5.prototype.preload = function() {
return this.el_.preload;
}, vjs.Html5.prototype.setPreload = function(e) {
this.el_.preload = e;
}, vjs.Html5.prototype.autoplay = function() {
return this.el_.autoplay;
}, vjs.Html5.prototype.setAutoplay = function(e) {
this.el_.autoplay = e;
}, vjs.Html5.prototype.loop = function() {
return this.el_.loop;
}, vjs.Html5.prototype.setLoop = function(e) {
this.el_.loop = e;
}, vjs.Html5.prototype.error = function() {
return this.el_.error;
}, vjs.Html5.prototype.seeking = function() {
return this.el_.seeking;
}, vjs.Html5.prototype.ended = function() {
return this.el_.ended;
}, vjs.Html5.prototype.defaultMuted = function() {
return this.el_.defaultMuted;
}, vjs.Html5.isSupported = function() {
return !!vjs.TEST_VID.canPlayType;
}, vjs.Html5.canPlaySource = function(e) {
try {
return !!vjs.TEST_VID.canPlayType(e.type);
} catch (t) {
return "";
}
}, vjs.Html5.canControlVolume = function() {
var e = vjs.TEST_VID.volume;
return vjs.TEST_VID.volume = e / 2 + .1, e !== vjs.TEST_VID.volume;
}, vjs.Html5.Events = "loadstart,suspend,abort,error,emptied,stalled,loadedmetadata,loadeddata,canplay,canplaythrough,playing,waiting,seeking,seeked,ended,durationchange,timeupdate,progress,play,pause,ratechange,volumechange".split(","), vjs.IS_OLD_ANDROID && (document.createElement("video").constructor.prototype.canPlayType = function(e) {
return e && e.toLowerCase().indexOf("video/mp4") != -1 ? "maybe" : "";
}), vjs.Flash = vjs.MediaTechController.extend({
init: function(e, t, n) {
vjs.MediaTechController.call(this, e, t, n);
var r = t.source, i = t.parentEl, s = this.el_ = vjs.createEl("div", {
id: e.id() + "_temp_flash"
}), o = e.id() + "_flash_api", u = e.options_, a = vjs.obj.merge({
readyFunction: "videojs.Flash.onReady",
eventProxyFunction: "videojs.Flash.onEvent",
errorEventProxyFunction: "videojs.Flash.onError",
autoplay: u.autoplay,
preload: u.preload,
loop: u.loop,
muted: u.muted
}, t.flashVars), f = vjs.obj.merge({
wmode: "transparent",
bgcolor: "#000000"
}, t.params), l = vjs.obj.merge({
id: o,
name: o,
"class": "vjs-tech"
}, t.attributes);
r && (a.src = encodeURIComponent(vjs.getAbsoluteURL(r.src))), vjs.insertFirst(s, i), t.startTime && this.ready(function() {
this.load(), this.play(), this.currentTime(t.startTime);
});
if (t.iFrameMode === !0 && !vjs.IS_FIREFOX) {
var c = vjs.createEl("iframe", {
id: o + "_iframe",
name: o + "_iframe",
className: "vjs-tech",
scrolling: "no",
marginWidth: 0,
marginHeight: 0,
frameBorder: 0
});
a.readyFunction = "ready", a.eventProxyFunction = "events", a.errorEventProxyFunction = "errors", vjs.on(c, "load", vjs.bind(this, function() {
var e, n = c.contentWindow;
e = c.contentDocument ? c.contentDocument : c.contentWindow.document, e.write(vjs.Flash.getEmbedCode(t.swf, a, f, l)), n.player = this.player_, n.ready = vjs.bind(this.player_, function(t) {
var n = e.getElementById(t), r = this, i = r.tech;
i.el_ = n, vjs.on(n, "click", i.bind(i.onClick)), vjs.Flash.checkReady(i);
}), n.events = vjs.bind(this.player_, function(e, t) {
var n = this;
n && n.techName === "flash" && n.trigger(t);
}), n.errors = vjs.bind(this.player_, function(e, t) {
vjs.log("Flash Error", t);
});
})), s.parentNode.replaceChild(c, s);
} else vjs.Flash.embed(t.swf, s, a, f, l);
}
}), vjs.Flash.prototype.dispose = function() {
vjs.MediaTechController.prototype.dispose.call(this);
}, vjs.Flash.prototype.play = function() {
this.el_.vjs_play();
}, vjs.Flash.prototype.pause = function() {
this.el_.vjs_pause();
}, vjs.Flash.prototype.src = function(e) {
e = vjs.getAbsoluteURL(e), this.el_.vjs_src(e);
if (this.player_.autoplay()) {
var t = this;
setTimeout(function() {
t.play();
}, 0);
}
}, vjs.Flash.prototype.load = function() {
this.el_.vjs_load();
}, vjs.Flash.prototype.poster = function() {
this.el_.vjs_getProperty("poster");
}, vjs.Flash.prototype.buffered = function() {
return vjs.createTimeRange(0, this.el_.vjs_getProperty("buffered"));
}, vjs.Flash.prototype.supportsFullScreen = function() {
return !1;
}, vjs.Flash.prototype.enterFullScreen = function() {
return !1;
};
var api = vjs.Flash.prototype, readWrite = "preload,currentTime,defaultPlaybackRate,playbackRate,autoplay,loop,mediaGroup,controller,controls,volume,muted,defaultMuted".split(","), readOnly = "error,currentSrc,networkState,readyState,seeking,initialTime,duration,startOffsetTime,paused,played,seekable,ended,videoTracks,audioTracks,videoWidth,videoHeight,textTracks".split(","), createSetter = function(e) {
var t = e.charAt(0).toUpperCase() + e.slice(1);
api["set" + t] = function(t) {
return this.el_.vjs_setProperty(e, t);
};
}, createGetter = function(e) {
api[e] = function() {
return this.el_.vjs_getProperty(e);
};
};
(function() {
var e;
for (e = 0; e < readWrite.length; e++) createGetter(readWrite[e]), createSetter(readWrite[e]);
for (e = 0; e < readOnly.length; e++) createGetter(readOnly[e]);
})(), vjs.Flash.isSupported = function() {
return vjs.Flash.version()[0] >= 10;
}, vjs.Flash.canPlaySource = function(e) {
if (e.type in vjs.Flash.formats) return "maybe";
}, vjs.Flash.formats = {
"video/flv": "FLV",
"video/x-flv": "FLV",
"video/mp4": "MP4",
"video/m4v": "MP4"
}, vjs.Flash.onReady = function(e) {
var t = vjs.el(e), n = t.player || t.parentNode.player, r = n.tech;
t.player = n, r.el_ = t, r.on("click", r.onClick), vjs.Flash.checkReady(r);
}, vjs.Flash.checkReady = function(e) {
e.el().vjs_getProperty ? e.triggerReady() : setTimeout(function() {
vjs.Flash.checkReady(e);
}, 50);
}, vjs.Flash.onEvent = function(e, t) {
var n = vjs.el(e).player;
n.trigger(t);
}, vjs.Flash.onError = function(e, t) {
var n = vjs.el(e).player;
n.trigger("error"), vjs.log("Flash Error", t, e);
}, vjs.Flash.version = function() {
var e = "0,0,0";
try {
e = (new window.ActiveXObject("ShockwaveFlash.ShockwaveFlash")).GetVariable("$version").replace(/\D+/g, ",").match(/^,?(.+),?$/)[1];
} catch (t) {
try {
navigator.mimeTypes["application/x-shockwave-flash"].enabledPlugin && (e = (navigator.plugins["Shockwave Flash 2.0"] || navigator.plugins["Shockwave Flash"]).description.replace(/\D+/g, ",").match(/^,?(.+),?$/)[1]);
} catch (n) {}
}
return e.split(",");
}, vjs.Flash.embed = function(e, t, n, r, i) {
var s = vjs.Flash.getEmbedCode(e, n, r, i), o = vjs.createEl("div", {
innerHTML: s
}).childNodes[0], u = t.parentNode;
t.parentNode.replaceChild(o, t);
var a = u.childNodes[0];
return setTimeout(function() {
a.style.display = "block";
}, 1e3), o;
}, vjs.Flash.getEmbedCode = function(e, t, n, r) {
var i = '<object type="application/x-shockwave-flash"', s = "", o = "", u = "";
return t && vjs.obj.each(t, function(e, t) {
s += e + "=" + t + "&amp;";
}), n = vjs.obj.merge({
movie: e,
flashvars: s,
allowScriptAccess: "always",
allowNetworking: "all"
}, n), vjs.obj.each(n, function(e, t) {
o += '<param name="' + e + '" value="' + t + '" />';
}), r = vjs.obj.merge({
data: e,
width: "100%",
height: "100%"
}, r), vjs.obj.each(r, function(e, t) {
u += e + '="' + t + '" ';
}), i + u + ">" + o + "</object>";
}, vjs.MediaLoader = vjs.Component.extend({
init: function(e, t, n) {
vjs.Component.call(this, e, t, n);
if (!e.options_.sources || e.options_.sources.length === 0) for (var r = 0, i = e.options_.techOrder; r < i.length; r++) {
var s = vjs.capitalize(i[r]), o = window.videojs[s];
if (o && o.isSupported()) {
e.loadTech(s);
break;
}
} else e.src(e.options_.sources);
}
}), vjs.Player.prototype.textTracks_, vjs.Player.prototype.textTracks = function() {
return this.textTracks_ = this.textTracks_ || [], this.textTracks_;
}, vjs.Player.prototype.addTextTrack = function(e, t, n, r) {
var i = this.textTracks_ = this.textTracks_ || [];
r = r || {}, r.kind = e, r.label = t, r.language = n;
var s = vjs.capitalize(e || "subtitles"), o = new window.videojs[s + "Track"](this, r);
return i.push(o), o;
}, vjs.Player.prototype.addTextTracks = function(e) {
var t;
for (var n = 0; n < e.length; n++) t = e[n], this.addTextTrack(t.kind, t.label, t.language, t);
return this;
}, vjs.Player.prototype.showTextTrack = function(e, t) {
var n = this.textTracks_, r = 0, i = n.length, s, o, u;
for (; r < i; r++) s = n[r], s.id() === e ? (s.show(), o = s) : t && s.kind() == t && s.mode() > 0 && s.disable();
return u = o ? o.kind() : t ? t : !1, u && this.trigger(u + "trackchange"), this;
}, vjs.TextTrack = vjs.Component.extend({
init: function(e, t) {
vjs.Component.call(this, e, t), this.id_ = t.id || "vjs_" + t.kind + "_" + t.language + "_" + vjs.guid++, this.src_ = t.src, this.dflt_ = t["default"] || t.dflt, this.title_ = t.title, this.language_ = t.srclang, this.label_ = t.label, this.cues_ = [], this.activeCues_ = [], this.readyState_ = 0, this.mode_ = 0, this.player_.on("fullscreenchange", vjs.bind(this, this.adjustFontSize));
}
}), vjs.TextTrack.prototype.kind_, vjs.TextTrack.prototype.kind = function() {
return this.kind_;
}, vjs.TextTrack.prototype.src_, vjs.TextTrack.prototype.src = function() {
return this.src_;
}, vjs.TextTrack.prototype.dflt_, vjs.TextTrack.prototype.dflt = function() {
return this.dflt_;
}, vjs.TextTrack.prototype.title_, vjs.TextTrack.prototype.title = function() {
return this.title_;
}, vjs.TextTrack.prototype.language_, vjs.TextTrack.prototype.language = function() {
return this.language_;
}, vjs.TextTrack.prototype.label_, vjs.TextTrack.prototype.label = function() {
return this.label_;
}, vjs.TextTrack.prototype.cues_, vjs.TextTrack.prototype.cues = function() {
return this.cues_;
}, vjs.TextTrack.prototype.activeCues_, vjs.TextTrack.prototype.activeCues = function() {
return this.activeCues_;
}, vjs.TextTrack.prototype.readyState_, vjs.TextTrack.prototype.readyState = function() {
return this.readyState_;
}, vjs.TextTrack.prototype.mode_, vjs.TextTrack.prototype.mode = function() {
return this.mode_;
}, vjs.TextTrack.prototype.adjustFontSize = function() {
this.player_.isFullScreen ? this.el_.style.fontSize = screen.width / this.player_.width() * 1.4 * 100 + "%" : this.el_.style.fontSize = "";
}, vjs.TextTrack.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-" + this.kind_ + " vjs-text-track"
});
}, vjs.TextTrack.prototype.show = function() {
this.activate(), this.mode_ = 2, vjs.Component.prototype.show.call(this);
}, vjs.TextTrack.prototype.hide = function() {
this.activate(), this.mode_ = 1, vjs.Component.prototype.hide.call(this);
}, vjs.TextTrack.prototype.disable = function() {
this.mode_ == 2 && this.hide(), this.deactivate(), this.mode_ = 0;
}, vjs.TextTrack.prototype.activate = function() {
this.readyState_ === 0 && this.load(), this.mode_ === 0 && (this.player_.on("timeupdate", vjs.bind(this, this.update, this.id_)), this.player_.on("ended", vjs.bind(this, this.reset, this.id_)), (this.kind_ === "captions" || this.kind_ === "subtitles") && this.player_.getChild("textTrackDisplay").addChild(this));
}, vjs.TextTrack.prototype.deactivate = function() {
this.player_.off("timeupdate", vjs.bind(this, this.update, this.id_)), this.player_.off("ended", vjs.bind(this, this.reset, this.id_)), this.reset(), this.player_.getChild("textTrackDisplay").removeChild(this);
}, vjs.TextTrack.prototype.load = function() {
this.readyState_ === 0 && (this.readyState_ = 1, vjs.get(this.src_, vjs.bind(this, this.parseCues), vjs.bind(this, this.onError)));
}, vjs.TextTrack.prototype.onError = function(e) {
this.error = e, this.readyState_ = 3, this.trigger("error");
}, vjs.TextTrack.prototype.parseCues = function(e) {
var t, n, r, i = e.split("\n"), s = "", o;
for (var u = 1, a = i.length; u < a; u++) {
s = vjs.trim(i[u]);
if (s) {
s.indexOf("-->") == -1 ? (o = s, s = vjs.trim(i[++u])) : o = this.cues_.length, t = {
id: o,
index: this.cues_.length
}, n = s.split(" --> "), t.startTime = this.parseCueTime(n[0]), t.endTime = this.parseCueTime(n[1]), r = [];
while (i[++u] && (s = vjs.trim(i[u]))) r.push(s);
t.text = r.join("<br/>"), this.cues_.push(t);
}
}
this.readyState_ = 2, this.trigger("loaded");
}, vjs.TextTrack.prototype.parseCueTime = function(e) {
var t = e.split(":"), n = 0, r, i, s, o, u;
return t.length == 3 ? (r = t[0], i = t[1], s = t[2]) : (r = 0, i = t[0], s = t[1]), s = s.split(/\s+/), o = s.splice(0, 1)[0], o = o.split(/\.|,/), u = parseFloat(o[1]), o = o[0], n += parseFloat(r) * 3600, n += parseFloat(i) * 60, n += parseFloat(o), u && (n += u / 1e3), n;
}, vjs.TextTrack.prototype.update = function() {
if (this.cues_.length > 0) {
var e = this.player_.currentTime();
if (this.prevChange === undefined || e < this.prevChange || this.nextChange <= e) {
var t = this.cues_, n = this.player_.duration(), r = 0, i = !1, s = [], o, u, a, f;
e >= this.nextChange || this.nextChange === undefined ? f = this.firstActiveIndex !== undefined ? this.firstActiveIndex : 0 : (i = !0, f = this.lastActiveIndex !== undefined ? this.lastActiveIndex : t.length - 1);
for (;;) {
a = t[f];
if (a.endTime <= e) r = Math.max(r, a.endTime), a.active && (a.active = !1); else if (e < a.startTime) {
n = Math.min(n, a.startTime), a.active && (a.active = !1);
if (!i) break;
} else i ? (s.splice(0, 0, a), u === undefined && (u = f), o = f) : (s.push(a), o === undefined && (o = f), u = f), n = Math.min(n, a.endTime), r = Math.max(r, a.startTime), a.active = !0;
if (i) {
if (f === 0) break;
f--;
} else {
if (f === t.length - 1) break;
f++;
}
}
this.activeCues_ = s, this.nextChange = n, this.prevChange = r, this.firstActiveIndex = o, this.lastActiveIndex = u, this.updateDisplay(), this.trigger("cuechange");
}
}
}, vjs.TextTrack.prototype.updateDisplay = function() {
var e = this.activeCues_, t = "", n = 0, r = e.length;
for (; n < r; n++) t += '<span class="vjs-tt-cue">' + e[n].text + "</span>";
this.el_.innerHTML = t;
}, vjs.TextTrack.prototype.reset = function() {
this.nextChange = 0, this.prevChange = this.player_.duration(), this.firstActiveIndex = 0, this.lastActiveIndex = 0;
}, vjs.CaptionsTrack = vjs.TextTrack.extend(), vjs.CaptionsTrack.prototype.kind_ = "captions", vjs.SubtitlesTrack = vjs.TextTrack.extend(), vjs.SubtitlesTrack.prototype.kind_ = "subtitles", vjs.ChaptersTrack = vjs.TextTrack.extend(), vjs.ChaptersTrack.prototype.kind_ = "chapters", vjs.TextTrackDisplay = vjs.Component.extend({
init: function(e, t, n) {
vjs.Component.call(this, e, t, n), e.options_.tracks && e.options_.tracks.length > 0 && this.player_.addTextTracks(e.options_.tracks);
}
}), vjs.TextTrackDisplay.prototype.createEl = function() {
return vjs.Component.prototype.createEl.call(this, "div", {
className: "vjs-text-track-display"
});
}, vjs.TextTrackMenuItem = vjs.MenuItem.extend({
init: function(e, t) {
var n = this.track = t.track;
t.label = n.label(), t.selected = n.dflt(), vjs.MenuItem.call(this, e, t), this.player_.on(n.kind() + "trackchange", vjs.bind(this, this.update));
}
}), vjs.TextTrackMenuItem.prototype.onClick = function() {
vjs.MenuItem.prototype.onClick.call(this), this.player_.showTextTrack(this.track.id_, this.track.kind());
}, vjs.TextTrackMenuItem.prototype.update = function() {
this.selected(this.track.mode() == 2);
}, vjs.OffTextTrackMenuItem = vjs.TextTrackMenuItem.extend({
init: function(e, t) {
t.track = {
kind: function() {
return t.kind;
},
player: e,
label: function() {
return t.kind + " off";
},
dflt: function() {
return !1;
},
mode: function() {
return !1;
}
}, vjs.TextTrackMenuItem.call(this, e, t), this.selected(!0);
}
}), vjs.OffTextTrackMenuItem.prototype.onClick = function() {
vjs.TextTrackMenuItem.prototype.onClick.call(this), this.player_.showTextTrack(this.track.id_, this.track.kind());
}, vjs.OffTextTrackMenuItem.prototype.update = function() {
var e = this.player_.textTracks(), t = 0, n = e.length, r, i = !0;
for (; t < n; t++) r = e[t], r.kind() == this.track.kind() && r.mode() == 2 && (i = !1);
this.selected(i);
}, vjs.TextTrackButton = vjs.MenuButton.extend({
init: function(e, t) {
vjs.MenuButton.call(this, e, t), this.items.length <= 1 && this.hide();
}
}), vjs.TextTrackButton.prototype.createItems = function() {
var e = [], t;
e.push(new vjs.OffTextTrackMenuItem(this.player_, {
kind: this.kind_
}));
for (var n = 0; n < this.player_.textTracks().length; n++) t = this.player_.textTracks()[n], t.kind() === this.kind_ && e.push(new vjs.TextTrackMenuItem(this.player_, {
track: t
}));
return e;
}, vjs.CaptionsButton = vjs.TextTrackButton.extend({
init: function(e, t, n) {
vjs.TextTrackButton.call(this, e, t, n), this.el_.setAttribute("aria-label", "Captions Menu");
}
}), vjs.CaptionsButton.prototype.kind_ = "captions", vjs.CaptionsButton.prototype.buttonText = "Captions", vjs.CaptionsButton.prototype.className = "vjs-captions-button", vjs.SubtitlesButton = vjs.TextTrackButton.extend({
init: function(e, t, n) {
vjs.TextTrackButton.call(this, e, t, n), this.el_.setAttribute("aria-label", "Subtitles Menu");
}
}), vjs.SubtitlesButton.prototype.kind_ = "subtitles", vjs.SubtitlesButton.prototype.buttonText = "Subtitles", vjs.SubtitlesButton.prototype.className = "vjs-subtitles-button", vjs.ChaptersButton = vjs.TextTrackButton.extend({
init: function(e, t, n) {
vjs.TextTrackButton.call(this, e, t, n), this.el_.setAttribute("aria-label", "Chapters Menu");
}
}), vjs.ChaptersButton.prototype.kind_ = "chapters", vjs.ChaptersButton.prototype.buttonText = "Chapters", vjs.ChaptersButton.prototype.className = "vjs-chapters-button", vjs.ChaptersButton.prototype.createItems = function() {
var e = [], t;
for (var n = 0; n < this.player_.textTracks().length; n++) t = this.player_.textTracks()[n], t.kind() === this.kind_ && e.push(new vjs.TextTrackMenuItem(this.player_, {
track: t
}));
return e;
}, vjs.ChaptersButton.prototype.createMenu = function() {
var e = this.player_.textTracks(), t = 0, n = e.length, r, i, s = this.items = [];
for (; t < n; t++) {
r = e[t];
if (r.kind() == this.kind_ && r.dflt()) {
if (r.readyState() < 2) {
this.chaptersTrack = r, r.on("loaded", vjs.bind(this, this.createMenu));
return;
}
i = r;
break;
}
}
var o = this.menu = new vjs.Menu(this.player_);
o.el_.appendChild(vjs.createEl("li", {
className: "vjs-menu-title",
innerHTML: vjs.capitalize(this.kind_),
tabindex: -1
}));
if (i) {
var u = i.cues_, a, f;
t = 0, n = u.length;
for (; t < n; t++) a = u[t], f = new vjs.ChaptersTrackMenuItem(this.player_, {
track: i,
cue: a
}), s.push(f), o.addChild(f);
}
return this.items.length > 0 && this.show(), o;
}, vjs.ChaptersTrackMenuItem = vjs.MenuItem.extend({
init: function(e, t) {
var n = this.track = t.track, r = this.cue = t.cue, i = e.currentTime();
t.label = r.text, t.selected = r.startTime <= i && i < r.endTime, vjs.MenuItem.call(this, e, t), n.on("cuechange", vjs.bind(this, this.update));
}
}), vjs.ChaptersTrackMenuItem.prototype.onClick = function() {
vjs.MenuItem.prototype.onClick.call(this), this.player_.currentTime(this.cue.startTime), this.update(this.cue.startTime);
}, vjs.ChaptersTrackMenuItem.prototype.update = function() {
var e = this.cue, t = this.player_.currentTime();
this.selected(e.startTime <= t && t < e.endTime);
}, vjs.obj.merge(vjs.ControlBar.prototype.options_.children, {
subtitlesButton: {},
captionsButton: {},
chaptersButton: {}
}), vjs.JSON;
if (typeof window.JSON != "undefined" && window.JSON.parse === "function") vjs.JSON = window.JSON; else {
vjs.JSON = {};
var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
vjs.JSON.parse = function(text, reviver) {
function walk(e, t) {
var n, r, i = e[t];
if (i && typeof i == "object") for (n in i) Object.prototype.hasOwnProperty.call(i, n) && (r = walk(i, n), r !== undefined ? i[n] = r : delete i[n]);
return reviver.call(e, t, i);
}
var j;
text = String(text), cx.lastIndex = 0, cx.test(text) && (text = text.replace(cx, function(e) {
return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
}));
if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) return j = eval("(" + text + ")"), typeof reviver == "function" ? walk({
"": j
}, "") : j;
throw new SyntaxError("JSON.parse(): invalid or malformed JSON data");
};
}
return vjs.autoSetup = function() {
var e, t, n, r = document.getElementsByTagName("video");
if (r && r.length > 0) for (var i = 0, s = r.length; i < s; i++) {
t = r[i];
if (!t || !t.getAttribute) {
vjs.autoSetupTimeout(1);
break;
}
t.player === undefined && (e = t.getAttribute("data-setup"), e !== null && (e = vjs.JSON.parse(e || "{}"), n = videojs(t, e)));
} else vjs.windowLoaded || vjs.autoSetupTimeout(1);
}, vjs.autoSetupTimeout = function(e) {
setTimeout(vjs.autoSetup, e);
}, vjs.one(window, "load", function() {
vjs.windowLoaded = !0;
}), vjs.autoSetupTimeout(1), vjs.plugin = function(e, t) {
vjs.Player.prototype[e] = t;
}, videojs;
} catch (e) {
wx.jslog({
src: "biz_web/lib/video.js"
}, e);
}
});define("tpl/top.html.js", [], function(e, t, n) {
return '<ul class="tab_navs title_tab" data-index="{itemIndex=0}">\n    {each data as o index}\n    {if (typeof o.acl == "undefined" || o.acl == 1)}\n    <li data-index="{itemIndex++}" class="tab_nav {if (itemIndex == 1)}first{/if} js_top {o.className}" data-id="{o.id}"><a href="{o.url}" {if o.target==\'_blank\'}target="_blank"{/if}>{o.name}</a></li>\n    {/if}\n    {/each}\n</ul>\n';
});define("cardticket/card_quantity.js",["common/wx/Cgi.js","common/wx/Tips.js","biz_web/ui/checkbox.js","cardticket/common_template_helper.js","tpl/cardticket/card_quantity.html.js","common/wx/tooltips.js","common/wx/tooltipsManager.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),a=t("common/wx/Tips.js"),i=(t("biz_web/ui/checkbox.js"),
t("cardticket/common_template_helper.js")),o=template.compile(t("tpl/cardticket/card_quantity.html.js")),s={
container:"",
quantityChange:$.noop,
max_sku_for_eachcard:1e4,
setquantity:!0
},r=t("common/wx/tooltips.js"),n=t("common/wx/tooltipsManager.js"),c=function(t){
t=$.extend(!0,{},s,t),this.opt=t;
var c=this;
t.data||(t.data={}),$(t.container).on("click",function(s){
function l(i,o){
$(".js_state_quantity",c.tooltip.$dom).hide();
var s=$(".js_state_"+i,c.tooltip.$dom).show(),r=s.attr("isinit");
if(0==i)e.get({
url:"/merchant/cardmoneymgr?action=get_card_price",
data:{
card_id:_
},
success:function(t){
if(0==t.base_resp.ret){
var a=$.parseJSON(t.result_json);
a.items[0].total_coin_balance=t.total_coin_balance,l(1,a.items[0]);
}else e.show(t);
}
});else if(1==i){
var d=o.price,p=o.total_coin_balance;
if(!r){
var m=$(".js_error",s),f=$(".js_total_price",s),h=$(".js_total_price_container",s),y=$(".js_value",s).keyup(function(){
var t=$(this),e=$.trim($(this).val());
if(!/^[0-9]+$/.test(e)||isNaN(e)||0>=e)return m.text("库存必须是不小于1的整数").show().addClass("fail"),
t.focus(),h.hide(),!1;
var a=1e9;
return e>=a?(m.text("库存不能大于10亿").show().addClass("fail"),t.focus(),!1):d*e>p?(m.html('券点余额：%s 余额不足，<a target="_blank" href="%s">去充值</a>'.sprintf(p/100,wx.url("/merchant/cardmoneymgr?action=get_order_flow"))).show().addClass("fail"),
t.focus(),h.show(),f.text(d*e/100),!1):(m.text("券点余额：%s，优先使用免费券点".sprintf(p/100)).show().removeClass("fail"),
h.show(),void f.text(d*e/100));
});
$(".js_confirm",s).click(function(){
var t=$.trim(y.val());
if(!/^[0-9]+$/.test(t)||isNaN(t)||0>=t)return m.text("库存必须是不小于1的整数").show().addClass("fail"),
y.focus(),h.hide(),!1;
var a=1e9;
return t>=a?(m.text("库存不能大于10亿").show().addClass("fail"),y.focus(),!1):d*t>p?(m.html('券点余额：%s 余额不足，<a target="_blank" href="%s">去充值</a>'.sprintf(p/100,wx.url("/merchant/cardmoneymgr?action=get_order_flow"))).show().addClass("fail"),
y.focus(),!1):($(this).btn(!1),t=parseInt(t),void e.get({
url:"/merchant/cardmoneymgr?action=get_card_pay_price",
data:{
card_id:_,
quantity:t
},
success:function(a){
0==a.base_resp.ret?(a.quantity=t,l(2,a)):e.show(a);
}
}));
}),$(".js_cancel",s).click(function(){
c.tooltip.hide(),n.removeAll(),c.tooltip=null;
});
}
s.find(".js_price").text(o.price/100);
}else if(2==i){
if(!r){
var v=!1;
$(".js_confirm",s).click(function(){
v||($(this).btn(!1),v=!0,e.post({
url:"/merchant/cardmoneymgr?action=confirm_card_coin_pay",
data:{
card_id:_,
quantity:o.quantity,
free_coin:o.free_coin,
pay_coin:o.pay_coin,
order_id:o.order_id,
price:o.price
},
complete:function(){
v=!1;
},
success:function(t){
$(this).btn(!0),0==t.base_resp.ret?(t.addquantity=o.quantity,u.pay_info.is_swipe_card?l(9,t):l(3,t)):26==t.base_resp.ret?(t.is_fail=!1,
l(4,t)):10039==t.base_resp.ret||76==t.base_resp.ret?l(8,t):(t.is_fail=!0,l(4,t));
}
}));
}),$(".js_cancel",s).click(function(){
c.tooltip.hide(),n.removeAll(),c.tooltip=null;
});
}
s.find(".js_price").text(o.price/100),s.find(".js_quantity").text(o.quantity),s.find(".js_freecoin").text(o.free_coin/100),
s.find(".js_paycoin").text(o.pay_coin/100);
}else if(3==i||9==i){
r||$(".js_close_quantity",s).click(function(){
n.removeAll();
});
var x=o.addquantity;
s.find(".js_quantity").text(x),a.suc("设置库存成功"),setTimeout(function(){
3==i&&n.removeAll();
},1500),t.quantityChange&&t.quantityChange.call(c,_,x);
}else 4==i||7==i||8==i?(r||$(".js_close_quantity",s).click(function(){
n.removeAll();
}),8==i&&$(".js_quantity_exceed_msg h4",s).text(t.max_sku_for_eachcard>0?" 子商户每张券累计只可发放%s份 ".sprintf(t.max_sku_for_eachcard):" 账号违规，不能改动库存，详请查看通知中心 ")):5==i?r||$(".js_go_activate",s).click(function(){
n.removeAll(),location.href=wx.url("/merchant/cardstat?action=overviewpage");
}):6==i&&e.get({
url:"/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
},function(t){
0==t.base_resp.ret?l(1==t.is_acct_open?0:5):e.handleRet(t,{
id:64463,
key:25,
url:"/merchant/cardmoneymgr?action=check_is_card_money_acct_open"
});
});
s.attr("isinit",1);
}
var d,_=$(this).data("cid");
if(t.before&&t.before(_)===!1)return!1;
var u=t.data;
if(t.cache_card&&(u=t.cache_card[_]),u.is_sns_card&&3!=u.status&&5!=u.status&&6!=u.status)return a.err("审核中的朋友的券无法修改库存"),
!1;
if(u.is_sns_card){
if(c.tooltip=new r({
container:this,
content:o({
setquantity:t.setquantity,
data:u
}),
container_mode:t.mode||"absolute",
reposition:!0,
type:"click",
onclose:function(t){
if(t){
for(var e=this.$dom.get(0),a=t.target,i=!1;a&&a!==document.body;){
if(a==e){
i=!0;
break;
}
a=a.parentNode;
}
i?this.show():this.hide();
}
}
}),l(6),c.tooltip.show(),n.removeAll(),n.add(c.tooltip),$(".popover").css({
"z-index":"10000",
width:"326px"
}),"fixed"==t.mode){
var p=parseInt(c.tooltip.$dom.css("top"))||0;
c.tooltip.$dom.css("top",p-($(document.body).scrollTop()||0));
}
s.stopPropagation();
}else{
var m=new r({
container:this,
content:o({
setquantity:t.setquantity,
data:u
}),
container_mode:t.mode||"absolute",
type:"click",
reposition:!0,
onclose:function(t){
if(t){
for(var e=this.$dom.get(0),a=t.target,i=!1;a&&a!==document.body;){
if(a==e){
i=!0;
break;
}
a=a.parentNode;
}
i?this.show():this.hide();
}
},
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
var o=m.$dom,s=o.find(".js_value"),r=parseInt($.trim(s.val()));
if(isNaN(r)||0>=r)return a.err("库存必须是不能小于1的整数"),!1;
var l=1e9;
return r>=l?(a.err("库存不能大于10亿"),s.focus(),!1):void e.post({
url:"/merchant/electroniccardmgr",
data:{
action:t.setquantity?"modifyquantity":"setquantity",
card_id:_,
value:r,
isadd:d.value()
}
},function(o){
if(0==o.base_resp.ret)a.suc("设置库存成功"),n.removeAll(),t.quantityChange&&t.quantityChange.call(c,_,!t.setquantity||d.value()?r:-r);else if(10039==o.base_resp.ret||76==o.base_resp.ret){
var s=$.parseJSON(o.biz_quota_json),l=i.parse_assistsend_quota(s.quota_list);
a.err(l.max_sku>0?"子商户每张券累计只可发放%s份".sprintf(l.max_sku):"账号违规，不能改动库存，详请查看通知中心");
}else 1e4==o.base_resp.ret?a.err("库存不能小于0"):e.show(o);
});
}
},{
text:"取消",
type:"btn_default",
click:function(){
n.removeAll();
}
}]
});
if(m.show(),n.removeAll(),n.add(m),$(".popover").css({
"z-index":"10000",
width:"326px"
}),d=m.$dom.find(".js_quantity_type").checkbox(),m.$dom.find(".js_value").focus(),
"fixed"==t.mode){
var p=parseInt(m.$dom.css("top"))||0;
m.$dom.css("top",p-($(document.body).scrollTop()||0));
}
s.stopPropagation();
}
window.report_click_ele&&window.report_click_ele(this);
});
};
return c;
});define("tpl/cardticket/card_preview.html.js",[],function(){
return'<div class="pop_card_preview js_pop_card_preview">\n	<span class="hook hook_right_top js_arrow">\n	<!--\n		箭头位置 \n		hook_right_top      右偏上\n		\n	-->\n		<span class="hook_top"></span>\n		<span class="hook_btm"></span>\n	</span>\n	<div class="card_preview">\n		<div class="client_side">\n			<div class="banner">{convert_type card.type}</div>\n			<div class="wrp">\n				<div class="top" style="background-color: {card.color};border-bottom-color: {card.color};">\n					<div class="logo group">\n						<div class="avartar l"><img src="{http2https card.logo_url}"></div>\n						<p>{card.brand_name}</p>\n					</div>\n					<div class="msg">\n						<div class="main_msg">\n							<p>{card.title}</p>\n							<p class="title_sub">{card.sub_title}</p>\n						</div>\n						<p class="time">有效期 {validtime card \'YYYY-MM-DD\'}</p>\n					</div>\n					<div class="deco"></div>\n				</div>\n				<div class="wrp_content">\n					<div class="wrp_section section_dispose">\n						{if card.code_type==0}\n							<div class="main_msg sn">1513-2290-1878</div>\n						{else if card.code_type==1}\n							<div class="bar_code_panel">\n								<div class="main_msg bar_code"></div>\n								<p class="sn">1513-2290-1878</p>\n							</div>\n						{else if card.code_type==2}\n							<div class="qr_code_panel">\n								<div class="main_msg qr_code"></div>\n								<p class="sn">1513-2290-1878</p>\n							</div>\n						{/if}\n						<p>{card.notice}</p>\n					</div>\n					<div class="wrp_section">\n						<ul class="info_list">\n							<li class="info_li">\n								<p class="info">{convert_type card.type}详情</p>\n								<span class="supply_area"><i class="ic ic_go"></i></span>\n							</li>\n							<li class="info_li">\n								<p class="info">适用门店</p>\n								<span class="supply_area">{card.location_id_list.length}家<i class="ic ic_go"></i></span>\n							</li>\n						</ul>\n					</div>\n				</div>\n			</div>\n		</div>\n	</div>\n</div>';
});define("tpl/cardticket/card_table.html.js",[],function(){
return'<div class="release_method js_card_container send_card">\n	{if loading}\n	<div class="loading"><i class="icon_loading_small white">loading...</i></div>\n	{else}\n	<div class="sub_title_bar group">\n		{if sns_card_type==2}<a href="javascript:void(0);" class="js_add_card_link r btn btn_primary">新建朋友的券 </a>{/if}\n		<!-- <span class="frm_input_box search append">\n			<a href="javascript:void(0);" class="js_search frm_input_append">\n				<i class="icon16_common search_gray">搜索</i>\n				&nbsp;\n			</a>\n			<input type="text" placeholder="请输入卡券名称" class="frm_input js_keyword">\n		</span>  -->\n	</div>\n	<div class="table_wrp release_method_select_table_wrp">\n		<table class="table" cellspacing="0">\n			<thead class="thead">\n				<tr>\n					<th class="table_cell release_method_select_box">&nbsp;</th>\n					{if view_mode==2}\n					<th class="table_cell">商户名</th>\n					{/if}\n					<th class="table_cell release_method_kind"><div class="td_panel">卡券类型</div></th>\n					<th class="table_cell release_method_name"><div class="td_panel"><div class="js_filter_tag">卡券名称</div></div></th>\n					{if !hide_valid_date}\n					<th class="table_cell release_method_time"><div class="td_panel">卡券有效期</div></th>\n					{/if}\n					<th class="table_cell release_method_stock"><div class="td_panel">库存</div></th>\n					{if (payflag==1||payflag==2) && sns_card_type!=2}<th class="table_cell release_method_price"><div class="td_panel">微信价(元)</div></th>{/if}\n					<!-- <th class="table_cell release_method_preview"><div class="td_panel">预览</div></th> -->\n					<th class="table_cell release_method_state"><div class="td_panel">卡券状态</div></th>\n				</tr>\n			</thead>\n			<tbody class="tbody">\n			{if !data.length}\n				<tr>\n					<td class="empty_tips" colspan="6">暂无卡券</td>\n				</tr>\n			{else}\n			{each data as card i}\n            <tr  class="{if hasdata && (i<pageInfo.begin||i>=pageInfo.begin+pageInfo.count)}dn{/if}{if (sns_card_type==2 && !card.is_sns_card) || (sns_card_type==1 && card.is_sns_card) || card.is_sub_merchant_disabled} disabled_item{/if}" id="js_ct_tr_{card.id}">\n					<td class="table_cell release_method_select_box"><div class="td_panel">\n						{if !multi}\n						<label class="frm_radio_label">\n							<i class="icon_radio"></i>\n							<input type="radio" data-id="{card.id}" value="{card.id}" class="frm_radio js_select{if sns_card_type}{if card.is_sns_card} js_select_disabled_1{else} js_select_disabled_2{/if}{/if}">\n						</label>\n						{else}\n						<label class="frm_checkbox_label">\n							<i class="icon_checkbox"></i>\n							<input type="checkbox" data-id="{card.id}" value="{card.id}" class="frm_checkbox js_select{if sns_card_type}{if card.is_sns_card} js_select_disabled_1{else} js_select_disabled_2{/if}{/if}">\n						</label>\n						{/if}\n					</div></td>\n					{if view_mode==2}\n					<td class="table_cell release_method_kind"><div class="td_panel">{card.brand_name}</div></td>\n					{/if}\n					<td class="table_cell release_method_kind"><div class="td_panel">{convert_type card.type}</div></td>\n					<td class="table_cell release_method_name"><div class="td_panel">{card.title}{if card.is_sns_card}<i class="ic_social">共享</i>{/if}{if card.is_intercomm}<i class="icon18 ic_intercomm"></i>{/if}</div></td>\n					{if !hide_valid_date}\n					<td class="table_cell release_method_time"><div class="td_panel">{validtime card \'YYYY-MM-DD\'}</div></td>\n					{/if}\n					<td class="table_cell release_method_stock"><div class="td_panel"><span class="js_sendcard_quantity{if card.quantity==0} text_weak{/if}">{card.quantity}</span>\n						{if editquantity && !card.is_from_intercomm && card.can_edit_quantity}<a class="icon14_common edit_gray js_modify_quantity" href="javascript:;" data-new="{if card.isnew}1{/if}" data-cid="{card.id}" data-x="-161" title="修改库存"></a>{else}<span class="w20"></span>{/if}</div>\n					</td>\n					{if (payflag==1||payflag==2) && sns_card_type!=2}<td class="table_cell release_method_price"><div class="td_panel">{if card.ispay}{card.price}{else}--{/if}</div></td>{/if}\n					<!-- <td class="table_cell release_method_preview"><div class="td_panel"><a data-cid="{card.id}" data-x="-125" class="js_card_preview" href="javascript:void(0);">预览</a></div></td> -->\n					<td class="table_cell release_method_state"><div class="td_panel"><span class="fail pass"><i></i>{convert_state card.status}</span></div></td></td>\n				</tr>\n			{/each}\n			{/if}\n			</tbody>\n		</table>\n		{if !hide_tips}\n		{if sns_card_type==1}<div class="mini_tips l">只能投放普通券</div>{else if sns_card_type==2}<div class="mini_tips l">{if use_scene==2}只能投放商户的其它可共享优惠券{else}只能投放可共享优惠券{/if}</div>{/if}\n		{/if}\n        <div class="js_pager"></div>\n        {if multi}\n        <p class="dialog_bt_tip">已选<span class="js_selectcount">{defaultValues.length||0}</span>个</p>\n        {/if}\n	</div>\n	{/if}\n</div>\n';
});define("cardticket/create_card_select.js",["biz_web/ui/checkbox.js","common/wx/Tips.js","common/wx/popup.js","common/wx/dialog.js","cardticket/select_sub_merchant_table.js","cardticket/common_template_helper.js","tpl/cardticket/choose_card_type.html.js","common/wx/Step.js"],function(e){
"use strict";
function t(e){
return 1==window.view_mode&&(1==c||2==c)||2==window.view_mode&&e&&h.can_category_use_sns_card(e.PrimaryCategoryId,e.SecondaryCategoryId);
}
function i(e,t){
var i=$(e.step2container).html(f({
flag:e.ispay,
is_sns_card:e.is_sns_card,
show_all_card:e.show_all_card,
view_mode:window.view_mode
})),n=$(".frm_tab").height();
$(".js_is_friend_type_1 .js_card_type",i).checkbox({
onChanged:function(e){
t.card_type1=$(e).val();
var s=$(e).attr("data-not_has_condition");
t.has_condition=1==s?!1:!0;
var o=$(".frm_tab .selected",i).index(),_=0-o*n;
$(".tab_items",i).css("top",_);
}
}),$(".js_is_friend_type_2 .js_card_type",i).checkbox({
onChanged:function(e){
t.card_type2=$(e).val();
var i=$(e).attr("data-not_has_condition");
t.has_condition=1==i?!1:!0;
}
}),i.find(".js_is_friend").checkbox({
onChanged:function(e){
$(".js_is_friend_type",i).hide(),$(".js_is_friend_type_"+$(e).val(),i).show(),1==$(e).val()?(t.is_friend=!0,
setTimeout(function(){
n=$(".frm_tab",i).height();
var e=$(".js_is_friend_type_1 .frm_radio_label",i).length;
$(".choose_card_type,.frm_tab_item",i).css("height",n),$(".tab_items",i).css("height",n*e);
})):t.is_friend=!1,$(".js_is_friend_type_"+$(e).val(),i).find(".js_card_type:checked").click(),
t.$popup.popup("resetPosition");
}
}),"undefined"!=typeof c&&_(e,t,i);
}
function n(e,i){
var n=$(m()).popup({
title:"创建优惠券",
autoShow:!1,
width:956,
buttons:[{
text:"取消",
type:"default",
click:function(){
this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
var e=i.merchantSelector.selectedValue();
e&&(i.merchant_data=e,o(i));
}
},{
text:"上一步",
type:"default",
click:function(){
s(i);
}
},{
text:"确定",
type:"primary",
click:function(){
return i.is_friend&&"undefined"==typeof c?!0:(i.is_friend&&!t(i.merchant_data)&&(p.show({
msg:'本公众号子商户类目不支持制作朋友的券|<a href="https://mp.weixin.qq.com/cgi-bin/readtemplate?t=cardticket/faq_tmpl&type=info&lang=zh_CN#1dot1" target="_blank">查看朋友的券类目开放范围</a>',
type:"info",
buttons:[{
text:"取消",
click:function(e){
this.remove(e);
},
type:"normal"
},{
text:"配置子商户",
click:function(e){
window.open(wx.url("/merchant/cardhelpmakesend?action=list")),this.remove(e);
},
type:"primary"
}]
}),this.hide()),i.is_friend&&i.card_type1||!i.is_friend&&i.card_type2?(window.open(wx.url("/merchant/electroniccardmgr?action=%s&type=%s&flag=%s&is_sns_card=%s&has_condition=%s%s".sprintf(i.is_friend?"addsnspage":"addpage",i.is_friend?i.card_type1:i.card_type2,1==e.ispay?1:"0",i.is_friend?1:"0",i.has_condition?1:"0",i.merchant_data?"&sub_merchant_id="+i.merchant_data.Id:""))),
void this.hide()):void d.err("请选择卡券类型"));
}
}],
onHide:function(){
e.onHide&&e.onHide.call(i),this.remove();
},
className:"align_edge"
});
i.$popup=n,i.step=new l({
container:n.find(".js_step_container"),
names:["1 选择代制的子商户","2 选择券类型"]
}),i.$popup.popup("show");
var _=n.popup("get").find(".js_step_content");
i.opt.step2container=_[1],i.opt.container=$(_[0]).find(".js_sub_merchant_list");
}
function s(e){
var t=e.$popup,i=t.popup("get").find(".js_step_content"),n=t.popup("get").find(".js_btn_p");
$(n[0]).show(),$(n[1]).show(),$(n[2]).hide(),$(n[3]).hide(),e.step.go(1),$(i[0]).show(),
$(i[1]).hide(),t.popup("resetPosition");
}
function o(e){
var t=e.$popup,n=t.popup("get").find(".js_step_content"),s=t.popup("get").find(".js_btn_p");
$(s[0]).hide(),$(s[1]).hide(),$(s[2]).show(),$(s[3]).show(),$(n[0]).hide(),$(n[1]).show(),
e.step.go(2),e.opt.merchant_data=e.merchant_data,i(e.opt,e),t.popup("resetPosition");
}
function _(e,i,n){
$(".js_is_friend_tips",n).hide(),!t(i.merchant_data)&&e.show_all_card?($(n.find(".js_is_friend")[1]).click(),
$(n.find(".js_is_friend")[0]).checkbox().disabled(!0),$(".js_is_friend_view_mode"+(window.view_mode||1)+"_tips",n).show()):($(n.find(".js_is_friend")[0]).checkbox().disabled(!1),
$(n.find(".js_is_friend")[0]).click(),$(".js_is_friend_support_tips",n).show());
}
function a(e){
var t=this;
this.opt=e,n(e,t);
var i=t.$popup.popup("get");
if(1==window.view_mode){
o(t);
var i=t.$popup.popup("get");
i.find(".js_step_container").hide();
var a=i.find(".js_btn_p");
$(a[2]).hide();
}else s(t);
var d={
resetPosition:function(){
t.$popup.popup("resetPosition");
},
getDataComplete:function(e){
var i=t.$popup.popup("get");
e&&e.length?$(i.find(".js_btn_p")[0]).removeClass("btn_disabled"):$(i.find(".js_btn_p")[0]).addClass("btn_disabled");
},
container:e.container,
is_sns_card:!1,
max_card:e.max_card
};
t.merchantSelector=new r(d),"undefined"==typeof c&&h.check_assist_brand_name_type(function(n){
c=n,_(e,t,i);
});
}
var c,d=(e("biz_web/ui/checkbox.js"),e("common/wx/Tips.js")),p=(e("common/wx/popup.js"),
e("common/wx/dialog.js")),r=e("cardticket/select_sub_merchant_table.js"),h=e("cardticket/common_template_helper.js"),f=template.compile(e("tpl/cardticket/choose_card_type.html.js")),m=template.compile('<div>			<div class="wrp_processor js_step_container"></div>			<div class="first_step js_step_content js_step1">				<div class="js_sub_merchant_list select_subshop"></div>			</div>			<div class="second_step js_step_content js_step2"></div>			</div>'),l=e("common/wx/Step.js");
return window.view_mode||(window.view_mode=1),a;
});define("cardticket/common_template_helper.js",["common/wx/upload.js","common/wx/Cgi.js","biz_common/moment.js","cardticket/add/msg_operate_type_html.js"],function(e){
"use strict";
function t(e){
for(var t,r,n,a,_=[],i=0;i<e.length;i++){
var s=e[i];
"object"==typeof s&&(s=d[s.type]),a=h[s],s?i==e.length-1?n&&s-n!=1?(_.push(t+(r?"至"+r:"")),
_.push(a)):_.push(t?t+"至"+a:a):n&&s-n!=1?(_.push(t+(r?"至"+r:"")),t=a,r="",n=s):(t?r=a:t=a,
n=s):(s=8,i==e.length-1&&t&&_.push(t+"至"+r),_.push(a),t=r=n="");
}
return _.join("、");
}
function r(e){
return e.replace(/\r\n|\\n|\n/g,"<br/>");
}
function n(e){
var t="YYYY-MM-DD HH:mm:ss",r=l(e,t);
return r?r.format("YYYY-MM-DD"):"";
}
function a(e){
return 1==e||3==e||2==e;
}
function _(e,t){
return 1==e&&119>=t?!0:(2!=e||215!=t&&210!=t&&208!=t&&207!=t&&206!=t&&204!=t&&203!=t&&211!=t&&201!=t&&202!=t)&&(3!=e||308!=t&&309!=t&&306!=t&&305!=t&&304!=t&&303!=t&&314!=t&&316!=t&&317!=t)&&(6!=e||601!=t&&602!=t&&603!=t)?4==e&&402==t?!0:7==e&&701==t?!0:(5!=e||501!=t&&502!=t&&503!=t)&&(8!=e||812!=t&&811!=t&&808!=t&&817!=t&&818!=t&&827!=t&&804!=t&&803!=t&&802!=t&&801!=t&&824!=t&&822!=t&&823!=t&&821!=t&&828!=t&&814!=t&&825!=t&&826!=t&&809!=t&&807!=t&&816!=t&&819!=t&&813!=t)?!1:!0:!0;
}
function i(e){
for(var t=0;t<M.length;t++){
var r=M[t];
"function"!=typeof r&&(r=$.noop),r(e);
}
M=[];
}
function s(e){
return M.push(e),"undefined"!=typeof I?(i(I),!0):U?!1:(U=!0,u.get({
url:"/merchant/cardhelpmakesend",
data:{
action:"list",
begin:0,
count:9999999,
status_list:1
},
complete:function(){
U=!1;
}
},function(e){
if(0==e.base_resp.ret||-1==e.base_resp.ret){
for(var t=$.parseJSON(e.bind_list),r=t.List,n=!1,a=!1,s=0;s<r.length;s++){
var o=r[s];
if(_(o.PrimaryCategoryId,o.SecondaryCategoryId)){
a=!0;
break;
}
}
e.attr&&e.attr.merchant_info&&(n=_(e.attr.merchant_info.primary_category_id,e.attr.merchant_info.secondary_category_id)),
n&&a&&(I=1),n&&!a&&(I=2),!n&&a&&(I=3),n||a||(I=4),4==I&&e.is_can_use_sns_card&&!e.is_can_use_help_make_and_send&&(I=5),
i(I);
}
}),!1);
}
function o(e,t){
var r=!1;
e.create_time&&e.create_time<1463648400&&(r=!0),"undefined"==typeof t&&(t=!0);
var n="",a=!1;
return 4==e.type||2==e.type?(t&&e.reduce_cost&&(n="价值%s元代金券一张".sprintf(e.reduce_cost)),
r?n:(e.use_condition_least_cost?(n&&(n+="，"),n+="消费满%s元可用".sprintf(e.use_condition_least_cost)):4!=e.type||"1"!=e.is_sns_card&&e.is_sns_card!==!0||(n&&(n+="；"),
n+="无最低消费限制"),e.accept_category&&(n&&(n+="；"),n+="适用于%s".sprintf(e.accept_category),
a=!0),e.reject_category&&(n&&(n+="；"),n+="不适用于%s".sprintf(e.reject_category),a=!0),
"1"!=e.is_sns_card&&e.is_sns_card!==!0||4!=e.type||a||(n&&(n+="；"),n+="全场通用，不限品类"),
!(4!=e.type||"1"!=e.is_sns_card&&e.is_sns_card!==!0||e.has_condition||"0"!=e.uncheckcount&&!e.id),
n)):3==e.type?(t&&(e.title||e.gift_title)&&(n="%s%s%s%s".sprintf("1"==e.is_sns_card||e.is_sns_card===!0?"兑换":"",e.gift_title||e.title,e.gift_num||"",e.gift_unit||"")),
r?n:(2==e.use_condition_least_cost_type&&e.object_use_for&&(n&&(n+="；"),n+="购买%s可用".sprintf(e.object_use_for),
a=!0),1==e.use_condition_least_cost_type&&e.use_condition_least_cost&&(n&&(n+="，"),
n+="消费满%s元可用".sprintf(e.use_condition_least_cost),a=!0),"1"!=e.is_sns_card&&e.is_sns_card!==!0||a||(n&&(n+="；"),
n+="无最低消费限制"),n)):void 0;
}
function c(e){
if(!e.begin_time||!e.end_time)return"";
var t="YYYY.MM.DD";
return l.unix(e.begin_time).format(t)+"-"+l.unix(e.end_time).format(t);
}
var p=e("common/wx/upload.js"),u=e("common/wx/Cgi.js"),l=e("biz_common/moment.js"),m={
10:"会员卡",
21:"门票",
22:"电影票",
4:"代金券",
1:"团购券",
2:"折扣券",
3:"兑换券",
0:"优惠券"
},f={
1:"审核中",
2:"未通过",
3:"待投放",
4:"已删除",
5:"待投放",
6:"已投放",
8:"已过期",
7:"违规下架"
},d={
MONDAY:"1",
TUESDAY:"2",
WEDNESDAY:"3",
THURSDAY:"4",
FRIDAY:"5",
SATURDAY:"6",
SUNDAY:"7"
};
template.helper("$has_day",function(e,t){
if(!e)return"";
for(var r=0;r<e.length;r++){
var n=d[e[r].type];
if(n||(n=8),n==t)return"checked";
}
return"";
});
var h={
1:"周一",
2:"周二",
3:"周三",
4:"周四",
5:"周五",
6:"周六",
7:"周日",
8:"节假日"
};
template.helper("convert_time_limit",function(e){
return t(e);
});
var v={
1:"免费WIFI",
2:"可带宠物",
4:"免费停车",
8:"可外卖"
};
template.helper("convert_business_service",function(e){
if(!e)return"无";
var t=[];
for(var r in v){
var n=parseInt(r);
(e&n)>0&&t.push(v[r]);
}
return t.join("&nbsp;&nbsp;");
});
var l=e("biz_common/moment.js");
template.helper("convert_state",function(e){
return f[e]||e;
}),template.helper("convert_type",function(e){
return m[e]||e;
}),template.helper("card_type_map",function(e){
return e;
}),template.helper("unixFormat",function(e,t){
return t&&(t=t.replace(","," ")),l.unix(e).format(t);
}),template.helper("validtime",function(e,t){
if(1==e.time_type){
var r=l.unix(e.begin_time).format(t)+"至"+l.unix(e.end_time).format(t);
return e.end_time<l().unix()&&(r+="(已过期)"),r;
}
return 2==e.time_type?(e.from_day=0==e.from_day?"当":e.from_day,"领取后{from_day}天生效{fixed_term}天有效".format(e)):"";
}),template.helper("addtoken",function(e){
return wx.url(e);
}),template.helper("nl2br",function(e){
return r(e.html(!0));
});
var g={
1:"50万以下",
2:"50-100万",
3:"100-500万",
4:"500-1000万",
5:"1000万以上"
};
template.helper("convert_business_volume_type",function(e){
return g[e]||e;
});
var y={
0:"已提交",
2:"已提交",
3:"生效",
4:"不通过"
};
template.helper("convert_store_state",function(e){
return y[e]||e;
}),template.helper("$preview",function(e){
if(!e)return"无";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=p.tmpFileUrl(e)):t=p.multimediaFileUrl(e),
"<a href='%s' target='_blank'><img src='%s' /></a>".sprintf(t,t);
}),template.helper("$upload_preview",function(e){
if(!e)return"";
var t;
return 0===e.indexOf("temp_")?(e=e.replace(/^temp_/,""),t=p.tmpFileUrl(e)):t=p.multimediaFileUrl(e),
"<img src='%s' style='width:260px;' />".sprintf(t);
}),template.helper("$preview_stuffs",function(e){
for(var t=[],r=e.stuffs,n=0;n<r.length;n++){
var a=r[n]+"_preview_tpl";
$("#"+a).length&&t.push(template.render(a,e));
}
return t.join("");
});
var x={
2:"女",
1:"男"
};
template.helper("convert_gender",function(e){
return x[e]||"未知";
}),template.helper("percentage",function(e,t,r,n){
var r=e/t*100;
return n&&r>n&&(r=n),r.toFixed(2);
});
var b={
"":"全部",
0:"API渠道",
1:"嵌入图文消息",
2:"直接群发卡券",
3:"下载二维码"
};
template.helper("convert_channel",function(e){
return b[e]||e;
}),template.helper("convert_provide_time",n),template.helper("http2https",function(e){
return e?(e+"").http2https():"";
}),template.helper("https2http",function(e){
return e?(e+"").https2http():"";
}),template.helper("codepad",function(e){
var t=new RegExp("([^s]{4})(?=([^s])+$)","ig");
return e.replace(t,"$1-");
}),template.helper("yuan",function(e){
if(!e)return"--";
var e=e/100;
return e.toFixed(2);
}),template.helper("is_paycard",function(){
return window.wx_is_paycard;
});
var w={
0:"等待接收",
1:"已接收",
3:"过期退回",
2:"已拒绝"
},j={
0:"等待接收",
2:"已拒绝",
1:"已接收",
3:"过期退回"
};
template.helper("convert_intercard_status",function(e){
return w[e]||e;
}),template.helper("convert_intercard_rec_status",function(e){
return j[e]||e;
});
var Y={
0:"无",
1:"图文消息",
2:"卡券货架",
3:"小店货架",
4:"网页链接",
5:"卡券"
};
template.helper("convert_msg_operate_type",function(e){
return Y[e]||"无";
});
var k=e("cardticket/add/msg_operate_type_html.js"),u=e("common/wx/Cgi.js");
template.helper("msg_operate_content",function(e){
return 5===e._type?"":e._notexist?"无":template.compile(k[e._type])({
msg_operation:e
})||"";
});
var D={
CHECKING:"审核中",
APPROVED:"已通过",
REJECTED:"未通过",
EXPIRED:"已过期"
};
template.helper("convert_sub_merchant_status",function(e){
return D[e]||e;
}),template.helper("$is_can_use_help_make_and_send",function(){
return 1==window.wx_is_can_use_help_make_and_send;
}),template.helper("wx_url",function(e){
return wx.url(e);
});
var A={
".*?_4":"激活"
};
template.helper("convert_use_source",function(e,t){
var r=e+"_"+t;
return 4==t?"激活":1==t||6==t||7==t?"自助买单":5==t?"自助核销":2==t?"收款":3==e?"手机核销":1==e?"网页核销":2==e?"API核销":3==t?"积分变更":A[r]||"";
}),template.helper("convert_fee_coin",function(e,t){
return 0==t?"--":a(e)?'<span class="number_add">+%s</span>'.sprintf(t/100):'<span class="number_degress">-%s</span>'.sprintf(t/100);
});
var E={
1:"平台赠送",
2:"充值",
3:"退还券点",
4:"支出",
5:"平台扣减"
};
template.helper("convert_fee_order_type",function(e){
return E[e]||e;
});
var F={
2:{
1:"等待确认",
2:"充值成功",
3:"充值成功",
8:"充值成功"
},
3:"已退券点",
4:{
1:"等待确认",
3:"库存发放中",
4:"库存已发放",
7:"库存添加失败, 已返还券点",
6:"库存已发放",
5:"库存已发放"
}
};
template.helper("convert_fee_order_status",function(e,t){
var r=F[t];
return r?"string"==typeof r?r:r[e]||e:e;
}),template.helper("addhttp",function(e){
return/^http:\/\//.test(e)?e:"http://"+e;
});
var I,C=[],U=!1,M=[];
template.helper("$fix_abstract4friendcard",function(e,t){
return o(e,t);
}),template.helper("$gen_use_time",function(e){
return c(e);
});
var R={
0:"生效",
1:"已使用",
2:"过期",
3:"转赠中",
4:"已转赠",
5:"转赠过期",
6:"已删除"
};
template.helper("convert_user_card_state",function(e){
return R[e]||e;
});
var S={
0:"审核通过",
1:"待商户审核",
2:"审核不通过",
3:"待激活",
4:"请添加库存"
};
return template.helper("convert_swipe_card_status",function(e){
return S[e]||e;
}),{
type_map:m,
status_map:f,
store_status:y,
gender_map:x,
source_map:b,
convert_provide_time:n,
nl2br:r,
sub_merchant_status_map:D,
fix_money:function(e){
var t=/(\.\d{2}).+$/,r=e;
return r=parseFloat((r+"").replace(t,"$1"));
},
parse_assistsend_quota:function(e,t){
for(var r=0,n=0,a=0;a<e.length;a++){
var _=e[a];
_.quota_name==(t||"merchant_auth_create_card")&&(r=_.value),_.quota_name==(t?t+"_max_sku":"merchant_auth_create_card_max_sku")&&(n=_.value);
}
return{
max_card:r,
max_sku:n
};
},
check_friend_card_word:function(e,t){
if(!e)return!0;
for(var r=0;r<C.length;r++)if(e.indexOf(C[r])>=0)return t?t():!0;
return!0;
},
check_assist_brand_name_type:s,
can_category_use_sns_card:_,
fix_abstract4friendcard:o,
strlen:function(e){
for(var t=0,r=0;r<e.length;r++){
var n=e.charCodeAt(r);
128>n?t++:t+=2;
}
return t;
},
gen_use_time:c,
gen_time_limit:t
};
});define("cardticket/store_cgi.js",["common/wx/Cgi.js","common/wx/Tips.js","common/wx/tooltips.js","common/wx/tooltipsManager.js","common/wx/dialog.js"],function(t){
"use strict";
var e=t("common/wx/Cgi.js"),s=t("common/wx/Tips.js"),o=t("common/wx/tooltips.js"),n=t("common/wx/tooltipsManager.js"),c=(t("common/wx/dialog.js"),
{
deleteStore:function(t){
e.post({
url:"/merchant/entityshop?action=delete",
data:{
id:t.store_id
},
btn:t.btn
},function(o){
0==o.base_resp.ret?(s.suc("删除门店成功"),t.success&&t.success()):e.show(o);
});
},
deleteWithConfirm:function(t){
if(3==t.state||4==t.state){
var e=new o({
container:t.container,
content:"删除将影响在用此门店的卡券功能、微信连Wi-Fi、摇一摇周边、LBS广告等相关业务。<br />你确定要删除吗？",
type:"click",
buttons:[{
text:"确定",
type:"btn_primary",
click:function(){
if(t.success){
var e=t.success;
t.success=function(){
e&&e(),n.removeAll();
};
}
c.deleteStore(t);
}
},{
text:"取消",
type:"btn_default",
click:function(){
n.removeAll();
}
}]
});
e.show(),n.removeAll(),n.add(e);
}
},
listStore:function(t){
var s=$.extend({},{
action:"list",
begin:0,
count:9999999,
keyword:t.keyword,
task_id:t.task_id,
audit_state:t.audit_state||3
},t.getDataExtra);
e.get({
url:"/merchant/entityshop",
data:s
},function(s){
if(0==s.base_resp.ret){
var o=$.parseJSON(s.data),n=o.store_location;
t.success&&t.success({
shop_list:n,
total_num:s.total_count
});
}else e.show(s);
});
},
canSendCard:function(t){
t.success&&t.success(!0);
}
});
return c;
});define("tpl/biz_web/ui/timeRange.html.js",[],function(){
return"<div>\n    <label style=\"color:#8d8d8d\">时间</label>\n    <div class=\"dropdown_wrp dropdown_menu js_dr_timeSelectBox\" style=\"width:62px;\">\n        <a href=\"javascript:;\" class=\"btn dropdown_switch js_dr_selecter\"><label class='js_dr_timeLabel'>{timeList.mTime}</label><i class=\"arrow\"></i></a>\n        <div class=\"dropdown_data_container js_dr_option\">\n            <ul class=\"dropdown_data_list\">\n                {each ['00','01','02','03','04','05','06','07','08','09','10','11','12','13','14','15','16','17','18','19','20','21','22','23'] as item i}\n                    <li class=\"dropdown_data_item\">\n                        <a href=\"javascript:;\" class='js_dr_time' data-value=\"{item}\">{item}</a>\n                    </li>\n                {/each}\n            </ul>\n        </div>\n    </div> :\n    <span class=\"frm_input_box\" style=\"width:30px;\">\n        <input type=\"text\" class=\"frm_input js_dr_msLabel js_dr_minLabel\" value=\"{timeList.mMin}\" style='text-align: center;'>\n    </span> :\n    <span class=\"frm_input_box\" style=\"width:30px;\">\n        <input type=\"text\" class=\"frm_input js_dr_msLabel js_dr_secLabel\" value=\"{timeList.mSec}\" style='text-align: center;'>\n    </span>\n</div>";
});define("tpl/biz_web/ui/dateRange.html.js",[],function(){
return'<div class="ta_date" id="div_{title_id}">\n	<span class="date_title" id="{title_id}"></span>\n	<a class="opt_sel" id="{inputTrigger}" href="#">\n		<i class="i_orderd"></i>\n	</a>\n</div>\n';
});define("biz_web/lib/spin.js", [], function(e, t, n) {
try {
var r = +(new Date), i = function() {
function e(e, t) {
var n = ~~((e[a] - 1) / 2);
for (var r = 1; r <= n; r++) t(e[r * 2 - 1], e[r * 2]);
}
function t(t) {
var n = document.createElement(t || "div");
return e(arguments, function(e, t) {
n[e] = t;
}), n;
}
function n(e, t, r) {
return r && !r[x] && n(e, r), e.insertBefore(t, r || null), e;
}
function r(e, t) {
var n = [ p, t, ~~(e * 100) ].join("-"), r = "{" + p + ":" + e + "}", i;
if (!H[n]) {
for (i = 0; i < P[a]; i++) try {
j.insertRule("@" + (P[i] && "-" + P[i].toLowerCase() + "-" || "") + "keyframes " + n + "{0%{" + p + ":1}" + t + "%" + r + "to" + r + "}", j.cssRules[a]);
} catch (s) {}
H[n] = 1;
}
return n;
}
function i(e, t) {
var n = e[m], r, i;
if (n[t] !== undefined) return t;
t = t.charAt(0).toUpperCase() + t.slice(1);
for (i = 0; i < P[a]; i++) {
r = P[i] + t;
if (n[r] !== undefined) return r;
}
}
function s(t) {
return e(arguments, function(e, n) {
t[m][i(t, e) || e] = n;
}), t;
}
function o(t) {
return e(arguments, function(e, n) {
t[e] === undefined && (t[e] = n);
}), t;
}
var u = "width", a = "length", f = "radius", l = "lines", c = "trail", h = "color", p = "opacity", d = "speed", v = "shadow", m = "style", g = "height", y = "left", b = "top", w = "px", E = "childNodes", S = "firstChild", x = "parentNode", T = "position", N = "relative", C = "absolute", k = "animation", L = "transform", A = "Origin", O = "Timeout", M = "coord", _ = "#000", D = m + "Sheets", P = "webkit0Moz0ms0O".split(0), H = {}, B;
n(document.getElementsByTagName("head")[0], t(m));
var j = document[D][document[D][a] - 1], F = function(e) {
this.opts = o(e || {}, l, 12, c, 100, a, 7, u, 5, f, 10, h, _, p, .25, d, 1);
}, I = F.prototype = {
spin: function(e) {
var t = this, r = t.el = t[l](t.opts);
e && n(e, s(r, y, ~~(e.offsetWidth / 2) + w, b, ~~(e.offsetHeight / 2) + w), e[S]);
if (!B) {
var i = t.opts, o = 0, u = 20 / i[d], a = (1 - i[p]) / (u * i[c] / 100), f = u / i[l];
(function h() {
o++;
for (var e = i[l]; e; e--) {
var n = Math.max(1 - (o + e * f) % u * a, i[p]);
t[p](r, i[l] - e, n, i);
}
t[O] = t.el && window["set" + O](h, 50);
})();
}
return t;
},
stop: function() {
var e = this, t = e.el;
return window["clear" + O](e[O]), t && t[x] && t[x].removeChild(t), e.el = undefined, e;
}
};
I[l] = function(e) {
function i(n, r) {
return s(t(), T, C, u, e[a] + e[u] + w, g, e[u] + w, "background", n, "boxShadow", r, L + A, y, L, "rotate(" + ~~(360 / e[l] * E) + "deg) translate(" + e[f] + w + ",0)", "borderRadius", "100em");
}
var o = s(t(), T, N), m = r(e[p], e[c]), E = 0, S;
for (; E < e[l]; E++) S = s(t(), T, C, b, 1 + ~(e[u] / 2) + w, L, "translate3d(0,0,0)", k, m + " " + 1 / e[d] + "s linear infinite " + (1 / e[l] / e[d] * E - 1 / e[d]) + "s"), e[v] && n(S, s(i(_, "0 0 4px " + _), b, 2 + w)), n(o, n(S, i(e[h], "0 0 1px rgba(0,0,0,.1)")));
return o;
}, I[p] = function(e, t, n) {
e[E][t][m][p] = n;
};
var q = "behavior", R = "url(#default#VML)", U = "group0roundrect0fill0stroke".split(0);
return function() {
var e = s(t(U[0]), q, R), r;
if (!i(e, L) && e.adj) {
for (r = 0; r < U[a]; r++) j.addRule(U[r], q + ":" + R);
I[l] = function() {
function e() {
return s(t(U[0], M + "size", c + " " + c, M + A, -o + " " + -o), u, c, g, c);
}
function r(r, a, c) {
n(d, n(s(e(), "rotation", 360 / i[l] * r + "deg", y, ~~a), n(s(t(U[1], "arcsize", 1), u, o, g, i[u], y, i[f], b, -i[u] / 2, "filter", c), t(U[2], h, i[h], p, i[p]), t(U[3], p, 0))));
}
var i = this.opts, o = i[a] + i[u], c = 2 * o, d = e(), m = ~(i[a] + i[f] + i[u]) + w, E;
if (i[v]) for (E = 1; E <= i[l]; E++) r(E, -2, "progid:DXImage" + L + ".Microsoft.Blur(pixel" + f + "=2,make" + v + "=1," + v + p + "=.3)");
for (E = 1; E <= i[l]; E++) r(E);
return n(s(t(), "margin", m + " 0 0 " + m, T, N), d);
}, I[p] = function(e, t, n, r) {
r = r[v] && r[l] || 0, e[S][E][t + r][S][S][p] = n;
};
} else B = i(e, k);
}(), F;
}();
$.fn.spin = function(e, t) {
return this.each(function() {
var n = $(this), r = n.data();
r.spinner && (r.spinner.stop(), delete r.spinner), e !== !1 && (e = $.extend({
color: t || n.css("color")
}, $.fn.spin.presets[e] || e), r.spinner = (new i(e)).spin(this));
});
}, $.fn.spin.presets = {
tiny: {
lines: 8,
length: 2,
width: 2,
radius: 3
},
small: {
lines: 8,
length: 4,
width: 3,
radius: 5
},
large: {
lines: 10,
length: 8,
width: 4,
radius: 8
}
};
} catch (s) {
wx.jslog({
src: "biz_web/lib/spin.js"
}, s);
}
});define("tpl/media/preview/chat.html.js",[],function(){
return'<div class="wx_phone_hd">\n	微信团队</div>\n<div class="wx_phone_bd wx_phone_preview_chat_wrp">\n    {each list as item index}\n    <div class="wx_phone_preview_chat">\n        <img class="chat_user_avatar" src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_avatar_wechat.jpg">\n        <div class="chat_content">\n            <div class="chat_appmsg_msg jsPhoneViewCard" data-index="{index}">\n                <div class="chat_appmsg_title" title="{item.title}">{item.title}</div>\n                <div class="chat_appmsg_content">\n                    <img class="chat_appmsg_thumb" src="{item.img||item.avatar}">\n                    <div class="chat_appmsg_desc" title="{item.digest}">{item.digest}</div>\n                </div>\n                <span class="chat_arrow_wrp">\n                    <i class="chat_arrow arrow_out"></i>\n                    <i class="chat_arrow arrow_in"></i>\n                </span>\n            </div>\n        </div>\n    </div>\n    {/each}\n</div>\n<!--pulgin-->\n<div>\n    <ul class="wx_view_list">\n        <li class="wx_view_item jsPhoneViewLink" data-id="card">图文消息</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="appmsg">消息正文</li>\n        <li class="wx_view_item jsPhoneViewLink " data-id="moments">分享到朋友圈</li>\n        <li class="wx_view_item jsPhoneViewLink selected" data-id="chat">发送给朋友</li>\n    </ul>\n    <div class="btn_wx_phone_preview_wrp">\n        <a class="btn btn_default btn_wx_phone_preview jsPhoneViewPub">发送到手机预览</a>\n    </div>\n</div>\n\n\n\n\n\n';
});define("tpl/media/preview/moments.html.js",[],function(){
return'<div class="wx_phone_hd">\n    朋友圈</div>\n<div class="wx_phone_bd">\n    {each list as item index}\n    <div class="wx_phone_preview_moments">\n        <img class="moments_user_avatar" src="/mpres/zh_CN/htmledition/comm_htmledition/images/pic/common/pic_avatar_wechat.jpg" alt="">\n        <div class="moments_content_wrp">\n            <p class="moments_nickname">微信团队</p>\n            <div class="moments_content jsPhoneViewCard" data-index="{index}">\n                <img class="moments_appmsg_thumb" src="{item.img||item.avatar}">\n                <div class="moments_appmsg_title" title="{item.title}">{item.title}</div>\n            </div>\n        </div>\n    </div>\n    {/each}\n</div>\n<!--pulgin-->\n<div>\n    <ul class="wx_view_list">\n        <li class="wx_view_item jsPhoneViewLink" data-id="card">图文消息</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="appmsg">消息正文</li>\n        <li class="wx_view_item jsPhoneViewLink selected" data-id="moments">分享到朋友圈</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="chat">发送给朋友</li>\n    </ul>\n    <div class="btn_wx_phone_preview_wrp">\n        <a class="btn btn_default btn_wx_phone_preview jsPhoneViewPub">发送到手机预览</a>\n    </div>\n</div>\n\n\n';
});define("tpl/media/preview/card.html.js",[],function(){
return'<div class="wx_phone_hd">\n    {nickName}\n</div>\n<div class="wx_phone_bd wx_phone_preview_card_wrp" > \n{if list}\n<div class="msg_card wx_phone_preview_multi_card {if (list[0].img)}has_first_cover{/if}">\n        <div class="msg_card_inner">\n            <div class="card_cover_appmsg_item jsPhoneViewCard" data-index="0">\n                {if (list[0].img)}\n                <div class="card_cover_appmsg_inner" style="background-image:url(\'{list[0].img}\');">\n                    <!--<img class="card_cover_thumb" src="">-->\n                </div>\n                {/if}\n                <strong class="card_cover_title" title="{list[0].title}">{list[0].title}</strong>\n                {if (!list[0].img && list[0].digest)}\n                <div class="msg_card_cover_desc" title="{list[0].digest}">{list[0].digest}</div>\n                {/if}\n            </div>\n            {each list as d i }\n            <div class="card_appmsg_item {if i==0}dn{/if} jsPhoneViewCard" data-index="{i}">\n                {if d.img}<img class="card_appmsg_thumb" src="{d.img}">{/if}\n                <div class="card_appmsg_content" title="{d.title}">{d.title}</div>\n            </div>\n            {/each}\n        </div>\n    </div>\n{else}\n    <div class="msg_card wx_phone_preview_card jsPhoneViewCard" data-index="0">\n        <div class="msg_card_inner">\n            <div class="msg_card_bd">\n                <h4 class="msg_card_title" title="{title}">{title}</h4>\n                <div class="msg_card_info">\n                    {date}\n                </div>\n                {if img}\n                <div class="msg_card_extra_info" style="background-image:url(\'{img}\');">\n                    <!--<img class="appmsg_thumb" src="">-->\n                </div>\n                {/if}\n                <div class="msg_card_desc" title="{digest}">{digest}</div>\n            </div>\n            <div class="msg_card_ft">\n                <i class="icon_arrow_default"></i>\n                阅读原文            </div>\n        </div>\n    </div>\n{/if}\n</div>\n<!--pulgin-->\n<div>\n    <ul class="wx_view_list">\n        <li class="wx_view_item jsPhoneViewLink selected" data-id="card">图文消息</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="appmsg">消息正文</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="moments">分享到朋友圈</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="chat">发送给朋友</li>\n    </ul>\n    <div class="btn_wx_phone_preview_wrp">\n        <a class="btn btn_default btn_wx_phone_preview jsPhoneViewPub">发送到手机预览</a>\n    </div>\n</div>\n\n\n\n\n\n\n';
});