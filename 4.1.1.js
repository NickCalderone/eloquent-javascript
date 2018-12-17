const range = function(start, end, increment = 1) {
    let numbers = [];

    for (let i = start; i != end; i = i + increment) {
        
        numbers.push(i);
    }

    //This is not the cleanest way of doing it but it allows the end number to be in the array even when the second argument excludes the end number...
    numbers.push(end);

    return numbers;
}

const sum = function(array) {
    let sum = 0;

    for (let i = 0; i <= array.length; i++ ) {
        sum = sum + i;
    }

    return sum;
}

console.log(range(1,10));
console.log(range(5, 2, -1));
console.log(sum(range(1, 10)));