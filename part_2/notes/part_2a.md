# Part A: Rendering a collection, modules

## 📌 Core Concepts

### 1. Rendering Lists with `map`

- Use `array.map()` to transform data into JSX.
- Standard method for rendering dynamic collections in React.

  ```jsx
  {
    notes.map((note) => <li>{note.content}</li>);
  }
  ```

### 2. The `key` Prop

- Required for lists.
- Must be **unique and stable** (typically `id`).
- Helps React track items during updates.

  ```jsx
  notes.map((note) => <li key={note.id}>{note.content}</li>);
  ```

- Avoid using array indexes as keys.

### 3. Extracting Components

- Move repeated UI into standalone components.

  ```jsx
  const Note = ({ note }) => <li>{note.content}</li>;
  ```

- Improves reusability and clarity.

### 4. Using Modules for Structure

- Keep each component in its own file.

  ```js
  export default Note;
  import Note from "./components/Note";
  ```

- Helps maintain structure as apps grow.

### 5. Debugging Basics

- Keep the browser console open.
- Use `console.log()` to inspect props and state.
- Log objects using commas, not concatenation.

## 🧠 Key Takeaways

- Use `map` to generate JSX from arrays.
- Always provide a proper `key` prop.
- Break UI into small, focused components.
- Organize components using ES modules.
- Debug frequently using the console.
