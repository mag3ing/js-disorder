/**
 * Created by mag on 16-3-27.
 */

var add = function (a, b) {
    if(typeof a !== 'number' || typeof b !== 'number'){
        throw {     //throw语句会中断函数的执行，并且抛出一个exception对象，该对象包含一个用来识别异常类型的name属性，和一个描述性的message属性。可以添加其他属性，该exception对象将被传递到一个try语句的catch从句。
            name: 'error',
            msg: '参数不是数字'
        };
    }
    return a + b;
};

var test = function() {
    try{
        add('mag'); //如果出错，将抛出异常，也就是上面的exception对象 
    }catch(e){
        console.log(e.name + ':' + e.msg); //这里可以输出异常错误信息。可根据不同的name中的错误做不同的处理。
    }
};

test();