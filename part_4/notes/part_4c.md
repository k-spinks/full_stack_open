# Part 4C — User Administration

## 📌 Core Concepts

### 1. Purpose of User Administration

- User administration introduces **identity, ownership, and access control** into a backend system.
- Enables the backend to answer:
  - _Who is making this request?_
  - _What data do they own?_
  - _What are they allowed to do?_

Mental model:

> Users give meaning and boundaries to data.

---

### 2. Authentication vs Authorization

- **Authentication**: verifying _who_ the user is.
- **Authorization**: deciding _what_ the user is allowed to do.

Key distinction:

> Authentication answers “Who are you?”
> Authorization answers “Are you allowed to do this?”

---

## 🗃️ Data Modeling & Ownership

### 3. One‑to‑Many Relationships

- Most backend systems involve ownership relationships:
  - One user → many resources

- Resources should be explicitly linked to the user who created them.

Why this matters:

- Enables authorization rules
- Prevents unauthorized access or modification

---

### 4. Modeling Relationships in Document Databases

- Document databases do not enforce foreign keys.
- Relationships are modeled using **references**:
  - Store an ID pointing to another document

Key idea:

> The database stores references, the application enforces relationships.

---

### 5. Bidirectional Referencing

- Common pattern:
  - Resource stores a reference to its owner
  - User stores references to owned resources

Tradeoff:

- Redundant references increase consistency requirements
- Improve query efficiency and clarity

---

## 🔐 Passwords & Security

### 6. Password Handling Principles

- Never store plaintext passwords.
- Store only **password hashes**.
- Hashing is:
  - One‑way
  - Computationally expensive
  - Resistant to reversal

Mental model:

> You should never be able to retrieve a user’s password.

---

### 7. Input Validation for User Creation

User creation endpoints must validate:

- Required fields exist
- Username constraints (length, format)
- Password constraints (length, strength)

Key idea:

> Trust nothing coming from the client.

---

### 8. Enforcing Uniqueness

- User identifiers (e.g. usernames or emails) must be unique.
- Uniqueness should be enforced at:
  - Schema level
  - Application logic level

Why both:

- Schema prevents duplicates
- Application provides clear error messages

---

## 🌐 API Design Considerations

### 9. User‑Related Endpoints

Typical user endpoints:

- Create user
- List users
- Fetch user details

Design principles:

- Never expose sensitive fields
- Return only what the client needs

---

### 10. Resource Ownership Rules

Authorization rules often include:

- Only the creator can modify or delete a resource
- Read access may be broader than write access

Mental model:

> Ownership is checked on every sensitive operation.

---

## 🧠 Data Enrichment & References

### 11. Populating References

- References can be resolved into full objects when needed.
- Allows richer API responses without duplicating data.

Concept to understand:

> Population behaves like a runtime join, not stored duplication.

---

## ❗ Error Handling & API Behavior

### 12. Validation & Error Responses

APIs should return:

- Clear status codes
- Descriptive error messages
- No internal implementation details

Principle:

> Errors are part of the API contract.

---

## 🧠 Critical Things to Understand

- User administration enables ownership and authorization.
- Document databases require application‑level relationship enforcement.
- Password security is non‑negotiable.
- Uniqueness must be enforced defensively.
- Authorization logic depends on reliable ownership modeling.

---

## 🔑 Key Takeaways

- Users define identity and access boundaries.
- Ownership links users to the data they create.
- Authentication and authorization solve different problems.
- Secure password handling is foundational.
- Good user models simplify authorization logic everywhere else.

---

## 📌 Summary

User administration transforms a backend from a generic data store into a system with identity, security, and ownership. By modeling users correctly, enforcing uniqueness and password safety, and linking resources to their creators, you establish the foundation required for authentication, authorization, and real‑world application behavior.
