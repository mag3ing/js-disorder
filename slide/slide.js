/**
 * Created by mag on 16-6-20.
 */
$(function(){
    var win = $('.win');
    var links = $('.title a');
    console.log(links)
    var float = $('.float');
    var divs = $('.box div');
    var box = $('.win');
    var leftB = $('.leftB');
    var rightB = $('.rightB');
    var num1 = 0; //当前内容的下标
    var num2 = 0;

    win.hover(function(){
        $('.leftB,.rightB').css('display','block');
    },function(){
        $('.leftB,.rightB').css('display','none');
    });
    $('.leftB').click(function(){
        divs.finish();
        float.stop(true);
        var temp = num1;
        num1--;
        if(num1 === -1){
            num1 = 4;
        }
        divs.eq(num1).css("left",-700).animate({left:0});
        divs.eq(temp).animate({left:700});
        links.css("color","#009797");
        float.animate({left:links.eq(num1).position().left});
        links.eq(num1).css("color","#fff");
    });
    $('.rightB').click(function () {
        divs.finish();
        float.stop(true);
        var temp = num1;
        num1++;
        if(num1===5){
            num1 = 0;
        }
        divs.eq(num1).css("left",700).animate({left:0});
        divs.eq(temp).animate({left:-700});
        links.css("color","#009797");
        float.animate({left:links.eq(num1).position().left});
        links.eq(num1).css("color","#fff");
    });
    var autoM = autoMove();
    links.hover(function () {
        clearInterval(autoM);
        divs.finish();
        float.stop(true);
        links.css("color","#009797");
        var that = $(this);
        var lefts = that.position().left;
        float.animate({left: lefts},function(){
            that.css("color","#fff");
        })
        var index = that.index(".title a");
        num2 = index;
        if(num1 === num2){
            return;
        }else if(num1<num2){
            divs.eq(num2).css("left",700).animate({left:0});
            divs.eq(num1).animate({left:-700});
        }else if(num1>num2){
            divs.eq(num2).css("left",-700).animate({left:0});
            divs.eq(num1).animate({left:700});
        }
        num1 = num2;
        num2='';
        console.log(num1,num2)
    },function(){
        autoM = autoMove();
    });
    clear(box);
    clear(leftB);
    clear(rightB);


    function clear(ele){
        ele.hover(function(){
            clearInterval(autoM);
        },function(){
            clearInterval(autoM);
            autoM = autoMove();
        });
    }
    function autoMove() {
        return setInterval(function(){
            $('.rightB').click();
        },2500)
    }
})