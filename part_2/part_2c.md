# Part C: Getting Data from Server

## 📌 JSON Server (Fake Backend)

- Use **json-server** to simulate a REST API during development.
- Data stored in `db.json`.
- Common endpoints:

  - `GET /resources`
  - `POST /resources`

- Run with: `npx json-server --port 3001 db.json`

## 📌 Fetching Data in React

- Use **axios** or `fetch` to load data from server.
- Basic GET example:

  ```js
  axios.get("http://localhost:3001/notes").then((res) => setNotes(res.data));
  ```

- Requests are **asynchronous** → return a **Promise**.

## 📌 useEffect for Initial Data Fetch

- Fetch data once when component mounts:

  ```js
  useEffect(() => {
    axios.get(url).then((res) => setData(res.data));
  }, []);
  ```

- Flow:

  1. Component renders with initial state.
  2. `useEffect` runs → fetch request.
  3. When data arrives → call `setState`.
  4. Component re-renders with real data.

## 📌 State & Re-renders

- Updating state after fetching triggers re-render.
- Initial render may show empty lists/placeholder data.

## 📌 npm Dependencies

- Install packages as needed:

  - `npm install axios`
  - `npm install json-server --save-dev`

- Run client + server in separate terminals.

## 🧠 Key Takeaways

- json-server provides a quick backend for development.
- Fetching data is asynchronous and must be handled after the response arrives.
- `useEffect` is required for performing side effects like data fetching.
- React’s state system ensures the UI updates when fetched data is stored.
