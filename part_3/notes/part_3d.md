# Part 3D — Validation and ESLint

## 📌 Core Concepts

### 1. **Data Validation**

- **Validation** ensures that server-received data meets rules before saving it to a database. For example:
  - Required fields are present.
  - Fields meet length or format constraints (e.g., string length, phone number format). :contentReference[oaicite:0]{index=0}

#### Why Validation Matters

- Prevents invalid or malformed data from being stored.
- Helps avoid bugs later in application logic.
- Improves API robustness and security (don’t trust client input).

### 2. **Validation with Mongoose**

- Mongoose schemas support built-in validators like:
  - `required`
  - `minLength`
  - Custom patterns or logic if needed. :contentReference[oaicite:1]{index=1}
- When a validation rule is violated during `.save()`, Mongoose throws a **ValidationError**.
- Use an **error handling middleware** in Express to catch and respond with appropriate errors:
  - Catch exceptions with `.catch(error => next(error))` after async operations. :contentReference[oaicite:2]{index=2}
  - Convert Mongoose errors into useful JSON responses (e.g., `400 Bad Request` with details). :contentReference[oaicite:3]{index=3}

### 3. **Error Handling Middleware**

- Always centralize error handling instead of duplicating logic in each route.
- Typical Error Handler Logic:
  - Determine the type of error (`error.name`)
  - Return appropriate HTTP status codes:
    - `ValidationError` → `400`
    - `CastError` (bad IDs) → `400` with readable message
    - Others → pass to next error handler. :contentReference[oaicite:4]{index=4}
- Ensures consistent responses for failures.

---

## 🛠 ESLint — Static Code Analysis

### 4. **What is ESLint?**

- A **linter** is a tool that performs static analysis — reading source code and flagging:
  - Errors
  - Suspicious constructs
  - Style problems
- In JavaScript, **ESLint** is the de-facto linter. :contentReference[oaicite:5]{index=5}

### 5. **Installing & Configuring ESLint**

- Add ESLint as a **development dependency**:
  ````bash
  npm install eslint @eslint/js --save-dev
  ``` :contentReference[oaicite:6]{index=6}
  ````
- Initialize a config file using:
  ````bash
  npx eslint --init
  ``` :contentReference[oaicite:7]{index=7}
  ````
- Config files (e.g., `eslint.config.mjs` or `.eslintrc.js`) define:
  - Plugins
  - Rule sets
  - Syntax and parser options
  - Files to include/exclude

### 6. **Common ESLint Rules**

- Rules can be from:
  - Built-in recommended rules (`eslint:recommended`)
  - Plugins (e.g., stylistic rules for formatting) :contentReference[oaicite:8]{index=8}

Examples of useful style rules:

- `eqeqeq`: enforce `===` instead of `==`
- `no-trailing-spaces`: avoid trailing whitespace
- `object-curly-spacing`: enforce spacing inside `{ }`
- `arrow-spacing`: consistent spacing in arrow functions
- Optionally disable rules like `no-console` during development. :contentReference[oaicite:9]{index=9}

### 7. **Ignoring Files**

- Exclude directories that shouldn't be linted (e.g., build/dist output) using:
  - `.eslintignore`
  - `ignores` in config. :contentReference[oaicite:10]{index=10}

### 8. **Running ESLint**

- Run manually:
  ````bash
  npx eslint .
  ``` :contentReference[oaicite:11]{index=11}
  ````
- Add an npm script:
  ```json
  {
    "scripts": {
      "lint": "eslint ."
    }
  }
  ```
