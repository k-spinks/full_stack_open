# Part B: Forms

## 📌 Core Concepts

### 1. State for Form Data

- Store lists/items in state using `useState`.
- Store input values (e.g. `newNote`) in state to make controlled inputs.

### 2. Controlled Components

- Input value comes from state.
- `onChange` updates state.

  ```jsx
  <input value={newNote} onChange={handleNoteChange} />
  ```

- `handleNoteChange` reads `event.target.value` and updates state.

### 3. Handling Form Submission

- Use `onSubmit` on the `<form>`.
- Call `event.preventDefault()` to stop page reload.
- Create a new object (e.g. a new note) and update the list using an immutable update.
- Reset the input state afterward.

### 4. Immutable State Updates

- Never mutate arrays directly.
- Use non-mutating methods like:

  ```js
  setNotes(notes.concat(newNote));
  ```

### 5. Conditional Rendering / Filtering

- Use state (e.g. `showAll`) to dynamically choose what to render.

  ```js
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  ```

### 6. Component Architecture

- Keep state and logic in higher-level components.
- Pass data and event handlers to child components as props.
- Children focus on display, not managing state.

## 🧠 Key Takeaways

- Use controlled inputs for predictable form behavior.
- Always prevent default form submission behavior.
- Use immutable patterns for updating arrays.
- Use filtering + state for dynamic UI.
- Keep stateful logic in parent components and UI in child components.
