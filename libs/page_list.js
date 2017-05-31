$(function(){

    var vm1 = new Vue({
      el: '.card_situation',
      data: ''
    });

    var vm2 = new Vue({
      el: '.card_overview',
      data: ''
    });

    function getTableData(url,id,fn){
        $('.card table').addClass('movePage');
        $('aside li span').addClass('fadeIn');
        var vueObj = {
            '.card_situation':vm1,
            '.card_overview':vm2
        };
        $.ajax({
            url:url,
            type:'GET',
            cache: false,
            dataType:'json',
            success:function(data){
               
                vueObj[id].$data = {
                    thead:data.datas[0].thead,
                    tr:data.datas[0].tr
                };
                fn&&fn(data);
                setTimeout(function(){
                $('.card table td').addClass('fadeIn');
                },0);
            },
            error:function(){
                $('p.error_tips').show().html('获取数据有误');
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
        var curStr = [];
        for (var i = 0; i < str.length; i++) {
            curStr.push('<i>' + str[i] + '</i>');
        }
        return curStr;
    };

    function configData(data){
        $('.current_date span').text(curData());
        $('.current_tel span').html(splitStr(data.curTel));
        $('.pickup_num span').html(splitStr(data.pickupNum).concat('%'));
    }

    getTableData('json/table_situation.json','.card_situation',function(data){                   
        configData(data);
    });
    getTableData('json/table_overview.json','.card_overview');

    setInterval(function(){
        getTableData('json/table_situation.json','.card_situation',function(data){                        
            configData(data);
        });
        getTableData('json/table_overview.json','.card_overview');

    },5000); 

    setTimeout(function(){
      location.href = 'page_trend.html';
    },30000);

    changeHeight(); 
});
 
