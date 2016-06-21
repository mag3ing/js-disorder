/**
 * Created by mag on 16-6-20.
 */
$(function(){
    var win = $('.win');
    var links = $('.title a');
    var float = $('.float');
    var divs = $('.box div');
    var num1 = 0; //当前内容的下标
    var num2 = 0;

    win.hover(function(){
        $('.leftB,.rightB').css('display','block');
    },function(){
        $('.leftB,.rightB').css('display','none');
    });
    $('.leftB').click(function(){
        divs.finish();
    });
})