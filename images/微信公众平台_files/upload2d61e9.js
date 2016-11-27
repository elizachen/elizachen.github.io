define("common/wx/mpEditor/plugin/music.js",["biz_common/utils/string/html.js","common/wx/popup.js","tpl/mpEditor/plugin/music.html.js","tpl/media/dialog/audiomsg_layout.html.js","common/wx/media/audio.js","common/wx/pagebar.js","common/wx/Tips.js"],function(i){
"use strict";
function t(i){
this.__o={
container:""
},this.editor=null,this.__g={},this.__init(i),$(i.container).show();
}
i("biz_common/utils/string/html.js"),i("common/wx/popup.js");
var e=i("tpl/mpEditor/plugin/music.html.js"),n=i("tpl/media/dialog/audiomsg_layout.html.js"),o=i("common/wx/media/audio.js"),r=i("common/wx/pagebar.js"),c=i("common/wx/Tips.js");
return t.prototype={
getName:function(){
return"insertmusic";
},
noCommandReprot:function(){
return!0;
},
getExecCommand:function(){
var i=this;
return function(){
console.log("insert music "),i.__openMusicPopup();
};
},
getContainer:function(){
return this.__o.container;
},
addListener:function(i){
{
var t=this;
this.__g;
}
i.addListener("beforepaste",function(i,e){
var n=$("<div>"+e.html+"</div>");
n=t.__filterData(n),e.html=n.html().replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<iframe $1js_editor_qqmusic$2></iframe>");
});
},
beforeSetContent:function(i){
if(!i)return"";
var t=$("<div>"+i+"</div>");
return t=this.__filterData(t),i=t.html().replace(/<qqmusic([^>]*?)js_editor_qqmusic([^>]*?)><\/qqmusic>/g,"<iframe $1js_editor_qqmusic$2></iframe>");
},
getPluginData:function(i){
if(!i||!i.content)return i;
var t=$("<div>"+i.content+"</div>");
t=this.__filterData(t),i.content=t.html().replace(/<iframe([^>]*?)js_editor_qqmusic([^>]*?)><\/iframe>/g,"<qqmusic $1js_editor_qqmusic$2></qqmusic>");
for(var e=i.content,n=/<qqmusic\s(?:[\s\S]*?)musicid\=[\'\"]([\d]*?)[\'\"](?:[\s\S]*?)>/g,o=[],r="",c=null;null!=(c=n.exec(e));)c[1]&&-1==r.indexOf(c[1]+",")&&(o.push(c[1]),
r+=c[1]+",");
return i.music_id=o.join(","),i;
},
__init:function(i){
var t=this.__o;
for(var e in i)t.hasOwnProperty(e)&&(t[e]=i[e]);
},
__openMusicPopup:function(){
this.__initPop(),this.__initPopEvt();
},
__initPop:function(){
var i=this,t=this.__g,n=t._oSelectdSong={};
t._oAudioPop=$(e).popup({
title:"添加音乐",
className:"align_edge qqmusic_dialog",
width:"960",
buttons:[{
text:"确定",
type:"primary",
click:function(){
if(console.log("selected music "+n.mid),console.log(wx.url("/cgi-bin/registertopic?id="+n.musicid+"&type=1&src=1")),
"undefined"!=typeof n.musicid){
var e=this,o=e.get().find(".js_btn_p").eq(0);
if(o.hasClass("btn_loading"))return;
o.btn(0),$.ajax({
url:wx.url("/cgi-bin/registertopic?id="+n.musicid+"&type=1&src=1"),
type:"post",
dataType:"json",
success:function(r){
t._oAudioPop&&(console.log("success"),console.log(r),o.btn(1),r&&"0"==r.base_resp.ret&&"undefined"!=typeof r.topic_id?(n.commentid=r.topic_id,
i.__insertMusic(i.__getMusicIframe()),console.log(n),t._oAudioPop=null,e.remove()):c.err("系统繁忙，请稍后再试"));
}
});
}else c.err("请选择要插入的音乐");
}
},{
text:"取消",
click:function(){
n=i.__g._oSelectdSong={},t._oAudioPop=null,this.remove();
}
}],
close:function(){
n=i.__g._oSelectdSong={},t._oAudioPop=null,this.remove();
}
});
},
__filterData:function(i){
return i.find("qqmusic").addClass("res_iframe qqmusic_iframe js_editor_qqmusic"),
i.find("span.qqmusic_area").remove(),i;
},
__insertMusic:function(i){
console.log("insertQQMusic");
var t=this.editor;
t.execCommand("inserthtml",i,!0),t.funcPvUvReport("insertmusic"),this.__g._oSelectdSong={};
},
__getMusicIframe:function(){
var i=this.__g._oSelectdSong,t=i.musicid,e=i.mid,n=i.url,o=i.songname,r=i.albumurl,c=i.singername,s=i.play_length,a=i.commentid,u="/cgi-bin/readtemplate?t=tmpl/qqmusic_tmpl&singer="+encodeURIComponent(c)+"&music_name="+encodeURIComponent(o);
return['<iframe class="res_iframe qqmusic_iframe js_editor_qqmusic" scrolling="no" frameborder="0"',' musicid="'+t.html(!0)+'"',' mid="'+e.html(!0)+'"',' albumurl="'+r.html(!0)+'"',' audiourl="'+n.html(!0)+'"',' music_name="'+o.html(!0)+'"',' commentid="'+a+'"',' singer="'+c.html(!0)+'" ',' play_length="'+s+'" ',' src="'+u,'"></iframe>'].join("");
},
__initPopEvt:function(){
this.__initSearch();
},
__initSearch:function(){
var i=this,t=this.__g._oAudioPop;
t.find("#searchDiv").show(),t.find("#keyInput").keydown(function(i){
var e="which"in i?i.which:i.keyCode;
13==e&&t.find("#searchBt").trigger("click");
}),t.find("#searchCloseBt").click(function(){
t.find("#keyInput").val("");
}),t.find("#searchBt").click(function(){
var e=t.find("#keyInput").val();
e.length>0?i.__QQMusicSearch({
keyword:encodeURIComponent(e),
perpage:10,
currentpage:1
}):c.err("请输入搜索条件");
}),t.find("#reload").click(function(){
t.find("#searchCloseBt").trigger("click");
});
},
__QQMusicSearch:function(i){
var t=this;
window.MusicJsonCallback=function(i){
var e=t.__g._oAudioPop;
e&&(i=t.__formatJsonData(i),e.find("#dialog_audio_container").html(wx.T(n,i)),t.__initMusicfile(),
t.__initPageBar({
totalnum:i.totalnum,
perpage:i.perpage,
currentpage:i.curpage
}));
};
var e=document.head||document.getElementsByTagName("head")[0]||document.documentElement,o=document.createElement("script"),r=["https://auth-external.music.qq.com/open/fcgi-bin/fcg_weixin_music_search.fcg?remoteplace=txt.weixin.officialaccount&w=",i.keyword,"&platform=weixin&jsonCallback=MusicJsonCallback&perpage=",i.perpage,"&curpage=",i.currentpage].join("");
console.log("src="+r),o.type="text/javascript",o.src=r,e.appendChild(o);
},
__formatJsonData:function(i){
var t=this,e=$.extend({},i);
return e&&e.list&&$.each(e.list,function(i,e){
var n=e.f.split("|"),o=n[7]||0,r=n[12]||0,c=n[0],s=n[n.length-1],a=n[n.length-3],u="/"+s.charAt(s.length-2)+"/"+s.charAt(s.length-1)+"/"+s+".jpg";
$.extend(e,{
songtime:t.__formatTime(o),
songsize:t.__formatSize(r),
songid:c,
mid:a,
albumurl:u,
play_length:1e3*o
});
}),console.log("formatJsonData"),console.log(e),e;
},
__formatTime:function(i){
var t="";
if(60>i)t="00:"+(10>i?"0":"")+i;else{
var e=Math.floor(i/60),n=i-60*e;
t=(10>e?"0":"")+e+":"+(10>n?"0":"")+n;
}
return t;
},
__formatSize:function(i){
var t="";
return t=i>1048576?parseInt(i/1048576)+"M":"1M";
},
__initMusicfile:function(){
var i=this.__g,t=i._oSelectdSong,e=i._oAudioPop;
e.find(".qqmusic_audioplay").each(function(){
var i=$(this),t=i.attr("audioid"),e=i.attr("audiourl"),n={
selector:"#url_"+t,
qqmusicurl:e,
id:t,
qqmusictpl:!0
};
console.log("initMusicfile"),console.log(n);
new o(n);
}),e.find(".frm_radio").checkbox({
multi:!1,
onChanged:function(i){
console.log(i),t.musicid=i.val(),t.songname=(e.find("#songname_"+t.musicid).html()||"").html(!1),
t.singername=(e.find("#singername_"+t.musicid).html()||"").html(!1),t.url=e.find("#url_"+t.musicid).attr("audiourl"),
t.mid=e.find("#url_"+t.musicid).attr("mid"),t.albumurl=e.find("#url_"+t.musicid).attr("albumurl"),
t.play_length=e.find("#url_"+t.musicid).attr("play_length");
}
});
},
__initPageBar:function(i){
{
var t=this,e=this.__g,n=e._oAudioPop,o=n.find("#keyInput").val(),c=i&&i.currentpage,s=i&&i.perpage,a=i&&i.totalnum;
new r({
container:"#js_pagebar",
perPage:s,
initShowPage:c,
totalItemsNum:a,
first:!1,
last:!1,
isSimple:!0,
callback:function(i){
var e=i.currentPage;
e!=c&&(c=e,t.__QQMusicSearch({
keyword:o,
perpage:s,
currentpage:c
}));
}
});
}
}
},t;
});define("common/wx/ban.js",["tpl/ban/highlight_box.html.js","tpl/ban/page_msg.html.js","common/wx/dialog.js"],function(e,a,i){
"use strict";
var n=e("tpl/ban/highlight_box.html.js"),o=e("tpl/ban/page_msg.html.js"),t=e("common/wx/dialog.js"),p={
"mass-send":{
func_id:1,
name:"群发功能"
},
copyright:{
func_id:2,
name:"原创功能"
},
reward:{
func_id:3,
name:"赞赏功能"
},
seller:{
func_id:4,
name:"流量主功能"
},
comment:{
func_id:5,
name:"留言功能"
},
follow:{
func_id:6,
name:"被关注"
},
search:{
func_id:7,
name:"被搜索"
},
outlink:{
func_id:8,
name:"外链功能"
},
share:{
func_id:9,
name:"文章分享至朋友圈可见"
},
reply:{
func_id:10,
name:"自动回复功能",
highlight:"已禁用自动回复|你的帐号{=reason}，已被{forever}屏蔽自动回复功能{date}，期间用户将不会收到自动回复消息。",
hide:"all"
},
menu:{
func_id:11,
name:"自定义菜单功能",
highlight:"已禁用自定义菜单|你的帐号{=reason}，已被{forever}屏蔽自定义菜单功能{date}，期间自定义菜单将不可见。",
hide:"all"
},
"single-send":{
func_id:12,
name:"聊天功能",
pagemsg:"你的帐号{=reason}，已被{forever}屏蔽聊天功能{date}，期间将不可和粉丝互动聊天。"
},
preview:{
func_id:13,
name:"消息预览功能",
dialogmsg:"你的帐号{=reason}，已被{forever}屏蔽消息预览功能{date}，期间消息预览功能将不可用。"
},
"jssdk-share":{
func_id:14,
name:"JS-SDK分享接口"
},
template:{
func_id:15,
name:"模板消息接口"
},
"customer-service":{
func_id:16,
name:"客服接口"
},
"source-url":{
func_id:17,
name:"原文链接功能"
},
"outer-url":{
func_id:18,
name:"图文编辑外链功能"
},
"jump-home":{
func_id:21,
name:"跳转小主页"
},
"follow-home":{
func_id:22,
name:"关注小主页"
},
"qrcode-interface":{
func_id:23,
name:"接口调用生成的二维码"
},
"qrcode-default":{
func_id:24,
name:"平台默认二维码"
}
},r=[{
illegal_reason_id:3,
reason_id:1e4,
reason_name:"涉嫌违规",
reason_type:0,
reason_description:"涉嫌违规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:3
},{
illegal_reason_id:3,
reason_id:90004,
reason_name:"滥用原创声明",
reason_type:0,
reason_description:"涉嫌滥用原创声明功能",
reason_rule:"《微信公众平台运营规范》3.6条规定",
wap_url:"",
pc_url:"",
level:3
},{
illegal_reason_id:4,
reason_id:90005,
reason_name:"滥用赞赏",
reason_type:0,
reason_description:"涉嫌滥用赞赏功能",
reason_rule:"《微信公众平台运营规范》3.7条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_7",
level:3
},{
illegal_reason_id:10,
reason_id:10001,
reason_name:"垃圾广告",
reason_type:0,
reason_description:"涉嫌发布垃圾广告",
reason_rule:"《微信公众平台运营规范》4.8条规定-广告类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
level:2
},{
illegal_reason_id:11,
reason_id:20001,
reason_name:"政治敏感",
reason_type:0,
reason_description:"涉嫌违反相关法律法规和政策",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:3
},{
illegal_reason_id:12,
reason_id:20002,
reason_name:"色情",
reason_type:0,
reason_description:"涉及低俗、性暗示或色情信息",
reason_rule:"《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2",
level:1
},{
illegal_reason_id:13,
reason_id:20004,
reason_name:"社会事件",
reason_type:0,
reason_description:"涉嫌违反相关法律法规和政策",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:3
},{
illegal_reason_id:14,
reason_id:20006,
reason_name:"违法犯罪",
reason_type:0,
reason_description:"涉嫌违反相关法律法规和政策",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:15,
reason_id:20008,
reason_name:"欺诈",
reason_type:0,
reason_description:"涉嫌欺诈",
reason_rule:"《微信公众平台运营规范》4.8.1条规定-欺诈虚假广告类",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
level:1
},{
illegal_reason_id:16,
reason_id:20012,
reason_name:"低俗",
reason_type:0,
reason_description:"涉及低俗、性暗示或色情信息",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:2
},{
illegal_reason_id:18,
reason_id:20013,
reason_name:"冒名侵权",
reason_type:0,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:21,
reason_id:20106,
reason_name:"骚扰",
reason_type:0,
reason_description:"涉及骚扰信息",
reason_rule:"《微信公众平台运营规范》4.10条规定-搔扰类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=26&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_10",
level:3
},{
illegal_reason_id:22,
reason_id:21e3,
reason_name:"默认",
reason_type:0,
reason_description:"涉嫌违规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:3
},{
illegal_reason_id:23,
reason_id:90001,
reason_name:"侵犯隐私",
reason_type:0,
reason_description:"涉嫌侵犯他人隐私",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:3
},{
illegal_reason_id:35,
reason_id:20104,
reason_name:"造遥",
reason_type:0,
reason_description:"涉嫌造谣或传谣",
reason_rule:"《微信公众平台运营规范》4.9条规定-谣言类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=25&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_9",
level:2
},{
illegal_reason_id:36,
reason_id:20105,
reason_name:"诱导分享",
reason_type:0,
reason_description:"涉嫌诱导分享",
reason_rule:"《微信公众平台运营规范》3.3.1条规定-诱导分享",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
level:2
},{
illegal_reason_id:40,
reason_id:90002,
reason_name:"抄袭",
reason_type:0,
reason_description:"涉嫌抄袭他人内容",
reason_rule:"《微信公众平台运营规范》4.1.2条规定-内容侵权",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:3
},{
illegal_reason_id:41,
reason_id:90003,
reason_name:"诱导关注 ",
reason_type:0,
reason_description:"涉嫌诱导关注",
reason_rule:"《微信公众平台运营规范》3.3.2条规定-诱导关注",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
level:2
},{
illegal_reason_id:42,
reason_id:1,
reason_name:"默认",
reason_type:1,
reason_description:"其他",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:43,
reason_id:2,
reason_name:"政治敏感",
reason_type:1,
reason_description:"涉嫌违反相关法律法规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:44,
reason_id:3,
reason_name:"色情",
reason_type:1,
reason_description:"涉及低俗或色情信息",
reason_rule:"《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2",
level:1
},{
illegal_reason_id:45,
reason_id:4,
reason_name:"虚假认证",
reason_type:1,
reason_description:"涉嫌虚假认证",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:46,
reason_id:5,
reason_name:"侵权",
reason_type:1,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:47,
reason_id:4,
reason_name:"政治敏感",
reason_type:2,
reason_description:"涉嫌违反相关法律法规",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=32&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:3
},{
illegal_reason_id:48,
reason_id:1,
reason_name:"色情",
reason_type:2,
reason_description:"涉嫌低俗或色情",
reason_rule:"《微信公众平台运营规范》4.2条规定-色情及色情擦边类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=18&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_2",
level:1
},{
illegal_reason_id:49,
reason_id:3,
reason_name:"欺诈",
reason_type:2,
reason_description:"涉嫌欺诈",
reason_rule:"《微信公众平台运营规范》4.8.1条规定-欺诈虚假广告类",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
level:1
},{
illegal_reason_id:50,
reason_id:5,
reason_name:"诱导分享",
reason_type:2,
reason_description:"涉嫌诱导分享",
reason_rule:"《微信公众平台运营规范》3.3.1条规定-诱导分享",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
level:2
},{
illegal_reason_id:51,
reason_id:19,
reason_name:"诱导关注",
reason_type:2,
reason_description:"涉嫌诱导关注",
reason_rule:"《微信公众平台运营规范》3.3.2条规定-诱导关注",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=13&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_3",
level:2
},{
illegal_reason_id:52,
reason_id:7,
reason_name:"侵犯隐私",
reason_type:2,
reason_description:"涉嫌侵犯隐私",
reason_rule:"《微信公众平台运营规范》4.1.2条规定-内容侵权",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:3
},{
illegal_reason_id:53,
reason_id:6,
reason_name:"侵权",
reason_type:2,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定-侵权或侵犯隐私类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:54,
reason_id:11,
reason_name:"外挂",
reason_type:2,
reason_description:"涉嫌使用外挂",
reason_rule:"《微信公众平台运营规范》3.1条规定－使用外挂行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_1",
level:1
},{
illegal_reason_id:55,
reason_id:8,
reason_name:"造遥",
reason_type:2,
reason_description:"涉嫌造谣或传谣",
reason_rule:"《微信公众平台运营规范》4.9条规定-谣言类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=25&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_9",
level:2
},{
illegal_reason_id:56,
reason_id:12,
reason_name:"骚扰",
reason_type:2,
reason_description:"涉嫌骚扰他人",
reason_rule:"《微信公众平台运营规范》4.10条规定-搔扰类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_10",
level:3
},{
illegal_reason_id:57,
reason_id:14,
reason_name:"刷粉",
reason_type:2,
reason_description:"涉嫌刷粉",
reason_rule:"《微信公众平台运营规范》3.2条规定－刷粉行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
level:3
},{
illegal_reason_id:58,
reason_id:13,
reason_name:"互推",
reason_type:2,
reason_description:"涉嫌互推",
reason_rule:"《微信公众平台运营规范》3.2条规定－刷粉行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
level:2
},{
illegal_reason_id:59,
reason_id:16,
reason_name:"抄袭",
reason_type:2,
reason_description:"涉嫌抄袭",
reason_rule:"《微信公众平台运营规范》4.1.2条规定-内容侵权",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:3
},{
illegal_reason_id:60,
reason_id:9,
reason_name:"垃圾广告",
reason_type:2,
reason_description:"涉嫌发送垃圾广告",
reason_rule:"《微信公众平台运营规范》4.8条规定-广告类内容",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=24&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_8",
level:2
},{
illegal_reason_id:61,
reason_id:10,
reason_name:"恶意注册",
reason_type:2,
reason_description:"涉嫌恶意注册",
reason_rule:"《微信公众平台运营规范》1条规定－ 注册规范",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot1",
level:1
},{
illegal_reason_id:62,
reason_id:17,
reason_name:"恶意投诉",
reason_type:2,
reason_description:"涉嫌恶意投诉",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:2
},{
illegal_reason_id:63,
reason_id:18,
reason_name:"违规分销",
reason_type:2,
reason_description:"涉嫌多级分销",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:64,
reason_id:90007,
reason_name:"违规声明原创",
reason_type:0,
reason_description:"涉嫌违规使用原创声明功能",
reason_rule:"微信公众平台运营规范》3.6条规定-滥用原创声明功能",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_6",
level:1
},{
illegal_reason_id:65,
reason_id:90011,
reason_name:"刷粉",
reason_type:0,
reason_description:"涉嫌刷粉",
reason_rule:"微信公众平台运营规范》3.2条规定－刷粉行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
level:1
},{
illegal_reason_id:66,
reason_id:90010,
reason_name:"侵犯名誉/商誉/隐私/肖像",
reason_type:0,
reason_description:"涉嫌侵犯名誉/商誉/隐私/肖像",
reason_rule:"《微信公众平台运营规范》4.1.2条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:69,
reason_id:90013,
reason_name:"滥用模版消息接口",
reason_type:0,
reason_description:"涉嫌滥用模版消息接口",
reason_rule:"《微信公众平台运营规范》3.9条规定-滥用模板消息接口行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=33&t=operation/faq_index&nettype=WIFI&fontScale=100&from=singlemessage&isappinstalled=0#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_9",
level:1
},{
illegal_reason_id:70,
reason_id:90012,
reason_name:"滥用客服消息",
reason_type:0,
reason_description:"涉嫌滥用客服消息",
reason_rule:"《微信公众平台运营规范》3.10条规定-滥用客服消息行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=34&t=operation/faq_index&nettype=WIFI&fontScale=100&from=singlemessage&isappinstalled=0#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_10",
level:1
},{
illegal_reason_id:71,
reason_id:90008,
reason_name:"互推",
reason_type:0,
reason_description:"涉嫌互推",
reason_rule:"《微信公众平台运营规范》3.2条规定－刷粉行为",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot3_2",
level:2
},{
illegal_reason_id:72,
reason_id:90014,
reason_name:"广告恶意点击",
reason_type:0,
reason_description:"恶意点击公众号文章底部广告",
reason_rule:"《广告展示违规行为处理细则》-作弊行为",
wap_url:"http://mp.weixin.qq.com/promotion/readtemplate?t=faq/ad_host_faq_5_tmpl#5dot4",
pc_url:"http://mp.weixin.qq.com/promotion/readtemplate?t=faq/ad_host_faq_5_tmpl#5dot4",
level:1
},{
illegal_reason_id:73,
reason_id:20011,
reason_name:"暴力血腥",
reason_type:0,
reason_description:"涉嫌发布暴力信息",
reason_rule:"《微信公众平台运营规范》4.3条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=19&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?token=2010733288&t=business/faq_operation_tmpl&type=info#3dot4_3",
level:1
},{
illegal_reason_id:74,
reason_id:90016,
reason_name:"侵犯知识产权",
reason_type:0,
reason_description:"涉嫌侵犯他人版权/商标/专利等知识产权",
reason_rule:"《微信公众平台运营规范》4.1.2条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:75,
reason_id:90009,
reason_name:"其他侵权",
reason_type:0,
reason_description:"涉嫌侵犯他人合法权益",
reason_rule:"《微信公众平台运营规范》4.1条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=17&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN#3dot4_1",
level:1
},{
illegal_reason_id:76,
reason_id:90017,
reason_name:"恶意投诉",
reason_type:0,
reason_description:"涉嫌恶意投诉他人",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:77,
reason_id:25,
reason_name:"假货",
reason_type:2,
reason_description:"制作/售卖/传播假货",
reason_rule:"《微信公众平台运营规范》4.1条规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:78,
reason_id:26,
reason_name:"网赚刷单",
reason_type:2,
reason_description:"诱导用户转发文章、下载app等",
reason_rule:"《微信公众平台运营规范》禁止诱导类行为的规定",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:85,
reason_id:90018,
reason_name:"阅读原文违规",
reason_type:0,
reason_description:"涉嫌阅读原文跳转至恶意链接",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:86,
reason_id:90019,
reason_name:"违反微信链接内容管理规范",
reason_type:0,
reason_description:"涉嫌违反微信链接内容管理规范",
reason_rule:"《微信外部链接内容管理规范》",
wap_url:"http://weixin.qq.com/cgi-bin/readtemplate?t=weixin_external_links_content_management_specification",
pc_url:"http://weixin.qq.com/cgi-bin/readtemplate?t=weixin_external_links_content_management_specification",
level:1
},{
illegal_reason_id:88,
reason_id:90020,
reason_name:"无证经营",
reason_type:0,
reason_description:"涉嫌无证经营",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
},{
illegal_reason_id:90,
reason_id:90021,
reason_name:"多级分销",
reason_type:0,
reason_description:"涉嫌多级分销经营行为",
reason_rule:"《微信公众平台运营规范》",
wap_url:"http://mp.weixin.qq.com/mp/opshowpage?action=oplaw&id=1&t=operation/faq_index#wechat_redirect",
pc_url:"https://mp.weixin.qq.com/cgi-bin/readtemplate?t=business/faq_operation_tmpl&type=info&lang=zh_CN",
level:1
}],_=function(e){
return e.getFullYear()+"/"+(e.getMonth()+1)+"/"+e.getDate();
},l=function(e,a){
for(var i=$(".main_bd"),p=0,l=0;l<r.length;l++)r[l].reason_id==e.reason_id&&(p=l);
var s={};
if(s.reason='<a href="'+(r[p].pc_url?r[p].pc_url:r[0].pc_url)+'">'+r[p].reason_description+"</a>",
e.ban_time===e.unlock_time?(s.forever="永久",s.date=""):(s.forever="",s.date="至"+_(new Date(1e3*e.unlock_time))),
a.hide&&("all"===a.hide?i.children().hide():$(a.hide).hide()),a.highlight){
a.highlight=template.compile(a.highlight)(s);
var m={
title:a.highlight.split("|")[0],
desc:template.compile(a.highlight.split("|")[1])()
};
$(template.compile(n)(m)).prependTo(i);
}
if(a.pagemsg){
var c={
content:template.compile(a.pagemsg)(s)
};
0==i.find(".ban_page_msg").length&&$(template.compile(o)(c)).prependTo(i);
}
return a.dialogmsg&&t.show({
type:"warn",
title:"提示",
msg:"能力封禁提示|"+template.compile(a.dialogmsg)(s),
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove();
}
}]
}),!1;
},s=function(e,a,i){
var n=!0;
if(!p[a])return!0;
for(var o=0,t=e.length;t>o;o++)if(e[o].func_id==p[a].func_id){
var r=l(e[o],p[a]);
n=r&&n;
}
return!n&&i&&"function"==typeof i&&i(),n;
};
s.getReason=function(e){
if("default"==e)return r[0];
for(var a=0;a<r.length;a++)if(r[a].reason_id==e)return r[a];
return r[0];
},s.getTypeName=function(e){
for(var a in p)if(p[a].func_id==e)return p[a].name;
},i.exports=s;
});define("common/wx/media/imgsDialogByUrls.js",["tpl/media/imgsDialogByUrls.html.js","common/wx/dialog.js"],function(i){
"use strict";
{
var e=i("tpl/media/imgsDialogByUrls.html.js");
i("common/wx/dialog.js");
}
"function"!=typeof window.__titleImgLoaded&&(window.__titleImgLoaded=function(i){
var e=$(i),t=new window.Image;
t.onload=function(){
t.onload=null,this.width>=200&&this.height>=200?e.parents(".js_imgItem").show():e.parents(".js_imgItem").remove();
},t.src=i.src;
});
var t=function(i){
for(var t=$(wx.T(e,i)),o=[],s=t.popup({
title:"选择封面",
className:"appmsg_content_img_dialog",
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove(),i.onOk&&i.onOk(o);
}
}],
onHide:function(){
this.remove(),"function"==typeof i.onHide&&i.onHide();
}
}),n=0,a=i.urls.length;a>n;n++){
var m=i.urls[n],r=new window.Image;
r.onload=function(){
if(this.onload=null,s){
var i=s.find('.js_imgItem[data-src="'+this.src+'"]');
this.width>=200&&this.height>=200?i.show().find(".js_imgItemSrc").css({
"background-image":"url("+this.src+")"
}):i.remove();
}
},r.src=m.url;
}
s.on("click",".js_imgItem",function(){
var i=$(this),e=i.find(".js_imgItemSrc");
e.data("remoteid")||e.hasClass("js_catchremoteimageerror")||(s.find(".js_imgItem").removeClass("selected"),
i.addClass("selected"),o=[e.css("background-image").replace(/url\([\"\']?([^\)\'\"]+)[\"\']?\)/,"$1")]);
});
};
return t;
});define("common/wx/popover.js",["tpl/popover.html.js"],function(o,t,e){
"use strict";
function i(o){
if(o=$.extend(!0,{},h,o),this.opt=o,this.$dom=$(o.dom),this.$dom.data("popover")){
var t=this.$dom.data("popover");
return s(o,t),t.$pop.show(),t;
}
return o.buttons&&o.buttons&&o.buttons.each(function(o){
o.type=o.type||"default";
}),this.$pop=$(template.compile(p)(o)),o.addCls&&this.$pop.addClass(o.addCls),$("body").append(this.$pop),
n(this,o),s(o,this),this.$pop.show(),this.$dom.data("popover",this),this.clickIn=!0,
this;
}
function n(o,t){
function e(){
clearTimeout(n),o.show();
}
function i(){
n=setTimeout(function(){
o.hide();
},s);
}
if(t.buttons&&t.buttons.length>0&&o.$pop.find(".jsPopoverBt").each(function(e,i){
t.buttons[e]&&"function"==typeof t.buttons[e].click&&$(i).click(function(i){
t.buttons[e].click.call(o,i);
});
}),o.$pop.find(".jsPopoverClose").click(function(){
t.close===!0?o.hide():"function"==typeof t.close&&t.close.call(o);
}),t.hover&&(o.$dom.hover(function(){
o.hoverTime&&clearTimeout(o.hoverTime);
},function(){
o.hoverTime=o.hide.delay(1,o);
}),o.$pop.hover(function(){
o.hoverTime&&clearTimeout(o.hoverTime);
},function(){
o.hoverTime&&clearTimeout(o.hoverTime),o.hoverTime=o.hide.delay(1,o);
})),t.isToggle){
var n=null,s=300;
o.$dom.hover(e,i),o.$pop.hover(e,i);
}
t.hideIfBlur&&(o._onBlur=function(o){
var t=o.data.context,e=o.target,i=t.$dom.get(0),n=t.$pop.get(0);
t.clickIn?t.clickIn=!1:$.contains(i,e)||i===e||$.contains(n,e)||n===e||o.data.context.hide();
},$(document).on("click",{
context:o
},o._onBlur)),o._onResize=function(o){
o.data.context.resetPosition();
},$(window).on("resize",{
context:o
},o._onResize);
}
function s(o,t){
var e=t.$dom.offset();
"left"==o.margin?(console.log(e.top),console.log(t.$dom.height()),t.$pop.css({
top:e.top+t.$dom.height(),
left:e.left
}).addClass("pos_left")):"right"==o.margin?t.$pop.css({
top:e.top+t.$dom.height(),
left:e.left+t.$dom.width()-t.$pop.width()
}).addClass("pos_right"):t.$pop.css({
top:e.top+t.$dom.height(),
left:e.left+t.$dom.outerWidth()/2-t.$pop.width()/2
}).addClass("pos_center");
}
var p=o("tpl/popover.html.js"),h={
dom:"",
content:"",
place:"bottom",
margin:"center",
hideIfBlur:!1,
hover:!1,
addCls:"",
width:"",
isToggle:!1,
onHide:!1,
onShow:!1,
onRemove:!1
};
i.prototype={
remove:function(){
this.$pop.remove(),this.$dom.removeData("popover"),this._onBlur&&$(document).off("click",this._onBlur),
$(window).off("resize",this._onResize),"function"==typeof this.opt.onRemove&&this.opt.onRemove.call(this);
},
hide:function(){
this.$pop.hide(),"function"==typeof this.opt.onHide&&this.opt.onHide.call(this);
},
show:function(){
this.$pop.show(),"function"==typeof this.opt.onShow&&this.opt.onShow.call(this);
},
resetPosition:function(){
return s(this.opt,this);
}
},e.exports=i;
});define("common/wx/preview.js",["common/wx/Tips.js","widget/img_preview.css","tpl/preview.html.js"],function(t,n,i){
"use strict";
var e=t("common/wx/Tips.js"),r=(t("widget/img_preview.css"),t("tpl/preview.html.js")),m=function(t){
this._initData(t),this._render(),this._initEvent();
};
m.prototype={
_moImgData:[],
_msTmplHtml:r,
_moCurrentImgIdx:0,
_initData:function(t){
return this._moImgData=t.imgdata||[],this._moCurrentImgIdx="undefined"==typeof t.current?0:"number"==typeof t.current?t.current:this._inArray(t.current,t.imgdata),
this._moImgData.length<1?void this._throwErr():((this._moCurrentImgIdx<0||this._moCurrentImgIdx>=this._moImgData.length)&&(this._moCurrentImgIdx=0),
void(this._moCfg={
view:this._moImgData.length>1?!0:!1,
imgsrc:this._moImgData[this._moCurrentImgIdx].imgsrc,
downsrc:this._moImgData[this._moCurrentImgIdx].downsrc,
prev:this._moCurrentImgIdx-1>-1?!0:!1,
next:this._moCurrentImgIdx+1<this._moImgData.length?!0:!1
}));
},
_render:function(){
$(template.compile(this._msTmplHtml)(this._moCfg)).appendTo("body");
},
_prev:function(){
this._moCurrentImgIdx>0&&($.extend(this._moCfg,{
imgsrc:this._moImgData[this._moCurrentImgIdx-1].imgsrc,
downsrc:this._moImgData[this._moCurrentImgIdx-1].downsrc,
prev:this._moCurrentImgIdx-1>0?!0:!1,
next:!0
}),this._changeImg(),this._moCurrentImgIdx--);
},
_next:function(){
this._moCurrentImgIdx+1<this._moImgData.length&&($.extend(this._moCfg,{
imgsrc:this._moImgData[this._moCurrentImgIdx+1].imgsrc,
downsrc:this._moImgData[this._moCurrentImgIdx+1].downsrc,
next:this._moCurrentImgIdx+2<this._moImgData.length?!0:!1,
prev:!0
}),this._moCurrentImgIdx++,this._changeImg());
},
_changeImg:function(){
var t=$("#img_opr_container");
this._moCfg.next?t.removeClass("next_disabled"):t.addClass("next_disabled"),this._moCfg.prev?t.removeClass("prev_disabled"):t.addClass("prev_disabled"),
$("#img_dom").hide(),$("#loading_dom").show(),$("#img_dom").find("img").attr("src",""),
$("#img_dom").find("img").attr("src",this._moCfg.imgsrc);
},
_destory:function(){
$(".preview_mask").remove(),$("#preview_container").remove();
},
_throwErr:function(){
alert("系统错误，请重试");
},
_initEvent:function(){
var t=this;
$("#preview_container").on("click",function(n){
var i=n.srcElement||n.target;
$.contains($("#img_container")[0],i)||$.contains($("#img_opr_container")[0],i)||t._destory();
}),$("#closebtn").on("click",function(){
return t._destory(),!1;
}),$("#btnview").on("click",function(){
return""!=t._moCfg.imgsrc?window.open(t._moCfg.imgsrc):e.err("图片资源加载失败。"),!1;
}),$("#btnnext").on("click",function(){
t._next();
}),$("#btnprev").on("click",function(){
t._prev();
}),$(document).keyup(function(n){
27==n.keyCode&&t._destory(),37==n.keyCode&&t._prev(),39==n.keyCode&&t._next();
}),$("#img_dom").find("img").on("load",function(){
$("#img_dom").show(),$("#loading_dom").hide();
});
},
_inArray:function(t,n){
for(var i,e=0;i=n[e];e++)if(t==i.imgsrc)return e;
return-1;
}
},i.exports={
close:function(){
m._destory();
},
show:function(t){
return new m(t);
}
};
});define("common/wx/media/imageDialog.js",["biz_web/ui/checkbox.js","common/wx/popover.js","common/wx/Cgi.js","common/wx/Tips.js","common/wx/popup.js","common/wx/pagebar.js","biz_web/utils/upload.js","common/wx/tooltips.js","tpl/media/dialog/image_layout.html.js","tpl/media/dialog/image_list.html.js","tpl/media/dialog/image_group.html.js","tpl/media/dialog/add_group.html.js","tpl/media/dialog/image_water.html.js","page/media/dialog_img_pick.css"],function(e){
"use strict";
var i=(e("biz_web/ui/checkbox.js"),e("common/wx/popover.js")),t=e("common/wx/Cgi.js"),o=e("common/wx/Tips.js"),n=(e("common/wx/popup.js"),
e("common/wx/pagebar.js")),r=e("biz_web/utils/upload.js"),a=e("common/wx/tooltips.js"),s=e("tpl/media/dialog/image_layout.html.js"),l=e("tpl/media/dialog/image_list.html.js"),p=e("tpl/media/dialog/image_group.html.js"),d=e("tpl/media/dialog/add_group.html.js"),c=e("tpl/media/dialog/image_water.html.js"),g=(template.render,
template.compile(d)),u=template.compile(p),m=template.compile(l),f={
popover:null
};
e("page/media/dialog_img_pick.css");
var _=function(e){
return new h(e);
},h=function(e){
this.options=e,this.events=[],this.imgArr=[],this.converting=0,this.fromUpload=[],
v.init.call(this);
},v={
init:function(){
var e=this,i=e.options=$.extend(!0,{
tpl:s,
title:"选择图片",
scene:"cdn",
maxSelect:1,
perPage:10,
group:0,
uploadGroupId:1,
coverPicCheckbox:!1,
coverPic:0,
onOK:null,
onCancel:null
},e.options);
i.tpl=template.compile(i.tpl)(i),e.on("ok",function(e){
!!f.popover&&f.popover.remove(),this.destroy(),"function"==typeof i.onOK&&i.onOK.call(this,e);
}),e.on("cancel",function(){
!!f.popover&&f.popover.remove(),this.destroy(),"function"==typeof i.onCancel?i.onCancel.call(this):"function"==typeof i.onHide&&i.onHide.call(this);
}),e.on("hide",function(){
!!f.popover&&f.popover.remove(),this.destroy(),"function"==typeof i.onHide&&i.onHide.call(this);
}),e.dialog=$(i.tpl.trim()).popup({
title:i.title,
className:"img_dialog_wrp",
width:846,
buttons:[{
text:"确定",
type:"disabled",
click:function(){
var t=this.get().find(".js_btn").eq(0).parent();
return t.hasClass("btn_disabled")?void o.err("请选择图片"):(e.popup=this,$.each(e.imgArr,function(i,t){
t.source=-1!=e.fromUpload.indexOf(t.file_id+"")?"upload":"lib",e.options.coverPicCheckbox&&(t.coverPic=e.popup.get().find(".js_show_cover_pic").checkbox("value")||"");
}),void("cdn"==i.scene&&e.converting>0?(t.btn(!1),e.on("converted",function(){
0==e.converting&&(e.trigger("ok",e.imgArr||[]),t.btn(!0));
})):e.trigger("ok",e.imgArr||[])));
}
},{
text:"取消",
click:function(){
e.trigger("cancel");
}
}],
onHide:function(){
e.trigger("hide");
}
});
var t=e.dialog.popup("get");
t.find(".js_show_cover_pic").checkbox(),t.find(".js_loading").show(),j.getImagesByGroupId({
group_id:i.group,
count:i.perPage
},function(t){
if(e.dialog){
var o=t.page_info;
o.scene=i.scene,o.group=i.group;
var n=e.dialog.popup("get"),r=u(o);
n.find(".js_loading").hide(),n.find(".js_group").append(r).find(".js_total").text("(%s)".sprintf(o.file_cnt.img_cnt)),
v.renderImageList(n.find(".js_list"),o,e.imgArr),v.initEvent.call(e,t),v.initWater.call(e,o),
v.initPageBar.call(e,o,i.group),e.dialog.popup("resetPosition");
}
}),v.initUpload.call(e,i.group);
},
initEvent:function(){
var e=this,i=e.dialog.popup("get"),t=e.options;
i.on("click",".js_imageitem",function(){
var n,r=$(this),a=r.find("label"),s=i.find(".js_btn_p").eq(0),l=r.data("url"),p=r.data("id"),d=r.data("oristatus"),c=r.data("format");
a.hasClass("selected")?(l||e.converting--,a.removeClass("selected"),n=b.indexOf(e.imgArr,p),
n>=0&&e.imgArr.splice(n,1),i.find(".js_selected").text(e.imgArr.length)):1==t.maxSelect?(l||(e.converting=1),
a.addClass("selected"),r.siblings().find("label").removeClass("selected"),e.imgArr=[{
url:l,
file_id:p,
format:c,
copyright_status:d
}],i.find(".js_selected").text(e.imgArr.length)):t.maxSelect>e.imgArr.length?(l||e.converting++,
a.addClass("selected"),e.imgArr.push({
url:l,
file_id:p,
format:c,
copyright_status:d
}),i.find(".js_selected").text(e.imgArr.length)):o.err("最多可选%s张".sprintf(t.maxSelect)),
e.imgArr.length>0?s.enable().addClass("btn_primary"):s.disable(),"cdn"==t.scene&&a.hasClass("selected")&&!l&&j.getCdnUrlByFileId({
file_id:p,
group_id:i.find(".js_groupitem.selected").data("groupid")
},function(i){
0==i.errcode?(e.converting--,r.data("url",i.url),n=b.indexOf(e.imgArr,p),n>=0&&(e.imgArr[n].url=i.url),
e.trigger("converted")):(o.err("转存失败"),r.click());
});
}),i.on("click",".js_creategroup",function(){
v.createPopover.call(e,{
dom:this,
content:g({}),
ok:function(){
v.createGroup.call(e);
}
});
}),i.on("click",".js_groupitem",function(o,n){
var r=$(this),a=i.find(".js_list"),s=i.find(".js_loading"),l=i.find(".js_pagebar"),p=r.data("groupid");
r.hasClass("selected")||(r.addClass("selected").siblings(".selected").removeClass("selected"),
$(".js_imageupload").data("groupid",p),a.hide(),l.hide(),s.show(),j.getImagesByGroupId({
group_id:p,
count:t.perPage
},function(o){
if(e.dialog&&p==i.find(".js_groupitem.selected").data("groupid")){
o=o.page_info,o.scene=t.scene,s.hide(),l.show(),v.renderImageList(a,o,e.imgArr),
v.initPageBar.call(e,o,p),v.initUpload.call(e);
for(var r=0;n&&"upload"==n.source&&r<n.count;++r)a.children().eq(r).click();
}
}));
});
},
createPopover:function(e){
!!f.popover&&f.popover.remove(),f.popover=new i({
dom:e.dom,
content:e.content,
margin:"center",
place:"bottom",
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove(),e.ok.call(this);
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
});
},
createGroup:function(){
var e=this,i=f.popover.$pop,n=i.find(".jsPopoverBt").eq(0),r=i.find("input").val().trim();
return r.length<1||r.length>6?void o.err("分组名字为1-6个字符"):(n.btn(0),void t.post({
url:wx.url("/cgi-bin/filepage"),
data:{
action:"create_group",
name:r
},
mask:!1
},function(i){
var t=i.base_resp.ret;
if(0==t){
var a=e.options;
j.getImagesByGroupId({
group_id:a.group,
count:a.perPage
},function(i){
if(e.dialog){
var t=i.page_info;
t.group=1;
for(var o=0,n=t.file_group_list.file_group.length;n>o;o++){
var a=t.file_group_list.file_group[o];
a.name==r&&(t.group=a.id);
}
var s=e.dialog.popup("get"),l=s.find(".js_list"),p=u(t);
s.find(".js_group").html(p),v.renderImageList(l,{
file_item:[]
},e.imgArr),v.initPageBar.call(e,t,t.group),s.find(".js_imageupload").data("groupid",t.group),
v.initUpload.call(e,t.group);
}
});
}else 15006==t?(o.err("已经超过100个分组，不能再创建新的分组。"),n.btn(!0)):(o.err("创建失败，请重试"),n.btn(!0));
}));
},
initPageBar:function(e,i){
var t=this,o=t.dialog.popup("get"),r=t.options;
v.pagebar&&v.pagebar.destroy();
var a=0;
return 0==i?a=e.file_cnt.img_cnt:e.file_group_list.file_group.each(function(e){
e.id==i&&(a=e.count);
}),r.perPage>=a?void o.find(".js_pagebar").empty():void(v.pagebar=new n({
container:o.find(".js_pagebar"),
perPage:r.perPage,
initShowPage:1,
totalItemsNum:a,
first:!1,
last:!1,
isSimple:!0,
callback:function(e){
var i=o.find(".js_groupitem.selected").data("groupid"),n=o.find(".js_list"),a=o.find(".js_loading"),s=o.find(".js_pagebar");
n.hide(),s.hide(),a.show(),j.getImagesByGroupId({
group_id:i,
begin:e.perPage*(e.currentPage-1),
count:r.perPage
},function(e){
e=e.page_info,e.scene=r.scene,a.hide(),s.show(),v.renderImageList(n,e,t.imgArr);
});
}
}));
},
initUpload:function(e){
var i=this,t=i.dialog.popup("get"),n=t.find(".js_imageupload"),a="js_imageupload"+Math.random().toString().substr(2),s=i.options,l=t.find(".js_groupitem.selected").data("groupid")||e;
l=l?l:s.uploadGroupId,n.attr("id",a).off().children().remove(),r.uploadImageLibFile({
container:"#"+a,
only_cdn:s.only_cdn,
multi:!0,
type:2,
scene:s.uploadScene,
doublewrite:!0,
groupid:l,
onComplete:function(e,t,n,r){
0==r.base_resp.ret&&o.suc("上传成功"),i.fromUpload.push(r.content);
},
onAllComplete:function(e,i){
var o=t.find(".js_groupitem.selected"),n=t.find(".js_groupitem[data-groupid="+l+"]");
if(i.filesUploaded>0)if(!s.doselected||s.doselected&&i.filesUploaded<=1*s.completeUploadMinSelectNum?o.removeClass("selected").trigger("click",{
source:"upload",
count:i.filesUploaded
}):o.removeClass("selected").trigger("click",{
source:"upload",
count:0
}),n.length>0&&o.length>0&&n[0]===o[0]){
var r=+o.find("span").text();
o.find("span").text(r+i.filesUploaded);
}else{
var r=+o.find("span").text();
o.find("span").text(r+i.filesUploaded);
var a=+n.find("span").text();
n.find("span").text(a+i.filesUploaded);
}
},
showError:!0
});
},
initWater:function(e){
var i=this,t=i.options,o=i.dialog.popup("get"),n=e.watermark_status,r=template.compile(c)({
status:n,
set_water_url:wx.url("/cgi-bin/settingpage?t=setting/function&action=function&set_water=1")
});
o.find(".js_water").text((t.desc?"，":"")+(3==n?"已关闭":"已开启")+"图片水印"),new a({
container:o.find(".js_water_tips"),
content:r,
parentClass:"js_water img_water",
position:{
left:-138,
top:2
},
reposition:!0,
type:"hover"
});
},
renderImageList:function(e,i,t){
i.file_item.each(function(e){
e.img_url=e.cdn_url?e.cdn_url:wx.url("/cgi-bin/getimgdata?mode=small&source=file&fileId=%s".sprintf(e.file_id)),
-1!=b.indexOf(t,e.file_id)&&(e.selected=1);
}),e.html(m(i)).show();
var o=0,n=0,r=28308,a=28308,s=9,l=10,p=0,d=117,c=$(".js_pic"),g=c.length;
c.each(function(){
var e=$(this);
e.on("error",function(){
++o,++p,p===g&&((new Image).src="/mp/jsmonitor?idkey="+r+"_"+s+"_"+o+";"+a+"_"+l+"_"+n);
}),e.on("load",function(){
++n,++p;
var i=parseInt(e.css("width")),t=parseInt(e.css("height"));
t>i?e.css("width",d):e.css("height",d),p===g&&((new Image).src="/mp/jsmonitor?idkey="+r+"_"+s+"_"+o+";"+a+"_"+l+"_"+n);
}),e.attr("src",e.attr("data-src"));
});
}
},j={
getImagesByGroupId:function(e,i){
e=$.extend({
group_id:1,
begin:0,
count:8,
type:2
},e),t.get({
url:wx.url("/cgi-bin/filepage"),
data:e,
mask:!1
},function(e){
0!=e.base_resp.ret?t.show(e):i(e);
});
},
getCdnUrlByFileId:function(e,i){
e.group_id=e.group_id||1,t.post({
url:wx.url("/cgi-bin/uploadimg2cdn?action=duplicate"),
data:e,
mask:!1
},function(e){
i(e);
});
}
},b={
indexOf:function(e,i){
for(var t=0,o=e.length;o>t;++t)if(e[t].file_id==i)return t;
return-1;
}
},w={
on:function(e,i){
if(i){
var t=this.events;
return t[e]=t[e]||[],t[e].push(i),this;
}
},
trigger:function(e){
var i=this,t=arguments,o=i.events[e];
return o?($.each(o,function(e,o){
o.apply(i,Array.prototype.slice.call(t,1));
}),this):void 0;
},
hide:function(){
return this.dialog.popup("hide"),this;
},
show:function(){
return this.dialog.popup("show"),this;
},
destroy:function(){
!!this.dialog&&this.dialog.popup("remove"),this.dialog=null;
}
};
return $.extend(h.prototype,w),_;
});define("biz_common/moment.js",[],function(t,e,n){
function s(t,e){
return function(n){
return c(t.call(this,n),e);
};
}
function r(t){
return function(e){
return this.lang().ordinal(t.call(this,e));
};
}
function a(){}
function i(t){
u(this,t);
}
function o(t){
var e=this._data={},n=t.years||t.year||t.y||0,s=t.months||t.month||t.M||0,r=t.weeks||t.week||t.w||0,a=t.days||t.day||t.d||0,i=t.hours||t.hour||t.h||0,o=t.minutes||t.minute||t.m||0,u=t.seconds||t.second||t.s||0,c=t.milliseconds||t.millisecond||t.ms||0;
this._milliseconds=c+1e3*u+6e4*o+36e5*i,this._days=a+7*r,this._months=s+12*n,e.milliseconds=c%1e3,
u+=d(c/1e3),e.seconds=u%60,o+=d(u/60),e.minutes=o%60,i+=d(o/60),e.hours=i%24,a+=d(i/24),
a+=7*r,e.days=a%30,s+=d(a/30),e.months=s%12,n+=d(s/12),e.years=n;
}
function u(t,e){
for(var n in e)e.hasOwnProperty(n)&&(t[n]=e[n]);
return t;
}
function d(t){
return 0>t?Math.ceil(t):Math.floor(t);
}
function c(t,e){
for(var n=t+"";n.length<e;)n="0"+n;
return n;
}
function h(t,e,n){
var s,r=e._milliseconds,a=e._days,i=e._months;
r&&t._d.setTime(+t+r*n),a&&t.date(t.date()+a*n),i&&(s=t.date(),t.date(1).month(t.month()+i*n).date(Math.min(s,t.daysInMonth())));
}
function f(t){
return"[object Array]"===Object.prototype.toString.call(t);
}
function l(t,e){
var n,s=Math.min(t.length,e.length),r=Math.abs(t.length-e.length),a=0;
for(n=0;s>n;n++)~~t[n]!==~~e[n]&&a++;
return a+r;
}
function _(t,e){
return e.abbr=t,A[t]||(A[t]=new a),A[t].set(e),A[t];
}
function m(e){
return e?(!A[e]&&Z&&t("./lang/"+e),A[e]):C.fn._lang;
}
function M(t){
return t.match(/\[.*\]/)?t.replace(/^\[|\]$/g,""):t.replace(/\\/g,"");
}
function y(t){
var e,n,s=t.match(E);
for(e=0,n=s.length;n>e;e++)s[e]=ie[s[e]]?ie[s[e]]:M(s[e]);
return function(r){
var a="";
for(e=0;n>e;e++)a+="function"==typeof s[e].call?s[e].call(r,t):s[e];
return a;
};
}
function Y(t,e){
function n(e){
return t.lang().longDateFormat(e)||e;
}
for(var s=5;s--&&J.test(e);)e=e.replace(J,n);
return se[e]||(se[e]=y(e)),se[e](t);
}
function D(t){
switch(t){
case"DDDD":
return $;

case"YYYY":
return I;

case"YYYYY":
return X;

case"S":
case"SS":
case"SSS":
case"DDD":
return N;

case"MMM":
case"MMMM":
case"dd":
case"ddd":
case"dddd":
case"a":
case"A":
return j;

case"X":
return G;

case"Z":
case"ZZ":
return R;

case"T":
return B;

case"MM":
case"DD":
case"YY":
case"HH":
case"hh":
case"mm":
case"ss":
case"M":
case"D":
case"d":
case"H":
case"h":
case"m":
case"s":
return V;

default:
return new RegExp(t.replace("\\",""));
}
}
function p(t,e,n){
var s,r=n._a;
switch(t){
case"M":
case"MM":
r[1]=null==e?0:~~e-1;
break;

case"MMM":
case"MMMM":
s=m(n._l).monthsParse(e),null!=s?r[1]=s:n._isValid=!1;
break;

case"D":
case"DD":
case"DDD":
case"DDDD":
null!=e&&(r[2]=~~e);
break;

case"YY":
r[0]=~~e+(~~e>68?1900:2e3);
break;

case"YYYY":
case"YYYYY":
r[0]=~~e;
break;

case"a":
case"A":
n._isPm="pm"===(e+"").toLowerCase();
break;

case"H":
case"HH":
case"h":
case"hh":
r[3]=~~e;
break;

case"m":
case"mm":
r[4]=~~e;
break;

case"s":
case"ss":
r[5]=~~e;
break;

case"S":
case"SS":
case"SSS":
r[6]=~~(1e3*("0."+e));
break;

case"X":
n._d=new Date(1e3*parseFloat(e));
break;

case"Z":
case"ZZ":
n._useUTC=!0,s=(e+"").match(te),s&&s[1]&&(n._tzh=~~s[1]),s&&s[2]&&(n._tzm=~~s[2]),
s&&"+"===s[0]&&(n._tzh=-n._tzh,n._tzm=-n._tzm);
}
null==e&&(n._isValid=!1);
}
function g(t){
var e,n,s=[];
if(!t._d){
for(e=0;7>e;e++)t._a[e]=s[e]=null==t._a[e]?2===e?1:0:t._a[e];
s[3]+=t._tzh||0,s[4]+=t._tzm||0,n=new Date(0),t._useUTC?(n.setUTCFullYear(s[0],s[1],s[2]),
n.setUTCHours(s[3],s[4],s[5],s[6])):(n.setFullYear(s[0],s[1],s[2]),n.setHours(s[3],s[4],s[5],s[6])),
t._d=n;
}
}
function w(t){
var e,n,s=t._f.match(E),r=t._i;
for(t._a=[],e=0;e<s.length;e++)n=(D(s[e]).exec(r)||[])[0],n&&(r=r.slice(r.indexOf(n)+n.length)),
ie[s[e]]&&p(s[e],n,t);
t._isPm&&t._a[3]<12&&(t._a[3]+=12),t._isPm===!1&&12===t._a[3]&&(t._a[3]=0),g(t);
}
function T(t){
for(var e,n,s,r,a=99;t._f.length;){
if(e=u({},t),e._f=t._f.pop(),w(e),n=new i(e),n.isValid()){
s=n;
break;
}
r=l(e._a,n.toArray()),a>r&&(a=r,s=n);
}
u(t,s);
}
function k(t){
var e,n=t._i;
if(q.exec(n)){
for(t._f="YYYY-MM-DDT",e=0;4>e;e++)if(Q[e][1].exec(n)){
t._f+=Q[e][0];
break;
}
R.exec(n)&&(t._f+=" Z"),w(t);
}else t._d=new Date(n);
}
function v(t){
var e=t._i,n=P.exec(e);
void 0===e?t._d=new Date:n?t._d=new Date(+n[1]):"string"==typeof e?k(t):f(e)?(t._a=e.slice(0),
g(t)):t._d=new Date(e instanceof Date?+e:e);
}
function S(t,e,n,s,r){
return r.relativeTime(e||1,!!n,t,s);
}
function L(t,e,n){
var s=U(Math.abs(t)/1e3),r=U(s/60),a=U(r/60),i=U(a/24),o=U(i/365),u=45>s&&["s",s]||1===r&&["m"]||45>r&&["mm",r]||1===a&&["h"]||22>a&&["hh",a]||1===i&&["d"]||25>=i&&["dd",i]||45>=i&&["M"]||345>i&&["MM",U(i/30)]||1===o&&["y"]||["yy",o];
return u[2]=e,u[3]=t>0,u[4]=n,S.apply({},u);
}
function b(t,e,n){
var s=n-e,r=n-t.day();
return r>s&&(r-=7),s-7>r&&(r+=7),Math.ceil(C(t).add("d",r).dayOfYear()/7);
}
function F(t){
var e=t._i,n=t._f;
return null===e||""===e?null:("string"==typeof e&&(t._i=e=m().preparse(e)),C.isMoment(e)?(t=u({},e),
t._d=new Date(+e._d)):n?f(n)?T(t):w(t):v(t),new i(t));
}
function H(t,e){
C.fn[t]=C.fn[t+"s"]=function(t){
var n=this._isUTC?"UTC":"";
return null!=t?(this._d["set"+n+e](t),this):this._d["get"+n+e]();
};
}
function O(t){
C.duration.fn[t]=function(){
return this._data[t];
};
}
function z(t,e){
C.duration.fn["as"+t]=function(){
return+this/e;
};
}
for(var C,W,x="2.0.0",U=Math.round,A={},Z="undefined"!=typeof n&&n.exports,P=/^\/?Date\((\-?\d+)/i,E=/(\[[^\[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|YYYYY|YYYY|YY|a|A|hh?|HH?|mm?|ss?|SS?S?|X|zz?|ZZ?|.)/g,J=/(\[[^\[]*\])|(\\)?(LT|LL?L?L?|l{1,4})/g,V=/\d\d?/,N=/\d{1,3}/,$=/\d{3}/,I=/\d{1,4}/,X=/[+\-]?\d{1,6}/,j=/[0-9]*[a-z\u00A0-\u05FF\u0700-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+|[\u0600-\u06FF]+\s*?[\u0600-\u06FF]+/i,R=/Z|[\+\-]\d\d:?\d\d/i,B=/T/i,G=/[\+\-]?\d+(\.\d{1,3})?/,q=/^\s*\d{4}-\d\d-\d\d((T| )(\d\d(:\d\d(:\d\d(\.\d\d?\d?)?)?)?)?([\+\-]\d\d:?\d\d)?)?/,K="YYYY-MM-DDTHH:mm:ssZ",Q=[["HH:mm:ss.S",/(T| )\d\d:\d\d:\d\d\.\d{1,3}/],["HH:mm:ss",/(T| )\d\d:\d\d:\d\d/],["HH:mm",/(T| )\d\d:\d\d/],["HH",/(T| )\d\d/]],te=/([\+\-]|\d\d)/gi,ee="Month|Date|Hours|Minutes|Seconds|Milliseconds".split("|"),ne={
Milliseconds:1,
Seconds:1e3,
Minutes:6e4,
Hours:36e5,
Days:864e5,
Months:2592e6,
Years:31536e6
},se={},re="DDD w W M D d".split(" "),ae="M D H h m s w W".split(" "),ie={
M:function(){
return this.month()+1;
},
MMM:function(t){
return this.lang().monthsShort(this,t);
},
MMMM:function(t){
return this.lang().months(this,t);
},
D:function(){
return this.date();
},
DDD:function(){
return this.dayOfYear();
},
d:function(){
return this.day();
},
dd:function(t){
return this.lang().weekdaysMin(this,t);
},
ddd:function(t){
return this.lang().weekdaysShort(this,t);
},
dddd:function(t){
return this.lang().weekdays(this,t);
},
w:function(){
return this.week();
},
W:function(){
return this.isoWeek();
},
YY:function(){
return c(this.year()%100,2);
},
YYYY:function(){
return c(this.year(),4);
},
YYYYY:function(){
return c(this.year(),5);
},
a:function(){
return this.lang().meridiem(this.hours(),this.minutes(),!0);
},
A:function(){
return this.lang().meridiem(this.hours(),this.minutes(),!1);
},
H:function(){
return this.hours();
},
h:function(){
return this.hours()%12||12;
},
m:function(){
return this.minutes();
},
s:function(){
return this.seconds();
},
S:function(){
return~~(this.milliseconds()/100);
},
SS:function(){
return c(~~(this.milliseconds()/10),2);
},
SSS:function(){
return c(this.milliseconds(),3);
},
Z:function(){
var t=-this.zone(),e="+";
return 0>t&&(t=-t,e="-"),e+c(~~(t/60),2)+":"+c(~~t%60,2);
},
ZZ:function(){
var t=-this.zone(),e="+";
return 0>t&&(t=-t,e="-"),e+c(~~(10*t/6),4);
},
X:function(){
return this.unix();
}
};re.length;)W=re.pop(),ie[W+"o"]=r(ie[W]);
for(;ae.length;)W=ae.pop(),ie[W+W]=s(ie[W],2);
for(ie.DDDD=s(ie.DDD,3),a.prototype={
set:function(t){
var e,n;
for(n in t)e=t[n],"function"==typeof e?this[n]=e:this["_"+n]=e;
},
_months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
months:function(t){
return this._months[t.month()];
},
_monthsShort:"Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
monthsShort:function(t){
return this._monthsShort[t.month()];
},
monthsParse:function(t){
var e,n,s;
for(this._monthsParse||(this._monthsParse=[]),e=0;12>e;e++)if(this._monthsParse[e]||(n=C([2e3,e]),
s="^"+this.months(n,"")+"|^"+this.monthsShort(n,""),this._monthsParse[e]=new RegExp(s.replace(".",""),"i")),
this._monthsParse[e].test(t))return e;
},
_weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
weekdays:function(t){
return this._weekdays[t.day()];
},
_weekdaysShort:"Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
weekdaysShort:function(t){
return this._weekdaysShort[t.day()];
},
_weekdaysMin:"Su_Mo_Tu_We_Th_Fr_Sa".split("_"),
weekdaysMin:function(t){
return this._weekdaysMin[t.day()];
},
_longDateFormat:{
LT:"h:mm A",
L:"MM/DD/YYYY",
LL:"MMMM D YYYY",
LLL:"MMMM D YYYY LT",
LLLL:"dddd, MMMM D YYYY LT"
},
longDateFormat:function(t){
var e=this._longDateFormat[t];
return!e&&this._longDateFormat[t.toUpperCase()]&&(e=this._longDateFormat[t.toUpperCase()].replace(/MMMM|MM|DD|dddd/g,function(t){
return t.slice(1);
}),this._longDateFormat[t]=e),e;
},
meridiem:function(t,e,n){
return t>11?n?"pm":"PM":n?"am":"AM";
},
_calendar:{
sameDay:"[Today at] LT",
nextDay:"[Tomorrow at] LT",
nextWeek:"dddd [at] LT",
lastDay:"[Yesterday at] LT",
lastWeek:"[last] dddd [at] LT",
sameElse:"L"
},
calendar:function(t,e){
var n=this._calendar[t];
return"function"==typeof n?n.apply(e):n;
},
_relativeTime:{
future:"in %s",
past:"%s ago",
s:"a few seconds",
m:"a minute",
mm:"%d minutes",
h:"an hour",
hh:"%d hours",
d:"a day",
dd:"%d days",
M:"a month",
MM:"%d months",
y:"a year",
yy:"%d years"
},
relativeTime:function(t,e,n,s){
var r=this._relativeTime[n];
return"function"==typeof r?r(t,e,n,s):r.replace(/%d/i,t);
},
pastFuture:function(t,e){
var n=this._relativeTime[t>0?"future":"past"];
return"function"==typeof n?n(e):n.replace(/%s/i,e);
},
ordinal:function(t){
return this._ordinal.replace("%d",t);
},
_ordinal:"%d",
preparse:function(t){
return t;
},
postformat:function(t){
return t;
},
week:function(t){
return b(t,this._week.dow,this._week.doy);
},
_week:{
dow:0,
doy:6
}
},C=function(t,e,n){
return F({
_i:t,
_f:e,
_l:n,
_isUTC:!1
});
},C.utc=function(t,e,n){
return F({
_useUTC:!0,
_isUTC:!0,
_l:n,
_i:t,
_f:e
});
},C.unix=function(t){
return C(1e3*t);
},C.duration=function(t,e){
var n,s=C.isDuration(t),r="number"==typeof t,a=s?t._data:r?{}:t;
return r&&(e?a[e]=t:a.milliseconds=t),n=new o(a),s&&t.hasOwnProperty("_lang")&&(n._lang=t._lang),
n;
},C.version=x,C.defaultFormat=K,C.lang=function(t,e){
return t?(e?_(t,e):A[t]||m(t),void(C.duration.fn._lang=C.fn._lang=m(t))):C.fn._lang._abbr;
},C.langData=function(t){
return t&&t._lang&&t._lang._abbr&&(t=t._lang._abbr),m(t);
},C.isMoment=function(t){
return t instanceof i;
},C.isDuration=function(t){
return t instanceof o;
},C.fn=i.prototype={
clone:function(){
return C(this);
},
valueOf:function(){
return+this._d;
},
unix:function(){
return Math.floor(+this._d/1e3);
},
toString:function(){
return this.format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ");
},
toDate:function(){
return this._d;
},
toJSON:function(){
return C.utc(this).format("YYYY-MM-DD[T]HH:mm:ss.SSS[Z]");
},
toArray:function(){
var t=this;
return[t.year(),t.month(),t.date(),t.hours(),t.minutes(),t.seconds(),t.milliseconds()];
},
isValid:function(){
return null==this._isValid&&(this._isValid=this._a?!l(this._a,(this._isUTC?C.utc(this._a):C(this._a)).toArray()):!isNaN(this._d.getTime())),
!!this._isValid;
},
utc:function(){
return this._isUTC=!0,this;
},
local:function(){
return this._isUTC=!1,this;
},
format:function(t){
var e=Y(this,t||C.defaultFormat);
return this.lang().postformat(e);
},
add:function(t,e){
var n;
return n="string"==typeof t?C.duration(+e,t):C.duration(t,e),h(this,n,1),this;
},
subtract:function(t,e){
var n;
return n="string"==typeof t?C.duration(+e,t):C.duration(t,e),h(this,n,-1),this;
},
diff:function(t,e,n){
var s,r,a=this._isUTC?C(t).utc():C(t).local(),i=6e4*(this.zone()-a.zone());
return e&&(e=e.replace(/s$/,"")),"year"===e||"month"===e?(s=432e5*(this.daysInMonth()+a.daysInMonth()),
r=12*(this.year()-a.year())+(this.month()-a.month()),r+=(this-C(this).startOf("month")-(a-C(a).startOf("month")))/s,
"year"===e&&(r/=12)):(s=this-a-i,r="second"===e?s/1e3:"minute"===e?s/6e4:"hour"===e?s/36e5:"day"===e?s/864e5:"week"===e?s/6048e5:s),
n?r:d(r);
},
from:function(t,e){
return C.duration(this.diff(t)).lang(this.lang()._abbr).humanize(!e);
},
fromNow:function(t){
return this.from(C(),t);
},
calendar:function(){
var t=this.diff(C().startOf("day"),"days",!0),e=-6>t?"sameElse":-1>t?"lastWeek":0>t?"lastDay":1>t?"sameDay":2>t?"nextDay":7>t?"nextWeek":"sameElse";
return this.format(this.lang().calendar(e,this));
},
isLeapYear:function(){
var t=this.year();
return t%4===0&&t%100!==0||t%400===0;
},
isDST:function(){
return this.zone()<C([this.year()]).zone()||this.zone()<C([this.year(),5]).zone();
},
day:function(t){
var e=this._isUTC?this._d.getUTCDay():this._d.getDay();
return null==t?e:this.add({
d:t-e
});
},
startOf:function(t){
switch(t=t.replace(/s$/,"")){
case"year":
this.month(0);

case"month":
this.date(1);

case"week":
case"day":
this.hours(0);

case"hour":
this.minutes(0);

case"minute":
this.seconds(0);

case"second":
this.milliseconds(0);
}
return"week"===t&&this.day(0),this;
},
endOf:function(t){
return this.startOf(t).add(t.replace(/s?$/,"s"),1).subtract("ms",1);
},
isAfter:function(t,e){
return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)>+C(t).startOf(e);
},
isBefore:function(t,e){
return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)<+C(t).startOf(e);
},
isSame:function(t,e){
return e="undefined"!=typeof e?e:"millisecond",+this.clone().startOf(e)===+C(t).startOf(e);
},
zone:function(){
return this._isUTC?0:this._d.getTimezoneOffset();
},
daysInMonth:function(){
return C.utc([this.year(),this.month()+1,0]).date();
},
dayOfYear:function(t){
var e=U((C(this).startOf("day")-C(this).startOf("year"))/864e5)+1;
return null==t?e:this.add("d",t-e);
},
isoWeek:function(t){
var e=b(this,1,4);
return null==t?e:this.add("d",7*(t-e));
},
week:function(t){
var e=this.lang().week(this);
return null==t?e:this.add("d",7*(t-e));
},
lang:function(t){
return void 0===t?this._lang:(this._lang=m(t),this);
}
},W=0;W<ee.length;W++)H(ee[W].toLowerCase().replace(/s$/,""),ee[W]);
H("year","FullYear"),C.fn.days=C.fn.day,C.fn.weeks=C.fn.week,C.fn.isoWeeks=C.fn.isoWeek,
C.duration.fn=o.prototype={
weeks:function(){
return d(this.days()/7);
},
valueOf:function(){
return this._milliseconds+864e5*this._days+2592e6*this._months;
},
humanize:function(t){
var e=+this,n=L(e,!t,this.lang());
return t&&(n=this.lang().pastFuture(e,n)),this.lang().postformat(n);
},
lang:C.fn.lang
};
for(W in ne)ne.hasOwnProperty(W)&&(z(W,ne[W]),O(W.toLowerCase()));
return z("Weeks",6048e5),C.lang("zh-cn",{
months:"一月_二月_三月_四月_五月_六月_七月_八月_九月_十月_十一月_十二月".split("_"),
monthsShort:"1月_2月_3月_4月_5月_6月_7月_8月_9月_10月_11月_12月".split("_"),
weekdays:"星期日_星期一_星期二_星期三_星期四_星期五_星期六".split("_"),
weekdaysShort:"周日_周一_周二_周三_周四_周五_周六".split("_"),
weekdaysMin:"日_一_二_三_四_五_六".split("_"),
longDateFormat:{
LT:"Ah点mm",
L:"YYYY年MMMD日",
LL:"YYYY年MMMD日",
LLL:"YYYY年MMMD日LT",
LLLL:"YYYY年MMMD日ddddLT",
l:"YYYY年MMMD日",
ll:"YYYY年MMMD日",
lll:"YYYY年MMMD日LT",
llll:"YYYY年MMMD日ddddLT"
},
meridiem:function(t,e){
return 9>t?"早上":11>t&&30>e?"上午":13>t&&30>e?"中午":18>t?"下午":"晚上";
},
calendar:{
sameDay:"[今天]LT",
nextDay:"[明天]LT",
nextWeek:"[下]ddddLT",
lastDay:"[昨天]LT",
lastWeek:"[上]ddddLT",
sameElse:"L"
},
ordinal:function(t,e){
switch(e){
case"d":
case"D":
case"DDD":
return t+"日";

case"M":
return t+"月";

case"w":
case"W":
return t+"周";

default:
return t;
}
},
relativeTime:{
future:"%s内",
past:"%s前",
s:"几秒",
m:"1分钟",
mm:"%d分钟",
h:"1小时",
hh:"%d小时",
d:"1天",
dd:"%d天",
M:"1个月",
MM:"%d个月",
y:"1年",
yy:"%d年"
}
}),C;
});define("biz_common/jquery.validate.js",[],function(){
!function(t){
t.extend(t.fn,{
validate:function(e){
if(!this.length)return void(e&&e.debug&&window.console&&console.warn("Nothing selected, can't validate, returning nothing."));
var i=t.data(this[0],"validator");
return i?i:(this.attr("novalidate","novalidate"),i=new t.validator(e,this[0]),t.data(this[0],"validator",i),
i.settings.onsubmit&&(this.validateDelegate(":submit","click",function(e){
i.settings.submitHandler&&(i.submitButton=e.target),t(e.target).hasClass("cancel")&&(i.cancelSubmit=!0),
void 0!==t(e.target).attr("formnovalidate")&&(i.cancelSubmit=!0);
}),this.submit(function(e){
function r(){
var r;
return i.settings.submitHandler?(i.submitButton&&(r=t("<input type='hidden'/>").attr("name",i.submitButton.name).val(t(i.submitButton).val()).appendTo(i.currentForm)),
i.settings.submitHandler.call(i,i.currentForm,e),i.submitButton&&r.remove(),!1):!0;
}
return i.settings.debug&&e.preventDefault(),i.cancelSubmit?(i.cancelSubmit=!1,r()):i.form()?i.pendingRequest?(i.formSubmitted=!0,
!1):r():(i.focusInvalid(),!1);
})),i);
},
valid:function(){
if(t(this[0]).is("form"))return this.validate().form();
var e=!0,i=t(this[0].form).validate();
return this.each(function(){
e=e&&i.element(this);
}),e;
},
removeAttrs:function(e){
var i={},r=this;
return t.each(e.split(/\s/),function(t,e){
i[e]=r.attr(e),r.removeAttr(e);
}),i;
},
rules:function(e,i){
var r=this[0];
if(e){
var n=t.data(r.form,"validator").settings,s=n.rules,a=t.validator.staticRules(r);
switch(e){
case"add":
t.extend(a,t.validator.normalizeRule(i)),delete a.messages,s[r.name]=a,i.messages&&(n.messages[r.name]=t.extend(n.messages[r.name],i.messages));
break;

case"remove":
if(!i)return delete s[r.name],a;
var o={};
return t.each(i.split(/\s/),function(t,e){
o[e]=a[e],delete a[e];
}),o;
}
}
var u=t.validator.normalizeRules(t.extend({},t.validator.classRules(r),t.validator.attributeRules(r),t.validator.dataRules(r),t.validator.staticRules(r)),r);
if(u.required){
var l=u.required;
delete u.required,u=t.extend({
required:l
},u);
}
return u;
}
}),t.extend(t.expr[":"],{
blank:function(e){
return!t.trim(""+t(e).val());
},
filled:function(e){
return!!t.trim(""+t(e).val());
},
unchecked:function(e){
return!t(e).prop("checked");
}
}),t.validator=function(e,i){
this.settings=t.extend(!0,{},t.validator.defaults,e),this.currentForm=i,this.init();
},t.validator.format=function(e,i){
return 1===arguments.length?function(){
var i=t.makeArray(arguments);
return i.unshift(e),t.validator.format.apply(this,i);
}:(arguments.length>2&&i.constructor!==Array&&(i=t.makeArray(arguments).slice(1)),
i.constructor!==Array&&(i=[i]),t.each(i,function(t,i){
e=e.replace(new RegExp("\\{"+t+"\\}","g"),function(){
return i;
});
}),e);
},t.extend(t.validator,{
defaults:{
messages:{},
groups:{},
rules:{},
errorClass:"error",
validClass:"valid",
errorElement:"label",
focusInvalid:!0,
errorContainer:t([]),
errorLabelContainer:t([]),
onsubmit:!0,
ignore:":hidden",
ignoreTitle:!1,
onfocusin:function(t){
this.lastActive=t,this.settings.focusCleanup&&!this.blockFocusCleanup&&(this.settings.unhighlight&&this.settings.unhighlight.call(this,t,this.settings.errorClass,this.settings.validClass),
this.addWrapper(this.errorsFor(t)).hide());
},
onfocusout:function(t){
this.checkable(t)||this.element(t);
},
onkeyup:function(t,e){
(9!==e.which||""!==this.elementValue(t))&&(t.name in this.submitted||t===this.lastElement)&&this.element(t);
},
onclick:function(t){
t.name in this.submitted?this.element(t):t.parentNode.name in this.submitted&&this.element(t.parentNode);
},
highlight:function(e,i,r){
"radio"===e.type?this.findByName(e.name).addClass(i).removeClass(r):t(e).addClass(i).removeClass(r);
},
unhighlight:function(e,i,r){
"radio"===e.type?this.findByName(e.name).removeClass(i).addClass(r):t(e).removeClass(i).addClass(r);
}
},
setDefaults:function(e){
t.extend(t.validator.defaults,e);
},
messages:{
required:"This field is required.",
remote:"Please fix this field.",
email:"Please enter a valid email address.",
url:"Please enter a valid URL.",
date:"Please enter a valid date.",
dateISO:"Please enter a valid date (ISO).",
number:"Please enter a valid number.",
digits:"Please enter only digits.",
creditcard:"Please enter a valid credit card number.",
equalTo:"Please enter the same value again.",
maxlength:t.validator.format("Please enter no more than {0} characters."),
minlength:t.validator.format("Please enter at least {0} characters."),
rangelength:t.validator.format("Please enter a value between {0} and {1} characters long."),
range:t.validator.format("Please enter a value between {0} and {1}."),
max:t.validator.format("Please enter a value less than or equal to {0}."),
min:t.validator.format("Please enter a value greater than or equal to {0}.")
},
autoCreateRanges:!1,
prototype:{
init:function(){
function e(e){
var i=t.data(this[0].form,"validator"),r="on"+e.type.replace(/^validate/,"");
i.settings[r]&&i.settings[r].call(i,this[0],e);
}
this.labelContainer=t(this.settings.errorLabelContainer),this.errorContext=this.labelContainer.length&&this.labelContainer||t(this.currentForm),
this.containers=t(this.settings.errorContainer).add(this.settings.errorLabelContainer),
this.submitted={},this.valueCache={},this.pendingRequest=0,this.pending={},this.invalid={},
this.reset();
var i=this.groups={};
t.each(this.settings.groups,function(e,r){
"string"==typeof r&&(r=r.split(/\s/)),t.each(r,function(t,r){
i[r]=e;
});
});
var r=this.settings.rules;
t.each(r,function(e,i){
r[e]=t.validator.normalizeRule(i);
}),t(this.currentForm).validateDelegate(":text, [type='password'], [type='file'], select, textarea, [type='number'], [type='search'] ,[type='tel'], [type='url'], [type='email'], [type='datetime'], [type='date'], [type='month'], [type='week'], [type='time'], [type='datetime-local'], [type='range'], [type='color'] ","focusin focusout keyup",e).validateDelegate("[type='radio'], [type='checkbox'], select, option","click",e),
this.settings.invalidHandler&&t(this.currentForm).bind("invalid-form.validate",this.settings.invalidHandler);
},
form:function(){
return this.checkForm(),t.extend(this.submitted,this.errorMap),this.invalid=t.extend({},this.errorMap),
this.valid()||t(this.currentForm).triggerHandler("invalid-form",[this]),this.showErrors(),
this.valid();
},
checkForm:function(){
this.prepareForm();
for(var t=0,e=this.currentElements=this.elements();e[t];t++)this.check(e[t]);
return this.valid();
},
element:function(e){
e=this.validationTargetFor(this.clean(e)),this.lastElement=e,this.prepareElement(e),
this.currentElements=t(e);
var i=this.check(e)!==!1;
return i?delete this.invalid[e.name]:this.invalid[e.name]=!0,this.numberOfInvalids()||(this.toHide=this.toHide.add(this.containers)),
this.showErrors(),i;
},
showErrors:function(e){
if(e){
t.extend(this.errorMap,e),this.errorList=[];
for(var i in e)this.errorList.push({
message:e[i],
element:this.findByName(i)[0]
});
this.successList=t.grep(this.successList,function(t){
return!(t.name in e);
});
}
this.settings.showErrors?this.settings.showErrors.call(this,this.errorMap,this.errorList):this.defaultShowErrors();
},
resetForm:function(){
t.fn.resetForm&&t(this.currentForm).resetForm(),this.submitted={},this.lastElement=null,
this.prepareForm(),this.hideErrors(),this.elements().removeClass(this.settings.errorClass).removeData("previousValue");
},
numberOfInvalids:function(){
return this.objectLength(this.invalid);
},
objectLength:function(t){
var e=0;
for(var i in t)e++;
return e;
},
hideErrors:function(){
this.addWrapper(this.toHide).hide();
},
valid:function(){
return 0===this.size();
},
size:function(){
return this.errorList.length;
},
focusInvalid:function(){
if(this.settings.focusInvalid)try{
t(this.findLastActive()||this.errorList.length&&this.errorList[0].element||[]).filter(":visible").focus().trigger("focusin");
}catch(e){}
},
findLastActive:function(){
var e=this.lastActive;
return e&&1===t.grep(this.errorList,function(t){
return t.element.name===e.name;
}).length&&e;
},
elements:function(){
var e=this,i={};
return t(this.currentForm).find("input, select, textarea").not(":submit, :reset, :image, [disabled]").not(this.settings.ignore).filter(function(){
return!this.name&&e.settings.debug&&window.console&&console.error("%o has no name assigned",this),
this.name in i||!e.objectLength(t(this).rules())?!1:(i[this.name]=!0,!0);
});
},
clean:function(e){
return t(e)[0];
},
errors:function(){
var e=this.settings.errorClass.replace(" ",".");
return t(this.settings.errorElement+"."+e,this.errorContext);
},
reset:function(){
this.successList=[],this.errorList=[],this.errorMap={},this.toShow=t([]),this.toHide=t([]),
this.currentElements=t([]);
},
prepareForm:function(){
this.reset(),this.toHide=this.errors().add(this.containers);
},
prepareElement:function(t){
this.reset(),this.toHide=this.errorsFor(t);
},
elementValue:function(e){
var i=t(e).attr("type"),r=t(e).val();
return"radio"===i||"checkbox"===i?t("input[name='"+t(e).attr("name")+"']:checked").val():"string"==typeof r?r.replace(/\r/g,""):r;
},
check:function(e){
e=this.validationTargetFor(this.clean(e));
var i,r=t(e).rules(),n=!1,s=this.elementValue(e);
for(var a in r){
var o={
method:a,
parameters:r[a]
};
try{
if(i=t.validator.methods[a].call(this,s,e,o.parameters),"dependency-mismatch"===i){
n=!0;
continue;
}
if(n=!1,"pending"===i)return void(this.toHide=this.toHide.not(this.errorsFor(e)));
if(!i)return this.formatAndAdd(e,o),!1;
}catch(u){
throw this.settings.debug&&window.console&&console.log("Exception occurred when checking element "+e.id+", check the '"+o.method+"' method.",u),
u;
}
}
return n?void 0:(this.objectLength(r)&&this.successList.push(e),!0);
},
customDataMessage:function(e,i){
return t(e).data("msg-"+i.toLowerCase())||e.attributes&&t(e).attr("data-msg-"+i.toLowerCase());
},
customMessage:function(t,e){
var i=this.settings.messages[t];
return i&&(i.constructor===String?i:i[e]);
},
findDefined:function(){
for(var t=0;t<arguments.length;t++)if(void 0!==arguments[t])return arguments[t];
return void 0;
},
defaultMessage:function(e,i){
return this.findDefined(this.customMessage(e.name,i),this.customDataMessage(e,i),!this.settings.ignoreTitle&&e.title||void 0,t.validator.messages[i],"<strong>Warning: No message defined for "+e.name+"</strong>");
},
formatAndAdd:function(e,i){
var r=this.defaultMessage(e,i.method),n=/\$?\{(\d+)\}/g;
"function"==typeof r?r=r.call(this,i.parameters,e):n.test(r)&&(r=t.validator.format(r.replace(n,"{$1}"),i.parameters)),
this.errorList.push({
message:r,
element:e
}),this.errorMap[e.name]=r,this.submitted[e.name]=r;
},
addWrapper:function(t){
return this.settings.wrapper&&(t=t.add(t.parent(this.settings.wrapper))),t;
},
defaultShowErrors:function(){
var t,e;
for(t=0;this.errorList[t];t++){
var i=this.errorList[t];
this.settings.highlight&&this.settings.highlight.call(this,i.element,this.settings.errorClass,this.settings.validClass),
this.showLabel(i.element,i.message);
}
if(this.errorList.length&&(this.toShow=this.toShow.add(this.containers)),this.settings.success)for(t=0;this.successList[t];t++)this.showLabel(this.successList[t]);
if(this.settings.unhighlight)for(t=0,e=this.validElements();e[t];t++)this.settings.unhighlight.call(this,e[t],this.settings.errorClass,this.settings.validClass);
this.toHide=this.toHide.not(this.toShow),this.hideErrors(),this.addWrapper(this.toShow).show();
},
validElements:function(){
return this.currentElements.not(this.invalidElements());
},
invalidElements:function(){
return t(this.errorList).map(function(){
return this.element;
});
},
showLabel:function(e,i){
var r=this.errorsFor(e);
r.length?(r.removeClass(this.settings.validClass).addClass(this.settings.errorClass),
r.html(i)):(r=t("<"+this.settings.errorElement+">").attr("for",this.idOrName(e)).addClass(this.settings.errorClass).html(i||""),
this.settings.wrapper&&(r=r.hide().show().wrap("<"+this.settings.wrapper+" class='frm_msg fail'/>").parent()),
this.labelContainer.append(r).length||(this.settings.errorPlacement?this.settings.errorPlacement(r,t(e)):r.insertAfter(e))),
!i&&this.settings.success&&(r.text(""),"string"==typeof this.settings.success?r.addClass(this.settings.success):this.settings.success(r,e)),
this.toShow=this.toShow.add(r);
},
errorsFor:function(e){
var i=this.idOrName(e);
return this.errors().filter(function(){
return t(this).attr("for")===i;
});
},
idOrName:function(t){
return this.groups[t.name]||(this.checkable(t)?t.name:t.id||t.name);
},
validationTargetFor:function(t){
return this.checkable(t)&&(t=this.findByName(t.name).not(this.settings.ignore)[0]),
t;
},
checkable:function(t){
return/radio|checkbox/i.test(t.type);
},
findByName:function(e){
return t(this.currentForm).find("[name='"+e+"']");
},
getLength:function(e,i){
switch(i.nodeName.toLowerCase()){
case"select":
return t("option:selected",i).length;

case"input":
if(this.checkable(i))return this.findByName(i.name).filter(":checked").length;
}
return e.length;
},
depend:function(t,e){
return this.dependTypes[typeof t]?this.dependTypes[typeof t](t,e):!0;
},
dependTypes:{
"boolean":function(t){
return t;
},
string:function(e,i){
return!!t(e,i.form).length;
},
"function":function(t,e){
return t(e);
}
},
optional:function(e){
var i=this.elementValue(e);
return!t.validator.methods.required.call(this,i,e)&&"dependency-mismatch";
},
startRequest:function(t){
this.pending[t.name]||(this.pendingRequest++,this.pending[t.name]=!0);
},
stopRequest:function(e,i){
this.pendingRequest--,this.pendingRequest<0&&(this.pendingRequest=0),delete this.pending[e.name],
i&&0===this.pendingRequest&&this.formSubmitted&&this.form()?(t(this.currentForm).submit(),
this.formSubmitted=!1):!i&&0===this.pendingRequest&&this.formSubmitted&&(t(this.currentForm).triggerHandler("invalid-form",[this]),
this.formSubmitted=!1);
},
previousValue:function(e){
return t.data(e,"previousValue")||t.data(e,"previousValue",{
old:null,
valid:!0,
message:this.defaultMessage(e,"remote")
});
}
},
classRuleSettings:{
required:{
required:!0
},
email:{
email:!0
},
url:{
url:!0
},
date:{
date:!0
},
dateISO:{
dateISO:!0
},
number:{
number:!0
},
digits:{
digits:!0
},
creditcard:{
creditcard:!0
}
},
addClassRules:function(e,i){
e.constructor===String?this.classRuleSettings[e]=i:t.extend(this.classRuleSettings,e);
},
classRules:function(e){
var i={},r=t(e).attr("class");
return r&&t.each(r.split(" "),function(){
this in t.validator.classRuleSettings&&t.extend(i,t.validator.classRuleSettings[this]);
}),i;
},
attributeRules:function(e){
var i={},r=t(e),n=r[0].getAttribute("type");
for(var s in t.validator.methods){
var a;
"required"===s?(a=r.get(0).getAttribute(s),""===a&&(a=!0),a=!!a):a=r.attr(s),/min|max/.test(s)&&(null===n||/number|range|text/.test(n))&&(a=Number(a)),
a?i[s]=a:n===s&&"range"!==n&&(i[s]=!0);
}
return i.maxlength&&/-1|2147483647|524288/.test(i.maxlength)&&delete i.maxlength,
i;
},
dataRules:function(e){
var i,r,n={},s=t(e);
for(i in t.validator.methods)r=s.data("rule-"+i.toLowerCase()),void 0!==r&&(n[i]=r);
return n;
},
staticRules:function(e){
var i={},r=t.data(e.form,"validator");
return r.settings.rules&&(i=t.validator.normalizeRule(r.settings.rules[e.name])||{}),
i;
},
normalizeRules:function(e,i){
return t.each(e,function(r,n){
if(n===!1)return void delete e[r];
if(n.param||n.depends){
var s=!0;
switch(typeof n.depends){
case"string":
s=!!t(n.depends,i.form).length;
break;

case"function":
s=n.depends.call(i,i);
}
s?"string"!=typeof n&&(e[r]=void 0!==n.param?n.param:!0):delete e[r];
}
}),t.each(e,function(r,n){
e[r]=t.isFunction(n)?n(i):n;
}),t.each(["minlength","maxlength"],function(){
e[this]&&(e[this]=Number(e[this]));
}),t.each(["rangelength","range"],function(){
var i;
e[this]&&(t.isArray(e[this])?e[this]=[Number(e[this][0]),Number(e[this][1])]:"string"==typeof e[this]&&(i=e[this].split(/[\s,]+/),
e[this]=[Number(i[0]),Number(i[1])]));
}),t.validator.autoCreateRanges&&(e.min&&e.max&&(e.range=[e.min,e.max],delete e.min,
delete e.max),e.minlength&&e.maxlength&&(e.rangelength=[e.minlength,e.maxlength],
delete e.minlength,delete e.maxlength)),e;
},
normalizeRule:function(e){
if("string"==typeof e){
var i={};
t.each(e.split(/\s/),function(){
i[this]=!0;
}),e=i;
}
return e;
},
addMethod:function(e,i,r){
t.validator.methods[e]=i,t.validator.messages[e]=void 0!==r?r:t.validator.messages[e],
i.length<3&&t.validator.addClassRules(e,t.validator.normalizeRule(e));
},
methods:{
required:function(e,i,r){
if(!this.depend(r,i))return"dependency-mismatch";
if("select"===i.nodeName.toLowerCase()){
var n=t(i).val();
return n&&n.length>0;
}
return this.checkable(i)?this.getLength(e,i)>0:t.trim(e).length>0;
},
email:function(t,e){
return this.optional(e)||/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))$/i.test(t);
},
url:function(t,e){
return this.optional(e)||/^(https?|s?ftp|weixin):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(t);
},
date:function(t,e){
return this.optional(e)||!/Invalid|NaN/.test(new Date(t).toString());
},
dateISO:function(t,e){
return this.optional(e)||/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}$/.test(t);
},
number:function(t,e){
return this.optional(e)||/^-?(?:\d+|\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(t);
},
digits:function(t,e){
return this.optional(e)||/^\d+$/.test(t);
},
creditcard:function(t,e){
if(this.optional(e))return"dependency-mismatch";
if(/[^0-9 \-]+/.test(t))return!1;
var i=0,r=0,n=!1;
t=t.replace(/\D/g,"");
for(var s=t.length-1;s>=0;s--){
var a=t.charAt(s);
r=parseInt(a,10),n&&(r*=2)>9&&(r-=9),i+=r,n=!n;
}
return i%10===0;
},
minlength:function(e,i,r){
var n=t.isArray(e)?e.length:this.getLength(t.trim(e),i);
return this.optional(i)||n>=r;
},
maxlength:function(e,i,r){
var n=t.isArray(e)?e.length:this.getLength(t.trim(e),i);
return this.optional(i)||r>=n;
},
rangelength:function(e,i,r){
var n=t.isArray(e)?e.length:this.getLength(t.trim(e),i);
return this.optional(i)||n>=r[0]&&n<=r[1];
},
min:function(t,e,i){
return this.optional(e)||t>=i;
},
max:function(t,e,i){
return this.optional(e)||i>=t;
},
range:function(t,e,i){
return this.optional(e)||t>=i[0]&&t<=i[1];
},
equalTo:function(e,i,r){
var n=t(r);
return this.settings.onfocusout&&n.unbind(".validate-equalTo").bind("blur.validate-equalTo",function(){
t(i).valid();
}),e===n.val();
},
remote:function(e,i,r){
if(this.optional(i))return"dependency-mismatch";
var n=this.previousValue(i);
if(this.settings.messages[i.name]||(this.settings.messages[i.name]={}),n.originalMessage=this.settings.messages[i.name].remote,
this.settings.messages[i.name].remote=n.message,r="string"==typeof r&&{
url:r
}||r,n.old===e)return n.valid;
n.old=e;
var s=this;
this.startRequest(i);
var a={};
return a[i.name]=e,t.ajax(t.extend(!0,{
url:r,
mode:"abort",
port:"validate"+i.name,
dataType:"json",
data:a,
success:function(r){
s.settings.messages[i.name].remote=n.originalMessage;
var a=r===!0||"true"===r;
if(a){
var o=s.formSubmitted;
s.prepareElement(i),s.formSubmitted=o,s.successList.push(i),delete s.invalid[i.name],
s.showErrors();
}else{
var u={},l=r||s.defaultMessage(i,"remote");
u[i.name]=n.message=t.isFunction(l)?l(e):l,s.invalid[i.name]=!0,s.showErrors(u);
}
n.valid=a,s.stopRequest(i,a);
}
},r)),"pending";
}
}
}),t.format=t.validator.format;
}(jQuery),function(t){
var e={};
if(t.ajaxPrefilter)t.ajaxPrefilter(function(t,i,r){
var n=t.port;
"abort"===t.mode&&(e[n]&&e[n].abort(),e[n]=r);
});else{
var i=t.ajax;
t.ajax=function(r){
var n=("mode"in r?r:t.ajaxSettings).mode,s=("port"in r?r:t.ajaxSettings).port;
return"abort"===n?(e[s]&&e[s].abort(),e[s]=i.apply(this,arguments),e[s]):i.apply(this,arguments);
};
}
}(jQuery),function(t){
t.extend(t.fn,{
validateDelegate:function(e,i,r){
return this.bind(i,function(i){
var n=t(i.target);
return n.is(e)?r.apply(n,arguments):void 0;
});
}
});
}(jQuery),function(t){
t.validator.defaults.errorClass="frm_msg_content",t.validator.defaults.errorElement="span",
t.validator.defaults.errorPlacement=function(t,e){
e.parent().after(t);
},t.validator.defaults.wrapper="p",t.validator.messages={
required:"必选字段",
remote:"请修正该字段",
email:"请输入正确格式的电子邮件",
url:"请输入合法的网址",
date:"请输入合法的日期",
dateISO:"请输入合法的日期 (ISO).",
number:"请输入合法的数字",
digits:"只能输入整数",
creditcard:"请输入合法的信用卡号",
equalTo:"请再次输入相同的值",
accept:"请输入拥有合法后缀名的字符串",
maxlength:t.validator.format("请输入一个长度最多是 {0} 的字符串"),
minlength:t.validator.format("请输入一个长度最少是 {0} 的字符串"),
rangelength:t.validator.format("请输入一个长度介于 {0} 和 {1} 之间的字符串"),
range:t.validator.format("请输入一个介于 {0} 和 {1} 之间的值"),
max:t.validator.format("请输入一个最大为 {0} 的值"),
min:t.validator.format("请输入一个最小为 {0} 的值")
},function(){
function e(t){
var e,i=0;
"x"==t[17].toLowerCase()&&(t[17]=10);
for(var r=0;17>r;r++)i+=n[r]*t[r];
return e=i%11,t[17]==s[e]?!0:!1;
}
function i(t){
var e=t.substring(6,10),i=t.substring(10,12),r=t.substring(12,14),n=new Date(e,parseFloat(i)-1,parseFloat(r));
return(new Date).getFullYear()-parseInt(e)<18?!1:n.getFullYear()!=parseFloat(e)||n.getMonth()!=parseFloat(i)-1||n.getDate()!=parseFloat(r)?!1:!0;
}
function r(r){
if(r=t.trim(r.replace(/ /g,"")),15==r.length)return!1;
if(18==r.length){
var n=r.split("");
return i(r)&&e(n)?!0:!1;
}
return!1;
}
var n=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],s=[1,0,10,9,8,7,6,5,4,3,2];
t.validator.addMethod("idcard",function(t){
return r(t);
},"身份证格式不正确，或者年龄未满18周岁，请重新填写"),t.validator.addMethod("mobile",function(e){
return e=t.trim(e),/^1\d{10}$/.test(e);
},"请输入正确的手机号码"),t.validator.addMethod("telephone",function(e){
return e=t.trim(e),/^\d{1,4}(-\d{1,12})+$/.test(e);
},"请输入正确的座机号码，如020-12345678"),t.validator.addMethod("verifycode",function(e){
return e=t.trim(e),/^\d{6}$/.test(e);
},"验证码应为6位数字"),t.validator.addMethod("byteRangeLength",function(t,e,i){
return this.optional(e)||t.len()<=i[1]&&t.len()>=i[0];
},"_(必须为{0}到{1}个字节之间)");
}();
}(jQuery);
var t={
optional:function(){
return!1;
},
getLength:function(t){
return t?t.length:0;
}
},e=$.validator;
return e.rules={},$.each(e.methods,function(i,r){
e.rules[i]=function(e,i){
return r.call(t,e,null,i);
};
}),e;
});define("common/wx/tooltips.js",["tpl/tooltips.html.js"],function(o,t,n){
"use strict";
var i={
position:{},
container:"",
type:"hover",
buttons:[],
delay:300,
disabled:!1,
reposition:!1,
container_close:!1,
parentClass:"",
container_mode:"absolute"
},s=wx.T,e=o("tpl/tooltips.html.js"),p="btn_disabled",c="hover",h="show",a=function(o){
if(this.options=o=$.extend(!0,{},i,o),this.$container=$(this.options.container),
this.$container&&0!=this.$container.length){
var t=this.$container.offset(),n=this.$container.height(),a=this.options.position.left||this.$container.data("x")||0,l=n+(this.options.position.top||this.$container.data("y")||0);
this.options.offset={
left:t.left+a,
top:t.top+l,
left_x:a,
top_y:l
},!o.content&&(o.content=this.$container.data("tips")||""),this.$dom=$(s(e,o)).appendTo("body"),
this.options.disabled&&this.$container.addClass(p);
var d=this,f=this.options.type===c||"click"===this.options.type?this.options.type:c;
if(f==c){
var r=null;
this.$container.hover(function(){
d.options.onshow&&"function"==typeof d.options.onshow?d.options.onshow.apply(d):!d.options.disabled&&d.show();
},function(){
r=window.setTimeout(function(){
d.hide();
},d.options.delay);
}),this.$dom.hover(function(){
r&&window.clearTimeout(r);
},function(){
d.hide();
});
}else this.$container.click(function(){
return d.options.disabled||d.options.onbeforeclick&&"function"==typeof d.options.onbeforeclick&&d.options.onbeforeclick.apply(d)===!1?void 0:(d.$dom.data(h)?d.options.onclose&&"function"==typeof d.options.onclose?d.options.onclose.apply(d):d.hide():d.options.onshow&&"function"==typeof d.options.onshow?d.options.onshow.apply(d):d.show(),
!1);
});
$(document).on("click",function(o){
d.$dom.find(o.target).length||(d.options.onclose&&"function"==typeof d.options.onclose?d.options.onclose.apply(d,[o]):d.hide());
}),d.$dom.find(".js_popover_close").on("click",function(o){
return d.options.onclose&&"function"==typeof d.options.onclose?d.options.onclose.apply(d,[o]):d.hide(),
!1;
}),this.$dom.hide(),function(){
$.each(d.$dom.find(".js_btn"),function(o,t){
d.options.buttons[o].click&&$(t).on("click",function(){
d.options.buttons[o].click.apply(d);
});
});
}();
}
};
a.prototype={
constructor:a,
show:function(){
if(this.options.reposition){
var o=this.$container.offset(),t=o.left+this.options.offset.left_x,n=o.top+this.options.offset.top_y;
this.$dom.css({
left:t,
top:n
}).show();
}else this.$dom.show();
this.$dom.data(h,!0);
},
hide:function(){
this.$dom.hide(),this.$dom.data(h,!1);
},
enable:function(){
return this.options.disabled=!1,this.$container.removeClass(p),this;
},
disable:function(){
return this.options.disabled=!0,this.$container.addClass(p),this;
}
},n.exports=a;
});define("biz_web/ui/dropdown.js", [ "biz_web/widget/dropdown.css", "tpl/biz_web/ui/dropdown.html.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict", e("biz_web/widget/dropdown.css");
var i = e("tpl/biz_web/ui/dropdown.html.js"), s = {
label: "请选择",
data: [],
callback: $.noop,
render: $.noop,
delay: 500,
disabled: !1,
search: !1
}, o = "dropdown_menu";
function u(e) {
e.render && typeof e.render && (e.renderHtml = "", $.each(e.data, function(t, n) {
e.renderHtml += e.render(n);
})), e = $.extend(!0, {}, s, e);
var t = this;
t.container = $(e.container), t.container.addClass(e.search ? o + " search" : o), this.isDisabled = e.disabled, e.disabled && t.container.addClass("disabled"), t.opt = e, t.container.html(template.compile(i)(e)).find(".jsDropdownList").hide(), t.bt = t.container.find(".jsDropdownBt"), t.dropdown = t.container.find(".jsDropdownList"), $.each(e.data, function(e, n) {
$.data(t.dropdown.find(".jsDropdownItem")[e], "value", n.value), $.data(t.dropdown.find(".jsDropdownItem")[e], "name", n.name), $.data(t.dropdown.find(".jsDropdownItem")[e], "item", n);
}), typeof e.index != "undefined" && e.data.length !== 0 && (t.bt.find(".jsBtLabel").html(e.data[e.index].name || e.label), t.value = e.data[e.index].value), t.bt.on("click", function() {
return a(), e.disabled || (t.dropdown.show(), t.container.addClass("open")), !1;
}), e.search && t.bt.find(".jsBtLabel").on("keyup", function(e) {
if (t.disabled) return;
var n = $(this);
if (e.keyCode == 13) t.value ? (n.html(n.data("name")).removeClass("error"), t.dropdown.hide()) : n.find("div").remove(); else {
var r = n.html().trim(), i = [];
t.value = null, t.dropdown.show().find(".jsDropdownItem").each(function() {
var e = $(this);
e.hasClass("js_empty") || (e.data("name").indexOf(r) > -1 ? (e.parent().show(), i.push({
name: e.data("name"),
value: e.data("value")
})) : e.parent().hide());
}), i.length == 0 ? t.dropdown.find(".js_empty").length == 0 && t.dropdown.append('<li class="jsDropdownItem js_empty empty">未找到"' + r + '"</li>') : (t.dropdown.find(".js_empty").remove(), i.length == 1 && (i[0].name == r ? n.removeClass("error") : n.data("name", i[0].name), t.value = i[0].value));
}
}).on("blur", function() {
if (t.disabled) return;
var n = $(this);
t.value ? $(this).html() != $(this).data("name") && (n.addClass("error"), t.value = null) : n.html() != "" ? n.addClass("error") : (n.html(e.label).removeClass("error"), t.value = null);
}).on("focus", function() {
if (t.disabled) return;
var n = $(this), r = $(this).html().trim();
r == e.label && n.html("").removeClass("error"), r == "" && n.removeClass("error"), t.dropdown.show(), t.container.addClass("open");
}), $(document).on("click", a), t.dropdown.on("click", ".jsDropdownItem", function(n) {
var r = $(this).data("value"), i = $(this).data("name"), s = $(this).data("index");
if (!t.value || t.value && t.value != r) {
t.value = r, t.name = i;
if (e.callback && typeof e.callback == "function") {
var o = e.callback(r, i, s, $(this).data("item")) || i;
e.search ? t.bt.find(".jsBtLabel").html(o).data("name", o).removeClass("error") : t.bt.find(".jsBtLabel").html(o);
}
}
t.dropdown.hide();
});
}
function a() {
$(".jsDropdownList").hide(), $(".dropdown_menu").each(function() {
!$(this).hasClass("dropdown_checkbox") && $(this).removeClass("open");
});
}
return u.prototype = {
selected: function(e, t) {
var n = this;
if (typeof e == "number") {
if (this.opt.data && this.opt.data[e]) {
var r = this.opt.data[e].name, i = this.opt.data[e].value;
t != 0 && this.dropdown.find(".jsDropdownItem:eq(" + e + ")").trigger("click", i), this.bt.find(".jsBtLabel").html(r);
}
} else $.each(this.opt.data, function(r, s) {
if (e == s.value || e == s.name) return t != 0 && n.dropdown.find(".jsDropdownItem:eq(" + r + ")").trigger("click", i), n.bt.find(".jsBtLabel").html(s.name), !1;
});
return this;
},
reset: function() {
return this.bt.find(".jsBtLabel").html(this.opt.label), this.value = null, this;
},
hidegreater: function(e) {
var t = this;
return typeof e == "number" && t.opt.data && t.opt.data[e] && (t.dropdown.find(".jsDropdownItem").show(), t.dropdown.find(".jsDropdownItem:gt(" + e + ")").hide()), this;
},
destroy: function() {
return this.isDisabled && this.container.removeClass("disabled"), this.container.children().remove(), this.container.off(), this;
},
enable: function() {
return this.opt.disabled = !1, this.container.removeClass("disabled"), this.opt.search && this.bt.find(".jsBtLabel").attr("contenteditable", !0), this;
},
disable: function() {
return this.opt.disabled = !0, this.container.addClass("disabled"), this.opt.search && this.bt.find(".jsBtLabel").attr("contenteditable", !1), this;
}
}, u;
} catch (f) {
wx.jslog({
src: "biz_web/ui/dropdown.js"
}, f);
}
});define("common/wx/Step.js", [ "widget/processor_bar.css", "tpl/step.html.js" ], function(e, t, n) {
try {
var r = +(new Date);
"use strict";
var i = wx.T, s = e("widget/processor_bar.css"), o = e("tpl/step.html.js"), u = {
selected: 1
}, a = function() {
var e = navigator.userAgent.toLowerCase(), t = /(msie) ([\w.]+)/.exec(e) || [], n = t[1] || "";
return n == "msie";
};
function f(e) {
this.opts = $.extend(!0, {}, u, e), this.init();
}
f.prototype.init = function() {
var e = this.opts, t = e.names.length, n = parseInt(e.selected, 10), r = [], s, u;
n = n < 0 ? 0 : n > t ? t : n;
for (s = 0; s < t; s++) u = f.getClass(s + 1, n), r.push({
name: e.names[s],
cls: u
});
this.$dom = $(i(o, {
stepArr: r,
length: t
})).appendTo(e.container), a() && this.$dom.addClass("ie");
}, f.prototype.setStep = f.prototype.go = function(e) {
var t = this.$dom.find("li.step"), n = t.length;
return e = e < 0 ? 0 : e > n ? n : e, t.each(function(t, r) {
var i = f.getClass(t + 1, e);
t + 1 == n ? r.className = "no_extra " + "step grid_item size1of%s %s".sprintf(n, i) : r.className = "step grid_item size1of%s %s".sprintf(n, i);
}), this;
}, f.getClass = function(e, t) {
var n;
return e < t - 1 ? n = "pprev" : e === t - 1 ? n = "prev" : e === t ? n = "current" : e === t + 1 ? n = "next" : e > t + 1 && (n = "nnext"), n;
}, n.exports = f;
} catch (l) {
wx.jslog({
src: "common/wx/Step.js"
}, l);
}
});define("common/wx/inputCounter.js",[],function(t,n,e){
"use strict";
function o(t,n){
this.$input=$(t),this.opts=$.extend(!0,{},i,n),this._init();
}
var i={
minLength:0,
maxLength:20,
showCounter:!0,
useGBKLength:!1,
GBKBased:!1
};
o.prototype._init=function(){
var t=this;
t.$input&&t.$input.length>0?(t.$inputBox=t.$input.parent("textarea"==t.$input.prop("tagName").toLowerCase()?".frm_textarea_box":".frm_input_box"),
t.count=t._getLen(t.getValue()),t.$counter=t.$inputBox.find(".frm_counter"),t.counterExist=!0,
0==t.$counter.length&&(t.counterExist=!1,t.$counter=$('<em class="frm_input_append frm_counter"></em>'),
t.$inputBox.append(t.$counter)),1==t.opts.showCounter?t.show():t.hide(),t.setCount(t.count),
t.inputEvent=function(){
t.setCount(t._getLen(t.getValue()));
},t.$input.on("keydown keyup",t.inputEvent)):console.log("inputCounter Err: input does not exist.");
},o.prototype.getValue=function(){
var t="";
switch(this.$input.prop("tagName")){
case"INPUT":
case"TEXTAREA":
t=this.$input.val();
break;

default:
t=this.$input.text();
}
return t;
},o.prototype._getLen=function(t){
var n=0;
return t=t||"",n=this.opts.useGBKLength?t.replace(/[^\x00-\xff]/g,"**").length:t.length,
this.opts.GBKBased&&(n=Math.ceil(n/2)),n;
},o.prototype.getCount=function(){
return this.count||0;
},o.prototype.setCount=function(t){
this.count=t,this.$counter.html(this.count+"&#47;"+this.opts.maxLength),this.count>this.opts.maxLength?(this.overflowed=!0,
this.$inputBox.addClass("warn")):this.count>0&&this.count<this.opts.minLength?(this.overflowed=!0,
this.$inputBox.addClass("warn")):(this.overflowed=!1,this.$inputBox.removeClass("warn"));
},o.prototype.hasOverflowed=function(){
return this.overflowed;
},o.prototype.show=function(){
this.$inputBox.addClass("with_counter counter_in append count"),this.$counter.show();
},o.prototype.hide=function(){
this.$inputBox.removeClass("with_counter counter_in append count warn"),this.$counter.hide();
},o.prototype.destroy=function(){
this.$input.off("keydown keyup",this.inputEvent),0==this.counterExist&&(this.hide(),
this.$counter.remove());
},e.exports=o;
});define("biz_web/ui/checkbox.js",["tpl/biz_web/ui/checkbox.html.js"],function(t){
"use strict";
function e(t){
var e=$(t);
e.each(function(){
var t=$(this),e=t.prop("checked"),n=t.parent();
e?n.addClass("selected"):n.removeClass("selected");
});
}
function n(t){
var e=$(t);
e.each(function(){
var t=$(this).prop("disabled"),e=$(this).parent();
t?e.addClass("disabled"):e.removeClass("disabled");
});
}
function i(){
return"checkbox"+s++;
}
var a={
container:null,
label:"",
name:"",
type:"checkbox"
},c=t("tpl/biz_web/ui/checkbox.html.js"),r=wx.T,s=1,o=1,p=function(t){
this.options=$.extend(!0,{},a,t),this.options.index=o++,this.$container=$(this.options.container),
this.$dom=$(r(c,this.options)).appendTo(this.$container),this.$input=this.$dom.find("input"),
this.$input.checkbox();
};
return p.prototype={
checked:function(t){
return"undefined"!=typeof t&&(this.$input.prop("checked",t),e(this.$input)),this.$input.prop("checked");
},
disabled:function(t){
return"undefined"!=typeof t&&(this.$input.prop("disabled",t),n(this.$input)),this.$input.prop("disabled");
}
},$.fn.checkbox=function(t){
var a,c,r,s,o=!1;
"boolean"==typeof t?a=t:$.isPlainObject(t)?(a=t.multi,c=t.onChanged):"string"==typeof t?(o=!0,
r=t,s=[].slice.call(arguments,1)):"undefined"==typeof t&&(t={}),"undefined"==typeof a&&(a=this.is("input[type=checkbox]"));
var p=this,d=a?"checkbox":"radio",h={
checked:function(t){
return p.attr("checked",t),p.prop("checked",t),e(p),p;
},
disabled:function(t){
return p.attr("disabled",t),p.prop("disabled",t),n(p),p;
},
value:function(){
var t=p.eq(0);
return t.prop("checked")?t.val():"";
},
values:function(){
var t=[];
return p.each(function(){
$(this).prop("checked")&&t.push($(this).val());
}),t;
},
adjust:function(t){
var n;
return n="string"==typeof t?t.split(","):t,n&&n.length>0&&p.each(function(){
var t=$(this);
n.indexOf(t.val())>=0&&(t.attr("checked",!0),e(t));
}),this;
},
disable:function(t){
var e;
return e="string"==typeof t?t.split(","):t,e&&e.length>0&&p.each(function(){
var t=$(this);
e.indexOf(t.val())>=0&&(t.attr("disabled",!0),n(t));
}),this;
},
setall:function(t){
p.each(function(){
var e=$(this);
e.attr("disabled",t?!1:!0),n(e);
});
},
enable:function(t){
var e;
return e="string"==typeof t?t.split(","):t,e&&e.length>0&&p.each(function(){
var t=$(this);
e.indexOf(t.val())>=0&&(t.attr("disabled",!1),n(t));
}),this;
},
label:function(t){
return t&&(p.parent().find(".lbl_content").text(t),p.attr("data-label",t)),p;
}
};
return o&&"function"==typeof h[r]?h[r].apply(h,s):(this.addClass("frm_"+d).each(function(){
var t=$(this),e=t.parent();
if(!e.is("label")){
var n=t.attr("data-label")||"";
e=$('<label class="frm_{type}_label"><i class="icon_{type}"></i></label>'.format({
type:d
})).append("<span class='lbl_content'>{content}</span>".format({
content:n.html(!0)
})),e.insertBefore(t).prepend(t);
}
if(!this.id){
var a=i();
this.id=a;
}
e.attr("for",this.id);
}),e(this),n(this),t&&t.initOnChanged&&"function"==typeof c&&p.parent().find("input[type=checkbox],input[type=radio]").each(function(){
c.call(h,$(this));
}),this.parent().delegate("input[type=checkbox],input[type=radio]","click",function(){
var t=$(this),n=t.prop("checked");
a?(t.attr("checked",n),e(t)):(p.attr("checked",!1),t.attr("checked",!0).prop("checked",!0),
e(p)),"function"==typeof c&&c.call(h,t);
}).addClass("frm_"+d+"_label"),h);
},p;
});define("biz_web/utils/upload.js",["widget/upload.css","biz_web/lib/webuploader.js","common/wx/dialog.js","common/wx/Tips.js","tpl/uploader.html.js"],function(e){
"use strict";
function i(e){
f.src="http://isdspeed.qq.com/cgi-bin/r.cgi?flag1=7839&flag2=4&flag3=5&1="+e;
}
e("widget/upload.css");
var n=e("biz_web/lib/webuploader.js"),t=e("common/wx/dialog.js"),a=e("common/wx/Tips.js"),o=e("tpl/uploader.html.js"),r=wx.T,s=wx.path.webuploader,l=~location.hostname.search(/^mp/)?"https://mp.weixin.qq.com":"",c={
2:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
3:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/*"
},
fileSingleSizeLimit:5242880
},
4:{
accept:{
extensions:"rm,rmvb,wmv,avi,mpg,mpeg,mp4",
mimeTypes:"video/*"
},
fileSingleSizeLimit:20971520
},
5:{
accept:{
extensions:"pdf",
mimeTypes:"application/pdf"
},
fileSingleSizeLimit:10485760
},
6:{
accept:{
extensions:"bmp,png,jpeg,jpg,gif,pdf",
mimeTypes:"image/*,application/pdf"
},
fileSingleSizeLimit:5242880
},
7:{
accept:{
extensions:"bmp,jpeg,jpg,gif",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
8:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
9:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:204800
},
10:{
accept:{
extensions:"xls",
mimeTypes:"application/vnd.ms-excel"
},
fileSingleSizeLimit:5242880
},
11:{
accept:{
extensions:"bmp,png,jpeg,jpg",
mimeTypes:"image/*"
},
fileSingleSizeLimit:5242880
},
12:{
accept:{
extensions:"mp3,wma,wav,amr",
mimeTypes:"audio/*"
},
fileSingleSizeLimit:31457280
}
};
c[15]=c[4];
var p=function(e){
t.show({
type:"warn",
msg:"警告|"+e,
mask:!0,
buttons:[{
text:"确定",
click:function(){
this.remove();
}
}]
});
},m=function(e){
var i=n.Uploader;
0==i.support("flash")?p("<p>未安装或未正确配置flash插件，请检查后重试。<br><a href='http://get.adobe.com/cn/flashplayer/' target='_blank'>到adobe去下载flash插件</a></p>"):0==i.support()?p("<p>您的浏览器不支持上传</p>"):e.refresh();
},u=function(e){
e&&wx.jslog({
src:"common/wx/upload.js"
},null,e);
},d={
swf:s,
auto:!0,
pick:{
multiple:!0
},
fileNumLimit:20,
threads:3,
sendAsBinary:!1,
runtimeOrder:"html5,flash",
compress:{
width:1280,
height:1e8,
quality:90,
afterCompressSizeLimit:2097152,
compressSize:0,
resizeSize:2097152,
maxResolution:6e6,
noCompressIfLarger:!0
},
imageSize:!0,
chunked:!1,
duplicate:!0
},f=new Image,g={},h=function(e){
if(!e.url)throw"missing url";
var t,s,l,p=$('<ul class="upload_file_box" style="display:none"></ul>'),f=$(e.container);
f.on("click",function(){
Math.random()<.1&&u(12),m(t);
}).parent().append(p),function(){
0==n.Uploader.support("html5")&&0==n.Uploader.support("flash")&&((new Image).src="/misc/jslog?level=error&id=36&content=[pageurl:"+encodeURIComponent(location.href)+",ua:"+encodeURIComponent(window.navigator.userAgent)+"]");
}(),e.only_cdn&&(e.url+="&only_cdn=1"),s={
server:wx.url(e.url+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&svr_time="+wx.data.time),
pick:{
id:f,
multiple:e.multi
},
fileNumLimit:e.queueSizeLimit
},l=c[e.type]||c[2],e=$.extend(!0,{},d,s,l,e);
e.server;
0==n.Uploader.support("html5")&&e.compress&&(e.compress.quality=70);
try{
t=n.create(e);
}catch(h){
if(!t)return;
}
return p.on("click",".js_cancel",function(){
var e=$(this).data("id");
t.cancelFile(e),$(this).hide();
}),t.on("beforeFileQueued",function(i){
return Math.random()<.1&&u(13),e.canContinueUpload&&!e.canContinueUpload()?!1:!(e.onSelect&&e.onSelect(null,i.id,i)===!1);
}),t.on("fileQueued",function(e){
var i={
id:e.id,
fileName:e.name,
size:n.formatSize(e.size)
};
p.append(r(o,i)).show();
}),t.on("fileDequeued",function(){
Math.random()<.1&&u(14),e.onCancel&&e.onCancel();
}),t.on("uploadProgress",function(i,n){
var t="#uploadItem%s".sprintf(i.id),a=p.find(t).find(".progress_bar_thumb");
a.width("%s%".sprintf(100*n)),1==n&&p.find(t).find(".js_cancel").remove(),e.onProgress&&e.onProgress(null,i.id,i,{
percentage:n
});
}),t.on("uploadStart",function(e){
g[e.id]=+new Date;
}),t.on("uploadSuccess",function(n,t,o){
if(Math.random()<.1&&u(16),t&&t.base_resp){
var r=+t.base_resp.ret;
if(0==r)Math.random()<.1&&(u(17),g[n.id]&&i(+new Date-g[n.id]));else switch(n.setStatus("invalid"),
r){
case-18:
case 200018:
a.err("页面停留时间过久，请刷新页面后重试！");
break;

case-20:
case 200020:
a.err("无法解释该图片，请使用另一图片或截图另存");
break;

case-13:
case 200013:
a.err("上传文件过于频繁，请稍后再试");
break;

case-10:
case 200010:
a.err("上传文件过大");
break;

case-22:
case 200022:
a.err("上传音频文件不能超过60秒");
break;

case-39:
case 200039:
a.err("上传图片高度（像素）与宽度（像素）的乘积不能超过600万");
break;

default:
a.err("上传文件发送出错，请刷新页面后重试！");
}
}
e.onComplete&&e.onComplete(null,n.id,n,t,{
fileCount:o.numOfProgress+o.numOfQueue
});
}),t.on("uploadFinished",function(i){
this.reset(),p.fadeOut().html(""),g={},0==i.numOfInvalid&&i.numOfSuccess>0&&e.onAllComplete&&e.onAllComplete(null,{
errors:i.numOfCancel+i.numOfInvalid+i.numOfUploadFailed+i.numofDeleted+i.numofInterrupt,
filesUploaded:i.numOfSuccess
});
}),t.on("uploadError",function(){
Math.random()<.1&&u(15),e.onError&&e.onError();
}),t.on("error",function(i,t,o){
switch("object"==typeof t&&(o=t),i){
case"Q_EXCEED_NUM_LIMIT":
a.err("一次上传最多只能上传%s个文件".sprintf(t));
break;

case"F_EXCEED_SIZE":
a.err("文件大小不能超过%s".sprintf(n.formatSize(t,"0")));
break;

case"F_EXCEED_COMPRESS_SIZE":
a.err("图片尺寸太大，压缩后不能超过%s，请缩小图片尺寸再试".sprintf(e.compress.afterCompressSizeLimit?e.compress.afterCompressSizeLimit/1048576+"M":"2M")),
u(42);
break;

case"Q_TYPE_DENIED":
a.err(e.errTypeMsg||"文件必须为以下格式：%s".sprintf(e.accept.extensions).replace(/,/g,", "));
}
}),t;
},b=function(e){
return function(i){
return i.url=e,h(i);
};
},w=function(e){
return function(i){
return wx.url(e+"&ticket_id="+wx.data.user_name+"&ticket="+wx.data.ticket+"&id="+i);
};
};
return{
uploadFile:h,
uploadBizFile:b(l+"/cgi-bin/filetransfer?action=upload_material&f=json"),
uploadTmpFile:b(l+"/cgi-bin/filetransfer?action=preview&f=json"),
uploadCdnFile:b(l+"/cgi-bin/filetransfer?action=upload_cdn&f=json"),
uploadShopFile:b(l+"/merchant/goodsimage?action=uploadimage"),
uploadShopUnsaveFile:b(l+"/merchant/goodsimage?action=uploadimage&save=0"),
uploadVideoCdnFile:b(l+"/cgi-bin/filetransfer?action=upload_video_cdn&f=json"),
uploadRegisterFile:b(l+"/acct/realnamesubmit?type=2&action=file_set"),
uploadUpgradeFile:b(l+"/acct/servicetypeupgrade?type=2&action=file_set"),
uploadPoiFile:b(l+"/misc/setlocation?action=upload"),
mediaFile:b(l+"/cgi-bin/filetransfer?action=bizmedia"),
uploadCdnFileFromAd:function(e){
return b(l+"/cgi-bin/filetransfer?action=upload_cdn_check_size&f=json&width="+e.w+"&height="+e.h+"&limit_size="+e.size);
},
uploadImageLibFile:function(e){
return e.url=l+"/cgi-bin/filetransfer?action=upload_material&f=json","undefined"!=typeof e.scene&&(e.url+="&scene="+e.scene),
1==e.doublewrite&&(e.url+="&writetype=doublewrite&groupid="+(e.groupid||1)),h(e);
},
uploadCdnFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));
return b(l+"/cgi-bin/filetransfer?action=upload_cdn_check_range&f=json&"+n.join("&"),"tmpfile");
},
uploadTmpFileWithCheck:function(e){
var i={
height:0,
width:0,
size:0,
min_height:0,
min_width:0,
min_size:0
};
e=$.extend(!0,i,e);
var n=[];
for(var t in e)n.push(encodeURIComponent(t)+"="+encodeURIComponent(e[t]));
return b(l+"/cgi-bin/filetransfer?action=preview_check_range&f=json&"+n.join("&"));
},
tmpFileUrl:w(l+"/cgi-bin/filetransfer?action=preview"),
mediaFileUrl:w(l+"/cgi-bin/filetransfer?action=bizmedia"),
multimediaFileUrl:w(l+"/cgi-bin/filetransfer?action=multimedia")
};
});