// Advanced JavaScript Interview Concepts
// Focusing on closures, async JavaScript, design patterns, event loop, memory management, and performance optimization

// =====================
// 1. CLOSURES
// =====================

// Q: What is a closure and how/why would you use one?
function closureExample() {
  /* 
      A closure is a function that has access to its own scope, the scope of the outer function,
      and the global scope. Closures remember the environment in which they were created,
      even after the outer function has finished executing.
    */

  function createCounter() {
    let count = 0; // Private variable

    return {
      increment: function () {
        count++;
        return count;
      },
      decrement: function () {
        count--;
        return count;
      },
      getCount: function () {
        return count;
      },
    };
  }

  const counter = createCounter();
  console.log(counter.increment()); // 1
  console.log(counter.increment()); // 2
  console.log(counter.decrement()); // 1
  console.log(counter.getCount()); // 1

  // Uses of closures:
  // 1. Data encapsulation / private variables
  // 2. Function factories
  // 3. Memoization / caching
  // 4. Implementing modules
}

// Q: Implement a memoization function using closures
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (key in cache) {
      console.log("Returning from cache");
      return cache[key];
    }

    const result = fn.apply(this, args);
    cache[key] = result;

    return result;
  };
}

// Example usage for expensive calculation
function fibonacci(n) {
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}

const memoizedFibonacci = memoize(fibonacci);
console.log(memoizedFibonacci(40)); // Slow the first time
console.log(memoizedFibonacci(40)); // Instant from cache

// Q: Create a module pattern using closures
const bankAccount = (function () {
  let balance = 0; // Private variable

  function checkAmount(amount) {
    return typeof amount === "number" && amount > 0;
  }

  return {
    deposit: function (amount) {
      if (checkAmount(amount)) {
        balance += amount;
        return true;
      }
      return false;
    },
    withdraw: function (amount) {
      if (checkAmount(amount) && balance >= amount) {
        balance -= amount;
        return true;
      }
      return false;
    },
    getBalance: function () {
      return balance;
    },
  };
})();

console.log(bankAccount.getBalance()); // 0
console.log(bankAccount.deposit(100)); // true
console.log(bankAccount.getBalance()); // 100
console.log(bankAccount.withdraw(50)); // true
console.log(bankAccount.getBalance()); // 50

// =====================
// 2. ASYNCHRONOUS JAVASCRIPT
// =====================

// Q: Explain the evolution of async patterns in JavaScript
function asyncPatterns() {
  /*
      1. Callbacks
      2. Promises
      3. Async/Await
    */

  // Callback pattern (older style)
  function fetchDataCallback(id, callback) {
    setTimeout(() => {
      const data = { id, name: "Item " + id };
      callback(null, data); // null is error, data is result
    }, 1000);
  }

  fetchDataCallback(1, (error, data) => {
    if (error) {
      console.error("Error:", error);
    } else {
      console.log("Callback data:", data);

      // Callback hell example (nested callbacks)
      fetchDataCallback(2, (error, data2) => {
        if (error) {
          console.error("Error:", error);
        } else {
          console.log("Nested callback data:", data2);
        }
      });
    }
  });

  // Promise pattern
  function fetchDataPromise(id) {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const data = { id, name: "Item " + id };
        resolve(data);
        // To simulate error: reject(new Error('Failed to fetch'));
      }, 1000);
    });
  }

  fetchDataPromise(3)
    .then((data) => {
      console.log("Promise data:", data);
      return fetchDataPromise(4); // Chain promises
    })
    .then((data) => {
      console.log("Chained promise data:", data);
    })
    .catch((error) => {
      console.error("Promise error:", error);
    });

  // Async/Await pattern (modern)
  async function fetchMultipleData() {
    try {
      const data1 = await fetchDataPromise(5);
      console.log("Async/await data1:", data1);

      const data2 = await fetchDataPromise(6);
      console.log("Async/await data2:", data2);

      return [data1, data2];
    } catch (error) {
      console.error("Async/await error:", error);
    }
  }

  fetchMultipleData().then((results) => {
    console.log("All results:", results);
  });

  // Promise.all example (parallel execution)
  Promise.all([fetchDataPromise(7), fetchDataPromise(8), fetchDataPromise(9)])
    .then((allData) => {
      console.log("Promise.all results:", allData);
    })
    .catch((error) => {
      console.error("One promise failed:", error);
    });

  // Promise.race example (first to complete)
  Promise.race([
    fetchDataPromise(10),
    new Promise((resolve) => setTimeout(() => resolve("Timeout"), 500)),
  ]).then((result) => {
    console.log("Promise.race winner:", result);
  });
}

// Q: Implement a delay function that returns a promise
function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Usage example
async function delayExample() {
  console.log("Starting");
  await delay(2000); // Wait 2 seconds
  console.log("After 2 seconds");
}

// Q: Create a function to retry an async operation with exponential backoff
async function retryWithBackoff(operation, maxRetries = 3, baseDelay = 300) {
  let retries = 0;

  while (true) {
    try {
      return await operation();
    } catch (error) {
      retries++;

      if (retries > maxRetries) {
        throw error; // Max retries reached, rethrow the error
      }

      const delayTime = baseDelay * Math.pow(2, retries - 1);
      console.log(`Retry ${retries} after ${delayTime}ms`);
      await delay(delayTime);
    }
  }
}

// Example usage
async function fetchWithRetry(url) {
  return retryWithBackoff(() =>
    fetch(url).then((res) => {
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return res.json();
    })
  );
}

// =====================
// 3. EVENT LOOP
// =====================

// Q: Explain JavaScript's event loop and task queues
function eventLoopExplained() {
  /*
      The event loop is JavaScript's mechanism for executing code, collecting and processing events,
      and executing queued sub-tasks. It consists of:
      
      1. Call Stack: Where synchronous code execution happens
      2. Task Queue (Macrotask Queue): For callbacks from setTimeout, setInterval, etc.
      3. Microtask Queue: For Promises and queueMicrotask
      4. Event Loop: Constantly checks if call stack is empty, then processes microtasks,
         then takes one macrotask and repeats
    */

  console.log("1. Synchronous code");

  setTimeout(() => {
    console.log("4. Timeout callback (macrotask)");
  }, 0);

  Promise.resolve().then(() => {
    console.log("3. Promise.then callback (microtask)");
  });

  queueMicrotask(() => {
    console.log("2. Explicit microtask");
  });

  console.log("5. More synchronous code");

  // Execution order will be:
  // 1, 5, 2, 3, 4
  // (sync code first, then microtasks, then macrotasks)
}

// Q: What happens when you mix async/await with other async code?
async function asyncAwaitEventLoop() {
  console.log("1. Start of async function");

  setTimeout(() => {
    console.log("5. Timeout callback");
  }, 0);

  await Promise.resolve();
  console.log("3. After await"); // This behaves like a .then() callback

  queueMicrotask(() => {
    console.log("4. Microtask after await");
  });

  console.log("2. End of async function");

  // Output:
  // 1, 3, 2, 4, 5
}

// =====================
// 4. DESIGN PATTERNS
// =====================

// Q: Implement the Singleton pattern in JavaScript
const Singleton = (function () {
  let instance;

  function createInstance() {
    const object = {
      timestamp: new Date(),
      randomId: Math.random(),
      getInfo: function () {
        return `Created at ${this.timestamp}, ID: ${this.randomId}`;
      },
    };
    return object;
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

// Usage
const instance1 = Singleton.getInstance();
const instance2 = Singleton.getInstance();
console.log(instance1 === instance2); // true
console.log(instance1.getInfo()); // Same info for both instances

// Q: Implement the Observer pattern (Pub/Sub)
class EventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
    return () => this.off(event, listener); // Return unsubscribe function
  }

  off(event, listener) {
    if (!this.events[event]) return;
    this.events[event] = this.events[event].filter((l) => l !== listener);
  }

  emit(event, ...args) {
    if (!this.events[event]) return;
    this.events[event].forEach((listener) => {
      listener.apply(this, args);
    });
  }

  once(event, listener) {
    const onceWrapper = (...args) => {
      listener.apply(this, args);
      this.off(event, onceWrapper);
    };
    return this.on(event, onceWrapper);
  }
}

// Usage
const emitter = new EventEmitter();
const unsubscribe = emitter.on("message", (data) => {
  console.log("Received message:", data);
});

emitter.emit("message", "Hello world"); // Logs: Received message: Hello world
unsubscribe(); // Remove the listener
emitter.emit("message", "You won't see this"); // No output

// Q: Implement a Factory pattern
function createUser(type) {
  const userTypes = {
    admin: AdminUser,
    regular: RegularUser,
    guest: GuestUser,
  };

  const UserType = userTypes[type] || userTypes.guest;
  return new UserType();
}

class AdminUser {
  constructor() {
    this.type = "admin";
    this.permissions = ["read", "write", "delete", "manage"];
  }

  describe() {
    return `Admin user with ${this.permissions.length} permissions`;
  }
}

class RegularUser {
  constructor() {
    this.type = "regular";
    this.permissions = ["read", "write"];
  }

  describe() {
    return `Regular user with ${this.permissions.length} permissions`;
  }
}

class GuestUser {
  constructor() {
    this.type = "guest";
    this.permissions = ["read"];
  }

  describe() {
    return `Guest user with ${this.permissions.length} permissions`;
  }
}

// Usage
const admin = createUser("admin");
const regular = createUser("regular");
const guest = createUser("guest");
const unknown = createUser("unknown"); // Will default to guest

console.log(admin.describe()); // Admin user with 4 permissions
console.log(regular.describe()); // Regular user with 2 permissions
console.log(guest.describe()); // Guest user with 1 permissions
console.log(unknown.describe()); // Guest user with 1 permissions

// =====================
// 5. MEMORY MANAGEMENT
// =====================

// Q: Common memory leaks in JavaScript and how to avoid them
function memoryLeakExamples() {
  /*
      Common memory leaks in JavaScript:
      
      1. Accidental global variables
      2. Forgotten timers or callbacks
      3. Closures that reference large objects
      4. DOM references kept in JavaScript
      5. Event listeners not properly removed
    */

  // 1. Accidental global variable (use strict mode to prevent)
  function createGlobal() {
    "use strict";
    // accidentalGlobal = 'This would leak without strict mode';

    // Proper declaration:
    const localVar = "This is properly scoped";
  }

  // 2. Forgotten timer example
  function startTimer() {
    const largeData = new Array(1000000).fill("X"); // Large array

    const timerId = setInterval(() => {
      console.log("Timer using largeData:", largeData.length);
      // largeData is kept in memory as long as the timer runs
    }, 1000);

    // To fix: Keep the timer ID and clear it when done
    // clearInterval(timerId);

    return timerId; // Return so it can be cleared elsewhere
  }

  // 3. Closure capturing large object
  function closureLeak() {
    const largeData = new Array(1000000).fill("X");

    function processSomeData() {
      // This function captures largeData in its closure
      return largeData.length;
    }

    return processSomeData;

    // Better approach - only keep what you need:
    // const dataSize = largeData.length;
    // return function() { return dataSize; };
  }

  // 4. DOM references
  function setupDOM() {
    const elements = [];

    for (let i = 0; i < 10; i++) {
      const element = document.createElement("div");
      document.body.appendChild(element);

      // Storing DOM reference in array
      elements.push(element);

      // If we later remove the elements from DOM but keep the array:
      // document.body.removeChild(element);
      // The elements are still in memory because of our array reference
    }

    // To fix: When done with elements, empty the array:
    // elements.length = 0;
  }

  // 5. Event listeners not removed
  function addEventListeners() {
    const button = document.createElement("button");

    const handleClick = () => {
      console.log("Button clicked");
    };

    button.addEventListener("click", handleClick);

    // If we remove the button later without removing the listener:
    // document.body.removeChild(button);

    // To fix, also call:
    // button.removeEventListener('click', handleClick);
  }
}

// Q: Implement a WeakMap cache for DOM elements
function domCache() {
  // WeakMap allows garbage collection of keys (DOM elements in this case)
  const cache = new WeakMap();

  function saveDataForElement(element, data) {
    cache.set(element, data);
  }

  function getDataForElement(element) {
    return cache.get(element);
  }

  // Usage example
  const div = document.createElement("div");
  saveDataForElement(div, { id: 123, name: "Test Element" });

  console.log(getDataForElement(div)); // { id: 123, name: 'Test Element' }

  // If 'div' is removed and no longer referenced,
  // the data in the WeakMap can be garbage collected
}

// =====================
// 6. PERFORMANCE OPTIMIZATION
// =====================

// Q: Debounce and throttle functions
function debounce(func, wait) {
  let timeout;

  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

function throttle(func, limit) {
  let inThrottle;

  return function executedFunction(...args) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => {
        inThrottle = false;
      }, limit);
    }
  };
}

// Usage example
const expensiveOperation = () => console.log("Expensive operation");
const debouncedFn = debounce(expensiveOperation, 300);
const throttledFn = throttle(expensiveOperation, 300);

// On rapid calls, debounced function will only execute once after 300ms of inactivity
// On rapid calls, throttled function will execute immediately and then at most once every 300ms

// Q: Implement a simple virtual DOM concept
class VirtualNode {
  constructor(tagName, props = {}, children = []) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }

  render() {
    // Create the actual DOM element
    const element = document.createElement(this.tagName);

    // Add attributes
    Object.entries(this.props).forEach(([key, value]) => {
      if (key === "className") {
        element.className = value;
      } else if (key === "style" && typeof value === "object") {
        Object.entries(value).forEach(([styleKey, styleValue]) => {
          element.style[styleKey] = styleValue;
        });
      } else if (key.startsWith("on") && typeof value === "function") {
        const eventName = key.slice(2).toLowerCase();
        element.addEventListener(eventName, value);
      } else {
        element.setAttribute(key, value);
      }
    });

    // Add children
    this.children.forEach((child) => {
      if (child instanceof VirtualNode) {
        element.appendChild(child.render());
      } else {
        element.appendChild(document.createTextNode(String(child)));
      }
    });

    return element;
  }
}

// Usage example
function createVirtualDom() {
  const vdom = new VirtualNode("div", { className: "container" }, [
    new VirtualNode("h1", {}, ["Virtual DOM Example"]),
    new VirtualNode("p", { style: { color: "blue", marginTop: "10px" } }, [
      "This is a paragraph with ",
      new VirtualNode("strong", {}, ["some emphasized text"]),
      " and an ",
      new VirtualNode("a", { href: "#", onClick: () => alert("Clicked!") }, [
        "interactive link",
      ]),
    ]),
  ]);

  // Render to actual DOM
  const rootElement = vdom.render();
  // document.body.appendChild(rootElement);

  return rootElement;
}

// Q: Web Workers for handling CPU-intensive tasks
function webWorkerExample() {
  // This would typically be in a separate file, but shown here for the example
  const workerCode = `
      self.addEventListener('message', function(e) {
        const numbers = e.data;
        let sum = 0;
        
        // Simulate CPU-intensive work
        for (let i = 0; i < numbers.length; i++) {
          sum += Math.sqrt(numbers[i]) * Math.sqrt(numbers[i]);
        }
        
        self.postMessage({ result: sum });
      });
    `;

  // Create a blob from the code
  const blob = new Blob([workerCode], { type: "application/javascript" });
  const workerUrl = URL.createObjectURL(blob);

  // Create worker
  const worker = new Worker(workerUrl);

  // Setup message handler
  worker.onmessage = function (e) {
    console.log("Result from worker:", e.data.result);
    // Clean up
    worker.terminate();
    URL.revokeObjectURL(workerUrl);
  };

  // Generate large array of numbers
  const numbers = Array.from({ length: 10000000 }, (_, i) => i);

  // Send to worker
  worker.postMessage(numbers);
  console.log("Data sent to worker, UI remains responsive");
}

// =====================
// 7. WEB APIS AND BROWSER
// =====================

// Q: Explain DOM events, bubbling, capturing, and delegation
function domEvents() {
  /* 
      DOM Event Phases:
      1. Capturing phase - Event travels from window down to the target
      2. Target phase - Event reaches the target element
      3. Bubbling phase - Event bubbles up from target back to window
      
      Event delegation is a technique where you attach a single event listener
      to a parent element to handle events for multiple child elements.
    */

  function setupEventExample() {
    const parent = document.createElement("div");
    parent.className = "parent";

    const child = document.createElement("div");
    child.className = "child";
    parent.appendChild(child);

    // Event bubbling example
    parent.addEventListener("click", function (e) {
      console.log("Parent clicked, bubbling phase");
    });

    child.addEventListener("click", function (e) {
      console.log("Child clicked, bubbling phase");
      // e.stopPropagation(); // Uncomment to stop event bubbling
    });

    // Event capturing example
    parent.addEventListener(
      "click",
      function (e) {
        console.log("Parent clicked, capturing phase");
      },
      true
    ); // true enables capturing phase

    child.addEventListener(
      "click",
      function (e) {
        console.log("Child clicked, capturing phase");
      },
      true
    );

    // When child is clicked, the order of console logs will be:
    // 1. Parent clicked, capturing phase
    // 2. Child clicked, capturing phase
    // 3. Child clicked, bubbling phase
    // 4. Parent clicked, bubbling phase

    // Event delegation example
    const list = document.createElement("ul");

    // Add 5 list items
    for (let i = 1; i <= 5; i++) {
      const item = document.createElement("li");
      item.textContent = `Item ${i}`;
      item.dataset.id = i;
      list.appendChild(item);
    }

    // Instead of adding event listener to each li,
    // we add one listener to the parent ul
    list.addEventListener("click", function (e) {
      if (e.target.tagName === "LI") {
        console.log(`Clicked on item ${e.target.dataset.id}`);
      }
    });
  }
}

// Q: Implement custom drag and drop functionality
function dragAndDrop() {
  function setupDragDrop() {
    const dragElement = document.createElement("div");
    dragElement.className = "draggable";
    dragElement.draggable = true;

    const dropZone = document.createElement("div");
    dropZone.className = "drop-zone";

    // Set up drag events
    dragElement.addEventListener("dragstart", function (e) {
      e.dataTransfer.setData("text/plain", "dragged-element-id");
      e.dataTransfer.effectAllowed = "move";
      this.classList.add("dragging");
    });

    dragElement.addEventListener("dragend", function () {
      this.classList.remove("dragging");
    });

    // Set up drop zone events
    dropZone.addEventListener("dragover", function (e) {
      e.preventDefault(); // Allow drop
      e.dataTransfer.dropEffect = "move";
      this.classList.add("drag-over");
    });

    dropZone.addEventListener("dragleave", function () {
      this.classList.remove("drag-over");
    });

    dropZone.addEventListener("drop", function (e) {
      e.preventDefault();
      this.classList.remove("drag-over");

      const id = e.dataTransfer.getData("text/plain");
      if (id === "dragged-element-id") {
        this.appendChild(dragElement);
      }
    });
  }
}

// Q: Create a lazy loading implementation for images
function lazyLoadImages() {
  // Using Intersection Observer API
  function setupLazyLoading() {
    const images = document.querySelectorAll("img[data-src]");

    const imageObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src; // Load the actual image
            img.removeAttribute("data-src");
            imageObserver.unobserve(img); // Stop observing this image
          }
        });
      },
      {
        rootMargin: "0px 0px 200px 0px", // Start loading when image is 200px from viewport
      }
    );

    images.forEach((img) => {
      imageObserver.observe(img);
    });
  }

  // Example HTML that would work with this:
  // <img src="placeholder.jpg" data-src="actual-image.jpg" alt="Lazy loaded image">
}

// =====================
// 8. TESTING AND DEBUGGING
// =====================

// Q: Writing testable JavaScript code
function testableCode() {
  // Bad example - hard to test
  function hardToTestFunction() {
    const now = new Date();
    const hour = now.getHours();

    if (hour < 12) {
      document.getElementById("greeting").textContent = "Good morning!";
    } else if (hour < 18) {
      document.getElementById("greeting").textContent = "Good afternoon!";
    } else {
      document.getElementById("greeting").textContent = "Good evening!";
    }
  }

  // Better example - more testable
  function getGreeting(hour) {
    if (hour < 12) {
      return "Good morning!";
    } else if (hour < 18) {
      return "Good afternoon!";
    } else {
      return "Good evening!";
    }
  }

  function updateGreeting() {
    const now = new Date();
    const hour = now.getHours();
    const greeting = getGreeting(hour);

    document.getElementById("greeting").textContent = greeting;
  }

  // Now we can test getGreeting separately:
  console.assert(getGreeting(9) === "Good morning!", "Morning test failed");
  console.assert(
    getGreeting(14) === "Good afternoon!",
    "Afternoon test failed"
  );
  console.assert(getGreeting(20) === "Good evening!", "Evening test failed");
}

// Q: Implement a simple testing function
function test(name, fn) {
  try {
    fn();
    console.log(`✅ ${name} passed`);
  } catch (error) {
    console.error(`❌ ${name} failed: ${error.message}`);
  }
}

function expect(actual) {
  return {
    toBe(expected) {
      if (actual !== expected) {
        throw new Error(`Expected ${expected} but got ${actual}`);
      }
    },
    toEqual(expected) {
      const actualStr = JSON.stringify(actual);
      const expectedStr = JSON.stringify(expected);
      if (actualStr !== expectedStr) {
        throw new Error(`Expected ${expectedStr} but got ${actualStr}`);
      }
    },
  };
}

// Example usage
function runTests() {
  test("addition works", () => {
    expect(1 + 2).toBe(3);
  });

  test("object equality", () => {
    expect({ a: 1, b: 2 }).toEqual({ a: 1, b: 2 });
  });
}

// =====================
// 9. FUNCTIONAL PROGRAMMING
// =====================

// Q: Pure functions and their benefits
function pureFunctionExample() {
  // Impure function - depends on external state
  let counter = 0;
  function impureIncrement() {
    counter++;
    return counter;
  }

  // Pure function - same inputs always give same outputs
  function pureAdd(a, b) {
    return a + b;
  }

  /*
      Benefits of pure functions:
      1. Predictable - same input always gives same output
      2. No side effects - doesn't modify external state
      3. Easier to test - no setup required
      4. Can be memoized - results can be cached
      5. Can be parallelized - no dependencies between calls
    */
}

// Q: Implement a compose function for function composition
function compose(...fns) {
  return function (x) {
    return fns.reduceRight((acc, fn) => fn(acc), x);
  };
}

// Example usage
const addOne = (x) => x + 1;
const double = (x) => x * 2;
const square = (x) => x * x;

const computeValue = compose(square, double, addOne);
console.log(computeValue(2)); // square(double(addOne(2))) = square(double(3)) = square(6) = 36

// Q: Implement a pipe function (like compose but left-to-right)
function pipe(...fns) {
  return function (x) {
    return fns.reduce((acc, fn) => fn(acc), x);
  };
}

// Example usage
const computeValueLeftToRight = pipe(addOne, double, square);
console.log(computeValueLeftToRight(2)); // square(double(addOne(2))) = square(double(3)) = square(6) = 36
