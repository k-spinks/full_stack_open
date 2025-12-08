# Part D: Altering Data on the Server (Essential Notes)

## 📘 Core Concepts

### 1. **REST & Resources**

- Server data is organized into **resources** (e.g., notes, persons).
- Each resource has a unique URL: `/notes/1` refers to the note with id 1.
- Collections live at endpoints like `/notes`.

### 2. **POST — Creating Data on the Server**

- Use `POST` to send new data to the server.
- Data **must** be JSON.
- Server returns the newly created resource **including its id**.
- Client updates state immutably using the returned object.

  ```js
  axios.post(baseUrl, newNote).then((res) => {
    setNotes(notes.concat(res.data));
  });
  ```

### 3. **PUT — Updating Data on the Server**

- To update an item, create a **new object** using spread syntax.

  ```js
  const changedNote = { ...note, important: !note.important };
  ```

- Send update via `PUT` to `/notes/{id}`.
- Update state immutably when server responds:

  ```js
  setNotes(notes.map((n) => (n.id !== id ? n : res.data)));
  ```

### 4. **Immutability**

- Never mutate React state directly.
- Always create new objects/arrays.
- Methods to use:

  - `concat()`
  - `map()`
  - spread syntax (`{ ...obj }`)

### 5. **Promises & Asynchronous Flow**

- All server requests are asynchronous.
- UI renders **before** data arrives.
- React updates the UI again after state changes.
- Use `.then()` to act only after data returns.

### 6. **Error Handling**

- Server updates can fail (e.g. resource missing).
- Handle failures using `catch`:

  ```js
  axios.put(...).catch(error => {
    // show notification, update UI, remove from state, etc.
  })
  ```

- Ensures UI stays consistent with server state.

### 7. **Service Modules (Separation of Concerns)**

- Move all axios calls into a separate file (e.g. `services/notes.js`).
- Makes components cleaner and easier to maintain.
- Example:

  ```js
  const getAll = () => axios.get(baseUrl);
  const create = (newObj) => axios.post(baseUrl, newObj);
  const update = (id, newObj) => axios.put(`${baseUrl}/${id}`, newObj);
  ```

## 🧠 Critical Things to Understand

- **React state and server data are independent** — you must keep them in sync manually.
- **Server assigns IDs** for new data, so you must use the returned object.
- **Optimistic updates** vs. **real updates**: state changes only after request succeeds unless explicitly handled otherwise.
- **Immutability is non‑negotiable** in React for state updates.
- **Components should not handle API details** — let service modules abstract them.

## ✅ Key Takeaways

- Understanding how to create and update server data is essential for any real React app.
- Always:

  - Avoid mutating state.
  - Update state with server‑returned data.
  - Handle asynchronous operations properly.
  - Manage errors to keep UI stable.

- Organizing server logic into service files results in cleaner, scalable code.

## 🎯 Summary

This section teaches how React communicates with a backend using REST principles. You learn how to **create**, **update**, and **sync** server data while maintaining React's core rules: immutability, controlled state updates, and separation of concerns. These concepts form the foundation for full‑stack React applications.
