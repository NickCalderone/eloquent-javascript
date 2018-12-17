

const countBs = function(string) {
    
    var count = 0;

    for ( var i = 0 ; i < string.length ; i++ ) {
        
        if ( string.charAt(i) === "B" ) {
            // this cannot be count = count++ for some reason
            count++;
        }
    }

    // why cant i use console.log(count); It seems all javascript functions need to 'return' something
    return count;
}

console.log(countBs("BBB"));

console.log(countBs("abecBebEBBbeB"));





// function countBs(str) {
//     var count = 0;
//     for (var i = 0; i < str.length; i++) {
//         if (str.charAt(i) === "B") {
//             count++;

//         }
//     }
//         return (count); // return outside of for loop
// }