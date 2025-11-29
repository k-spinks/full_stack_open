# Part C: Component state, event handlers

# Part 1: Component State & Event Handlers — Full Stack Open

## 🔄 Component State & Event Handlers

### Component Helper Functions & Destructuring

- Helper functions can be defined inside components.
- Destructure props to write cleaner code:

  ```js
  const { name, age } = props
  // or
  const Hello = ({ name, age }) => { ... }
  ```

### State & Re-rendering

- Changing a normal variable **does not** re-render the UI.
- Use **useState** to create reactive values:

  ```js
  const [counter, setCounter] = useState(0);
  ```

- Updating state with `setCounter` triggers a re-render.
- The component function runs again on every render.

### Event Handling

- Event handlers must be **functions**, not function calls.

  ```jsx
  <button onClick={() => setCounter(counter + 1)}>plus</button>
  ```

- You can define named functions:

  ```js
  const increaseByOne = () => setCounter(counter + 1);
  ```

- Pass handler functions to elements or child components.

### Breaking UI Into Components (Lifting State)

- Split UI into smaller components like `Display` and `Button`.
- The **parent stores the state**, children receive:

  - data (state) as props
  - event handlers as props

- Keeps components reusable and easy to understand.

### Re-render Flow & Debugging

- State changes → React re-renders the component.
- Use `console.log` to see render behavior and track updates.

## 🎯 Key Concepts & Takeaways

- `useState` gives components reactive state.
- Event handlers must be functions executed on interaction.
- Destructure props for readability.
- Keep components small; parent manages state.
- Use logging to understand render cycles.

## 📌 Why This Matters

- Enables interactive, dynamic user interfaces.
- Builds foundation for more advanced React patterns.
- Encourages clean structure with maintainable components.

## 📝 Bottom-Line Summary

- Use state (`useState`) for values that affect UI.
- Trigger re-renders with state updates.
- Use event handlers for user interaction.
- Organize components around responsibilities and pass data via props.
