var util = require('util');

function arrayToList(array) {

    let list = null;
    
    for(let i=array.length-1;i>=0;i--){
        list = {value: array[i], rest: list};
    }
    return list;
}

// console.log(util.inspect(arrayToList([10, 20, 30, 40, 50, 60]), {depth: null}));

// my answer
function listToArray(list){
    let array = [];
    
    let location = list;

    while (location){
        array.push(location.value);
        location = location.rest;
    }

    return array;
}

// console.log(listToArray(arrayToList([10, 20, 30])));

// recommended answer 
function listToArrayRecommended(list){
    let array = [];
    
    for (let node=list;node;node=node.rest){
        array.push(node.value);
    }
    return array;
}

// console.log(listToArrayRecommended(arrayToList([10, 20, 30])));

function prepend(element, list) {
    object ={};

    object.value = element;
    object.rest= list;

    return object;
}

// console.log(prepend(10, prepend(20, null)));

function nth(list, position) {
    place = list;
    
    for (i=0; i != position; i++){
        place = place.rest;
    }

    return place.value;
}

// console.log(nth(arrayToList([10, 20, 30]), 1));

// recursive version of funciton nth()
function nthRecursive(list, position){
    
    if (position === 0) {
        return list.value;
    } 

    return nthRecursive(list.rest, position - 1);
    
}

console.log(nthRecursive(arrayToList([10, 20, 30]), 2));