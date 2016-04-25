/**
 * Created by mag.mao on 2016/4/25.
 */
var input = [6,5,3,1,8,7,2,4];
function merge_sort(input){
    var inputLength = input.length;
    if(inputLength <= 1){
        return input;
    }
    var left = input.slice(0, inputLength/2);
    var right = input.slice(inputLength/2, inputLength);

    left = merge_sort(left);
    right = merge_sort(right);
    
    var output = merge(left, right);
    return output;
}

function merge(left, right) {
    var result=[];
    var llength = left.length;
    var rlength = right.length;
    console.log(left[0])
    console.log(right[0])
    while(llength > 0 && rlength > 0){
        if(left[0] <= right[0]){
            result.push(left[0]);
        }else{
            result.push(right[0]);
        }
    }
    result.splice(result, result.length, 0, left);
    result.splice(result, result.length, 0, right);
    
    return result;
}

var test = merge_sort(input);
console.log('test: '+test)