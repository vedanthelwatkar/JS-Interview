// 1. array and obj syntax
// arr = [] & obj = {}

// 2. What are the common array methods in JavaScript?
// JavaScript arrays have many built-in methods for manipulating and accessing array data.

// Adding/removing elements:
const fruits = ["apple", "banana"];
fruits.push("orange"); // Adds to end: ["apple", "banana", "orange"]
fruits.pop(); // Removes from end: ["apple", "banana"]
fruits.unshift("strawberry"); // Adds to beginning: ["strawberry", "apple", "banana"]
fruits.shift(); // Removes from beginning: ["apple", "banana"]
fruits.splice(1, 0, "mango"); // Inserts at index: ["apple", "mango", "banana"]
fruits.splice(1, 1); // Removes from index: ["apple", "banana"]

// Transformation methods:
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => num * 2); // Returns [2, 4, 6, 8, 10]
const evens = numbers.filter((num) => num % 2 === 0); // Returns [2, 4]
const sum = numbers.reduce((total, num) => total + num, 0); // Returns 15
numbers.forEach((num) => console.log(num)); // Logs each number

// Finding elements:
const items = [5, 12, 8, 130, 44];
const found = items.find((item) => item > 10); // Returns 12
const foundIndex = items.findIndex((item) => item > 10); // Returns 1
const includes10 = items.includes(10); // Returns false
const indexOf8 = items.indexOf(8); // Returns 2

// Other useful methods:
const chars = ["a", "b", "c"];
const joined = chars.join("-"); // Returns "a-b-c"
const reversed = [...chars].reverse(); // Returns ["c", "b", "a"]
const sliced = chars.slice(1, 3); // Returns ["b", "c"]
const sorted = [3, 1, 4, 2].sort(); // Returns [1, 2, 3, 4]
const flattened = [1, [2, [3]]].flat(2); // Returns [1, 2, 3]

// 3. What are the common object methods in JavaScript?
// JavaScript provides several methods to work with objects.

// Creating objects:
const user = { name: "John", age: 30 };
const newUser = Object.create(user); // Creates with prototype
const userClone = Object.assign({}, user); // Shallow copy
const userClone2 = { ...user }; // Spread operator (shallow)

// Keys, values, and entries:
const keys = Object.keys(user); // Returns ["name", "age"]
const values = Object.values(user); // Returns ["John", 30]
const entries = Object.entries(user); // Returns [["name", "John"], ["age", 30]]
const hasProp = Object.hasOwn(user, "name"); // Returns true (ES2022)
const hasPropOld = user.hasOwnProperty("name"); // Returns true (older method)

// Object manipulation:
Object.seal(user); // Prevents adding/deleting properties
Object.freeze(user); // Makes object immutable
const desc = Object.getOwnPropertyDescriptor(user, "name"); // Gets property details

// Converting objects:
const fromEntries = Object.fromEntries([
  ["name", "Jane"],
  ["age", 25],
]); // Creates { name: "Jane", age: 25 }

// 4. How do you clone objects in JavaScript?
// There are multiple ways to clone objects in JavaScript, each with different behaviors.

// Shallow cloning (doesn't clone nested objects):
const original = { a: 1, b: { c: 2 } };

// Method 1: Object.assign()
const clone1 = Object.assign({}, original);

// Method 2: Spread operator
const clone2 = { ...original };

// Method 3: Object.create
const clone3 = Object.create(
  Object.getPrototypeOf(original),
  Object.getOwnPropertyDescriptors(original)
);

// Deep cloning (clones nested objects too):
// Method 1: JSON.parse/stringify (doesn't work with functions, undefined, symbols, etc.)
const deepClone1 = JSON.parse(JSON.stringify(original));

// Method 2: Manual deep clone function
function deepClone(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  const copy = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      copy[key] = deepClone(obj[key]);
    }
  }

  return copy;
}

const deepClone2 = deepClone(original);

// 5. How do you check if an array is an array in JavaScript?
// There are several ways to check if a value is an array.

// Method 1: Array.isArray() (preferred)
const arr = [1, 2, 3];
console.log(Array.isArray(arr)); // true
console.log(Array.isArray({})); // false

// Method 2: instanceof operator
console.log(arr instanceof Array); // true
// Note: This can give false negatives across frames/windows

// Method 3: Object.prototype.toString
console.log(Object.prototype.toString.call(arr) === "[object Array]"); // true

// 6. What are array-like objects in JavaScript?
// Array-like objects have numbered indices and a length property but don't have array methods.
// Examples include arguments object, DOM NodeList, and strings.

function example() {
  console.log(arguments.length); // Number of arguments
  console.log(arguments[0]); // First argument

  // Converting array-like to array:
  const args = Array.from(arguments); // ES6 method
  const args2 = [...arguments]; // Spread operator
  const args3 = Array.prototype.slice.call(arguments); // Older method
}

example(1, 2, 3); // arguments is array-like

// 7. What is the difference between Object.freeze() and Object.seal()?
// Both methods restrict modifications to objects but in different ways.

const frozen = { prop: 42 };
Object.freeze(frozen);
// frozen.prop = 100;    // No effect (strict mode throws error)
// frozen.newProp = 123; // No effect (can't add)
// delete frozen.prop;   // No effect (can't delete)
console.log(frozen.prop); // Still 42

const sealed = { prop: 42 };
Object.seal(sealed);
sealed.prop = 100; // Works! (can modify existing)
// sealed.newProp = 123; // No effect (can't add)
// delete sealed.prop;   // No effect (can't delete)
console.log(sealed.prop); // 100

// 8. What is the difference between map() and forEach() in arrays?
// map() creates a new array with transformed values, while forEach() just executes a function for each element.

const nums = [1, 2, 3];

// map() returns a new array
const doubledNew = nums.map((num) => num * 2);
console.log(doubledNew); // [2, 4, 6]
console.log(nums); // [1, 2, 3] (original unchanged)

// forEach() doesn't return anything
const result = nums.forEach((num) => console.log(num * 2)); // Logs 2, 4, 6
console.log(result); // undefined
console.log(nums); // [1, 2, 3] (original unchanged)

// 9. What is Object.defineProperty() used for?
// Object.defineProperty() defines a new property or modifies an existing one with fine-grained control.

const person = {};

Object.defineProperty(person, "name", {
  value: "John",
  writable: false, // Can't change value
  enumerable: true, // Shows up in for...in loops
  configurable: false, // Can't delete or modify descriptor
});

// person.name = 'Jane';  // No effect (or error in strict mode)
console.log(person.name); // "John"

// Getters and setters
const product = {};
let _price = 0;

Object.defineProperty(product, "price", {
  get: function () {
    return _price;
  },
  set: function (value) {
    if (value < 0) {
      throw new Error("Price cannot be negative");
    }
    _price = value;
  },
  enumerable: true,
  configurable: true,
});

product.price = 100;
console.log(product.price); // 100
// product.price = -50;      // Throws error

// 10. How can you iterate through an object's properties?
// There are multiple ways to iterate through object properties in JavaScript.

const car = {
  make: "Toyota",
  model: "Camry",
  year: 2022,
};

// Method 1: for...in loop (includes inherited properties)
for (const key in car) {
  if (Object.hasOwn(car, key)) {
    // Filter out inherited properties
    console.log(key, car[key]);
  }
}

// Method 2: Object.keys() with forEach
Object.keys(car).forEach((key) => {
  console.log(key, car[key]);
});

// Method 3: Object.values() for just values
Object.values(car).forEach((value) => {
  console.log(value);
});

// Method 4: Object.entries() for key-value pairs
Object.entries(car).forEach(([key, value]) => {
  console.log(key, value);
});

// 11. What's the difference between slice() and splice() in arrays?
// slice() creates a new array without modifying the original, while splice() modifies the original array.

const originalArray = ["apple", "banana", "cherry", "date", "elderberry"];

// slice(start, end) - Creates new array, original unchanged
const slicedNew = originalArray.slice(1, 4);
console.log(slicedNew); // ['banana', 'cherry', 'date']
console.log(originalArray); // ['apple', 'banana', 'cherry', 'date', 'elderberry']

// splice(start, deleteCount, ...items) - Modifies original array
const spliced = originalArray.splice(1, 2, "blueberry", "cranberry");
console.log(spliced); // ['banana', 'cherry'] (removed items)
console.log(originalArray); // ['apple', 'blueberry', 'cranberry', 'date', 'elderberry']
