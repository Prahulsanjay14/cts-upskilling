# Community Event Portal 🏙️

A full-stack frontend project built as part of the **Cognizant Web Development Module 1** exercises.  
Covers **HTML5**, **CSS3**, **JavaScript (ES6+)**, and **Bootstrap 5** — all exercises in a single coherent project.

---

## 📁 Project Structure

```
community-portal/
├── index.html                    # Main portal (HTML5 + JS + Bootstrap)
├── help.html                     # Help page (linked from nav — HTML5 Ex 2)
├── css/
│   └── styles.css                # All CSS3 exercises
├── js/
│   └── main.js                   # All JavaScript exercises
└── pages/
    └── bootstrap-exercises.html  # All Bootstrap 5 exercises
```

---

## 📚 Exercise Coverage

### HTML5
| Ex | Topic | Where |
|----|-------|--------|
| 1 | Base template, DOCTYPE, meta, lang | `index.html` |
| 2 | Navigation & linking (nav, anchor, target) | `index.html` `<nav>` |
| 3 | Welcome banner, id/class, inline CSS, span | `#welcomeBanner` |
| 4 | Image gallery with table, alt, title, caption | `#gallery` |
| 5 | Registration form — all input types, output | `#register` |
| 6 | onblur, onchange, onclick, ondblclick, keyup | form + gallery |
| 7 | `<video>`, oncanplay, onbeforeunload | `#video-promo` |
| 8 | localStorage, sessionStorage, clear | `savePreference()` |
| 9 | Geolocation, error handling, high accuracy | `findNearbyEvents()` |
| 10 | Chrome DevTools debugging notes | `main.js` comments |

### CSS3
| Ex | Topic | Where |
|----|-------|--------|
| 1 | Inline / Internal / External CSS | `index.html` + `styles.css` |
| 2 | Syntax, comments, formatted rules | Throughout `styles.css` |
| 3 | Universal, element, ID, class, grouping selectors | `styles.css` |
| 4 | HEX, RGBA, gradients, background image | `.hero-section`, `:root` |
| 5 | @import Google Font, font properties, text properties | Top of `styles.css` |
| 6 | :link, :hover, :active, :visited, list-style | `a` rules, footer links |
| 7 | Table borders, padding, zebra striping, border-collapse | `.gallery-table` |
| 8 | Box model, margin/padding/border/outline, visibility | `.eventCard`, form |
| 9 | Multi-column layout | `.news-columns` |
| 10 | Media queries, %, vw, Flexbox | `@media` blocks |
| 11 | DevTools usage | Comments in CSS |

### JavaScript
| Ex | Topic | Where |
|----|-------|--------|
| 1 | Basics, console.log, window.load | Top of `main.js` |
| 2 | Data types, const/let, template literals, ++ | `PORTAL_NAME`, seats |
| 3 | if-else, forEach, try-catch | `renderEvents()`, `registerUser()` |
| 4 | Functions, closures, higher-order | `makeRegistrationTracker()`, `filterEventsByCategory()` |
| 5 | Objects, prototypes, Object.entries | `CommunityEvent`, `.prototype` |
| 6 | Arrays — push, filter, map | `eventsData`, `getMusicEvents()` |
| 7 | DOM — querySelector, createElement, append | `renderEvents()` |
| 8 | onclick, onchange, keydown | filter dropdowns, search, register btn |
| 9 | Promises, async/await, loading spinner | `fetchEventsAsync()`, `submitRegistration()` |
| 10 | ES6+ — destructuring, spread, default params | `printEventSummary()`, `getAvailableEvents()` |
| 11 | Forms — form.elements, preventDefault, inline validation | `handleRegistration()` |
| 12 | AJAX Fetch POST, success/error, setTimeout | `submitRegistration()` |
| 13 | Debugging — console.log, try-catch, payload logging | Throughout `main.js` |
| 14 | jQuery — .click(), .fadeIn(), .fadeOut() | `setupJQuery()` |

### Bootstrap 5
| Ex | Topic | Where |
|----|-------|--------|
| 1 | CDN setup | `index.html` head |
| 2 | bootstrap.bundle.min.js | Bottom of both HTML files |
| 3-4 | Grid — container/row/col-*, responsive breakpoints | `bootstrap-exercises.html` |
| 5 | justify-content, align-items, order-md- | Grid demo section |
| 6 | Flexbox utilities — d-flex, flex-column, flex-md-row | Navbar demo |
| 7 | Typography — display-1, lead, fw-bold, text-uppercase | Typography section |
| 8 | Forms — form-control, form-check, input-group, form-floating | Forms section |
| 9 | Buttons — all contexts, btn-group, toggle buttons | Buttons section |
| 10 | Navbar, nav-tabs, nav-pills | Nav & Tabs section |
| 11 | Cards — card-body, card-img-top, card-title | Cards section |
| 12 | Spacing — m-*, p-* utilities, pricing layout | Spacing section |
| 13 | bg-* colors, bg-gradient, text colors | Colors section |
| 14 | d-none, d-md-block, d-lg-flex, responsive sidebar | Display section |
| 15 | border, rounded-circle, shadow, shadow-lg, rounded-pill | Borders section |
| 16 | position-fixed, position-relative/absolute + badge | Positioning section |
| 17 | Bootstrap Icons — social, icon-only buttons | Icons section |
| 18 | Modal, Accordion (JS plugins) | Modal + FAQ sections |
| 19 | Sass customisation note | Explained in comments |

---

## 🚀 How to Run

No build step needed — it's plain HTML/CSS/JS.

```bash
# Clone the repo
git clone https://github.com/YOUR_USERNAME/community-portal.git

# Open in browser
# Option 1: Double-click index.html
# Option 2: Use VS Code Live Server extension (recommended)
```

> **Tip:** Use Chrome DevTools to inspect the DOM, watch console logs from `main.js`, and test the Network tab while the form submits.

---

## 🛠️ Technologies

- HTML5 (semantic elements, forms, media, geolocation, localStorage)
- CSS3 (Flexbox, Grid, media queries, animations, multi-column)
- Vanilla JavaScript ES6+ (classes, async/await, fetch, closures)
- Bootstrap 5.3 (grid, components, JS plugins)
- Bootstrap Icons 1.11
- jQuery 3.7 (for Ex 14 demo)
- Google Fonts (Poppins + Inter)

---

## 👩‍💻 Notes

- All code is hand-written following the exercise brief
- Comments label each exercise clearly in both CSS and JS files
- The mock API uses JSONPlaceholder (`https://jsonplaceholder.typicode.com`) to simulate fetch/POST
- No backend or build tools required
