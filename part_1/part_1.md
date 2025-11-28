# Part a: Introduction to React

## ✅ Topics Covered

- **Setting up a React app**

  - Use Vite: `npm create vite@latest`
  - Run app: install dependencies → `npm run dev`

- **Basic component structure**

  - Components as JS functions returning JSX
  - Export and render with `ReactDOM.createRoot(...).render(<App />)`

- **JSX & dynamic content**

  - JSX syntax resembles HTML but is JavaScript
  - Embed dynamic values using `{ ... }`

- **Component composition / reuse**

  - Define multiple components (e.g. `Hello`) and use inside others
  - Promotes modularity and reusability

- **Passing data with props**

  - Supply data from parent to child via props
  - Props become parameters on child component

- **Important React conventions / gotchas**

  - Component names must start with capital letters
  - JSX tags must be closed
  - Only render strings, numbers, or React elements in JSX (not raw objects)
  - Multiple returned elements need a single root or use fragments `<> ... </>`

## 🧠 Key Concepts & Takeaways

- React components are JavaScript functions; JS logic can be used inside them
- JSX is syntactic sugar for `React.createElement(...)`
- Component architecture + props = reusability and clarity
- React conventions help prevent bugs: naming, JSX structure, renderable data
- Test small changes iteratively and use console logging for debugging

## 🎯 Relevance / Why It Matters

- Shows how to set up a React project from scratch
- Clarifies how components work (JS + JSX + rendering logic)
- Emphasizes composition and props for maintainable UIs
- Surfaces common pitfalls (component names, rendering objects)

## 📌 Bottom-Line Takeaways

- React UI = JavaScript + JSX
- Practice creating small components, nesting, and passing data via props
- Follow React conventions to avoid bugs
- Test iteratively and observe rendering behavior

---

**Suggested practice**: Build a small component tree (e.g., greeting list) using functional components and props, log internal values to console to understand rendering order.
