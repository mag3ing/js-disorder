/**
 * Created by mag on 16-4-2.
 */
var fibonacci = function () {
    var memo = [0,1];
    var fib = function (n) {
        var result = memo[n];
        if(typeof result !== 'number'){
            result = fib(n-1) + fib(n-2);
            memo[n] = result;
        }
        return result;
    };
    return fib;
};
console.time('timer');
for(var i=0; i<10000;i++){
    console.log(fibonacci(i)(i));
}
console.timeEnd('timer');