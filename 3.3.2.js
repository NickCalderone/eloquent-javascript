const countBs = function(string, char) {
    let count = 0;

    for (let i = 0; i < string.length; i++) {
        if (string.charAt(i) === char) {
            count++;
        }
    }

    return count;
}

console.log(countBs("testing", "t"));

console.log(countBs("testing the string", "i"));