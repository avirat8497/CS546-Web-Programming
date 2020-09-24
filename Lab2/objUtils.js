function checkObj(object){
    if(typeof(object)!=='object') 
    {
        throw `${object || "provided variable"} is not an object`;
}
}
function checkMin(...args){
    if(args.lenght < 2)
    {
        throw `Minimum 2 objects required`;
    }
}

function checkUndef(...args){
    if(args == undefined){
        throw `Value not entered`;
    }
}

function makeArrays(array){
    checkMin(array);
    let result = [];
    array.forEach(object => {
        checkObj(object);
        Object.keys(object).forEach(key =>{
            result.push([key,object[key]])

        });
    });
    return result;
}

function isDeepEqual(object1,object2){
    checkObj(object1);
    checkObj(object2);
    checkMin(object1);
    checkMin(object2);
    checkUndef(object1);
    checkUndef(object2);

    if (Object.keys(object1).length !== Object.keys(object2).length){
        return false;
    }
    for (let key of Object.keys(object1)) {
        if(typeof(object1[key]) === 'object'){
            return isDeepEqual(object1[key],object2[key]);
        }
        if (object1[key] !== object2[key]){
            return false;
        }
    };
    return true;
}

function computeObject(object, fion){
    checkObj(object);
    checkMin(object);
    checkUndef(object);
    if(typeof(fion) !== 'function'){
        throw "Second Argument is not a function";
    }
    Object.keys(obj).forEach(key=> {
        object[key] = fion(object[key]);
    });
    return object;
}

module.exports = {
makeArrays, isDeepEqual, computeObject
}