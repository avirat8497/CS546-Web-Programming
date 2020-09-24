function checkArray(array){
    if(Array.isArray(array)!== true){
        throw `${array || 'provided variable'} input not an array`;
    }
}

function arraylen(array){
    if(array.length == 0){
        throw `${array || 'array'} array is empty`;
    }
}

function checkNum(array){
    if(!array.some(isNaN)!= true){
        throw `${array || 'array'} array is not a number`;
    }
}

function mean(array){
    checkArray(array);
    arraylen(array);
    checkNum(array);
    var total = 0;
    var n = array.length
    for (var i = 0;i<n;i++){
        var total = total +  array[i];
        
    }
    var average = total / n;
    return average;
}

function medianSquared(array){
    checkArray(array);
    arraylen(array);
    checkNum(array);
    var n = array.length;
    array = array.sort();
    if(n%2 != 0){
        var median = array[n/2];
        return median * median;
    }
    else {
        var median = (array[n-1]/2 + array[n/2]) / 2;
        return median * median;
    }    
}
 function maxElement(array){
    checkArray(array);
    arraylen(array);
    checkNum(array);
    var maxelement = {};
    maxelement[Math.max(...array)] = array.indexOf(Amth,max(...array));
    return maxelement;
 }

 function fill(end, value = "Not Given"){
     if (end === "undefined"){
         end = 0;
     }
     if (end === 0){
         throw 'end value cannot be zero';
     }

     let array = [];
     for (let i = 0;i < end; i++){
         if(value === "Not Given"){
             array.push(i);
         }
         else{
             array.push(value);
         }
     }
     return array;
 }

 function countRepeating(array){
    checkArray(array);
    checkNum(array);
     var counts = {};
     array.forEach(function(x){counts [x] = (counts[x] || 0) + 1;})
    return counts;
    }

function isEqual(array1,array2){
    checkArray(array1);
    checkArray(array2);
    checkNum(array1);
    checkNum(array2);

    if (array1.length != array2.length){
        return false;
    }
    array_1 = array1.sort();
    array_2 = array2.sort();

    for (var i = 0;i<array_1.length;i++){
        if(array_1[i] === array_2[i]){
                return true
            }
        else{
                return false;
            }
        }
}


module.exports = {
    mean,medianSquared,maxElement,fill,countRepeating,isEqual
}

