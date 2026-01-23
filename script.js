// script.js

// 1) FAQ accordion
document.querySelectorAll(".faq-item").forEach((item) => {
  const btn = item.querySelector(".faq-question");
  btn.addEventListener("click", () => {
    const isActive = item.classList.contains("active");
    document.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("active"));
    if (!isActive) item.classList.add("active");
  });
});

// 2) År i footer
const yearSpan = document.getElementById("year");
if (yearSpan) yearSpan.textContent = new Date().getFullYear();

// 3) Demo-stat i hero (valfritt)
const statMatches = document.getElementById("statMatches");
if (statMatches) {
  const base = 12;
  const jitter = Math.floor(Math.random() * 6); // 0-5
  statMatches.textContent = String(base + jitter);
}

// 4) Email signup (ingen mailto)
// OBS: Detta sparar i localStorage för DEMO.
// När ni är redo kopplar vi till Brevo/Mailchimp/MailerLite via API eller form-endpoint.
const form = document.getElementById("signupForm");
const emailInput = document.getElementById("emailInput");
const msg = document.getElementById("formMsg");
const subCount = document.getElementById("subCount");

function getList() {
  try {
    return JSON.parse(localStorage.getItem("nexus_waitlist") || "[]");
  } catch {
    return [];
  }
}

function setList(list) {
  localStorage.setItem("nexus_waitlist", JSON.stringify(list));
}

function updateCount() {
  if (!subCount) return;
  const list = getList();
  subCount.textContent = String(list.length);
}

function setMsg(text, type) {
  if (!msg) return;
  msg.textContent = text;
  msg.classList.remove("ok", "err");
  if (type) msg.classList.add(type);
}

function isValidEmail(v) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(v || "").trim());
}

updateCount();

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const email = String(emailInput?.value || "").trim().toLowerCase();

    if (!isValidEmail(email)) {
      setMsg("Skriv en giltig e-postadress.", "err");
      return;
    }

    const list = getList();

    if (list.includes(email)) {
      setMsg("Du är redan med på listan ✅", "ok");
      return;
    }

    // DEMO: spara lokalt
    list.push(email);
    setList(list);
    updateCount();

    // UI
    setMsg("Klart! Du får besked direkt när vi lanserar 🚀", "ok");
    if (emailInput) emailInput.value = "";

    // ✅ NÄR NI KOPPLAR RIKTIG LISTA:
    // 1) Brevo/Mailchimp endpoint eller egen backend
    // await fetch("https://din-backend.se/api/waitlist", { method:"POST", headers:{ "Content-Type":"application/json" }, body: JSON.stringify({ email }) });
  });
}

