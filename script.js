// script.js

// FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-question");
  btn.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});

// Steps tabs (Hitta partner / Skapa event)
const tabs = document.querySelectorAll(".steps-tab");
const panels = document.querySelectorAll(".steps-list[data-panel]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.getAttribute("data-tab");

    tabs.forEach((t) => t.classList.remove("steps-tab-active"));
    tab.classList.add("steps-tab-active");

    panels.forEach((panel) => {
      if (panel.getAttribute("data-panel") === target) {
        panel.classList.remove("hidden");
      } else {
        panel.classList.add("hidden");
      }
    });
  });
});

// År i footern
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// ------------------------
// EARLY ACCESS (FUNGERAR)
// ------------------------
const form = document.getElementById("waitlistForm");
const input = document.getElementById("waitlistEmail");
const msg = document.getElementById("waitlistMsg");
const countEl = document.getElementById("waitlistCount");

function loadWaitlist() {
  try {
    return JSON.parse(localStorage.getItem("nexus_waitlist") || "[]");
  } catch {
    return [];
  }
}

function saveWaitlist(list) {
  localStorage.setItem("nexus_waitlist", JSON.stringify(list));
}

function setMsg(text, type) {
  if (!msg) return;
  msg.textContent = text;
  msg.classList.remove("ok", "err");
  if (type) msg.classList.add(type);
}

function updateCount() {
  if (!countEl) return;
  countEl.textContent = String(loadWaitlist().length);
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
}

updateCount();

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = String(input?.value || "").trim().toLowerCase();

    if (!isValidEmail(email)) {
      setMsg("Skriv en giltig e-postadress.", "err");
      return;
    }

    const list = loadWaitlist();

    if (list.includes(email)) {
      setMsg("Du är redan med på listan ✅", "ok");
      return;
    }

    list.push(email);
    saveWaitlist(list);
    updateCount();

    setMsg("Klart! Du får besked direkt när appen lanseras 🚀", "ok");
    if (input) input.value = "";

    // När ni vill att det ska “funka på riktigt” (inte bara på din dator),
    // kopplar vi detta till en gratis backend/Google Sheet/Brevo.
  });
}

