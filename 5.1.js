require('./5writingscripts.js');

//this funciton allows us to return all scripts in SCRIPT that have the current letter code
function characterScript(code) {
    //for each of the scripts in array SCRIPT
    for (let script of SCRIPTS) {
      //if current script.ranges has some that includes the code used as parameter of this function...
      if (script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })) {
        //return the script
        return script;
      }
    }
    //if current script.ranges does not have some that includes code used as parameter of this function, return null
    return null;
  }
  // console.log(characterScript(121));
  // → {name: "Latin", …}

  //this function allows us to create an array of objects of array argument 'items'
  //whose name property is determined by function argument 'group'name
  //and whose property count is equal to the quantity of array elements that share the same name (a.k.a. written languages)
  function countBy(items, groupName) {
    let counts = [];
    for (let item of items) {
      let direction = groupName(item);
      //look through array 'counts' and check if there is already an element with the same name as this iteration
      let known = counts.findIndex(c => c.direction == direction);
      //if there is not an element found, create one with property count of 1
      if (known == -1) {
        counts.push({direction, count: 1});
        //if there is already an element with the same name, add 1 to the count total
      } else {
        counts[known].count++;
      }
    }
    return counts;
  }
  
  // console.log(countBy([1, 2, 3, 4, 5], n => n > 2));
  // → [{name: false, count: 2}, {name: true, count: 3}]


function dominantDirection(text){
    
    // creates an array of objects with 2 properties, name and count.
    // name is the name of the writing language, count is the number of characters in the string.
    // gets rid of characters that are not associated with a written language such as 'space'
  let scripts = countBy(text, char=>{
      let script = characterScript(char.codePointAt(0));
      return script ? script.direction : "none";
  }).filter(({direction}) => direction != "none");

  // console.log(scripts);

  let answer = scripts.reduce((acc, current)=>{    

    if (current.count > acc.count){
      acc = current;
    };
    return acc;
  }, {direction: 'error', count: 0});

  return answer.direction;
  
};
console.log(dominantDirection("hey国的狗说 مساء الخير"));
