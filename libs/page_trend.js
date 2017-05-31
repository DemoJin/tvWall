$(function(){

	var vm = new Vue({
	   el: '.card_queue',
	   data: ''
	});
	   
	function getTableData(url,id,fn){
	  $('.card table').addClass('movePage');
	  $('aside li span').addClass('fadeIn');

	  $.ajax({
	      url:url,
	      type:'GET',
	      cache: false,
	      dataType:'json',
	      success:function(data){
	  
	        vm.$data={
	          thead:data.datas[0].thead,
	          tr:data.datas[0].tr
	        };
	        if (data.waitCount >= 5) {
	          setTimeout(function(){
	            $('.card_queue th:last-child').addClass('active');
	          },0);
	        }else{

	          $('.card_queue th:last-child').removeClass('active');
	        };
	        fn&&fn(data);
	        setTimeout(function(){
	        $('.card table td').addClass('fadeIn');
	        },0);

	      },
	      error:function(){
	          $('.error_tips').show().html('获取数据有误');
	      },
	      complete:function(){
	        setTimeout(function(){
	            $('.card table').removeClass('movePage');
	            // $('.card table td').removeClass('fadeIn');
	            $('aside li span').removeClass('fadeIn');
	        },4000);
	      }
	  });
	};

	function splitStr(str){
	   var curStr=[];
	   str=str.toString();
	   for (var i = 0; i < str.length; i++) {
	       if (str[i]==':') {
	           curStr.push('<b>'+str[i]+'</b>');
	       }else{
	           curStr.push('<i>'+str[i]+'</i>');
	       }
	   }
	   return curStr;
	};

	function configData(data){
		// $('.current_date span').text(data.trends);
		$('.current_date span').text(curData());
		$('.current_tel span').html(splitStr(data.callNums));
		$('.queue_time span').html(splitStr(data.timeString));
		$('.queue_num span').html(splitStr(data.waitCount));
	}

	getTableData('json/table_trend.json','.card_queue',function(data){
	    configData(data);
	});

	setInterval(function(){
	  getTableData('json/table_trend.json','.card_queue',function(data){
	      configData(data);
	  });
	},5000);

	changeHeight();  

});

