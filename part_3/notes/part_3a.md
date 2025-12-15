# Part A - Node.js and Express

## 🌐 Core Concepts

### 1. Node.js as a Backend Runtime

- **Node.js** allows JavaScript to run on the server.
- Built on Chrome’s V8 engine.
- Uses an **event-driven, non-blocking I/O model** → good for handling many simultaneous requests.
- Projects are managed with **npm** and a `package.json` file.

---

### 2. Express Framework

- **Express** is a minimal web framework for Node.js.
- Simplifies:

  - Routing
  - Request/response handling
  - Middleware usage

- Installed via:

  ```bash
  npm install express
  ```

- Core pattern:

  ```js
  const express = require("express");
  const app = express();
  ```

---

## 🔁 REST APIs & HTTP

### 3. REST Principles

- Server exposes **resources** via URLs (e.g. `/api/persons`).
- Uses standard HTTP methods:

  - `GET` → read data
  - `POST` → create data
  - `DELETE` → remove data
  - `PUT / PATCH` → update data

- Data is exchanged as **JSON**.

---

### 4. Routing in Express

- Routes define how server responds to HTTP requests.
- Example:

  ```js
  app.get("/api/persons", (req, res) => {
    res.json(persons);
  });
  ```

- Route parameters (e.g. `:id`) are accessed via `req.params`.

---

## 📦 Middleware

### 5. express.json()

- Parses incoming JSON request bodies.
- Required for accessing `req.body`.

  ```js
  app.use(express.json());
  ```

- Middleware runs **before route handlers**.

### 6. Request–Response Cycle

- Client sends request → middleware runs → route handler executes → response sent.
- Each request is handled independently.

---

## ⚠️ Critical Things to Understand

### 1. Backend Validation Is Mandatory

- Never trust client-side data.
- Server must check:

  - Required fields exist
  - Data is valid and consistent

- Invalid requests should return proper HTTP status codes.

### 2. HTTP Status Codes Matter

- Examples:

  - `200` → OK
  - `201` → Created
  - `204` → No Content (successful delete)
  - `400` → Bad Request
  - `404` → Not Found

- Status codes communicate outcome clearly to the client.

### 3. State Lives on the Server

- Backend maintains its own data state (even if in-memory at first).
- Frontend and backend must stay in sync via API calls.

### 4. JSON Is the Contract

- Frontend and backend agree on data shape.
- Changes to response format affect the client.

---

## 🧠 Key Takeaways

- Node.js enables JavaScript-based backends.
- Express provides a clean, readable way to build REST APIs.
- REST conventions make APIs predictable and scalable.
- Middleware is essential for parsing data and extending server behavior.
- Validation and proper status codes are critical for robust backends.
- This section lays the foundation for all future backend development.

---

## 🎯 Summary

This section introduces how to build a basic backend using Node.js and Express. You learn how servers handle HTTP requests, expose RESTful APIs, parse JSON, and validate data. These concepts are fundamental to full-stack development and necessary for connecting React applications to real backends.
