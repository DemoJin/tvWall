/*
*creat by jqc
*/
$(function(){
	//获取当前高度
	$('body,.container').height(document.documentElement.clientHeight);	

	//展厅介绍
	$('.introduce_btn').click(function(){
		var dataHtml = '<div class="view_introduce"><p class="introduce_txt">一些文字介绍内容<br />内容</p></div>';
		$('.container').addClass('bg_blur');
		//弹窗
		layer.open({
		  type: 1,
		  shade: false,
		  title: false, //不显示标题
		  skin: 'layui-layer-rim', //加上边框
		  area: ['xx%', 'auto'], //宽高
		  content: dataHtml,
		  cancel:function(){
		  	$('.container').removeClass('bg_blur');
		  }
		});
	});

	//图文点击
	

});
	

//获取子窗口高度
function curHeight(){
	// var main = $(window.parent.document).find("iframe");
	// var thisHeight = $(document).height();
	// main.height(thisHeight);

	var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
	parent.layer.iframeAuto(index); //子窗口自适应高度
};

//自适应高度
function changeHeight(){
	$('body,.container').height(document.documentElement.clientHeight);	
};

window.onresize=function(){  
     changeHeight();  
}; 


