const exclaim = function() {
    console.log("finished");
}

const isEven = function(number) {    
    if (number === 1) {
        let number = false;
        return number;
    }
    else if (number === 0) {
        let number = true;
        return number;
    }
    else {
        console.log(number);
        return isEven(number - 2);
    }
}


console.log(isEven(50));

console.log(isEven(75));