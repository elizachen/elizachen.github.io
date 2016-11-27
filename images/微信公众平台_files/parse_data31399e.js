define("common/wx/mpEditor/plugin/popup.js",[],function(){
"use strict";
function t(t){
this.mpeditor=t,this.editor=t.getUeditor(),this.uiUtils=baidu.editor.ui.uiUtils,
this.domUtils=UE.dom.domUtils,this.init(),this.addEvent();
}
return t.prototype.init=function(){
var t=this,e=t.editor,i=t.mpeditor;
this.popup=new baidu.editor.ui.Popup({
editor:e,
content:"",
className:"edui-bubble",
_execCommand:function(){
e.execCommand.apply(e,arguments),t.showpopup();
},
_execCommandAndHide:function(){
e.execCommand.apply(e,arguments),this.hide();
},
_delRange:function(){
e.fireEvent("saveScene");
var t=$(this._anchorEl),o=t.parent("a");
o.length>0&&(t=o),e.selection.getRange().collapse(!1),t.remove(),this.hide(),e.focus(),
e.fireEvent("saveScene"),i.funcPvUvReport("del_img");
},
_imgAutoWidth:function(t){
e.fireEvent("saveScene");
var o=$(this.getDom("content")),n=o.find(".js_adapt"),p=o.find(".js_canceladapt");
t===!0?(this._anchorEl.style.width="100%",n.hide(),p.show(),i.funcPvUvReport("autowidth")):(this._anchorEl.style.width="auto",
n.show(),p.hide(),i.funcPvUvReport("cancel_autowidth")),this._anchorEl.style.height="auto",
e.focus(),e.fireEvent("saveScene");
},
getHtmlTpl:function(){
return'<div id="##" class="edui-popup edui_mask_edit_bar %%"> <div id="##_body" class="edui-popup-body"> <iframe style="position:absolute;z-index:-1;left:0;top:0;background-color: transparent;" frameborder="0" width="100%" height="100%" src="javascript:"></iframe> <div class="edui-shadow"></div> <div id="##_content" class="edui-popup-content">'+this.getContentHtmlTpl()+"  </div> </div></div>";
},
showAnchorRect:function(e){
this._doAutoRender();
var i=t.uiUtils.getViewportRect();
this._show();
var o,n,p,d,s=this.fitSize(),r=t.uiUtils.getClientRect(this._anchorEl);
if(o=this.canSideLeft&&r.right+s.width>i.right&&r.left>s.width,n=this.canSideUp&&r.top+s.height>i.bottom&&r.bottom>s.height,
p=o?r.right-s.width:r.left,d=n?r.top-s.height:r.bottom,e){
var h=$(".js_main_title").height(),a=$(".edui-editor-toolbarbox").height();
d=Math.max(r.top,i.top+h+a);
}
var u=this.getDom();
t.uiUtils.setViewportOffset(u,{
left:p,
top:d
}),this.editor&&(u.style.zIndex=1*this.editor.container.style.zIndex+10,t.uiUtils.getFixedLayer().style.zIndex=u.style.zIndex-1);
},
queryAutoHide:function(i){
return i&&i.ownerDocument==e.document&&("img"==i.tagName.toLowerCase()||t.domUtils.findParentByTagName(i,"a",!0))?i!==t.popup.anchorEl:baidu.editor.ui.Popup.prototype.queryAutoHide.call(this,i);
}
}),this.popup.render();
},t.prototype.addEvent=function(){
var t=this,e=t.editor;
e.addListener("selectionchange",function(e,i){
i&&t.showpopup();
}),e.addListener("hide_common_popup",function(){
t.popup.hide();
});
},t.prototype.showpopup=function(){
var t={
html:"",
node:null
},e=this,i=e.editor;
if(i.fireEvent("handle_common_popup",t),t.html&&t.node){
e.popup.getDom("content").innerHTML=e.popup.formatHtml(t.html);
var o=$(t.node).find("img");
o.length>0&&(t.node=o[0]),e.popup._anchorEl=t.node,/^img$/i.test(t.node.tagName)?e.popup.showAnchorRect(!0):e.popup.showAnchorRect(),
/js_img_popup/i.test(t.html)&&i.fireEvent("funcPvUvReport","img_popup"),/js_link_popup/i.test(t.html)&&i.fireEvent("funcPvUvReport","link_popup");
}else e.popup.hide();
},t;
});define("common/wx/mpEditor/contextmenu.js",["common/wx/mpEditor/zh_CN.js"],function(e){
"use strict";
e("common/wx/mpEditor/zh_CN.js");
var t=baidu.editor.browser,l=UE.I18N.zh_CN.contextMenu,a=[{
label:l.selectall,
cmdName:"selectall"
},{
label:l.cleardoc,
cmdName:"cleardoc",
exec:function(){
confirm(l.confirmclear)&&this.execCommand("cleardoc");
}
},"-",{
group:l.paragraph,
icon:"justifyjustify",
subMenu:[{
label:l.justifyleft,
cmdName:"justify",
value:"left"
},{
label:l.justifyright,
cmdName:"justify",
value:"right"
},{
label:l.justifycenter,
cmdName:"justify",
value:"center"
},{
label:l.justifyjustify,
cmdName:"justify",
value:"justify"
}]
},"-",{
group:l.table,
icon:"table",
subMenu:[{
label:l.inserttable,
cmdName:"inserttable"
},{
label:l.deletetable,
cmdName:"deletetable"
},"-",{
label:l.deleterow,
cmdName:"deleterow"
},{
label:l.deletecol,
cmdName:"deletecol"
},{
label:l.insertcol,
cmdName:"insertcol"
},{
label:l.insertcolnext,
cmdName:"insertcolnext"
},{
label:l.insertrow,
cmdName:"insertrow"
},{
label:l.insertrownext,
cmdName:"insertrownext"
},"-",{
label:l.insertcaption,
cmdName:"insertcaption"
},{
label:l.deletecaption,
cmdName:"deletecaption"
},{
label:l.inserttitle,
cmdName:"inserttitle"
},{
label:l.deletetitle,
cmdName:"deletetitle"
},"-",{
label:l.mergecells,
cmdName:"mergecells"
},{
label:l.mergeright,
cmdName:"mergeright"
},{
label:l.mergedown,
cmdName:"mergedown"
},"-",{
label:l.splittorows,
cmdName:"splittorows"
},{
label:l.splittocols,
cmdName:"splittocols"
},{
label:l.splittocells,
cmdName:"splittocells"
},"-",{
label:l.averageDiseRow,
cmdName:"averagedistributerow"
},{
label:l.averageDisCol,
cmdName:"averagedistributecol"
},"-",{
label:l.edittd,
cmdName:"edittd",
exec:function(){
UE.ui.edittd&&new UE.ui.edittd(this),this.getDialog("edittd").open();
}
},{
label:l.edittable,
cmdName:"edittable",
exec:function(){
UE.ui.edittable&&new UE.ui.edittable(this),this.getDialog("edittable").open();
}
}]
},{
group:l.tablesort,
icon:"tablesort",
subMenu:[{
label:l.reversecurrent,
cmdName:"sorttable",
value:1
},{
label:l.orderbyasc,
cmdName:"sorttable"
},{
label:l.reversebyasc,
cmdName:"sorttable",
exec:function(){
this.execCommand("sorttable",function(e,t){
var l=e.innerHTML,a=t.innerHTML;
return a.localeCompare(l);
});
}
},{
label:l.orderbynum,
cmdName:"sorttable",
exec:function(){
this.execCommand("sorttable",function(e,l){
var a=e[t.ie?"innerText":"textContent"].match(/\d+/),n=l[t.ie?"innerText":"textContent"].match(/\d+/);
return a&&(a=+a[0]),n&&(n=+n[0]),(a||0)-(n||0);
});
}
},{
label:l.reversebynum,
cmdName:"sorttable",
exec:function(){
this.execCommand("sorttable",function(e,l){
var a=e[t.ie?"innerText":"textContent"].match(/\d+/),n=l[t.ie?"innerText":"textContent"].match(/\d+/);
return a&&(a=+a[0]),n&&(n=+n[0]),(n||0)-(a||0);
});
}
}]
},{
group:l.borderbk,
icon:"borderBack",
subMenu:[{
label:l.setcolor,
cmdName:"interlacetable",
exec:function(){
this.execCommand("interlacetable");
}
},{
label:l.unsetcolor,
cmdName:"uninterlacetable",
exec:function(){
this.execCommand("uninterlacetable");
}
},{
label:l.setbackground,
cmdName:"settablebackground",
exec:function(){
this.execCommand("settablebackground",{
repeat:!0,
colorList:["#bbb","#ccc"]
});
}
},{
label:l.unsetbackground,
cmdName:"cleartablebackground",
exec:function(){
this.execCommand("cleartablebackground");
}
},{
label:l.redandblue,
cmdName:"settablebackground",
exec:function(){
this.execCommand("settablebackground",{
repeat:!0,
colorList:["red","blue"]
});
}
},{
label:l.threecolorgradient,
cmdName:"settablebackground",
exec:function(){
this.execCommand("settablebackground",{
repeat:!0,
colorList:["#aaa","#bbb","#ccc"]
});
}
}]
},{
group:l.aligntd,
icon:"aligntd",
subMenu:[{
cmdName:"cellalignment",
value:{
align:"left",
vAlign:"top"
}
},{
cmdName:"cellalignment",
value:{
align:"center",
vAlign:"top"
}
},{
cmdName:"cellalignment",
value:{
align:"right",
vAlign:"top"
}
},{
cmdName:"cellalignment",
value:{
align:"left",
vAlign:"middle"
}
},{
cmdName:"cellalignment",
value:{
align:"center",
vAlign:"middle"
}
},{
cmdName:"cellalignment",
value:{
align:"right",
vAlign:"middle"
}
},{
cmdName:"cellalignment",
value:{
align:"left",
vAlign:"bottom"
}
},{
cmdName:"cellalignment",
value:{
align:"center",
vAlign:"bottom"
}
},{
cmdName:"cellalignment",
value:{
align:"right",
vAlign:"bottom"
}
}]
},{
group:l.aligntable,
icon:"aligntable",
subMenu:[{
cmdName:"tablealignment",
className:"left",
label:l.tableleft,
value:"left"
},{
cmdName:"tablealignment",
className:"center",
label:l.tablecenter,
value:"center"
},{
cmdName:"tablealignment",
className:"right",
label:l.tableright,
value:"right"
}]
},"-",{
label:l.insertparagraphbefore,
cmdName:"insertparagraph",
value:!0
},{
label:l.insertparagraphafter,
cmdName:"insertparagraph"
},{
label:l.copy,
cmdName:"copy",
exec:function(){
alert(l.copymsg);
},
query:function(){
return 0;
}
},{
label:l.paste,
cmdName:"paste",
exec:function(){
alert(l.pastemsg);
},
query:function(){
return 0;
}
}];
return a;
});define("tpl/mpEditor/plugin/topic_layout.html.js",[],function(){
return'<div class="s_table_wrp topic_table with_border">\n    <div class="s_table">\n        <ul class="s_thead">\n            <li class="s_cell s_th topic_thumb_info">话题名称</li>\n            <li class="s_cell s_th tl topic_type">话题类型</li>\n            <li class="s_cell s_th tl topic_author">{type}</li>\n            <li class="s_cell s_th last_child topic_relate_num">相关文章&#40;篇&#41;</li>\n        </ul>\n        <div class="s_tbody" id="js_audiomsg_list">\n            {if loading}\n                <p class="empty_tips">\n                <i class="icon_loading_small white">加载中</i>\n                </p>\n            {else}\n                {if topic_list.length == 0}\n                    <p class="empty_tips">\n                    暂无数据                    </p>\n                {else}\n                    <div style="display:block;">\n                        {each topic_list as item}\n                        <div class="s_row">\n                            <div class="s_cell topic_thumb_info">\n                                <label class="frm_radio_label" for="hello">\n                                    <i class="icon_radio"></i>\n                                    <span class="lbl_content">\n                                        <span class="topic_thumb" style="background-image:url({if item.img_url}{item.img_url}{else}{default_img_url}{/if})"></span>\n                                        <span class="topic_name">{item.title}</span>\n                                    </span>\n                                    <input type="radio" class="frm_radio" value=\'{item.topic_id}\' data-img_url=\'{item.img_url}\' data-title=\'{item.title}\' data-type=\'{item.type}\' data-sn=\'{item.sn}\' data-author=\'{item.author}\' data-msg_num=\'{item.msg_num}\'>\n                                </label>\n                            </div>\n                            <span class="s_cell tl topic_type">\n                                {item.type}\n                            </span>\n                            <span class="s_cell tl topic_author">\n                                {item.author}\n                            </span>\n                            <span class="s_cell last_child topic_relate_num">\n                                {item.msg_num}\n                            </span>\n                        </div>\n                        {/each}\n                    </div>\n                {/if}\n            {/if}\n        </div>\n    </div>\n    <div class="js_pagebar pagination_wrp" id=\'js_pagebar\'></div>\n</div>\n';
});define("tpl/mpEditor/plugin/topic.html.js",[],function(){
return'<div>\n    <div class="media_list_hd global_mod float_layout gap_top">\n        <div class="global_info clear_dib_gap">\n            <!--<span class="js_search_drop in_media_list_hd"></span> -->\n            <!-- <span class="frm_search_type">书籍</span> -->\n            <!-- dropdown容器 -->\n            <div class="dropdown_wrp frm_input_in_box js_topic_drop"></div>\n            <!-- dropdown容器 end -->\n            <span class="frm_input_box search with_del append">\n                <a class="del_btn js_search_del" href="javascript:;"><i class="icon_search_del"></i>&nbsp;</a>\n                <a onclick="return false" href="javascript:;" class="frm_input_append js_search_submit"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input type="text" placeholder="请输入书名或图书ISBN编码" value="" class="frm_input js_search_input">\n            </span>\n        </div>\n        <p class="global_extra gap_top_item tips_global js_tips">\n            书籍数据由亚马逊提供        </p>\n    </div>\n    <input type=\'hidden\' id=\'inputSelectedMusicId\' value= \'\'>\n    <div class="media_list_bd js_pop_content"></div>\n</div>\n';
});define("common/wx/media/videoDialog.js",["common/wx/popup.js","page/smallvideo/dialog_select_video.css","widget/media/media_dialog.css","common/wx/top.js","common/wx/Tips.js","common/wx/media/video.js","common/wx/pagebar.js","common/wx/time.js","media/media_cgi.js","common/wx/Cgi.js","tpl/media/dialog/videomsg_layout.html.js","tpl/media/videocard.html.js"],function(e){
"use strict";
function i(e){
i.counter||(i.counter=1);
var t="number"!=typeof e.retry?1:e.retry,o=document.createElement("script"),n=document.head||document.getElementsByTagName("head")[0]||document.documentElement,d=e.url+"&t="+Math.random(),s=e.callbackName,a="uninitialized",r="undefined"==typeof e.successCode?200:e.successCode,l="undefined"==typeof e.timeoutCode?500:e.timeoutCode,c="undefined"==typeof e.scriptErrorCode?400:e.scriptErrorCode,m=!1,u=null,_=function(i){
o&&!m&&(m=!0,u&&(clearTimeout(u),u=null),o.onload=o.onreadystatechange=o.onerror=null,
n&&o.parentNode&&n.removeChild(o),o=null,s&&-1==s.indexOf(".")&&(window[s]=null),
i!=r&&"loaded"!=a&&"function"==typeof e.onerror&&e.onerror(i));
};
if(s&&"function"==typeof e.callback){
var v=s;
-1==s.indexOf(".")&&(s=window[s]?s+i.counter++:s,window[s]=function(){
a="loaded",e.callback.apply(null,arguments);
}),d=d.replace("="+v,"="+s);
}
o.onload=o.onreadystatechange=function(){
var e=navigator.userAgent.toLowerCase();
(-1!=e.indexOf("opera")||-1==e.indexOf("msie")||/loaded|complete/i.test(this.readyState))&&_("loaded"==a?r:c);
},o.onerror=function(){
return t>0?(e.retry=t-1,u&&(clearTimeout(u),u=null),void i(e)):void _(c);
},e.timeout&&(u=setTimeout(function(){
_(l);
},parseInt(e.timeout,10))),a="loading",o.charset="utf-8",setTimeout(function(){
o.src=d;
try{
n.insertBefore(o,n.lastChild);
}catch(e){}
},0);
}
function t(e){
return e&&e.substr&&"04"==e.substr(1,2)?!0:!1;
}
function o(e,i,t,o){
e=e.replace(/^\s+|\s+$/g,""),e=e.replace(/^http:/,"https:"),e=e.replace(/^v\.qq\.com/,"https://v.qq.com");
var n=t||{};
-1!=e.indexOf("http://v.qq.com")||-1!=e.indexOf("https://v.qq.com")?s(e,i,n,o):/mp\.weixin\.qq\.com\/s/.test(e)?a(e,i):/mp\.weixin\.qq\.com\/mp\/video\?/.test(e)&&r(e,i);
}
function n(e,i){
var i=i||document.location.toString(),t=e+"=",o=i.indexOf(t);
if(-1!=o){
var n=i.indexOf("&",o),d=i.indexOf("?",o);
return-1!=d&&(-1==n||n>d)&&(n=d),d=i.indexOf("#",o),-1!=d&&(-1==n||n>d)&&(n=d),-1==n?i.substring(o+t.length):i.substring(o+t.length,n);
}
return"";
}
function d(e){
e=e||window.location.toString();
var i,t=n("vid",e);
return t||(i=e.match(/\/\w{15}\/(\w+)\.html/))&&(t=i[1]),t||((i=e.match(/\/page\/\w{1}\/\w{1}\/\w{1}\/(\w+)\.html/))?t=i[1]:(i=e.match(/\/(page|play)\/+(\w{11})\.html/))&&(t=i[2])),
t||(i=e.match(/\/boke\/gplay\/\w+_\w+_(\w+)\.html/))&&(t=i[1]),encodeURIComponent(t);
}
function s(e,i,t,o){
var n,s="",a=t.width,r=t.height;
if(n=e.match(new RegExp("(^|&|\\\\?)vid=([^&]*)(&|$|#)")))s=encodeURIComponent(n[2]),
-1!=s.indexOf("_")&&(s=s.split("_")[0]),/[a-zA-Z0-9]{11}/.test(s)||BJ_REPORT.monitor(94,"vid:"+s+";url="+e,39),
t.vid=s,t.return_url="https://v.qq.com/iframe/preview.html?vid="+s+"&width="+a+"&height="+r+"&auto=0",
i(t);else if((n=e.match(new RegExp("(http://)?v\\.qq\\.com/cover[^/]*/\\w+/([^/]*)\\.html")))||(n=e.match(new RegExp("(http://)?v\\.qq\\.com/prev[^/]*/\\w+/([^/]*)\\.html")))){
var l=encodeURIComponent(n[2]),c="https://data.video.qq.com/fcgi-bin/data?tid=554&appid=20001184&appkey=85a707e3a07cc44d&otype=json&idlist="+l,m=document.getElementsByTagName("head")[0],u=document.createElement("script");
u.type="text/javascript",u.src=c,u.async=!0,void 0!==u.onreadystatechange?u.onreadystatechange=function(){
if("loaded"==u.readyState)try{
s=QZOutputJson.results[0].fields.video_ids[0],-1!=s.indexOf("_")&&(s=s.split("_")[0]),
/[a-zA-Z0-9]{11}/.test(s)||BJ_REPORT.monitor(94,"vid:"+s+";url="+e,39),t.vid=s,t.return_url="https://v.qq.com/iframe/preview.html?vid="+s+"&width="+a+"&height="+r+"&auto=0",
i(t);
}catch(o){}
}:u.onload=function(){
try{
s=QZOutputJson.results[0].fields.video_ids[0],-1!=s.indexOf("_")&&(s=s.split("_")[0]),
/[a-zA-Z0-9]{11}/.test(s)||BJ_REPORT.monitor(94,"vid:"+s+";url="+e,39),t.vid=s,t.return_url="https://v.qq.com/iframe/preview.html?vid="+s+"&width="+a+"&height="+r+"&auto=0",
i(t);
}catch(o){}
},m.appendChild(u);
}else s=d(e),""!=s?(-1!=s.indexOf("_")&&(s=s.split("_")[0]),/[a-zA-Z0-9]{11}/.test(s)||BJ_REPORT.monitor(94,"vid:"+s+";url="+e,39),
t.vid=s,t.return_url="https://v.qq.com/iframe/preview.html?vid="+s+"&width="+a+"&height="+r+"&auto=0",
i(t)):!!o&&o(-1);
}
function a(e,i){
g.get({
url:"/cgi-bin/video_mgr?action=get_vid_list&url="+window.encodeURIComponent(e),
success:function(e){
i({
vid:e.vid_list
});
}
});
}
function r(e,i){
var t=e.match(/[\?&]vid\=([^&]*)/);
if(null!=t&&t[1]){
var o=t[1];
i({
vid:o
});
}
}
function l(e){
var t="https://sec.video.qq.com/p/h5vv.video/getextinfo?otype=json&callback=video_static_callback&platform=61001&vid=";
i({
url:t+e.vid,
timeout:3e4,
callbackName:"video_static_callback",
callback:function(i){
if(!i||"o"!=i.s||i.vl.cnt<=0)return void("function"==typeof e.onError&&e.onError());
var t=i.vl.vi[0],o={
title:t.title||"视频",
desc:t.desc||"",
time:t.td||0
};
if(t.pl&&t.pl.cnt>0){
var n=t.pl.pi;
o.p400_300=n[0]?n[0].url:"",o.p140_100=n[1]?n[1].url:"",o.p120_90=n[2]?n[2].url:"",
o.p400_300=o.p400_300&&-1==o.p400_300.indexOf("http")?"http://"+o.p400_300:o.p400_300,
o.p140_100=o.p140_100&&-1==o.p140_100.indexOf("http")?"http://"+o.p140_100:o.p140_100,
o.p120_90=o.p120_90&&-1==o.p120_90.indexOf("http")?"http://"+o.p120_90:o.p120_90;
}
e.onSuc(o);
},
onerror:function(i){
"function"==typeof e.onError&&e.onError(i),wx.jslog({
src:"common/wx/media/videoDialog.js"
},null,52);
},
complete:function(e){
500==e&&wx.jslog({
src:"common/wx/media/videoDialog.js"
},null,52);
}
});
}
function c(e){
e.onSuc();
}
function m(e){
var i="";
if(60>e)10>e&&(e="0"+e),i="00:"+e;else if(e>=60){
var t=Math.floor(e/60),o=(e-60*t)%60;
10>t&&(t="0"+t),10>o&&(o="0"+o),i=t+":"+o;
}
return i;
}
e("common/wx/popup.js"),e("page/smallvideo/dialog_select_video.css"),e("widget/media/media_dialog.css");
var u=e("common/wx/top.js"),_=e("common/wx/Tips.js"),v=e("common/wx/media/video.js"),f=e("common/wx/pagebar.js"),p=e("common/wx/time.js"),h=e("media/media_cgi.js"),g=e("common/wx/Cgi.js"),w=e("tpl/media/dialog/videomsg_layout.html.js"),j=e("tpl/media/videocard.html.js"),x=15,q=21,b=0,y={};
y[x]="video_msg_cnt",y[q]="short_video_cnt";
var O=function(e,i){
var t=$.extend({},i.multi_item?i.multi_item[0]:i);
t.selector=e,t.id=i.app_id,t.app_id=i.app_id,t.tpl="videomsg",t.for_selection=1!=t.is_new_video?!0:3==t.status,
t.for_transfer=!!t.content,t.hide_transfer=!!t.content,t.video_id=t.content,t.source="file",
1==t.is_new_video?(t.time=i.create_time?p.timeFormat(i.create_time):"",t.before_original_video=i.create_time<1453914e3?1:0,
e.html(wx.T(j,t))):(t.create_time=i.create_time,t.img_url=i.img_url,new v(t)),$("#wxVideoBox"+t.id).data("opt",t);
},T=function(e){
console.log(e),this.scene=e.scene||"default",this.onOK=e.onOK,this.can_use_shortvideo=e.can_use_shortvideo,
this.can_use_txvideo=e.can_use_txvideo,this.create();
},C={
create:function(){
var e=this,i=$.parseHTML(wx.T(w,{
scene:e.scene,
token:wx.data.t
}));
e.dialog&&e.dialog.popup("remove"),e.dialog=$(i[0]).popup({
title:"选择视频",
className:"dialog_select_video",
width:960,
onOK:function(){
var i=this,o=e.$dom.find(".js_top.selected").data("id"),n=e.$dom.find(".Js_videomsg.selected").data("opt")||e.$dom.find(".Js_videomsg.selected").parent().data("opt"),d=e.$dom.find(".js_video_url").val();
if(o&&n&&1==n.is_new_video&&3!=n.status)return _.err("该视频目前无法被选择，请选择其它视频"),!0;
if(o&&n&&0==n.is_new_video&&(0!=n.is_new_video||!n.content_url))return _.err("该视频转码未完成，请选择其它视频"),
!0;
if(o){
if(!n)return _.err("请选择视频"),!0;
if(e.onOK&&!e.onOK(o,n))return!0;
i.remove(),e.dialog=null;
}else{
if(!d)return _.err("请输入视频网址"),!0;
if(-1==d.indexOf("v.qq.com/")&&!/mp\.weixin\.qq\.com\/s/.test(d)&&!/mp\.weixin\.qq\.com\/mp\/video\?/.test(d))return _.err("只支持已发布的微信公众号链接、视频详情页链接和腾讯视频链接"),
!0;
var s=e.$dom.find(".js_video_search").find(".Js_videomsg.selected").data("vid");
if(!s)return _.err("请选择视频"),!0;
if(0==d.indexOf("http://v.qq.com/")||0==d.indexOf("https://v.qq.com/")){
if(t(s))return _.err("该链接为腾讯微博视频网址，此处引用视频只支持已发布的微信公众号链接、视频详情链接或者腾讯视频链接"),!1;
e.$dom.find(".js_btn").btn(!0),g.post({
url:wx.url("/cgi-bin/registertopic?id="+s+"&type=2"),
success:function(i){
i&&i.base_resp&&0==i.base_resp.ret?e.onOK&&e.onOK(o,{
align:"none",
height:375,
width:500,
vid:s,
subtype:0,
url:"https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid="+s
}):_.err("系统繁忙，请稍后再试");
}
});
}else e.onOK&&e.onOK(o,{
align:"none",
height:375,
width:500,
vid:s,
subtype:/mp\.weixin\.qq\.com\/mp\/video\?/.test(d)?1:2,
url:"https://v.qq.com/iframe/preview.html?width=500&height=375&auto=0&vid="+s
}),i.remove(),e.dialog=null;
}
},
onCancel:function(){
this.remove(),e.dialog=null;
},
onHide:function(){
this.remove(),e.dialog=null;
}
}),e.$dom=e.dialog.popup("get"),e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"),
e.init(),e.dialog.popup("resetPosition");
},
init:function(){
var e=this,i=e.can_use_shortvideo?[{
name:"小视频",
id:q
}]:[];
"ueditor"==e.scene?(b=1,i.unshift({
name:"视频链接"
}),e.initVideoUrl()):(i.unshift({
name:"素材库",
id:x
}),e.getList(x,0,10)),"ueditor"==e.scene&&1==e.can_use_txvideo?(i.unshift({
name:"素材库",
id:x
}),e.getList(x,0,10),e.$dom.find(".js_video_search").hide()):$(".js_video_status").find(".frm_tips").html("只支持已发布的微信公众号链接、视频详情页链接和腾讯视频链接"),
e.tab=new u(e.$dom.find(".js_videotab"),i),e.tab.selected(0),e.tab.dom.find("a").on("click",function(e){
e.preventDefault();
}),e.$dom.on("click",".js_top",function(){
var i=$(this).data("id");
e.$dom.find(".js_video_status").hide(),e.$dom.find(".js_video_create").hide(),e.$dom.find(".js_pagebar").empty(),
e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"),i?(i==x&&e.$dom.find(".js_video_create").show(),
e.getList(i,0,10)):e.$dom.find(".js_video_search").show(),e.tab.selected($(this).data("index"));
}),e.$dom.on("click",".Js_videomsg",function(){
e.$dom.find(".Js_videomsg.selected").removeClass("selected"),e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"),
$(this).addClass("selected");
}),e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"),e.$dom.on("mousewheel","#js_videomsg_list, #js_video_search_list",function(e){
this.scrollTop-=e.originalEvent.wheelDelta>0?60:-60,e.preventDefault();
}).on("DOMMouseScroll","#js_videomsg_list, #js_video_search_list",function(e){
this.scrollTop+=e.originalEvent.detail>0?60:-60,e.preventDefault();
});
},
initVideoUrl:function(){
var e=this;
e.$dom.find(".js_video_loading").hide(),e.$dom.find(".js_video_search").show();
var i=null;
e.$dom.find(".js_video_url").on("input propertychange",function(){
e.$dom.find(".js_video_loading").show(),e.$dom.find(".js_video_url_tip").hide();
var t=$(this).val(),n=e.$dom.find("#js_video_search_list").find(".inner").empty();
t?(clearTimeout(i),i=setTimeout(function(){
return-1!=t.indexOf("v.qq.com/")||/mp\.weixin\.qq\.com\/s/.test(t)||/mp\.weixin\.qq\.com\/mp\/video\?/.test(t)?void clearTimeout(i):(e.$dom.find(".js_video_loading").hide(),
e.$dom.find(".js_video_url_tip").show(),!0);
},1e3),e.$dom.find(".js_video_loading").show(),e.$dom.find(".js_btn_p").eq(0).removeClass("btn_disabled"),
o(t,function(i){
var t=i.vid,o={
title:"",
cover:"",
duration:"",
for_operation:!1,
for_selection:!0,
for_transfer:!0,
hide_transfer:!0,
is_new_video:!0,
video_ori_status:4,
status:3,
source:"file"
};
if("string"==typeof t){
var d={},s=-1,a=$("<div></div>",n.eq(0)).appendTo(n.eq(0));
l({
vid:t,
onSuc:function(i){
d=$.extend(o,{
title:i.title,
duration:m(i.time),
cover:i.p400_300,
video_id:t
});
var n=setInterval(function(){
s>=0&&(e.$dom.find(".js_video_loading").hide(),a.html(wx.T(j,d)),1==s?a.find(".warn").text("该视频由于版权问题无法在微信中播放").show():2==s&&a.find(".warn").text("该视频无法在微信中播放").show(),
clearInterval(n));
},500);
setTimeout(function(){
clearInterval(n);
},3e4);
},
onError:function(){
_.err("系统错误");
}
}),c({
vid:t,
onSuc:function(){
s=0;
},
onError:function(e){
s=e;
}
});
}else{
if(0==t.length)return _.err("此公众号文章中没有视频"),e.$dom.find(".js_video_loading").hide(),
!0;
for(var r=0,u=!1,v=[],f=[],p=0;p<t.length;p++)!function(i){
l({
vid:t[i],
onSuc:function(d){
r++,v[i]=$.extend({},o,{
title:d.title,
duration:m(d.time),
cover:d.p400_300,
video_id:t[i]
}),r!=2*t.length||u||v.each(function(i,t){
var o=$("<div></div>",n.eq([t%2])).appendTo(n.eq([t%2]));
e.$dom.find(".js_video_loading").hide(),o.html(wx.T(j,v[t])),1==f[t]?o.find(".warn").text("该视频由于版权问题无法在微信中播放").show():2==f[t]&&o.find(".warn").text("该视频无法在微信中播放").show();
});
},
onError:function(){}
}),c({
vid:t[i],
onSuc:function(){
r++,f[i]=0,r!=2*t.length||u||v.each(function(i,t){
var o=$("<div></div>",n.eq([t%2])).appendTo(n.eq([t%2]));
e.$dom.find(".js_video_loading").hide(),o.html(wx.T(j,v[t])),1==f[t]?o.find(".warn").text("该视频由于版权问题无法在微信中播放").show():2==f[t]&&o.find(".warn").text("该视频无法在微信中播放").show();
});
},
onError:function(o){
r++,f[i]=o,r!=2*t.length||u||v.each(function(i,t){
var o=$("<div></div>",n.eq([t%2])).appendTo(n.eq([t%2]));
e.$dom.find(".js_video_loading").hide(),o.html(wx.T(j,v[t])),1==f[t]?o.find(".warn").text("该视频由于版权问题无法在微信中播放").show():2==f[t]&&o.find(".warn").text("该视频无法在微信中播放").show();
});
}
});
}(p);
setTimeout(function(){
u=!0,r!=2*t.length&&_.err("系统错误");
},8e3);
}
e.dialog.popup("resetPosition");
},null,function(){
e.$dom.find(".js_video_loading").hide(),_.err("该网址存在错误，请填写正确的腾讯视频网址");
})):(e.$dom.find(".js_video_loading").hide(),e.$dom.find("#js_video_search_list").find(".inner").empty(),
e.$dom.find(".js_btn_p").eq(0).addClass("btn_disabled"));
});
},
initPagebar:function(e,i,t){
var o=this,n=e/i+1;
return i>=t?void o.$dom.find(".js_pagebar").hide():void new f({
container:o.$dom.find(".js_pagebar").show(),
perPage:i,
first:!1,
last:!1,
isSimple:!0,
initShowPage:n,
totalItemsNum:t,
callback:function(t){
var d=t.currentPage,s=o.$dom.find(".js_top.selected").data("id");
d!=n&&s&&(e=i*--d,o.getList(s,e,i));
}
});
},
getList:function(e,i,t){
var o=this,n=e==x?h.appmsg:h;
o.$dom.find(".js_video_content").hide(),o.$dom.find(".js_video_loading").show(),
n.getList(e,i,t,function(n){
if(o.dialog&&e==o.$dom.find(".js_top.selected").data("id")){
var d=n.file_item||n.item,s=o.$dom.find("#js_videomsg_list").find(".inner").empty();
d.length?(d.each(function(e,i){
var t=s.eq(i%2),o=$('<div id="appmsg%s"></div>'.sprintf(e.app_id||e.file_id),t).appendTo(t);
O(o,e);
}),o.$dom.find(".js_video_content").show(),o.dialog.popup("resetPosition")):o.$dom.find(".js_video_none").show().find(".js_empty_tips").html(e==q?"暂无素材<br />（素材来源：通过微信用户上传给公众帐号）":"暂无素材"),
o.$dom.find(".js_video_loading").hide(),o.initPagebar(i,t,n.file_cnt[y[e]]||n.file_cnt.video_cnt);
}
},"",b);
}
};
return $.extend(T.prototype,C),T;
});define("tpl/mpEditor/plugin/img_popup.html.js",[],function(){
return'<div class="js_img_popup edui_mask_edit_group">\n    \n	<div class="js_canceladapt edui-clickable edui_mask_edit_meta first_child tips_global" onclick="$$._imgAutoWidth(false)" style="{if !hasadapt}display:none;{/if}">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_img_canceladapt"></i>\n            取消自适应        </div>\n    </div>\n	<div class="js_adapt edui-clickable edui_mask_edit_meta first_child" onclick="$$._imgAutoWidth(true)" style="{if hasadapt}display:none;{/if}">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_img_adapt"></i>\n            自适应手机屏幕宽度        </div>\n    </div>\n	<div class="edui-clickable edui_mask_edit_meta primary no_extra" onclick="$$._delRange()">\n        <div class="edui_mask_edit_meta_inner">\n            <i class="icon_edui_mask_img icon_edui_mask_img_del"></i>\n            {if needBreak}\n            删除图片            {else}\n            删除            {/if}\n        </div>\n	</div>\n</div>\n\n\n';
});define("tpl/media/plugin/audioItem.html.js",[],function(){
return'{each list as data i}\n<label class="frm_radio_label audio_item {if data.enable==true}disabled{/if}">\n    <i class="icon_radio"></i>\n    <span class="lbl_content">\n        <span class="audio_meta audio_title">{data.title}</span>\n        <span class="audio_meta audio_date">{data.update_time}</span>\n        <span class="audio_meta audio_length">{data.format_play_length}</span>\n        <span class=\'audio_meta audio_play jsPluginAudioPlay audio_default\' id="pluginAudioPlay_{i}">\n        </span>\n    </span>\n    <input type="radio" {if data.disabled}disabled="disabled"{/if}  data-label="{data.name}" data-value="{data.file_id}" data-index="{i}" class="frm_radio jsPluginAudioRadio" >\n</label>\n{/each}\n';
});define("tpl/media/plugin/audio.html.js",[],function(){
return'<div class="audio_box">\n    <div class="global_mod audio_box_hd float_layout gap_top" id="">\n        <p class="global_info gap_top_item tips_global jsAudioTips" style="display:none;">由于版本兼容的原因,你暂时只可以选择60秒内的语音发送</p>\n        <p class="global_extra">\n            <a class="btn btn_primary btn_add jsPluginAudioNew" href="javascript:;"><i class="icon14_common add_white"></i>新建语音</a>\n        </p>\n    </div>\n    <div class="audio_box_bd audio_list_container" id="">\n\n        <div class="media_list_tips_wrp tips_global" style="display:none;">\n            <span class="tips">暂无素材</span>\n            <span class="vm_box"></span>\n        </div>\n\n\n        <div class="media_list_tips_wrp" style="display:none;">\n            <i class="icon_loading_small white">loading...</i>\n            <span class="vm_box"></span>\n        </div>\n\n\n        <div class="audio_list jsPluginAudioList"></div>\n\n        <div class="pagination_wrp jsPluginAudioPage"></div>\n    </div>\n</div>\n';
});define("tpl/mpEditor/plugin/link_popup.html.js",[],function(){
return'{if needBreak}\n<div style="height:5px;display:none"></div>\n{/if}\n<div class="js_link_popup edui_mask_edit_group with_line">\n	<a class="edui_mask_edit_meta" target="_blank" href="{url}" title="{url}" >{txt}</a>\n	<div class="primary edui_mask_edit_meta no_extra edui-clickable" onclick="$$._execCommandAndHide(\'link\');">\n        <div class="edui_mask_edit_meta_inner">\n        修改        </div>\n    </div>\n	<div class="primary edui_mask_edit_meta edui-clickable" onclick="$$._execCommandAndHide(\'unlink\');">\n        <div class="edui_mask_edit_meta_inner">\n        清除        </div>\n    </div>\n</div>\n';
});define("tpl/mpEditor/plugin/link_appmsg.html.js",[],function(){
return'{each data as link}\n<li class="my_link_item">\n    <label class="frm_radio_label">\n        <i class="icon_radio"></i>\n        <span class="lbl_content">{link.title}<span class="date">{link.time}</span></span>\n        <input type="radio" name="hello" class="frm_radio" data-title="{link.title}" data-id="{link.aid}" data-href="{link.href}">\n    </label>\n</li>\n{/each}';
});define("tpl/mpEditor/plugin/link_dialog.html.js",[],function(){
return'<form class="" id="linkForm">\n    <div class="frm_control_group">\n        <label for="" class="frm_label">文本内容</label>\n        <div class="frm_controls">\n            <span class="frm_input_box">\n                <input type="text" id="txtTitle" name="title" class="frm_input js_input" placeholder="请填写被点击的文字内容">\n            </span>\n            <!-- <p class="frm_msg fail">\n                <span class="frm_msg_content">表单验证消息 失败</span>\n            </p> -->\n        </div>\n    </div>\n    <div class="frm_control_group" {if flag*1!=1}style="display:none;"{/if}  id="hrefDiv">\n        <label for="" class="frm_label">链接地址</label>\n        <div class="frm_controls">\n            <span class="frm_input_box">\n                <input type="text" id="txtHref" name="href" class="frm_input" placeholder="" value="http://">\n            </span>\n            <p class="frm_msg fail">\n                <span class="frm_msg_content">表单验证消息 失败</span>\n            </p>\n            <p class="frm_msg fail js_wording" style="display:none;">\n                <span class="frm_msg_content"></span>\n            </p>\n        </div>\n    </div>\n    <div class="link_chooser_wrap">\n        {if flag*1==1}\n        <span class="btn_link_triger" id="linkArrow">从已发送的图文消息中选择<i class="arrow {if flag*1==1}down{else}up{/if}"></i></span>\n        {else}\n        <p>从已发送的图文消息中选择<span class="link_chooser_tips">当前账号不支持加入外链 详情参见<a target="_blank" href="http://kf.qq.com/faq/120911VrYVrA150826qeqQzy.html">超链接使用规则</a></span></p> \n        {/if}\n        <div class="link_chooser" {if flag*1==1}style="display:none;"{/if} id="linkChoose">\n            <div class="search_bar">\n                <span class="frm_input_box search with_del append">\n                    <a class="del_btn" href="###" id="searchCloseBt"><i class="icon_search_del" id="searchCloseBt"></i>&nbsp;</a>\n                    <a id="searchBt" href="###" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                    <input id="keyInput" type="text" placeholder="搜索相关文章" value="" class="frm_input">\n                </span>\n            </div>\n            <ul class="my_link_list" id="linkList">\n            </ul>\n            <div class="pagination tr" id="pageBar">\n            </div>\n        </div>\n    </div>\n</form>\n';
});define("shop/shopDialog.js",["common/wx/popup.js","tpl/shop/shopDialog.html.js","tpl/shop/shopDialogItem.html.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/Cgi.js"],function(o){
"use strict";
o("common/wx/popup.js");
var t=o("tpl/shop/shopDialog.html.js"),e=o("tpl/shop/shopDialogItem.html.js"),s=o("common/wx/Tips.js"),n=o("common/wx/pagebar.js"),i=o("common/wx/Cgi.js");
t=wx.T(t,{
token:wx.data.t,
lang:wx.data.lang
});
var l=function(o){
document.body.style.overflow=document.documentElement.style.overflow="hidden",this.begin=0,
this.count=10;
var e=$(t).popup({
title:"选择小店商品",
className:"align_edge shopcard_dialog",
buttons:[{
text:"确定",
click:function(){
var t=n.find(".js_item.selected");
return 1!=t.length?(s.err("请选择一个商品"),!0):(o.onOk&&o.onOk(t.data()),document.body.style.overflow=document.documentElement.style.overflow="auto",
void this.remove());
},
type:"primary"
},{
text:"取消",
click:function(){
document.body.style.overflow=document.documentElement.style.overflow="auto",this.remove();
},
type:"default"
}],
close:function(){
this.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
this.pop=e,this.getList();
var n=$(e.get()),i=n.find(".js_shopcard_list");
i.on("click",".js_item",function(){
i.find(".js_item").removeClass("selected");
var o=$(this);
o.addClass("selected");
});
};
return l.prototype.getList=function(){
var o=this.pop,t=$(o.get()),l=this.begin,a=this.count,r=this,c=t.find(".js_shopcard_list"),p=t.find(".js_shoploading"),m=t.find(".js_pagination");
c.hide(),p.show(),m.hide(),i.get("/merchant/goods?type=1&t=shop/list&offset="+l+"&count="+a,function(o){
if(o&&o.base_resp&&0==o.base_resp.ret)try{
var t=$.parseJSON(o.data);
console.log(t);
var i=t.total,d=t.goods;
p.hide(),c.html(wx.T(e,{
goods:d
}));
var h=l/a+1;
m.show();
{
new n({
container:m,
perPage:a,
first:!1,
last:!1,
isSimple:!0,
initShowPage:h,
totalItemsNum:i,
callback:function(o){
var t=o.currentPage;
if(t!=h)return t--,r.begin=t*a,r.getList(),!1;
}
});
}
return void c.show();
}catch(u){}
s.err("系统异常，请稍后重试");
},function(){
s.err("系统异常，请稍后重试");
});
},l.prototype.show=function(){
this.pop.show();
},l.prototype.hide=function(){
this.pop.hide();
},l;
});define("cardticket/parse_data.js",["cardticket/add/member_info_flag.js"],function(e){
"use strict";
function _(e){
var _=u[e.card_type]||e.card_type;
switch(_+=""){
case"2":
e=e.discount;
break;

case"1":
e=e.groupon;
break;

case"3":
e=e.gift;
break;

case"4":
e=e.cash;
break;

case"0":
e=e.general_coupon;
break;

case"10":
e=e.member_card;
break;

case"21":
e=e.scenic_ticket;
break;

case"22":
e=e.movie_ticket;
break;

default:
e=e.general_coupon||e.coupon;
}
return e?(e.type=_,e):null;
}
function t(e,_){
return"number"!=typeof e&&(e=praseFloat(e),isNaN(e))?0:(_||(_=2),parseFloat(e.toFixed(_)));
}
function i(e){
var _=/^https?:\/\/mp.weixin.qq.com\/s/,t=/^http:\/\/mp.weixin.qq.com\/bizmall\/cardshelf/,i=/^http:\/\/mp.weixin.qq.com\/bizmall\/mallshelf/;
return _.test(e)?1:t.test(e)?2:i.test(e)?3:4;
}
function s(e){
return e?(e+"").html(!1):"";
}
function o(e){
var _=e.url||"",t=e.url_type;
return 4==t?_.replace("http://",""):s(_);
}
function n(e){
var n={},e=_(e);
if(!e)return null;
a(n,e),a(n,e.base_info),n.background_pic_url=e.background_pic_url;
var r=e.base_info.date_info||{};
n.time_type=f[r.type]||r.type,1==n.time_type&&(n.begin_time=r.begin_timestamp,n.end_time=r.end_timestamp),
n.from_day=r.fixed_begin_term||0,n.fixed_term=r.fixed_term||30,n.quantity=e.base_info.sku.quantity,
n.shop_id_list=e.base_info.shop_id_list,n.location_id_list=e.base_info.location_id_list;
var u=l[n.code_type];
if(n.code_type="undefined"!=typeof u?u:n.code_type,"undefined"==typeof n.code_type&&(n.code_type=1),
n.least_cost=e.least_cost&&e.least_cost/100,n.reduce_cost=e.reduce_cost&&e.reduce_cost/100,
"0"==n.least_cost&&(n.least_cost=""),n.discount=n.discount&&(100-n.discount)/10,
n.detail=1==n.type?n.deal_detail:n.default_detail,/^http/.test(n.logo_url)||(n.logo_url=""),
n.shop_type||(n.shop_type=n.location_id_list&&n.location_id_list.length?2:3),n.auto_update_new_location&&(n.shop_type=1),
n.isnew=n.func_flag?!!(16&n.func_flag):!1,n.ispay=n.func_flag?64&n.func_flag:!1,
n.func_flag&&(n.show_in_nearby=!1),n.ispay&&(n.can_share=!0),n.ispay&&(n.detail=n.detail?n.detail.replace(/\n微信价：.*?元$/gm,""):""),
n.price=t(e.base_info.sku.price/100),n.original_price=t(e.base_info.sku.original_price/100),
1==n.create_source&&(n.isnew=!0),1==n.time_type&&n.end_time<new Date/1e3&&(n.is_expire=!0),
n.is_intercomm=16384&n.func_flag,"undefined"!=typeof e.base_info.task_info&&(n.is_from_intercomm=!0,
n.task_info=e.base_info.task_info),n.is_from_intercomm&&(n.isnew=!0),n.status=m[n.status]||n.status,
n.discount&&(n.supply_discount=!0),10==n.type){
var d=[];
if(n.promotion_url_name){
var p={
name:n.promotion_url_name,
tips:n.promotion_url_sub_title,
url:n.promotion_url
};
p.url_type=i(p.url),p.url=o(p),d=[p];
}
e.custom_cell1&&(e.custom_cell1.url_type=i(e.custom_cell1.url),e.custom_cell1.url=o(e.custom_cell1),
d.push(e.custom_cell1)),e.custom_cell2&&(e.custom_cell2.url_type=i(e.custom_cell2.url),
e.custom_cell2.url=o(e.custom_cell2),d.push(e.custom_cell2)),n.config_url=d;
var y=e.required_info||{
info_flag:0
},g=e.optional_info||{
info_flag:0
};
n.require_keywords=c.flag2info(y.info_flag),n.option_keywords=c.flag2info(g.info_flag),
n.require_self_keywords=y.field_list,n.option_self_keywords=g.field_list,n.must_activate=!n.auto_activate,
n.supply_discount&&(n.prerogative=n.prerogative.replace(/^用卡可享受.*?折优惠\n/,"")),n.quantity="--",
n.can_modify=(e.required_info?e.required_info.can_modify:!1)||(e.optional_info?e.optional_info.can_modify:!1),
n.supply_balance=e.supply_balance;
}else{
var d=[];
if(n.custom_url_name){
var p={
name:n.custom_url_name,
tips:n.custom_url_sub_title,
url:n.custom_url
};
p.url_type=i(p.url),p.url=o(p),d=[p];
}
n.config_url=d;
}
var b=e.base_info;
if(10==n.type)var h=e.modify_msg_operation||{
_notexist:!0
};else var h=b.consume_msg_operation||{
_notexist:!0
};
n.msg_operation=h.url_cell||h.card_cell||{
_notexist:!0
},n.msg_operation._notexist||(n.msg_operation._type=n.msg_operation.card_id?5:i(n.msg_operation.url),
n.msg_operation.url&&(n.msg_operation.url=s(n.msg_operation.url))),n.msg_operation.endtime=n.msg_operation.end_time,
n.bonus_rule=e.bonus_rule||{},n.bonus_rule.init_bonus=n.bonus_rule.init_increase_bonus,
n.bonus_rule.cost_money_unit=n.bonus_rule.cost_money_unit&&n.bonus_rule.cost_money_unit/100,
n.bonus_rule.reduce_money=n.bonus_rule.reduce_money&&n.bonus_rule.reduce_money/100,
n.bonus_rule.least_money_to_use_bonus=n.bonus_rule.least_money_to_use_bonus&&n.bonus_rule.least_money_to_use_bonus/100,
b.sub_merchant_info&&(n.sub_merchant_id=b.sub_merchant_info.merchant_id);
var v=e.advanced_info;
if(n.use_hours=[],v){
n.is_sns_card=1==v.gen_type,n.orig_time_limit=v.time_limit||[],n.text_image_list=v.text_image_list||[],
n.time_limit=[];
var T={};
if(v.time_limit)for(var E=0;E<v.time_limit.length;E++){
var w=v.time_limit[E];
T[w.type]||(T[w.type]=!0,n.time_limit.push(w));
}
1!=n.create_source&&v.time_limit&&v.time_limit.length&&v.time_limit[0].end_hour&&(n.use_hours.push(v.time_limit[0]),
v.time_limit.length>1&&v.time_limit[0].type==v.time_limit[1].type&&n.use_hours.push(v.time_limit[1])),
n.consume_share_self_num=v.consume_share_self_num,n.consume_share_self_num>0?(n.consume_is_share=!0,
n.consume_share_type=1):v.consume_share_card_list&&v.consume_share_card_list.length?(n.consume_is_share=!0,
n.consume_share_type=2,n.consume_share_card_id=v.consume_share_card_list[0].card_id):n.consume_is_share=!1,
n.business_service=v.business_service;
var A=v.abstract;
A&&($(".section_card_intro").show(),n.abstract=A.abstract,n.cover_logo=A.icon_url_list?A.icon_url_list[0]:"");
}
if(n.is_quit_money=n.func_flag&1<<22,n.can_edit_quantity=!(n.is_quit_money||10==n.type||n.is_from_intercomm||(3!=n.status&&5!=n.status&&6!=n.status||!n.is_sns_card||n.is_expire)&&n.is_sns_card),
n.is_sns_card&&(n.isnew=!0),n.isnew||(n.quantity="--"),3==n.type&&n.is_sns_card){
n.gift_title=n.title;
var k=v.use_condition;
n.title=k?k.least_cost?"满%s送%s".sprintf(k.least_cost/100,n.gift_title):k.object_use_for?"买%s送%s".sprintf(k.object_use_for,n.gift_title):n.gift_title+(n.gift_num?n.gift_num:"")+(n.gift_unit?n.gift_unit:""):n.gift_title+(n.gift_num?n.gift_num:"")+(n.gift_unit?n.gift_unit:"");
}
n.pay_info=b.pay_info&&b.pay_info.swipe_card||{};
var S=65536&n.func_flag;
if(S)n.dispose_method=1;else{
var D=n.func_flag&1<<24;
n.pay_info.is_swipe_card?(n.dispose_method=4,n.code_type=1e4):D?(n.dispose_method=2,
n.code_type=1e4):n.dispose_method=3;
}
var C=n.pay_info;
if(C.auditing_info_list||(C.auditing_info_list=[]),C.is_swipe_card){
var R=C.auditing_info_list;
if(R.length){
var q=R[R.length-1];
if(C.swipe_card_status=0==q.mid_list.length?1:1==q.ret?C.is_active?0:3:2,q.trans_buff){
var I=q.trans_buff.html(!1);
I=$.parseJSON(I),q.trans_buff=I,C.last_audit_item=q;
}
}else C.swipe_card_status=0==n.quantity?4:0;
}
!C.is_swipe_card||1!=C.swipe_card_status&&3!=C.swipe_card_status||(n.can_edit_quantity=!1),
v&&v.consume_cell_info&&(n.need_verify_code=v.consume_cell_info.need_verify_code,
n.need_remark=v.consume_cell_info.need_remark),n._can_global_edit=!n.is_from_intercomm&&(!n.is_sns_card||n.is_sns_card&&!n.is_expire&&(3==n.status||5==n.status||6==n.status)||n.is_sns_card&&(1==n.status||2==n.status));
var k=v&&v.use_condition;
return k&&(n.use_condition_least_cost=k.least_cost/100||"",n.accept_category=k.accept_category,
n.reject_category=k.reject_category,n.can_use_with_other_discount=k.can_use_with_other_discount,
n.can_use_with_membercard=k.can_use_with_membercard,n.object_use_for=k.object_use_for,
n.has_condition=k.least_cost||k.object_use_for||k.accept_category||k.reject_category||!k.can_use_with_other_discount,
3==n.type&&(n.use_condition_least_cost_type=n.object_use_for?2:1)),n.is_sns_card&&3==n.type&&(n.has_condition=!0),
n;
}
function a(e,_){
for(var t in _)_.hasOwnProperty(t)&&"object"!=typeof _[t]&&(e[t]=_[t]);
return e;
}
function r(e){
for(var _={},t=[],i=0;i<e.length;i++){
var s=n(e[i]);
s&&(_[s.id]=s,t.push(s));
}
return{
card_cache:_,
card_list:t
};
}
var c=e("cardticket/add/member_info_flag.js"),u={
DISCOUNT:"2",
MEMBER_CARD:"10",
GROUPON:"1",
GIFT:"3",
CASH:"4",
GENERAL_COUPON:"0",
SCENIC_TICKET:"21",
MOVIE_TICKET:"22"
},l={
CODE_TYPE_TEXT:0,
CODE_TYPE_BARCODE:1,
CODE_TYPE_QRCODE:2
},m={
CARD_STATUS_INIT:0,
CARD_STATUS_NOT_VERIFY:1,
CARD_STATUS_VERIFY_FAIL:2,
CARD_STATUS_VERIFY_OK:3,
CARD_STATUS_DELETE:4,
CARD_STATUS_SYS_DELETE:5,
CARD_STATUS_DISPATCH:6,
CARD_STATUS_SYS_OFF_SHELF:7,
CARD_STATUS_EXPIRED:8
},f={
DATE_TYPE_FIX_TIME_RANGE:1,
DATE_TYPE_FIX_TERM:2,
DATE_TYPE_PERMANENT:100
};
return{
parse_cardticket:n,
parse_cardlist:r,
url_type:i
};
});