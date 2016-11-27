define("common/wx/widgetBridge.js", [], function(e, t, n) {
try {
var r = +(new Date);
"use strict", $.widgetBridge || ($.widgetBridge = function(e, t) {
var n = e, r = n.split("."), e = r.length > 1 ? r[1] : r[0];
$.fn[e] = function(r) {
var i = typeof r == "string", s = [].slice.call(arguments, 1), o = this;
r = r || {};
if (i) {
var u;
return r.indexOf("_") !== 0 && this.each(function() {
var t = $.data(this, n);
if (!t) return $.error("cannot call methods on " + e + " prior to initialization; " + "attempted to call method '" + r + "'");
if (r === "instance") return u = t, !1;
if (r === "option") return u = t.options, !1;
u || (u = (t[r] || jQuery.noop).apply(t, s)), r === "destroy" && (t.elements = null);
}), u;
}
var a = this;
return this.each(function() {
var e = this, i = $.data(this, n);
if (!i) {
i = $.extend(!0, {}, t), i.destroy || (i.destroy = function() {
$.removeData(e, n);
}), i.options = $.extend(!0, i.options || {}, r), i.element = $(this), i.elements = a, i._create && (o = i._create.call(i, r));
var s = o && o.length && o.get(0) || this;
$.data(s, n, i);
}
}), o;
};
});
} catch (i) {
wx.jslog({
src: "common/wx/widgetBridge.js"
}, i);
}
});define("common/lib/MockJax.js", [], function(e, t, n) {
try {
var r = +(new Date);
(function(e) {
function t(t) {
window.DOMParser == undefined && window.ActiveXObject && (DOMParser = function() {}, DOMParser.prototype.parseFromString = function(e) {
var t = new ActiveXObject("Microsoft.XMLDOM");
return t.async = "false", t.loadXML(e), t;
});
try {
var n = (new DOMParser).parseFromString(t, "text/xml");
if (!e.isXMLDoc(n)) throw "Unable to parse XML";
var r = e("parsererror", n);
if (r.length == 1) throw "Error: " + e(n).text();
return n;
} catch (i) {
var s = i.name == undefined ? i : i.name + ": " + i.message;
return e(document).trigger("xmlParseError", [ s ]), undefined;
}
}
function n(t, n, r) {
(t.context ? e(t.context) : e.event).trigger(n, r);
}
function r(t, n) {
var i = !0;
return typeof n == "string" ? e.isFunction(t.test) ? t.test(n) : t == n : (e.each(t, function(s) {
if (n[s] === undefined) return i = !1, i;
typeof n[s] == "object" ? i = i && r(t[s], n[s]) : e.isFunction(t[s].test) ? i = i && t[s].test(n[s]) : i = i && t[s] == n[s];
}), i);
}
function i(t, n) {
if (e.isFunction(t)) return t(n);
if (e.isFunction(t.url.test)) {
if (!t.url.test(n.url)) return null;
} else {
var i = t.url.indexOf("*");
if (t.url !== n.url && i === -1 || !(new RegExp(t.url.replace(/[-[\]{}()+?.,\\^$|#\s]/g, "\\$&").replace(/\*/g, ".+"))).test(n.url)) return null;
}
return t.data && n.data && !r(t.data, n.data) ? null : t && t.type && t.type.toLowerCase() != n.type.toLowerCase() ? null : t;
}
function s(n, r, i) {
var s = function(s) {
return function() {
return function() {
var s;
this.status = n.status, this.statusText = n.statusText, this.readyState = 4, e.isFunction(n.response) && n.response(i), r.dataType == "json" && typeof n.responseText == "object" ? this.responseText = JSON.stringify(n.responseText) : r.dataType == "xml" ? typeof n.responseXML == "string" ? (this.responseXML = t(n.responseXML), this.responseText = n.responseXML) : this.responseXML = n.responseXML : this.responseText = n.responseText;
if (typeof n.status == "number" || typeof n.status == "string") this.status = n.status;
typeof n.statusText == "string" && (this.statusText = n.statusText), s = this.onreadystatechange || this.onload, e.isFunction(s) ? (n.isTimeout && (this.status = -1), s.call(this, n.isTimeout ? "timeout" : undefined)) : n.isTimeout && (this.status = -1);
}.apply(s);
};
}(this);
n.proxy ? v({
global: !1,
url: n.proxy,
type: n.proxyType,
data: n.data,
dataType: r.dataType === "script" ? "text/plain" : r.dataType,
complete: function(e) {
n.responseXML = e.responseXML, n.responseText = e.responseText, n.status = e.status, n.statusText = e.statusText, this.responseTimer = setTimeout(s, n.responseTime || 0);
}
}) : r.async === !1 ? s() : this.responseTimer = setTimeout(s, n.responseTime || 50);
}
function o(t, n, r, i) {
return t = e.extend(!0, {}, e.mockjaxSettings, t), typeof t.headers == "undefined" && (t.headers = {}), t.contentType && (t.headers["content-type"] = t.contentType), {
status: t.status,
statusText: t.statusText,
readyState: 1,
open: function() {},
send: function() {
i.fired = !0, s.call(this, t, n, r);
},
abort: function() {
clearTimeout(this.responseTimer);
},
setRequestHeader: function(e, n) {
t.headers[e] = n;
},
getResponseHeader: function(e) {
if (t.headers && t.headers[e]) return t.headers[e];
if (e.toLowerCase() == "last-modified") return t.lastModified || (new Date).toString();
if (e.toLowerCase() == "etag") return t.etag || "";
if (e.toLowerCase() == "content-type") return t.contentType || "text/plain";
},
getAllResponseHeaders: function() {
var n = "";
return e.each(t.headers, function(e, t) {
n += e + ": " + t + "\n";
}), n;
}
};
}
function u(e, t, n) {
a(e), e.dataType = "json";
if (e.data && y.test(e.data) || y.test(e.url)) {
l(e, t, n);
var r = /^(\w+:)?\/\/([^\/?#]+)/, i = r.exec(e.url), s = i && (i[1] && i[1] !== location.protocol || i[2] !== location.host);
e.dataType = "script";
if (e.type.toUpperCase() === "GET" && s) {
var o = f(e, t, n);
return o ? o : !0;
}
}
return null;
}
function a(e) {
if (e.type.toUpperCase() === "GET") y.test(e.url) || (e.url += (/\?/.test(e.url) ? "&" : "?") + (e.jsonp || "callback") + "=?"); else if (!e.data || !y.test(e.data)) e.data = (e.data ? e.data + "&" : "") + (e.jsonp || "callback") + "=?";
}
function f(t, n, r) {
var i = r && r.context || t, s = null;
return n.response && e.isFunction(n.response) ? n.response(r) : typeof n.responseText == "object" ? e.globalEval("(" + JSON.stringify(n.responseText) + ")") : e.globalEval("(" + n.responseText + ")"), c(t, i, n), h(t, i, n), e.Deferred && (s = new e.Deferred, typeof n.responseText == "object" ? s.resolveWith(i, [ n.responseText ]) : s.resolveWith(i, [ e.parseJSON(n.responseText) ])), s;
}
function l(e, t, n) {
var r = n && n.context || e, i = e.jsonpCallback || "jsonp" + b++;
e.data && (e.data = (e.data + "").replace(y, "=" + i + "$1")), e.url = e.url.replace(y, "=" + i + "$1"), window[i] = window[i] || function(n) {
data = n, c(e, r, t), h(e, r, t), window[i] = undefined;
try {
delete window[i];
} catch (s) {}
head && head.removeChild(script);
};
}
function c(e, t, r) {
e.success && e.success.call(t, r.responseText || "", status, {}), e.global && n(e, "ajaxSuccess", [ {}, e ]);
}
function h(t, r) {
t.complete && t.complete.call(r, {}, status), t.global && n("ajaxComplete", [ {}, t ]), t.global && !--e.active && e.event.trigger("ajaxStop");
}
function p(t, n) {
var r, s, a;
typeof t == "object" ? (n = t, t = undefined) : n.url = t, s = e.extend(!0, {}, e.ajaxSettings, n);
for (var f = 0; f < m.length; f++) {
if (!m[f]) continue;
a = i(m[f], s);
if (!a) continue;
g.push(s), e.mockjaxSettings.log(a, s);
if (s.dataType === "jsonp") if (r = u(s, a, n)) return r;
return a.cache = s.cache, a.timeout = s.timeout, a.global = s.global, d(a, n), function(t, n, i, s) {
r = v.call(e, e.extend(!0, {}, i, {
xhr: function() {
return o(t, n, i, s);
}
}));
}(a, s, n, m[f]), r;
}
return v.apply(e, [ n ]);
}
function d(e, t) {
if (!(e.url instanceof RegExp)) return;
if (!e.hasOwnProperty("urlParams")) return;
var n = e.url.exec(t.url);
if (n.length === 1) return;
n.shift();
var r = 0, i = n.length, s = e.urlParams.length, o = Math.min(i, s), u = {};
for (r; r < o; r++) {
var a = e.urlParams[r];
u[a] = n[r];
}
t.urlParams = u;
}
var v = e.ajax, m = [], g = [], y = /=\?(&|$)/, b = (new Date).getTime();
e.extend({
ajax: p
}), e.mockjaxSettings = {
log: function(t, n) {
if (t.logging === !1 || typeof t.logging == "undefined" && e.mockjaxSettings.logging === !1) return;
if (window.console && console.log) {
var r = "MOCK " + n.type.toUpperCase() + ": " + n.url, i = e.extend({}, n);
if (typeof console.log == "function") console.log(r, i); else try {
console.log(r + " " + JSON.stringify(i));
} catch (s) {
console.log(r);
}
}
},
logging: !0,
status: 200,
statusText: "OK",
responseTime: 500,
isTimeout: !1,
contentType: "text/plain",
response: "",
responseText: "",
responseXML: "",
proxy: "",
proxyType: "GET",
lastModified: null,
etag: "",
headers: {
etag: "IJF@H#@923uf8023hFO@I#H#",
"content-type": "text/plain"
}
}, e.mockjax = function(e) {
var t = m.length;
return m[t] = e, t;
}, e.mockjaxClear = function(e) {
arguments.length == 1 ? m[e] = null : m = [], g = [];
}, e.mockjax.handler = function(e) {
if (arguments.length == 1) return m[e];
}, e.mockjax.mockedAjaxCalls = function() {
return g;
};
})(jQuery);
} catch (i) {
wx.jslog({
src: "common/lib/MockJax.js"
}, i);
}
});define("common/wx/cgiReport.js",["common/wx/Tips.js"],function(a,e){
"use strict";
var r=a("common/wx/Tips.js");
e.error=function(a,e){
var t=-1!==location.href.indexOf("/cgi-bin/home")&&(-1!==e.url.indexOf("/misc/safeassistant")||-1!==e.url.indexOf("/safe/safeuuid")),n=11;
switch(a){
case"timeout":
n=7;
break;

case"error":
n=8;
break;

case"notmodified":
n=9;
break;

case"parsererror":
n=10;
}
e.data.lang&&delete e.data.lang,e.data.random&&delete e.data.random,e.data.f&&delete e.data.f,
e.data.ajax&&delete e.data.ajax,e.data.token&&delete e.data.token,n+=t?100:0,$.ajax({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}]".format({
uin:wx.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:e.url,
param:$.param(e.data).substr(0,50),
info:a
}),
id:n,
level:"error"
},
type:"POST"
}),$.ajax({
url:"/misc/jslog?1=1",
data:{
content:"[fakeid={uin}] [xhr] [url={url}] [param={param}] [info={info}] [useragent={useragent}] [page={page}]".format({
uin:wx.data.uin,
useragent:window.navigator.userAgent,
page:location.href,
url:e.url,
param:$.param(e.data).substr(0,50),
info:a
}),
id:6+(t?100:0),
level:"error"
},
type:"POST"
}),"timeout"==a&&r.err("你的网络环境较差，请稍后重试");
};
});define("common/qq/mask.js", [ "biz_web/lib/spin.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict", e("biz_web/lib/spin.js");
var i = 0, s = '<div class="mask"></div>';
function o(e) {
if (this.mask) this.mask.show(); else {
var t = "body";
e && !!e.parent && (t = $(e.parent)), this.mask = $(s).appendTo(t), this.mask.id = "wxMask_" + ++i, this.mask.spin("flower");
}
if (e) {
if (e.spin === !1) return this;
this.mask.spin(e.spin || "flower");
}
return this;
}
o.prototype = {
show: function() {
this.mask.show();
},
hide: function() {
this.mask.hide();
},
remove: function() {
this.mask.remove();
}
}, t.show = function(e) {
return new o(e);
}, t.hide = function() {
$(".mask").hide();
}, t.remove = function() {
$(".mask").remove();
};
} catch (u) {
wx.jslog({
src: "common/qq/mask.js"
}, u);
}
});define("biz_common/utils/monitor.js",[],function(){
var n=[],i={};
return i.setAvg=function(e,t,o){
return n.push(e+"_"+t+"_"+o),n.push(e+"_"+(t-1)+"_1"),i;
},i.setSum=function(e,t,o){
return n.push(e+"_"+t+"_"+o),i;
},i.send=function(){
if(0!=n.length){
var i=new Image;
i.src="//mp.weixin.qq.com/mp/jsmonitor?idkey="+n.join(";"),n=[];
}
},i;
});define("media/preview.js",["common/qq/events.js","common/wx/phoneView.js","biz_common/moment.js","tpl/media/preview/appmsg.html.js","tpl/media/preview/card.html.js","tpl/media/preview/moments.html.js","tpl/media/preview/chat.html.js"],function(e,t){
"use strict";
function i(e){
var t=wx.data.time;
wx.cgiData.appmsg_data&&wx.cgiData.appmsg_data.create_time&&(t=wx.cgiData.appmsg_data.create_time);
for(var i=[],a=0;8>a&&e["title"+a];a++)i.push({
title:e["title"+a],
time:d.unix(t).format("YYYY-MM-DD"),
unix:t,
avatar:wx.url("/misc/getheadimg?fakeid="+wx.data.uin),
author:e["author"+a],
nickName:wx.data.nick_name,
content:e["content"+a],
digest:e["digest"+a],
img:e["cdn_url"+a]||e["fileid"+a]&&wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId="+e["fileid"+a])||"",
show_cover:e["show_cover_pic"+a],
sourceurl:e["sourceurl"+a]
});
return i;
}
var a=e("common/qq/events.js")(!0),n=e("common/wx/phoneView.js"),d=e("biz_common/moment.js"),m=null,s={
appmsg:e("tpl/media/preview/appmsg.html.js"),
card:e("tpl/media/preview/card.html.js"),
moments:e("tpl/media/preview/moments.html.js"),
chat:e("tpl/media/preview/chat.html.js")
};
t.show=function(t,r){
if(m=i(t),m.index=r,0!=m.length){
m[0].date=d.unix(m[0].unix).format("MM月DD日");
{
new n({
html:e("tpl/media/preview/card.html.js"),
data:m.length>1?{
list:m,
nickName:wx.data.nick_name
}:m[0],
todo:function(){
var e=this;
e.$dom.find(".jsPhoneViewPlugin").on("click",".jsPhoneViewLink",function(){
$(this).hasClass("selected")||($(this).addClass("selected").siblings().removeClass("selected"),
"appmsg"==$(this).data("id")?e.render(s.appmsg,{
data:m[r],
index:r,
length:m.length
}):"card"==$(this).data("id")?m.length>1?e.render(s.card,{
list:m,
nickName:wx.data.nick_name
}):e.render(s.card,m[0]):"moments"==$(this).data("id")?e.render(s.moments,{
list:m
}):"chat"==$(this).data("id")&&e.render(s.chat,{
list:m
}));
}),e.$dom.on("click",".jsPhoneViewCard",function(){
var t=$(this);
t.hasClass("disabled")||("undefined"!=typeof t.data("index")&&(r=t.data("index")),
e.render(s.appmsg,{
data:m[r],
index:r,
length:m.length
}));
}),e.$dom.on("click",".jsPhoneViewPub",function(){
a.trigger("_preview");
});
}
});
}
}
};
});define("tpl/media/appmsg_edit/article_list_item.html.js",[],function(){
return'<div id="appmsgItem{id}" data-fileId="{file_id}" data-id="{id}" data-msgindex="{msg_index}" class="js_appmsg_item appmsg_item_wrp {if cover}has_thumb{/if}">\n    <div class="first_appmsg_item" {if !isFirst}style="display:none;"{/if} title="{title_tips}">\n        <div class="cover_appmsg_item">\n            <h4 class="appmsg_title"><a class="js_appmsg_title" href="javascript:void(0);" onclick="return false;">{title || \'标题\'}</a></h4>\n            <div class="appmsg_thumb_wrp js_appmsg_thumb" style="background-image:url(\'{cover.nogif()}\');">\n                <!--<img class="js_appmsg_thumb appmsg_thumb" src="{cover}">-->\n                <div class="appmsg_thumb default">\n                    <i class="icon_appmsg_thumb">封面图片</i>\n                </div>\n            </div>        \n        </div>\n        <div class="appmsg_edit_mask">\n            <a onclick="return false;" class="icon20_common sort_down_white js_down" data-id="{id}" href="javascript:;" title="下移">向下</a>\n        </div>\n    </div>\n    <div class="appmsg_item has_cover" {if isFirst}style="display:none;"{/if} title="{title_tips}">\n        <div class="appmsg_thumb_wrp js_appmsg_thumb" style="background-image:url(\'{cover.nogif()}\');">\n            <div class="appmsg_thumb default">\n                <i class="icon_appmsg_thumb_small">缩略图</i>\n            </div>\n        </div>\n        <h4 class="appmsg_title js_appmsg_title">{title || \'标题\'}</h4>\n        <div class="appmsg_edit_mask">\n            <a onclick="return false;" class="icon20_common sort_up_white   js_up"   data-id="{id}" href="javascript:;" title="上移">向上</a>\n            <a onclick="return false;" class="icon20_common sort_down_white js_down" data-id="{id}" href="javascript:;" title="下移">向下</a>\n            <a onclick="return false;" class="icon20_common del_media_white js_del"  data-id="{id}" href="javascript:;" title="删除">删除</a>\n        </div>\n    </div>\n</div>\n';
});define("media/draft.js",["common/qq/Class.js","biz_web/lib/store.js","biz_common/moment.js","media/report.js"],function(t){
"use strict";
var e=t("common/qq/Class.js"),s=t("biz_web/lib/store.js"),a=t("biz_common/moment.js"),i=(t("media/report.js"),
e.declare({
init:function(t){
var e=this;
if(!e._supportUserData()&&"undefined"==typeof localStorage)return!1;
e.app_id=t,e.draftId=wx.data.uin+(t?t:""),e.timeKey="Time"+e.draftId,e.appKey="App"+e.draftId,
e.isDropped=!1;
var i=Math.floor(wx.cgiData.svr_time-new Date/1e3);
s.get(e.timeKey)&&Number(wx.cgiData.updateTime)>a(s.get(e.timeKey),"YYYY-MM-DD HH:mm:ss").unix()+i&&this._showImportDraft();
},
_supportUserData:function(){
try{
var t=document.createElement("input");
t.addBehavior("#default#userData");
}catch(e){
return!1;
}
return!0;
},
_getSaveTime:function(){
return s.get(this.timeKey);
},
_showTips:function(t){
$("#js_autosave").attr("title",t+" 已自动保存").show(),$("#js_draft_tips").show().find(".js_msg_content").html("已从本地读取"+t+"的草稿");
},
_showImportDraft:function(){
$("#js_import_tips").show().find(".js_msg_content").html('<span>如果图文内容不是上次编辑的，可尝试<span class="link_global" id="js_import_draft">导入</span>旧草稿。</span>');
},
showTips:function(){
$("#js_draft_tips").show().find(".js_msg_content").html('<span class="js_msg_content">点击<span class="link_global" id="js_draft_cancel">撤消</span>刚刚的导入操作。</span>');
},
clear:function(){
s.remove(this.timeKey),s.remove(this.appKey);
},
save:function(t){
var e=this;
e.clear(),s.set(e.timeKey,a().format("YYYY-MM-DD HH:mm:ss")),s.set(e.appKey,t),$("#js_autosave").attr("title",s.get(e.timeKey)+" 已自动保存").fadeIn(500);
},
get:function(){
var t=this,e=Math.floor(wx.cgiData.svr_time-new Date/1e3);
if(s.get(t.timeKey)&&Number(wx.cgiData.updateTime)>a(s.get(t.timeKey),"YYYY-MM-DD HH:mm:ss").unix()+e)return!1;
var i=s.get(this.appKey);
return i?i:!1;
},
getRaw:function(){
var t=s.get(this.appKey);
return t?t:!1;
}
}));
return i;
});define("media/article.js",["common/qq/Class.js","biz_common/jquery.validate.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/mpEditor/plugin/remoteimg.js"],function(e){
"use strict";
var r=e("common/qq/Class.js"),t=e("biz_common/jquery.validate.js"),i=e("common/wx/Tips.js"),s=(e("common/wx/dialog.js"),
e("common/wx/mpEditor/plugin/remoteimg.js")),n=t.rules,o=wx.cgiData,_=r.declare({
init:function(e){
this.opt=e,this.$dom=$(e.dom),this.data=e.data||{},this.$item=$(e.item),this.ueditor=e.ueditor,
this.freeUEditor=e.freeUEditor,this.scrollTop=Math.min($(".main_hd").offset().top,$(".main_bd").offset().top);
},
showErrMsg:function(e,r){
this.ueditor.fireEvent("showErrMsg",e,r);
},
scrollIntoView:function(e,r){
this.ueditor.fireEvent("scrollIntoView",e,r);
},
hideAllErrMsg:function(){
this.ueditor.fireEvent("hideAllErrMsg");
},
_setEditorContent:function(){
var e=this,r=e.data;
e.ueditor.ready(function(){
e.ueditor.setContent("");
try{
e.ueditor.setContent(r.content);
}catch(t){
r.content&&""==e.ueditor.getUeditor().getContent()&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=[errmsg:%s,uin:%s]".sprintf(28308,0,t.message,wx.data.uin));
}
e.ueditor.setHistory(e.undoHistory);
});
},
_setOriginal:function(){
var e=this,r=e.data,t=e.$dom,i=$("#js_original");
i.find(".js_original_type").hide().eq(r.copyright_type||0).show(),r.copyright_type?(i.find(".js_original_content").show(),
i.find(".js_original_publish").val(r.releasefirst),i.find(".js_reprint_frm").val(r.reprint_permit_type),
i.find(".js_url").text(r.source_url).closest("li")[r.source_url?"show":"hide"](),
i.find(".js_author").text(r.author),i.find(".js_platform").text(+r.releasefirst?"微信公众平台":r.platform),
0==r.reprint_permit_type?i.find(".js_frm").parent().hide():i.find(".js_frm").parent().show(),
i.find(".js_frm").text(1==+r.reprint_permit_type?"允许转载":2==r.reprint_permit_type?"授权转载":"禁止转载"),
i.find(".js_classify").text(r.original_article_type),t.find(".js_author").closest(".appmsg_edit_item").eq(0).hide(),
t.find(".js_reward").checkbox("disabled",!1),$("#js_pay").checkbox("disabled",1==r.reprint_permit_type),
1==r.reprint_permit_type?i.find(".js_pay_tips").text("（只有“禁止转载”的原创文章才可以设置付费阅读）").show():i.find(".js_pay_tips").text("（每月可群发10篇付费阅读文章）")):(i.find(".js_original_content").hide(),
t.find(".js_author").closest(".appmsg_edit_item").eq(0).show(),t.find(".js_reward").checkbox("disabled",!0),
t.find(".js_reward_div").hide(),$("#js_pay").checkbox("disabled",!0),i.find(".js_pay_tips").show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),
i.find(".js_pay_setting").hide());
},
_setPay:function(){
var e=this,r=e.data,t=e.$dom;
$("#js_pay").checkbox("checked",!!r.payforread_enabled),t.find(".js_pay_setting")[r.payforread_enabled?"show":"hide"]().find(".js_fee").text(r.fee?(r.fee/100).toFixed(2):""),
t.find(".js_pay_tips")[r.payforread_enabled?"hide":"show"](),e.freeUEditor.val(r.free_content||"").trigger("keydown");
},
hideErrorTips:function(){
this.$dom.find(".js_title_error,.js_author_error,.js_desc_error,.js_tip_mask_msg,.js_cover_error,.js_url_error,.js_content_error,.js_platform_error").hide(),
this.$dom.find(".js_tip_mask").removeClass("error_mask").addClass("hover_mask");
},
flush:function(){
var e=this,r=e.data,t=e.$dom;
if(t.find(".js_field").each(function(){
var e=$(this),t=e.attr("name"),i=e.attr("type");
r[t]="checkbox"==i?e.checkbox("value")?1:0:"checkbox"==e.data("type")?1*e.val()?1:0:$.trim(e.val());
}),r=e.ueditor.getEditorData(r),r.only_fans_can_comment=$(".js_comment_setting:checked").val()||0,
r.source_url=r.source_url_checked?r.source_url:"",r.source_url&&!/:\/\//.test(r.source_url)&&(r.source_url="http://"+r.source_url),
1==o.can_use_hyperlink){
var i=r.content.match(/<a([^>]*)>(.*?)<\/a>/g);
i&&(r.link_count=i.length);
}
r.isFirst=0==e.$item.index(),r.digest=r.digest||r.content.text().html(!1).substr(0,54);
var s=t.find("#js_original");
return r.copyright_type=$(".js_original_type:visible").index(),r.copyright_type=r.copyright_type<0?0:r.copyright_type,
r.copyright_type&&(r.releasefirst=s.find(".js_original_publish").val(),r.author=s.find(".js_author").text(),
r.platform=+r.releasefirst?"":s.find(".js_platform").text(),r.reprint_permit_type=s.find(".js_reprint_frm").val(),
r.original_article_type=s.find(".js_classify").text()),r.free_content=this.freeUEditor.val(),
r.fee=100*t.find(".js_fee").text(),e.scrollTop=Math.max($(window).scrollTop(),$(".main_hd").offset().top),
e.undoHistory=e.ueditor.getHistory(),this;
},
getData:function(e,r){
var t=this,i=t.data,s={},n=["title","content","digest","author","fileid","cdn_url","music_id","video_id","show_cover_pic","shortvideofileid","vid_type","copyright_type","releasefirst","platform","reprint_permit_type","original_article_type","can_reward","reward_wording","need_open_comment","only_fans_can_comment","sourceurl","payforread_enabled","free_content","fee","voteid","voteismlt","supervoteid","cardid","cardquantity","cardlimit","isbn"];
$.each(n,function(e,r){
switch(r){
case"fileid":
s.fileid=i.file_id;
break;

case"sourceurl":
s.sourceurl=i.source_url;
break;

case"cdn_url":
s.cdn_url=(i.cdn_url||"").https2http().nogif();
break;

case"cover":
break;

default:
s[r]=i[r];
}
});
var o=e?r?t.validateStrictly(s):t.validate(s):$.extend(!0,{},i);
return!!o&&(o.cover=void 0),o;
},
getAllImgData:function(){
var e=this.ueditor.fireEvent("getRemoteList"),r=[];
for(var t in e){
var i=e[t];
r.push(i.uid);
}
r=0==r.length?"":","+r.join(",")+",";
for(var s=this.ueditor.getDocument(),n=s.getElementsByTagName("*"),o=",",_=[],t=0,d=n.length;d>t;t++){
var i=n[t];
if(/img/i.test(i.nodeName)){
var a=i.getAttribute("_src")||i.src||"",c=i.getAttribute("data-remoteid")||"";
if($(i).hasClass("js_catchremoteimageerror"))continue;
if(!a)continue;
if(o.indexOf(","+a+",")>=0)continue;
var l=!1;
r&&c&&r.indexOf(","+c+",")>=0&&(l=!0),o+=a+",",_.push({
url:this.git2Img(a),
uid:c,
isRemote:l
});
}else{
var u=i.getAttribute("style")||i.style.cssText||"";
if(u=u.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),u&&u[2]){
var a=u[2].replace(/^['"]|['"]$/g,""),c=i.getAttribute("data-remoteid")||"";
if($(i).hasClass("js_catchremoteimageerror"))continue;
if(!a)continue;
if(o.indexOf(","+a+",")>=0)continue;
var l=!1;
r&&c&&r.indexOf(","+c+",")>=0&&(l=!0),o+=a+",",_.push({
url:this.git2Img(a),
uid:c,
isRemote:l
});
}
}
}
return _;
},
git2Img:function(e){
return/\/0\?(.*&)?wx_fmt=gif/.test(e)?e.replace(/\/0\?/,"/s640?"):e;
},
validate:function(e){
var r,t=this,s=t.data,o=t.$dom,_=$("<div>").html(e.content),d=!0,a=null,c="",l=$(_).find(".js_catchremoteimageerror").length;
if(l)return r=o.find(".js_content_error"),this.showErrMsg(r,"正文有%s张图片粘贴失败".sprintf(l)),
this.scrollIntoView(r,200),null;
if(e.title||e.content||e.fileid||(this.showErrMsg(o.find(".js_content_error"),"请先输入一段正文（或者标题），再点击保存按钮。"),
t.ueditor.getUeditor().focus(),a=a||".js_title_error",d=null),wx.cgiData.is_no_cover_open&&(e.cdn_url&&!e.fileid||wx.cgiData.cover_restrict&&e.fileid),
n.rangelength(e.title,[0,64])||(this.showErrMsg(o.find(".js_title_error"),"标题不能为空且长度不能超过64字"),
a=a||".js_title_error",d=null),0==e.copyright_type&&e.author.len()>16&&(this.showErrMsg(o.find(".js_author_error"),"作者不能超过8个字"),
a=a||".js_author_error",d=null),n.rangelength(e.content,[0,1e7])||(this.showErrMsg(o.find(".js_content_error"),"正文总大小不得超过10M字节"),
a=a||".js_content_error",d=null),n.rangelength(e.content.text(),[0,2e4])||(this.showErrMsg(o.find(".js_content_error"),"正文不能超过20000字，请删减部分内容后重试"),
a=a||".js_content_error",d=null),s.source_url_checked&&""==e.sourceurl&&(o.find(".js_url_error").text("请输入原文链接").show(),
a=a||".js_url",c=c||"请输入原文链接",d=null),e.sourceurl&&!n.url(e.sourceurl)&&(o.find(".js_url_error").text("链接不合法").show(),
a=a||".js_url",c=c||"链接不合法",d=null),n.rangelength(e.digest,[0,120])||(o.find(".js_desc_error").text("摘要长度不能超过120字").show(),
a=a||".js_desc",d=null),1==e.can_reward&&e.reward_wording.len()>30&&(c=c||"赞赏引导语不能超过15个字",
a=a||".js_reward_div",d=null),!d)return this.scrollIntoView(o.find(a),150),null;
if(e.payforread_enabled){
if(!/\d+(\.\d+)?/.test(e.fee))return i.err("请输入正确的付费金额"),null;
if(""==e.free_content)return i.err("请输入免费区域内容"),null;
}
return t.ueditor.checkPlugins(_)?(this.hideAllErrMsg(),e):null;
},
validateStrictly:function(e){
var r,t=this,s=t.data,o=t.$dom,_=$("<div>").html(e.content),d=!0,a=null,c="",l=$(_).find(".js_catchremoteimageerror").length;
if(l)return r=o.find(".js_content_error"),this.showErrMsg(r,"正文有%s张图片粘贴失败".sprintf(l)),
this.scrollIntoView(r,200),null;
n.rangelength(e.title,[1,64])||(this.showErrMsg(o.find(".js_title_error"),"标题不能为空且长度不能超过64字"),
a=a||".js_title_error",d=null),0==e.copyright_type&&e.author.len()>16&&(this.showErrMsg(o.find(".js_author_error"),"作者不能超过8个字"),
a=a||".js_author_error",d=null),n.rangelength(e.content,[1,1e7])||(this.showErrMsg(o.find(".js_content_error"),"正文总大小不得超过10M字节"),
a=a||".js_content_error",d=null);
var u=e.content.text()||"";
if(u?n.rangelength(u,[1,2e4])||(this.showErrMsg(o.find(".js_content_error"),"正文不能超过20000字，请删减部分内容后重试"),
a=a||".js_content_error",d=null):(this.showErrMsg(o.find(".js_content_error"),"正文必须有文字，请在正文中至少输入1个汉字后重试"),
a=a||".js_content_error",d=null),e.fileid||e.cdn_url||(this.showErrMsg(o.find(".js_cover_error"),"必须插入一张图片"),
a=a||".js_cover_error",d=null),s.source_url_checked&&""==e.sourceurl&&(o.find(".js_url_error").text("请输入原文链接").show(),
a=a||".js_url",c=c||"请输入原文链接",d=null),0==e.copyright_type&&e.sourceurl&&!n.url(e.sourceurl)&&(o.find(".js_url_error").text("链接不合法").show(),
a=a||".js_url",c=c||"链接不合法",d=null),n.rangelength(e.digest,[0,120])||(o.find(".js_desc_error").text("摘要长度不能超过120字").show(),
a=a||".js_desc",d=null),1==e.can_reward&&e.reward_wording.len()>30&&(c=c||"赞赏引导语不能超过15个字",
d=null),!d)return this.scrollIntoView(o.find(a),150),null;
if(e.payforread_enabled){
if(!/\d+(\.\d+)?/.test(e.fee))return i.err("请输入正确的付费金额"),null;
if(""==e.free_content)return i.err("请输入免费区域内容"),null;
}
return t.ueditor.checkPlugins(_)?e:null;
},
render:function(){
var e=this,r=e.$dom,t=e.data,i=0==e.$item.index();
if(t.source_url_checked="undefined"==typeof t.source_url_checked?!!t.source_url:t.source_url_checked,
r.find(".js_cover_tip").html(i?"大图片建议尺寸：900像素 * 500像素":"小图片建议尺寸：200像素 * 200像素"),
r.find(".js_field").each(function(){
var e=$(this),r=e.attr("name"),i=e.attr("type");
"checkbox"==i?e.checkbox("checked",!!t[r]):e.val(t[r]||"").trigger("blur keydown ");
}),1*r.find(".js_show_cover_pic").val()===1?r.find(".js_show_cover_pic_tips").show():r.find(".js_show_cover_pic_tips").hide(),
r.find("input.js_title,input.js_author,input.js_reward_wording,.js_desc").trigger("keydown"),
r.find("input.js_title,input.js_author").trigger("blur"),r.find("input.js_title").focus(),
r.find(".js_comment").checkbox("checked",0==t.need_open_comment?!1:!0),r.find(".js_comment_setting").each(function(e){
e==Number(t.only_fans_can_comment||0)?$(this).checkbox("checked",!0):$(this).checkbox("checked",!1);
}),t.cdn_url){
var n=t.cdn_url.http2https().nogif();
if(r.find(".js_cover").find("img").remove(),s.isLocalDomain(n)){
var o=r.find(".js_cover").show().find(".js_cover_preview").css("backgroundImage",'url("'+n+'")');
o.find(".js_tip_mask_msg").hide(),o.find(".js_tip_mask").removeClass("error_mask").addClass("hover_mask");
}else $(".js_appmsg_item.current").removeClass("has_thumb").find(".js_appmsg_thumb").css("backgroundImage",'url("")'),
r.find(".js_cover").hide(),r.find(".js_cdn_url").val("");
}else if(t.file_id){
var n=t.cover||wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s>".sprintf(t.file_id));
r.find(".js_cover").find("img").remove(),s.isLocalDomain(n)?r.find(".js_cover").prepend('<img src="%s">'.sprintf(n)).show():(r.find(".js_cover").hide(),
$(".js_appmsg_item.current").removeClass("has_thumb").find(".js_appmsg_thumb").css("backgroundImage",'url("")'),
r.find(".js_file_id").val(""));
}else r.find(".js_cover").hide().find("img").remove();
t.source_url_checked?r.find(".js_url_area .frm_input_box").show():r.find(".js_url_area .frm_input_box").hide(),
1==t.can_reward?(r.find(".js_reward").checkbox("checked",!0),r.find(".js_reward_div").show()):(r.find(".js_reward").checkbox("checked",!1),
r.find(".js_reward_div").hide()),0==t.need_open_comment?$("#js_comment_setting_wrp").hide():$("#js_comment_setting_wrp").show(),
e._setEditorContent(),e._setOriginal(),e._setPay();
}
});
return _;
});define("media/media_cgi.js",["common/wx/Tips.js","common/wx/Cgi.js","resp_types/base_resp.rt.js","resp_types/file_cnt.rt.js"],function(e){
"use strict";
var r=e("common/wx/Tips.js"),s=e("common/wx/Cgi.js"),a=e("resp_types/base_resp.rt.js"),t=e("resp_types/file_cnt.rt.js"),i={
del:function(e,t){
s.post({
mask:!1,
url:wx.url("/cgi-bin/operate_appmsg?sub=del&t=ajax-response"),
data:{
AppMsgId:e
},
rtDesc:a,
error:function(){
r.err("删除失败");
}
},function(e){
"0"==e.ret?(r.suc("删除成功"),t&&t(e)):r.err("删除失败");
});
},
del_sv:function(e,t){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=del&t=ajax-response"),
data:{
fileid:e
},
rtDesc:a,
error:function(){
r.err("删除失败");
}
},function(e){
e.base_resp&&0==+e.base_resp.ret?(r.suc("删除成功"),t.suc&&t.suc(e)):(r.err("删除失败"),
t.fail&&t.fail(e));
});
},
edit_sv:function(e,t){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=rename&t=ajax-response"),
data:{
fileid:e.id,
filename:e.name
},
rtDesc:a,
error:function(){
r.err("编辑失败");
}
},function(e){
e.base_resp&&0==+e.base_resp.ret?(r.suc("编辑成功"),t.suc&&t.suc(e)):(r.err("编辑失败"),
t.fail&&t.fail(e));
});
},
save:function(e,a,t,i,n,c){
var o=wx.url(t.AppMsgId?"/cgi-bin/operate_appmsg?t=ajax-response&sub=update&type=%s".sprintf(a):"/cgi-bin/operate_appmsg?t=ajax-response&sub=create&type=%s".sprintf(a));
t.ajax=1,s.post({
url:o,
data:t,
dataType:"json",
rtDesc:{
ret_R:"string",
appMsgId_R:"number"
},
error:function(e,s){
"timeout"!=s&&r.err("保存失败"),n&&n(!1,-1);
},
complete:c
},function(e){
if("0"==e.ret)r.suc("保存成功"),i&&i(e);else{
var s=!1;
switch(e.ret){
case"64506":
r.err("保存失败,链接不合法");
break;

case"64507":
r.err("内容不能包含链接，请调整");
break;

case"64510":
r.err("内容不能包含语音，请调整");
break;

case"64511":
r.err("内容不能包多个语音，请调整");
break;

case"64512":
r.err("文章中语音错误,请使用语音添加按钮重新添加。");
break;

case"64508":
r.err("查看原文链接可能具备安全风险，请检查");
break;

case"64550":
r.err("请勿插入不合法的已群发的图文消息链接");
break;

case"-99":
r.err("内容超出字数，请调整");
break;

case"-1":
r.err("系统错误，请注意备份内容后重试");
break;

case"-2":
case"200002":
r.err("参数错误，请注意备份内容后重试");
break;

case"64509":
r.err("正文中不能包含超过3个视频，请重新编辑正文后再保存。");
break;

case"-5":
r.err("服务错误，请注意备份内容后重试。");
break;

case"64513":
r.err("请从正文中选择封面，再尝试保存。");
break;

case"-206":
r.err("目前，服务负荷过大，请稍后重试。");
break;

case"10801":
r.err("标题不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s=e.msg;
break;

case"10802":
r.err("作者不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s=e.msg;
break;

case"10803":
r.err("敏感链接，请重新添加。"),s=e.msg;
break;

case"10804":
r.err("摘要不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s=e.msg;
break;

case"10806":
r.err("正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。"),s=e.msg;
break;

case"-20000":
r.err("登录态超时，请重新登录。");
break;

case"64513":
r.err("封面必须存在正文中，请检查封面");
break;

case"64514":
r.err("你没有权限使用话题卡片功能");
break;

case"64551":
r.err("请检查图文消息中的微视链接后重试。");
break;

case"64552":
r.err("请检查阅读原文中的链接后重试。");
break;

case"64553":
r.err("请不要在图文消息中插入超过5张卡券。请删减卡券后重试。");
break;

case"64554":
r.err("在当前情况下不允许在图文消息中插入卡券，请删除卡券后重试。");
break;

case"64555":
r.err("请检查图文消息卡片跳转的链接后重试。");
break;

case"15801":
case"15802":
case"15803":
case"15804":
case"15805":
case"15806":
case"1530503":
case"1530504":
break;

default:
r.err("保存失败");
}
n&&n(s,e.ret);
}
});
},
preview:function(e,a,t,i,n){
s.post({
url:wx.url("/cgi-bin/operate_appmsg?sub=preview&t=ajax-appmsg-preview&type=%s".sprintf(a)),
data:t,
dataType:"json",
rtDesc:{
ret_R:"string"
},
error:function(){
r.err("发送失败，请稍后重试"),n&&n();
}
},function(e){
if("0"==e.ret)r.suc("发送预览成功，请留意你的手机微信"),i&&i(e);else{
switch(e.ret){
case"64501":
e.word="你输入的帐号不存在，请重新输入";
break;

case"64502":
e.word="你输入的微信号不存在，请重新输入";
break;

case"10700":
case"64503":
e.word="1.接收预览消息的微信尚未关注公众号，请先扫码关注<br /> 2.如果已经关注公众号，请查看微信的隐私设置（在手机微信的“我->设置->隐私”中），并开启“通过QQ号搜索到我“或者“可通过手机号搜索到我”";
break;

case"64510":
e.word="内容不能包含语音,请调整";
break;

case"64511":
e.word="内容不能包含多个语音,请调整";
break;

case"64512":
e.word="文章中语音错误,请使用语音添加按钮重新添加。";
break;

case"64550":
e.word="请勿插入不合法的已群发的图文消息链接";
break;

case"10703":
e.word="对方关闭了接收消息";
break;

case"10701":
e.word="用户已被加入黑名单，无法向其发送消息";
break;

case"10704":
case"10705":
e.word="该素材已被删除";
break;

case"64504":
e.word="保存图文消息发送错误，请稍后再试";
break;

case"64505":
e.word="发送预览失败，请稍后再试";
break;

case"64507":
e.word="内容不能包含链接，请调整";
break;

case"-99":
e.word="内容超出字数，请调整";
break;

case"62752":
e.word="可能含有具备安全风险的链接，请检查";
break;

case"10801":
e.word="标题不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",e.antispam=!0;
break;

case"10802":
e.word="作者不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",e.antispam=!0;
break;

case"10803":
e.word="敏感链接，请重新添加。",e.antispam=!0;
break;

case"10804":
e.word="摘要不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",e.antispam=!0;
break;

case"10806":
e.word="正文不能有违反公众平台协议、相关法律法规和政策的内容，请重新编辑。",e.antispam=!0;
break;

case"10807":
e.word="内容不能违反公众平台协议、相关法律法规和政策，请重新编辑。",e.antispam=!0;
break;

case"-8":
case"-6":
e.ret="-6",e.word="请输入验证码";
break;

case"15801":
case"15802":
case"15803":
case"15804":
case"15805":
case"15806":
break;

default:
e.word="系统繁忙，请稍后重试";
}
15==a&&r.err(e.word),n&&n(e);
}
});
},
getList:function(e,i,n,c,o,p){
var b="";
b=wx.url(o?"/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&query=%s&f=json".sprintf(e,i,n,o):"/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&f=json".sprintf(e,i,n)),
0==p?b=wx.url("/cgi-bin/appmsg?type=%s&action=list&begin=%s&count=%s&f=json".sprintf(e,i,n)):1==p&&(b=wx.url("/cgi-bin/video_mgr?type=%s&action=get_video_list&begin=%s&offset=%s&f=json".sprintf(e,i,n))),
s.get({
mask:!1,
url:b,
rtDesc:$.extend({},a,{
app_msg_info:$.extend({},t,{
item_R:[],
search_cnt:"number"
})
}),
error:function(){
r.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?c&&c(e.app_msg_info):r.err("获取列表失败");
});
},
getSingleList:function(e,a,t,i){
s.get({
mask:!1,
url:wx.url("/cgi-bin/appmsg?type=%s&action=for_advert&begin=%s&count=%s&f=json".sprintf(e,a,t)),
error:function(){
r.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?i&&i(e.app_msg_info):r.err("获取列表失败");
});
}
},n={
save:function(e,a,t){
var i=wx.url("/cgi-bin/operate_vote");
e.ajax=1,s.post({
url:i,
data:e,
error:function(){
r.err("保存失败"),t&&t();
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?(r.suc("保存成功"),a&&a(e)):(r.err("保存失败"),t&&t(e));
});
}
};
return{
rename:function(e,a,t){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=rename&t=ajax-response"),
data:{
fileid:e,
fileName:a
},
error:function(){
r.err("重命名失败");
}
},function(e){
if(!e||!e.base_resp)return void r.err("重命名失败");
var s=e.base_resp.ret;
if("0"==s)r.suc("重命名成功"),t&&t(e);else switch(s){
case"200002":
r.err("素材名不能包含空格");
break;

default:
r.err("重命名失败");
}
});
},
del:function(e,a){
s.post({
mask:!1,
url:wx.url("/cgi-bin/modifyfile?oper=del&t=ajax-response"),
data:{
fileid:e
},
error:function(){
r.err("删除失败");
}
},function(e){
return e&&e.base_resp?void("0"==e.base_resp.ret?(r.suc("删除成功"),a&&a(e)):r.err("删除失败")):void r.err("删除失败");
});
},
getList:function(e,i,n,c){
s.get({
mask:!1,
url:wx.url("/cgi-bin/filepage?type=%s&begin=%s&count=%s&f=json".sprintf(e,i,n)),
rtDesc:$.extend({},a,{
page_info_R:$.extend({},t,{
file_item_R:[{
file_id_R:"number",
name_R:"string",
size_R:"string",
update_time_R:"number",
type_R:"number"
}]
})
}),
error:function(){
r.err("获取列表失败");
}
},function(e){
e&&e.base_resp&&0==e.base_resp.ret?c&&c(e.page_info):r.err("获取列表失败");
});
},
appmsg:i,
vote:n
};
});define("biz_web/lib/store.js", [ "biz_web/lib/json.js" ], function(e, t, n) {
try {
var r = +(new Date), i = e("biz_web/lib/json.js"), s = {}, o = window.document, u = "localStorage", a = "__storejs__", f;
s.disabled = !1, s.set = function(e, t) {}, s.get = function(e) {}, s.remove = function(e) {}, s.clear = function() {}, s.transact = function(e, t, n) {
var r = s.get(e);
n == null && (n = t, t = null), typeof r == "undefined" && (r = t || {}), n(r), s.set(e, r);
}, s.getAll = function() {}, s.serialize = function(e) {
return i.stringify2(e);
}, s.deserialize = function(e) {
if (typeof e != "string") return undefined;
try {
return i.parse(e);
} catch (t) {
return e || undefined;
}
};
function l() {
try {
return u in window && window[u];
} catch (e) {
return !1;
}
}
if (l()) f = window[u], s.set = function(e, t) {
if (t === undefined) return s.remove(e);
try {
f.setItem(e, s.serialize(t));
} catch (n) {
f.clear(), f.setItem(e, s.serialize(t));
}
return t;
}, s.get = function(e) {
return s.deserialize(f.getItem(e));
}, s.remove = function(e) {
f.removeItem(e);
}, s.clear = function() {
f.clear();
}, s.getAll = function() {
var e = {};
for (var t = 0; t < f.length; ++t) {
var n = f.key(t);
e[n] = s.get(n);
}
return e;
}; else if (o.documentElement.addBehavior) {
var c, h;
try {
h = new ActiveXObject("htmlfile"), h.open(), h.write('<script>document.w=window</script><iframe src="/favicon.ico"></iframe>'), h.close(), c = h.w.frames[0].document, f = c.createElement("div");
} catch (p) {
f = o.createElement("div"), c = o.body;
}
function d(e) {
return function() {
var t = Array.prototype.slice.call(arguments, 0);
t.unshift(f), c.appendChild(f), f.addBehavior("#default#userData"), f.load(u);
var n = e.apply(s, t);
return c.removeChild(f), n;
};
}
var v = new RegExp("[!\"#$%&'()*+,/\\\\:;<=>?@[\\]^`{|}~]", "g");
function m(e) {
return e.replace(v, "___");
}
s.set = d(function(e, t, n) {
return t = m(t), n === undefined ? s.remove(t) : (e.setAttribute(t, s.serialize(n)), e.save(u), n);
}), s.get = d(function(e, t) {
return t = m(t), s.deserialize(e.getAttribute(t));
}), s.remove = d(function(e, t) {
t = m(t), e.removeAttribute(t), e.save(u);
}), s.clear = d(function(e) {
var t = e.XMLDocument.documentElement.attributes;
e.load(u);
for (var n = 0, r; r = t[n]; n++) e.removeAttribute(r.name);
e.save(u);
}), s.getAll = d(function(e) {
var t = e.XMLDocument.documentElement.attributes, n = {};
for (var r = 0, i; i = t[r]; ++r) {
var o = m(i.name);
n[i.name] = s.deserialize(e.getAttribute(o));
}
return n;
});
}
try {
s.set(a, a), s.get(a) != a && (s.disabled = !0), s.remove(a);
} catch (p) {
s.disabled = !0;
}
s.enabled = !s.disabled, n.exports = s;
} catch (p) {
wx.jslog({
src: "biz_web/lib/store.js"
}, p);
}
});define("common/wx/time.js",[],function(){
"use strict";
function e(e){
var t=new Date(1e3*e),r=new Date,g=t.getTime(),a=r.getTime(),u=864e5;
return u>a-g&&r.getDate()==t.getDate()?"%s:%s".sprintf(n(t.getHours()),n(t.getMinutes())):2*u>a-g&&new Date(1*t+u).getDate()==r.getDate()?"昨天 %s:%s".sprintf(n(t.getHours()),n(t.getMinutes())):6*u>=a-g?"%s %s:%s".sprintf(s[t.getDay()],n(t.getHours()),n(t.getMinutes())):t.getFullYear()==r.getFullYear()?"%s月%s日".sprintf(n(t.getMonth()+1),n(t.getDate())):"%s年%s月%s日".sprintf(t.getFullYear(),n(t.getMonth()+1),n(t.getDate()));
}
function t(e){
var t=new Date(1e3*e);
return"%s-%s-%s %s:%s:%s".sprintf(t.getFullYear(),n(t.getMonth()+1),n(t.getDate()),n(t.getHours()),n(t.getMinutes()),n(t.getSeconds()));
}
function r(e,t){
var r=["日","一","二","三","四","五","六"],n=t.replace(/yyyy|YYYY/,e.getFullYear()).replace(/yy|YY/,g(e.getFullYear()%100,2)).replace(/mm|MM/,g(e.getMonth()+1,2)).replace(/m|M/g,e.getMonth()+1).replace(/dd|DD/,g(e.getDate(),2)).replace(/d|D/g,e.getDate()).replace(/hh|HH/,g(e.getHours(),2)).replace(/h|H/g,e.getHours()).replace(/ii|II/,g(e.getMinutes(),2)).replace(/i|I/g,e.getMinutes()).replace(/ss|SS/,g(e.getSeconds(),2)).replace(/s|S/g,e.getSeconds()).replace(/w/g,e.getDay()).replace(/W/g,r[e.getDay()]);
return n;
}
function g(e,t){
for(var r=0,g=t-(e+"").length;g>r;r++)e="0"+e;
return e+"";
}
var n=function(e){
return e+="",e.length>=2?e:"0"+e;
},s=["星期日","星期一","星期二","星期三","星期四","星期五","星期六"];
return{
timeFormat:e,
getFullTime:t,
formatDate:r
};
});define("common/qq/events.js",[],function(t,n,a){
"use strict";
function i(t){
this.data=t===!0?window.wx.events||{}:{};
}
i.prototype={
on:function(t,n){
return this.data[t]=this.data[t]||[],this.data[t].push(n),this;
},
off:function(t,n){
return this.data[t]&&this.data[t].length>0&&(n&&"function"==typeof n?$.each(this.data[t],function(a,i){
i===n&&this.data[t].splice(a,1);
}):this.data[t]=[]),this;
},
trigger:function(t){
var n=arguments;
return this.data[t]&&this.data[t].length>0&&$.each(this.data[t],function(t,a){
var i=a.apply(this,Array.prototype.slice.call(n,1));
return i===!1?!1:void 0;
}),this;
}
},a.exports=function(t){
return new i(t);
};
});define("tpl/tooltip.html.js", [], function(e, t, n) {
return '<div class="tooltip">\n    <div class="tooltip_inner">{content}</div>\n    <i class="tooltip_arrow"></i>\n</div>\n';
});define("common/wx/mpEditor/plugin/remoteimg.js",[],function(require,exports,module){
"use strict";
function Remoteimg(t){
this.init(t),this.addEvent();
}
var g={
defaultRemoteImg:"http://mmbiz.qpic.cn/mmbiz/G1lssUsxJOsVVJNUIuKfUP7bLm5EVWxXl5znicMum6Os0CMJHPdeHicicZ4W5MGOVa8ooSXYuE61Ek/0"
};
return Remoteimg.prototype.init=function(t){
var e=this;
this.uploadUrl=(~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"")+"/cgi-bin/filetransfer?action=upload_material&f=json&scene=8&writetype=doublewrite&groupid=3&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time,
this.uploadUrl=wx.url(this.uploadUrl),this.mpeditor=t,this.editor=t.getUeditor(),
this.domUtils=UE.dom.domUtils,this.ajax=UE.ajax,this.localDomain=["127.0.0.1","localhost","mmbiz.qpic.cn","mmbiz.qlogo.cn","m.qpic.cn",/^http\:\/\/(a|b)(\d)+\.photo\.store\.qq\.com/g,"mmsns.qpic.cn"],
this.catcherUrl=this.editor.options.catcherUrl,this.catchFieldName="imgurl",this.separater="ue_separate_ue",
this.id=+new Date,this.remoteList={},this.Blob_obj_support=function(){
try{
return!!window.Blob&&Boolean(new Blob);
}catch(t){
return!1;
}
}(),this.BlobBuilder=window.BlobBuilder||window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder,
this.dataURLtoBlobSupport=function(){
return(e.BlobBuilder||e.Blob_obj_support)&&window.atob&&window.ArrayBuffer&&window.Uint8Array?!0:!1;
}(),this.Blob_Uint8Array_support=function(){
try{
return!!e.Blob_obj_support&&!!window.Uint8Array&&100===new Blob([new Uint8Array(100)]).size;
}catch(t){
return!1;
}
}();
},Remoteimg.prototype.addEvent=function(){
var _t=this,me=this.editor,mpeditor=this.mpeditor;
me.addListener("onpasting",function(t,e){
var r=null,i=e.clipboardData?e.clipboardData:e.originalEvent&&e.originalEvent.clipboardData?e.originalEvent.clipboardData:{},o=i.items;
if(o&&1==o.length)for(var a=0;a<o.length;a++)if(/image/i.test(o[a].type)){
r=o[a].getAsFile();
break;
}
var m=!1;
if(null!==r&&(m=_t.filterImgSize(r)),null!==r&&m!==!0)return _t.pasteImageError({
msg:m.msg?m.msg:"图片粘贴失败",
dom:null
}),!0;
if(null!==r&&m===!0){
var n,s=r.type.split("/")[1]||"";
if(n=me.window.URL||me.window.webkitURL){
var c=n.createObjectURL(r);
if("string"==typeof c)return _t.pasteImageInserted({
image:c,
blob:r,
type:s
}),!0;
}
if("function"!=typeof FileReader)return!1;
var u=new FileReader;
return u.onload=function(t){
t.target&&2==t.target.readyState&&_t.pasteImageInserted({
image:t.target.result,
blob:r,
type:s
});
},u.readAsDataURL(r),!0;
}
}),me.addListener("afterpaste aftersetcontent",function(t,e,r){
for(var i,o,a,m,n=[],s=0;m=r[s++];)if(m.tagName){
i="img"==m.tagName.toLowerCase()?[m]:_t.domUtils.getElementsByTagName(m,"img");
for(var c,u=0;c=i[u++];)if(_t.handleDataSrc(c),_t.http2https("img",c),a=c.getAttribute("_src")||c.src||"",
/^(https?|ftp):/i.test(a)&&!_t.isLocalDomain(a))me.fireEvent("catchRemoteImage",c,"img",a);else if(/^data:image/i.test(a)){
var d=_t.dataURLtoBlob(a),l=!1;
if(d&&!_t.validImg(d)&&(d=null),d)if(l=_t.filterImgSize(d),l===!0){
var p=d.type.split("/")[1]||"";
_t.uploadPasteImg({
image:a,
blob:d,
dom:c,
type:p
});
}else _t.pasteImageError({
msg:l.msg?l.msg:"图片粘贴失败",
dom:c
});
}
for(n=[m],n.push.apply(n,_t.domUtils.getElementsByTagName(m,"*")),u=0;c=n[u++];)if(o=c.getAttribute("style")||c.style.cssText||"",
o=o.match(/;?\s*(background|background-image)\s*\:[^;]*?url\(([^\)]+)\)/),o&&o[2]){
a=o[2].replace(/^['"]|['"]$/g,"");
var f=_t.http2https("bg",c,a);
a=f&&f.url?f.url:a,/^(https?|ftp):/i.test(a)&&!_t.isLocalDomain(a)&&me.fireEvent("catchRemoteImage",c,"bg",a);
}
for(u=0;c=n[u++];)c.style&&(c.style.borderImage="",c.style.borderImageSource="");
}
}),me.addListener("catchRemoteImage",function(cmd,ci,type,url){
var remoteObj;
_t.domUtils.removeClasses(ci,"js_catchingremoteimage");
var curArticle=me.fireEvent("get_current_article");
if(curArticle){
var uid=ci.getAttribute("data-remoteid");
if(!uid||!_t.remoteList[uid]){
"bg"==type?me.fireEvent("funcPvUvReport","remoteimg_style"):"img"==type&&me.fireEvent("funcPvUvReport","remoteimg_img"),
uid||(uid="c"+_t.getuid());
var remoteObj=_t.remoteList[uid]={
article:curArticle,
oldUrl:url,
uid:uid,
type:type,
defaultRemoteImg:g.defaultRemoteImg
};
_t.domUtils.addClass(ci,"js_catchingremoteimage"),_t.domUtils.setAttributes(ci,{
"data-remoteid":uid
}),_t.catchremoteimage([url],{
success:function(xhr){
!!_t.remoteList[uid]&&delete _t.remoteList[uid];
try{
var info=eval("("+xhr.responseText+")");
}catch(e){
return me.fireEvent("funcPvUvReport","remoteimgerr"),me.fireEvent("catchremoteerror",remoteObj,""),
void _t.checkRemoteList(!0);
}
info&&0==info.errcode&&info.url?(me.fireEvent("funcPvUvReport","remoteimgsuc"),me.fireEvent("catchremotesuccess",remoteObj,info.url,info.img_format)):(me.fireEvent("funcPvUvReport","remoteimgerr"),
me.fireEvent("catchremoteerror",remoteObj,"")),_t.checkRemoteList(!0);
},
error:function(){
!!_t.remoteList[uid]&&delete _t.remoteList[uid],me.fireEvent("funcPvUvReport","remoteimgerr"),
me.fireEvent("catchremoteerror",remoteObj,""),_t.checkRemoteList(!0);
}
});
}
}
}),me.addListener("checkRemoteList",function(t,e){
return _t.checkRemoteList(e===!0?!0:!1);
}),me.addListener("getRemoteList",function(){
return _t.remoteList;
});
},Remoteimg.prototype.pasteImageError=function(t){
var e=this.editor;
if(!t.dom)return void e.fireEvent("catchremoteerror",null,t.msg||"");
var r=e.fireEvent("get_current_article");
if(r){
var i=t.dom.getAttribute("data-remoteid");
i||(i="p_"+this.getuid()),this.domUtils.setAttributes(t.dom,{
"data-remoteid":i
});
var o={
article:r,
uid:i,
type:"img",
defaultRemoteImg:g.defaultRemoteImg
};
e.fireEvent("catchremoteerror",o,t.msg||"");
}
},Remoteimg.prototype.pasteImageInserted=function(t){
var e=this,r=this.editor,i=r.fireEvent("insertMaterialImg",[{
format:t.type,
src:t.image
}]);
t.dom=i[0],e.uploadPasteImg(t);
},Remoteimg.prototype.dataURLtoBlob=function(t){
if(!this.dataURLtoBlobSupport)return!1;
try{
var e,r=t.split(",");
e=r[0].indexOf("base64")>=0?window.atob(r[1]):decodeURIComponent(r[1]);
for(var i=new ArrayBuffer(e.length),o=new Uint8Array(i),a=0,m=e.length;m>a;a++)o[a]=e.charCodeAt(a);
var n=r[0].split(":")[1].split(";")[0];
if(this.Blob_obj_support)return this.Blob_Uint8Array_support?new Blob([o],{
type:n
}):new Blob([i],{
type:n
});
var s=new BlobBuilder;
return s.append(i),s.getBlob(n);
}catch(c){
return!1;
}
},Remoteimg.prototype.uploadPasteImg=function(opt){
if("function"!=typeof FormData)return!1;
var _t=this,me=this.editor,curArticle=me.fireEvent("get_current_article");
if(curArticle){
var form=new FormData,extensions=opt.blob.type.split("/")[1]||"",id=this.getuid(),url=this.uploadUrl+"&seq="+id,filename="粘贴图片_"+this.formatDate(new Date,"YYYYMMDDHHIISS")+(extensions?"."+extensions:""),uid=opt.dom.getAttribute("data-remoteid");
if(!uid||!_t.remoteList[uid]){
uid||(uid="p_"+id);
var remoteObj=_t.remoteList[uid]={
article:curArticle,
uid:uid,
type:"img",
defaultRemoteImg:g.defaultRemoteImg
};
_t.domUtils.setAttributes(opt.dom,{
"data-remoteid":uid
}),form.append("id",id),form.append("name",filename),form.append("type",opt.blob.type),
form.append("lastModifiedDate",new Date),form.append("size",opt.blob.size),form.append("file",opt.blob,filename);
var xhr=new XMLHttpRequest;
xhr.addEventListener("error",function(){
!!_t.remoteList[uid]&&delete _t.remoteList[uid],_t.checkRemoteList(!0);
}),xhr.addEventListener("readystatechange",function(error){
if(4===xhr.readyState)if(xhr.upload.onprogress=null,xhr.onreadystatechange=null,
!!_t.remoteList[uid]&&delete _t.remoteList[uid],xhr.status>=200&&xhr.status<300){
try{
var info=eval("("+xhr.responseText+")");
}catch(e){
return me.fireEvent("funcPvUvReport","screen_shot_fail"),me.fireEvent("catchremoteerror",remoteObj,""),
void _t.checkRemoteList(!0);
}
if(info&&info.base_resp&&0==info.base_resp.ret&&info.cdn_url){
var cdnUrl=info.cdn_url.http2https();
me.fireEvent("funcPvUvReport","screen_shot_suc"),me.fireEvent("catchremotesuccess",remoteObj,cdnUrl,extensions);
}else me.fireEvent("funcPvUvReport","screen_shot_fail"),me.fireEvent("catchremoteerror",remoteObj,"");
_t.checkRemoteList(!0);
}else me.fireEvent("funcPvUvReport","screen_shot_fail"),me.fireEvent("catchremoteerror",remoteObj,""),
_t.checkRemoteList(!0);
}),xhr.open("POST",url),xhr.send(form);
}
}
},Remoteimg.prototype.validImg=function(t){
return t.size<1024?!1:!0;
},Remoteimg.prototype.filterImgSize=function(t){
var e=5242880,r=",bmp,png,jpeg,jpg,gif,",i=","+(t.type.split("/")[1]||"")+",";
return t.size>e?{
type:1,
msg:"截图的图片大小不能超过5M"
}:-1==r.indexOf(i)?{
type:2,
msg:"截图的图片必须为以下格式：bmp,png,jpeg,jpg,gif"
}:!0;
},Remoteimg.prototype.checkRemoteList=function(t){
var e=0;
for(var r in this.remoteList)this.remoteList.hasOwnProperty(r)&&e++;
return e>0?!1:(!!t&&this.editor.fireEvent("remoteimg_all_complete"),!0);
},Remoteimg.prototype.handleDataSrc=function(t){
var e=t.getAttribute("src")||"",r=t.getAttribute("data-src")||"";
/^data:image/i.test(e)&&(/^http:\/\/mmbiz\.qpic\.cn/.test(r)||/^https:\/\/mmbiz\.qlogo\.cn/.test(r))&&(t.setAttribute("src",r),
t.removeAttribute("data-src"));
},Remoteimg.prototype.http2https=function(t,e,r){
if("img"==t){
var i=e.getAttribute("src")||"";
if(!/^http:\/\/mmbiz\.qpic\.cn/.test(i))return;
var o=this.formatUrl(i);
return e.setAttribute("src",o.url),!!o.format&&e.setAttribute("data-type",o.format),
e.removeAttribute("_src"),e.removeAttribute("data-src"),o;
}
if("bg"==t&&r&&/^http:\/\/mmbiz.qpic.cn/.test(r)){
var o=this.formatUrl(r);
return e.style.backgroundImage=o.url,o;
}
return null;
},Remoteimg.prototype.formatUrl=function(t){
t=t||"";
var e=t.match(/[?|&]wx_fmt=(.*?)[&|$]/)||[];
return e=e[1]||"",t=t.http2https().replace(/\?.*$/,"?"),e&&t&&(t=t+"wx_fmt="+e),
{
url:t,
format:e
};
},Remoteimg.prototype.catchremoteimage=function(t,e){
var r=t.join(this.separater),i=(this.editor,{
timeout:6e4,
onsuccess:function(){
"function"==typeof e.success&&e.success.apply(this,arguments);
},
onerror:function(){
"function"==typeof e.error&&e.error.apply(this,arguments);
}
});
try{
var o=decodeURIComponent(r);
i[this.catchFieldName]=encodeURI(o);
}catch(a){
i[this.catchFieldName]=r;
}
i.t="ajax-editor-upload-img";
var m=this;
setTimeout(function(){
m.ajax.request(m.catcherUrl,i);
},2e3);
},Remoteimg.prototype.getuid=function(){
return this.id++;
},Remoteimg.isLocalDomain=Remoteimg.prototype.isLocalDomain=function(t){
for(var e,r=[/^http(s)?:\/\/mmbiz\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmbiz\.qlogo\.cn([\/?].*)*$/i,/^http(s)?:\/\/m\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mmsns\.qpic\.cn([\/?].*)*$/i,/^http(s)?:\/\/mp\.weixin\.qq\.com([\/?].*)*$/i,/^http(s)?:\/\/(a|b)(\d)+\.photo\.store\.qq\.com([\/?].*)*$/i],i=0;e=r[i++];)if(e.test(t))return!0;
return!1;
},Remoteimg.prototype.formatDate=function(t,e){
var r=e.replace(/yyyy|YYYY/,t.getFullYear()).replace(/yy|YY/,this.addZero(t.getFullYear()%100,2)).replace(/mm|MM/,this.addZero(t.getMonth()+1,2)).replace(/m|M/g,t.getMonth()+1).replace(/dd|DD/,this.addZero(t.getDate(),2)).replace(/d|D/g,t.getDate()).replace(/hh|HH/,this.addZero(t.getHours(),2)).replace(/h|H/g,t.getHours()).replace(/ii|II/,this.addZero(t.getMinutes(),2)).replace(/i|I/g,t.getMinutes()).replace(/ss|SS/,this.addZero(t.getSeconds(),2)).replace(/s|S/g,t.getSeconds());
return r;
},Remoteimg.prototype.addZero=function(t,e){
for(var r=0,i=e-(t+"").length;i>r;r++)t="0"+t;
return t+"";
},Remoteimg;
});