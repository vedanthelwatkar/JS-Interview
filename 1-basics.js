// 1. What are data types in JavaScript?
// JavaScript has primitive types (string, number, bigint, boolean, symbol, undefined, null) and non-primitive types (objects, arrays, functions, etc.).

// Primitive types:
// - string: Text in single or double quotes
// - number: Numeric values like 1, 2, 3
// - bigint: Large integers with 'n' suffix
// - boolean: true/false values
// - symbol: Used for creating unique keys
// - undefined: Variable declared but not assigned
// - null: Intentional absence of value

// Non-primitive types:
// - Objects: Key-value pairs, e.g., const person = { name: "Vedant", age: 23 }
// - Arrays: Ordered collections, e.g., const numbers = [1, 2, 3, 4]
// - Functions: Code blocks that can be called, e.g., const func = (a, b) => a + b
// - Maps: Collections that allow keys of any type
// - Sets: Collections of unique values
// - WeakMap/WeakSet: Special collections with automatic garbage collection
// - Date: For handling dates and times
// - RegExp: For pattern matching

// 2. What is the difference between null and undefined?
// null represents an intentional absence of a value, while undefined represents an uninitialized or missing value.
let a1;
console.log(a1); // undefined (not initialized)
let b1 = null;
console.log(b1); // null (explicitly set to nothing)

// 3. What is the difference between == and ===?
// == compares values with type coercion, while === compares both values and types without coercion.
const a2 = "123";
const b2 = 123;
console.log(a2 == b2); // true (values match after coercion)
console.log(a2 === b2); // false (types don't match)

// 4. What is hoisting in JavaScript?
// Hoisting is JavaScript's default behavior of moving variable and function declarations to the top of their scope.
hoistedVariable = 3;
console.log(hoistedVariable); // 3
var hoistedVariable;

hoistedFunction(); // "Hello world!"
function hoistedFunction() {
  console.log("Hello world!");
}

// 5. What is the difference between var, let, and const?
// var: Function-scoped, hoisted and initialized with undefined
// let: Block-scoped, hoisted but not initialized (TDZ)
// const: Block-scoped, hoisted but not initialized (TDZ), cannot be reassigned
console.log(a); // undefined (hoisted and initialized)
var a = 10;

// console.log(b); // ReferenceError (in TDZ)
let b = 20;

// console.log(c); // ReferenceError (in TDZ)
const c = 30;

// 6. What is TDZ (Temporal Dead Zone)?
// TDZ is the period between when a variable is hoisted and when it's initialized, during which accessing it throws a ReferenceError.
// Note: var doesn't have a TDZ as it's initialized with undefined during hoisting.

// 7. Explain Implicit Type Coercion in JavaScript.
// Implicit type coercion is the automatic conversion of values from one data type to another when operations involve different types.
console.log("5" + 3); // "53" (number coerced to string)
console.log("5" - 3); // 2 (string coerced to number)
console.log(true + 1); // 2 (boolean coerced to number)

// 8. What are operators in JavaScript?
// Operators in JavaScript are symbols that perform operations on operands (values and variables).
// - Arithmetic: +, -, *, /, %, ** (math calculations)
// - Assignment: =, +=, -=, *=, /=, %=, **= (assign values)
// - Comparison: ==, ===, !=, !==, >, <, >=, <= (compare values)
// - Logical: &&, ||, ! (boolean operations)
// - Ternary: condition ? true : false (short if-else)
// - Type: typeof, instanceof (check data types)

// 9. Is JavaScript a statically typed or dynamically typed language?
// JavaScript is a dynamically typed language, meaning variable types are checked during runtime rather than compile time.
let variable = "string";
console.log(typeof variable); // "string"
variable = 42;
console.log(typeof variable); // "number"

// 10. What is NaN in JavaScript?
// NaN stands for "Not a Number," representing an invalid number result from an operation.
console.log(parseInt("hello")); // NaN
console.log(0 / 0); // NaN
console.log(NaN === NaN); // false (NaN is never equal to anything, including itself)

// 11. What is IIFE in JavaScript?
// IIFE (Immediately Invoked Function Expression) is a function that runs as soon as it is defined.
(function () {
  console.log("This function runs immediately!");
})();

// 12. What are HOC (Higher Order Components) and HOF (Higher Order Functions) in JavaScript?
// HOF: A function that takes another function as an argument or returns a function.
const multiply = (factor) => (num) => num * factor;
const double = multiply(2);
console.log(double(5)); // 10

// HOC: A function that takes a React component and returns a new enhanced component.
// Example (React syntax):
// const withLogger = (Component) => (props) => {
//   console.log("Rendering:", Component.name);
//   return <Component {...props} />;
// };

// 13. Explain the "this" keyword in JavaScript.
// The "this" keyword refers to the object it belongs to. In a method, it refers to the owner object, in a function, it depends on how the function is called.

// 14. What do you mean by Self-Invoking Functions?
// A self-invoking function is a function that runs automatically when defined. It is wrapped in parentheses and followed by another set of parentheses.
// Example:
(function () {
  console.log("This function runs immediately!");
})();

// 15. Explain call(), apply(), and bind() methods.
// call() and apply() invoke functions with a specified 'this' value. bind() returns a new function with a bound 'this' value.
// Example:
function greet() {
  console.log(`Hello, ${this.name}`);
}
const user = { name: "Vedant" };
greet.call(user); // Hello, Vedant
greet.apply(user); // Hello, Vedant
const boundGreet = greet.bind(user);
boundGreet();

// 16. What is the difference between exec() and test() methods in JavaScript?
// exec() searches for a match in a string and returns an array if found; test() returns true or false.
const regex = /hello/;
console.log(regex.test("hello world")); // true
console.log(regex.exec("hello world")); // ['hello', index: 0, input: 'hello world']

// 17. What is currying in JavaScript?
// Currying is a technique in which a function takes multiple arguments and transforms them into a sequence of functions.
function curry(a) {
  return function (b) {
    return function (c) {
      return a + b + c;
    };
  };
}
console.log(curry(1)(2)(3)); // 6

// 18. What are some advantages of using External JavaScript?
// - Code reusability
// - Separation of concerns
// - Cached loading
// - Easier maintenance

// 19. Explain Scope and Scope Chain in JavaScript.
// Scope defines where variables can be accessed. Scope chain refers to the hierarchy of scopes, determining variable accessibility.

// 20. Explain Closures in JavaScript.
// Closures allow a function to access variables from its outer scope even after the outer function has executed.
function outer() {
  let count = 0;
  return function () {
    count++;
    console.log(count);
  };
}
const counter = outer();
counter(); // 1
counter(); // 2

// 21. Mention some advantages of JavaScript.
// - Lightweight and fast
// - Client-side execution
// - Interoperability with other languages
// - Rich ecosystem

// 22. What are object prototypes?
// Prototypes are the mechanism by which JavaScript objects inherit properties from each other.

// 23. What are callbacks?
// A callback is a function passed as an argument to another function.
function fetchData(callback) {
  setTimeout(() => {
    callback("Data received");
  }, 2000);
}
fetchData(console.log);

// 24. What are the types of errors in JavaScript?
// - Syntax Error
// - Type Error
// - Reference Error
// - Range Error

// 25. What is memoization?
// Memoization is an optimization technique that stores the results of expensive function calls and returns cached results when the same inputs occur again.
function memoizedAdd() {
  let cache = {};
  return function (num) {
    if (num in cache) return cache[num];
    else cache[num] = num + 10;
    return cache[num];
  };
}
const add = memoizedAdd();
console.log(add(5)); // 15
console.log(add(5)); // Cached: 15

// 26. What is recursion in a programming language?
// Recursion is a function calling itself to solve a smaller instance of the problem.
function factorial(n) {
  if (n === 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5)); // 120

// 27. What is the use of a constructor function in JavaScript?
// A constructor function is used to create multiple objects with the same properties and methods.
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const person1 = new Person("John", 30);

// 28. What is DOM?
// DOM (Document Object Model) represents the structure of a webpage, allowing JavaScript to interact with and manipulate HTML elements.

// 29. Which method is used to retrieve a character from a certain index?
// The charAt() method.
console.log("Hello".charAt(1)); // e

// 30. What do you mean by BOM (Browser Object Model)?
// BOM provides objects to interact with the browser, such as window, navigator, screen, location, and history.

// 31. What is the distinction between client-side and server-side JavaScript?
// Client-side JavaScript runs in the browser, handling UI interactions, while server-side JavaScript runs on a server (e.g., Node.js), handling backend logic.

// 32. What are arrow functions?
// Arrow functions provide a shorter syntax for writing functions and inherit 'this' from their surrounding scope.
const addNums = (a, b) => a + b;
console.log(addNums(3, 4)); // 7

// 33. What do you mean by the Prototype Design Pattern?
// The Prototype Design Pattern allows objects to be created based on an existing object, avoiding the overhead of creating instances from scratch.

// 34. Differences between declaring variables using var, let, and const.
// - var: Function-scoped, hoisted, can be re-declared.
// - let: Block-scoped, can be updated but not re-declared.
// - const: Block-scoped, cannot be updated or re-declared.

// 35. What is the rest parameter and spread operator?
// The rest parameter (...) collects multiple elements into an array, while the spread operator expands an array into individual elements.
// Rest parameter example:
function sum(...numbers) {
  return numbers.reduce((total, num) => total + num, 0);
}
console.log(sum(1, 2, 3, 4)); // 10

// Spread operator example:
const arr1 = [1, 2, 3];
const arr2 = [...arr1, 4, 5]; // [1, 2, 3, 4, 5]
const obj1 = { x: 1, y: 2 };
const obj2 = { ...obj1, z: 3 }; // { x: 1, y: 2, z: 3 }

// 36. In JavaScript, how many different methods can you make an object?
// There are several ways to create objects in JavaScript:
// 1. Object literal
const ob1 = { name: "John", age: 30 };

// 2. Constructor function
function Person(name, age) {
  this.name = name;
  this.age = age;
}
const ob2 = new Person("John", 30);

// 3. Object.create() method
const proto = {
  greet() {
    console.log("Hello!");
  },
};
const ob3 = Object.create(proto);

// 4. ES6 Classes
class User {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
}
const ob4 = new User("John", 30);

// 5. Factory functions
function createPerson(name, age) {
  return { name, age };
}
const ob5 = createPerson("John", 30);

// 37. What is the use of promises in javascript?
// Promises represent the eventual completion or failure of an asynchronous operation and its resulting value.
// They help manage asynchronous code and avoid callback hell.
const fetchData2 = new Promise((resolve, reject) => {
  // Asynchronous operation
  const success = true;
  if (success) {
    resolve("Data fetched successfully");
  } else {
    reject("Error fetching data");
  }
});

fetchData2
  .then((data) => console.log(data))
  .catch((error) => console.error(error));

// 38. What are classes in javascript?
// Classes are templates for creating objects with pre-defined properties and methods.
// They provide a syntactic sugar over JavaScript's prototype-based inheritance.
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    console.log(`${this.name} makes a sound`);
  }
}

class Dog extends Animal {
  speak() {
    console.log(`${this.name} barks`);
  }
}

const dog = new Dog("Rex");
dog.speak(); // "Rex barks"

// 39. What are generator functions?
// Generator functions can pause and resume execution, yielding values on demand using the yield keyword.
function* countUp(max) {
  let count = 0;
  while (count < max) {
    yield count++;
  }
}

const counter1 = countUp(3);
console.log(counter1.next().value); // 0
console.log(counter1.next().value); // 1
console.log(counter1.next().value); // 2
console.log(counter1.next().value); // undefined

// 40. Explain WeakSet in javascript.
// WeakSet is a collection of objects where references to the objects are held weakly,
// allowing for automatic garbage collection if there are no other references to the objects.
// WeakSet only accepts objects and doesn't support iteration or size property.
const weakSet = new WeakSet();
let objNew = { data: 42 };
weakSet.add(objNew);
console.log(weakSet.has(objNew)); // true
objNew = null; // object becomes eligible for garbage collection

// 41. Why do we use callbacks?
// Callbacks are used to handle asynchronous operations and ensure code executes in the right order.
// They allow a function to call another function when a task completes.
function fetchData3(url, callback) {
  // Simulating async operation
  setTimeout(() => {
    const data = { result: "Success from " + url };
    callback(data);
  }, 1000);
}

fetchData3("api/users", function (data) {
  console.log(data.result); // "Success from api/users"
});

// 42. Explain WeakMap in javascript.
// WeakMap is a collection of key-value pairs where keys must be objects and are held weakly,
// allowing for automatic garbage collection if there are no other references to the key objects.
// WeakMap doesn't support iteration or size property.
const weakMap = new WeakMap();
let key = { id: 1 };
weakMap.set(key, "Private data");
console.log(weakMap.get(key)); // "Private data"
key = null; // key-value pair becomes eligible for garbage collection

// 43. What is Object Destructuring?
// Object destructuring allows extracting properties from objects and binding them to variables.
const person = {
  name: "John",
  age: 30,
  address: {
    city: "New York",
    zip: "10001",
  },
};

// Basic destructuring
const { name, age } = person;
console.log(name, age); // "John" 30

// Nested destructuring
const {
  address: { city },
} = person;
console.log(city); // "New York"

// With default values
const { country = "USA" } = person;
console.log(country); // "USA"

// 44. Difference between prototypal and classical inheritance
// Classical inheritance: Class-based, rigid hierarchy, instances inherit from classes.
// Prototypal inheritance: Object-based, more flexible, objects inherit directly from other objects.

// Classical inheritance (ES6 syntax):
class Parent {
  constructor(name) {
    this.name = name;
  }

  greet() {
    return `Hello, I'm ${this.name}`;
  }
}

class Child extends Parent {
  constructor(name, age) {
    super(name);
    this.age = age;
  }
}

// Prototypal inheritance:
const parentObj = {
  greet() {
    return `Hello, I'm ${this.name}`;
  },
};

const childObj = Object.create(parentObj);
childObj.name = "John";

// 45. What is a Temporal Dead Zone?
// The Temporal Dead Zone (TDZ) is the period between when a variable is created and when it's initialized.
// During this period, accessing the variable throws a ReferenceError.
{
  // TDZ for x starts here
  //   console.log(typeof x);  ReferenceError
  let x = 10; // TDZ ends here
  console.log(x); // 10
}

// 46. What do you mean by JavaScript Design Patterns?
// Design patterns are reusable solutions to common programming problems.
// They provide templates for solving certain types of problems in an efficient way.

// Example: Singleton pattern
const Singleton = (function () {
  let instance;

  function createInstance() {
    return { data: "I am the singleton instance" };
  }

  return {
    getInstance: function () {
      if (!instance) {
        instance = createInstance();
      }
      return instance;
    },
  };
})();

const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true

// 47. Is JavaScript a pass-by-reference or pass-by-value language?
// JavaScript is pass-by-value, but for objects, the "value" is a reference to the object.
// Primitive types are passed by value, objects are passed by reference value.

// Primitives are passed by value:
function changePrimitive(val) {
  val = 100;
  return val;
}
let numNew = 10;
changePrimitive(numNew);
console.log(numNew); // 10 (unchanged)

// Objects are passed by reference value:
function changeObject(obj) {
  obj.value = 100;
  return obj;
}
let obj = { value: 10 };
changeObject(obj);
console.log(obj.value); // 100 (changed)

// 48. Difference between Async/Await and Generators usage to achieve the same functionality.
// Async/Await: Built specifically for asynchronous operations, cleaner syntax, returns promises.
// Generators: More general-purpose, can pause/resume execution, requires additional library for async.

// Async/Await approach:
async function fetchUserData() {
  try {
    const response = await fetch("/api/user");
    const userData = await response.json();
    return userData;
  } catch (error) {
    console.error("Error:", error);
  }
}

// Generator approach (with a runner library like co):
function* fetchUserDataGen() {
  try {
    const response = yield fetch("/api/user");
    const userData = yield response.json();
    return userData;
  } catch (error) {
    console.error("Error:", error);
  }
}

// 49. What are the primitive data types in JavaScript?
// JavaScript has 7 primitive data types:
// - String: For text
// - Number: For numeric values
// - BigInt: For integers too large for Number
// - Boolean: true/false
// - undefined: For uninitialized variables
// - null: For intentional absence of value
// - Symbol: For unique identifiers

const str = "Hello"; // String
const num = 42; // Number
const bigInt = 9007199254740991n; // BigInt
const bool = true; // Boolean
const undef = undefined; // undefined
const nul = null; // null
const sym = Symbol("id"); // Symbol

// 50. What is the role of deferred scripts in JavaScript?
// Deferred scripts are executed after the document has been parsed but before DOMContentLoaded.
// They maintain their relative order of execution and don't block page rendering.
// <script defer src="example.js"></script>

// Benefits of deferred scripts:
// - Don't block HTML parsing
// - Execute when DOM is ready
// - Execute in order they appear in document
// - Run before DOMContentLoaded event

// 51. What has to be done in order to put Lexical Scoping into practice?
// Lexical scoping means that a function's access to variables is determined by its physical location in the code.
// To implement lexical scoping:
// 1. Create nested functions
// 2. Variables declared in outer functions are accessible in inner functions
// 3. Variables declared in inner functions are not accessible in outer functions

function outer1() {
  const outerVar = "I'm from outer scope";

  function inner() {
    const innerVar = "I'm from inner scope";
    console.log(outerVar); // Can access outer variable
    console.log(innerVar); // Can access inner variable
  }

  inner();
  // console.log(innerVar); // Error: innerVar is not defined
}

outer1();
