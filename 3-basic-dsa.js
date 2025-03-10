// JavaScript Interview Questions and Answers
// Focusing on recursion, currying, objects, arrays, strings, and looping

// =====================
// 1. RECURSION QUESTIONS
// =====================

// Q: Implement a recursive function to calculate factorial
function factorial(n) {
  // Base case
  if (n <= 1) return 1;

  // Recursive case
  return n * factorial(n - 1);
}

console.log(factorial(5)); // 120 (5 * 4 * 3 * 2 * 1)

// Q: Implement a recursive function to calculate Fibonacci numbers
function fibonacci(n) {
  // Base cases
  if (n <= 0) return 0;
  if (n === 1) return 1;

  // Recursive case
  return fibonacci(n - 1) + fibonacci(n - 2);
}

console.log(fibonacci(6)); // 8 (0, 1, 1, 2, 3, 5, 8)

// Q: Write a recursive function to flatten a nested array
function flattenArray(arr) {
  let result = [];

  for (const item of arr) {
    if (Array.isArray(item)) {
      // Recursively flatten subarrays and concat the results
      result = result.concat(flattenArray(item));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flattenArray([1, [2, [3, 4], 5], 6])); // [1, 2, 3, 4, 5, 6]

// Q: Implement a recursive deep clone function
function deepClone(obj) {
  // Handle primitives and null
  if (obj === null || typeof obj !== "object") return obj;

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => deepClone(item));
  }

  // Handle objects
  const cloned = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      cloned[key] = deepClone(obj[key]);
    }
  }

  return cloned;
}

const original = { a: 1, b: { c: 2, d: [3, 4] } };
const cloned = deepClone(original);
console.log(cloned); // { a: 1, b: { c: 2, d: [3, 4] } }
console.log(cloned.b === original.b); // false (deeply cloned)

// =====================
// 2. CURRYING QUESTIONS
// =====================

// Q: What is currying? Implement a basic curry function
/* 
  Currying is a technique of transforming a function that takes multiple arguments
  into a sequence of functions that each take a single argument.
  */

function curry(fn) {
  return function curried(...args) {
    // If enough arguments have been provided, call the original function
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }

    // Otherwise, return a function that collects more arguments
    return function (...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
}

// Example usage
function add(a, b, c) {
  return a + b + c;
}

const curriedAdd = curry(add);
console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
console.log(curriedAdd(1)(2, 3)); // 6

// Q: Implement a sum function that works like sum(1)(2)(3)...() and returns total when called with empty parentheses
function sum(a) {
  let currentSum = a;

  function innerSum(b) {
    if (b === undefined) {
      // Return total sum when called with no arguments
      return currentSum;
    }
    currentSum += b;
    return innerSum;
  }

  return innerSum;
}

console.log(sum(1)(2)(3)()); // 6
console.log(sum(5)(10)(15)(20)()); // 50

// Q: Implement a function multiply that can be used like multiply(2)(3)(4)
function multiply(a) {
  return function (b) {
    return function (c) {
      return a * b * c;
    };
  };
}

console.log(multiply(2)(3)(4)); // 24

// =====================
// 3. OBJECT QUESTIONS
// =====================

// Q: How do you merge two objects in JavaScript?
function mergeObjects() {
  // Method 1: Object.assign
  const obj1 = { a: 1, b: 2 };
  const obj2 = { b: 3, c: 4 };
  const merged1 = Object.assign({}, obj1, obj2);
  console.log(merged1); // { a: 1, b: 3, c: 4 }

  // Method 2: Spread operator
  const merged2 = { ...obj1, ...obj2 };
  console.log(merged2); // { a: 1, b: 3, c: 4 }
}

mergeObjects();

// Q: Write a function to check if two objects are deeply equal
function areDeepEqual(obj1, obj2) {
  // Check if both are primitives or one is primitive
  if (obj1 === obj2) return true;
  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 === null ||
    obj2 === null
  ) {
    return false;
  }

  // Check if both are arrays
  const isArray1 = Array.isArray(obj1);
  const isArray2 = Array.isArray(obj2);
  if (isArray1 !== isArray2) return false;

  // Get keys
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);

  // Check key count
  if (keys1.length !== keys2.length) return false;

  // Check all keys and values recursively
  return keys1.every((key) => {
    if (!Object.hasOwn(obj2, key)) return false;
    return areDeepEqual(obj1[key], obj2[key]);
  });
}

console.log(areDeepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(areDeepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 3 } })); // false

// Q: Implement a function to get nested object property by path
function getNestedProperty(obj, path) {
  // Split path string into array of keys
  const keys = path.split(".");
  let current = obj;

  // Traverse the object
  for (const key of keys) {
    if (
      current === null ||
      current === undefined ||
      typeof current !== "object"
    ) {
      return undefined;
    }
    current = current[key];
  }

  return current;
}

const user = {
  name: "John",
  address: {
    city: "New York",
    location: {
      lat: 40.7128,
      lng: -74.006,
    },
  },
};

console.log(getNestedProperty(user, "name")); // "John"
console.log(getNestedProperty(user, "address.city")); // "New York"
console.log(getNestedProperty(user, "address.location.lat")); // 40.7128
console.log(getNestedProperty(user, "address.zipcode")); // undefined

// Q: Create a function that returns immutable copies of objects
function immutable(obj) {
  if (obj === null || typeof obj !== "object") return obj;

  // Handle arrays
  if (Array.isArray(obj)) {
    return Object.freeze(obj.map(immutable));
  }

  // Handle objects
  const result = {};
  for (const key in obj) {
    if (Object.hasOwn(obj, key)) {
      result[key] = immutable(obj[key]);
    }
  }

  return Object.freeze(result);
}

const mutableObj = { a: 1, b: { c: 2 } };
const immutableObj = immutable(mutableObj);
// immutableObj.a = 2; // Error in strict mode
// immutableObj.b.c = 3; // Error in strict mode

// =====================
// 4. ARRAY QUESTIONS
// =====================

// Q: Implement your own version of map, filter, and reduce
Array.prototype.myMap = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    result.push(callback(this[i], i, this));
  }
  return result;
};

Array.prototype.myFilter = function (callback) {
  const result = [];
  for (let i = 0; i < this.length; i++) {
    if (callback(this[i], i, this)) {
      result.push(this[i]);
    }
  }
  return result;
};

Array.prototype.myReduce = function (callback, initialValue) {
  let accumulator = initialValue;
  let startIndex = 0;

  // If no initialValue is provided, use first element of array
  if (initialValue === undefined) {
    if (this.length === 0) {
      throw new TypeError("Reduce of empty array with no initial value");
    }
    accumulator = this[0];
    startIndex = 1;
  }

  for (let i = startIndex; i < this.length; i++) {
    accumulator = callback(accumulator, this[i], i, this);
  }

  return accumulator;
};

// Example usage
const numbers = [1, 2, 3, 4, 5];
console.log(numbers.myMap((x) => x * 2)); // [2, 4, 6, 8, 10]
console.log(numbers.myFilter((x) => x % 2 === 0)); // [2, 4]
console.log(numbers.myReduce((acc, val) => acc + val, 0)); // 15

// Q: Remove duplicates from an array (multiple ways)
function removeDuplicates() {
  const arr = [1, 2, 2, 3, 4, 4, 5];

  // Method 1: Using Set
  const unique1 = [...new Set(arr)];
  console.log(unique1); // [1, 2, 3, 4, 5]

  // Method 2: Using filter
  const unique2 = arr.filter((item, index) => arr.indexOf(item) === index);
  console.log(unique2); // [1, 2, 3, 4, 5]

  // Method 3: Using reduce
  const unique3 = arr.reduce((acc, curr) => {
    if (!acc.includes(curr)) {
      acc.push(curr);
    }
    return acc;
  }, []);
  console.log(unique3); // [1, 2, 3, 4, 5]
}

removeDuplicates();

// Q: Find the intersection of two arrays
function findIntersection(arr1, arr2) {
  // Method 1: Using filter
  return arr1.filter((item) => arr2.includes(item));

  // Method 2: Using Set
  // const set2 = new Set(arr2);
  // return arr1.filter(item => set2.has(item));
}

console.log(findIntersection([1, 2, 3, 4], [3, 4, 5, 6])); // [3, 4]

// Q: Implement a function to chunk an array into smaller arrays of specified size
function chunkArray(arr, size) {
  const result = [];

  for (let i = 0; i < arr.length; i += size) {
    result.push(arr.slice(i, i + size));
  }

  return result;
}

console.log(chunkArray([1, 2, 3, 4, 5, 6, 7, 8], 3)); // [[1, 2, 3], [4, 5, 6], [7, 8]]

// =====================
// 5. STRING QUESTIONS
// =====================

// Q: Implement a function to reverse a string (without using reverse())
function reverseString(str) {
  let reversed = "";

  for (let i = str.length - 1; i >= 0; i--) {
    reversed += str[i];
  }

  return reversed;

  // Alternative method:
  // return str.split('').reverse().join('');
}

console.log(reverseString("hello")); // "olleh"

// Q: Check if a string is a palindrome
function isPalindrome(str) {
  // Remove non-alphanumeric characters and convert to lowercase
  const clean = str.toLowerCase().replace(/[^a-z0-9]/g, "");

  for (let i = 0; i < Math.floor(clean.length / 2); i++) {
    if (clean[i] !== clean[clean.length - 1 - i]) {
      return false;
    }
  }

  return true;
}

console.log(isPalindrome("A man, a plan, a canal: Panama")); // true
console.log(isPalindrome("hello")); // false

// Q: Count occurrences of each character in a string
function countCharacters(str) {
  const count = {};

  for (const char of str) {
    count[char] = (count[char] || 0) + 1;
  }

  return count;
}

console.log(countCharacters("hello world")); // { h: 1, e: 1, l: 3, o: 2, ' ': 1, w: 1, r: 1, d: 1 }

// Q: Implement a truncate function that truncates a string to a specified length with an ellipsis
function truncate(str, maxLength) {
  if (str.length <= maxLength) return str;

  return str.slice(0, maxLength - 3) + "...";
}

console.log(truncate("This is a long sentence", 10)); // "This is..."
console.log(truncate("Short", 10)); // "Short"

// =====================
// 6. LOOPING QUESTIONS
// =====================

// Q: What are different ways to loop through an array in JavaScript?
function differentLoops() {
  const array = [10, 20, 30, 40, 50];

  console.log("1. for loop:");
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }

  console.log("2. for...of loop:");
  for (const item of array) {
    console.log(item);
  }

  console.log("3. forEach method:");
  array.forEach((item) => {
    console.log(item);
  });

  console.log("4. map method (returns new array):");
  array.map((item) => {
    console.log(item);
    return item * 2;
  });

  console.log("5. while loop:");
  let i = 0;
  while (i < array.length) {
    console.log(array[i]);
    i++;
  }

  console.log("6. do...while loop:");
  let j = 0;
  do {
    console.log(array[j]);
    j++;
  } while (j < array.length);
}

// Q: What are different ways to loop through an object in JavaScript?
function objectLoops() {
  const person = {
    name: "Alice",
    age: 30,
    job: "Engineer",
  };

  console.log("1. for...in loop:");
  for (const key in person) {
    if (Object.hasOwn(person, key)) {
      console.log(`${key}: ${person[key]}`);
    }
  }

  console.log("2. Object.keys():");
  Object.keys(person).forEach((key) => {
    console.log(`${key}: ${person[key]}`);
  });

  console.log("3. Object.values():");
  Object.values(person).forEach((value) => {
    console.log(value);
  });

  console.log("4. Object.entries():");
  Object.entries(person).forEach(([key, value]) => {
    console.log(`${key}: ${value}`);
  });
}

// Q: Implement a function that works like Promise.all using loops
function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (promises.length === 0) {
      resolve([]);
      return;
    }

    const results = new Array(promises.length);
    let pending = promises.length;

    promises.forEach((promise, index) => {
      Promise.resolve(promise)
        .then((result) => {
          results[index] = result;
          pending--;

          if (pending === 0) {
            resolve(results);
          }
        })
        .catch(reject);
    });
  });
}

// Usage example
// const promises = [
//   Promise.resolve(1),
//   Promise.resolve(2),
//   Promise.resolve(3)
// ];
// promiseAll(promises).then(console.log); // [1, 2, 3]

// Q: Implement a function to flatten nested arrays with a specified depth
function flattenToDepth(arr, depth = 1) {
  let result = [];

  for (const item of arr) {
    if (Array.isArray(item) && depth > 0) {
      result = result.concat(flattenToDepth(item, depth - 1));
    } else {
      result.push(item);
    }
  }

  return result;
}

console.log(flattenToDepth([1, [2, [3, 4]], 5], 1)); // [1, 2, [3, 4], 5]
console.log(flattenToDepth([1, [2, [3, 4]], 5], 2)); // [1, 2, 3, 4, 5]

// promise chain
function getUser(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ id: user, name: "vedant" });
    }, 1000);
  });
}

function getDetails(user) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({ company: "ARWL" });
    }, 1000);
  });
}

function updateDetails(company) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      company = "unifynd";
      resolve(company);
    }, 1000);
  });
}

getUser(3)
  .then(getDetails)
  .then(updateDetails)
  .then(console.log)
  .catch((error) => console.log(error));
