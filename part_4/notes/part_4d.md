# Part 4D — Token Authentication

## 📌 Core Concepts

### 1. Purpose of Token-Based Authentication

- Token authentication allows the backend to **identify users on every request** without server-side sessions.
- After a successful login, the backend issues a **signed token** that the client uses to prove identity.

Mental model:

> Each request carries its own proof of identity.

---

### 2. Authentication Flow (High-Level)

1. Client sends login credentials to the backend.
2. Backend verifies credentials.
3. Backend generates a signed token.
4. Client stores the token.
5. Client sends the token with future requests.
6. Backend verifies the token and extracts user identity.

Key idea:

> Authentication happens once; authorization happens on every request.

---

## 🔐 JSON Web Tokens (JWT)

### 3. What a JWT Is

- A JWT is a **signed data object** that contains user identity information.
- It can be verified without storing session state.
- The signature guarantees the token was issued by a trusted server.

Concept:

> If the signature is valid, the token can be trusted.

---

### 4. Token Payload & Signing

- Tokens usually contain:
  - User ID
  - Username or identifier

- Tokens are signed using a **secret key** known only to the server.

Important:

> Anyone can read the payload, but only the server can sign valid tokens.

---

## 📡 Sending & Verifying Tokens

### 5. Authorization Header

- Tokens are sent using the HTTP `Authorization` header:

  ```
  Authorization: Bearer <token>
  ```

- The `Bearer` scheme indicates token-based authentication.

---

### 6. Token Verification on Requests

When a protected request arrives:

1. Extract token from the request header.
2. Verify the token signature.
3. Decode user identity.
4. Reject the request if verification fails.

Mental model:

> Verification proves both authenticity and identity.

---

## ❗ Errors & Validation

### 7. Invalid or Missing Tokens

Common failure cases:

- No token provided
- Malformed token
- Invalid signature
- Expired token

Expected response:

- `401 Unauthorized`

Principle:

> Authentication failures must fail fast and clearly.

---

## ⏱️ Token Expiration & Security

### 8. Token Expiry

- Tokens can be configured to expire after a set duration.
- Expiry limits damage if a token is compromised.

Trade-off:

- Short expiry → higher security
- Long expiry → better user experience

---

### 9. Token Revocation Limitations

- JWTs are **stateless**.
- Once issued, they cannot be revoked without additional infrastructure.

Common strategies:

- Use short-lived tokens
- Introduce server-side session tracking

Key understanding:

> Stateless systems trade control for scalability.

---

## 🧩 Middleware & Separation of Concerns

### 10. Token Extraction as Middleware

- Token parsing and verification logic should be centralized.
- Middleware can:
  - Extract token
  - Verify it
  - Attach user info to the request

Design principle:

> Authentication logic should not live inside route handlers.

---

## 🧠 Critical Things to Understand

- Tokens replace server-side sessions.
- Every protected request must verify identity.
- Token verification relies entirely on secret management.
- Stateless authentication scales well but complicates revocation.
- Authentication and authorization are separate concerns.

---

## 🔑 Key Takeaways

- Token authentication enables scalable APIs.
- JWTs are signed, not encrypted.
- Tokens must be verified on every protected request.
- Expiry is essential for security.
- Middleware keeps authentication logic clean and reusable.

---

## 📌 Summary

Token-based authentication provides a stateless way to identify users across requests. By issuing signed tokens at login and verifying them on protected routes, a backend can enforce authorization rules without maintaining session state. Proper handling of secrets, expiration, and middleware separation is critical for building secure and maintainable authentication systems.
