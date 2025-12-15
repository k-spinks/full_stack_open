# Fullstack Open — Part 0

## Fundamentals of Web Apps (Key Points)

## 1. Purpose of Part 0

- Introduces how web apps work behind the scenes before jumping into modern frameworks.
- Shows the flow between browser ↔ server using simple (intentionally old-school) examples.
- Demonstrates why modern tooling like React exists by contrasting older approaches.

---

## 2. Traditional Web Applications (Server-Rendered HTML)

- Browser sends an HTTP **GET** request → server responds with a complete HTML page.
- HTML can be static or dynamically generated on the server.
- Browser requests additional resources (images, styles, scripts) as referenced in the HTML.
- Page refreshes anytime new HTML is needed.

**Key takeaway:** Early web apps relied on server-generated HTML and full page reloads.

---

## 3. Browser-Side Logic & Client-Side Rendering

- Some pages load minimal HTML plus a JS file.
- JS fetches data (usually JSON) and builds the DOM dynamically.
- Content is rendered in the browser instead of being fully produced on the server.

**Key takeaway:** Client-side JS can replace server-rendered HTML by building UI in the browser.

---

## 4. AJAX and Asynchronous Data Fetching

- JavaScript can send HTTP requests (GET/POST) without reloading the page.
- JSON becomes the primary format for sending data between client and server.
- Enables interactive, partial updates instead of full page loads.

**Key takeaway:** AJAX introduced dynamic, responsive behavior and laid the foundation for modern SPAs.

---

## 5. Understanding the DOM

- The DOM is the browser’s internal tree representation of an HTML document.
- JS can inspect and modify this tree to update what users see.
- Example: creating and inserting `<li>` elements into lists programmatically.

**Key takeaway:** DOM manipulation is the core mechanism behind client-side rendering.

---

## 6. Roles of HTML, CSS, and JavaScript

- **HTML:** structure and content.
- **CSS:** presentation and layout.
- **JS:** interaction, data fetching, logic, dynamic updates.

**Key takeaway:** Web apps rely on clear separation of structure, style, and behavior.

---

## 7. The Web App Architecture (High Level)

- Web development consists of:
  - **Frontend (browser):** rendering, interaction
  - **Backend (server):** data, business logic
  - **Database:** persistence layer
- HTTP connects all three layers.

**Key takeaway:** Modern “full-stack” means understanding how browsers, servers, and databases communicate through HTTP.

---

## 8. Why These Concepts Matter

- Forms the mental model for how requests, responses, JSON, and rendering work.
- Helps you debug real applications by understanding the underlying browser-server lifecycle.
- Shows the limitations of old patterns and motivates the move to frameworks like React.

**Key takeaway:** Knowing the fundamentals makes modern tools easier to understand and use effectively.
