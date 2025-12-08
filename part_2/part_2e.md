# Part E: Adding Styles to React Apps

## 🎨 Core Concepts

### 1. **Styling Approaches in React**

React supports multiple ways to apply styles:

- **Global / external CSS files**
- **Class-based CSS with `className`**
- **Inline styles (JS objects)**

Each approach has strengths and limitations — understanding when to use each is essential.

---

## 🖌️ Global / External CSS

- CSS file is imported into the project (e.g., `import './index.css'`).
- Styles apply **globally**.
- Best for:

  - Base styles
  - Typography
  - General layout rules

- **Risk:** Global styles can unintentionally affect components due to selector collisions.

---

## 🏷️ Class-based Styling (`className`)

- Define classes in CSS and apply using `className`.

  ```jsx
  <div className="note">content</div>
  ```

- Most common, scalable approach for React.
- Encourages separation of concerns.
- Avoids side effects from global CSS by using more targeted selectors.

**When to use:**

- Component-level styles
- Reusable style groupings
- Maintaining clarity and structure in UI styling

---

## 🎛️ Inline Styles

- Defined as JS objects inside components.
- Properties use **camelCase** instead of CSS kebab-case.

  ```jsx
  const style = {
    color: 'green',
    fontSize: 18
  }
  <p style={style}>text</p>
  ```

**Strengths:**

- Great for **dynamic styles** based on props or state.
- No naming collisions.

**Weaknesses:**

- Cannot use pseudo-classes (`:hover`, `:focus`).
- No media queries.
- Less maintainable for large styling tasks.

---

## ⚠️ Critical Things to Understand

### 1. **React uses `className`, not `class`**

JSX reserves `class`, so `className` must be used.

### 2. **Inline styles are objects**

- Cannot write CSS syntax.
- Must use JavaScript-style camelCase.

### 3. **Separation of Concerns**

- As apps grow, mixing large style blocks directly inside components can reduce readability.
- Prefer external CSS or class-based approaches for scalability.

### 4. **CSS Specificity Matters**

- Global styles may override component styles unintentionally.
- Avoid overly general selectors.

### 5. **Styling Is Still Just CSS**

React doesn't change CSS fundamentals — it only changes how we apply them.

---

## 🧠 Key Takeaways

- Use **external CSS** for global styles and layout foundations.
- Use **class-based styling** for most component-level styling.
- Use **inline styles** only for dynamic, JS-driven styling needs.
- Maintain consistent structure so styles remain predictable as the app grows.
- Keep components clean — avoid bloating them with large inline style objects.
- Know the limitations of each approach so you can choose the right one for the job.

---

## 🎯 Summary

This section introduces how to apply CSS to React apps effectively. The goal is to understand the strengths and trade-offs of global CSS, class-based styles, and inline styles. Mastering these approaches ensures that your React UI is maintainable, scalable, and visually consistent.
