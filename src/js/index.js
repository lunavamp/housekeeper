import { init, onClick, onClickHash, onReady, vAnimRun } from "./cfjs";

init({
  loadedAnimAfter: ".header",
  onScrollThrottle: 10,
});
onReady(() => {
  vAnimRun(".footer", () => vAnimRun("#start"));
});

onClick(/modal-(active|close)-(.+)/, (e, [query, action]) => {
  bc.toggle(query, action === "active");
  gtag("event", action);
});

onClick(/(overlay|close-modal)/, () => {
  bc.forEach((name) => {
    if (name.includes("modal-active")) {
      bc.remove(name);
      const md = $("." + name.replace("-active-", "-"));
      md.classList.forEach((clName) => {
        if (clName.startsWith("is-")) {
          setTimeout(() => {
            md.classList.remove(clName);
          }, 300);
        }
      });
      gtag("event", name.replace("active", "close"));
    }
  });
});

onClickHash(() => {
  bc.remove("header-menu-active");
});

const langElements = document.querySelectorAll(".lang");
const dropdownItems = document.querySelectorAll(".dropdown-menu li");
const currentLanguageEl = document.getElementById("language-select");

function setLanguage(lang) {
  langElements.forEach((el) => {
    const text = el.getAttribute(`data-${lang}`);
    if (text) {
      el.innerHTML = text;
    }
  });

  currentLanguageEl.textContent = lang.toUpperCase();
}

function detectBrowserLanguage() {
  const userLang = navigator.language.slice(0, 2).toLowerCase();
  if (["en", "ru", "es"].includes(userLang)) {
    return userLang;
  }
  return "en";
}

const initialLang = detectBrowserLanguage();
setLanguage(initialLang);

dropdownItems.forEach((item) => {
  item.addEventListener("click", () => {
    setLanguage(item.getAttribute("data-lang"));
  });
});

const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
  bc.toggle("is-nav-active");
});

document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    mobileNav.classList.remove("active");
  });
});

const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach((item) => {
  const question = item.querySelector(".faq-question");
  question.addEventListener("click", () => {
    item.classList.toggle("active");
  });
});

// const sendApplicationBtn = document.getElementById("send-application");
// const contactOptions = document.getElementById("contact-options");
// const whatsappLink = document.getElementById("whatsapp-link");
// const telegramLink = document.getElementById("telegram-link");

// sendApplicationBtn.addEventListener("click", () => {
//   const name = document.getElementById("contact-name").value;
//   const phone = document.getElementById("contact-phone").value;
//   const city = document.getElementById("contact-city").value;
//   const experience = document.getElementById("contact-experience").value;

//   const message = encodeURIComponent(
//     `New application:\nName: ${name}\nPhone: ${phone}\nCity: ${city}\nExperience: ${experience}`
//   );

//   whatsappLink.href = `https://wa.me/1234567890?text=${message}`;
//   telegramLink.href = `https://t.me/username?text=${message}`;

//   contactOptions.style.display = "flex";
// });
