const reverseArray = function(array) {
    
    let newArray = [];

    do {
        newArray.push(array.pop());
    }
    while (array.length != 0);
    
    return newArray;
}

console.log(reverseArray(["A", "B", "C"]));

let arrayValue = [1,2,3,4,5];

function reverseArrayInPlace(array){
    
    let tempArray = [];

    do {
        tempArray.push(array.pop());
    }
    while (array.length != 0);

    arrayValue = tempArray;

    return arrayValue;

}

reverseArrayInPlace(arrayValue);

console.log(arrayValue);