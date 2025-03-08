// JavaScript Prototyping and Inheritance
// JavaScript uses prototype-based inheritance, which is different from classical inheritance in many other languages

// 1. What is a prototype in JavaScript?
// Every JavaScript object has a prototype property, which is a reference to another object.
// When you try to access a property that doesn't exist on an object, JavaScript checks its prototype.

// Creating objects with prototypes
const person = {
  isHuman: true,
  introduce: function () {
    return `Hi, I'm ${this.name}. Am I human? ${this.isHuman}`;
  },
};

// Object.create() creates a new object with the specified prototype
const john = Object.create(person);
john.name = "John";
console.log(john.introduce()); // "Hi, I'm John. Am I human? true"
console.log(john.isHuman); // true (inherited from prototype)

// 2. The prototype chain
// If JavaScript can't find a property on an object or its prototype, it looks at the prototype's prototype
const grandparent = { family: "Smith", trait: "humor" };
const parent = Object.create(grandparent);
parent.trait = "intelligence"; // Override inherited property

const child = Object.create(parent);
child.hobby = "coding";

console.log(child.hobby); // "coding" (own property)
console.log(child.trait); // "intelligence" (from parent)
console.log(child.family); // "Smith" (from grandparent)

// 3. Constructor functions and prototypes
function User(name, email) {
  this.name = name;
  this.email = email;
}

// Adding methods to prototype
User.prototype.sayHello = function () {
  return `Hello, my name is ${this.name}`;
};

User.prototype.getEmail = function () {
  return this.email;
};

const user1 = new User("Alice", "alice@example.com");
const user2 = new User("Bob", "bob@example.com");

console.log(user1.sayHello()); // "Hello, my name is Alice"
console.log(user2.sayHello()); // "Hello, my name is Bob"

// Both instances share the same methods through the prototype
console.log(user1.sayHello === user2.sayHello); // true

// 4. Checking prototype relationships
console.log(Object.getPrototypeOf(john) === person); // true
console.log(john instanceof Object); // true
console.log(user1 instanceof User); // true

// 5. ES6 Classes (syntactic sugar over prototypes)
class Animal {
  constructor(name) {
    this.name = name;
  }

  speak() {
    return `${this.name} makes a sound`;
  }
}

class Dog extends Animal {
  constructor(name, breed) {
    super(name);
    this.breed = breed;
  }

  speak() {
    return `${this.name} barks`;
  }

  fetch() {
    return `${this.name} fetches the ball`;
  }
}

const dog = new Dog("Rex", "German Shepherd");
console.log(dog.speak()); // "Rex barks"
console.log(dog.fetch()); // "Rex fetches the ball"

// Under the hood, the class syntax still uses prototypes
console.log(Object.getPrototypeOf(dog) === Dog.prototype); // true
console.log(Object.getPrototypeOf(Dog.prototype) === Animal.prototype); // true

// 6. The prototype property vs. __proto__
// Every function has a prototype property used when constructing objects
// Every object has a __proto__ property pointing to its prototype

function Vehicle(type) {
  this.type = type;
}

Vehicle.prototype.describe = function () {
  return `This is a ${this.type}`;
};

const car = new Vehicle("car");

console.log(Vehicle.prototype); // the prototype object for Vehicle instances
console.log(car.__proto__); // same as Vehicle.prototype
console.log(Object.getPrototypeOf(car) === Vehicle.prototype); // true

// 7. Problems with prototype modification
// Modifying a built-in prototype is typically a bad practice

// Don't do this in production code!
Array.prototype.first = function () {
  return this[0];
};

const nums = [1, 2, 3];
console.log(nums.first()); // 1

// This can cause issues with:
// - Code readability (unexpected methods)
// - Compatibility with future JavaScript versions
// - Conflicts with libraries

// 8. Creating clean inheritance patterns
function Parent(name) {
  this.name = name;
}

Parent.prototype.identify = function () {
  return `I am ${this.name}`;
};

function Child(name, age) {
  Parent.call(this, name); // Call parent constructor with this
  this.age = age;
}

// Set up prototype chain properly
Child.prototype = Object.create(Parent.prototype);
Child.prototype.constructor = Child; // Fix constructor property

// Add Child-specific methods
Child.prototype.sayAge = function () {
  return `I am ${this.age} years old`;
};

const alex = new Child("Alex", 8);
console.log(alex.identify()); // "I am Alex" (inherited)
console.log(alex.sayAge()); // "I am 8 years old"

// 9. Object prototypes vs. native prototypes
// All built-in JavaScript objects have their own prototypes
// String -> String.prototype -> Object.prototype -> null
// Array -> Array.prototype -> Object.prototype -> null
// Function -> Function.prototype -> Object.prototype -> null

// 10. Prototypal inheritance patterns
// 1. Prototype delegation (used above)
// 2. Concatenative inheritance (mixins)

// Mixins - copying properties from multiple sources
const swimmer = {
  swim: function () {
    return `${this.name} is swimming`;
  },
};

const flyer = {
  fly: function () {
    return `${this.name} is flying`;
  },
};

function Duck(name) {
  this.name = name;
}

// Mix multiple behaviors into Duck.prototype
Object.assign(Duck.prototype, swimmer, flyer);

const donald = new Duck("Donald");
console.log(donald.swim()); // "Donald is swimming"
console.log(donald.fly()); // "Donald is flying"

// 11. Modern alternatives to prototypal inheritance
// Many modern JS apps use composition over inheritance
// Using factory functions with closures:

function createPerson(name) {
  return {
    getName: () => name,
    setName: (newName) => {
      name = newName;
    },
  };
}

function createEmployee(name, position) {
  const person = createPerson(name);
  return {
    ...person,
    getPosition: () => position,
    getDetails: () => `${person.getName()} works as ${position}`,
  };
}

const employee = createEmployee("Sarah", "Developer");
console.log(employee.getDetails()); // "Sarah works as Developer"
