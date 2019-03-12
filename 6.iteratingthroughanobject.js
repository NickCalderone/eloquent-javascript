class Matrix {
    // when creating a new Matrix object, I will pass width, height, and optional content function arguments
  constructor(width, height, element = (x, y) => undefined) {
      // the Matrix object will have a property 'width' that is set to the width argument
    this.width = width;
      // the Matrix object will have a property 'height' that is set to the height argument
    this.height = height;
      // the Matrix object will have a content property that can be filled in by the optional third function argument
    this.content = [];

    // this builds out the content property
    // it will iterate starting at 0 until it completes the quantity of height
    for (let y = 0; y < height; y++) {
      // for each iteration of height, it will iterate starting at 0 until it completes the quantity of height
      for (let x = 0; x < width; x++) {
        // for each of the above iterations, it will store the result as an element in the content array. Ex: a matrix of 3x3 will have a content array of 9, indexes are 0-8.
        this.content[y * width + x] = element(x, y);
      }
    }
  }

  // returns the content element that corresponds to the x and y values provided
  get(x, y) {
    return this.content[y * this.width + x];
  }
  // sets the content element that corresponds to the x and y values provided
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
};

// the symbol.iterator is a class and also has its own constructor.  

class MatrixIterator {
  //This iterator takes a variable 'matrix' which will be stored as a local variable in the iterator  
  constructor(matrix) {
    // It starts with local variables x, and y which will be iterated through
    this.x = 0;
    this.y = 0;
    // Stores the matrix passes as an argument as a property
    this.matrix = matrix;
  }

  next() {
    // if this.y iterates past the last y value, it will finish iterating
    if (this.y == this.matrix.height) return {done: true};

    // the value variable is an object with properties corresponding to the current iteration's x & y variables, and value property that gets both the x & y variables.  
    let value = {x: this.x,
                 y: this.y,
                 value: this.matrix.get(this.x, this.y)};
    // when finishing an iteration, it adds one to the x variable
    this.x++;
    // if the x variable equals the matrix's width value, it sets x to 0 and iterates y
    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    // returns current value and declares that the iteration is not done
    return {value, done: false};
  }
};

Matrix.prototype[Symbol.iterator] = function() {
  return new MatrixIterator(this);
};

let matrix = new Matrix(2, 2, (x, y) => `value ${x},${y}`);
for (let {x, y, value} of matrix) {
  console.log(x, y, value);
}



