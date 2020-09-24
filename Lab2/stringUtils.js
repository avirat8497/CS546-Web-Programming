function checkUndef(string){
    if (string == undefined){
        throw`${string || "String"} not entered`;
    }
}

function checkStr(string){
    if(typeof string !="string"){
        throw `${string || "provided variable"} is not a string`;
    }
}
function stringlen(string){
    if(string.length == 0){
        throw `${string || 'string'} string is empty`;
    }
}

function camelCase(string){
    checkStr(string);
    stringlen(string);
    checkUndef(string);
    return string.replace(/(?:^\w|[A-Z]|\b\w)/g, 
    function(word, index)
    {
        return index === 0 ? word.toLowerCase() : word.toUpperCase();
    }).replace(/\s+/g, '');

}

function replaceChar(string){
    checkStr(string);
    stringlen(string);
    checkUndef(string);
    let chararr = string.split("");
    let first = string[0];
    let symbol = ["*","$"];
    var i = 0;
    for (let j =1;j<chararr.length; j++ ){
        if (chararr[j] === first){
            chararr[j] = symbol[i];
            i++;
        }
        if(i === 2) i = 0;
    }
    let result = chararr.join("");
    return result;

}



function mashUp(string_1,string_2){
    checkStr(string_1);
    stringlen(string_1);
    checkUndef(string_1);
    checkStr(string_2);
    stringlen(string_2);
    checkUndef(string_2);


    if (string_1.length < 2 || string_2 <2){
        throw`one of the two strings is less than length two`;
    }
    let word_1 = string_2.slice(0,2) + string_1.slice(2);
    let word_2 = string_1.slice(0,2) + string_2.slice(2);

    return word_1 + "" + word_2;
    
}

module.exports = {
camelCase, replaceChar,mashUp
}