
const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
];

function buildGraph(edges) {
    // creates an object 'graph' with no prototype properties
    let graph = Object.create(null);
    // creates a map with keys for every location and array values with all of the locations connected to the key by roads.
    function addEdge(from, to) {
        //take two arguments. if there is not yet a key 'from', create one and set value equal to array 'to'
        if (graph[from] == null) {
            graph[from] = [to];
            //if there is a key 'from' push 'to' into the key value array
        } else {
            graph[from].push(to);
        }
    }
    //   map 'edges' into 2-element arrays, then for each run 'addEdge' on both sequences of the elements
    for (let [from, to] of edges.map(r => r.split("-"))) {
        addEdge(from, to);
        addEdge(to, from);
    }
    //   returns a map object with a key for every location, and values corresponding with other locations that are linked to it by roads
    return graph;
}

// runs buildGraph using the 'roads' array as an argument
const roadGraph = buildGraph(roads);

// console.log(roadGraph);


class VillageState {
    // pass in 'place' (current location) and 'parcels'  arguments in creating a new VillageState object and set them to properties
    constructor(place, parcels) {
        this.place = place;
        this.parcels = parcels;
    }
  
    // this object has a method 'move' that takes a destination as an argument
    move(destination) {
        // if the map 'roadGraph' key of current location doesnt not connect to destination return this object?????
        if (!roadGraph[this.place].includes(destination)) {
            return this;
            // If the map 'roadGraph' key of current location does include destination.....
        } else {
            // adjusts the local 'parcels' variable which is an array of objects
            let parcels = this.parcels.map(p => {
                // if the parcel's place does not match the current place, leave it. Signifies parcels that have not yet been picked up.
                if (p.place != this.place) return p;
                // if parcels place matches the current place, change the place to next destination. Update every package that has been picked up to have property place as new destination
                return {place: destination, address: p.address};
                // filter out all parcels who's current place matches the shipping address. aka dropp off packages for current location
            }).filter(p => p.place != p.address);
            return new VillageState(destination, parcels);
        }
    }
}

// arguments are village state, robot function, memory
function runRobot(state, robot, memory) {
    // for loop that will run until a break parameter is reached
    for (let turn = 0;; turn++) {
        // if robot has delivered every package, return done statement and break out of loop
        if (state.parcels.length == 0) {
            return `Done in ${turn} turns`;
            break;
        }
        // action is an object created by function robot which determines values for properties 'direction' and 'memory'
        let action = robot(state, memory);
        // updates the state argument of this function by calling villageState.move to the new destination for the next loop
        state = state.move(action.direction);
        // updates the memory argument of this function for the next loop
        memory = action.memory;
        console.log(`Moved to ${action.direction}`);
    }
}

function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length);
    return array[choice];
}

function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])};
}

// give village state a function property 'random' which creates a parcels object with a list of 5 package locations and addresses to new locations
VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    // do a loop for each of the quantity of parcels
    for (let i = 0; i < parcelCount; i++) {
        // address will be to a random location on the map
        let address = randomPick(Object.keys(roadGraph));
        let place;

        do {
            // choose a random starting location on the map
            place = randomPick(Object.keys(roadGraph));
            // ensure parcels are not addressed to starting location
        } while (place == address);
        // add the parcel object to the parcels array
        parcels.push({place, address});
    }
    // create a new VillageState object with the robot starting at the post office with a list of parcels
    return new VillageState("Post Office", parcels);
};

// console.log(VillageState.random());

// runRobot(VillageState.random(), randomRobot);

const mailRoute = [
    "Alice's House", "Cabin", "Alice's House", "Bob's House",
    "Town Hall", "Daria's House", "Ernie's House",
    "Grete's House", "Shop", "Grete's House", "Farm",
    "Marketplace", "Post Office"
];

function routeRobot(state, memory) {
    if (memory.length == 0) {
        memory = mailRoute;
    }
    return {direction: memory[0], memory: memory.slice(1)};
}

// runRobot(VillageState.random(), routeRobot, [])

// creates an array of objects with propertys for ending location and locations passed through to get there. 
// The first element is the starting location. it then looks to see if any connected locations
// are the end location. if not, it pushes a new object into the array for each connected location.
// it then pushes an object for every connected location for each of those connected locations. 
// once the the ending locaiton is found, return a route there.
function findRoute(graph, from, to) {
    // an array of objects with properties for where packages are and how to get there
    let work = [{at: from, route: []}];
    // for each element of array work...
    for (let i = 0; i < work.length; i++) {
        // define new variables that correspond with the same key values in 'work'
        let {at, route} = work[i];
        // for each location connected to 'from' in the graph...
        for (let place of graph[at]) {
            // if it is equal to where were trying to go, return route with that place
            if (place == to) return route.concat(place);
            // if 'work' includes an object with property at: 'from' equals current element in graph[at]...
            if (!work.some(w => w.at == place)) {
                // push a new object to 'work' with property 'at' equal to current element in graph[at] and add 'place' to property 'route' array
                work.push({at: place, route: route.concat(place)});
            }
        }
    }
};

// console.log(findRoute(roadGraph, "Cabin", "Ernie's house"));

// console.log(VillageState.random());

function goalOrientedRobot({place, parcels}, route) {
    if (route.length == 0) {
        // take first parcel of list of parcels
        let parcel = parcels[0];
        // if the first parcel of the list is not at our current location...
        if (parcel.place != place) {
            // find a route to pick up the first parcel
            route = findRoute(roadGraph, place, parcel.place);
            // console.log(route);
        // else find a route to drop off the parcel            
        } else {
            route = findRoute(roadGraph, place, parcel.address);
        }
    }
    // return an object that provides the next place to go then removes that place from the list
    return {direction: route[0], memory: route.slice(1)};
};

let testVillage = VillageState.random();
let testParcels = testVillage.parcels;

// console.log(testVillage);
// console.log("___________");
// console.log("running function");
// console.log(findClosest("Cabin", testParcels,));

function betterRobot({place, parcels}, route){
    if (route.length == 0){
        if (parcels.some(x => x.place !== place)){
            let toPickUp = parcels.filter(x => x.place !== place);
            // console.log("topickup", toPickUp);
            let parcel = toPickUp[0];
            // console.log(parcel);
            let route = findRoute(roadGraph, place, parcel.place );
            // console.log("route", route);
            for (let letter of toPickUp){
                let testRoute = findRoute(roadGraph, place, letter.place);
                if (testRoute.length < route.length){
                    parcel = letter;
                    route = testRoute;
                }
            }
            return {direction: route[0], memory: route.slice(1)};
        } else {
            let parcel = parcels[0];
            let route = findRoute(roadGraph, place, parcel.address);
            for (let letter of parcels){
                let testRoute = findRoute(roadGraph, place, letter.address);
                if (testRoute.length < route.length){
                    parcel = letter;
                    route = testRoute;
                }
            }
            return {direction: route[0], memory: route.slice(1)};
        }
    }
    return {direction: route[0], memory: route.slice(1)};
}

// console.log(runRobot(testVillage, betterRobot, []));

// runRobot(VillageState.random(), goalOrientedRobot, []);

function testRobot(state, robot, memory){
    for (let turn=0;;turn++){
        if (state.parcels.length == 0){
            return turn;
        }
        let action = robot(state, memory);
        state = state.move(action.direction);
        memory = action.memory;
    }
};

function compareRobots(robot1, memory1, robot2, memory2){
    let r1 = 0;
    let r2 = 0;
    
    for (let i=0; i < 100; i++) {
        let vil = VillageState.random();
        r1 += testRobot(vil, robot1, memory1);
        r2 += testRobot(vil, robot2, memory2);
    };

    return `robot 1: ${r1/100} robot 2: ${r2/100}`;
};

console.log(compareRobots(betterRobot, [], goalOrientedRobot, []));

class PGroup{
    constructor(array){
        this.collection = array;
    }
    add(element){
        if (this.collection.has(element)){return this}
        return new PGroup(this.collection.concat(element));
    }
    delete(element){
        if (!this.collection.has(element)){return this};
        return new PGroup(this.collection.filter(x => x != element));
    }
    has(element){
        return this.collection.includes(element);
    }
};

PGroup.empty = new PGroup([]);

// let a = PGroup.empty.add("a");
// let ab = a.add("b");
// let b = ab.delete("a");

// console.log(b.has("b"));
// // → true
// console.log(a.has("b"));
// // → false
// console.log(b.has("a"));
// // → false