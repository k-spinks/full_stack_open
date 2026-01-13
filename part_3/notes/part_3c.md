# Part 3C — Saving data to MongoDB

## 1. Why Use a Database?

- Databases provide **persistent storage** — data survives server restarts and crashes.
- They enable:
  - Data consistency
  - Concurrent access
  - Querying and filtering
  - Scalability
- In-memory data (arrays/objects in code) is only suitable for learning or prototyping.

---

## 2. What Is MongoDB?

- MongoDB is a **NoSQL document database**.
- Data is stored as **documents** (JSON-like objects) inside **collections**.
- Documents can have flexible structures (not rigid tables like SQL).

### Key Characteristics

- Schema-less at the database level
- Uses BSON (binary JSON)
- Optimized for horizontal scaling
- Well-suited for JavaScript-based applications

---

## 3. Cloud Databases (MongoDB Atlas)

- Cloud databases remove the need to manage infrastructure.
- MongoDB Atlas provides:
  - Hosted clusters
  - Automated backups
  - Security controls
- Applications connect via a **connection URI** containing:
  - Username
  - Password
  - Cluster address
  - Database name

⚠️ Connection strings are **secrets** and must never be committed to Git.

---

## 4. Mongoose (MongoDB Object Modeling)

- Mongoose is an **ODM (Object Document Mapper)** for MongoDB.
- It provides:
  - Schemas
  - Models
  - Validation
  - Cleaner query APIs

### Why Use Mongoose?

- Enforces structure at the application level
- Makes database logic predictable
- Simplifies complex queries
- Integrates cleanly with Node & Express

---

## 5. Schemas

- A **schema** defines the shape of a document.
- It specifies:
  - Fields
  - Data types
  - Optional validation rules

Example conceptually:

- A `User` has a name (string), email (string), and active status (boolean).

Important:

- MongoDB itself does not enforce schemas.
- Schemas exist **in your application**, not the database.

---

## 6. Models

- A **model** is created from a schema.
- Models are responsible for:
  - Creating documents
  - Reading documents
  - Updating documents
  - Deleting documents

Mental model:

> Schema = blueprint  
> Model = factory + API

- Each model maps to a **collection** in MongoDB.
- Model names are typically singular; collections are pluralized automatically.

---

## 7. Creating & Saving Data

- A document is created by instantiating a model.
- Saving a document:
  - Validates data against the schema
  - Persists it to the database
- Save operations are **asynchronous**.

Key idea:

- Database interactions are always async and must be handled with promises or async/await.

---

## 8. Querying Data

- Common operations:
  - Find all documents
  - Find by ID
  - Filter by fields
- Queries return **plain JavaScript objects wrapped by Mongoose**.

Important:

- Query results are not raw JSON by default.
- They include MongoDB-specific fields like `_id` and `__v`.

---

## 9. IDs & Data Transformation

- MongoDB uses `_id` (ObjectId) as the primary key.
- Frontends usually expect `id` as a string.

Best practice:

- Transform database output before sending it to clients:
  - Convert `_id` → `id`
  - Remove internal fields (`_id`, `__v`)

This keeps your API clean and frontend-friendly.

---

## 10. Integrating MongoDB with Express

- Database logic should be separated from route logic:
  - Models live in their own files
  - Routes import models
- Express routes should:
  - Validate incoming data
  - Call model methods
  - Return formatted JSON responses

Mental separation:

> Routes handle HTTP  
> Models handle data

---

## 11. Environment Variables

- Sensitive configuration (DB URIs, API keys) should use environment variables.
- Common approach:
  - `.env` file for local development
  - Environment config in production (e.g., hosting provider settings)

Rules:

- Never commit `.env` files
- Always fail loudly if required variables are missing

---

## 12. Error Handling (Conceptual)

- Database operations can fail due to:
  - Invalid data
  - Network issues
  - Authentication errors
- Applications should:
  - Catch database errors
  - Return meaningful HTTP status codes
  - Avoid leaking internal details to clients

---

## 13. Key Takeaways

- Databases are essential for real-world applications.
- MongoDB stores flexible, document-based data.
- Mongoose adds structure, validation, and safety.
- Separate concerns:
  - HTTP logic (Express)
  - Data logic (Mongoose models)
- Always protect secrets and sanitize outputs.
- Treat database interactions as asynchronous and failure-prone.

---

## 14. High-Level Mental Model

Client  
↓  
Express Routes (HTTP)  
↓  
Mongoose Models (Validation & Queries)  
↓  
MongoDB (Persistent Storage)

Each layer has a single responsibility.

---

## Final Summary

Saving data to MongoDB is about **persisting application state reliably** while maintaining clean boundaries between your API, data logic, and storage. Understanding schemas, models, async behavior, and data transformation is more important than memorizing specific syntax or tools.
