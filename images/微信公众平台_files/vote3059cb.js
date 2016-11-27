define("media/media_static_data.js",[],function(w,e){
"use strict";
e.article_type=[{
name:"文学",
value:"文学"
},{
name:"金融财经",
value:"金融财经"
},{
name:"房产",
value:"房产"
},{
name:"时事政治",
value:"时事政治"
},{
name:"社会新闻",
value:"社会新闻"
},{
name:"工业农业",
value:"工业农业"
},{
name:"汽车",
value:"汽车"
},{
name:"科技互联网",
value:"科技互联网"
},{
name:"教育培训",
value:"教育培训"
},{
name:"艺术文化",
value:"艺术文化"
},{
name:"美妆时尚",
value:"美妆时尚"
},{
name:"娱乐",
value:"娱乐"
},{
name:"旅游",
value:"旅游"
},{
name:"健康医疗",
value:"健康医疗"
},{
name:"体育",
value:"体育"
},{
name:"餐饮美食",
value:"餐饮美食"
},{
name:"母婴育儿",
value:"母婴育儿"
},{
name:"情感",
value:"情感"
},{
name:"历史",
value:"历史"
},{
name:"军事",
value:"军事"
},{
name:"宗教",
value:"宗教"
},{
name:"星座占卜",
value:"星座占卜"
},{
name:"幽默笑话",
value:"幽默笑话"
},{
name:"图片",
value:"图片"
},{
name:"视频",
value:"视频"
},{
name:"其他",
value:"其他"
}],e.URL_PLATFORM_MAP={
"www.guokr.com":"果壳",
"www.zhihu.com":"知乎",
"blog.sina.com.cn":"新浪博客",
"www.huxiu.com":"虎嗅网",
"www.dreamore.com":"追梦网",
"cn.engadget.com":"瘾科技",
"www.cnbeta.com":"cnBeta",
"www.199it.com":"199IT",
"www.36kr.com":"36氪",
"www.tmtpost.com":"钛媒体",
"www.iheima.com":"i黑马",
"www.cyzone.cn":"创业邦",
"www.ikanchai.com":"砍柴网",
"www.iresearch.cn":"艾瑞网",
"xianguo.com":"鲜果网",
"www.myzaker.com":"ZAKER",
"jandan.net":"煎蛋网",
"pianke.me":"片刻网",
"www.techweb.com.cn":" TechWeb",
"www.leiphone.com":"雷锋网",
"www.douban.com":"豆瓣",
"www.mop.com":"猫扑",
"www.tianya.cn":"天涯",
"jingyan.baidu.com":"百度经验",
"baike.baidu.com":"百度百科",
"wenku.baidu.com":"百度文库",
"tieba.baidu.com":"百度贴吧",
"zhidao.baidu.com":"百度知道",
"news.sina.com.cn":" 新浪新闻",
"news.qq.com":"腾讯新闻",
"news.ifeng.com":"凤凰资讯",
"news.163.com":"网易新闻",
"www.xinhuanet.com":"新华社",
"www.people.com.cn":"人民网",
"www.huanqiu.com":"环球时报",
"www.gov.cn":"中国政府网",
"www.china.com":"中华网",
"www.takungpao.com":"大公网",
"www.81.cn":"中国军网",
"www.zaobao.com":"联合早报",
"d.weibo.com":"新浪微博",
"weibo.com":"新浪微博",
"www.baidu.com":"百度",
"www.sina.com.cn":"新浪",
"www.163.com":"网易",
"news.sohu.com":"搜狐新闻",
"www.sohu.com":"搜狐",
"www.ifeng.com":"凤凰网",
"qzone.qq.com":"QQ空间"
};
});define("media/article_list.js",["common/qq/events.js","common/qq/Class.js","common/wx/time.js","biz_web/lib/store.js","common/wx/Tips.js","common/wx/dialog.js","common/wx/popover.js","common/wx/mpEditor/plugin/remoteimg.js","media/media_cgi.js","media/article.js","media/draft.js","media/report.js","tpl/media/appmsg_edit/article_list_item.html.js","media/preview.js"],function(e){
"use strict";
function t(e){
var t=e&&e.multi_item;
return t&&t.length?($.each(t,function(e,t){
$.each(t,function(e,i){
i.html&&(t[e]=i.html(!1));
});
}),t):null;
}
function i(e,t,i){
(t||1)>v&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:e,
level:i||"error",
content:"[file=media/appmsg_edit]"
});
}
function r(e){
for(var t in e)if(e.hasOwnProperty(t)&&e[t])return!1;
return!0;
}
var n=e("common/qq/events.js")(!0),a=e("common/qq/Class.js"),s=(e("common/wx/time.js"),
e("biz_web/lib/store.js")),o=e("common/wx/Tips.js"),c=e("common/wx/dialog.js"),l=e("common/wx/popover.js"),d=e("common/wx/mpEditor/plugin/remoteimg.js"),m=e("media/media_cgi.js"),u=e("media/article.js"),p=e("media/draft.js"),f=e("media/report.js"),h=e("tpl/media/appmsg_edit/article_list_item.html.js"),_=e("media/preview.js"),g=["一","二","三","四","五","六","七","八","九","十"],v=Math.random(),w=function(e,t,i,r){
if(e===t)return 0!==e||1/e===1/t;
if(null==e||null==t)return e===t;
var n=Object.prototype.toString.call(e);
if(n!==Object.prototype.toString.call(t))return!1;
switch(n){
case"[object RegExp]":
case"[object String]":
return""+e==""+t;

case"[object Number]":
return+e!==+e?+t!==+t:0===+e?1/+e===1/t:+e===+t;

case"[object Date]":
case"[object Boolean]":
return+e===+t;
}
var a="[object Array]"===n;
if(!a&&("object"!=typeof e||"object"!=typeof t))return!1;
i=i||[],r=r||[];
for(var s=i.length;s--;)if(i[s]===e)return r[s]===t;
if(i.push(e),r.push(t),a){
if(s=e.length,s!==t.length)return!1;
for(;s--;)if(!w(e[s],t[s],i,r))return!1;
}else for(var o in e)if(e.hasOwnProperty(o)&&(!t.hasOwnProperty(o)||!w(e[o],t[o],i,r)))return!1;
return i.pop(),r.pop(),!0;
},b=a.declare({
init:function(e){
var i=this;
$.extend(!0,i,e),i.opt=e,i.$list=$(e.appmsg_selector),i.gid=0,i.draft=new p(e.app_id),
i.list=i.draft.get()||t(e.appmsg_data),i.lastData=i.list,i.list?$.each(i.list,function(e,t){
i.add(t);
}):i.add(),i._bindEvent(),i.select(0,0,1),i.hasConfirmed=!1;
},
_bindEvent:function(){
var e=this;
$("#js_add_appmsg").on("click",function(){
var t=e.add();
t&&e.select(t.index());
}),e.$list.on("click",".js_appmsg_item",function(){
var t=$(this).closest(".js_appmsg_item").index();
t!=e.$current.index()&&e.select(t);
}),e.$list.on("click",".js_del",function(){
var t=$(this).closest(".js_appmsg_item").index();
return t!=e.$current.index()&&e.select(t),e.remove(t),!1;
}),e.$list.on("click",".js_up",function(){
var t=$(this).closest(".js_appmsg_item"),i=t.prev();
0==i.index()&&(i.find(".first_appmsg_item").hide().siblings().show(),t.find(".first_appmsg_item").show().siblings().hide()),
t.insertBefore(i),e._updateTitleTips(),e.$list.children().find(".js_down").show(),
e.$list.children().last().find(".js_down").hide();
}),e.$list.on("click",".js_down",function(){
var t=$(this).closest(".js_appmsg_item"),i=t.next();
0==t.index()&&i.length&&(t.find(".first_appmsg_item").hide().siblings().show(),i.find(".first_appmsg_item").show().siblings().hide()),
i.insertBefore(t),e._updateTitleTips(),e.$list.children().find(".js_down").show(),
e.$list.children().last().find(".js_down").hide();
}),$(e.editor_selector).on("click",".js_removeCover",function(){
var t=$(this),i=t.parents(".js_cover");
i.hide().find("input").val(""),i.find(".js_show_cover_pic").val("0"),$(e.editor_selector).find(".js_show_cover_pic_tips").hide(),
e.$current&&(e.$current.find("div.js_appmsg_thumb").css("backgroundImage",'url("")'),
e.$current.removeClass("has_thumb"));
}),$("body").on("click","#js_draft_cancel",function(){
return e.draft.clear(),e.draft.isDropped=!0,f.addPvUv("cacelcache"),window.location.reload(),
!1;
}),$("body").on("click","#js_import_draft",function(){
var t=e.draft.getRaw();
t&&(e.$list.empty(),$.each(t,function(t,i){
e.add(i);
}),e.select(0,0,1)),e.draft.showTips(),$("#js_import_tips").hide();
}),$("body").on("click","a",function(t){
var i=$(this).attr("href"),r=$(this).attr("target");
if("_blank"!==r&&"string"==typeof i&&0!==i.indexOf("javascript:")&&0!==i.indexOf("#")){
var n=e.getData();
if(!e.lastData||!w(n,e.lastData)){
t.preventDefault();
var a=1==wx.cgiData.isNew?"是否保存当前图文消息内容？":"是否保存此次修改？";
c.show({
type:"info",
msg:a,
buttons:[{
text:"保存",
click:function(){
e.save($("#js_submit"),function(){
o.remove(),$("#js_save_success").show(),location.href=i;
}),this.remove();
}
},{
text:"不保存",
type:"normal",
click:function(){
window.onbeforeunload=null,location.href=i,this.remove();
}
}]
});
}
}
}),e.ueditor.addListener("contentchange",function(){
$("#js_import_tips,#js_draft_tips").hide();
}),e.ueditor.addListener("get_current_article",function(){
return e.$current||null;
}),e.ueditor.addListener("get_current_article_all_img",function(){
var t=e.$current?e.$current.data("article"):null;
return t&&"function"==typeof t.getAllImgData?t.getAllImgData():[];
}),setInterval(function(){
var t=e.getData();
e.draft.save(t);
},12e4),window.onbeforeunload=function(){
var t=!0,i=e.getData();
if(!e.lastData||!w(i,e.lastData)){
for(var r=i.length;r-->0;)if(i[r]){
t=!1;
break;
}
return t||e.draft.isDropped?void e.draft.clear():(e.draft.save(i),"--------------------------------------------\n为确保内容不丢失\n建议点击页面底部的绿色保存按钮后再离开\n--------------------------------------------");
}
},n.on("_preview",function(){
e._preview();
});
},
_updateTitleTips:function(){
var e=0;
this.$list.children().each(function(){
var t=$(this);
t.data("msgindex",e),t.children().attr("title","第%s篇图文".sprintf(g[e])),e++;
});
},
_checkRemoteImage:function(e){
function t(){
c.removeListener("remoteimg_all_complete",t);
var e=i.getPostData(a||s);
return e?(1===n.confirm&&(e.confirm=1),void o(e)):void r.btn(!0);
}
var i=this,r=e.btn,n=e.postData,a=e.isPreview,s=e.strict,o=e.callback,c=i.ueditor,l=c.fireEvent("checkRemoteList");
return l?void o(n):(c.addListener("remoteimg_all_complete",t),void c.funcPvUvReport("save_remoting_img"));
},
_checkExternalLink:function(e){
var t=[],i=$.map(e,function(e,t){
return 0==t.indexOf("content")?e:void 0;
});
if($.each(i,function(e,i){
for(var r=/http\:\/\/([\w-]+\.)+[\w-]+(\:\d*)?(\/[\w\- \.\/\?%&=]*)?/gi,n=null,a="";null!=(n=r.exec(i));)a=i.substring(n.index,r.lastIndex),
d.isLocalDomain(a)||t.push(i.substring(Math.max(0,n.index-20),r.lastIndex));
}),t.length){
var r=(t.length,{
lc:t.length
});
$.each(t,function(e,t){
r["log"+e]=encodeURIComponent(t);
}),$.post("//mp.weixin.qq.com/mp/jsmonitor?idkey=28308_7_1",r);
}
},
add:function(e){
var t=this,i=t.$list.children().length;
if(i>=t.maxNum)return void o.err("你最多只可以加入%s条图文消息".sprintf(t.maxNum));
i==t.maxNum-1&&t.$list.parent().siblings("a").hide(),e=$.extend({
id:t.gid++,
title:"",
title_tips:"",
msg_index:i,
author:"",
file_id:"",
digest:"",
content:"",
source_url:"",
cover:"",
need_open_comment:1,
only_fans_can_comment:0,
isFirst:0==t.$list.children().length
},e),e.title_tips="第%s篇图文".sprintf(g[i]),e.msg_index=i,e.cdn_url?e.cover=e.cdn_url=e.cdn_url.nogif():e.file_id&&(wx.cgiData.appmsg_data.multi_item&&$.each(wx.cgiData.appmsg_data.multi_item,function(t,i){
i.file_id==e.file_id&&(e.cover=i.cover);
}),e.cover||(e.cover=wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(e.file_id))));
var r=$.parseHTML(wx.T(h,e))[0],n=$(r).appendTo(t.$list),a=new u({
dom:t.opt.editor_selector,
data:e,
item:n,
ueditor:t.ueditor,
freeUEditor:t.freeUEditor
});
return n.data("article",a),$(".js_scrollbar").scrollbar.updateScrollbars(!0),t.$list.children().find(".js_down").show(),
t.$list.children().last().find(".js_down").hide(),n;
},
remove:function(e){
var t=this,i=t.$list.children().eq(e),n=i.data("article").flush();
r(n.data)?t.drop(e):(i.find(".appmsg_edit_mask").css("display","block"),new l({
dom:i.find(".js_del"),
content:"确定删除此篇图文？",
hideIfBlur:!0,
buttons:[{
text:"确定",
click:function(){
t.drop(e),this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
i.find(".appmsg_edit_mask").css("display",""),this.remove();
}
}]
}));
},
drop:function(e){
var t=this;
t.select(Math.max(0,e-1)),t.$list.children().eq(e).remove(),t.$list.parent().siblings("a").show(),
t.$list.children().find(".js_down").show(),t.$list.children().last().find(".js_down").hide(),
$(".js_scrollbar").scrollbar.updateScrollbars(!0),t._updateTitleTips();
},
select:function(e,t,i){
var r=this,n="number"!=typeof e?e:r.$list.find(".js_appmsg_item").eq(e);
n.addClass("current");
var a=null;
if(n.siblings().removeClass("current"),r.$current){
if(e==r.$current.index())return;
a=r.$current.data("article"),a&&a.flush(),r._checkRepeat();
}
a=n.data("article"),a&&(!t&&a.hideErrorTips(),r.$current=n,a.render()),i||setTimeout(function(){
$(window).scrollTop(a.scrollTop),$("div.appmsg_edit_box").css({
overflow:"hidden"
}),setTimeout(function(){
$("div.appmsg_edit_box").css({
overflow:""
});
},0);
},100),$("#js_appmsg_upload_cover").siblings("ul").hide();
var s=$(r.editor_selector).find(".js_cover").find(".js_cover_preview");
0==e?s.addClass("first_appmsg_cover"):s.removeClass("first_appmsg_cover");
},
updateRemoteImg:function(e){
var t,i=e.article,r=i.data("article").data||{},n=i.hasClass("current")?!0:!1,a=$("<div>"),s=(e.type,
e.uid);
if(n)t=$(this.ueditor.getDocument()).find("[data-remoteid="+s+"]");else{
if(this.ueditor.funcPvUvReport("not_cur_img_count"),!r.content)return;
t=a.html(r.content).find("[data-remoteid="+s+"]");
}
if(t){
this.changeRemoteImgUrl({
imgDom:t,
type:e.type,
remoteType:e.remoteType,
format:e.format,
img_url:e.img_url
});
var o=$("body").find("div.dialog_wrp").find(".js_imgItemSrc[data-remoteid="+s+"]");
o&&o.length>0&&(this.changeRemoteImgUrl({
imgDom:o,
type:"bg",
remoteType:e.remoteType,
img_url:e.img_url,
errDefaultStyle:!0
}),o.parents(".js_imgItem").removeClass("loading_item"),o.siblings(".js_title_img_mask").remove()),
n||(r.content=a.html(),i.data("article").data=r);
}
},
changeRemoteImgUrl:function(e){
var t=$(e.imgDom),i=e.remoteType,r=e.format,n=e.img_url;
t.removeClass("js_catchingremoteimage"),"img"==e.type?(t.attr({
src:n
}).removeAttr("_src").removeAttr("data-src").data("src",""),"success"==i&&r?t.attr({
"data-type":r
}):"error"==i&&(e.errDefaultStyle!==!0&&t.css({
width:"497px",
height:"auto"
}),t.addClass("js_catchremoteimageerror"))):"bg"==e.type&&(t.css({
"background-image":"url("+n+")"
}),"error"==i&&t.addClass("js_catchremoteimageerror")),t.removeAttr("data-remoteid").data("remoteid","");
},
_checkRepeat:function(){
try{
var e=function(e,t,i){
var r={};
return e=$.extend(e,t),$.each(i,function(t,i){
r[i]=e[i];
}),r;
},t=this,i=t.$current.index(),r=t.$current.data("article").data,n=["author","digest","file_id","source_url","title","content"],a=e({},r,n);
if(""==r.content||""==r.title)return;
var s=!0;
if($.each(n,function(e,t){
a[t]&&(s=!1);
}),s)return;
t.$list.find(".js_appmsg_item").each(function(r){
if(r!=i){
var s=e({},$(this).data("article").data,n);
w(a,s)&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=[repeat][appid:%s,idx:%s,bizuin:%s]".sprintf(28308,1,t.app_id||0,r,wx.data.uin));
}
});
}catch(o){}
},
getData:function(e,t){
var i=this,r=[],n=null,a=i.$current;
a&&(n=a.data("article"),n&&n.flush());
var s=!0;
return i.$list.find(".js_appmsg_item").each(function(n){
var a=$(this).data("article");
if(a){
var o=a.getData(e,t);
return null==o?(i.select(n,!0,!0),s=!1,!1):void r.push(o);
}
}),s&&r;
},
getPostData:function(e){
var t=this,i=t.getData(!0,e);
if(!i)return null;
var r={
AppMsgId:t.app_id,
count:i.length
};
return $.each(i,function(e,t){
var i={};
$.each(t,function(t,r){
i[t+e]=r;
}),$.extend(r,i);
}),r;
},
update:function(e,t,i){
e&&e.length>0&&e[i]&&t.setContent(e[i],!1);
},
save:function(e,t,r,n,a,s){
var l=0,d=this;
try{
l=3;
var u=d.getData();
l=4;
var f=d.getPostData(r||s);
if(l=5,!f)return;
d.hasConfirmed&&(d.hasConfirmed=!1,f.confirm=1),e.btn(!1),i(30,.1,"error"),d._checkRemoteImage({
btn:e,
postData:f,
isPreview:r,
strict:s,
callback:function(s){
s=d.filtercharCode(s),i(31,.1,"error"),m.appmsg.save(!0,10,s,function(i){
e.btn(!0),d.draft.clear(),d.draft=new p(i.appMsgId),d.app_id=i.appMsgId,d.lastData=u,
d.update(i.filtered_content_html,n,a),t(i,s),d._checkExternalLink(s);
},function(t,i){
switch(e.btn(!0),0!=t&&d.select(1*t),+i){
case 412:
o.err("图文中含非法外链");
break;

case 1530503:
$(".frm_msg.js_warn").show(),$("input[name='source_url']").focus();
break;

case 1530504:
$(".page_msg.js_warn").show(),$(window).scrollTop(0);
break;

case 153007:
c.show({
width:750,
type:"warn",
msg:"很抱歉，原创声明不成功|你的文章内容未达到声明原创的要求，满足以下任一条件可发起声明：<br />1、文章文字大于300字<br />2、文章文字小于300字，视频均为你已成功声明原创的视频<br />3、文章文字小于300字，无视频，图片（包括封面图）均为你已成功声明原创的图片",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
break;

case 153008:
c.show({
width:750,
type:"warn",
msg:"很抱歉，原创声明不成功|你的文章内容少于300字，未达到申请原创内容声明的字数要求。",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
break;

case 153009:
c.show({
width:750,
type:"warn",
msg:"很抱歉，原创声明不成功|你的文章内容未达到声明原创的要求，满足以下任一条件可发起声明：<br />1、文章文字大于300字<br />2、文章文字小于300字，无视频，图片（包括封面图）均为你已成功声明原创的图片",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
break;

case 153010:
c.show({
width:750,
type:"warn",
msg:"很抱歉，原创声明不成功|你的文章内容未达到声明原创的要求，满足以下任一条件可发起声明：<br />1、文章文字大于300字<br />2、文章文字小于300字，视频均为你已成功声明原创的视频",
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
c.show({
type:"warn",
msg:"图文消息中含有诱导分享内容|为保证用户体验，微信公众平台禁止发布各种诱导分享行为。你所编辑的图文消息可能涉及诱导分享内容。<br/>                                    你可以继续保存和发布该图文消息，若发布后被举报并核实确有诱导分享行为，公众平台将根据规定进行处理。<br/>                                    <a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3' target='_blank'>诱导分享违规行为说明</a>",
buttons:[{
text:r?"继续预览":"继续保存",
click:function(){
this.remove(),d.hasConfirmed=!0,e.trigger("click");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
break;

case 153012:
setTimeout(function(){
$("html, body").animate({
scrollTop:$(".origined").offset().top-60
});
},100),$("#original_type_msg").show();
}
});
}
}),l=6;
}catch(h){
e.btn(!0),o.err("保存失败，请稍后再试"),l&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=%s_%s_1&lc=1&log0=[errmsg:%s,appid:%s,bizuin:%s]".sprintf(28308,l,h.message,d.app_id||0,wx.data.uin));
}
},
filtercharCode:function(e){
var t=!1;
for(var i in e)e.hasOwnProperty(i)&&"function"==typeof e[i].replace&&(e[i]=e[i].replace(/[\ud800-\uDFFF]/g,function(e,i,r){
return/[\ud800-\udbff]/.test(e)&&/[\uDC00-\uDFFF]/.test(r.charAt(i+1)||"")?e:/[\ud800-\udbff]/.test(r.charAt(i-1)||"")&&/[\uDC00-\uDFFF]/.test(e)?e:(t=!0,
"");
}));
return t&&((new Image).src="//mp.weixin.qq.com/mp/jsmonitor?idkey=28308_11_1"),e;
},
preview:function(e,t){
var i=this;
i.save($("#js_preview"),function(r){
for(var n=i.getPostData(),a=0;8>a;a++)n["content"+a]&&(n["content"+a]=e.handlerContent(n["content"+a]));
_.show(n,i.$current.data("id")),"function"==typeof t&&t(r);
},!0,e,i.$current.data("id"));
},
_preview:function(){
var e=this,t=e.getPostData();
if(t){
for(var i=0,r=0;r<t.count;r++)if(t["copyright_type"+r]){
i=1;
break;
}
var n=null,a=null,l=[];
if(s.get(wx.data.uin+"previewAccounts"))try{
l=s.get(wx.data.uin+"previewAccounts").split("|");
}catch(d){
l=[];
}
var u=$(template.render("previewTpl",{
label:"请输入微信号，此图文消息将发送至该微信号预览。",
tips:1==i?"本文申请的原创声明还未经平台审核，故预览不会出现原创标识。":"",
accounts:l
})).popup({
title:"发送预览",
className:"simple label_block",
onHide:function(){
this.remove();
},
onOK:function(){
var i=this,r=i.get(),d=r.find(".frm_input"),u=r.find(".js_preview_dialog_content"),p=d.val().trim();
if(u.removeClass("with_qrcheck"),r.find(".jsAccountFail").html("").hide(),t.preusername=p,
0==p.length)return $(".jsAccountFail").text("请输入预览的账号").show(),!0;
if(null!=n&&n.getCode().trim().length<=0)return o.err("请输入验证码"),n.focus(),!0;
var f=r.find(".btn_primary>.js_btn").btn(!1);
t.imgcode=n&&n.getCode().trim();
return e.hasConfirmed&&(t.confirm=1),o.remove(),e.draft.isDropped=!0,t.is_preview=1,
m.appmsg.preview(!0,10,t,function(){
i.remove(),setTimeout(function(){
f.btn(!0);
},500);
var e=[];
l.each(function(i){
i!=t.preusername&&e.push(i);
}),l=e,l.length<3?l.push(t.preusername):(l.shift(),l[2]=t.preusername),s.set(wx.data.uin+"previewAccounts",l.join("|"));
},function(t){
if(r.find(".jsAccountFail").html(t.word).show(),f.btn(!0),d.focus(),t){
if(!t||"-6"!=t.ret&&"-8"!=t.ret||(a=r.find(".js_verifycode"),n=a.html("").removeClass("dn").verifycode().data("verifycode"),
n.focus()),t&&t.antispam&&e.select(1*t.msg),"412"==t.ret)return void $(".jsAccountFail").text("图文中含非法外链").show();
switch(+t.ret){
case 412:
r.find(".jsAccountFail").text("图文中含非法外链").show();
break;

case 15801:
case 15802:
case 15803:
case 15804:
case 15805:
case 15806:
i.remove(),c.show({
type:"warn",
msg:"图文消息中含有诱导分享内容|为保证用户体验，微信公众平台禁止发布各种诱导分享行为。你所编辑的图文消息可能涉及诱导分享内容。<br/>                                    你可以继续保存和发布该图文消息，若发布后被举报并核实确有诱导分享行为，公众平台将根据规定进行处理。<br/>                                    <a href='https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3' target='_blank'>诱导分享违规行为说明</a>",
buttons:[{
text:"继续发送",
click:function(){
this.remove(),e.hasConfirmed=!0,f.trigger("click");
}
},{
text:"取消",
type:"normal",
click:function(){
this.remove();
}
}]
});
break;

case 64503:
u.addClass("with_qrcheck");
}
}
}),!0;
}
});
u.find(".jsAccount").click(function(){
$(this).hasClass("selected")?($(this).removeClass("selected"),$(".jsAccountInput").val("")):($(this).addClass("selected"),
$(".jsAccountInput").val($(this).data("value")));
}),u.find(".jsAccountInput").keyup(function(e){
$(".jsAccountFail").hide(),$(".jsAccount").removeClass("selected");
var t="which"in e?e.which:e.keyCode;
13==t&&$(this).parents(".dialog").find("button:eq(0)").trigger("click");
}).placeholder(),u.find(".jsAccountDel").click(function(){
var e=$(this).data("index");
return l.length>e&&l.splice(e,1),$(this).parent().remove(),s.set(wx.data.uin+"previewAccounts",l.join("|")),
!1;
}),l.length>0&&u.find(".jsAccount").last().click();
}
}
});
return b;
});define("tpl/media/appmsg_edit/article.html.js",[],function(){
return'<!--\n<div class="page_msg mini">\n    <div class="inner">\n        <span class="msg_icon_wrp"><i class="icon_msg warn"></i></span>\n        <div class="msg_content">\n            <p>xxxxxxx</p>\n        </div>\n    </div>\n    <span class="msg_closed">关闭</span>\n</div>\n-->\n<div class="appmsg_editor">\n    <div class="appmsg_editor_inner">\n        <!-- BEGIN UEDITOR -->\n        <div id="js_ueditor" class="appmsg_edit_item content_edit">\n            <label for="" class="frm_label" style="display:none;">\n                <strong class="title">正文</strong>\n\n                <p class="tips l">\n                    <em id="js_auto_tips"></em>\n                    <a id="js_cancle" style="display:none;" href="javascript:void(0);"\n                       onclick="return false;">取消</a>\n                </p>\n            </label>\n<!--        <div class="frm_msg fail js_catch_tips" style="display:none;">有5张图片粘贴失败</div>\n            <div class="frm_msg fail js_content_error" style="display:none;">正文不能为空且长度不能超过20000字</div> -->\n            <div id="js_editor" class="edui_editor_wrp"></div>\n        </div>\n        <!-- END UEDITOR -->\n\n        <div class="appmsg_edit_function_area ">\n            <!-- BEGIN 原文链接 -->\n            <div class="js_url_area appmsg_edit_item origin_url_area">\n                <label for="" class="frm_label">\n                    <label class="frm_checkbox_label" for="js_url_checkbox">\n                        <input type="checkbox" class="frm_checkbox js_url_checkbox js_field" name="source_url_checked">\n                        <i class="icon_checkbox"></i>\n                        <span class="lbl_content">\n                            原文链接                        </span>\n                    </label>\n                </label>\n                <span class="frm_input_box" style="display:none;"><input type="text" class="js_url frm_input js_field" name="source_url"></span>\n                <span class="js_url_ban_wording" style="position:relative; top:1em;"></span>\n                <div class="profile_link_msg_global source_url frm_msg fail js_warn" style="display:none;">请勿添加其他公众号的主页链接</div>\n                <div class="frm_msg fail js_url_error" style="display:none;">链接不合法</div>\n            </div>\n            <!-- END 原文链接 -->\n            <!--BEGIN 留言 -->\n            {if can_use_comment}\n            <div class="appmsg_edit_item ">\n                <label class="frm_checkbox_label comment_checkbox" for="">\n                    <input type="checkbox" class="frm_checkbox js_comment js_field" checked name="need_open_comment">\n                    <i class="icon_checkbox"></i>\n                    <span class="lbl_content">留言<span class="tips_global">每次勾选后，文章必须经过群发，读者才能在文章底部留言</span></span>\n                </label>\n                <div class="comment_radio_wrp" id="js_comment_setting_wrp" style="display:none;">\n                    <input data-label="所有人可留言" class="frm_radio js_comment_setting" type="radio" value="0">\n                    <input data-label="仅关注后可留言" class="frm_radio js_comment_setting" type="radio" value="1">\n                </div>\n            </div>\n            {/if}\n            <!-- END 留言-->\n            {if has_invited_original}\n            <!--如果可以使用原创功能-->\n            <div id="js_original" class="appmsg_edit_item original_area ">\n                <!--BEGIN 未开通原创-->\n                {if can_use_copyright}\n                <div class="unorigin js_original_type">\n                    <div class="cont">\n                        <h4 class="subtitle">原创：未声明</h4>\n                        <!--\n                        <p class="tips_global original_title_tips">原创声明是公众平台关于支持原创者的功能</p>\n                        -->\n                    </div>\n                    <div class="opt">\n                        <a href="javascript:;" onclick="return false;" class="btn btn_default js_original_apply">声明原创</a>\n                    </div>\n                </div>\n                {else}\n                <div class="unorigin js_original_type">\n                    <div class="cont">\n                        {if orginal_apply_stat == 0}\n                        <h4 class="subtitle">原创声明：未开通</h4>\n                        {else if orginal_apply_stat == 1}\n                        <h4 class="subtitle">原创声明：审核中</h4>\n                        {else if orginal_apply_stat == 2}\n                        <h4 class="subtitle">原创声明：申请失败</h4>\n                        {else if orginal_apply_stat == 3}\n                        {/if}\n                    </div>\n                    {if orginal_apply_stat == 0}\n                    <div class="opt">\n                        <div class="description">\n                            <p class="desc">原创声明是公众平台为维护原创作者权益推出的功能。</p>\n                            <p class="desc">1. 开通后，你可以选择文章是否允许被转载；</p>\n                            <p class="desc">2. 声明原创的文章被转载时，系统会自动注明文章出处。</p>\n                        </div>\n                        <a href="javascript:;" onclick="return false;" class="btn btn_default" id="js_original_func_open">开通</a>\n                    </div>\n                    {/if}\n                </div>\n                {/if}\n                <!--END 未开通原创-->\n                <!--BEGIN 开通原创-->\n                <div class="origined js_original_type" style="display:none;">\n                    <label class="frm_label" id="js_original_open">\n                        <span class="mini_tips icon_before l">\n                            原创：已声明                        </span>\n                        <a href="javascript:;" onclick="return false;" class="js_original_cancel r">撤销声明</a>\n                        <a href="javascript:;" onclick="return false;" class="js_original_apply r">编辑声明</a>\n                    </label>\n\n                    <div class="normal_flow js_original_content" style="display:none">\n                        <!--添加.js_original_content元素 .open类名，小箭头向上，不添加则向下-->\n                        <div id="js_original_detail" class="preview_hd">\n                            原创详情<i class="icon_arrow"></i>\n                        </div>\n                        <ul class="simple_preview_list tips_global">\n                            <!--\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">原文链接</label>\n\n                                <div class="simple_preview_value js_url"></div>\n                            </li>\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">首发平台</label>\n\n                                <div class="simple_preview_value js_platform"></div>\n                            </li>\n                            -->\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">作者</label>\n\n                                <div class="simple_preview_value js_author"></div>\n                            </li>\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">文章类别</label>\n\n                                <div class="simple_preview_value js_classify"></div>\n                            </li>\n                            <li class="simple_preview_item">\n                                <label class="simple_preview_label" for="">转载类型</label>\n\n                                <div class="simple_preview_value js_frm"></div>\n                            </li>\n                        </ul>\n                        {if can_use_reward}\n                        <!--如果可以使用赞赏功能-->\n                        <div class="reward">\n                            <label class="frm_checkbox_label" for="reward">\n                                <input type="checkbox" name="can_reward" class="frm_checkbox js_reward js_field" value="1" checked>\n                                <i class="icon_checkbox"></i>\n                                <span class="lbl_content">\n                                    接受用户赞赏  <a onclick="return false;" href="javascript:;" class="js_reward_notice">查看赞赏使用须知</a>                                    <!--<span class="mini_tips weak_text">（申请原创声明后才可勾选）</span>-->\n                                </span>\n                            </label>\n\n                            <div class="appmsg_edit_item js_reward_div">\n                                <span class="frm_input_box reward_wording"><input type="text" name="reward_wording" class="frm_input  js_counter js_reward_wording js_field"\n                                    max-length="15" placeholder="赞赏引导语（选填）"></span>\n                            </div>\n                        </div>\n                        {/if}\n                        {if can_use_payforread}\n                        <!--如果可以使用付费阅读功能-->\n                        <div class="payread">\n                            <label class="frm_checkbox_label" for="js_pay">\n                                <input name="payforread_enabled" type="checkbox" id="js_pay" class="frm_checkbox js_field" value="1">\n                                <i class="icon_checkbox"></i>\n                                <span class="lbl_content">\n                                    付费阅读                                    <span class="mini_tips weak_text js_pay_tips">（只有“禁止转载”的原创文章才可以设置付费阅读）</span>\n                                </span>\n                                <p class="pay_seting js_pay_setting" style=\'display:none\'>\n                                    <label class="frm_fee">金额：<span class="js_fee"></span>元</label>\n                                    <a onclick="return false;" href="javascript:;" class="js_pay_edit">修改</a>\n                                </p>\n                            </label>\n                        </div>\n                        {/if}\n                        <!--<input type="hidden" class="js_original_publish">-->\n                        <input type="hidden" class="js_reprint_frm">\n                    </div>\n\n                    <p class="frm_msg fail js_error_msg" id="original_type_msg" style=\'display:none\'>请设置转载类型</p>\n                </div>\n                <!--END 开通原创-->\n            </div>\n            {/if}\n        </div>\n        \n        <div class="appmsg_edit_highlight_area">\n\n            <div class="appmsg_edit_title">发布样式编辑</div>\n            <!-- EBGIN 封面 -->\n            <div class="appmsg_edit_item gap_left">\n                <label for="" class="frm_label">\n                    <strong class="title">封面</strong>\n\n                    <p class="js_cover_tip tips gap_left"></p>\n                </label>\n                <div class="upload_wrap">\n                    <div class="">\n                        <!--\n                        <div class="upload_box">\n                            <div class="upload_area">\n                                <a id="js_appmsg_upload_cover" href="javascript:void(0);" onclick="return false;"\n                                   class="btn btn_upload">\n                                    本地上传                                </a>\n                            </div>\n                        </div>-->\n                        <a id="js_selectCoverFromContent" href="javascript:void(0);" onclick="return false;"\n                           class="btn btn_upload">从正文选择</a>\n                        &nbsp;&nbsp;\n                        <a id="js_imagedialog" href="javascript:void(0);" onclick="return false;"\n                                       class="btn btn_upload">从图片库选择</a>\n                    </div>\n                    \n\n                    <div class="cover_preview_wrp js_cover">\n                        <!-- 20160415 -->\n                        <!-- 这里的js_cover先去掉了，要改dom，不能用img，改用span加背景图片方式 -->\n                        <!-- cover_preview默认隐藏，有数据了才显示 -->\n                        <span class="cover_preview js_cover_preview">\n                            <div class="card_mask_global js_tip_mask hover_mask">\n                                <!--\n                                <p class="js_tip_mask_msg cover_error_msg">源图片已被删除<br>请<a href="javascript:void(0);">重新设置</a>封面</p>\n                                -->\n                                <a class="js_removeCover icon20_common del_media_white" title="删除封面" href="javascript:void(0);" onclick="return false;">删除</a>\n                            </div>\n                        </span>\n                        <input type="hidden" class="js_field js_file_id" name="file_id">\n                        <input type="hidden" class="js_field js_cdn_url" name="cdn_url">\n                        <input type="hidden" class="js_show_cover_pic js_field" data-type=\'checkbox\' name="show_cover_pic">\n                    </div>\n                </div>                \n\n                <!-- <p class="frm_tips">\n                    <label for="" class="frm_checkbox_label">\n                        <i class="icon_checkbox"></i>\n                        <input type="checkbox" class="frm_checkbox js_show_cover_pic js_field" name="show_cover_pic" checked>\n                        封面图片显示在正文中                    </label>\n                </p> -->\n                <div class="frm_msg js_show_cover_pic_tips" style="display: none;">\n                    <span class="tips js_msg_content">此图片将插入正文顶部</span>\n                </div>\n                <div class="frm_msg fail js_cover_error js_error_msg" style="display:none;">\n                    <span class="js_msg_content"></span>\n                </div>\n            </div>\n            <!-- END 封面 -->\n            <!-- BEGIN 摘要 -->\n            <div class="js_desc_area appmsg_edit_item gap_left align_counter appmsg_description">\n                <label for="" class="frm_label">\n                    <strong class="title">摘要</strong>\n\n                    <p class="tips l gap_left">选填，如果不填写会默认抓取正文前54个字</p>\n                </label>\n                <span class="frm_textarea_box with_counter counter_out">\n                    <textarea class="frm_textarea js_desc js_counter js_field" name="digest" max-length="120"></textarea>\n                    <em class="frm_input_append frm_counter">0/120</em>\n                </span>\n\n                <div class="frm_msg fail js_desc_error" style="display:none;"></div>\n            </div>\n            <!-- END 摘要 -->\n        </div>\n    </div>\n</div>\n';
});define("common/wx/mpEditor/editor.js",["widget/ueditor_new/themes/default/ueditor.css","widget/ueditor_new/themes/default/css/ueditor.css","widget/tooltip.css","common/wx/mpEditor/contextmenu.js","common/wx/mpEditor/plugin/popup.js","common/wx/mpEditor/plugin/remoteimg.js","tpl/tooltip.html.js","media/report.js"],function(t){
"use strict";
function e(t){
this.__o={
plugins:[],
onReady:function(){}
},this.__ueditor_config={
contextMenu:n,
UEDITOR_HOME_URL:u.URL,
isShow:!0,
initialContent:"",
autoClearinitialContent:!1,
iframeCssUrl:wx.EditorRes["themes/iframe"],
textarea:"editorValue",
focus:!1,
initialFrameWidth:"auto",
initialFrameHeight:0,
minFrameWidth:800,
minFrameHeight:400,
autoClearEmptyNode:!0,
fullscreen:!1,
readonly:!1,
zIndex:999,
imagePopup:!0,
enterTag:"p",
pageBreakTag:"_baidu_page_break_tag_",
customDomain:!0,
lang:u.LANG,
theme:"default",
allHtmlEnabled:!1,
scaleEnabled:!1,
wordCount:!1,
elementPathEnabled:!1,
autoHeightEnabled:!1,
sourceEditor:"textarea",
imageUrl:"/cgi-bin/uploadimg2cdn?t=ajax-editor-upload-img&lang="+u.LANG+"&token="+u.TOKEN,
imagePath:"",
compressSide:1,
catchRemoteImageEnable:!0,
catcherUrl:"/cgi-bin/uploadimg2cdn?lang="+u.LANG+"&token="+u.TOKEN,
separater:"",
toolbars:[["more","|","fontsize","|","blockquote","horizontal","|","removeformat"],["bold","italic","underline","forecolor","backcolor","|","justifyleft","justifycenter","justifyright","|","rowspacingtop","rowspacingbottom","lineheight","|","insertorderedlist","insertunorderedlist","|","imagenone","imageleft","imageright","imagecenter"]],
labelMap:{
anchor:"",
undo:""
},
topOffset:0
},this.__init(t);
}
t("widget/ueditor_new/themes/default/ueditor.css"),t("widget/ueditor_new/themes/default/css/ueditor.css"),
t("widget/tooltip.css");
var n=t("common/wx/mpEditor/contextmenu.js"),i=t("common/wx/mpEditor/plugin/popup.js"),o=t("common/wx/mpEditor/plugin/remoteimg.js"),r=t("tpl/tooltip.html.js"),a=t("media/report.js"),u={
LANG:window.wx.data.lang,
TOKEN:window.wx.data.t,
URL:/^dev/.test(location.host)?"/mpres/htmledition/style/widget/ueditor_new/":"//res.wx.qq.com/mpres/htmledition/style/widget/ueditor_new/"
};
return e.prototype={
__init:function(t){
this.__g={},this.__extend(t),this.__registerPlugins(),this.__createEditor(),this.__initPulginEvent(),
new o(this),this.__initReport(),this.__customEventHandle();
},
__initReport:function(){
var t=this;
this.addListener("funcPvUvReport",function(e,n,i){
t.funcPvUvReport(n,i);
});
},
__extend:function(t){
var e=this.__ueditor_config,n=this.__o;
for(var i in t)n.hasOwnProperty(i)?n[i]=t[i]:e.hasOwnProperty(i)&&(e[i]=t[i]);
"auto"!=e.initialFrameHeight&&(e.initialFrameHeight=Math.max(e.initialFrameHeight,e.minFrameHeight)),
"auto"!=e.initialFrameWidth&&(e.initialFrameWidth=Math.max(e.initialFrameWidth,e.minFrameWidth));
},
__registerPlugins:function(){
for(var t=this,e=this.__o.plugins,n=0,i=e.length;i>n;n++){
var o=e[n];
!function(e){
var n=e.getName();
UE.plugins[n]=function(){
this.commands[n]={
execCommand:e.getExecCommand(),
noCommandReprot:"function"==typeof e.noCommandReprot?e.noCommandReprot():!1
},"function"==typeof e.getQueryCommandState&&(this.commands[n].queryCommandState=e.getQueryCommandState()),
"function"==typeof e.getQueryCommandValue&&(this.commands[n].queryCommandValue=e.getQueryCommandValue());
},t.__setPluginMenu(e),t.__pluginPerformance(e);
}(o);
}
},
__setPluginMenu:function(t){
var e=this.__ueditor_config.contextMenu;
"function"==typeof t.getContextMenu&&e.push("-",t.getContextMenu());
},
__pluginPerformance:function(t){
var e=0;
switch("function"==typeof t.getType&&(e=t.getType()||0),e){
case 0:
this.__ceateDefaultBtn(t);
break;

case 1:
this.__createToolBarBtn(t);
}
},
__ceateDefaultBtn:function(t){
var e=this;
if("function"==typeof t.getContainer){
var n=$(t.getContainer()),i=t.getName();
n&&n.click(function(){
e.execCommand(i);
});
}
},
__createEditor:function(){
var t=this,e=this.__o,n=this.__ueditor_config;
this.ueditor=new UE.ui.Editor(n),this.ueditor.ready(function(){
t.__initToolbarTips(),t.__initIframeSelect(),new i(t),"function"==typeof e.onReady&&e.onReady.call(t,t.ueditor);
});
},
__initIframeSelect:function(){
var t=this.ueditor;
window.__editorIframeSelect=function(e){
for(var n=t.document.getElementsByTagName("iframe"),i=0,o=n.length;o>i;i++){
var r=n[i];
if(r.contentWindow===e){
var a=new UE.dom.Range(t.document);
a.selectNode(r).select();
break;
}
}
};
},
__initToolbarTips:function(){
var t=this.__g;
t.toolbarsTips=$(template.compile(r)({
content:""
})),t.toolbarsTips.hide(),$("body").append(t.toolbarsTips),$(this.ueditor.container).find("[id*=_toolbarboxouter]").on("mouseover",function(e){
var n=$(e.target||e.srcElement),i=n.parents("div[data-tooltip]");
if(1==i.length){
var o=i.data("tooltip");
if(o){
t.toolbarsTips.find(".tooltip_inner").html(o);
var r=i.offset();
t.toolbarsTips.css({
top:r.top-5-t.toolbarsTips.height(),
left:r.left+i.width()/2-t.toolbarsTips.width()/2
}).show();
}
}
}).on("mouseout",function(e){
0==$(e.toElement).parents("div[data-tooltip]").length&&t.toolbarsTips.hide();
});
},
__initPulginEvent:function(){
for(var t=this,e=this.__o.plugins,n=0,i=e.length;i>n;n++){
var o=e[n];
o.editor=this,"function"==typeof o.addListener&&o.addListener(t);
}
},
__createToolBarBtn:function(t){
var e="";
"function"==typeof t.getTitle&&(e=t.getTitle()||"");
var n=t.getName(),i=this.getUi();
i[n]=function(t){
return function(n){
var o=new i.Button({
className:"edui-for-"+t,
title:e,
onclick:function(){
n.execCommand(t);
},
theme:n.options.theme,
showText:!1
});
return i.buttons[t]=o,n.addListener("selectionchange",function(e,i,r){
var a=n.queryCommandState(t);
-1==a?(o.setDisabled(!0),o.setChecked(!1)):r||(o.setDisabled(!1),o.setChecked(a));
}),o;
};
}(n);
},
__customEventHandle:function(){
var t=this;
t.addListener("focus keyup aftersetcontent",function(){
t.getDom("contentplaceholder").style.display="none";
}),t.addListener("blur",function(){
""==t.ueditor.getContent().trim()&&(t.getDom("contentplaceholder").style.display="block");
});
},
_outPutFilter:function(){
for(var t=this.getDocument().getElementsByTagName("p"),e=0,n=t.length;n>e;e++)t[e].firstChild||(t[e].innerHTML="<br />");
},
ready:function(t){
if("function"==typeof t){
{
var e=this;
this.__o;
}
this.ueditor.ready(function(){
t.call(e,e.ueditor),""==e.ueditor.getContent().trim()&&(e.getDom("contentplaceholder").style.display="block");
});
}
},
addListener:function(t,e){
this.ueditor.addListener(t,e);
},
handlerContent:function(t){
for(var e=this.__o.plugins,n=0,i=e.length;i>n;n++){
var o=e[n];
"function"==typeof o.beforeSetContent&&(t=o.beforeSetContent(t));
}
return t=t.replace(/background\-image:\s*url\(https\:\/\/mp\.weixin\.qq\.com\/cgi\-bin\/appmsg(.*?)\)/g,"");
},
setContent:function(t,e){
t=this.handlerContent(t);
var n=this.__o.plugins;
this.ueditor.setContent(t,e);
for(var i=0,o=n.length;o>i;i++){
var r=n[i];
"function"==typeof r.afterSetContent&&(t=r.afterSetContent());
}
},
getEditorData:function(t){
this._outPutFilter();
for(var e=this.__o.plugins,n=0,i=e.length;i>n;n++){
var o=e[n];
"function"==typeof o.beforeGetContent&&o.beforeGetContent();
}
t=t||{},t.content=this.ueditor.getContent();
for(var n=0,i=e.length;i>n;n++){
var o=e[n];
"function"==typeof o.getPluginData&&(t=o.getPluginData(t));
}
return t.content=t.content.replace(/(<\w+[^>]*)\sid=\"([^\">]*)\"([^>]*>)/g,"$1$3"),
t;
},
queryCommandValue:function(t){
return this.ueditor.queryCommandValue(t);
},
getSelection:function(){
return this.ueditor.selection;
},
getSelectionRange:function(){
return this.getSelection().getRange();
},
getSelectionStart:function(){
return this.getSelection().getStart();
},
render:function(t){
this.ueditor.render(t);
},
getUeditor:function(){
return this.ueditor;
},
getWindow:function(){
return this.ueditor.window;
},
getDocument:function(){
return this.getWindow().document;
},
execCommand:function(){
var t=this.ueditor;
t.execCommand.apply(t,arguments);
},
fireEvent:function(){
var t=this.ueditor;
return t.fireEvent.apply(t,arguments);
},
removeListener:function(){
var t=this.ueditor;
return t.removeListener.apply(t,arguments);
},
funcPvUvReport:function(t,e){
a.addPvUv(t,e);
},
getUtils:function(){
return UE.utils;
},
getDomUtils:function(){
return UE.dom.domUtils;
},
getBrowser:function(){
return UE.browser;
},
getUi:function(){
return UE.ui;
},
getDom:function(t){
return this.ueditor.ui.getDom(t);
},
enableToolbar:function(){
this.ueditor.ui.getDom("toolbar_mask").style.display="none";
},
disableToolbar:function(){
this.ueditor.ui.getDom("toolbar_mask").style.display="block";
},
checkPlugins:function(t){
var e=this.__o.plugins,n=!0;
return $.each(e,function(e,i){
return"function"==typeof i.check?n=i.check(t):!0;
}),n;
},
isHighlight:function(){
return this.ueditor.highlight;
},
setHistory:function(t){
var e=this.getUeditor().undoManger;
if(!e)return!1;
if(!t)return e.reset(),!0;
var n=t.list;
if("[object Array]"!==Object.prototype.toString.call(n)||0==n.length)return e.reset(),
!0;
var i=t.index;
return("undefined"==typeof i||0>i||i>n.length-1)&&(i=n.length-1),e.list=n,e.index=i,
e.clearKey(),e.update(),!0;
},
getHistory:function(){
var t=this.getUeditor().undoManger;
return t?{
list:JSON.parse(JSON.stringify2(t.list)),
index:t.index
}:null;
}
},e;
});define("common/wx/mpEditor/plugin/topic.js",["common/wx/popup.js","tpl/mpEditor/plugin/topic.html.js","tpl/mpEditor/plugin/topic_layout.html.js","biz_web/ui/dropdown.js","common/wx/Cgi.js","biz_web/ui/checkbox.js","common/wx/Tips.js"],function(t){
"use strict";
function i(t){
this._o={
container:""
},this.editor=null,this._g={},this._init(t),$(t.container).show();
}
t("common/wx/popup.js");
var o=t("tpl/mpEditor/plugin/topic.html.js"),e=t("tpl/mpEditor/plugin/topic_layout.html.js"),n=t("biz_web/ui/dropdown.js"),c=t("common/wx/Cgi.js"),p=(t("biz_web/ui/checkbox.js"),
t("common/wx/Tips.js")),r=wx.cgiData.can_use_topic;
return i.prototype={
getName:function(){
return"inserttopic";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
console.log("insert topic"),r&&t._initPop();
};
},
getContainer:function(){
return this._o.container;
},
beforeSetContent:function(t){
return t=t.replace(/<wxtopic([^>]*?)js_editor_topic_card([^>]*?)><\/wxtopic>/g,"<iframe $1js_editor_topic_card$2></iframe>");
},
getPluginData:function(t){
return t.content=t.content.replace(/<iframe([^>]*?)js_editor_topic_card([^>]*?)><\/iframe>/g,"<wxtopic $1js_editor_topic_card$2></wxtopic>"),
t;
},
addListener:function(t){
var i=this;
t.addListener("beforepaste",function(t,o){
var e=$($.parseHTML(o.html)),n="iframe.js_editor_topic_card",c=e.find(n).length+e.closest(n).length;
if(0!=c)return i._getTopicNum()+c>1?(p.err("每篇图文消息只能插入一个话题，请删除之前的话题后再插入"),o.html="",
!0):void 0;
});
},
check:function(t){
return t.find("wxtopic").length>1?(p.err("每篇图文消息只能插入一个话题，请删除之前的话题后再插入"),!1):!0;
},
_init:function(t){
this._o=$.extend({},this._o,t);
},
_initPop:function(){
function t(){
var t=r._g.topicPop,i=t.find(".js_search_input"),o=t.find(".js_search_del").hide(),n=t.find(".js_search_submit");
i.keydown(function(t){
var i="which"in t?t.which:t.keyCode;
13==i&&n.trigger("click");
}),i.on("input",function(){
""==$(this).val()?o.hide():o.show();
}),o.click(function(){
i.val("").focus(),$(this).hide();
}),n.click(function(){
var t=1==a.topicPopType.value?"导演":"作者",o=i.val();
o.length>0?(r._g.topicPop.find(".js_pop_content").html(wx.T(e,{
loading:!0,
type:t
})),c.post({
url:"/cgi-bin/appmsg",
mask:!1,
data:{
action:"topic_list",
topic_title:o,
topic_type:r._g.topicPopType.value
}
},function(i){
return i&&0==i.base_resp.ret?($.each(i.topic_list,function(t,i){
"Book"==i.category?i.type="书籍":"Vedio"==i.category&&(i.type="影视"),i.author=i.author.replace(/\$\$/g," / ");
}),i.default_img_url=wx.cgiData.topic_default_img,i.type=t,r._g.topicPop.find(".js_pop_content").html(wx.T(e,i)),
void r._g.topicPop.find(".js_pop_content input[type=radio]").checkbox({
multi:!1
})):(p.err("系统错误，请稍后再试"),void r._g.topicPop.find(".js_pop_content").html(wx.T(e,{
loading:!1,
type:t,
topic_list:[]
})));
})):p.err("请输入搜索条件");
});
}
function i(){
var t=$(".js_search_input"),i=$(".js_tips");
a.topicPopType=new n({
container:a.topicPop.find(".js_topic_drop"),
data:[{
name:"影视",
value:1
},{
name:"书籍",
value:0
}],
callback:function(o){
0==o?(t.attr("placeholder","请输入书名或图书ISBN编码").focus(),i.text("书籍数据由亚马逊提供")):(t.attr("placeholder","请输入电影或电视名称").focus(),
i.text("数据由腾讯视频提供"));
}
}),a.topicPopType.selected(0);
}
var r=this,a=this._g,s=this.editor,_=s.ueditor.getContent();
return/<iframe([^>]*?)js_editor_topic_card([^>]*?)><\/iframe>/.test(_)?void p.err("每篇图文消息只能插入一个话题，请删除之前的话题后再插入"):(a.topicPop=$(o).popup({
title:"添加话题",
className:"align_edge topic_dialog media_list_dialog",
width:"960",
buttons:[{
text:"确定",
type:"primary",
click:function(){
var t=r._g.topicPop.find(".js_pop_content input:checked");
if(0===t.length)return void p.err("请选择一个话题卡片");
var i=["img_url","title","type","author","msg_num"],o="/cgi-bin/readtemplate?t=tmpl/topic_tmpl";
$.each(i,function(i,e){
o+="&%s=%s".sprintf(e,encodeURIComponent(t.data(e)));
}),o=wx.url(o);
var e='<iframe frameborder="0" class="js_editor_topic_card topic_iframe" src="%s" data-topic-type="%s" data-topic-id="%s" data-topic-sn="%s"></iframe>'.sprintf(o,a.topicPopType.value,t.val(),t.data("sn"));
r._isbn=t.val(),r._insertTopic(e),this.remove();
}
},{
text:"取消",
click:function(){
a.topicPop=null,this.remove();
}
}],
close:function(){
a.topicPop=null,this.remove();
}
}),i(),void t());
},
_insertTopic:function(t){
var i=this.editor;
i.execCommand("inserthtml",t,!0),i.funcPvUvReport("inserttopic");
},
_getTopicNum:function(t){
if(!t){
var i=this.editor.getUeditor();
t=$(i.body);
}
return t.find("iframe.js_editor_topic_card").length;
}
},i;
});define("common/wx/mpEditor/plugin/video.js",["common/wx/mpEditor/editor_all_min.js","common/wx/Tips.js","common/wx/media/videoDialog.js"],function(e){
"use strict";
function i(e,i,t,r,o,n,a,s){
return o?"<iframe "+(a?"class='"+a+"'":"")+(s?" "+s+" ":"")+' style="position:relative; z-index:1;" height='+t+" width="+i+' frameborder=0 src="'+e+'" allowfullscreen></iframe><br/>':(n?"<p "+("none"!=r?"center"==r?' style="text-align:center;" ':' style="float:"'+r:"")+">":"")+'<img align="'+r+'" width="'+i+'" height="'+t+'" _url="'+e+'" class="edui-faked-video" src="'+me.options.UEDITOR_HOME_URL+'themes/default/images/spacer.gif" style="background:url('+me.options.UEDITOR_HOME_URL+'themes/default/images/videologo.gif) no-repeat center center; border:1px solid gray;" />'+(n?"</p>":"");
}
e("common/wx/mpEditor/editor_all_min.js");
var t=e("common/wx/Tips.js"),r=e("common/wx/media/videoDialog.js"),o=wx.cgiData,n=function(e){
this.domid=e.container;
var i=(this.container=$(e.container).show(),this);
i.report_vid_type=[];
};
return n.prototype={
getName:function(){
return"insertvideo";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var e=this;
return function(){
var i=e.editor,n=this;
if(i){
var a=i.getDocument();
$(a).find("iframe.video_iframe").length<3?new r({
can_use_shortvideo:!!(wx&&wx.acl&&wx.acl.msg_acl&&wx.acl.msg_acl.can_use_shortvideo),
can_use_txvideo:wx.cgiData.can_use_txvideo,
scene:"ueditor",
onOK:function(t,r){
if(21==t){
var a="//mp.weixin.qq.com/mp/getcdnvideourl?__biz=%s&cdn_videoid=%s&thumb=%s".sprintf(o.biz_uin,encodeURIComponent(r.video_cdn_id),encodeURIComponent(r.video_thumb_cdn_url)),s=a+"&shortvideo_sn="+o.shortvideo_sn,d='<iframe data-shortvideofileid="%s" data-vidtype=3 class="video_iframe video_small_iframe" style="height:240px;width:320px !important;" frameborder=0 scrolling="no" src="%s" data-src="%s" allowfullscreen></iframe><br/>'.sprintf(r.file_id,s,a);
i.execCommand("inserthtml",d,!0),i.funcPvUvReport("wxvideo");
}else 15==t?(r.height=375,r.width=500,r.vid=r.content,r.vidtype=2,r.url="https://v.qq.com/iframe/preview.html?vid="+r.vid+"&width=500&height=375&auto=0",
e.doCommand(n,"insertvideo",r),i.funcPvUvReport("mpvideo")):(0==r.subtype?r.vidtype=1:1==r.subtype?r.vidtype=4:2==r.subtype&&(r.vidtype=5),
e.doCommand(n,"insertvideo",r),i.funcPvUvReport("qqvideo"));
return!0;
}
}):t.err("最多添加3个素材库视频，微信小视频（帐号需认证）或腾讯视频");
}
};
},
doCommand:function(e,t,r){
console.log("insert video");
var o=e;
r=UE.utils.isArray(r)?r:[r];
for(var n,a=[],s=0,d=r.length;d>s;s++){
n=r[s];
var c="";
n.vidtype&&(c="data-vidtype='"+n.vidtype+"'"),a.push(i(n.url,n.width||420,n.height||280,n.align||"none",!0,!0,"video_iframe",c));
}
o.execCommand("inserthtml",a.join(""),!0);
var m=document.createElement("div");
m.className="js_vid",m.setAttribute("name",n.vid),document.getElementsByTagName("body")[0].appendChild(m);
},
check:function(e){
var i=$(e).find("iframe"),r=0;
return $.each(i,function(e,i){
$(i).hasClass("video_iframe")&&r++;
}),r>3?(t.err("最多添加3个素材库视频，微信小视频（帐号需认证）或腾讯视频"),!1):!0;
},
getContainer:function(){
return this.domid;
},
getQueryCommandState:function(){
return function(){
var e=this,i=e.selection.getRange().getClosedNode(),t=i&&"edui-faked-video"==i.className;
return t?1:0;
};
},
getPluginData:function(e){
if(!e||!e.content)return e;
e.content=e.content.replace(/<iframe([^>]*?)(\s)+src=\"https:\/\/v\.qq\.com\/iframe/g,'<iframe$1 data-src="https://v.qq.com/iframe'),
e.content=e.content.replace(/<iframe([^>]*?)(\s)+src=\"http:\/\/z\.weishi\.com\/weixin\/player\.html/g,'<iframe$1 data-src="http://z.weishi.com/weixin/player.html'),
e.content=e.content.replace(/<iframe (data-shortvideofileid[^>]*?)\ssrc=\"([^\"]+)\"([^>]*)>/g,"<iframe $1$3>"),
e.content=e.content.replace(/<iframe ([^>]*)\ssrc=\"([^\"]+)\"([^>]*data-shortvideofileid[^>]*)>/g,"<iframe $1$3>");
var i=$("<div>"+e.content+"</div>").find("iframe"),t=[],r=[],o=[];
return i.each(function(){
var e=$(this),i=e.data("shortvideofileid"),n=e.data("src")||e.attr("src")||"",a=e.data("vidtype");
i&&o.push(i);
var s=(n+"").match(/http(s)*\:\/\/v\.qq\.com\/iframe\/(preview|player)\.html\?(.*?)vid\=([^&]+)/);
s&&s[4]&&(t.push(s[4]),r.push(a||"-1"));
}),e.video_id=t.join(","),e.vid_type=r.join(","),e.shortvideofileid=o.join("|"),
e;
},
beforeSetContent:function(e){
return e=e.replace(/<iframe (data-shortvideofileid[^>]*?data\-src=\")([^\"]+)(\")([^>]*)>/g,'<iframe $1$2$3 src="%s" $4>'.sprintf("%s&shortvideo_sn=%s".sprintf("$2",wx.cgiData.shortvideo_sn))),
e=e.replace(/<iframe ([^>]*data\-src=\")([^\"]+)(\")([^>]*data-shortvideofileid[^>]*)>/g,'<iframe $1$2$3 src="%s" $4>'.sprintf("%s&shortvideo_sn=%s".sprintf("$2",wx.cgiData.shortvideo_sn))),
e=e.replace(/<iframe([^>]*?)data\-src=\"https:\/\/v\.qq\.com\/iframe/g,'<iframe$1src="https://v.qq.com/iframe'),
e=e.replace(/<iframe([^>]*?)data\-src=\"http:\/\/z\.weishi\.com\/weixin\/player\.html/g,'<iframe$1src="http://z.weishi.com/weixin/player.html');
}
},n;
});define("common/wx/mpEditor/plugin/img.js",["common/wx/mpEditor/editor_all_min.js","tpl/mpEditor/plugin/img_popup.html.js","common/wx/media/imageDialog.js"],function(t){
"use strict";
t("common/wx/mpEditor/editor_all_min.js");
var e=t("tpl/mpEditor/plugin/img_popup.html.js"),i=t("common/wx/media/imageDialog.js"),a=function(t){
this.domid=t.container;
this.container=$(t.container).show();
};
return a.prototype={
getName:function(){
return"insertimage";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
var e=this,a=t.editor;
a&&i({
maxSelect:100,
doselected:!0,
uploadGroupId:3,
completeUploadMinSelectNum:1,
onOK:function(i){
t.doCommand(e,"insertimage",i.map(function(t){
return t.src=t._src=t.url,t;
}));
var r=0,o=0;
$.each(i,function(t,e){
"upload"==e.source?r++:o++;
}),r>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:39,
val:r,
level:"trace",
content:"[file=media/appmsg_edit]"
}),o>0&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:40,
val:o,
level:"trace",
content:"[file=media/appmsg_edit]"
});
var n=i.length;
n>0&&a.funcPvUvReport("insertimage",n),this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
},
onHide:function(){
this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
};
},
doCommand:function(t,e,i){
if(i){
console.log("insert image");
var a="300,640";
if(i=UE.utils.isArray(i)?i:[i],i.length){
var r,o=t,n=[],s="";
if(r=i[0],1==i.length){
var c=r.format||"";
"gif"==c&&(r.src+="/mmbizgif");
var l=' data-s="'+a+'" ';
r.src&&/\/mmbizgif$/.test(r.src)&&(r.src=r.src.replace(/\/mmbizgif$/,""),l=" "),
l+=c?' data-type="'+c+'" ':"",s="<img "+l+' src="'+r.src+'" '+(r._src?' _src="'+r._src+'" ':"")+(r.width?'width="'+r.width+'" ':"")+(r.height?' height="'+r.height+'" ':"")+("left"==r.floatStyle||"right"==r.floatStyle?' style="float:'+r.floatStyle+';"':"")+(r.title&&""!=r.title?' title="'+r.title+'"':"")+(r.border&&"0"!=r.border?' border="'+r.border+'"':"")+(r.alt&&""!=r.alt?' alt="'+r.alt+'"':"")+(r.hspace&&"0"!=r.hspace?' hspace = "'+r.hspace+'"':"")+(r.vspace&&"0"!=r.vspace?' vspace = "'+r.vspace+'"':"")+"/>",
"center"==r.floatStyle&&(s='<p style="text-align: center">'+s+"</p>"),n.push(s);
}else for(var m=0;r=i[m++];){
"gif"==r.format&&(r.src+="/mmbizgif");
var l=' data-s="'+a+'" ';
r.src&&/\/mmbizgif$/.test(r.src)&&(r.src=r.src.replace(/\/mmbizgif$/,""),l=" "),
l+=r.format?' data-type="'+r.format+'" ':"",s="<p "+("center"==r.floatStyle?'style="text-align: center" ':"")+"><img "+l+' src="'+r.src+'" '+(r.width?'width="'+r.width+'" ':"")+(r._src?' _src="'+r._src+'" ':"")+(r.height?' height="'+r.height+'" ':"")+' style="'+(r.floatStyle&&"center"!=r.floatStyle?"float:"+r.floatStyle+";":"")+(r.border||"")+'" '+(r.title?' title="'+r.title+'"':"")+" /></p>",
n.push(s);
}
return o.execCommand("insertHtml",n.join("")+"<br/>");
}
}
},
getContainer:function(){
return this.domid;
},
getPluginData:function(t){
return t.content=t.content.replace(/<img(.*?)\s+src="/g,'<img$1 data-src="').replace(/https:\/\/mmbiz\.qlogo\.cn\//g,"http://mmbiz.qpic.cn/"),
t;
},
addListener:function(t){
var e=this,i=t.getUeditor();
t.getBrowser().webkit&&t.addListener("click",function(t,e){
if("IMG"==e.target.tagName&&"false"!=i.body.contentEditable){
var a=new UE.dom.Range(i.document);
a.selectNode(e.target).select();
}
}),this._showPopup(t),t.addListener("afterpaste",function(t,e,i){
$.each(i,function(){
$(this).find("img").each(function(){
var t=$(this).attr("src");
t.indexOf("/s640?")>-1&&t.indexOf("wx_fmt=gif")>-1&&$(this).parent().hasClass("gif_img_wrp")&&$(this).parent().before(this).remove();
});
});
}),t.addListener("insertMaterialImg",function(t,a){
return e.doCommand(i,"insertimage",a);
});
},
beforeGetContent:function(){
var t=this,e=$(t.editor.getDocument()),i=e.find("body").width(),a=e.find("img");
try{
a.each(function(){
var t=$(this),e=this.naturalWidth||t.width(),a=this.naturalHeight||t.height();
if(t.attr("data-ratio",a/e),t.attr("data-w",i==e?"":e),"undefined"==typeof this.naturalWidth){
var r=new Image;
r.onload=function(){
var e=this.width,a=this.height;
t.attr("data-ratio",a/e),t.attr("data-w",i==e?"":e),r.onload=null;
},r.src=t.attr("src");
}
});
}catch(r){}
},
beforeSetContent:function(t){
return t=t.replace(/<img(.*?)\s+data\-src="/g,'<img$1 src="').replace(/http:\/\/mmbiz\.qpic\.cn\//g,"https://mmbiz.qlogo.cn/")||"";
},
_showPopup:function(t){
var i=t.getUeditor();
t.addListener("handle_common_popup",function(t,a){
var r=i.selection.getRange().getClosedNode();
if(r&&/^img$/i.test(r.tagName)){
var o=!1;
"100%"==r.style.width&&"auto"==r.style.height&&(o=!0),a.html+=wx.T(e,{
needBreak:a.html?!0:!1,
hasadapt:o
}),a.node=r;
}
});
}
},a;
});define("common/wx/mpEditor/plugin/audio.js",["common/wx/popup.js","biz_web/ui/checkbox.js","tpl/media/plugin/audio.html.js","tpl/media/plugin/audioItem.html.js","common/wx/Cgi.js","common/wx/media/audio.js","common/wx/pagebar.js","biz_common/moment.js","common/wx/Tips.js"],function(i){
"use strict";
function e(i){
this.__o={
container:""
},this.editor=null,this.__g={
maxNum:1
},this.__init(i),$(i.container).show();
}
i("common/wx/popup.js"),i("biz_web/ui/checkbox.js");
var t=i("tpl/media/plugin/audio.html.js"),o=i("tpl/media/plugin/audioItem.html.js"),n=i("common/wx/Cgi.js"),a=i("common/wx/media/audio.js"),_=i("common/wx/pagebar.js"),r=i("biz_common/moment.js"),s=i("common/wx/Tips.js");
return e.prototype={
getName:function(){
return"insertaudio";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var i=this,e=this.__g;
return function(){
i.__getAudioNum()>=e.maxNum?s.err("每篇图文消息只能添加一个语音"):i.__openAudioPopup();
};
},
getContainer:function(){
return this.__o.container;
},
addListener:function(i){
var e=this,t=this.__g;
i.addListener("beforepaste",function(i,o){
var n=$("<div>"+o.html+"</div>"),a=n.find("iframe.js_editor_audio").length;
return e.__getAudioNum()+a>t.maxNum?(s.err("每篇图文消息只能添加一个语音"),o.html="",!0):(n=e.__filterData(n),
void(o.html=n.html()));
});
},
beforeSetContent:function(i){
if(!i)return"";
i=i.replace(/<mpvoice([^>]*?)js_editor_audio([^>]*?)><\/mpvoice>/g,"<iframe $1js_editor_audio$2></iframe>");
var e=$("<div>"+i+"</div>");
return e=this.__filterData(e),e.html();
},
getPluginData:function(i){
if(!i||!i.content)return i;
var e=$("<div>"+i.content+"</div>");
return e=this.__filterData(e),i.content=e.html().replace(/<iframe([^>]*?)js_editor_audio([^>]*?)><\/iframe>/g,"<mpvoice $1js_editor_audio$2></mpvoice>"),
i;
},
check:function(i){
return i.find("mpvoice").length>this.__g.maxNum?(s.err("每篇图文消息只能添加一个语音"),!1):!0;
},
__init:function(i){
var e=this.__o;
for(var t in i)e.hasOwnProperty(t)&&(e[t]=i[t]);
},
__getAudioNum:function(i){
if(!i){
var e=this.editor.getUeditor();
i=$(e.body);
}
return i.find("iframe.js_editor_audio").length;
},
__filterData:function(i){
return i.find("mpvoice").remove(),i.find("span.audio_area").remove(),i;
},
__openAudioPopup:function(){
this.__initPopup(),this.__bindPopupEvent();
},
__initPopup:function(){
var i=this,e=this.__g;
e.pageBar=null,e.audioList=[],e.pop=$(t).popup({
className:"align_edge audio_dialog",
width:"960",
title:"请选择语音",
buttons:[{
text:"确定",
click:function(){
var t=e.pop.find(".jsPluginAudioRadio[checked=checked]").data("index");
i.__getAudioHtml(t),e.pop=null,this.remove();
},
type:"primary"
},{
text:"取消",
click:function(){
e.pop=null,this.remove();
}
}],
onHide:function(){
e.pop=null,this.remove();
}
}),this.__send(0,10);
},
__send:function(i,e,t){
var s=this,u=this.__g;
n.get({
url:"/cgi-bin/filepage",
dataType:"json",
data:{
type:3,
begin:i,
count:e
},
mask:!1
},function(i){
if(u.pop)if(0==i.base_resp.ret){
var e=i.page_info.file_item;
u.audioList=[],e.each(function(i){
if(1==i.trans_state){
var e={
name:i.name,
title:i.title||i.name,
update_time:r.unix(i.update_time).format("YYYY-MM-DD"),
play_length:i.play_length,
file_id:i.file_id,
voice_encode_fileid:i.voice_encode_fileid,
disabled:t&&i.play_length>6e4,
format_play_length:r.unix(i.play_length/1e3).format("mm:ss"),
low_size:1*(1*i.voice_low_media_size/1024).toFixed(2)||0,
high_size:1*(1*i.voice_high_media_size/1024).toFixed(2)||0,
source_size:s.__getSize(i.size)
};
1*e.high_size===0&&1*e.source_size!==0&&(e.high_size=e.source_size),1*e.low_size===0&&1*e.source_size!==0&&(e.low_size=e.source_size),
u.audioList.push(e);
}
});
var d=wx.T(o,{
list:u.audioList
});
u.pop.find(".jsPluginAudioList").html(d),u.pop.find(".jsPluginAudioRadio").checkbox(),
t&&$(".jsAudioTips").show(),u.pop.find(".jsPluginAudioPlay").each(function(i,e){
var t=u.audioList[i];
return t.selector="#"+$(e).attr("id"),t.source="file",new a($.extend({},t,{
qqmusictpl:!0
}));
}),u.pageBar||(u.pageBar=new _({
container:".jsPluginAudioPage",
totalItemsNum:i.page_info.file_cnt.voice_cnt,
callback:function(i){
s.__send(10*(i.currentPage-1),10,t);
}
}));
}else n.show(i);
});
},
__bindPopupEvent:function(){
$(".jsPluginAudioNew").click(function(){
window.open(wx.url("/cgi-bin/operate_voice?oper=voice_get&t=media/audio_add"),"_blank");
});
},
__insertAudio:function(i){
var e=this.editor;
e.execCommand("inserthtml",i,!0),e.funcPvUvReport("insertaudio");
},
__getAudioHtml:function(i){
var e=this.__g.audioList[i];
if(e){
e={
name:encodeURIComponent(e.title),
play_length:encodeURIComponent(e.play_length),
file_id:encodeURIComponent(e.file_id),
voice_encode_fileid:e.voice_encode_fileid,
duration:e.format_play_length,
low_size:e.low_size,
high_size:e.high_size,
source_size:e.source_size
},e.src="/cgi-bin/readtemplate?t=tmpl/audio_tmpl&name={name}&play_length={duration}".format(e);
var t='<p><iframe frameborder="0"  class="res_iframe js_editor_audio audio_iframe" src="{src}" low_size="{low_size}" source_size="{source_size}" high_size="{high_size}" name="{name}" play_length="{play_length}" voice_encode_fileid="{voice_encode_fileid}"></iframe></p>';
t=t.format(e),this.__insertAudio(t);
}
},
__getSize:function(i){
return i?/K$/i.test(i)?1*i.replace(/K$/i,""):/M$/i.test(i)?1024*i.replace(/M$/i,""):/G$/i.test(i)?1024*i.replace(/G$/i,"")*1024:0:0;
}
},e;
});define("common/wx/mpEditor/plugin/unlink.js",[],function(){
"use strict";
function t(){
this.editor=null,this.__g={
name:"unlink",
title:"取消超链接"
};
}
return t.prototype={
getName:function(){
return this.__g.name;
},
getExecCommand:function(){
var t=this;
return function(){
if(t.editor){
var e,n=t.editor,i=n.getSelectionRange(),r=n.getDomUtils();
(!i.collapsed||r.findParentByTagName(i.startContainer,"a",!0))&&(e=i.createBookmark(),
n.fireEvent("link_optimize",i),i.removeInlineStyle("a").moveToBookmark(e).select());
}
};
},
getType:function(){
return 1;
},
getTitle:function(){
return this.__g.title;
},
getQueryCommandState:function(){
var t=this;
return function(){
var e=t.editor;
return e&&!e.isHighlight()&&e.queryCommandValue("link")?0:-1;
};
},
getContextMenu:function(){
var t=this.__g,e={
label:t.title,
cmdName:t.name
};
return e;
}
},t;
});define("common/wx/mpEditor/plugin/link.js",["common/wx/popup.js","biz_common/jquery.validate.js","common/wx/Cgi.js","tpl/mpEditor/plugin/link_dialog.html.js","tpl/mpEditor/plugin/link_appmsg.html.js","tpl/mpEditor/plugin/link_popup.html.js","biz_common/moment.js","common/wx/Tips.js","common/wx/popover.js","common/wx/ban.js","common/wx/pagebar.js"],function(t){
"use strict";
function e(){
this.editor=null,this.__g={
_perPage:5
};
}
t("common/wx/popup.js"),t("biz_common/jquery.validate.js");
var n=t("common/wx/Cgi.js"),i=t("tpl/mpEditor/plugin/link_dialog.html.js"),a=t("tpl/mpEditor/plugin/link_appmsg.html.js"),o=t("tpl/mpEditor/plugin/link_popup.html.js"),r=t("biz_common/moment.js"),l=t("common/wx/Tips.js"),s=t("common/wx/popover.js"),p=t("common/wx/ban.js"),d=t("common/wx/pagebar.js");
return e.prototype={
getName:function(){
return"link";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
t.editor&&t.__openDialog();
};
},
addListener:function(t){
var e=this;
t.addListener("link_optimize",function(t,n){
e.__optimize(n);
}),t.addListener("handle_common_popup",function(e,n){
var i,a=t.queryCommandValue("link");
if(a&&(i=a.getAttribute("_href")||a.getAttribute("href",2))){
var r=i;
i.length>30&&(r=i.substring(0,20)+"..."),n.html+=wx.T(o,{
needBreak:n.html?!0:!1,
url:i,
txt:r
}),n.node=a;
}
});
},
getType:function(){
return 1;
},
getTitle:function(){
return"超链接";
},
getQueryCommandState:function(){
var t=this;
return function(){
var e=t.editor;
if(!e)return 0;
var n=e.getSelectionRange().getClosedNode(),i=n&&"edui-faked-video"==n.className;
return i?-1:0;
};
},
getQueryCommandValue:function(){
var t=this;
return function(){
var e=t.editor;
if(e){
var n,i=e.getSelectionRange(),a=e.getDomUtils();
if(!i.collapsed){
i.shrinkBoundary();
var o=3!=i.startContainer.nodeType&&i.startContainer.childNodes[i.startOffset]?i.startContainer.childNodes[i.startOffset]:i.startContainer,r=3==i.endContainer.nodeType||0==i.endOffset?i.endContainer:i.endContainer.childNodes[i.endOffset-1],l=i.getCommonAncestor();
if(n=a.findParentByTagName(l,"a",!0),!n&&1==l.nodeType)for(var s,p,d,c=l.getElementsByTagName("a"),u=0;d=c[u++];)if(s=a.getPosition(d,o),
p=a.getPosition(d,r),(s&a.POSITION_FOLLOWING||s&a.POSITION_CONTAINS)&&(p&a.POSITION_PRECEDING||p&a.POSITION_CONTAINS)){
n=d;
break;
}
return n;
}
return n=i.startContainer,n=1==n.nodeType?n:n.parentNode,n&&(n=a.findParentByTagName(n,"a",!0))&&!a.isInNodeEndBoundary(i,n)?n:void 0;
}
};
},
__openDialog:function(){
this.__DialogInit(),this.__initDialogData(),this.__DialogEvent(),this.__queryAppmsgLink(0,this.__g._perPage,"",!0);
},
__DialogEvent:function(){
var t=this,e=this.__g,n=e._linkDialog,i=e._perPage;
e.form=n.find("#linkForm").validate({
rules:{
title:{
required:!0
},
href:{
required:!0,
url:!0
}
},
messages:{
title:{
required:"文章标题不能为空"
},
href:{
required:"链接地址不能为空",
url:"链接地址不合法(必须以http://或https://开头)"
}
}
}),n.find("#keyInput").keydown(function(t){
var e="which"in t?t.which:t.keyCode;
13==e&&n.find("#searchBt").trigger("click");
}),n.find("#searchCloseBt").click(function(){
n.find("#keyInput").val(""),t.__queryAppmsgLink(0,i,"",!0);
}),n.find("#searchBt").click(function(){
t.__queryAppmsgLink(0,i,n.find("#keyInput").val().trim(),!0);
}),n.find("#linkArrow").click(function(){
$(this).find(".arrow").hasClass("down")?($(this).find(".arrow").setClass("arrow up"),
n.find("#linkChoose").show(),n.popup("resetPosition")):($(this).find(".arrow").setClass("arrow down"),
n.find("#linkChoose").hide(),n.popup("resetPosition"));
}),n.find("#txtHref").on("input change",function(){
var e=$(this),n=e.val();
n.match(/\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/)&&(t._popover=new s({
dom:this,
content:"检测到此链接为预览链接，将在短期内失效，是否仍然使用此链接？",
hideIfBlur:!0,
buttons:[{
text:"仍然使用",
type:"primary",
click:function(){
this.remove();
}
},{
text:"取消",
type:"default",
click:function(){
e.val(""),this.remove();
}
}],
onHide:function(){
this.remove();
}
}),t._popover.$pop.css({
"z-index":1e4
}));
});
},
__initDialogData:function(){
var t=this.__g,e=t._linkDialog,n=this.editor,i=n.getDomUtils(),a=n.getSelectionRange(),o=a.collapsed?n.queryCommandValue("link"):n.getSelectionStart();
o?(i.findParentByTagName(o,"a",!0)&&(o=i.findParentByTagName(o,"a",!0)),e.find("#txtTitle").val(o.text||"你已选中了添加链接的文本内容").attr("disabled",!0).parent().addClass("disabled"),
e.find("#txtHref").val(o.href||"http://"),t.canWriteBack=!1):t.canWriteBack=!0,t._linkDialog.popup("show");
},
__DialogInit:function(){
var t=this,e=this.__g;
e.canWriteBack=!1,e.form=null;
var n=wx.T(i,{
flag:wx.cgiData.can_use_hyperlink
});
if(e._linkDialog=$(n).popup({
title:"新增或编辑超链接",
className:"link_dialog",
width:"726",
autoShow:!1,
buttons:[{
text:"确定",
type:"primary",
click:function(){
var n=e._linkDialog;
if(e.form.form()){
var i={
href:n.find("#txtHref").val().replace(/^\s+|\s+$/g,""),
target:"_blank",
data_ue_src:n.find("#txtHref").val().replace(/^\s+|\s+$/g,"")
};
e.canWriteBack&&(i.textValue=n.find("#txtTitle").val().replace(/^\s+|\s+$/g,"")),
t.__insertLink(i),e._linkDialog=null,this.remove(),t._popover&&t._popover.remove();
}
}
},{
text:"取消",
click:function(){
e._linkDialog=null,this.remove();
}
}],
close:function(){
e._linkDialog=null,this.remove();
}
}),!p(wx.cgiData.func_ban_info,"outer-url")){
var a,o=18;
$.each(wx.cgiData.func_ban_info,function(t,e){
e.func_id==o&&(a=e);
});
var r=p.getReason(a.reason_id),l='你的帐号<a href="'+(r.pc_url?r.pc_url:defaultReason.pc_url)+'">'+r.reason_description+"</a>，",s=new Date(1e3*a.unlock_time);
a.ban_time==a.unlock_time?l+="已被永久屏蔽图文消息外链功能。":(l+="已被屏蔽图文消息外链功能至",l+=s.getFullYear()+"/"+(s.getMonth()+1)+"/"+s.getDate(),
l+="，期间图文消息外链功能将不可用。"),e._linkDialog.find("#txtHref").disable(),e._linkDialog.find(".js_wording").show().find("span").html(l);
}
},
__queryAppmsgLink:function(t,e,i,a){
var o=this,r=this.__g,s=r._linkDialog,p=r._perPage;
s&&n.post({
url:"/cgi-bin/appmsg",
data:{
action:"list_ex",
begin:t,
count:p,
query:i,
type:9
}
},function(t){
"0"==t.base_resp.ret?(o.__renderAppmsgList(t.app_msg_list),a&&new d({
container:"#pageBar",
perPage:p,
totalItemsNum:t.app_msg_cnt,
isSimple:!0,
callback:function(t){
o.__queryAppmsgLink((t.currentPage-1)*p,p,s.find("#keyInput").val().trim(),!1);
}
})):l.err();
});
},
__renderAppmsgList:function(t){
var e=this.__g,n=[],i=e._linkDialog;
i&&(t.each(function(t){
n.push({
title:t.title,
time:r.unix(t.update_time).format("YYYY-MM-DD"),
href:t.link.replace("#rd","&scene=21#wechat_redirect"),
aid:t.aid
});
}),n.length>0?(i.find("#linkList").html(wx.T(a,{
data:n
})),i.popup("resetPosition"),i.find("input[type=radio]").checkbox({
onChanged:function(t){
var n=$(t);
1==e.canWriteBack&&i.find("#txtTitle").val(n.data("title")),i.find("#txtHref").val(n.data("href")),
e.form.form();
}
})):i.find("#linkList").html('<li class="empty_tips">暂无数据</li>'));
},
__insertLink:function(t){
var e,n=this.editor,i=n.getUtils();
n.fireEvent("funcPvUvReport","link"),t._href&&(t._href=i.unhtml(t._href,/[<">]/g)),
t.href&&(t.href=i.unhtml(t.href,/[<">]/g)),t.textValue&&(t.textValue=i.unhtml(t.textValue,/[<">]/g)),
this.__doLink(e=n.getSelectionRange(),t),e.collapse().select(!0);
},
__optimize:function(t){
var e=this.editor.getDomUtils(),n=t.startContainer,i=t.endContainer;
(n=e.findParentByTagName(n,"a",!0))&&t.setStartBefore(n),(i=e.findParentByTagName(i,"a",!0))&&t.setEndAfter(i);
},
__doLink:function(t,e){
var n=this.editor,i=t.cloneRange(),a=n.getBrowser(),o=n.getDomUtils(),r=n.queryCommandValue("link"),l=n.getUtils();
this.__optimize(t=t.adjustmentBoundary());
var s=t.startContainer;
if(1==s.nodeType&&r&&(s=s.childNodes[t.startOffset],s&&1==s.nodeType&&"A"==s.tagName&&/^(?:https?|ftp|file)\s*:\s*\/\//.test(s[a.ie?"innerText":"textContent"])&&(s[a.ie?"innerText":"textContent"]=l.html(e.textValue||e.href))),
(!i.collapsed||r)&&(t.removeInlineStyle("a"),i=t.cloneRange()),i.collapsed){
var p=t.document.createElement("a"),d="";
e.textValue?(d=l.html(e.textValue),delete e.textValue):d=l.html(e.href),o.setAttributes(p,e),
s=o.findParentByTagName(i.startContainer,"a",!0),s&&o.isInNodeEndBoundary(i,s)&&t.setStartAfter(s).collapse(!0),
p[a.ie?"innerText":"textContent"]=d,t.insertNode(p).selectNode(p);
}else t.applyInlineStyle("a",e);
}
},e;
});define("common/wx/mpEditor/plugin/shop.js",["common/wx/Tips.js","common/wx/pagebar.js","shop/shopDialog.js","common/wx/Cgi.js"],function(o){
"use strict";
var i=(o("common/wx/Tips.js"),o("common/wx/pagebar.js"),o("shop/shopDialog.js")),n=(o("common/wx/Cgi.js"),
function(o){
this.domid=o.container,this.biz_uin=o.biz_uin||"";
this.container=$(o.container).show();
});
return n.prototype={
getName:function(){
return"insertshop";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var o=this;
return function(){
var i=this,n=o.editor;
n&&o.openShopPopup(i);
};
},
doCommand:function(o,i,n){
n&&console.log("insert shop");
},
getContainer:function(){
return this.domid;
},
__insertShop:function(o){
var i=this.editor;
i.execCommand("inserthtml",o,!0),i.funcPvUvReport("insertshop");
},
beforeSetContent:function(o){
return o=o.replace(/<mpshop([^>]*?)js_editor_shop([^>]*?)><\/mpshop>/g,"<iframe $1js_editor_shop$2></iframe>");
},
getPluginData:function(o){
return o.content=o.content.replace(/<iframe([^>]*?)js_editor_shop([^>]*?)><\/iframe>/g,"<mpshop $1js_editor_shop$2></mpshop>"),
o;
},
openShopPopup:function(){
var o=this;
this.shopDialog=new i({
onOk:function(i){
var n=i.pid,t=o.biz_uin;
o.__insertShop('<p><iframe class="res_iframe js_editor_shop shopcard_iframe" src="/cgi-bin/readtemplate?t=shop/appmsg_shop_tmpl&action=show&__biz={biz_uin}&pid={pid}#wechat_redirect" data-pid={pid} data-biz_uin={biz_uin}></iframe></p>'.format({
pid:n,
biz_uin:t
}));
}
});
}
},n;
});define("common/wx/mpEditor/plugin/card.js",["common/wx/mpEditor/editor_all_min.js","common/wx/Tips.js","cardticket/send_card.js","common/wx/Cgi.js","cardticket/parse_data.js"],function(t){
"use strict";
t("common/wx/mpEditor/editor_all_min.js");
var e=t("common/wx/Tips.js"),r=t("cardticket/send_card.js"),i=t("common/wx/Cgi.js"),a=wx.cgiData,n=t("cardticket/parse_data.js"),c=function(t){
this.domid=t.container,this.biz_uin=t.biz_uin||"";
var e=(this.container=$(t.container).show(),this);
e.report_vid_type=[],e._init();
};
return c.prototype={
getName:function(){
return"insertcard";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var t=this;
return function(){
var e=t.editor,r=this;
if(e){
{
e.getDocument();
}
t._openCardSelect(r);
}
};
},
_init:function(){
var t=this;
a.cardid&&i.get({
url:"/merchant/electroniccardmgr?action=get&card_id=%s".sprintf(a.cardid)
},function(e){
e.base_resp&&0==e.base_resp.ret&&(t.card_data=$.parseJSON(e.card_detail),t.card_data=n.parse_cardticket(t.card_data),
t._initCard());
});
},
_initCard:function(){
if(this.hasSetContent&&this.card_data&&!this.isInit){
var t=this.editor.getUeditor().getContent(),e=/<iframe [^>]*?class=\"res_iframe card_iframe js_editor_card\"[^>]*?data-cardid=\"\"[^>]*?><\/iframe>/gi;
if(e.test(t))return void(this.isInit=!0);
this._insertCard(this.editor,this.card_data,a.cardnum),this.isInit=!0;
}
},
_checkCard:function(t,r){
var i=$(t).find("iframe"),a=0,n=5;
return $.each(i,function(t,e){
$(e).hasClass("js_editor_card")&&a++;
}),a>n||r&&a>=n?(e.err("正文只能包含%s个卡券".sprintf(n)),!1):!0;
},
_getCardIframe:function(t,e){
return['<iframe class="res_iframe card_iframe js_editor_card" scrolling="no" frameborder="0" ','data-cardid="%s" data-num="%s" '.sprintf(t.id,e),'src="/cgi-bin/readtemplate?t=cardticket/card_preview_tmpl&logo_url=%s&brand_name=%s&title=%s&color=%s&lang=zh_CN"'.sprintf(encodeURIComponent(t.logo_url),encodeURIComponent(t.brand_name),encodeURIComponent(t.title),encodeURIComponent(t.color)),' data-src="http://mp.weixin.qq.com/bizmall/appmsgcard?action=show&biz=%s&cardid=%s&wechat_card_js=1#wechat_redirect" '.sprintf(this.biz_uin,t.id),"></iframe>"].join("");
},
_insertCard:function(t,e,r){
var i=this._getCardIframe(e,r);
t.execCommand("inserthtml",i,!0),this.editor.fireEvent("funcPvUvReport","insertcard");
},
_openCardSelect:function(t){
if(this._checkCard(this.editor.getDocument(),!0)){
var e=this,i=new r({
multi:!1,
param:{
need_member_card:1
},
selectComplete:function(r,i){
e._insertCard(t,r,i);
},
source:"嵌入图文消息素材"
});
i.show();
}
},
_getIframeData:function(t){
var e=t.key,r=t.content,i=(t.ifrmName,new RegExp("<iframe[^>]*?"+t.ifrmName+"[^>]*?data-"+e+"=('|\")(.*?)('|\").*?>","g"));
return i.test(r)?RegExp.$2:null;
},
check:function(t){
return this._checkCard(t);
},
getQueryCommandState:function(){
return function(){
var t=this,e=t.selection.getRange().getClosedNode(),r=e&&"edui-faked-video"==e.className;
return r?1:0;
};
},
getContainer:function(){
return this.domid;
},
getPluginData:function(t){
var e=this,r=e._getIframeData({
content:t.content,
key:"cardid",
ifrmName:"js_editor_card"
});
if(r){
var i=e._getIframeData({
content:t.content,
key:"num",
ifrmName:"js_editor_card"
});
t.cardid=r,t.cardquantity=i,t.cardlimit=0==i?0:1;
}
return t;
},
afterSetContent:function(){
this.hasSetContent=!0,this._initCard();
}
},c;
});define("common/wx/mpEditor/plugin/vote.js",["biz_web/widget/date_range.css","page/vote/dialog_vote_table.css","widget/date_select.css","common/wx/mpEditor/editor_all_min.js","common/wx/Tips.js","common/wx/pagebar.js","common/wx/Cgi.js","vote/new.js","tpl/vote/vote_table.html.js"],function(require,exports,module){
"use strict";
function iframeUrlSwitcher(e){
for(var t=e.content,o=e.returnValue||"content",a=e.wrapper||"add",n=t.split(/<\/?iframe/),i="",r=" TMP_NAME=",s=[],c=[],l=[],d=0;d<n.length;d++){
if(-1!==n[d].indexOf("js_editor_vote_card")||-1!==n[d].indexOf("js_editor_card")){
n[d]=n[d].replace(" src=",r).replace(" data-display-src="," src=").replace(r," data-display-src="),
n[d]=n[d].replace(" style=",r).replace(" data-display-style="," style=").replace(r," data-display-style=");
var u=n[d].match(/data-voteid=\"([^\"]*)/);
u&&u[1]&&s.push(u[1]);
var p=n[d].match(/isMlt=(\d)/);
p&&p[1]&&c.push(p[1]),n[d]=n[d].replace(/token=(\d+)&/gi,"token="+wx.getUrl("token")+"&");
var v=n[d].match(/data-supervoteid=\"([^\"]*)/);
v&&v[1]&&l.push(v[1]);
}
i+=n[d],d<n.length-1&&(i+=(d%2?"</":"<")+"iframe");
}
switch(i="add"===a?i.replace(/(<iframe[\s\S]*js_editor_vote_card[\s\S]*<\/iframe>)/gi,function(e){
return['<span class="vote_area">',e,'<span class="vote_box skin_help po_left"></span>','<span class="vote_box skin_help po_right"></span>',"</span>"].join("");
}):i.replace('<span class="vote_area">',"").replace('<span class="vote_box skin_help po_left"></span><span class="vote_box skin_help po_right"></span></span>',""),
o){
case"voteid":
return s;

case"isMlt":
return c;

case"supervoteid":
return l;

case"content":
default:
return i;
}
}
function setVoteIframeHeight(e){
var t=e.getDocument();
$(t).find("iframe").each(function(){
var t=this;
$(t).hasClass("js_editor_vote_card")&&$(t).on("load",function(){
$(t.contentWindow.document).on("finished",function(){
var o=$(this).height();
t.contentDocument&&t.contentDocument.body.offsetHeight?o=t.contentDocument.body.offsetHeight:t.Document&&t.Document.body&&t.Document.body.scrollHeight?o=t.Document.body.scrollHeight:t.document&&t.document.body&&t.document.body.scrollHeight&&(o=t.document.body.scrollHeight),
$(t).height(o).off("finished"),e.fireEvent("contentchange");
}),$(t).off("load");
});
});
}
require("biz_web/widget/date_range.css"),require("page/vote/dialog_vote_table.css"),
require("widget/date_select.css"),require("common/wx/mpEditor/editor_all_min.js");
var Tips=require("common/wx/Tips.js"),Pagebar=require("common/wx/pagebar.js"),Cgi=require("common/wx/Cgi.js");
template.helper("datestring",function(e){
function t(e,t){
for(var o=0,a=t-(e+"").length;a>o;o++)e="0"+e;
return e+"";
}
var o=new Date(e),a=["日","一","二","三","四","五","六"],n="yyyy年mm月dd日".replace(/yyyy|YYYY/,o.getFullYear()).replace(/yy|YY/,t(o.getFullYear()%100,2)).replace(/mm|MM/,t(o.getMonth()+1,2)).replace(/m|M/g,o.getMonth()+1).replace(/dd|DD/,t(o.getDate(),2)).replace(/d|D/g,o.getDate()).replace(/hh|HH/,t(o.getHours(),2)).replace(/h|H/g,o.getHours()).replace(/ii|II/,t(o.getMinutes(),2)).replace(/i|I/g,o.getMinutes()).replace(/ss|SS/,t(o.getSeconds(),2)).replace(/s|S/g,o.getSeconds()).replace(/w/g,o.getDay()).replace(/W/g,a[o.getDay()]);
return n;
});
var Vote=function(e){
this.domid=e.container;
this.container=$(e.container).show();
};
return Vote.prototype={
getName:function(){
return"insertvote";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var e=this;
return function(){
var t=this,o=e.editor;
o&&e.openVotePopup(t);
};
},
doCommand:function(e,t,o){
o&&console.log("insert vote");
},
getContainer:function(){
return this.domid;
},
getPluginData:function(e){
e.content=iframeUrlSwitcher({
content:e.content,
wrapper:"add"
});
var t=iframeUrlSwitcher({
content:e.content,
returnValue:"voteid"
})[0],o=iframeUrlSwitcher({
content:e.content,
returnValue:"isMlt"
})[0],a=iframeUrlSwitcher({
content:e.content,
returnValue:"supervoteid"
});
return t&&"undefined"!=typeof o&&(e.voteid=t,e.voteismlt=o||store.get("appmsg_vote_"+t)),
a&&(e.supervoteid=a[0]),e;
},
beforeSetContent:function(e){
var e=iframeUrlSwitcher({
content:e,
wrapper:"remove"
});
return e;
},
afterSetContent:function(){
setVoteIframeHeight(this.editor);
},
insertVoteIframe:function(e,t){
var o=this.editor;
e.execCommand("inserthtml",t.join(""),!0),o.fireEvent("funcPvUvReport","insertvote");
},
_setIframeHeight:function(){
var e=this;
setTimeout(function(){
var t=e.editor.getDocument().getElementsByTagName("iframe");
if(t&&t.length>0)for(var o=0;o<t.length;o++)if($(t[o]).hasClass("js_editor_vote_card")){
var a=t[o],n=$(a).height();
a.contentDocument&&a.contentDocument.body.offsetHeight?n=a.contentDocument.body.offsetHeight:a.Document&&a.Document.body&&a.Document.body.scrollHeight?n=a.Document.body.scrollHeight:a.document&&a.document.body&&a.document.body.scrollHeight&&(n=a.document.body.scrollHeight),
a.style.height=n+"px";
}
},5e3);
},
_checkIframe:function(e,t){
var o=$(e).find("iframe"),a=0;
return $.each(o,function(e,t){
$(t).hasClass("js_editor_vote_card")&&a++;
}),a>1||t&&a>=1?(Tips.err("正文只能包含%s个投票".sprintf(1)),!1):!0;
},
check:function(e){
return this._checkIframe(e);
},
openVotePopup:function(ueditor){
function renderList(begin){
$.ajax({
url:wx.url("/cgi-bin/newoperatevote?action=list&vote_status=1&f=json&count=6&begin="+begin),
type:"get",
dataType:"json",
success:function(data){
if(data.data){
for(var voteData=eval("("+data.data+")"),iframeH=0,i=0;i<voteData.super_vote_info.length;i++)voteData.super_vote_info[i].height=150*voteData.super_vote_info[i].vote_id_list.vote_id.length,
voteData.super_vote_info[i].title=voteData.super_vote_info[i].title.html(!1);
$(".js_vote_list").html(compile_html({
loading:!1,
data:voteData,
iframeH:iframeH,
biz:data.bizuin,
token:wx.data.param
})),$(".js_select").checkbox({
multi:!1
});
var total_count=voteData.total_count,count=6,showpage=begin/count+1,pagebar=new Pagebar({
container:".js_pager",
perPage:count,
first:!1,
last:!1,
isSimple:!0,
initShowPage:showpage,
totalItemsNum:total_count,
callback:function(e){
var t=e.currentPage;
if(t!=showpage)return t--,renderList(t*count),!1;
}
});
}else $(".js_vote_list").html(compile_html({
loading:!1,
data:{
super_vote_info:[]
}
}));
},
error:function(){}
});
}
var that=this;
if(!that._checkIframe(this.editor.getDocument(),!0))return null;
document.body.style.overflow=document.documentElement.style.overflow="hidden";
var pop=$("<div class='' id='js_vote_menu'> <div class='title_tab'> <ul class='tab_navs title_tab' data-index='0'> <li data-index='0' class='tab_nav first selected'><a href='#none' id='js_new_vote'>新投票</a></li> <li data-index='1' class='tab_nav'><a href='#none' id='js_vote_list'>已有投票</a></li> </ul> </div> <div class='new_vote js_new_vote'>'+_vote_pop_html+'</div> <div class='vote_list js_vote_list' style='display:none'></div> </div>").popup({
title:"发起投票",
className:"vote_edit tc_dialog dialog_normal_form",
buttons:[{
text:"确定",
click:function(){},
type:"primary"
}],
close:function(){
this.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto";
}
}),vote=require("vote/new.js");
vote.initPage(),vote.eventBind();
var _vote_list_tpl=require("tpl/vote/vote_table.html.js"),compile_html=template.compile(_vote_list_tpl);
$(".js_vote_list").html(compile_html({
loading:!0
})),$("#js_new_vote").click(function(){
$(".js_new_vote").show(),$("#js_new_vote").parent().addClass("selected"),$(".js_vote_list").hide(),
$("#js_vote_list").parent().removeClass("selected");
}),$("#js_vote_list").click(function(){
$(".js_new_vote").hide(),$("#js_new_vote").parent().removeClass("selected"),$(".js_vote_list").show(),
$("#js_vote_list").parent().addClass("selected");
}),renderList(0),$(".vote_edit button").click(function(){
var iframeH=0,saveBtn=pop.find(":button").last();
saveBtn.removeClass("btn_loading");
var supervoteid=0,biz=0;
if("none"==$(".js_vote_list").css("display")){
var data=vote.getFullData();
if(data){
var tempData=eval("("+data+")"),optionL=0;
iframeH+=70*tempData.vote_subject.length;
for(var i=0;i<tempData.vote_subject.length;i++)optionL+=tempData.vote_subject[i].options.length;
iframeH+=30*optionL,saveBtn.btn(!1),Cgi.post({
url:wx.url("/cgi-bin/newoperatevote?action=create"),
dataType:"json",
data:{
action:"create",
json:data
},
mask:!1
},function(e){
0==e.base_resp.ret?(Tips.suc("操作成功"),supervoteid=e.super_vote_id,biz=e.bizuin,that.insertVoteIframe(ueditor,['<iframe scrolling="no" frameborder="0" class="vote_iframe js_editor_vote_card" style="height:0px;" ','src="',wx.url("/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz="+biz+"&supervoteid=%s".sprintf(supervoteid)),'"','data-src="',"/mp/newappmsgvote?action=show&__biz=",biz,"&supervoteid=%s#wechat_redirect".sprintf(supervoteid),'"','data-supervoteid="%s"'.sprintf(supervoteid)," allowfullscreen >","</iframe>"]),
setVoteIframeHeight(that.editor),pop.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto",
$(".mask").hide()):(Tips.err(e.base_resp.err_msg),saveBtn.btn(!0));
});
}
}else saveBtn.btn(!1),1==$(".js_select:checked").length?(supervoteid=$(".js_select:checked").val(),
biz=$(".js_select:checked").data("biz"),iframeH=$(".js_select:checked").data("height"),
that.insertVoteIframe(ueditor,['<iframe scrolling="no" frameborder="0" class="vote_iframe js_editor_vote_card" style="height:0px;" ','src="',wx.url("/cgi-bin/readtemplate?t=vote/vote-new_tmpl&__biz="+biz+"&supervoteid=%s".sprintf(supervoteid)),'"','data-src="',"/mp/newappmsgvote?action=show&__biz=",biz,"&supervoteid=%s#wechat_redirect".sprintf(supervoteid),'"','data-supervoteid="%s"'.sprintf(supervoteid)," allowfullscreen >","</iframe>"]),
setVoteIframeHeight(that.editor),pop.remove(),document.body.style.overflow=document.documentElement.style.overflow="auto",
saveBtn.btn(!0),$(".mask").hide()):(Tips.err("请选择投票"),saveBtn.btn(!0));
});
}
},Vote;
});