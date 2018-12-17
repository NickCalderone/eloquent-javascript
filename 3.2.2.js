const isEven = function(number) {    
    let answer = "try again";
    if ( number === -1 || number === 1 ) {
        answer = false;
        return answer;
    }
    else if ( number === 0 ) {
        answer = true;
        return answer;
    }
    else {
        if ( number > 0 ) {
            number = number -2;
            console.log(number);
            return isEven(number);
        }
        else {
            number = number + 2;
            console.log(number);
            return isEven(number);
        }
        // console.log(number);
        // return isEven(number - 2);
    }
}

console.log(isEven(10));
console.log(isEven(-10));
console.log(isEven(11));
console.log(isEven(-11));



// console.log(isEven(75));