// LOADER
window.addEventListener("load", () => {
  const loader = document.getElementById("loader");
  if (loader) {
    setTimeout(() => {
      loader.style.opacity = "0";
      loader.style.pointerEvents = "none";
    }, 1200);
  }
});

// HAMBURGER
const hamburger = document.getElementById("hamburger");
const navMenu = document.getElementById("navMenu");

if (hamburger) {
  hamburger.addEventListener("click", () => {
    navMenu.classList.toggle("active");
  });
}

// LANGUAGE SWITCH (frontend demo)
const translations = {
  uz: { home: "Home", contact: "Contact" },
  ru: { home: "Главная", contact: "Контакты" },
  en: { home: "Home", contact: "Contact" }
};

document.querySelectorAll(".lang-switcher button").forEach(btn => {
  btn.addEventListener("click", () => {
    document.documentElement.lang = btn.dataset.lang;
    alert("Til o‘zgardi: " + btn.dataset.lang.toUpperCase());
  });
});



const langBox = document.getElementById("langBox");
const currentLang = document.querySelector(".current-lang");

langBox.addEventListener("click", () => {
  langBox.classList.toggle("active");
});

document.querySelectorAll(".lang-dropdown button").forEach(btn => {
  btn.addEventListener("click", e => {
    e.stopPropagation();

    const lang = btn.dataset.lang.toUpperCase();
    currentLang.textContent = lang;

    langBox.classList.remove("active");

    // hozircha demo
    console.log("Language changed to:", lang);
  });
});

// tashqariga bosilganda yopilsin
document.addEventListener("click", e => {
  if (!langBox.contains(e.target)) {
    langBox.classList.remove("active");
  }
});


const langbox = document.getElementById("langBox");
const currentlang = document.querySelector(".current-lang");

function setLanguage(lang) {
  document.querySelectorAll("[data-i18n]").forEach(el => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.innerHTML = translations[lang][key];
    }
  });
  localStorage.setItem("lang", lang);
  if (currentLang) currentLang.textContent = lang.toUpperCase();
}

document.querySelectorAll(".lang-dropdown button").forEach(btn => {
  btn.onclick = () => setLanguage(btn.dataset.lang);
});

const savedLang = localStorage.getItem("lang") || "uz";
setLanguage(savedLang);




const BOT_TOKEN = "8581155556:AAFjfym0GeeIrnaoFP18FWEpkTjRhKEA__M";
const CHAT_ID = "7839873833";

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("b2bForm");
  const statusText = document.getElementById("formStatus");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const company = document.getElementById("company")?.value || "—";
    const name = document.getElementById("name")?.value || "—";
    const phone = document.getElementById("phone")?.value || "—";
    const city = document.getElementById("city")?.value || "—";
    const message = document.getElementById("message")?.value || "—";

    const text =
`🧊 YUNA | B2B SO‘ROV

🏢 Kompaniya: ${company}
👤 Aloqa shaxsi: ${name}
📞 Telefon: ${phone}
📍 Hudud: ${city}
💬 Xabar: ${message}
`;

    statusText.textContent = "Yuborilmoqda...";

    try {
      const res = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          chat_id: CHAT_ID,
          text: text
        })
      });

      if (!res.ok) throw new Error("Telegram error");

      statusText.textContent = "✅ So‘rov muvaffaqiyatli yuborildi!";
      form.reset();

    } catch (err) {
      console.error(err);
      statusText.textContent = "❌ Yuborishda xatolik yuz berdi";
    }
  });
});
