define("tpl/media/preview/appmsg.html.js",[],function(){
return'<div class="wx_phone_hd">\n    {data.nickName}\n</div>\n<div class="wx_phone_bd">\n    <div class="wx_phone_preview_appmsg appmsg_wap">\n        <div class="rich_media">\n            <div class="rich_media_area_primary">\n                <h2 class="rich_media_title" title="{data.title}">{data.title}</h2>\n                <div class="rich_media_meta_list">\n                    <!-- <span class="rich_media_meta meta_original_tag dn">原创</span>\n                    <a class="rich_media_meta meta_enterprise_tag" href="javascript:;"><img src="{data.img}"></a> -->\n                    <em class="rich_media_meta rich_media_meta_text">{data.time}</em>\n                    <em class="rich_media_meta rich_media_meta_text">{data.author}</em>\n                    <span class="rich_media_meta rich_media_meta_link" title="请发送到手机查看完整效果">{data.nickName}</span>\n                </div>\n                {if (data.show_cover==1 && data.img)}\n                <div class="rich_media_thumb_wrp">\n                    <img src="{data.img}" class="rich_media_thumb" onerror="this.parentNode.removeChild(this)"/>\n                </div>\n                {/if}\n                <div class="rich_media_content">\n                    {=data.content}\n                </div>\n                {if data.sourceurl}\n                <div class="rich_media_tool">\n                    <a class="media_tool_meta meta_primary" href="{data.sourceurl}" target="_blank">阅读原文</a>\n                </div>\n                {/if}\n            </div>\n        </div>\n    </div>\n</div>\n<!--wx_phone_bd-->\n<!--pulgin-->\n<div>\n    <ul class="wx_view_list">\n        <li class="wx_view_item jsPhoneViewLink" data-id="card">图文消息</li>\n        <li class="wx_view_item jsPhoneViewLink selected" data-id="appmsg">消息正文</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="moments">分享到朋友圈</li>\n        <li class="wx_view_item jsPhoneViewLink" data-id="chat">发送给朋友</li>\n    </ul>\n    {if length>1}\n    <ul class="wx_article_crtl">        \n        <li class="crtl_btn crtl_pre_btn {if (index-1)<0}disabled{/if} jsPhoneViewCard" data-index="{index-1}">上一篇</li>        \n        <li class="crtl_btn crtl_next_btn {if (index+1)>=length}disabled{/if} jsPhoneViewCard" data-index="{index+1}">下一篇</li>\n    </ul>\n    {/if}\n    <div class="btn_wx_phone_preview_wrp">\n        <a class="btn btn_default btn_wx_phone_preview jsPhoneViewPub">发送到手机预览</a>\n    </div>\n</div>\n\n';
});define("common/wx/phoneView.js",["tpl/media/preview/layout.html.js","widget/wx_phone_preview/wx_phone_preview.css"],function(t,e){
"use strict";
function i(t){
var e=t.html.split("<!--pulgin-->")[0],i=t.html.split("<!--pulgin-->")[1],p=template.compile(n)({
content:e,
plugin:i
});
this.$dom=$(template.compile(p)(t.data)).appendTo("body"),o(),t.todo&&"function"==typeof t.todo&&t.todo.apply(this,[t.data,t.html]);
var l=this;
this.$dom.find(".jsPhoneViewClose").click(function(){
l.hide();
});
}
function o(){
$("img").each(function(){
$(this).data("src")&&$(this).attr("src",$(this).data("src"));
});
}
{
var n=t("tpl/media/preview/layout.html.js");
t("widget/wx_phone_preview/wx_phone_preview.css");
}
return i.prototype.hide=function(){
this.$dom.hide();
},i.prototype.remove=function(){
this.$dom.move();
},i.prototype.render=function(t,e){
var i=t.split("<!--pulgin-->")[0],o=t.split("<!--pulgin-->")[1];
this.$dom.find(".jsPhoneViewMain").html(template.compile(i)(e)),o&&this.$dom.find(".jsPhoneViewPlugin").html(template.compile(o)(e)).show();
},e.module=i;
});define("resp_types/file_cnt.rt.js",[],function(){
"use strict";
return{
file_cnt_R:{
total:"number",
img_cnt:"number",
voice_cnt:"number",
video_cnt:"number",
app_msg_cnt:"number",
commondity_msg_cnt:"number",
video_msg_cnt:"number",
short_video_cnt:"number",
app_msg_sent_cnt:"number"
}
};
});define("resp_types/base_resp.rt.js",[],function(){
"use strict";
return{
base_resp_R:{
ret_R:"number",
err_msg:"string"
}
};
});define("common/wx/mpEditor/zh_CN.js",["common/wx/mpEditor/editor_all_min.js"],function(e){
"use strict";
e("common/wx/mpEditor/editor_all_min.js"),UE.I18N.zh_CN={
labelMap:{
anchor:"锚点",
undo:"撤销",
redo:"重做",
bold:"加粗",
indent:"首行缩进",
snapscreen:"截图",
italic:"斜体",
underline:"下划线",
strikethrough:"删除线",
subscript:"下标",
fontborder:"字符边框",
superscript:"上标",
formatmatch:"格式刷",
source:"源代码",
blockquote:"引用",
pasteplain:"纯文本粘贴模式",
selectall:"全选",
print:"打印",
preview:"预览",
horizontal:"分隔线",
removeformat:"清除格式",
time:"时间",
date:"日期",
insertrow:"前插入行",
insertcol:"前插入列",
mergeright:"右合并单元格",
mergedown:"下合并单元格",
deleterow:"删除行",
deletecol:"删除列",
splittorows:"拆分成行",
splittocols:"拆分成列",
splittocells:"完全拆分单元格",
mergecells:"合并多个单元格",
deletetable:"删除表格",
cleardoc:"清空文档",
insertparagraphbeforetable:"表格前插入行",
insertcode:"代码语言",
fontfamily:"字体",
fontsize:"字号 10~36px",
paragraph:"段落格式",
edittable:"表格属性",
edittd:"单元格属性",
emotion:"表情",
spechars:"特殊字符",
searchreplace:"查询替换",
map:"Baidu地图",
gmap:"Google地图",
insertvideo:"视频",
help:"帮助",
justifyleft:"居左对齐",
justifyright:"居右对齐",
justifycenter:"居中对齐",
justifyjustify:"两端对齐",
forecolor:"字体颜色",
backcolor:"背景色",
insertorderedlist:"有序列表",
insertunorderedlist:"无序列表",
fullscreen:"全屏",
directionalityltr:"从左向右输入",
directionalityrtl:"从右向左输入",
rowspacingtop:"段前距",
rowspacingbottom:"段后距",
highlightcode:"插入代码",
pagebreak:"分页",
insertframe:"插入Iframe",
imagenone:"默认",
imageleft:"左浮动",
imageright:"右浮动",
attachment:"附件",
imagecenter:"居中",
wordimage:"图片转存",
lineheight:"行间距",
edittip:"编辑提示",
customstyle:"自定义标题",
autotypeset:"自动排版",
webapp:"百度应用",
touppercase:"字母大写",
tolowercase:"字母小写",
background:"背景",
template:"模板",
scrawl:"涂鸦",
music:"音乐",
inserttable:"插入表格"
},
insertorderedlist:{
num:"1,2,3...",
num1:"1),2),3)...",
num2:"(1),(2),(3)...",
cn:"一,二,三....",
cn1:"一),二),三)....",
cn2:"(一),(二),(三)....",
decimal:"1,2,3...",
"lower-alpha":"a,b,c...",
"lower-roman":"i,ii,iii...",
"upper-alpha":"A,B,C...",
"upper-roman":"I,II,III..."
},
insertunorderedlist:{
circle:"○ 大圆圈",
disc:"● 小黑点",
square:"■ 小方块 ",
dash:"— 破折号",
dot:" 。 小圆圈"
},
paragraph:{
p:"段落",
h1:"标题 1",
h2:"标题 2",
h3:"标题 3",
h4:"标题 4",
h5:"标题 5",
h6:"标题 6"
},
fontfamily:{
songti:'"宋体"',
kaiti:'"楷体"',
heiti:'"黑体"',
lishu:'"隶书"',
yahei:'"微软雅黑"',
andaleMono:"andale mono",
arial:"arial",
arialBlack:"arial black",
comicSansMs:"comic sans ms",
impact:"impact",
timesNewRoman:"times new roman"
},
insertcode:{
as3:"ActionScript3",
bash:"Bash/Shell",
cpp:"C/C++",
css:"Css",
cf:"CodeFunction",
"c#":"C#",
delphi:"Delphi",
diff:"Diff",
erlang:"Erlang",
groovy:"Groovy",
html:"Html",
java:"Java",
jfx:"JavaFx",
js:"Javascript",
pl:"Perl",
php:"Php",
plain:"Plain Text",
ps:"PowerShell",
python:"Python",
ruby:"Ruby",
scala:"Scala",
sql:"Sql",
vb:"Vb",
xml:"Xml"
},
customstyle:{
tc:"标题居中",
tl:"标题居左",
im:"强调",
hi:"明显强调"
},
elementPathTip:"元素路径",
wordCountTip:"字数统计",
wordCountMsg:"当前已输入{#count}个字符, 您还可以输入{#leave}个字符。 ",
wordOverFlowMsg:'<span style="color:red;">字数超出最大允许值，服务器可能拒绝保存！</span>',
ok:"确认",
cancel:"取消",
closeDialog:"关闭对话框",
tableDrag:"表格拖动必须引入uiUtils.js文件！",
autofloatMsg:"工具栏浮动依赖编辑器UI，您首先需要引入UI文件!",
snapScreen_plugin:{
browserMsg:"仅支持IE浏览器！",
callBackErrorMsg:"服务器返回数据有误，请检查配置项之后重试。",
uploadErrorMsg:"截图上传失败，请检查服务器端环境! "
},
confirmClear:"确定清空当前文档么？",
contextMenu:{
"delete":"删除",
selectall:"全选",
deletecode:"删除代码",
cleardoc:"清空文档",
confirmclear:"确定清空当前文档么？",
unlink:"删除超链接",
paragraph:"段落格式",
edittable:"表格属性",
aligntd:"单元格对齐方式",
aligntable:"表格对齐方式",
tableleft:"左浮动",
tablecenter:"居中显示",
tableright:"右浮动",
edittd:"单元格属性",
justifyleft:"左对齐",
justifyright:"右对齐",
justifycenter:"居中对齐",
justifyjustify:"两端对齐",
table:"表格",
inserttable:"插入表格",
deletetable:"删除表格",
insertparagraphbefore:"前插入段落",
insertparagraphafter:"后插入段落",
deleterow:"删除当前行",
deletecol:"删除当前列",
insertrow:"前插入行",
insertcol:"左插入列",
insertrownext:"后插入行",
insertcolnext:"右插入列",
insertcaption:"插入表格名称",
deletecaption:"删除表格名称",
inserttitle:"插入表格标题行",
deletetitle:"删除表格标题行",
averageDiseRow:"平均分布各行",
averageDisCol:"平均分布各列",
mergeright:"向右合并",
mergeleft:"向左合并",
mergedown:"向下合并",
mergecells:"合并单元格",
splittocells:"完全拆分单元格",
splittocols:"拆分成列",
splittorows:"拆分成行",
tablesort:"表格排序",
reversecurrent:"逆序当前",
orderbyasc:"按ASCII字符升序",
reversebyasc:"按ASCII字符降序",
orderbynum:"按数值大小升序",
reversebynum:"按数值大小降序",
borderbk:"边框底纹",
setcolor:"表格隔行变色",
unsetcolor:"取消表格隔行变色",
setbackground:"选区背景隔行",
unsetbackground:"取消选区背景",
redandblue:"红蓝相间",
threecolorgradient:"三色渐变",
copy:"复制(Ctrl + c)",
copymsg:'请使用 "Ctrl + c"执行复制操作',
paste:"粘贴(Ctrl + v)",
pastemsg:'请使用 "Ctrl + v"执行粘贴操作',
highlightcode:"插入代码"
},
anthorMsg:"链接",
clearColor:"清空颜色",
standardColor:"标准颜色",
themeColor:"主题颜色",
basicColor:"基本色",
recentlyColor:"最近使用颜色",
property:"属性",
"default":"默认",
modify:"修改",
justifyleft:"左对齐",
justifyright:"右对齐",
justifycenter:"居中",
justify:"默认",
clear:"清除",
anchorMsg:"锚点",
"delete":"删除",
clickToUpload:"点击上传",
unset:"尚未设置语言文件",
t_row:"行",
t_col:"列",
pasteOpt:"粘贴选项",
pasteSourceFormat:"保留源格式",
tagFormat:"只保留标签",
pasteTextFormat:"只保留文本",
autoTypeSet:{
mergeLine:"合并空行",
delLine:"清除空行",
removeFormat:"清除格式",
indent:"首行缩进",
alignment:"对齐方式",
imageFloat:"图片浮动",
removeFontsize:"清除字号",
removeFontFamily:"清除字体",
removeHtml:"清除冗余HTML代码",
pasteFilter:"粘贴过滤",
run:"执行"
},
background:{
"static":{
lang_background_normal:"背景设置",
lang_background_local:"本地图片",
lang_background_set:"选项",
lang_background_none:"无",
lang_background_color:"颜色设置",
lang_background_netimg:"网络图片",
lang_background_align:"对齐方式",
lang_background_position:"精确定位",
repeatType:{
options:["居中","横向重复","纵向重复","平铺","自定义"]
}
},
noUploadImage:"当前未上传过任何图片！",
toggleSelect:"单击可切换选中状态\n原图尺寸: "
},
insertimage:{
"static":{
lang_tab_remote:"远程图片",
lang_tab_local:"本地上传",
lang_tab_imgManager:"在线管理",
lang_tab_imgSearch:"图片搜索",
lang_input_url:"地 址：",
lang_input_width:"宽 度：",
lang_input_height:"高 度：",
lang_input_border:"边 框：",
lang_input_vhspace:"边 距：",
lang_input_title:"描 述：",
lang_input_remoteAlign:"对 齐：",
lang_imgLoading:"　图片加载中……",
lock:{
title:"锁定宽高比例"
},
imgType:{
title:"图片类型",
options:["新闻","壁纸","表情","头像"]
},
imgSearchTxt:{
value:"请输入搜索关键词"
},
imgSearchBtn:{
value:"百度一下"
},
imgSearchReset:{
value:"清空搜索"
},
upload:{
style:"background: url(upload.png);"
},
duiqi:{
style:"background: url(imglabel.png) -12px 2px no-repeat;"
},
lang_savePath:"选择保存目录"
},
netError:"网络链接错误，请检查配置后重试！",
noUploadImage:"当前未上传过任何图片！",
imageLoading:"图片加载中，请稍后……",
tryAgain:" :( ，抱歉，没有找到图片！请重试一次！",
toggleSelect:"单击可切换选中状态\n原图尺寸: ",
searchInitInfo:"请输入搜索关键词",
numError:"请输入正确的长度或者宽度值！例如：123，400",
fileType:"图片",
imageUrlError:"不允许的图片格式或者图片域！",
imageLoadError:"图片加载失败！请检查链接地址或网络状态！",
flashError:"Flash插件初始化失败，请更新您的FlashPlayer版本之后重试！",
floatDefault:"默认",
floatLeft:"左浮动",
floatRight:"右浮动",
floatCenter:"居中",
flashI18n:{}
},
webapp:{
tip1:"本功能由百度APP提供，如看到此页面，请各位站长首先申请百度APPKey!",
tip2:"申请完成之后请至ueditor.config.js中配置获得的appkey! ",
applyFor:"点此申请",
anthorApi:"百度API"
},
template:{
"static":{
lang_template_bkcolor:"背景颜色",
lang_template_clear:"保留原有内容",
lang_template_select:"选择模板"
},
blank:"空白文档",
blog:"博客文章",
resume:"个人简历",
richText:"图文混排",
sciPapers:"科技论文"
},
scrawl:{
"static":{
lang_input_previousStep:"上一步",
lang_input_nextsStep:"下一步",
lang_input_clear:"清空",
lang_input_addPic:"添加背景",
lang_input_ScalePic:"缩放背景",
lang_input_removePic:"删除背景",
J_imgTxt:{
title:"添加背景图片"
}
},
noScarwl:"尚未作画，白纸一张~",
scrawlUpLoading:"涂鸦上传中,别急哦~",
continueBtn:"继续",
imageError:"糟糕，图片读取失败了！",
backgroundUploading:"背景图片上传中,别急哦~"
},
music:{
"static":{
lang_input_tips:"输入歌手/歌曲/专辑，搜索您感兴趣的音乐！",
J_searchBtn:{
value:"搜索歌曲"
}
},
emptyTxt:"未搜索到相关音乐结果，请换一个关键词试试。",
chapter:"歌曲",
singer:"歌手",
special:"专辑",
listenTest:"试听"
},
anchor:{
"static":{
lang_input_anchorName:"锚点名字："
}
},
attachment:{
"static":{
lang_input_fileStatus:" 当前未上传文件",
startUpload:{
style:"background:url(upload.png) no-repeat;"
}
},
browseFiles:"文件浏览…",
uploadSuccess:"上传成功!",
delSuccessFile:"从成功队列中移除",
delFailSaveFile:"移除保存失败文件",
statusPrompt:" 个文件已上传！ ",
flashVersionError:"当前Flash版本过低，请更新FlashPlayer后重试！",
flashLoadingError:"Flash加载失败!请检查路径或网络状态",
fileUploadReady:"等待上传……",
delUploadQueue:"从上传队列中移除",
limitPrompt1:"单次不能选择超过",
limitPrompt2:"个文件！请重新选择！",
delFailFile:"移除失败文件",
fileSizeLimit:"文件大小超出限制！",
emptyFile:"空文件无法上传！",
fileTypeError:"文件类型错误！",
unknownError:"未知错误！",
fileUploading:"上传中，请等待……",
cancelUpload:"取消上传",
netError:"网络错误",
failUpload:"上传失败!",
serverIOError:"服务器IO错误！",
noAuthority:"无权限！",
fileNumLimit:"上传个数限制",
failCheck:"验证失败，本次上传被跳过！",
fileCanceling:"取消中，请等待……",
stopUploading:"上传已停止……"
},
highlightcode:{
"static":{
lang_input_selectLang:"选择语言"
},
importCode:"请输入代码"
},
emotion:{
"static":{
lang_input_choice:"精选",
lang_input_Tuzki:"兔斯基",
lang_input_BOBO:"BOBO",
lang_input_lvdouwa:"绿豆蛙",
lang_input_babyCat:"baby猫",
lang_input_bubble:"泡泡",
lang_input_youa:"有啊"
}
},
gmap:{
"static":{
lang_input_address:"地址",
lang_input_search:"搜索",
address:{
value:"北京"
}
},
searchError:"无法定位到该地址!"
},
help:{
"static":{
lang_input_about:"关于UEditor",
lang_input_shortcuts:"快捷键",
lang_input_version:"版本:1.2.6",
lang_input_introduction:"UEditor是由百度web前端研发部开发的所见即所得富文本web编辑器，具有轻量，可定制，注重用户体验等特点。开源基于BSD协议，允许自由使用和修改代码。",
lang_Txt_shortcuts:"快捷键",
lang_Txt_func:"功能",
lang_Txt_bold:"给选中字设置为加粗",
lang_Txt_copy:"复制选中内容",
lang_Txt_cut:"剪切选中内容",
lang_Txt_Paste:"粘贴",
lang_Txt_undo:"重新执行上次操作",
lang_Txt_redo:"撤销上一次操作",
lang_Txt_italic:"给选中字设置为斜体",
lang_Txt_underline:"给选中字加下划线",
lang_Txt_selectAll:"全部选中",
lang_Txt_visualEnter:"软回车",
lang_Txt_fullscreen:"全屏"
}
},
insertframe:{
"static":{
lang_input_address:"地址：",
lang_input_width:"宽度：",
lang_input_height:"高度：",
lang_input_isScroll:"允许滚动条：",
lang_input_frameborder:"显示框架边框：",
lang_input_alignMode:"对齐方式：",
align:{
title:"对齐方式",
options:["默认","左对齐","右对齐","居中"]
}
},
enterAddress:"请输入地址!"
},
map:{
"static":{
lang_city:"城市",
lang_address:"地址",
city:{
value:"北京"
},
lang_search:"搜索"
},
cityMsg:"请选择城市",
errorMsg:"抱歉，找不到该位置！"
},
searchreplace:{
"static":{
lang_tab_search:"查找",
lang_tab_replace:"替换",
lang_search1:"查找",
lang_search2:"查找",
lang_replace:"替换",
lang_searchReg:"支持正则表达式，添加前后斜杠标示为正则表达式，例如“/表达式/”",
lang_searchReg1:"支持正则表达式，添加前后斜杠标示为正则表达式，例如“/表达式/”",
lang_case_sensitive1:"区分大小写",
lang_case_sensitive2:"区分大小写",
nextFindBtn:{
value:"下一个"
},
preFindBtn:{
value:"上一个"
},
nextReplaceBtn:{
value:"下一个"
},
preReplaceBtn:{
value:"上一个"
},
repalceBtn:{
value:"替换"
},
repalceAllBtn:{
value:"全部替换"
}
},
getEnd:"已经搜索到文章末尾！",
getStart:"已经搜索到文章头部",
countMsg:"总共替换了{#count}处！"
},
snapscreen:{
"static":{
lang_showMsg:"截图功能需要首先安装UEditor截图插件！ ",
lang_download:"点此下载",
lang_step1:"第一步，下载UEditor截图插件并运行安装。",
lang_step2:"第二不，插件安装完成后即可使用，如不生效，请重启浏览器后再试！"
}
},
insertvideo:{
"static":{
lang_tab_insertV:"插入视频",
lang_video_url:"视频网址",
lang_video_size:"视频尺寸",
lang_videoW:"宽度",
lang_videoH:"高度",
lang_alignment:"对齐方式",
videoSearchTxt:{
value:"请输入搜索关键字！"
},
videoType:{
options:["全部","热门","娱乐","搞笑","体育","科技","综艺"]
},
videoSearchBtn:{
value:"百度一下"
},
videoSearchReset:{
value:"清空结果"
}
},
numError:"请输入正确的数值，如123,400",
floatLeft:"左浮动",
floatRight:"右浮动",
"default":"默认",
block:"独占一行",
urlError:"输入的视频地址有误，请检查后再试！",
loading:" &nbsp;视频加载中，请等待……",
clickToSelect:"点击选中",
goToSource:"访问源视频",
noVideo:" &nbsp; &nbsp;抱歉，找不到对应的视频，请重试！"
},
spechars:{
"static":{},
tsfh:"特殊字符",
lmsz:"罗马字符",
szfh:"数学字符",
rwfh:"日文字符",
xlzm:"希腊字母",
ewzm:"俄文字符",
pyzm:"拼音字母",
zyzf:"注音及其他"
},
edittable:{
"static":{
lang_tableStyle:"表格样式",
lang_insertCaption:"添加表格标题行",
lang_insertTitle:"添加表格名称行",
lang_orderbycontent:"使表格内容可排序",
lang_tableSize:"自动调整表格尺寸",
lang_autoSizeContent:"按表格文字自适应",
lang_autoSizePage:"按页面宽度自适应",
lang_example:"示例",
lang_borderStyle:"表格边框",
lang_color:"颜色:"
},
captionName:"表格名称",
titleName:"标题",
cellsName:"内容"
},
edittip:{
"static":{
lang_delRow:"删除整行",
lang_delCol:"删除整列"
}
},
edittd:{
"static":{
lang_tdBkColor:"背景颜色:"
}
},
formula:{
"static":{}
},
wordimage:{
"static":{
lang_resave:"转存步骤",
uploadBtn:{
src:"upload.png",
alt:"上传"
},
clipboard:{
style:"background: url(copy.png) -153px -1px no-repeat;"
},
lang_step:"1、点击顶部复制按钮，将地址复制到剪贴板；2、点击添加照片按钮，在弹出的对话框中使用Ctrl+V粘贴地址；3、点击打开后选择图片上传流程。"
},
fileType:"图片 ",
flashError:"FLASH初始化失败，请检查FLASH插件是否正确安装！ ",
netError:"网络连接错误，请重试！ ",
copySuccess:"图片地址已经复制！ ",
flashI18n:{}
}
};
});define("tpl/media/videocard.html.js",[],function(){
return'<div id="wxVideoBox{id}" class="richvideo with_msg_box Js_videomsg" {if video_ori_status == 1 && is_new_video && status == 3}data-original="1"{else}data-original="0"{/if} data-vid={video_id}>\n    <div class="richvideo_content" style="z-index: 0">\n        <h4 class="title">\n            {if video_ori_status == 1 && is_new_video && (status == 3 || for_selection)}\n            <i class="icon_tag_default original"></i>\n            {else if video_ori_status == 2 && is_new_video && (status == 3 || for_selection)}\n            <i class="icon_tag_default republish"></i>\n            {/if}\n            {title}\n        </h4>\n        <div class="video_info">\n            <em class="time">{time}</em>\n            <em class="res">{from}</em>\n        </div>\n        <div class="video_extra_info" data-seq="{seq}">\n            <img class="video_thumb" src="{if !cover}{if !!multi_item}{each multi_item as value}{value.cover}{/each}{/if}{else}{cover}{/if}" alt="">\n            {if is_new_video && status != 4}\n            <span class="video_length">{duration}</span>\n            {/if}\n            {if status == 0 || (status == 3 && video_ori_status == 0 && !before_original_video)}\n            <div class="status_mask">\n            <span class="status_msg">\n                审核中            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 1}\n            <div class="status_mask">\n            <span class="status_msg">\n                资料不完整            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 2}\n            <div class="status_mask">\n            <span class="status_msg mini_tips icon_after">\n                审核不通过                <i class="icon_mini_tips ask_white js_fail_reason" data-seq="{seq}"></i>\n            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 3 && applyori == 1 && ((video_ori_status == 3 && (ori_fail_reason == 1 || ori_fail_reason == 3 || ori_fail_reason == 5) && is_new_video) || video_ori_status == 2) }\n            <div class="status_mask">\n            <span class="status_msg">\n                原创声明失败<i class="icon_mini_tips ask_white js_declare_fail" data-seq="{seq}" data-url="{url}" data-ori="{video_ori_status}" data-reason="{ori_fail_reason}" data-vid="{content}" data-name="{hit_nickname}"></i>\n            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 3 && is_new_video} \n            <div class="play_mask">\n                <i class="icon_video_play"> </i>\n                <span class="vm_box"></span>\n            </div>\n\n            {else if status == 4}\n            <div class="status_mask">\n            <span class="status_msg">\n                转码中            </span>\n            <span class="vm_box"></span>\n            </div>\n            {else if status == 5}\n            <div class="status_mask">\n            <span class="status_msg">\n                转码失败<i class="icon_mini_tips ask_white js_fail_code" data-seq="{seq}"></i>\n            </span>\n            <span class="vm_box"></span>\n            </div>\n            {/if}\n        </div>\n        <div class="video_desc" data-digest="{digest}">{digest}</div>\n    </div>\n\n    {if for_operation}\n    <div class="richvideo_opr">\n        <ul class="grid_line" >\n            {if is_new_video}\n            <li class="richvideo_opr_item grid_item size1of2">\n            <a class="js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-seq="{seq}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of2 no_extra">\n            <a class="js_del js_tooltip" href="javascript:void(0);" data-id="{app_id}" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n            {else if is_new_video==0 && video_url!=""} <!-- 微信视频 -->\n            <li class="richvideo_opr_item grid_item size1of3">\n            <a class="js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-seq="{seq}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of3">\n                <a {if for_transfer}href="javascript:;" class="js_tooltip js_download"{else}href="{video_download_url}" class="js_tooltip"{/if} data-tooltip="下载">\n                    <i class="icon18_common download_gray">下载</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of3 no_extra">\n            <a class="js_del js_tooltip" href="javascript:void(0);" data-id="{app_id}" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n            {else } <!-- 微视视频 -->\n            <li class="richvideo_opr_item grid_item size1of2">\n            <a class="js_tooltip" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&lang=zh_CN&token={token}&type=15&appmsgid={app_id}" data-seq="{seq}" data-tooltip="编辑">\n                    <i class="icon18_common edit_gray">编辑</i>\n                </a>\n            </li>\n            <li class="richvideo_opr_item grid_item size1of2 no_extra">\n            <a class="js_del js_tooltip" href="javascript:void(0);" data-id="{app_id}" data-tooltip="删除">\n                    <i class="icon18_common del_gray">删除</i>\n                </a>\n            </li>\n            {/if}\n        </ul>\n    </div>\n    {/if}\n    {if for_selection && !(status == 3 && video_ori_status == 0 && !before_original_video)}\n    <div class="richvideo_mask"></div>\n    <i class="icon_card_selected">已选择</i>\n    {/if}\n</div>\n<div class="richvideo_msg_box">\n    <p class="mini_tips warn" style="display: none;">该视频由于版权问题无法在微信中播放</p>\n</div>';
});define("tpl/media/dialog/videomsg_layout.html.js",[],function(){
return'<div class="dialog_media_container">\n    <div class="sub_title_bar in_dialog">\n        <div class="title_tab js_videotab"></div>\n        <div class="search_bar dn">\n            <span class="frm_input_box search with_del append">\n                <a class="del_btn" href="javascript:"><i class="icon_search_del"></i>&nbsp;</a>\n                <a id="msgSearchBtn" href="javascript:" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n                <input id="msgSearchInput" type="text" placeholder="关键字" value="" class="frm_input">\n            </span>\n        </div>\n        <div class="richvideo_create js_video_create">\n            <a class="btn btn_primary btn_add" target="_blank" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&type=15&lang=zh_CN&token={token}">\n                <i class="icon14_common add_white"></i>新建视频            </a>\n        </div>\n    </div>\n    <div class="js_video_status js_video_content dn">\n        <div class="richvideo_list media_dialog" id="js_videomsg_list">\n            <div class="richvideo_col"><div class="inner"></div></div>&nbsp;\n            <div class="richvideo_col"><div class="inner"></div></div>\n        </div>\n    </div>\n    <div class="js_video_status js_video_tencent link_search_video_box dn js_video_search">\n        <div class="video">\n            <div class="frm_control_group">\n                <label for="" class="frm_label">视频/图文网址</label>\n                <div class="frm_controls">\n                    <span class="frm_input_box">\n                        <input type="text" class="frm_input js_video_txurl js_video_url" placeholder="支持插入微信公众号文章链接、视频详情页链接和腾讯视频链接">\n                    </span>\n                    <p class="frm_msg fail js_video_url_tip">只支持已发布的微信公众号链接、视频详情页链接和腾讯视频链接</p>\n                </div>\n            </div>\n			<!-- <div class="video_preview js_video_preview"></div> --><!-- 原来的js_video_preview去掉改成和素材库、小视频一样的方式通过richvideo_list插入视频@lulu -->\n		</div>\n        <div class="richvideo_list media_dialog" id="js_video_search_list">\n            <div class="richvideo_col"><div class="inner"></div></div><!-- 这里能否控制如果是腾讯视频的链接则只显示一个richvideo_col，如需支持多视频才显示两个richvideo_col？@lulu\n            肯定可以啊！ @radeonwu -->\n            <div class="richvideo_col"><div class="inner"></div></div>\n            <!--<div class="pagination_wrp pageNavigator js_video_tencent_pagebar"></div>--><!-- 如果有多视频的情况下才显示分页，视频搜索这里用单独的分页组件，不要使用外面的分页（js_pagebar） @lulu-->\n            <!--图文消息最多出现3个视频，这里不需要分页 @radeonwu-->\n        </div>\n    </div>\n    <div class="js_video_status js_video_loading">\n        <i class="icon_loading_small white">loading...</i>\n    </div>\n    <div class="js_video_status js_video_none dn">\n        <div class="no_media_wrp">\n            <p class="empty_tips js_empty_tips"></p>\n            <!--\n            <div class="richvideo_create js_video_create">\n                <a class="" target="_blank" href="/cgi-bin/appmsg?t=media/videomsg_edit&action=video_edit&type=15&lang=zh_CN&token={token}">\n                    <i class="icon_richvideo_small"></i><strong>新建视频消息</strong>\n                </a>\n            </div>\n            -->\n        </div>\n        <span class="vm_box"></span>\n    </div>\n    \n    <div class="pagination_wrp pageNavigator js_pagebar"></div><!-- 在视频搜索的tab下不要使用这个分页组件 @lulu-->\n</div>\n\n';
});define("common/wx/media/video.js",["widget/media/richvideo.css","widget/media.css","biz_web/lib/video.js","common/wx/Cgi.js","common/wx/time.js","common/qq/Class.js","biz_web/lib/swfobject.js","tpl/media/video.html.js","tpl/media/simple_videomsg.html.js","tpl/media/wxvideo.html.js","tpl/media/videomsg.html.js"],function(e){
"use strict";
e("widget/media/richvideo.css"),e("widget/media.css");
var i,t=e("biz_web/lib/video.js"),o=e("common/wx/Cgi.js"),d=e("common/wx/time.js"),s=e("common/qq/Class.js"),n=e("biz_web/lib/swfobject.js"),a=e("tpl/media/video.html.js"),r=wx.T,l=wx.data.t,m=document,c=!!n.ua.pv[0],f=m.createElement("video"),u=navigator.userAgent.toLowerCase(),v=/msie/.test(u),p=/firefox/.test(u);
t.options.flash.swf=wx.path.video;
var h={
id:"",
source:"",
type:"",
file_id:""
},w=5e3,g=function(e){
if(e.video_url){
{
var i="tmp"+(1e5*Math.random()|0);
$('<video id="%s"></video>'.sprintf(i)).appendTo("body");
}
t("#"+i).ready(function(){
$("#"+i).hide();
var t=this;
this.on("error",function(){
t.dispose(),e.dom.find(".loading_tips").show(),e.video_url="",setTimeout(function(){
g(e);
},w);
}),this.on("loadedmetadata",function(){
t.dispose(),$(e.selector).children().remove(),e.for_transfer=!1,e.digest=e.digest?e.digest.html(!1):"",
new _(e);
});
var o=e.video_url;
t.src(f.canPlayType?o:[{
type:"video/x-flv",
src:o+"&trans=1"
}]),t.play();
});
}else o.get({
url:wx.url("/cgi-bin/appmsg?action=get_video_url&videoid=%s".sprintf(e.video_id)),
error:function(){
setTimeout(function(){
g(e);
},w);
}
},function(i){
e.video_url=i.video_url||"",e.video_download_url=i.video_download_url||"",setTimeout(function(){
g(e);
},w);
});
},_=s.declare({
init:function(t){
var o=this;
if($(t.selector).data("opt",t),t=$.extend(!0,{},h,t),o.id=t.id,o.source=t.source,
o.file_id=t.file_id,o.type=t.type,o.video_url=t.video_url,o.tpl=t.tpl,o.ff_must_flash=t.ff_must_flash,
t.src=o.getVideoURL(),t.token=l||wx.data.t,t.time=t.create_time?d.timeFormat(t.create_time):"",
t.digest=t.digest?t.digest.replace(/<br.*>/g,"\n").html():"",t.for_network="string"==typeof t.video_url?!t.video_url:!t.content,
!t.file_id&&t.multi_item&&t.multi_item.length>0){
var s=t.multi_item[0];
s&&s.cover&&(t.img_url=s.cover);
}
i=e(t.sent?"tpl/media/simple_videomsg.html.js":21==+t.type||9==+t.type||11==+t.type?"tpl/media/wxvideo.html.js":"tpl/media/videomsg.html.js");
var n=$("videomsg"==t.tpl?r(i,t):r(a,t));
o.dom=t.dom=$(t.selector).append(n),"videomsg"==t.tpl&&t.for_transfer&&g(t,o.dom),
o.dom.find(".video_desc").length&&o.dom.find(".video_desc").html(o.dom.find(".video_desc").attr("data-digest").replace(/\n/g,"<br>")),
o.dom.find(".wxVideoScreenshot").on("click",function(){
o.dom.find(".mediaContent").css({
height:"auto"
}),o.play(t.play);
}),o.dom.find(".wxNetworkVideo").on("click",function(){
window.open($(this).attr("data-contenturl"));
}),o.dom.find(".video_switch").click(function(){
o.dom.find(".mediaContent").css({
height:"104px"
}),o.pause(t.pause);
});
},
getVideoURL:function(){
var e=this.source,i=this.id,t=(this.msg_id||"",this.file_id);
return e&&(e="&source="+e),this.video_url||"/cgi-bin/getvideodata?msgid={msgid}&fileid={fileid}&token={token}{source}".format({
msgid:i,
fileid:t,
source:e,
token:wx.data.t
});
},
canPlayType:function(){
this.type;
return!f.canPlayType&&!c;
},
play:function(e){
var i=this;
if(i.canPlayType())return void alert("您当前浏览器无法播放视频，请安装Flash插件/更换Chrome浏览器");
var o=this.id,d=this.player;
if(d)return $("#wxVideoBox"+o).addClass("wxVideoPlaying").find(".wxVideoPlayContent").show(),
d.play(),e&&e(this);
var s=i.getVideoURL();
$("#wxVideoBox"+o).addClass("wxVideoPlaying").find(".wxVideoPlayContent").show();
var n="videomsg"==i.tpl?{
width:"100%",
height:"100%"
}:{};
t("#wxVideo"+o,n).ready(function(){
d=this;
var t=0;
return d.on("fullscreenchange",function(){
t?($("#wxVideoPlayer"+o).css({
overflow:"hidden",
zoom:"1"
}),$("#wxVideoBox"+o).css({
"z-index":"0"
})):($("#wxVideoPlayer"+o).css({
overflow:"visible",
zoom:"normal"
}),$("#wxVideoBox"+o).css({
"z-index":"1"
})),t=~t;
}),d.on("ended",function(){
this.currentTime(0);
}),d.src(v||!f.canPlayType||i.ff_must_flash&&p?[{
type:"video/x-flv",
src:s+"&trans=1"
}]:s),d.play(),i.player=d,e&&e(this);
});
},
pause:function(e){
var i=this.player;
i&&i.pause(),$("#wxVideoBox"+this.id).removeClass("wxVideoPlaying").find(".wxVideoPlayContent").hide(),
e&&e(this);
}
});
return _;
});define("common/wx/top.js",["tpl/top.html.js"],function(t,e,a){
"use strict";
function i(t,e,a){
return this.dom=$(t),this.dom.addClass("title_tab"),e&&"string"==typeof e&&(e=[{
name:"",
url:"javascript:;",
className:"selected"
}]),$.each(e,function(t,e){
e.url=e.url&&[e.url,wx.data.param].join("")||"javascript:;";
}),this.dom.html(template.compile(n)({
data:e
})),a&&a.render&&"function"==typeof a.render?$.each(this.dom.find("li"),function(t,i){
a.render.apply($(i),[e[t],a&&a.data]);
}):this.dom.html(template.compile(n)({
data:e
})),this.dom.on("click",".top_item",function(){
$(this).addClass("selected").siblings().removeClass("selected");
}),this;
}
var n=t("tpl/top.html.js"),s=wx.acl;
i.prototype.selected=function(t){
this.dom.find(".js_top").removeClass("selected"),"number"==typeof t?this.dom.find(".js_top:eq("+t+")").addClass("selected"):this.dom.find(".js_top[data-id="+t+"]").addClass("selected");
},i.DATA={
setting:[{
id:"info",
name:"帐号详情",
url:"/cgi-bin/settingpage?t=setting/index&action=index"
},{
id:"function",
name:"功能设置",
url:"/cgi-bin/settingpage?t=setting/function&action=function"
}],
mass:[{
id:"send",
name:"新建群发消息",
url:"/cgi-bin/masssendpage?t=mass/send"
},{
id:"jurisdiction",
name:"授权申请",
acl:s&&s.msg_acl&&s.msg_acl.can_use_reprintapply_list,
url:"/cgi-bin/copyrightlib?action=reprint_article&begin=0&count=10&auth_status=0&lang=zh_CN"
},{
id:"list",
name:"已发送",
url:"/cgi-bin/masssendpage?t=mass/list&action=history&begin=0&count=10"
}],
message:[{
id:"total",
name:"全部消息",
url:"/cgi-bin/message?t=message/list&count=20&day=7"
},{
id:"star",
name:"已收藏的消息",
url:"/cgi-bin/message?t=message/list&count=20&action=star"
},{
id:"search",
name:"搜索结果"
}],
media:[{
id:"media11",
name:"商品消息",
acl:s&&s.material_acl&&s.material_acl.can_commodity_app_msg,
url:"/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list&type=11&action=list"
},{
id:"media10",
name:"图文消息",
acl:s&&s.material_acl&&s.material_acl.can_app_msg,
url:"/cgi-bin/appmsg?begin=0&count=10&t=media/appmsg_list2&type=10&action=list_card"
},{
id:"media2",
name:"图片",
acl:s&&s.material_acl&&s.material_acl.can_image_msg,
url:"/cgi-bin/filepage?type=2&begin=0&count=12&t=media/img_list"
},{
id:"media3",
name:"语音",
acl:s&&s.material_acl&&s.material_acl.can_voice_msg,
url:"/cgi-bin/filepage?type=3&begin=0&count=21&t=media/list"
},{
id:"media15",
name:"视频",
acl:s&&s.material_acl&&s.material_acl.can_video_msg,
url:"/cgi-bin/appmsg?begin=0&count=9&t=media/video_list&action=list_video&type=15"
}],
business:[{
id:"overview",
name:"数据概览",
url:"/merchant/business?t=business/overview&action=overview"
},{
id:"order",
name:"订单流水",
url:"/merchant/business?t=business/order&action=order"
},{
id:"info",
name:"商户信息",
url:"/merchant/business?t=business/info&action=info"
},{
id:"test",
name:"支付测试",
url:"/merchant/business?t=business/whitelist&action=whitelist"
},{
id:"rights",
name:"维权仲裁",
url:"/merchant/shop_rights?t=business/rights_list&action=batchgetpayfeedback"
},{
id:"course",
name:"使用教程",
url:"/merchant/business?t=business/course&action=course"
}],
user:[{
id:"useradmin",
name:"已关注",
url:"/cgi-bin/contactmanage?t=user/index&pagesize=10&pageidx=0&type=0&groupid=0"
}],
statistics:{
user:[{
id:"summary",
name:"用户增长",
url:"/misc/pluginloginpage?action=stat_user_summary&pluginid=luopan&t=statistics/index"
},{
id:"attr",
name:"用户属性",
url:"/misc/pluginloginpage?action=stat_user_attr&pluginid=luopan&t=statistics/index"
}],
article:[{
id:"detail",
name:"图文群发",
url:"/misc/pluginloginpage?action=stat_article_detail&pluginid=luopan&t=statistics/index"
},{
id:"analyse",
name:"图文统计",
url:"/misc/pluginloginpage?action=stat_article_analyse&pluginid=luopan&t=statistics/index"
}],
message:[{
id:"message",
name:"消息分析",
url:"/misc/pluginloginpage?action=stat_message&pluginid=luopan&t=statistics/index"
},{
id:"key",
name:"消息关键词",
url:"/misc/pluginloginpage?action=ctr_keyword&pluginid=luopan&t=statistics/index"
}],
"interface":[{
id:"interface",
name:"接口分析",
url:"/misc/pluginloginpage?action=stat_interface&pluginid=luopan&t=statistics/index"
}]
},
notification:[{
id:"notification",
name:"通知中心",
url:"/cgi-bin/frame?t=notification/index_frame"
}],
templateMessage:[{
id:"my_template",
name:"我的模板",
url:"/advanced/tmplmsg?action=list&t=tmplmsg/list"
},{
id:"template_message",
name:"模板库",
url:"/advanced/tmplmsg?action=tmpl_store&t=tmplmsg/store"
}],
assistant:[{
id:"mphelper",
name:"公众号助手",
url:"/misc/assistant?t=setting/mphelper&action=mphelper"
},{
id:"warning",
name:"接口告警",
url:"/misc/assistant?t=setting/warning&action=warning"
}],
shop:[{
id:"shopoverview",
name:"小店概况",
url:"/merchant/merchantstat?t=shop/overview&action=getoverview"
},{
id:"addGoods",
name:"添加商品",
url:"/merchant/goods?type=11&t=shop/precreate",
target:"_blank"
},{
id:"goodsManagement",
name:"商品管理",
url:"/merchant/goodsgroup?t=shop/category&type=1"
},{
id:"shelfManagement",
name:"货架管理",
url:"/merchant/shelf?status=0&action=get_shelflist&t=shop/myshelf&offset=0&count=5"
},{
id:"orderManagement",
name:"订单管理",
url:"/merchant/productorder?action=getlist&t=shop/order_list&last_days=30&count=10&offset=0"
},{
id:"deliverylist",
name:"运费模板管理",
url:"/merchant/delivery?action=getlist&t=shop/delivery_list"
},{
id:"images",
name:"图片库",
url:"/merchant/goodsimage?action=getimage&t=shop/shop_img&count=20&offset=0"
}],
adClient:[{
id:"adclientreport",
name:"报表统计",
url:"/merchant/ad_client_report?t=ad_system/client_report&action=list"
},{
id:"adclientmanage",
name:"广告管理",
url:"/merchant/advert?t=ad_system/promotion_list&action=get_advert_count"
},{
id:"materialmanage",
name:"推广页管理",
url:"/merchant/ad_material?t=material/list&action=get_material_list"
},{
id:"adclientpay",
name:"财务管理",
url:"/cgi-bin/frame?nav=10026&t=ad_system/host_frame"
},{
id:"adservice",
name:"广告服务商",
acl:s&&s.ad_system&&s.ad_system.can_use_sp,
url:"/cgi-bin/frame?nav=10026&t=ad_system/client_service_frame"
}],
adHost:[{
id:"adhostreport",
name:"报表统计",
url:"/merchant/ad_host_report?t=ad_system/host_report"
},{
id:"adhostmanage",
name:"流量管理",
url:"/merchant/ad_host_manage?t=ad_system/host_manage"
},{
id:"adhostpay",
name:"财务管理",
url:"/merchant/ad_host_pay?action=ad_host_pay&t=ad_system/host_pay"
}],
advanced:[{
id:"dev",
name:"日志查询",
url:"/advanced/advanced?action=log_home"
},{
id:"group-alert",
name:"接口报警",
url:"/advanced/advanced?action=alarm&t=advanced/alarm"
}],
cardticket:[{
id:"cardmgr",
name:"卡券管理",
url:"/merchant/electroniccardmgr?action=batch&t=cardticket/batch_card"
},{
id:"permission",
name:"卡券核销",
url:"/merchant/carduse?action=listchecker&t=cardticket/permission"
},{
id:"carduse",
name:"核销记录",
url:"/merchant/carduserecord?action=listrecord&t=cardticket/carduse_record"
},{
id:"cardreport",
name:"数据报表",
url:"/merchant/ecardreport?action=overviewpage&t=cardticket/overviewpage"
}],
infringement:[{
id:"infringement",
name:"我要投诉",
url:"/acct/infringement?action=getmanual&t=infringement/manual&type=1"
},{
id:"antiinfringement",
name:"我要申诉",
url:"/acct/infringement?action=getmanual&t=infringement/manual&type=2"
},{
id:"list",
name:"提交记录",
url:"/acct/infringement?action=getlist&t=infringement/ingringement_list&type=1&begin=0&count=10"
}],
scan:[{
id:"overview",
name:"数据概况",
url:"/merchant/scandataoverview?action=keydata"
},{
id:"product_list",
name:"商品管理",
url:"/merchant/scanproductlist?action=list&page=1&status=1"
},{
id:"firmcat_list",
name:"资质管理",
url:"/merchant/scanqualification?action=firmcatpage"
}],
rumor:[{
id:"list",
name:"谣言池",
url:"/misc/rumor?action=rumorlist&t=rumor/list"
},{
id:"result",
name:"辟谣数据",
url:"/misc/rumor?action=summarylist&t=rumor/result"
}],
reward:[{
id:"list",
name:"数据概况",
url:"/merchant/rewardstat?action=getoverview&t=reward/overview"
},{
id:"setting",
name:"赞赏设置",
url:"/merchant/reward?action=rewardsetting"
}],
discuss:[{
id:"list_latest",
name:"留言列表",
url:"/misc/appmsgcomment?action=list_latest_comment&begin=0&count=10&mp_version=7"
},{
id:"index",
name:"文章管理",
url:"/misc/appmsgcomment?action=list_app_msg&begin=0&count=10"
}],
search:[{
id:"search",
name:"搜索",
url:"/advanced/componentsearch?action=search"
},{
id:"authorized",
name:"已添加",
url:"/cgi-bin/component_unauthorize?action=list&t=service/auth_plugins"
}],
kf:[{
id:"account",
name:"账号管理",
url:"/misc/kf?t=services/list&action=list"
},{
id:"state",
name:"客服数据",
url:"/misc/kf?t=services/kf_stat&action=getstatpage"
},{
id:"media",
name:"客服素材",
url:"/misc/kf?t=services/kf-public-text&action=publicreplypage"
}],
ibeacon:[{
id:"deviceManagement",
name:"设备管理",
url:"/merchant/beacongetdevices?action=list"
},{
id:"pageManagement",
name:"页面管理",
url:"/merchant/beaconlistpage?action=list&need_dc=1"
},{
id:"dataReport",
name:"数据报表",
url:"/merchant/beaconstatsummary?action=list"
}]
},s&&s.ad_system&&s.ad_system.can_use_new_ad&&(i.DATA.adClient[0].url="/cgi-bin/frame?nav=10026&t=ad_system/client_report_frame",
i.DATA.adClient[1].url="/cgi-bin/frame?nav=10026&t=ad_system/promotion_list_frame"),
s&&s.merchant_acl&&s.merchant_acl.can_use_account_manage&&i.DATA.adClient.push({
id:"adclientaccountmanage",
name:"账户管理",
acl:s&&s.ad_system&&s.ad_system.can_use_account_manage,
url:"/cgi-bin/frame?nav=10026&t=ad_system/account_frame"
}),s&&s.merchant_acl&&s.merchant_acl.can_use_pay_tmpl&&i.DATA.templateMessage.push({
id:"template_pay_list",
name:"支付模板消息",
url:"/advanced/tmplmsg?action=pay_list&t=tmplmsg/payment"
}),i.RENDER={
setting:function(t,e){
"meeting"==t.id&&15!=e.role&&this.remove();
},
message:function(t,e){
"search"!=t.id||e&&"search"==e.action||this.remove();
},
assistant:function(t,e){
"warning"!=t.id||e&&0!=e.have_service_package||this.remove();
},
reward:function(t,e){
"invite"!=t.id||e&&0!=e.invite_authority||this.remove();
}
},a.exports=i;
});define("tpl/shop/shopDialogItem.html.js",[],function(){
return'{each goods as item}\n<!-- 选中往.wx_wx_shopcard_item加.selected -->\n<li class="wx_shopcard tj_item js_item" data-pid="{item.product_id}"  data-thumb="{item.base_attr.img_info[0]}"  data-name="{item.base_attr.name}"  data-price="{(item.price/100).toFixed(2)}"  data-ori_price="{(item.base_attr.ori_price/100).toFixed(2)}" >\n    <img class="wx_shopcard_thumb" src="{item.base_attr.img_info[0]}" alt="{item.base_attr.name}">\n    <div class="wx_shopcard_content">\n        <div class="wx_shopcard_title">{item.base_attr.name}</div>\n        <div class="wx_shopcard_extra_info">\n            <div class="wx_shopcard_price">&yen;{(item.price/100).toFixed(2)}</div>\n            <div class="wx_shopcard_price_old">&yen;{(item.base_attr.ori_price/100).toFixed(2)}</div>\n        </div>\n    </div>\n    <div class="card_mask_global shopcard_mask">\n        <i class="icon_card_selected_global"></i>\n    </div>\n</li>\n{/each}\n';
});define("tpl/shop/shopDialog.html.js",[],function(){
return'<div>\n    <div class="global_mod float_layout shopcard_box_hd">\n        <span class="global_info frm_input_box search with_del append" style="display:none;">\n            <a class="del_btn" onclick="return false" href="javascript:;" id="searchCloseBt"><i class="icon_search_del"></i>&nbsp;</a>\n            <a onclick="return false" id="searchBt" href="javascript:;" class="frm_input_append"><i class="icon16_common search_gray">搜索</i>&nbsp;</a>\n            <input id="keyInput" type="text" placeholder="商品名称/编号" value="" class="frm_input">\n        </span>\n        <div class="global_extra">\n            <a target="__blank" href="/merchant/goods?type=11&t=shop/precreate&token={token}&lang={lang}" class="btn btn_default btn_add">\n                <i class="icon14_common add_gray"></i>\n                添加商品\n            </a>\n        </div>\n    </div>\n    <div class="shopcard_box_bd">\n        <div class="js_shoploading media_list_tips_wrp">\n            <i class="icon_loading_small white">loading...</i>\n            <span class="vm_box"></span>\n        </div>\n        <ul class="js_shopcard_list wx_shopcard_list" style="display:none;">\n        </ul>\n        <div class="js_pagination pagination_wrp"></div>\n    </div>\n</div>\n';
});define("cardticket/add/member_info_flag.js",[],function(){
"use strict";
function n(n,f){
for(var i=0;i<n.length;i++)if(n[i]===f)return i;
return-1;
}
var f=[1,4096,2,4,8,0,32,64,128,256,512,1024,2048];
return{
sys_info:["手机号","姓名","性别","所在地区","生日","身份证号","邮箱","详细地址","学历","职业","行业","收入","爱好"],
info_flag:f,
flag2info:function(n){
for(var f=[],i=0;i<this.info_flag.length;i++){
var r=this.info_flag[i];
r&n&&f.push(this.sys_info[i]);
}
return f;
},
info2flag:function(f){
for(var i=0,r=0;r<f.length;r++){
var t=n(this.sys_info,f[r]);
t>=0&&(i|=this.info_flag[t]);
}
return i;
}
};
});define("tpl/cardticket/send_card.html.js",[],function(){
return'<div>\n	<div class="wrp_processor js_step_container"></div>\n	<div class="first_step js_step_content js_step1">\n	    <!--选择投放方式弹窗-->\n		<div class="js_card_list"></div>\n		<!--选择投放方式弹窗 end-->\n	</div>\n	<div class="second_step js_step_content js_step2">\n	</div>\n</div>';
});define("cardticket/send_card_table.js",["common/wx/Tips.js","common/wx/Cgi.js","common/wx/Step.js","common/wx/pagebar.js","cardticket/parse_data.js","biz_web/ui/dropdown.js","cardticket/store_cgi.js","cardticket/common_template_helper.js","cardticket/create_card_select.js","tpl/cardticket/card_table.html.js","tpl/cardticket/card_preview.html.js","page/cardticket/dialog_choose_card.css","biz_web/ui/checkbox.js","cardticket/card_quantity.js"],function(t){
"use strict";
function e(t){
{
var e;
t.opt;
}
e=t.$container,e.find(".js_card_list").html(k({
loading:!0
}));
}
function a(t,a){
var r=a.opt,c=$.extend(!0,{
action:"batch",
begin:t.begin,
count:t.count,
tag_filter:r.tag_filter,
filter_out_expired_card:r.filter_out_expired_card
},r.param);
1==r.view_mode&&(c.sub_merchant_id=0),w=!0,e(a),o.get({
url:r.url||"/merchant/electroniccardmgr",
data:c,
complete:function(){
w=!1;
}
},function(t){
if(0==t.base_resp.ret){
var e=t,c=t.card_dispatching_list;
t="string"==typeof t.batch_card?$.parseJSON(t.batch_card):t.batch_card,r.data=t.card_list;
var n=l.parse_cardlist(r.data);
if(b=n.card_cache,r.data=n.card_list,r.cache_data=b,r.acl={
is_can_shake:e.is_can_shake_card,
is_can_use_sns_card:e.is_can_use_sns_card,
is_intercomm_card:e.is_intercomm_card,
is_can_card_friend:e.is_can_use_sns_card
},c)try{
var s=wx.parseJSON(e,"card_dispatching_list");
if(s){
s=s.card_dispatching_list;
for(var _=0;_<s.length;_++){
var d=s[_],u=b[d.card_id];
u&&(u.cansend=!d.is_dispatching);
}
}
}catch(p){}
if(r.pageInfo.total_count=t.total_num,e.biz_quota_json){
var h=wx.parseJSON(e,"biz_quota_json");
h=f.parse_assistsend_quota(h.quota_list),a._quota=h;
}
i(r.pageInfo,a);
}else o.handleRet(t,{
id:64463,
key:33,
url:"/merchant/electroniccardmgr"
});
});
}
function i(t,e,a){
var i,_=e.opt;
if(_.payflag=_.param.flag,i=e.$container,a){
var o=i.find(".js_select");
return o.each(function(e){
e>=t.begin&&e<t.begin+t.count?$(this).closest("tr").show():$(this).closest("tr").hide();
}),e.pagebar=null,s(_.pageInfo,e),void(e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a));
}
if(_.data&&"undefined"!=typeof _.sub_merchant_id)for(var d=0;d<_.data.length;d++)_.sub_merchant_id?_.data[d].sub_merchant_id!=_.sub_merchant_id&&(_.data[d].is_sub_merchant_disabled=!0):_.data[d].sub_merchant_id&&(_.data[d].is_sub_merchant_disabled=!0);
i.find(".js_card_list").html(k(_));
var l=_.defaultValues,o=i.find(".js_select");
l.length&&o.each(function(){
for(var t=$(this),e=0;e<l.length;e++)if(l[e]==t.attr("data-id")){
t.prop("checked",!0);
break;
}
}),e.select_card_checkbox=o.checkbox({
onChanged:function(){
if(_.multi){
var t=0;
o.each(function(){
$(this).prop("checked")&&t++;
}),$(".js_selectcount",i).text(t);
}
}
}),e.pagebar=null,s(_.pageInfo,e),c(e),n(e),r(e);
var u,p=[];
1==_.sns_card_type?u=o.filter(".js_select_disabled_1"):2==_.sns_card_type&&(u=o.filter(".js_select_disabled_2")),
u&&(u.each(function(){
p.push($(this).val());
}),e.select_card_checkbox.disable(p)),$(".js_add_card_link",i).click(function(){
return new h({
ispay:_.payflag,
is_sns_card:window.wx_is_can_use_sns_card
}),e.opt.hidePopup&&e.opt.hidePopup(),!1;
}),e.opt.getDataComplete&&e.opt.getDataComplete.call(e,a);
}
function r(t){
var e=t.opt;
if("2"!=e.sns_card_type){
var i=[];
1==e.sns_card_type?i=[{
name:"全部卡券",
value:"friends,0"
}]:0==e.sns_card_type&&(i=[{
name:"全部卡券",
value:""
}],e.acl.is_can_card_friend&&i.push({
name:"朋友共享的券",
value:"friends,1"
})),e.acl.is_can_shake&&i.push({
name:"摇一摇",
value:"shake,1"
}),e.acl.is_intercomm_card;
var r=t.base_tag_filter?"|":"",c={};
if(c[t.base_tag_filter+r+"task,1"]="互通",c[t.base_tag_filter+r+"shake,1"]="摇一摇",c[t.base_tag_filter+r+"friends,1"]="朋友的券",
i.length>1){
new u({
container:$(".js_filter_tag",t.$container),
label:c[e.tag_filter]||"全部卡券",
data:i,
callback:function(i){
var r=t.base_tag_filter+(t.base_tag_filter&&i?"|"+i:i);
r!=e.tag_filter&&(e.tag_filter=r,a(e.pageInfo,t));
}
});
}
}
}
function c(t){
function e(e){
var i=$.trim(c.val());
(!e||e&&wx.isHotkey(e,"enter"))&&(n.param.keyword=i,a(n.pageInfo,t));
}
var i=t.$container,r=$(".js_search",i),c=$(".js_keyword",i),n=t.opt;
r.click(function(){
e();
}),c.keyup(function(t){
e(t);
}),c.val(n.param.keyword);
}
function n(t){
var e=t.$container,a=e.find(".js_modify_quantity");
a.each(function(){
var e=$(this),a=1*e.attr("data-new")||0;
new y({
container:e,
mode:"fixed",
cache_card:t.opt.cache_data,
setquantity:a?!0:!1,
max_sku_for_eachcard:t._quota&&t._quota.max_sku||1e4,
quantityChange:function(t,a){
var i=b[t];
if(i){
if(i.pay_info.is_swipe_card)return i.pay_info.swipe_card_status=1,void e.hide();
i.quantity=this.opt.setquantity?i.quantity+a:a,e.attr("data-new",1),i.isnew=!0,this.opt.setquantity=!0,
$("#js_ct_tr_"+t).find(".js_sendcard_quantity").text(i.quantity);
}
}
});
});
}
function s(t,e){
var r=t.total_count,c=e.$container;
if(t.count&&r>t.count){
var n=t.begin/t.count;
e.pagebar=new d({
container:$(".js_pager",c),
first:!1,
last:!1,
midRange:5,
initShowPage:n+1,
perPage:t.count,
totalItemsNum:r,
callback:function(r){
if(w)return!1;
var c=r.currentPage;
return c!=n+1&&(t.begin=(c-1)*t.count,e.opt.hasdata&&e.opt.data?i(t,e,!0):a(t,e)),
e.opt.pageChanged&&e.opt.pageChanged.call(e),!0;
}
});
}
}
var _=t("common/wx/Tips.js"),o=t("common/wx/Cgi.js"),d=(t("common/wx/Step.js"),t("common/wx/pagebar.js")),l=t("cardticket/parse_data.js"),u=t("biz_web/ui/dropdown.js"),p=t("cardticket/store_cgi.js"),f=t("cardticket/common_template_helper.js"),h=t("cardticket/create_card_select.js"),m={
multi:!1,
pageInfo:{
begin:0,
count:5,
total_count:0
},
param:{
keyword:"",
status:"3|6",
flag:2
},
neednew:!0,
noexpire:!0,
editquantity:!0,
onHide:$.noop,
selectComplete:$.noop,
data:null,
hasdata:!1,
maxcount:10,
sns_card_type:1,
defaultValues:[],
url:"",
removeOnHide:!0,
source:"",
has_sendout:!1,
acl:{},
view_mode:0,
sub_merchant_id:void 0,
filter_out_expired_card:1
},g=t("tpl/cardticket/card_table.html.js"),b=(template.compile(t("tpl/cardticket/card_preview.html.js")),
{});
t("page/cardticket/dialog_choose_card.css"),t("biz_web/ui/checkbox.js");
var v=function(t){
this.opt=$.extend(!0,{},m,t),this.opt.tag_filter=0==this.opt.sns_card_type?"":2==this.opt.sns_card_type?"friends,1":"friends,0",
this.init();
},k=template.compile(g),w=!1,y=t("cardticket/card_quantity.js");
return v.prototype={
_html:g,
init:function(){
var t=this.opt,e=this;
if(this.$container=$(t.container),e.base_tag_filter="",2==t.view_mode&&(e.base_tag_filter="sub_merchant,1",
t.tag_filter=t.tag_filter?e.base_tag_filter+"|"+t.tag_filter:e.base_tag_filter),
t.hasdata&&t.data){
t.pageInfo.total_count=t.data.length,b={};
for(var r=0;r<t.data.length;r++){
var c=t.data[r];
b[c.id]=c;
}
i(t.pageInfo,this);
}else a(t.pageInfo,this);
},
show:function(){
this.$container.show();
},
select:function(){
if(!w){
var t=this,e=this.opt,a=t.select_card_checkbox.values()[0],i=this.$container,r=b[a];
if(!a||!r)return void _.err("请选择卡券");
if(!e.neednew||!r.pay_info.is_swipe_card||0==r.pay_info.swipe_card_status||0!=r.quantity){
if(e.multi)for(var c=t.select_card_checkbox.values(),n=0;n<c.length;n++){
var s=b[c[n]];
if(e.neednew&&(!s.isnew||0==s.quantity))return void _.err("卡券库存不能为0，请先设置库存再投放");
}else if(e.neednew&&(!r.isnew||0==r.quantity))return _.err("卡券库存不能为0，请先设置库存再投放"),
void setTimeout(function(){
var t=i.find("input[data-id="+a+"]");
$(t.closest("tr").find(".js_modify_quantity")[0]).click();
},50);
if(!e.multi&&e.noexpire&&r.is_expire)return void _.err(r.is_sns_card?"卡券已过期":"卡券已过期，无法投放，请到卡券详情去延长有效期再投放");
if(e.multi&&e.noexpire)for(var c=t.select_card_checkbox.values(),n=0;n<c.length;n++){
var s=b[c[n]];
if(s.is_expire)return void _.err("不能选择已过期的卡券，请先到卡券详情去延长有效期");
}
var c=t.select_card_checkbox.values();
return c.length>e.maxcount?void _.err("最多只能选择%s个卡券".sprintf(e.maxcount)):2!=e.sns_card_type||r.is_sns_card?1==e.sns_card_type&&r.is_sns_card?void _.err("朋友的券只能进行社交投放, 请重新选择"):"undefined"!=typeof e.sub_merchant_id&&r.is_sub_merchant_disabled?void _.err("不支持赠送其他商户的“朋友的券”，请重新选择。"):void p.canSendCard({
card_id:a,
success:function(a){
if(a===!1)_.err("没有“审核通过”的门店。确认有至少一个“审核通过”的门店后可进行投放。");else if(a===!0){
var i=t.select_card_checkbox.values(),r=e.multi?i:i,c=[];
if(e.multi)for(var n=0;n<r.length;n++)b[r[n]].cardid=b[r[n]].id,c.push(b[r[n]]);else c=b[r],
c.cardid=b[r].id;
e.selectComplete&&e.selectComplete(c,0);
}
}
}):void _.err("朋友的券才能进行社交投放, 请重新选择");
}
switch(r.pay_info.swipe_card_status){
case 1:
_.err("添加库存暂未生效，待商户审核完成");
break;

case 3:
_.err("请先激活本券");
break;

case 2:
case 4:
_.err("卡券库存不能为0，请先设置库存再投放");
}
}
},
isLoading:function(){
return w;
},
hide:function(){
this.$container.hide();
},
destroy:function(){
this.$container.remove();
}
},v;
});