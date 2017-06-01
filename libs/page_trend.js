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

	changeHeight();  

	var myChart = echarts.init(document.getElementById('chart'));
	// $.getJSON('http://datas.org.cn/jsonp?filename=json/usdeur.json&callback=?', function (data) {
	// $.getJSON('test.json', function (data) {
	var option = {
	    title : {
	        // text: '电话量趋势',
	    },
	    tooltip : {
	        // trigger: 'axis'
	    },
	    grid: {
	        top:'6%',
	        bottom: '14%',
	        containLabel: true
	    },
	    legend: {
	      show:false,
	        data:[],
	        x:'right',
	        textStyle: {
	          color:'#fff'
	        }
	    },
	    toolbox: {
	        show : false,
	        feature : {
	            mark : {show: true},
	            dataView : {show: true, readOnly: false},
	            magicType : {show: true, type: ['line', 'bar', 'stack', 'tiled']},
	            restore : {show: true},
	            saveAsImage : {show: true}
	        }
	    },
	    calculable : true,
	    xAxis : [
	        {
	            type : 'category',
	            boundaryGap : false,
	            data : [],
	            axisLabel:{
	                // interval: 2
	            },
	            axisLine:{
	                lineStyle:{
	                    color:'#fff',
	                    width:1
	                }
	            }
	        }
	    ],
	    yAxis : [
	        {
	            type : 'value',
	            splitLine:{show: false},
	            axisLine:{
	                lineStyle:{
	                    color:'#fff',
	                    width:1
	                }
	            }
	        }
	    ],
	    series : []
	};

	function getTrendData(fn){
		$('.card_chart li span').addClass('fadeIn');
	    $.ajax({
	        url:'json/echarts.json',
	        type:'GET',
	        cache: false,
	        dataType:'json',
	        beforeSend:function(){
	            $('.card_chart li span').addClass('fadeIn');
	        },
	        success:function(data){
	            myChart.hideLoading();
	            var names=[];
	            var series=[];
	            var xAxis=[];
	            var arrColor1 = ['#ffc600','#57ff00'];
	            var arrColor2 = ['#ffc600','#57ff00'];
	            // 57ff00 fe8574 fc600 01f9fc
	            option.xAxis[0].data=data.xAxis[0].data;
	            var nowDataLen = data["datas"][1].data.length;
	            
	            $.each( data["datas"], function(i, n){

	              // console.log(data["datas"][1].data.length,'--------');
	                names.push(n["name"]);
	                if(n["name"]!="昨日人工请求量"){

	                    series.push({
	                      name:n["name"],
	                      type:'line',
	                      smooth:'none',
	                      symbol:'none',
	                      z:(n["name"]=='人工接听量')?'3':'2',
	                      data:n["data"],
	                      itemStyle:{
	                        normal: {
	                          areaStyle:{
	                            type: 'default',
	                            color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                               offset: 0, color: arrColor1[i] 
	                             }, {
	                               offset: 1, color: arrColor1[i]  
	                             }], false),
	                            opacity: 0.4,
	                            shadowColor: 'rgba(0, 0, 0, 0.5)',
	                            shadowBlur: 10
	                          },
	                          lineStyle:{
	                            color:'rgba(0,0,0,0)',
	                             width:0,
	                          }
	                        }
	                      },
	                      
	                      markPoint : {
	                          itemStyle:{
	                            normal: {
	                              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                                offset: 0, color: 'red' 
	                              }, {
	                                offset: 1, color: '#0036fc' 
	                              }], false)
	                            }
	                          },  
	                          data : [
	                            {name : n["name"], value : n["data"][nowDataLen-1], xAxis: data.xAxis[0].data[nowDataLen-1], yAxis: n["data"][nowDataLen-1]}
	                          ]
	                      }
	                    });
	                }else{
	                    series.push({
	                      name:n["name"],
	                      type:'line',
	                      smooth:'none',
	                      symbol:'none',
	                      z:'1',
	                      data:n["data"],
	                      itemStyle:{
	                        normal: {
	                          areaStyle:{
	                            type: 'default',
	                            color:  new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
	                               // offset: 0, color: '#22c2fd' '01f9fc'
	                               offset: 0, color: '#01f9fc'
	                             }, {
	                               // offset: 1, color: '#0036fc' 
	                               offset: 1, color: '#01f9fc' 
	                             }], false),
	                            opacity: 0.4,
	                            shadowColor: 'rgba(0, 0, 0, 0.5)',
	                            shadowBlur: 10
	                          },
	                          lineStyle:{
	                            color:'rgba(0,0,0,0)',
	                             width:0
	                          }
	                        }
	                      }
	                      
	                    });
	                }

	            });

	            option["legend"]["data"] = names;
	            option["series"]= series;

	            // option.series[1].markPoint.data=[ {name : '人工请求量', value : dataToday[dataToday.length-1], xAxis: data.xAxis[0].data[dataToday.length-1], yAxis: dataToday[dataToday.length-1]}];
	 
	             // myChart.hideLoading();
	             myChart.setOption(option);

	             fn&&fn(data);
	        },
	        error:function(){
	        	myChart.showLoading({
	        	    animation:true,
	        	    text : 'Loading',
	        	    textStyle : {fontSize : 20}
	        	});
	            console.log('获取数据有误');
	        },
	        complete:function(){
	          setTimeout(function(){
	              $('.card_chart li span').removeClass('fadeIn');
	          },4000);
	        }
	    });
	};

	function configTrendData(data){
		$('.res_num span').html(splitStr(data.resNum));
		$('.answer_num span').html(splitStr(data.answerNum));
		$('.yestorday_res_num span').html(splitStr(data.yesResNum));
	}

	getTrendData(function(data){
	    configTrendData(data);
	});

	setInterval(function(){
		getTableData('json/table_trend.json','.card_queue',function(data){
		    configData(data);
		});

		getTrendData(function(data){
		    configTrendData(data);
		});
	},5000);

	setTimeout(function(){
	  // location.href='page_list.html';
	},30000);

});

