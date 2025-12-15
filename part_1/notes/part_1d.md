# Part D: A More Complex State & Debugging React Apps

## 🔄 Complex State & Managing Multiple State Pieces

- Simple apps may have a single state value, but real apps often need multiple pieces.

  ```js
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(0);
  ```

- Alternatively, store multiple values in a single object state:

  ```js
  const [clicks, setClicks] = useState({ left: 0, right: 0 });
  ```

- Use separate state values for cleaner code instead of a big object.

## 📑 Working with Arrays in State

- State can be an array (e.g., history of clicks).
- Avoid mutating arrays; use methods that return a new array (`concat`) to update state.

  ```js
  const [allClicks, setAll] = useState([]);
  setAll(allClicks.concat("L"));
  ```

## ⏳ State Updates Are Asynchronous

- State updates may not apply immediately.
- Calculate new values before calling setters to avoid bugs.

## 🧱 Component Structure, Conditional Rendering & Clean Code

- Split UI into focused components: `Button`, `History`, `Display`.
- Parent holds state; children receive data and handlers via props.
- Use conditional rendering for different UI states.
- Avoid defining components inside other components.

## 🐞 Debugging React Apps

- Keep the browser console open; fix errors immediately.
- Use `console.log` to inspect props/state.
- Use `debugger;` or browser breakpoints for step-through debugging.
- React Developer Tools browser extension is useful for inspecting component tree and state.

## ✅ Hooks and State Best Practices

- Only call hooks at the top level of components.
- Treat state as immutable; always create a new copy when updating objects/arrays.

## 🎯 Key Concepts & Takeaways

- Use separate state variables for complex state.
- Avoid mutating arrays/objects in state.
- Understand asynchronous state updates.
- Structure UI with parent state and child components.
- Debug actively using console, devtools, and React DevTools.
- Follow hook rules and keep components focused.

## 📌 Bottom-Line Summary

- For complex app state, split state variables, avoid mutation, and maintain clean UI structure.
- Combine with disciplined debugging and hook usage for robust React apps.
