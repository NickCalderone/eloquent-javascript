class Vec {
    constructor(x,y){
        this.x = x,
        this.y = y
    }
    plus(vector){
        let answer = new Vec(this.x+vector.x,this.y+vector.y);
        return answer;
    }
    minus(vector){
        let answer = new Vec(this.x-vector.x,this.y-vector.y);
        return answer;
    }
    get length() {
        return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))
    }
};

// console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// console.log(new Vec(3, 4).length);

class Group{
    constructor(){
        this.grouping = [];
    }
    static from(array){
        let answer = new Group

        for (let value of array){
            answer.grouping.push(value);
        }
        return answer;
    }
    add(number){
        for (let value of this.grouping){
            if (number == value){
                return "value is already a member";
            }
        }

        this.grouping.push(number);
    }
    delete(number){
        let index = this.grouping.indexOf(number);
        if (index == -1){
            return "value is not a member";
        }
        this.grouping.splice(index, 1);
    }
    has(number){
        for (let value of this.grouping){
            if (number == value){
                return true;
            }
        }
        return false;
    }
    get(){
        if (this.grouping.length == 0){
            return "grouping is empty";
        }
    }
}
// My checks:
// let group = new Group();
// console.log(group.get())
// console.log(group.from([10, 4, 20]));
// console.log(group.get());
// console.log(group.add(7));
// console.log(group.get());
// console.log(group.delete(4));
// console.log(group.get());
// console.log(group.delete(3));
// console.log(group.get());

// eloquent javascript checks:
//   let group = Group.from([10, 20]);
//   console.log(group.has(10));
  // → true
//   console.log(group.has(30));
  // → false
//   group.add(10);
//   group.delete(10);
//   console.log(group.has(10));
  // → false

class GroupIterator{
    constructor(Group){
        this.element = 0;
        this.group = Group.grouping;
    }

    next() {
        if (this.element == this.group.length) return {done: true};
        let value = this.group[this.element];
        this.element++;
        return {value, done: false};
    }
}

for (let value of Group.from(["a", "b", "c"])) {
    console.log(value);
  }

let test = Symbol("test");

let ages = {
    "nick": 28,
    "taylor": 29,
    "hasOwnProperty": "nah",
}
console.log(Object.prototype.hasOwnProperty.call(ages, "nick"))