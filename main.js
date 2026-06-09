// main.js — Local Community Event Portal
// Covers JS Exercises 1–14:
// Basics, Data Types, Conditionals/Loops, Functions/Closures,
// Objects/Prototypes, Arrays, DOM, Events, Async/Await,
// ES6+, Forms, AJAX/Fetch, Debugging, jQuery

"use strict";

/* ============================================================
   JS Ex 1 — Basics & Setup
   ============================================================ */
console.log("Welcome to the Community Portal");

// Alert when page is fully loaded
window.addEventListener("load", () => {
  console.log("Page fully loaded ✓");
  // alert("Welcome! The Community Portal has loaded successfully.");
  // (commented out to avoid blocking UX in portfolio demo)

  initPortal();
});


/* ============================================================
   JS Ex 2 — Syntax, Data Types, Operators
   ============================================================ */

// const for fixed values, let for mutable ones
const PORTAL_NAME = "CommunityHub";
const LAUNCH_DATE = "2025-06-01";
let totalSeats    = 0; // updated dynamically

// Template literal to log portal info
const portalInfo = `${PORTAL_NAME} launched on ${LAUNCH_DATE}`;
console.log(portalInfo);


/* ============================================================
   JS Ex 5 — Objects and Prototypes
   ============================================================ */

// Event constructor function (prototype approach)
function CommunityEvent(id, name, category, location, date, seats, price) {
  this.id       = id;
  this.name     = name;
  this.category = category;
  this.location = location;
  this.date     = date;
  this.seats    = seats;
  this.price    = price;
}

// checkAvailability added to prototype
CommunityEvent.prototype.checkAvailability = function () {
  return this.seats > 0;
};

CommunityEvent.prototype.toString = function () {
  return `${this.name} (${this.category}) — ${this.date}`;
};

// Inspect object keys/values (Ex 5 task)
function logEventDetails(evt) {
  console.log("Event Details:");
  Object.entries(evt).forEach(([key, value]) => {
    console.log(`  ${key}: ${value}`);
  });
}


/* ============================================================
   JS Ex 6 — Arrays and Methods
   ============================================================ */

// Master event list
const eventsData = [
  new CommunityEvent(1, "Summer Music Festival",  "music",    "downtown",  "2025-08-10", 120, 0),
  new CommunityEvent(2, "Baking Workshop",         "workshop", "northside", "2025-07-20",  20, 299),
  new CommunityEvent(3, "Community Sports Day",    "sports",   "riverside", "2025-07-05",  80, 99),
  new CommunityEvent(4, "Street Food Fair",        "food",     "downtown",  "2025-08-22",  60, 149),
  new CommunityEvent(5, "Jazz & Blues Night",      "music",    "riverside", "2025-09-12",  40, 0),
  new CommunityEvent(6, "Pottery Workshop",        "workshop", "northside", "2025-07-28",  15, 349),
  new CommunityEvent(7, "5K Fun Run",              "sports",   "downtown",  "2025-08-03", 200, 50),
  new CommunityEvent(8, "Cultural Food Festival",  "food",     "northside", "2025-09-01",  90, 199),
];

// Total seat counter (used by closure below)
totalSeats = eventsData.reduce((sum, e) => sum + e.seats, 0);

// Add a new event dynamically using .push()
function addEvent(eventObj) {
  eventsData.push(eventObj);
  console.log(`Event added: ${eventObj.name}`);
}

// .filter() to get only music events
function getMusicEvents() {
  return eventsData.filter(e => e.category === "music");
}

// .map() to format display labels
function getFormattedLabels() {
  return eventsData.map(e => `${e.category.charAt(0).toUpperCase() + e.category.slice(1)} - ${e.name}`);
}

console.log("Music events:", getMusicEvents().map(e => e.name));
console.log("Formatted labels:", getFormattedLabels());
logEventDetails(eventsData[0]);


/* ============================================================
   JS Ex 4 — Functions, Scope, Closures, Higher-Order Functions
   ============================================================ */

// Closure: tracks total registrations per category
function makeRegistrationTracker() {
  // Private state — only accessible via returned functions
  const counts = {};

  return {
    register(category) {
      counts[category] = (counts[category] || 0) + 1;
      console.log(`Registered for ${category}. Total: ${counts[category]}`);
    },
    getCount(category) {
      return counts[category] || 0;
    },
    getSummary() {
      return { ...counts };
    }
  };
}

const registrationTracker = makeRegistrationTracker();

// filterEventsByCategory — higher-order function with callback
function filterEventsByCategory(category, callback) {
  const results = eventsData.filter(e => e.category === category);
  return callback(results);
}

// registerUser — reusable registration function
function registerUser(eventId, userName) {
  // JS Ex 3 — try-catch for error handling
  try {
    const event = eventsData.find(e => e.id === eventId);

    if (!event) throw new Error(`Event #${eventId} not found.`);

    // JS Ex 3 — check seats with if-else
    if (!event.checkAvailability()) {
      throw new Error(`Sorry, "${event.name}" is fully booked.`);
    }

    if (!event.date || new Date(event.date) < new Date()) {
      throw new Error(`"${event.name}" has already passed.`);
    }

    // Decrement seat count (JS Ex 2 — --)
    event.seats--;
    registrationTracker.register(event.category);

    console.log(`✓ ${userName} registered for "${event.name}". Seats left: ${event.seats}`);
    return { success: true, event };

  } catch (err) {
    console.error("Registration error:", err.message);
    return { success: false, message: err.message };
  }
}


/* ============================================================
   JS Ex 7 — DOM Manipulation
   ============================================================ */

let currentEvents = [...eventsData]; // spread clone (Ex 10)

function renderEvents(eventList) {
  // querySelector to access container
  const container = document.querySelector("#eventContainer");
  const noResults = document.querySelector("#noResults");
  const spinner   = document.querySelector("#loadingSpinner");

  if (!container) return;

  // Clear existing cards
  container.innerHTML = "";

  // JS Ex 3 — filter out past / fully booked using if-else + forEach
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const visibleEvents = eventList.filter(evt => {
    const evtDate = new Date(evt.date);
    if (evtDate < today)       return false; // past event
    if (evt.seats <= 0)        return false; // fully booked
    return true;
  });

  if (visibleEvents.length === 0) {
    noResults.classList.remove("d-none");
    return;
  }

  noResults.classList.add("d-none");

  // forEach to loop and create cards
  visibleEvents.forEach(evt => {
    // createElement for each card
    const col  = document.createElement("div");
    col.className = "col-sm-6 col-lg-4";

    const card = document.createElement("div");
    card.className = "eventCard h-100";
    card.dataset.eventId = evt.id;

    const band = document.createElement("div");
    band.className = `card-header-band band-${evt.category}`;

    const body = document.createElement("div");
    body.className = "card-body d-flex flex-column";

    const badge = document.createElement("span");
    badge.className = `badge-category badge-${evt.category} d-inline-block mb-2`;
    badge.textContent = evt.category.toUpperCase();

    const title = document.createElement("h3");
    title.className = "card-title";
    title.textContent = evt.name; // .map() formatted label above used for labels

    const details = document.createElement("div");
    details.className = "seats-info mb-3";
    details.innerHTML = `
      <div><i class="bi bi-calendar3 me-1"></i>${formatDate(evt.date)}</div>
      <div><i class="bi bi-geo-alt me-1"></i>${capitalise(evt.location)}</div>
      <div><i class="bi bi-people me-1"></i>${evt.seats} seats left</div>
      <div><i class="bi bi-tag me-1"></i>${evt.price === 0 ? "Free" : "₹" + evt.price}</div>
    `;

    // Register button — onclick (JS Ex 8)
    const btn = document.createElement("button");
    btn.className = "btn btn-register btn-primary mt-auto";
    btn.textContent = "Register";
    btn.onclick = () => handleCardRegister(evt.id);

    // Append elements
    body.appendChild(badge);
    body.appendChild(title);
    body.appendChild(details);
    body.appendChild(btn);

    card.appendChild(band);
    card.appendChild(body);
    col.appendChild(card);
    container.appendChild(col);

    // jQuery fadeIn (JS Ex 14)
    if (typeof $ !== "undefined") {
      $(col).hide().fadeIn(400);
    }
  });
}

function formatDate(dateStr) {
  const d = new Date(dateStr);
  return d.toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" });
}

function capitalise(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}


/* ============================================================
   JS Ex 8 — Event Handling
   ============================================================ */

// onclick on Register button in event card
function handleCardRegister(eventId) {
  const nameInput = document.getElementById("fullName");
  const userName  = nameInput?.value?.trim() || "Guest";

  const result = registerUser(eventId, userName);
  const evt    = eventsData.find(e => e.id === eventId);

  if (result.success) {
    // Update UI — seat count on card
    const card = document.querySelector(`[data-event-id="${eventId}"]`);
    if (card) {
      const seatsEl = card.querySelector(".seats-info");
      if (seatsEl) {
        const lines = seatsEl.querySelectorAll("div");
        if (lines[2]) lines[2].innerHTML = `<i class="bi bi-people me-1"></i>${evt.seats} seats left`;
      }

      // If no seats left, fadeOut and remove (jQuery, Ex 14)
      if (!evt.checkAvailability() && typeof $ !== "undefined") {
        $(card).closest(".col-sm-6").fadeOut(600, function () {
          this.remove();
        });
      }
    }

    // Show Bootstrap modal (JS Ex 9, Bootstrap Ex 18)
    const modalMsg = document.getElementById("modalMessage");
    if (modalMsg) {
      modalMsg.textContent = `You're registered for "${evt.name}" on ${formatDate(evt.date)}!`;
    }
    const modal = new bootstrap.Modal(document.getElementById("successModal"));
    modal.show();

  } else {
    alert(result.message);
  }
}

// onchange — filter by category dropdown (JS Ex 8)
function filterByCategory(category) {
  if (category === "all") {
    currentEvents = [...eventsData];
  } else {
    // Higher-order function with callback (JS Ex 4)
    currentEvents = filterEventsByCategory(category, list => list);
  }
  renderEvents(currentEvents);
}

// onchange — filter by location
function filterByLocation(location) {
  if (location === "all") {
    currentEvents = [...eventsData];
  } else {
    currentEvents = eventsData.filter(e => e.location === location);
  }
  renderEvents(currentEvents);
}

function resetFilters() {
  document.getElementById("categoryFilter").value = "all";
  document.getElementById("locationFilter").value = "all";
  currentEvents = [...eventsData];
  renderEvents(currentEvents);
}


/* ============================================================
   JS Ex 8 — keydown quick search (named function, not arrow)
   ============================================================ */
function setupQuickSearch() {
  const searchBox = document.getElementById("quickSearch");
  if (!searchBox) return;

  searchBox.addEventListener("keydown", function (e) {
    // Debounce: only search on Enter key
    if (e.key === "Enter") {
      const query = this.value.trim().toLowerCase();
      if (!query) {
        currentEvents = [...eventsData];
      } else {
        currentEvents = eventsData.filter(evt =>
          evt.name.toLowerCase().includes(query) ||
          evt.category.toLowerCase().includes(query)
        );
      }
      renderEvents(currentEvents);
    }
  });
}


/* ============================================================
   JS Ex 9 — Async JS, Promises, Async/Await
   ============================================================ */

// Mock API endpoint (JSONPlaceholder used as stand-in;
// real projects would point to their own backend)
const MOCK_API = "https://jsonplaceholder.typicode.com/posts/1";

// --- Version 1: Using .then() and .catch() ---
function fetchEventsWithPromise() {
  console.log("Fetching events (Promise style)...");
  showSpinner(true);

  fetch(MOCK_API)
    .then(response => {
      if (!response.ok) throw new Error(`HTTP error ${response.status}`);
      return response.json();
    })
    .then(data => {
      console.log("Mock API data received (Promise):", data.title);
      showSpinner(false);
    })
    .catch(err => {
      console.error("Fetch failed:", err.message);
      showSpinner(false);
    });
}

// --- Version 2: async/await (rewrite of above) ---
async function fetchEventsAsync() {
  console.log("Fetching events (async/await style)...");
  showSpinner(true);

  try {
    const response = await fetch(MOCK_API);

    if (!response.ok) throw new Error(`HTTP error ${response.status}`);

    const data = await response.json();
    console.log("Mock API data received (async/await):", data.title);

  } catch (err) {
    console.error("Async fetch error:", err.message);
  } finally {
    showSpinner(false);
  }
}

function showSpinner(visible) {
  const spinner = document.getElementById("loadingSpinner");
  if (spinner) spinner.style.display = visible ? "block" : "none";
}


/* ============================================================
   JS Ex 10 — Modern JavaScript (ES6+)
   ============================================================ */

// Default parameters
function createEventCard(name, category = "general", seats = 50, price = 0) {
  return { name, category, seats, price };
}

// Destructuring
function printEventSummary(event) {
  const { name, category, date, seats } = event;
  console.log(`[${category}] ${name} — ${date}, ${seats} seats`);
}

// Spread to clone before filtering (avoid mutating original)
function getAvailableEvents() {
  return [...eventsData].filter(e => e.checkAvailability());
}

eventsData.forEach(e => printEventSummary(e));


/* ============================================================
   JS Ex 11 — Working with Forms
   ============================================================ */

// main registration form handler (called by onclick in HTML)
function handleRegistration(e) {
  // Prevent default form submission
  e.preventDefault();

  // Access form elements using form.elements
  const form    = document.getElementById("registrationForm");
  const fields  = form.elements;
  const name    = fields["fullName"].value.trim();
  const email   = fields["email"].value.trim();
  const date    = fields["eventDate"].value;
  const type    = fields["eventType"].value;
  const output  = document.getElementById("formOutput");

  // Reset previous states
  form.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
  output.textContent = "";
  output.className   = "d-block mt-3 text-center fw-semibold";

  // Inline validation
  let valid = true;

  if (!name) {
    fields["fullName"].classList.add("is-invalid");
    valid = false;
  }

  if (!email || !email.includes("@")) {
    fields["email"].classList.add("is-invalid");
    valid = false;
  }

  if (!date) {
    fields["eventDate"].classList.add("is-invalid");
    valid = false;
  }

  if (!type) {
    fields["eventType"].classList.add("is-invalid");
    valid = false;
  }

  if (!valid) {
    output.textContent = "Please fill in all required fields correctly.";
    output.classList.add("text-danger");
    return;
  }

  // Show loading and POST to mock API (JS Ex 12 — AJAX/Fetch)
  output.textContent = "⏳ Submitting your registration...";
  output.classList.add("text-primary");

  submitRegistration({ name, email, date, type });
}


/* ============================================================
   JS Ex 12 — AJAX & Fetch API
   ============================================================ */

async function submitRegistration(userData) {
  const output = document.getElementById("formOutput");

  // JS Ex 13 — logging submission steps for debugging
  console.log("Form submission started:");
  console.log("Payload:", userData);

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(userData),
    });

    console.log("Fetch status:", response.status);

    if (!response.ok) throw new Error(`Server responded with ${response.status}`);

    const result = await response.json();
    console.log("Server response:", result);

    // Simulate delayed response (setTimeout, JS Ex 12)
    setTimeout(() => {
      output.textContent = `✅ Successfully registered, ${userData.name}! Confirmation sent to ${userData.email}.`;
      output.className   = "d-block mt-3 text-center fw-semibold text-success";

      // Show modal
      const modal = new bootstrap.Modal(document.getElementById("successModal"));
      const msgEl = document.getElementById("modalMessage");
      if (msgEl) {
        msgEl.textContent = `Welcome, ${userData.name}! You're registered for the ${userData.type} event.`;
      }
      modal.show();

      // Reset form
      document.getElementById("registrationForm").reset();
      document.getElementById("charCount").textContent = "(0 / 200)";
      document.getElementById("feeDisplay").classList.add("d-none");

    }, 800);

  } catch (err) {
    console.error("Submission failed:", err.message);
    output.textContent = "❌ Submission failed. Please try again.";
    output.className   = "d-block mt-3 text-center fw-semibold text-danger";
  }
}


/* ============================================================
   JS Ex 6 (HTML5 Ex 6) — Form event handlers
   ============================================================ */

// onblur — phone validation
function validatePhone(input) {
  const phoneRegex = /^[6-9]\d{9}$/; // Indian mobile format
  if (!phoneRegex.test(input.value.trim()) && input.value.trim() !== "") {
    input.classList.add("is-invalid");
  } else {
    input.classList.remove("is-invalid");
  }
}

// onchange — show event fee (HTML5 Ex 6)
function showEventFee(select) {
  const feeMap = {
    music:    "This event is FREE! No payment required.",
    workshop: "Registration fee: ₹299",
    sports:   "Registration fee: ₹99",
    food:     "Registration fee: ₹149",
  };
  const display = document.getElementById("feeDisplay");
  if (feeMap[select.value]) {
    display.textContent = feeMap[select.value];
    display.classList.remove("d-none");
  } else {
    display.classList.add("d-none");
  }
}

// onkeyup — character counter (HTML5 Ex 6)
function countChars(textarea) {
  const count = document.getElementById("charCount");
  if (count) count.textContent = `(${textarea.value.length} / 200)`;
}


/* ============================================================
   JS HTML5 Ex 7 — Video event
   ============================================================ */
function videoReady() {
  const status = document.getElementById("videoStatus");
  if (status) status.classList.remove("d-none");
}


/* ============================================================
   JS HTML5 Ex 8 — localStorage / sessionStorage
   ============================================================ */

// Save preferred event type in localStorage
function savePreference(value) {
  if (value) localStorage.setItem("preferredEventType", value);
}

// On load, retrieve saved preference
function loadPreference() {
  const saved = localStorage.getItem("preferredEventType");
  if (saved) {
    const select = document.getElementById("eventType");
    if (select) {
      select.value = saved;
      showEventFee(select);
      console.log(`Preference restored: ${saved}`);
    }
  }
}

// Clear Preferences button
function clearPreferences() {
  localStorage.clear();
  sessionStorage.clear();
  const select = document.getElementById("eventType");
  if (select) select.value = "";
  const display = document.getElementById("feeDisplay");
  if (display) display.classList.add("d-none");
  alert("Preferences cleared!");
}


/* ============================================================
   JS HTML5 Ex 9 — Geolocation
   ============================================================ */
function findNearbyEvents() {
  const output = document.getElementById("geoResult");
  if (!output) return;

  if (!navigator.geolocation) {
    output.innerHTML = `<span class="text-danger">Geolocation is not supported by your browser.</span>`;
    return;
  }

  output.innerHTML = `<span class="text-muted"><i class="bi bi-arrow-repeat me-1"></i>Locating you...</span>`;

  const options = {
    enableHighAccuracy: true,
    timeout:            8000,
    maximumAge:         0,
  };

  navigator.geolocation.getCurrentPosition(
    (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      output.innerHTML = `
        <span class="text-success">
          <i class="bi bi-geo-alt-fill me-1"></i>
          Your location: <strong>${latitude.toFixed(4)}° N, ${longitude.toFixed(4)}° E</strong>
          (accuracy ±${Math.round(accuracy)}m)
        </span>
        <br /><small class="text-muted">Showing events near you — Downtown is 1.2 km away!</small>
      `;
    },
    (error) => {
      // Error handling for permission denial & timeout
      const msgs = {
        1: "Location access denied. Please allow location permission in your browser.",
        2: "Location unavailable. Check your GPS signal.",
        3: "Request timed out. Please try again.",
      };
      output.innerHTML = `<span class="text-danger">${msgs[error.code] || "Unknown error."}</span>`;
    },
    options
  );
}


/* ============================================================
   JS Ex 14 — jQuery
   ============================================================ */
function setupJQuery() {
  if (typeof $ === "undefined") return;

  // Click handling with jQuery
  $(document).on("click", "#registerBtn", function () {
    console.log("[jQuery] Register button clicked");
  });

  // Double-click on gallery images to enlarge (HTML5 Ex 6)
  $(document).on("dblclick", ".gallery-img", function () {
    $(this).toggleClass("enlarged");
  });

  console.log("[jQuery] Event bindings set up. One benefit of frameworks like React/Vue: " +
    "they manage state reactively, so you don't manually update the DOM on every change.");
}


/* ============================================================
   JS Ex 9 — onbeforeunload warning if form is dirty (HTML5 Ex 7)
   ============================================================ */
function setupFormDirtyWarning() {
  let formDirty = false;

  document.getElementById("registrationForm")?.addEventListener("input", () => {
    formDirty = true;
  });

  window.addEventListener("beforeunload", (e) => {
    if (formDirty) {
      e.preventDefault();
      e.returnValue = ""; // triggers browser's built-in warning
    }
  });

  // Once submitted successfully, clear dirty flag
  document.getElementById("registrationForm")?.addEventListener("reset", () => {
    formDirty = false;
  });
}


/* ============================================================
   Init — wire everything together
   ============================================================ */
function initPortal() {
  console.log("Initialising portal...");

  // Render event cards
  renderEvents(eventsData);

  // Restore saved preference
  loadPreference();

  // Quick search keydown listener
  setupQuickSearch();

  // jQuery bindings
  setupJQuery();

  // Dirty form warning
  setupFormDirtyWarning();

  // Async fetch (runs silently in background for demo)
  fetchEventsAsync();

  console.log("Tracker summary:", registrationTracker.getSummary());
  console.log("Available events:", getAvailableEvents().map(e => e.name));
}
