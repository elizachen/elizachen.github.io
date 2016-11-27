define("biz_web/ui/jquery.scrollbar.js",["biz_web/widget/jquery.scrollbar.css"],function(l){
"use strict";
function e(l){
if(t.webkit&&!l)return{
height:0,
width:0
};
if(!t.data.outer){
var e={
border:"none",
"box-sizing":"content-box",
height:"200px",
margin:"0",
padding:"0",
width:"200px"
};
t.data.inner=$("<div>").css($.extend({},e)),t.data.outer=$("<div>").css($.extend({
left:"-1000px",
overflow:"scroll",
position:"absolute",
top:"-1000px"
},e)).append(t.data.inner).appendTo("body");
}
return t.data.outer.scrollLeft(1e3).scrollTop(1e3),{
height:Math.ceil(t.data.outer.offset().top-t.data.inner.offset().top||0),
width:Math.ceil(t.data.outer.offset().left-t.data.inner.offset().left||0)
};
}
function s(){
var l=e(!0);
return!(l.height||l.width);
}
function o(l){
var e=l.originalEvent;
return e.axis&&e.axis===e.HORIZONTAL_AXIS?!1:e.wheelDeltaX?!1:!0;
}
l("biz_web/widget/jquery.scrollbar.css");
var r=!1,t={
data:{
index:0,
name:"scrollbar"
},
macosx:/mac/i.test(navigator.platform),
mobile:/android|webos|iphone|ipad|ipod|blackberry/i.test(navigator.userAgent),
overlay:null,
scroll:null,
scrolls:[],
webkit:/webkit/i.test(navigator.userAgent)&&!/edge\/\d+/i.test(navigator.userAgent)
};
t.scrolls.add=function(l){
this.remove(l).push(l);
},t.scrolls.remove=function(l){
for(;$.inArray(l,this)>=0;)this.splice($.inArray(l,this),1);
return this;
};
var i={
autoScrollSize:!0,
autoUpdate:!0,
debug:!1,
disableBodyScroll:!1,
duration:200,
ignoreMobile:!1,
ignoreOverlay:!1,
scrollStep:30,
showArrows:!1,
stepScrolling:!0,
scrollx:null,
scrolly:null,
onDestroy:null,
onInit:null,
onScroll:null,
onUpdate:null
},n=function(l){
t.scroll||(t.overlay=s(),t.scroll=e(),a(),$(window).resize(function(){
var l=!1;
if(t.scroll&&(t.scroll.height||t.scroll.width)){
var s=e();
(s.height!==t.scroll.height||s.width!==t.scroll.width)&&(t.scroll=s,l=!0);
}
a(l);
})),this.container=l,this.namespace=".scrollbar_"+t.data.index++,this.options=$.extend({},i,window.jQueryScrollbarOptions||{}),
this.scrollTo=null,this.scrollx={},this.scrolly={},l.data(t.data.name,this),t.scrolls.add(this);
};
n.prototype={
destroy:function(){
if(this.wrapper){
this.container.removeData(t.data.name),t.scrolls.remove(this);
var l=this.container.scrollLeft(),e=this.container.scrollTop();
this.container.insertBefore(this.wrapper).css({
height:"",
margin:"",
"max-height":""
}).removeClass("scroll-content scroll-scrollx_visible scroll-scrolly_visible").off(this.namespace).scrollLeft(l).scrollTop(e),
this.scrollx.scroll.removeClass("scroll-scrollx_visible").find("div").andSelf().off(this.namespace),
this.scrolly.scroll.removeClass("scroll-scrolly_visible").find("div").andSelf().off(this.namespace),
this.wrapper.remove(),$(document).add("body").off(this.namespace),$.isFunction(this.options.onDestroy)&&this.options.onDestroy.apply(this,[this.container]);
}
},
init:function(l){
var e=this,s=this.container,r=this.containerWrapper||s,i=this.namespace,n=$.extend(this.options,l||{}),c={
x:this.scrollx,
y:this.scrolly
},a=this.wrapper,d={
scrollLeft:s.scrollLeft(),
scrollTop:s.scrollTop()
};
if(t.mobile&&n.ignoreMobile||t.overlay&&n.ignoreOverlay||t.macosx&&!t.webkit)return!1;
if(a)r.css({
height:"auto",
"margin-bottom":-1*t.scroll.height+"px",
"margin-right":-1*t.scroll.width+"px",
"max-height":""
});else{
if(this.wrapper=a=$("<div>").addClass("scroll-wrapper").addClass(s.attr("class")).css("position","absolute"==s.css("position")?"absolute":"relative").insertBefore(s).append(s),
s.is("textarea")&&(this.containerWrapper=r=$("<div>").insertBefore(s).append(s),
a.addClass("scroll-textarea")),r.addClass("scroll-content").css({
height:"auto",
"margin-bottom":-1*t.scroll.height+"px",
"margin-right":-1*t.scroll.width+"px",
"max-height":""
}),s.on("scroll"+i,function(){
$.isFunction(n.onScroll)&&n.onScroll.call(e,{
maxScroll:c.y.maxScrollOffset,
scroll:s.scrollTop(),
size:c.y.size,
visible:c.y.visible
},{
maxScroll:c.x.maxScrollOffset,
scroll:s.scrollLeft(),
size:c.x.size,
visible:c.x.visible
}),c.x.isVisible&&c.x.scroll.bar.css("left",s.scrollLeft()*c.x.kx+"px"),c.y.isVisible&&c.y.scroll.bar.css("top",s.scrollTop()*c.y.kx+"px");
}),a.on("scroll"+i,function(){
a.scrollTop(0).scrollLeft(0);
}),n.disableBodyScroll){
var h=function(l){
o(l)?c.y.isVisible&&c.y.mousewheel(l):c.x.isVisible&&c.x.mousewheel(l);
};
a.on("MozMousePixelScroll"+i,h),a.on("mousewheel"+i,h),t.mobile&&a.on("touchstart"+i,function(l){
var e=l.originalEvent.touches&&l.originalEvent.touches[0]||l,o={
pageX:e.pageX,
pageY:e.pageY
},r={
left:s.scrollLeft(),
top:s.scrollTop()
};
$(document).on("touchmove"+i,function(l){
var e=l.originalEvent.targetTouches&&l.originalEvent.targetTouches[0]||l;
s.scrollLeft(r.left+o.pageX-e.pageX),s.scrollTop(r.top+o.pageY-e.pageY),l.preventDefault();
}),$(document).on("touchend"+i,function(){
$(document).off(i);
});
});
}
$.isFunction(n.onInit)&&n.onInit.apply(this,[s]);
}
$.each(c,function(l,r){
var t=null,a=1,d="x"===l?"scrollLeft":"scrollTop",h=n.scrollStep,p=function(){
var l=s[d]();
s[d](l+h),1==a&&l+h>=u&&(l=s[d]()),-1==a&&u>=l+h&&(l=s[d]()),s[d]()==l&&t&&t();
},u=0;
r.scroll||(r.scroll=e._getScroll(n["scroll"+l]).addClass("scroll-"+l),n.showArrows&&r.scroll.addClass("scroll-element_arrows_visible"),
r.mousewheel=function(t){
if(!r.isVisible||"x"===l&&o(t))return!0;
if("y"===l&&!o(t))return c.x.mousewheel(t),!0;
var i=-1*t.originalEvent.wheelDelta||t.originalEvent.detail,n=r.size-r.visible-r.offset;
return(i>0&&n>u||0>i&&u>0)&&(u+=i,0>u&&(u=0),u>n&&(u=n),e.scrollTo=e.scrollTo||{},
e.scrollTo[d]=u,setTimeout(function(){
e.scrollTo&&(s.stop().animate(e.scrollTo,240,"linear",function(){
u=s[d]();
}),e.scrollTo=null);
},1)),t.preventDefault(),!1;
},r.scroll.on("MozMousePixelScroll"+i,r.mousewheel).on("mousewheel"+i,r.mousewheel).on("mouseenter"+i,function(){
u=s[d]();
}),r.scroll.find(".scroll-arrow, .scroll-element_track").on("mousedown"+i,function(o){
if(1!=o.which)return!0;
a=1;
var i={
eventOffset:o["x"===l?"pageX":"pageY"],
maxScrollValue:r.size-r.visible-r.offset,
scrollbarOffset:r.scroll.bar.offset()["x"===l?"left":"top"],
scrollbarSize:r.scroll.bar["x"===l?"outerWidth":"outerHeight"]()
},c=0,f=0;
return $(this).hasClass("scroll-arrow")?(a=$(this).hasClass("scroll-arrow_more")?1:-1,
h=n.scrollStep*a,u=a>0?i.maxScrollValue:0):(a=i.eventOffset>i.scrollbarOffset+i.scrollbarSize?1:i.eventOffset<i.scrollbarOffset?-1:0,
h=Math.round(.75*r.visible)*a,u=i.eventOffset-i.scrollbarOffset-(n.stepScrolling?1==a?i.scrollbarSize:0:Math.round(i.scrollbarSize/2)),
u=s[d]()+u/r.kx),e.scrollTo=e.scrollTo||{},e.scrollTo[d]=n.stepScrolling?s[d]()+h:u,
n.stepScrolling&&(t=function(){
u=s[d](),clearInterval(f),clearTimeout(c),c=0,f=0;
},c=setTimeout(function(){
f=setInterval(p,40);
},n.duration+100)),setTimeout(function(){
e.scrollTo&&(s.animate(e.scrollTo,n.duration),e.scrollTo=null);
},1),e._handleMouseDown(t,o);
}),r.scroll.bar.on("mousedown"+i,function(o){
if(1!=o.which)return!0;
var t=o["x"===l?"pageX":"pageY"],n=s[d]();
return r.scroll.addClass("scroll-draggable"),$(document).on("mousemove"+i,function(e){
var o=parseInt((e["x"===l?"pageX":"pageY"]-t)/r.kx,10);
s[d](n+o);
}),e._handleMouseDown(function(){
r.scroll.removeClass("scroll-draggable"),u=s[d]();
},o);
}));
}),$.each(c,function(l,e){
var s="scroll-scroll"+l+"_visible",o="x"==l?c.y:c.x;
e.scroll.removeClass(s),o.scroll.removeClass(s),r.removeClass(s);
}),$.each(c,function(l,e){
$.extend(e,"x"==l?{
offset:parseInt(s.css("left"),10)||0,
size:s.prop("scrollWidth"),
visible:a.width()
}:{
offset:parseInt(s.css("top"),10)||0,
size:s.prop("scrollHeight"),
visible:a.height()
});
}),this._updateScroll("x",this.scrollx),this._updateScroll("y",this.scrolly),$.isFunction(n.onUpdate)&&n.onUpdate.apply(this,[s]),
$.each(c,function(l,e){
var o="x"===l?"left":"top",r="x"===l?"outerWidth":"outerHeight",t="x"===l?"width":"height",i=parseInt(s.css(o),10)||0,c=e.size,a=e.visible+i,d=e.scroll.size[r]()+(parseInt(e.scroll.size.css(o),10)||0);
n.autoScrollSize&&(e.scrollbarSize=parseInt(d*a/c,10),e.scroll.bar.css(t,e.scrollbarSize+"px")),
e.scrollbarSize=e.scroll.bar[r](),e.kx=(d-e.scrollbarSize)/(c-a)||1,e.maxScrollOffset=c-a;
}),s.scrollLeft(d.scrollLeft).scrollTop(d.scrollTop);
},
_getScroll:function(l){
var e={
advanced:['<div class="scroll-element">','<div class="scroll-element_corner"></div>','<div class="scroll-arrow scroll-arrow_less"></div>','<div class="scroll-arrow scroll-arrow_more"></div>','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_inner-wrapper">','<div class="scroll-element_inner scroll-element_track">','<div class="scroll-element_inner-bottom"></div>',"</div>","</div>",'<div class="scroll-bar">','<div class="scroll-bar_body">','<div class="scroll-bar_body-inner"></div>',"</div>",'<div class="scroll-bar_bottom"></div>','<div class="scroll-bar_center"></div>',"</div>","</div>","</div>"].join(""),
simple:['<div class="scroll-element">','<div class="scroll-element_outer">','<div class="scroll-element_size"></div>','<div class="scroll-element_track"></div>','<div class="scroll-bar"></div>',"</div>","</div>"].join("")
};
return e[l]&&(l=e[l]),l||(l=e.simple),l="string"==typeof l?$(l).appendTo(this.wrapper):$(l),
$.extend(l,{
bar:l.find(".scroll-bar"),
size:l.find(".scroll-element_size"),
track:l.find(".scroll-element_track")
}),l;
},
_handleMouseDown:function(l,e){
var s=this.namespace;
return $(document).on("blur"+s,function(){
$(document).add("body").off(s),l&&l();
}),$(document).on("dragstart"+s,function(l){
return l.preventDefault(),!1;
}),$(document).on("mouseup"+s,function(){
$(document).add("body").off(s),l&&l();
}),$("body").on("selectstart"+s,function(l){
return l.preventDefault(),!1;
}),e&&e.preventDefault(),!1;
},
_updateScroll:function(l,e){
var s=this.container,o=this.containerWrapper||s,r="scroll-scroll"+l+"_visible",i="x"===l?this.scrolly:this.scrollx,n=parseInt(this.container.css("x"===l?"left":"top"),10)||0,c=this.wrapper,a=e.size,d=e.visible+n;
e.isVisible=a-d>1,e.isVisible?(e.scroll.addClass(r),i.scroll.addClass(r),o.addClass(r)):(e.scroll.removeClass(r),
i.scroll.removeClass(r),o.removeClass(r)),"y"===l&&o.css(s.is("textarea")||d>a?{
height:d+t.scroll.height+"px",
"max-height":"none"
}:{
"max-height":d+t.scroll.height+"px"
}),(e.size!=s.prop("scrollWidth")||i.size!=s.prop("scrollHeight")||e.visible!=c.width()||i.visible!=c.height()||e.offset!=(parseInt(s.css("left"),10)||0)||i.offset!=(parseInt(s.css("top"),10)||0))&&($.extend(this.scrollx,{
offset:parseInt(s.css("left"),10)||0,
size:s.prop("scrollWidth"),
visible:c.width()
}),$.extend(this.scrolly,{
offset:parseInt(s.css("top"),10)||0,
size:this.container.prop("scrollHeight"),
visible:c.height()
}),this._updateScroll("x"===l?"y":"x",i));
}
};
var c=n;
$.fn.scrollbar=function(l,e){
return"string"!=typeof l&&(e=l,l="init"),"undefined"==typeof e&&(e=[]),$.isArray(e)||(e=[e]),
this.not("body, .scroll-wrapper").each(function(){
var s=$(this),o=s.data(t.data.name);
(o||"init"===l)&&(o||(o=new c(s)),o[l]&&o[l].apply(o,e));
}),this;
},$.fn.scrollbar.options=i;
var a=$.fn.scrollbar.updateScrollbars=function(){
var l=0,e=0;
return function(s){
var o,i,n,c,d,h,p;
for(o=0;o<t.scrolls.length;o++)c=t.scrolls[o],i=c.container,n=c.options,d=c.wrapper,
h=c.scrollx,p=c.scrolly,(s||n.autoUpdate&&d&&d.is(":visible")&&(i.prop("scrollWidth")!=h.size||i.prop("scrollHeight")!=p.size||d.width()!=h.visible||d.height()!=p.visible))&&(c.init(),
r&&(window.console&&console.log({
scrollHeight:i.prop("scrollHeight")+":"+c.scrolly.size,
scrollWidth:i.prop("scrollWidth")+":"+c.scrollx.size,
visibleHeight:d.height()+":"+c.scrolly.visible,
visibleWidth:d.width()+":"+c.scrollx.visible
},!0),e++));
r&&e>10?(window.console&&console.log("Scroll updates exceed 10"),a=function(){}):(clearTimeout(l),
l=setTimeout(a,300));
};
}();
});define("media/appmsg_edit_v2.js",["biz_web/ui/jquery.scrollbar.js","common/qq/Class.js","biz_web/utils/upload.js","biz_web/ui/checkbox.js","common/wx/inputCounter.js","common/wx/Step.js","biz_web/ui/dropdown.js","common/wx/tooltips.js","biz_common/jquery.validate.js","common/wx/Tips.js","biz_common/moment.js","common/wx/media/imageDialog.js","common/wx/preview.js","common/wx/dialog.js","common/wx/popover.js","common/wx/media/imgsDialogByUrls.js","common/wx/ban.js","common/wx/mpEditor/plugin/music.js","common/wx/mpEditor/plugin/vote.js","common/wx/mpEditor/plugin/card.js","common/wx/mpEditor/plugin/shop.js","common/wx/mpEditor/plugin/link.js","common/wx/mpEditor/plugin/unlink.js","common/wx/mpEditor/plugin/audio.js","common/wx/mpEditor/plugin/img.js","common/wx/mpEditor/plugin/video.js","common/wx/mpEditor/plugin/topic.js","common/wx/mpEditor/editor.js","tpl/media/appmsg_edit/article.html.js","media/article_list.js","media/media_static_data.js","media/report.js","biz_common/utils/wxgspeedsdk.js"],function(e){
"use strict";
function i(e,i,t){
(i||1)>S&&$.post("/misc/jslog?1=1"+wx.data.param,{
id:e,
val:1,
level:t||"error",
content:"[file=media/appmsg_edit]"
});
}
e("biz_web/ui/jquery.scrollbar.js");
var t,n=e("common/qq/Class.js"),s=e("biz_web/utils/upload.js"),o=(e("biz_web/ui/checkbox.js"),
e("common/wx/inputCounter.js")),r=e("common/wx/Step.js"),a=e("biz_web/ui/dropdown.js"),d=e("common/wx/tooltips.js"),c=e("biz_common/jquery.validate.js").rules,_=e("common/wx/Tips.js"),l=e("biz_common/moment.js"),p=e("common/wx/media/imageDialog.js"),m=e("common/wx/preview.js"),u=(e("common/wx/dialog.js"),
e("common/wx/popover.js")),h=e("common/wx/media/imgsDialogByUrls.js"),f=e("common/wx/ban.js"),g=e("common/wx/mpEditor/plugin/music.js"),j=e("common/wx/mpEditor/plugin/vote.js"),w=e("common/wx/mpEditor/plugin/card.js"),v=(e("common/wx/mpEditor/plugin/shop.js"),
e("common/wx/mpEditor/plugin/link.js")),b=e("common/wx/mpEditor/plugin/unlink.js"),x=e("common/wx/mpEditor/plugin/audio.js"),y=e("common/wx/mpEditor/plugin/img.js"),k=e("common/wx/mpEditor/plugin/video.js"),C=e("common/wx/mpEditor/plugin/topic.js"),E=e("common/wx/mpEditor/editor.js"),q=e("tpl/media/appmsg_edit/article.html.js"),L=e("media/article_list.js"),D=e("media/media_static_data.js"),I=e("media/report.js"),T=(D.URL_PLATFORM_MAP,
D.article_type),z=wx.cgiData,U=document.referrer,P={
reportId2:65080
};
!function(e){
e.fn.placeholder2=function(){
if(!("placeholder"in document.createElement("input"))){
var i=e(this).siblings(".tips_global");
e(this).on("focus",function(){
i.hide();
}).on("blur",function(){
""===this.value?i.show():i.hide();
}).trigger("blur");
}
},e.extend(e.easing,{
easeOutCubic:function(e,i,t,n,s){
return n*((i=i/s-1)*i*i+1)+t;
}
});
}(jQuery);
var S=Math.random(),M=n.declare({
init:function(e){
var i=this;
i.opt=e,$.extend(!0,i,e),i.$editor=$(i.editor_selector).html(wx.T(q,{
can_use_copyright:z.can_use_copyright,
can_use_reward:z.can_use_reward,
can_use_payforread:z.can_use_payforread,
can_use_comment:z.can_use_comment,
can_use_appmsg_source_url:z.can_use_appmsg_source_url,
has_invited_original:z.has_invited_original,
orginal_apply_stat:z.orginal_apply_stat,
token:wx.data.t
})),i._initUEditor(),i._bindEvent(),$(".js_scrollbar").scrollbar({
autoUpdate:!1
});
},
_initEditArea:function(){
var e=this,i=e.$editor;
i.find(".js_field").each(function(){
{
var e=$(this).attr("name");
$(this).attr("keyup");
}
$(this).on("keyup",function(){
i.find(".js_%s_error".sprintf(e)).hide();
});
}),i.find(".js_url").on("change",function(){
$(".js_warn.frm_msg").hide();
}),i.find(".js_title").on("keyup",function(){
var t=$.trim($(this).val()).html(!0),n=e.articleList.$current;
n&&n.find(".js_appmsg_title").html(t||"标题"),i.find(".js_title_error").hide(),$("#js_draft_tips").hide();
}).on("focus",function(){
e.ueditor.disableToolbar(),$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).placeholder2(),i.find(".js_author").on("focus",function(){
e.ueditor.disableToolbar(),$(this).siblings("em").show();
}).on("blur",function(){
$(this).parent().hasClass("warn")||$(this).siblings("em").hide();
}).on("keyup",function(){
$("#js_draft_tips").hide();
}).placeholder2(),i.find(".js_desc").on("keyup",function(){
var t=$.trim($(this).val()).html(!0),n=e.articleList.$current;
n&&n.find(".appmsg_desc").html(t),i.find(".js_desc_error").hide();
}),i.find(".js_comment").checkbox({
multi:!0,
initOnChanged:!0,
onChanged:function(e){
e.checkbox("value")?$("#js_comment_setting_wrp").show():$("#js_comment_setting_wrp").hide();
}
}),i.find(".js_comment_setting").checkbox({
multi:!1
}),i.find(".js_url_checkbox").checkbox({
multi:!0,
onChanged:function(t){
t.checkbox("value")?(i.find(".js_url_area .frm_input_box").show(),e.ueditor.funcPvUvReport("showlink")):(i.find(".js_url_area .frm_input_box").hide(),
e.ueditor.funcPvUvReport("hidelink")),i.find(".js_url_error").hide(),i.find(".frm_msg.js_warn").hide();
}
}),i.find(".js_url").on("input change",function(){
var e=$(this),i=e.val();
i.match(/\:\/\/mp\.weixin\.qq\.com\/.*[\?&]tempkey=/)&&new u({
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
}]
});
}),i.find(".js_reward").checkbox({
multi:!0,
onChanged:function(e){
e.checkbox("value")?(e.checkbox("checked",!1),$("#tpl_reward_statement").popup({
title:"文章赞赏须知",
width:960,
buttons:[{
text:"确定",
type:"primary",
click:function(){
e.checkbox("checked",!0),i.find(".js_reward_div").show(),this.remove();
}
},{
text:"取消",
click:function(){
this.remove();
}
}]
})):i.find(".js_reward_div").hide();
}
}),i.find(".js_reward_notice").on("click",function(){
$("#tpl_reward_statement").popup({
title:"文章赞赏须知",
width:960,
buttons:[{
text:"确定",
type:"primary",
click:function(){
this.remove();
}
}]
});
}),e._initUploadCover(),i.find(".js_counter").each(function(){
$(this).hasClass("js_author")||$(this).hasClass("js_reward_wording")?new o(this,{
maxLength:$(this).attr("max-length"),
useGBKLength:!0,
GBKBased:!0
}):new o(this,{
maxLength:$(this).attr("max-length")
});
}),e._initOriginal(),e._initPay(),e._initBan();
},
_initUploadCover:function(){
var e,t=this,n=t.$editor;
s.uploadImageLibFile({
multi:!1,
type:2,
doublewrite:!0,
only_cdn:!1,
container:"#js_appmsg_upload_cover",
onSelect:function(){
e=t.articleList.$current.index(),i(37,1,"trace");
},
onComplete:function(i,s,o,r,a){
if(!r.base_resp||0==r.base_resp.ret){
var d=r.content,c=r.cdn_url,_="";
_=c?c.http2https().nogif():wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(d));
var l=t.articleList.$current;
if(e==l.index()){
n.find(".js_cover").find("img").remove();
var p=n.find(".js_cover").show(),m=p.find(".js_cover_preview").css("backgroundImage",'url("'+_+'")');
m.find(".js_tip_mask_msg").hide(),m.find(".js_tip_mask").addClass("hover_mask").removeClass("error_mask"),
p.find("input.js_file_id").val(d),p.find("input.js_cdn_url").val(c.https2http().nogif());
}else{
l=t.articleList.$list.children().eq(e);
var a=l.data("article").data;
a&&(a.file_id=d,a.cdn_url=c.https2http().nogif());
}
l&&(l.find("img.js_appmsg_thumb").attr("src",_),l.find("div.js_appmsg_thumb").css("backgroundImage",'url("'+_+'")'),
l.addClass("has_thumb")),n.find(".js_cover_error").hide();
}
}
}),$("#js_selectCoverFromContent").on("click",function(){
var e=t.ueditor.fireEvent("get_current_article_all_img")||[];
document.body.style.overflow=document.documentElement.style.overflow="hidden",new h({
urls:e,
onOk:function(e){
document.body.style.overflow=document.documentElement.style.overflow="auto";
var s=e.length>0?e[0]:"";
if(s){
s=s.nogif(),n.find(".js_cover").find("img").remove();
var o=n.find(".js_cover").show(),r=o.find(".js_cover_preview").css("backgroundImage",'url("'+s+'")');
r.find(".js_tip_mask_msg").hide(),r.find(".js_tip_mask").addClass("hover_mask").removeClass("error_mask"),
o.find("input.js_file_id").val(""),o.find("input.js_cdn_url").val(s.https2http());
var a=t.articleList.$current;
a&&(a.find("img.js_appmsg_thumb").attr("src",s),a.find("div.js_appmsg_thumb").css("backgroundImage",'url("'+s+'")'),
a.addClass("has_thumb")),n.find(".js_cover_error").hide(),n.find(".js_show_cover_pic").val("0"),
n.find(".js_show_cover_pic_tips").hide(),I.addNum(P.reportId2,0,1),I.addNum(P.reportId2,1,100);
}
i(38,1,"trace");
},
onHide:function(){
document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
}),$("#js_imagedialog").on("click",function(){
document.body.style.overflow=document.documentElement.style.overflow="hidden",p({
coverPicCheckbox:!0,
coverPic:1*n.find(".js_show_cover_pic").val()||0,
scene:"biz",
only_cdn:!1,
maxSelect:1,
desc:"建议尺寸：900像素 * 500像素",
onOK:function(e){
var s=e[0],o=s.url,r=s.file_id,a="";
a=o?o.http2https().nogif():wx.url("/cgi-bin/getimgdata?mode=large&source=file&fileId=%s".sprintf(r)),
n.find(".js_cover").find("img").remove();
var d=n.find(".js_cover").show(),c=d.find(".js_cover_preview").css("backgroundImage",'url("'+a+'")');
c.find(".js_tip_mask_msg").hide(),c.find(".js_tip_mask").addClass("hover_mask").removeClass("error_mask"),
d.find("input.js_file_id").val(r),d.find("input.js_cdn_url").val(o.https2http().nogif()),
1*s.coverPic===1?(n.find(".js_show_cover_pic").val("1"),n.find(".js_show_cover_pic_tips").show()):(n.find(".js_show_cover_pic_tips").hide(),
n.find(".js_show_cover_pic").val("0"));
var _=t.articleList.$current;
_&&(_.find("img.js_appmsg_thumb").attr("src",a),_.find("div.js_appmsg_thumb").css("backgroundImage",'url("'+a+'")'),
_.addClass("has_thumb")),n.find(".js_cover_error").hide(),I.addNum(P.reportId2,0,1),
I.addNum(P.reportId2,2,100),i(38,1,"trace"),this.destroy(),document.body.style.overflow=document.documentElement.style.overflow="auto";
},
onHide:function(){
document.body.style.overflow=document.documentElement.style.overflow="auto";
}
});
});
},
_initUEditor:function(){
var e=this,i=[],n=["undo","redo","|","fontsize","|","blockquote","horizontal","|","removeformat","formatmatch"],s=["bold","italic","underline","forecolor","backcolor","|","indent","|","justifyleft","justifycenter","justifyright","justifyjustify","|","rowspacingtop","rowspacingbottom","lineheight","|","insertorderedlist","insertunorderedlist","|","imagenone","imageleft","imageright","imagecenter"];
i.push(new y({
container:"#js_editor_insertimage"
})),i.push(new k({
container:"#js_editor_insertvideo"
})),wx.cgiData.can_use_vote&&i.push(new j({
container:"#js_editor_insertvote"
})),wx.cgiData.can_use_card&&i.push(new w({
container:"#js_editor_insertcard",
biz_uin:z.biz_uin
})),wx.cgiData.qqmusic_flag&&i.push(new g({
container:"#music_plugin_btn"
})),wx.cgiData.can_use_voice&&i.push(new x({
container:"#audio_plugin_btn"
})),(wx.cgiData.can_use_copyright||wx.cgiData.can_use_hyperlink||wx.cgiData.is_link_white)&&0!=wx.cgiData.can_use_appmsg_outer_url&&(i.push(new v),
i.push(new b),n.push("link","unlink")),i.push(new C({
container:"#js_editor_insertTopic"
})),wx.cgiData.can_use_topic||$("#js_editor_insertTopic").hide(),t=e.ueditor=new E({
plugins:i,
autoHeightEnabled:!0,
topOffset:53,
toolbars:[n,s]
}),t.render("js_editor"),t.addListener("begincatchimage",function(){
_.suc("内容已上传完成");
}),t.addListener("showEditorMsgTips",function(i,t){
$(".js_catch_tips",e.$editor).show().find(".js_msg_content").text(t.msg);
}),t.addListener("catchremotesuccess",function(i,n,s,o){
e.articleList.updateRemoteImg({
article:n.article,
type:n.type,
remoteType:"success",
uid:n.uid,
format:o,
img_url:s
});
var r=$(t.getDocument()).find(".js_catchremoteimageerror").length;
0==r?$(".js_catch_tips",e.$editor).hide():$(".js_catch_tips",e.$editor).show().find(".js_msg_content").text("有%s张图片粘贴失败".sprintf(r));
}),t.addListener("catchremoteerror",function(i,n,s){
if(n&&e.articleList.updateRemoteImg({
article:n.article,
type:n.type,
remoteType:"error",
uid:n.uid,
img_url:n.defaultRemoteImg
}),s)$(".js_catch_tips",e.$editor).show().find(".js_msg_content").text(s);else{
var o=$(t.getDocument()).find(".js_catchremoteimageerror").length;
0==o?$(".js_catch_tips",e.$editor).hide():$(".js_catch_tips",e.$editor).show().find(".js_msg_content").text("有%s张图片粘贴失败".sprintf(o));
}
}),t.addListener("scrollIntoView",function(e,i,t){
setTimeout(function(){
$("html, body").animate({
scrollTop:$(i).offset().top-(t||50)
});
},100);
}),t.addListener("showErrMsg",function(e,i,t){
$(i).show().find(".js_msg_content").text(t);
}),t.addListener("hideAllErrMsg",function(){
e.$editor.find(".js_error_msg,.js_tip_mask_msg").hide(),e.$editor.find(".js_tip_mask").removeClass("error_mask").addClass("hover_mask"),
$("#js_labels_error").hide();
}),t.addListener("keyup aftersetcontent",function(){
var i=t.getDocument(),n=$(i).find(".js_catchremoteimageerror").length;
n>0?$(".js_catch_tips",e.$editor).show().find(".js_msg_content").text("有%s张图片粘贴失败".sprintf(n)):$(".js_catch_tips",e.$editor).hide();
}),t.addListener("keyup",function(){
$(".js_content_error",e.$editor).hide(),$(".page_msg.js_warn").hide(),$("#js_draft_tips").hide();
}),t.addListener("heightChanged",function(){
$(window).trigger("scroll",!1);
}),t.addListener("focus",function(){
$(".page_msg.js_warn").hide(),t.enableToolbar();
}),t.ready(function(){
e._initEditArea(),e.articleList=new L($.extend({
maxNum:8,
ueditor:e.ueditor,
freeUEditor:e.freeUEditor
},e.opt));
});
},
_initOriginal:function(){
var e=this,i=e.$editor;
$(document).on("click",".js_original_apply",function(){
var t=$("#js_original"),n=$("#tpl_original").popup({
title:"声明原创",
width:960,
className:"simple align_edge original_dialog",
data:{
author:t.find(".js_author").text()||i.find(".js_author").val(),
frm:t.find(".js_reprint_frm").val()||1,
can_use_appmsg_source_url:z.can_use_appmsg_source_url
},
buttons:[{
text:"下一步",
type:"primary",
click:function(){
s.find(".js_step_panel").hide().eq(1).show();
var e=new a({
container:"#js_original_article_type",
label:"请选择",
data:T
});
e.selected(t.find(".js_classify").text()),s.find(".js_btn_p").eq(0).hide(),s.find(".js_btn_p").eq(1).show(),
s.find(".js_btn_p").eq(2).show(),c.setStep(2);
}
},{
text:"上一步",
click:function(){
s.find(".js_step_panel").hide().eq(0).show(),s.find(".js_btn_p").eq(0).show(),s.find(".js_btn_p").eq(1).hide(),
s.find(".js_btn_p").eq(2).hide(),c.setStep(1);
}
},{
text:"确定",
type:"primary",
click:function(){
e._checkOriginal(s)&&($(".js_original_type").hide().eq(1).show(),$(".js_original_content").show(),
i.find(".js_author").closest(".appmsg_edit_item").eq(0).hide(),i.find(".js_reward").checkbox("disabled",!1).checkbox("checked",!0),
i.find(".js_reward_div").show(),"checked"==s.find(".js_forIEbug_frm").attr("checked")?($("#js_pay").checkbox("disabled",!0),
$("#js_pay").checkbox("checked",!1),i.find(".js_pay_tips").show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),
i.find(".js_pay_setting").hide()):($("#js_pay").checkbox("disabled",!1),i.find(".js_pay_tips").show().text("（每月可群发10篇付费阅读文章）")),
this.remove());
}
}],
onHide:function(){
this.remove();
}
}),s=n.popup("get");
s.find(".js_btn_p").eq(1).hide(),s.find(".js_btn_p").eq(2).hide();
var c=new r({
container:s.find(".js_step"),
selected:1,
names:["1 须知","2 原创声明信息"]
});
s.find("#js_copyright_agree").checkbox({
onChanged:function(e){
e.prop("checked")?s.find(".js_btn_p").enable():s.find(".js_btn_p").disable();
}
}),s.find(".js_reprint_frm").checkbox({
multi:!1
}),new d({
container:"#js_frmtips",
content:$("#frm_tips").html(),
position:{
left:-30,
top:0
},
reposition:!0,
type:"hover",
parentClass:"reprinted_tips"
}),$($(".popover")[$(".popover").length-1]).css("z-index","9999"),$($(".popover")[$(".popover").length-1]).children(".popover_arrow").css("left","8%"),
s.find(".js_counter").each(function(){
$(this).hasClass("js_author")?new o($(this),{
maxLength:8,
useGBKLength:!0,
GBKBased:!0
}):new o($(this),{
maxLength:10
});
}),s.on("keyup",".js_platform,.js_url,.js_author",function(){
$(this).closest(".frm_controls").find(".fail").hide();
});
}),$(".js_original_cancel").on("click",function(){
$("#js_original");
i.find(".js_original_type").hide().eq(0).show(),i.find(".js_original_content").hide(),
i.find(".js_author").closest(".appmsg_edit_item").eq(0).show(),i.find(".js_reward").checkbox("disabled",!0),
i.find(".js_reward").checkbox("checked",!1),i.find(".js_reward_div").hide(),i.find(".js_reward_wording").val(),
$("#js_pay",i).checkbox("disabled",!0),$("#js_pay",i).checkbox("checked",!1),$(".js_pay_tips",e.$editor).show().text("（只有“禁止转载”的原创文章才可以设置付费阅读）"),
$(".js_pay_setting",i).hide();
}),$("#js_original_detail").on("click",function(){
$(this).parent().toggleClass("open"),$(this).siblings("ul").toggle();
});
var t=!0,n=z.orginal_apply_stat,s=1==z.has_invited_original?"/acct/copyrightapply?action=apply":"/acct/selfapply?action=apply";
s=wx.url(s);
var c=$("#js_original_func_open").closest(".js_original_type"),_=function(){
Cgi.post({
url:"/cgi-bin/appmsg?action=get_original_stat"
},function(e){
if(e.base_resp&&0==e.base_resp.ret){
var i="";
switch(+e.orginal_apply_stat){
case 0:
i="原创声明：未开通";
break;

case 1:
i="原创声明：审核中",c.find(".opt").hide();
break;

case 2:
i="原创声明：申请失败",c.find(".opt").hide();
break;

case 3:
i="原创：未声明",c.find(".opt").html('<a href="javascript:;" onclick="return false;" class="btn btn_default js_original_apply">声明原创</a>').show();
}
c.find(".subtitle").text(i),n=e.orginal_apply_stat;
}
3!=e.orginal_apply_stat&&setTimeout(_,2e3);
});
};
$("#js_original_func_open").on("click",function(){
0==n&&window.open(s),t&&(t=!1,setTimeout(_,2e3));
});
},
_initPay:function(){
var e=this,i=e.$editor,t=e._createPayDialog();
$("#js_pay",i).checkbox({
multi:!0,
onChanged:function(n){
n.checkbox("value")?e._showPayDialog(t):(t.popup("hide"),$(".js_pay_setting",i).hide());
}
}),$(".js_pay_edit",i).on("click",function(){
e._showPayDialog(t);
});
},
_initBan:function(){
var e=this.$editor,i=e.find(".js_url_area"),t=17,n=function(){
var e;
$.each(z.func_ban_info,function(i,n){
n.func_id==t&&(e=n);
});
var n=f.getReason(e.reason_id),s='你的帐号<a href="'+(n.pc_url?n.pc_url:defaultReason.pc_url)+'">'+n.reason_description+"</a>，",o=new Date(1e3*e.unlock_time);
e.ban_time==e.unlock_time?s+="已被永久屏蔽阅读原文功能。":(s+="已被屏蔽阅读原文功能至",s+=o.getFullYear()+"/"+(o.getMonth()+1)+"/"+o.getDate(),
s+="，期间阅读原文将不可用。"),i.find(".js_url_checkbox").attr("disabled",!0).attr("checked",!1).parent().addClass("disabled"),
i.find(".js_url").attr("disabled",!0).parent().addClass("disabled"),i.find(".js_url_ban_wording").html(s);
};
f(z.func_ban_info,"source-url")?z.can_use_appmsg_source_url||i.hide():n();
},
_showPayDialog:function(e){
var i=this,t=i.$editor,n=e.popup("get");
n.find(".js_fee").val($(".js_fee",t).text()),n.find(".js_step_panel").hide().eq(0).show(),
n.find(".js_btn_p").hide(),n.find(".js_btn_p").eq(0).show(),n.find(".js_btn_p").eq(1).show(),
e._step.setStep(1),e.popup("show");
},
_createPayDialog:function(){
var e=this,i=e.$editor,t=$("#tpl_pay").popup({
title:"付费阅读设置",
width:960,
className:"simple align_edge pay_dialog",
autoShow:!1,
data:{},
buttons:[{
text:"取消",
click:function(){
$(".js_pay_setting",i).is(":visible")||$("#js_pay",i).checkbox("checked",!1),this.hide();
}
},{
text:"下一步",
type:"primary",
click:function(){
var t=e.freeUEditor.val(),o=n.find(".js_fee").val();
return""==t?void _.err("免费区域不能为空"):c.rangelength(t,[20,200])?!o||!/^\d*(\.\d+)?$/.test(o)||o.toString().match(/\.\d{3,}/)||.01>o?void _.err("请输入正确的金额"):.01>o?void _.err("金额必须大于零"):o>200?void _.err("金额不能超过200元"):(n.find(".js_content").html(t),
n.find(".js_content_count").text(e.ueditor.getUeditor().getContent().text().length),
n.find(".js_fee_preview").text(parseFloat(o).toFixed(2)),n.find(".js_nickname").text(wx.data.nick_name),
n.find(".js_title").text($.trim($(".js_title",i).val())),n.find(".js_author").text($.trim($(".js_author",i).val())),
n.find(".js_date").text(l().format("YYYY-MM-DD")),n.find(".js_step_panel").hide().eq(1).show(),
n.find(".js_btn_p").hide(),n.find(".js_btn_p").eq(2).show(),n.find(".js_btn_p").eq(3).show(),
n.find(".js_preview").scrollTop(1e8),s.setStep(2),void this.resetPosition()):void _.err("正文字数要多于20字且不能超过200字");
}
},{
text:"上一步",
click:function(){
n.find(".js_step_panel").hide().eq(0).show(),n.find(".js_btn_p").hide(),n.find(".js_btn_p").eq(0).show(),
n.find(".js_btn_p").eq(1).show(),s.setStep(1),this.resetPosition();
}
},{
text:"确定",
type:"primary",
click:function(){
$(".js_pay_setting",i).show().find(".js_fee").text((+n.find(".js_fee").val()).toFixed(2)),
$(".js_pay_tips",i).hide(),this.hide();
}
}],
onClose:function(){
$(".js_pay_setting",i).is(":visible")||$("#js_pay",i).checkbox("checked",!1),t.popup("hide");
},
onShow:function(){
this.resetPosition();
}
}),n=t.popup("get");
n.find(".js_btn_p").eq(2).hide(),n.find(".js_btn_p").eq(3).hide();
var s=new r({
container:n.find(".js_step"),
selected:1,
names:["设置","预览并确认"]
});
return e.freeUEditor=n.find(".js_editor"),new o(e.freeUEditor,{
minLength:20,
maxLength:200
}),n.find(".js_fee").on("input propertychange",function(){
var e=$(this).val();
e&&/^\d*(\.\d+)?$/.test(e)&&!e.toString().match(/\.\d{3,}/)?.01>e?$(this).parent().addClass("error"):e>200?$(this).parent().addClass("error"):$(this).parent().removeClass("error"):$(this).parent().addClass("error");
}),t.popup("resetPosition"),t._step=s,t;
},
_checkOriginal:function(e){
var i=!0,t="checked"==e.find(".js_forIEbug_frm").attr("checked")?1:e.find(".js_reprint_frm:checked").val(),n=e.find(".js_author").val(),s=e.find("#js_original_article_type .dropdown_switch label").text();
n.len()>16||n.len()<=0?(e.find(".js_author_error").show(),i=!1):e.find(".js_author_error").hide();
for(var o=!1,r=0;r<T.length;r++)s==T[r].name&&(o=!0);
if(0==o?(e.find(".js_article_type_error").show(),i=!1):e.find(".js_article_type_error").hide(),
i){
var a=$("#js_original");
a.find(".js_author").text(n),a.find(".js_reprint_frm").val(t),a.find(".js_frm").text(1==t?"允许转载":2==t?"授权转载":"禁止转载"),
a.find(".js_frm").parent().show(),$("#original_type_msg").hide(),a.find(".js_classify").text(s);
}
return i;
},
_updateCurUrl:function(e){
if(e){
window.history&&history.replaceState?history.replaceState(history.state,document.title,wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(e))):1==z.isNew&&(location.href=wx.url("/cgi-bin/appmsg?t=media/appmsg_edit&action=edit&type=10&appmsgid=%s".sprintf(e)));
var i=new RegExp("^"+location.protocol+"//"+location.hostname+"(:8080)?"+location.pathname+"?.*action=(list_card|list_list)");
U.match(i)&&window.opener&&opener.location&&(opener.location=U);
}
},
_bindEvent:function(){
var e=this;
e.$editor.on("click",".js_msg_close",function(){
$(this).closest(".page_msg").hide();
}),e.$editor.find(".js_cover").on("click","img",function(){
var e=$(this).attr("src");
e&&m.show({
imgdata:[{
imgsrc:e
}]
});
});
var i=!1;
$("#js_fold").on("click",function(){
e.ueditor.fireEvent(i?"adjustheight":"foldcontentarea");
}),e.$editor.on("click",".js_unfold_editor",function(){
e.ueditor.fireEvent("adjustheight");
}),e.ueditor.addListener("heightChanged",function(t,n){
60==n?($("#js_fold").children("span").text("展开正文"),e.$editor.find(".js_unfold_editor").show(),
i=!0,$(window).scrollTop($(".js_title").parent().offset().top-$(".main_hd").height()-$(".edui-editor-toolbarbox").height())):($("#js_fold").children("span").text("收起正文"),
e.$editor.find(".js_unfold_editor").hide(),i=!1);
}),$("#js_submit").on("click",function(){
var i=$(this);
$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),e.articleList.save(i,function(t){
i.btn(!0),_.remove(),$("#js_save_success").show().delay(2e3).fadeOut(300),e._updateCurUrl(t.appMsgId);
},!1,t);
}),$("#js_submit_close").on("click",function(){
var i=$(this);
e.articleList.save(i,function(){
_.suc("保存成功"),window.close();
},!1,t);
}),$("#js_send").on("click",function(){
var i=$(this);
$("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),e.articleList.save(i,function(i){
e.articleList.draft.isDropped=!0,e._updateCurUrl(i.appMsgId),location.href=wx.url("/cgi-bin/masssendpage?t=mass/send&type=10&appmsgid=%s".sprintf(i.appMsgId));
},!1,t,void 0,!0);
}),$("#js_preview").on("click",function(){
if($("#js_import_tips,#js_draft_tips").hide(),$(".js_warn").hide(),f(z.func_ban_info,"preview")){
{
$(this);
}
e.articleList.preview(t,function(i){
e._updateCurUrl(i.appMsgId);
});
}
});
var n,s=$(".main_bd"),o=$(".js_aside"),r=$(".tool_area"),a=$(".main_hd").offset().top,d=$(".main_hd").height();
$(window).on("scroll",function(){
var e=$(window).scrollTop(),i=s.offset().top,t=s.height(),c=$(window).height(),_=Math.min(t-e+i-d,c-d);
e>a?($("body").addClass("edit_fixed"),o.height(_).find(".js_scrollbar").css("max-height",_)):($("body").removeClass("edit_fixed"),
o.height(t)),c-_-d<=r.height()?$("body").removeClass("toolbar_unfixed"):$("body").addClass("toolbar_unfixed"),
arguments[1]!==!1&&(!!n&&window.clearTimeout(n),n=window.setTimeout(function(){
$("div.appmsg_edit_box").css({
overflow:"hidden"
}),setTimeout(function(){
$("div.appmsg_edit_box").css({
overflow:""
});
},0);
},200)),setTimeout(function(){
$(".js_scrollbar").scrollbar.updateScrollbars(!0);
});
}).trigger("scroll",!1),$.support.leadingWhitespace&&setInterval(function(){
$(window).trigger("scroll",!1);
},1e3);
var c=$(window).width();
1200>c&&$("#body").width(c).css("margin-left","0"),$(window).on("resize",function(){
var e=$(window).width();
1200>e?$("#body").width(e).css({
"margin-left":"0",
"margin-right":"0"
}).find(".main_hd").width(e-2):$("#body").width(1200).css({
"margin-left":"auto",
"margin-right":"auto"
}).find(".main_hd").width(1198),$(window).trigger("scroll",!1);
}),$(window).on("unload",function(){
I.setData(1),I.send(1);
});
}
}),B=(new M({
app_id:z.app_id,
editor_selector:"#js_appmsg_editor",
appmsg_selector:"#js_appmsg_preview",
appmsg_data:z.appmsg_data
}),e("biz_common/utils/wxgspeedsdk.js"));
B.setBasicTime({
uin:wx&&wx.data&&wx.data.uin||0,
pid:34
}),B.send();
});