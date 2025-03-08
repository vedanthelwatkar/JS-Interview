// 1. Event Delegation
// Event delegation is a technique where you attach an event listener to a parent element instead of individual child elements.

// Benefits of event delegation:
// - Memory efficient (fewer event listeners)
// - Works for dynamically added elements
// - Less code to maintain

// Example:
const parentList = document.getElementById("parent-list");

// Instead of adding event listeners to each li
parentList.addEventListener("click", function (event) {
  // Check if clicked element is a list item
  if (event.target.tagName === "LI") {
    console.log("List item clicked:", event.target.textContent);
  }
});

// 2. Event Loop
// The event loop is JavaScript's mechanism for handling asynchronous operations.

// Components:
// - Call Stack: Tracks function calls
// - Callback Queue: Holds callbacks from async operations
// - Microtask Queue: Higher priority queue (Promises)
// - Event Loop: Checks if call stack is empty, then moves callbacks to stack

// Execution order:
// 1. Synchronous code executes (Call Stack)
// 2. Microtasks execute (Promise callbacks)
// 3. Macrotasks execute (setTimeout, setInterval, DOM events)

// Example:
console.log("1"); // Synchronous

setTimeout(() => {
  console.log("2"); // Macrotask
}, 0);

Promise.resolve().then(() => {
  console.log("3"); // Microtask
});

console.log("4"); // Synchronous

// Output: 1, 4, 3, 2

// 3. Event Bubbling
// Event bubbling is a DOM event propagation mechanism where an event triggered on a nested element "bubbles up" through ancestors.

// Phases of event propagation:
// 1. Capturing phase (top down) - rarely used
// 2. Target phase (the element itself)
// 3. Bubbling phase (bottom up) - default behavior

// Example:
document.querySelector("div").addEventListener("click", function () {
  console.log("Div clicked (bubbling)");
});

document.querySelector("button").addEventListener("click", function (event) {
  console.log("Button clicked");
  // Stop bubbling if needed:
  // event.stopPropagation();
});

// When button is clicked: "Button clicked" then "Div clicked (bubbling)"

// To use capturing phase:
document.querySelector("div").addEventListener(
  "click",
  function () {
    console.log("Div clicked (capturing)");
  },
  true
); // true enables capturing phase

// 4. Reconciliation (React)
// Reconciliation is React's algorithm for determining what parts of the UI need to be updated.

// How it works:
// 1. React creates a virtual DOM representation
// 2. When state changes, it creates a new virtual DOM
// 3. It compares the new and old virtual DOMs (diffing)
// 4. Only updates the real DOM for elements that changed

// Key factors:
// - Virtual DOM comparisons are faster than real DOM operations
// - Uses element type, key props to identify components
// - Helps optimize rendering performance

// 5. Diffing Algorithm (React)
// The diffing algorithm is how React compares old and new virtual DOM trees.

// Rules:
// 1. Different element types produce different trees
// 2. Elements with stable keys maintain identity across renders
// 3. Lists without keys are inefficiently diffed

// Example of using keys:
function ListWithKeys() {
  const items = ["apple", "banana", "cherry"];

  return (
    <ul>
      {items.map((item, index) => (
        <li key={item}>{item}</li> // Using stable keys
      ))}
    </ul>
  );
}

// 6. Repainting
// Repainting occurs when changes affect the appearance but not the layout.

// What triggers repaints:
// - Color changes
// - Visibility changes
// - Background image changes

// What triggers more expensive reflows:
// - Adding/removing DOM elements
// - Changing element position
// - Changing element size
// - Font changes affecting size

// Optimizing:
const inefficient = () => {
  const div = document.getElementById("myDiv");
  div.style.color = "red"; // Repaint
  div.style.marginLeft = "10px"; // Reflow
  div.style.marginRight = "10px"; // Reflow
};

const optimized = () => {
  const div = document.getElementById("myDiv");
  // Batch changes with CSS classes
  div.className = "new-styles";
  // Or use cssText
  // div.style.cssText = 'color: red; margin-left: 10px; margin-right: 10px;';
};

// 7. How to Minimize Rerenders
// Strategies to reduce unnecessary renders in React:

// 1. Use React.memo for functional components
const MemoizedComponent = React.memo(function MyComponent(props) {
  // Only rerenders if props change
  return <div>{props.name}</div>;
});

// 2. Use shouldComponentUpdate for class components
class OptimizedComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Only rerender if specific props change
    return this.props.id !== nextProps.id;
  }

  render() {
    return <div>{this.props.name}</div>;
  }
}

// 3. Use PureComponent for shallow prop comparison
class MyPureComponent extends React.PureComponent {
  render() {
    return <div>{this.props.name}</div>;
  }
}

// 4. Use useMemo and useCallback hooks
function OptimizedFunctionalComponent() {
  const [count, setCount] = useState(0);

  // Memoized value
  const expensiveValue = useMemo(() => {
    return computeExpensiveValue(count);
  }, [count]);

  // Memoized callback
  const handleClick = useCallback(() => {
    setCount((c) => c + 1);
  }, []);

  return <ChildComponent value={expensiveValue} onClick={handleClick} />;
}

// 8. Code Splitting
// Code splitting is a technique to split your code into smaller chunks loaded on demand.

// React.lazy and Suspense example:
const LazyComponent = React.lazy(() => import("./LazyComponent"));

function MyApp() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
    </div>
  );
}

// Dynamic import example:
function MyComponent() {
  const [module, setModule] = useState(null);

  useEffect(() => {
    import("./math.js").then((math) => {
      // Use the module
      console.log(math.add(1, 2));
      setModule(math);
    });
  }, []);

  return <div>{module ? "Module loaded" : "Loading module..."}</div>;
}

// Route-based code splitting with React Router:
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import React, { Suspense, lazy } from "react";

const Home = lazy(() => import("./Home"));
const About = lazy(() => import("./About"));

function MyRouter() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/about" component={About} />
        </Switch>
      </Suspense>
    </Router>
  );
}

// 9. How to Create Custom Hooks
// Custom hooks are JavaScript functions that start with "use" and can call other hooks.

// Example: Custom hook for form handling
function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = (callback) => (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    callback();
  };

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    setValues,
    setErrors,
  };
}

// Using the custom hook:
function SignupForm() {
  const { values, handleChange, handleSubmit } = useForm({
    email: "",
    password: "",
  });

  const submitForm = () => {
    console.log("Form submitted with:", values);
  };

  return (
    <form onSubmit={handleSubmit(submitForm)}>
      <input name="email" value={values.email} onChange={handleChange} />
      <input
        type="password"
        name="password"
        value={values.password}
        onChange={handleChange}
      />
      <button type="submit">Submit</button>
    </form>
  );
}

// 10. useReducer Hook
// useReducer is an alternative to useState for complex state logic.

// Example:
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    case "SET":
      return { count: action.payload };
    default:
      return state;
  }
}

function CounterWithReducer() {
  const [state, dispatch] = useReducer(counterReducer, { count: 0 });

  return (
    <div>
      Count: {state.count}
      <button onClick={() => dispatch({ type: "INCREMENT" })}>+</button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}>-</button>
      <button onClick={() => dispatch({ type: "RESET" })}>Reset</button>
      <button onClick={() => dispatch({ type: "SET", payload: 10 })}>
        Set to 10
      </button>
    </div>
  );
}

// 11. Lifecycle Methods - Class and Function Based
// Class-based lifecycle methods:
class LifecycleComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: null };
    // Initialization
  }

  // Mounting
  componentDidMount() {
    // After component is inserted in DOM
    // Good for API calls, subscriptions
    this.fetchData();
  }

  // Updating
  shouldComponentUpdate(nextProps, nextState) {
    // Return false to prevent rendering
    return this.state.data !== nextState.data;
  }

  componentDidUpdate(prevProps, prevState) {
    // After component updates
    if (prevProps.id !== this.props.id) {
      this.fetchData();
    }
  }

  // Unmounting
  componentWillUnmount() {
    // Before component is removed
    // Good for cleanup (cancel subscriptions, etc.)
    this.subscription.unsubscribe();
  }

  // Error handling
  componentDidCatch(error, info) {
    // Handle errors in child components
    this.setState({ hasError: true });
  }

  render() {
    return <div>{this.state.data}</div>;
  }
}

// Function-based with hooks (equivalent lifecycle functionality):
function FunctionalLifecycle(props) {
  const [data, setData] = useState(null);
  const [hasError, setHasError] = useState(false);

  // componentDidMount + componentDidUpdate (conditional)
  useEffect(() => {
    fetchData();

    // componentWillUnmount
    return () => {
      // Cleanup
      subscription.unsubscribe();
    };
  }, [props.id]); // Only re-run if props.id changes

  // Error boundary (no direct equivalent, need ErrorBoundary component)

  // No direct equivalent for shouldComponentUpdate
  // Use React.memo or useMemo instead

  return <div>{data}</div>;
}

// 12. Memoization
// Memoization is an optimization technique that stores results of expensive function calls.

// Simple memoization example:
function memoize(fn) {
  const cache = {};

  return function (...args) {
    const key = JSON.stringify(args);

    if (cache[key]) {
      console.log("Fetching from cache");
      return cache[key];
    }

    console.log("Computing result");
    const result = fn(...args);
    cache[key] = result;
    return result;
  };
}

// Usage:
const expensiveCalculation = (a, b) => {
  // Simulate expensive operation
  console.log("Calculating...");
  return a * b;
};

const memoizedCalculation = memoize(expensiveCalculation);

console.log(memoizedCalculation(4, 2)); // Calculating... 8
console.log(memoizedCalculation(4, 2)); // Fetching from cache 8

// React hooks for memoization:
function MemoExample() {
  const [count, setCount] = useState(0);
  const [otherState, setOtherState] = useState(0);

  // useMemo - memoize values
  const expensiveValue = useMemo(() => {
    console.log("Computing expensive value");
    return computeExpensiveValue(count);
  }, [count]); // Only recompute when count changes

  // useCallback - memoize functions
  const memoizedCallback = useCallback(() => {
    console.log("Using callback with:", count);
    doSomething(count);
  }, [count]); // Only recreate when count changes

  return (
    <div>
      <button onClick={() => setCount((c) => c + 1)}>Increment count</button>
      <button onClick={() => setOtherState((s) => s + 1)}>
        Update other state
      </button>
      <ChildComponent value={expensiveValue} onClick={memoizedCallback} />
    </div>
  );
}

// 13. DOM Manipulation
// Direct DOM manipulation in React should generally be avoided, but sometimes necessary.

// Using useRef for DOM access:
function DOMManipulation() {
  const inputRef = useRef(null);

  useEffect(() => {
    // DOM manipulation in useEffect
    if (inputRef.current) {
      inputRef.current.focus();

      // Direct DOM manipulation (be careful!)
      inputRef.current.style.border = "2px solid blue";
    }
  }, []);

  const handleButtonClick = () => {
    // DOM manipulation on event
    inputRef.current.value = "";
    inputRef.current.focus();
  };

  return (
    <div>
      <input ref={inputRef} type="text" />
      <button onClick={handleButtonClick}>Clear & Focus</button>
    </div>
  );
}

// Class component equivalent:
class DOMManipulationClass extends React.Component {
  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  handleButtonClick = () => {
    this.inputRef.current.value = "";
    this.inputRef.current.focus();
  };

  render() {
    return (
      <div>
        <input ref={this.inputRef} type="text" />
        <button onClick={this.handleButtonClick}>Clear & Focus</button>
      </div>
    );
  }
}

// 14. When to Use useRef Hook
// The useRef hook is useful for:
// 1. Accessing DOM elements directly
// 2. Persisting values between renders without causing re-renders
// 3. Tracking previous state or props values

// Example for DOM element access:
function TextInputWithFocusButton() {
  const inputRef = useRef(null);

  const handleClick = () => {
    // Access DOM element
    inputRef.current.focus();
  };

  return (
    <>
      <input ref={inputRef} type="text" />
      <button onClick={handleClick}>Focus Input</button>
    </>
  );
}

// Example for persisting values between renders:
function CountRenders() {
  const [count, setCount] = useState(0);

  // This ref doesn't trigger re-renders when changed
  const renderCount = useRef(0);

  useEffect(() => {
    // Update without re-rendering
    renderCount.current += 1;
  });

  return (
    <div>
      <p>Count: {count}</p>
      <p>This component has rendered {renderCount.current} times</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// Example for tracking previous values:
function usePrevious(value) {
  const ref = useRef();

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);

  return (
    <div>
      <p>
        Current: {count}, Previous: {prevCount}
      </p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// 15. Closure
// A closure is a function that has access to its outer function's scope, even after the outer function has returned.

// Basic closure example:
function createCounter() {
  let count = 0; // Private variable

  return function () {
    count++; // Has access to count via closure
    return count;
  };
}

const counter = createCounter();
console.log(counter()); // 1
console.log(counter()); // 2

// Closure in React hooks:
function CounterWithClosure() {
  const [count, setCount] = useState(0);

  // This function "closes over" the current count value
  const logCount = () => {
    // This will capture the count value when the function is created
    setTimeout(() => {
      console.log(`Count: ${count}`);
    }, 3000);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
      <button onClick={logCount}>Log count in 3 seconds</button>
    </div>
  );
}

// Closure issues - stale closures:
function StaleClosureExample() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This closure captures the initial count (0)
    const timer = setInterval(() => {
      console.log(`Current count: ${count}`);
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array - effect runs only once

  // Fix: Add count to dependencies or use functional updates

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount((c) => c + 1)}>Increment</button>
    </div>
  );
}

// 16. Promise Chain
// Promise chains allow you to perform sequential asynchronous operations.

// Simple promise chain:
fetchUser(userId)
  .then((user) => {
    console.log(user);
    return fetchUserPosts(user.id);
  })
  .then((posts) => {
    console.log(posts);
    return fetchPostComments(posts[0].id);
  })
  .then((comments) => {
    console.log(comments);
  })
  .catch((error) => {
    console.error("Error in promise chain:", error);
  })
  .finally(() => {
    console.log("Promise chain completed");
  });

// Async/await equivalent:
async function fetchUserData(userId) {
  try {
    const user = await fetchUser(userId);
    console.log(user);

    const posts = await fetchUserPosts(user.id);
    console.log(posts);

    const comments = await fetchPostComments(posts[0].id);
    console.log(comments);
  } catch (error) {
    console.error("Error fetching data:", error);
  } finally {
    console.log("Async operation completed");
  }
}

// Promise methods:
// Promise.all - wait for all promises to resolve
Promise.all([fetchUser(1), fetchUser(2), fetchUser(3)])
  .then(([user1, user2, user3]) => {
    console.log("All users:", user1, user2, user3);
  })
  .catch((error) => {
    console.error("Any promise rejected:", error);
  });

// Promise.race - resolves/rejects when first promise settles
Promise.race([fetchWithTimeout(url, 5000), fetchWithFallback(url)])
  .then((result) => {
    console.log("First result:", result);
  })
  .catch((error) => {
    console.error("First error:", error);
  });

// Promise.allSettled - wait for all promises to settle
Promise.allSettled([fetchUser(1), fetchUser(2), Promise.reject("Failed")]).then(
  (results) => {
    // Results array contains status and value/reason for each promise
    results.forEach((result) => {
      if (result.status === "fulfilled") {
        console.log("Fulfilled:", result.value);
      } else {
        console.log("Rejected:", result.reason);
      }
    });
  }
);

// 17. Security Methods
// Common security concerns and prevention methods in JavaScript applications:

// 1. Cross-Site Scripting (XSS) Prevention:
const userInput = '<script>alert("XSS")</script>';

// Unsafe:
// document.getElementById('output').innerHTML = userInput;

// Safe (escaping HTML):
function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

document.getElementById("output").textContent = userInput; // Safe
// Or
document.getElementById("output").innerHTML = escapeHTML(userInput); // Safe

// 2. Cross-Site Request Forgery (CSRF) Prevention:
// Using CSRF tokens:
const csrfToken = getCsrfTokenFromServer();

fetch("/api/update", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "X-CSRF-Token": csrfToken,
  },
  body: JSON.stringify(data),
});

// 3. Content Security Policy (CSP):
// Set via HTTP header or meta tag:
// <meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self' trusted-scripts.com;">

// 4. HTTPS usage:
if (location.protocol !== "https:") {
  // Redirect to HTTPS
  location.href = "https:" + location.href.substring(location.protocol.length);
}

// 5. HttpOnly and Secure Cookie Flags:
// Set server-side in response headers
// Set-Cookie: sessionId=abc123; HttpOnly; Secure; SameSite=Strict

// 6. Input validation (client & server):
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// 7. Sanitizing HTML (when needed):
// Using DOMPurify library:
// const cleanHTML = DOMPurify.sanitize(userInput);
// element.innerHTML = cleanHTML;

// 8. Avoiding eval() and new Function():
// Unsafe:
// eval(userInput);
// new Function(userInput)();

// Safe alternative (with limited functionality):
const jsonData = '{"name":"John"}';
const data = JSON.parse(jsonData); // Safe for JSON

// 18. How to Prevent Memory Leakage
// Common memory leak causes and prevention in JavaScript:

// 1. Forgotten event listeners:
// Problem:
function addHandlersWithLeak() {
  const button = document.getElementById("button");
  button.addEventListener("click", function () {
    console.log("Button clicked");
  });
  // No way to remove this listener later
}

// Solution:
function addHandlersWithoutLeak() {
  const button = document.getElementById("button");
  const handleClick = function () {
    console.log("Button clicked");
  };

  button.addEventListener("click", handleClick);

  // Save reference to remove later
  return function cleanup() {
    button.removeEventListener("click", handleClick);
  };
}

// 2. Forgotten setInterval/setTimeout:
// Problem:
function startTimerWithLeak() {
  setInterval(() => {
    // Do something
  }, 1000);
  // No way to clear this interval
}

// Solution:
function startTimerWithoutLeak() {
  const timerId = setInterval(() => {
    // Do something
  }, 1000);

  return function cleanup() {
    clearInterval(timerId);
  };
}

// 3. React useEffect cleanup:
function ComponentWithCleanup() {
  useEffect(() => {
    const subscription = dataSource.subscribe();
    const timerId = setInterval(() => {
      // Do something
    }, 1000);

    // Return cleanup function
    return () => {
      subscription.unsubscribe();
      clearInterval(timerId);
    };
  }, []);

  return <div>Component content</div>;
}

// 4. Circular references:
// Problem:
function createCircularReference() {
  const obj1 = {};
  const obj2 = {};

  obj1.ref = obj2;
  obj2.ref = obj1; // Circular reference

  // These objects may not be garbage collected
}

// Solution:
function preventCircularReferenceLeak() {
  const obj1 = {};
  const obj2 = {};

  obj1.ref = obj2;

  // Later, break the reference
  obj1.ref = null;
}

// 5. Closures capturing large objects:
// Problem:
function closureCapturesLargeData() {
  const largeData = new Array(1000000).fill("x");

  return function () {
    // This function captures largeData in closure
    console.log(largeData.length);
  };
}

// Solution:
function closureWithoutLeak() {
  const largeData = new Array(1000000).fill("x");
  const dataLength = largeData.length;

  return function () {
    // Only captures what's needed (dataLength)
    console.log(dataLength);
  };
}

// 6. Using WeakMap/WeakSet for object references:
// Strong reference (may cause leak):
const cache = new Map();

function processObject(obj) {
  if (!cache.has(obj)) {
    const result = expensiveOperation(obj);
    cache.set(obj, result); // Holds strong reference to obj
  }
  return cache.get(obj);
}

// Weak reference (allows garbage collection):
const weakCache = new WeakMap();

function processObjectWithoutLeak(obj) {
  if (!weakCache.has(obj)) {
    const result = expensiveOperation(obj);
    weakCache.set(obj, result); // Holds weak reference to obj
  }
  return weakCache.get(obj);
}

// 19. What is Babel
// Babel is a JavaScript compiler that converts modern JavaScript code into backwards-compatible versions.

// What Babel does:
// 1. Transforms syntax (ES6+ to ES5)
// 2. Polyfills features missing in browsers
// 3. Transforms JSX to JavaScript
// 4. Supports custom plugins/presets

// Example of Babel transformation:

// ES6+ code:
const arrowFunc = (x) => x * 2;
const [a, b, ...rest] = [1, 2, 3, 4, 5];
class Person {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    return `Hello, ${this.name}!`;
  }
}

// After Babel transforms to ES5:
("use strict");

var arrowFunc2 = function (x) {
  return x * 2;
};

var _ref = [1, 2, 3, 4, 5],
  a2 = _ref[0],
  b2 = _ref[1],
  rest2 = _ref.slice(2);

var Person = (function () {
  function Person(name) {
    this.name = name;
  }

  Person.prototype.sayHello = function sayHello() {
    return "Hello, " + this.name + "!";
  };

  return Person;
})();

// Babel configuration (babel.config.js):
/*
module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        targets: "> 0.25%, not dead",
        useBuiltIns: "usage",
        corejs: 3
      }
    ],
    "@babel/preset-react"
  ],
  plugins: [
    "@babel/plugin-proposal-class-properties",
    "@babel/plugin-transform-runtime"
  ]
};
*/

// Common Babel presets:
// - @babel/preset-env: Smart transpiling based on target environments
// - @babel/preset-react: For JSX transformation
// - @babel/preset-typescript: For TypeScript support

// Using Babel with webpack:
/*
module: {
  rules: [
    {
      test: /\.js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env', '@babel/preset-react'],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    }
  ]
}
*/
