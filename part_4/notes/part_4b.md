# Part 4B — Backend Testing Fundamentals

## 📌 Core Concepts

### 1. Purpose of Backend Testing

- Backend tests verify **API behavior, data integrity, and system correctness**.
- They protect against **regressions** when code changes.
- Tests serve as **executable documentation** for how the API is supposed to behave.
- Backend bugs are costly because they often affect persisted data.

Mental model:

> Tests define the contract between clients and your backend.

---

### 2. Types of Backend Tests

#### Unit Tests

- Test **individual functions or modules** in isolation.
- No database, network, or framework dependencies.
- Fast and precise, but limited confidence on their own.

#### Integration Tests (Most Important for APIs)

- Test **multiple layers together**:
  - HTTP request
  - Routing
  - Middleware
  - Database
  - Response

- Slower than unit tests but provide much higher confidence.

Mental model:

> Integration tests answer: “Does the system work as a whole?”

---

### 3. Environment Separation

- Backend applications should behave differently depending on environment:
  - `development`
  - `test`
  - `production`

Key ideas:

- Tests must **never touch production data**.
- Use a **separate test database**.
- Environment variables control configuration (DB URI, ports, secrets).

Isolation ensures:

- Repeatable test runs
- No accidental data corruption

---

## 🧪 API Testing Fundamentals

### 4. Testing HTTP APIs

- API tests simulate **real HTTP requests** (GET, POST, PUT, DELETE).
- No real server is required; tests run against the app instance.

Key assertions:

- HTTP status codes
- Response format (usually JSON)
- Response body content
- Side effects (database changes)

---

### 5. HTTP Status Codes as Part of the Contract

Correct status codes are essential:

- `200 OK` – successful request
- `201 Created` – resource created
- `204 No Content` – successful deletion
- `400 Bad Request` – invalid input
- `401 Unauthorized` – missing or invalid credentials
- `404 Not Found` – resource does not exist

Tests should **enforce correct status code usage**.

---

### 6. Testing Success and Failure Paths

Good test suites include:

- Valid requests (happy paths)
- Invalid input
- Missing required fields
- Malformed identifiers
- Unauthorized access

Mental model:

> If it can fail in production, it should be tested.

---

## 🔁 Test Reliability & Isolation

### 7. Deterministic Tests

Reliable tests are:

- **Repeatable** – same result every run
- **Independent** – not affected by other tests
- **Predictable** – known starting state

Common techniques:

- Reset database before each test
- Seed known test data
- Avoid relying on execution order

---

### 8. Test Lifecycle Hooks

Lifecycle hooks manage setup and teardown:

- `beforeEach` – prepare known state
- `afterEach` – clean up side effects (optional)
- `afterAll` – close resources (DB connections)

Key idea:

> Tests should leave the system exactly as they found it.

---

## ⏳ Asynchronous Code & Testing

### 9. async / await in Backend Tests

- Backend operations are asynchronous:
  - Database queries
  - Network calls
  - File I/O

- `async / await` makes async code easier to reason about.

- Tests must **wait for async operations to complete**.

Guidelines:

- Use `async / await` consistently
- Avoid mixing with `.then()`

Mental model:

> A test finishes only when all awaited promises resolve.

---

## 🗃️ Database Assertions

### 10. Verifying Data Changes

Tests should verify not just responses, but **data correctness**:

- Record counts before vs after
- Presence or absence of specific data
- Correct transformations of stored data

Why this matters:

- APIs can lie
- Databases don’t

---

### 11. Comparing Returned Data

- Primitive values → strict equality
- Objects and arrays → deep equality

Important distinction:

- Structural equality matters more than reference equality in API tests.

---

## 🧠 Critical Things to Understand

- Backend tests focus on **behavior**, not implementation details.
- Integration tests provide the most confidence for APIs.
- Environment isolation is non‑negotiable.
- Database state must be controlled for reliable tests.
- Async behavior affects both application code and tests.

---

## 🔑 Key Takeaways

- Treat your API as a contract.
- Favor integration tests over excessive unit tests.
- Always test both success and failure cases.
- Control state to keep tests deterministic.
- A strong backend test suite enables fearless refactoring.

---

## 📌 Summary

Backend testing ensures that APIs behave correctly under real-world conditions. By isolating environments, controlling database state, and focusing on integration-level behavior, you create backend systems that are reliable, maintainable, and safe to evolve as complexity grows.
