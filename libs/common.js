/*
*creat by DemoJin
*/
$(function(){
	changeHeight();
});

//自适应高度
function changeHeight(){
	$('body,.container').height(document.documentElement.clientHeight);	
};

window.onresize = function(){  
     changeHeight();  
}; 

function curData(){
	var myDate = new Date();
	myDate.getYear(); //获取当前年份(2位)
	myDate.getFullYear(); //获取完整的年份(4位,1970-????)
	myDate.getMonth(); //获取当前月份(0-11,0代表1月)
	myDate.getDate(); //获取当前日(1-31)
	myDate.getDay(); //获取当前星期X(0-6,0代表星期天)
	myDate.getTime(); //获取当前时间(从1970.1.1开始的毫秒数)
	myDate.getHours(); //获取当前小时数(0-23)
	myDate.getMinutes(); //获取当前分钟数(0-59)
	myDate.getSeconds(); //获取当前秒数(0-59)
	myDate.getMilliseconds(); //获取当前毫秒数(0-999)
	myDate.toLocaleDateString(); //获取当前日期
	myDate.toLocaleTimeString(); //获取当前时间
	myDate.toLocaleString( ); //获取日期与时间

	var resultDate = myDate.getFullYear() + '-' + FormatDate(myDate.getMonth() + 1) + '-' + FormatDate(myDate.getDate()) + ' ' + FormatDate(myDate.getHours()) + ':' + FormatDate(myDate.getMinutes()) + ':' + FormatDate(myDate.getSeconds());

	return resultDate;
}

function FormatDate(curD){
	return (curD < 10 ? '0' + curD : curD);
}
