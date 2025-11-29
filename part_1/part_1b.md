# Part B: JavaScript

## 🧩 Overview

- Learn modern JavaScript (ECMAScript) for web development.
- JS evolves quickly; course uses up-to-date ES features.
- Browser support varies; React apps via Vite handle transpilation automatically.
- Node.js often supports new JS features without transpiling.

## 🔧 Core JavaScript Concepts

### Variables

- **const**: constant reference; cannot be reassigned.
- **let**: mutable variable; can change value and type.
- **var**: older and discouraged.

### Arrays

- Dynamic and can contain mixed types.
- `const` arrays allow modifying contents.
- Useful methods:

  - `forEach()`
  - `map()` for transforming arrays (often used in React)

- **Destructuring**:

  ```js
  const [first, second, ...rest] = arr;
  ```

### Objects

- Use object literals; properties can be any type.
- Access via dot notation or bracket notation.
- Objects can be modified at runtime.
- ES6 class syntax exists but JS still uses prototypal inheritance.

### Functions

- **Arrow functions**:

  ```js
  const sum = (a, b) => a + b;
  ```

- Traditional function declarations also exist.
- Arrow functions are commonly used in modern JS.

### `this` and Methods

- `this` depends on how a function is called.
- Can behave unexpectedly when functions are passed around.
- Modern React avoids `this`-heavy patterns.

## 🎯 Why This Matters

- Strengthens JS fundamentals for both frontend and backend work.
- Essential for React, Node.js, and general modern development.
- ES6+ features lead to cleaner, more maintainable code.
- Deep knowledge improves debugging and architecture decisions.

## 📝 Quick Summary

- Course uses modern JS with transpilation support.
- Key areas: variables, arrays, objects, functions, `this`.
- Functional JS patterns (map, immutability) are emphasized.
- Explore recommended resources for deeper understanding.
