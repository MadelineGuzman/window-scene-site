const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const tabs = document.querySelectorAll(".scene-tab");
const showcase = document.querySelector(".scene-showcase");
const sceneTitle = document.querySelector("[data-scene-title]");
const sceneText = document.querySelector("[data-scene-text]");
const sceneImage = document.querySelector("[data-scene-image]");
const form = document.querySelector(".lead-form");
const formNote = document.querySelector("[data-form-note]");

const sceneContent = {
  winter: {
    title: "Winter warmth",
    text: "Adds an insulating layer that holds heat in and keeps drafts out — warmer rooms, lower heating bills, and a calmer view.",
    image: "assets/scenes/winter.svg",
    alt: "Winter warmth Window Scene panel",
  },
  summer: {
    title: "Summer cooling",
    text: "Reflective, sun-blocking panels keep heat and glare out so the AC works less — a year-round must in hot Southern climates, not just a winter fix.",
    image: "assets/scenes/summer.svg",
    alt: "Summer cooling Window Scene panel blocking sun and heat",
  },
  modern: {
    title: "Minimal modern",
    text: "Clean geometry and frosted privacy for apartments, offices, and interiors that need a refined finish.",
    image: "assets/scenes/modern.svg",
    alt: "Minimal modern Window Scene panel",
  },
  holiday: {
    title: "Seasonal atmosphere",
    text: "Reusable holiday or event designs that can be changed without throwing away a single-use kit.",
    image: "assets/scenes/holiday.svg",
    alt: "Seasonal holiday Window Scene panel",
  },
  commercial: {
    title: "Commercial exterior",
    text: "A path toward storefront, hospitality, and property-management panels with branded visual surfaces.",
    image: "assets/scenes/commercial.svg",
    alt: "Commercial Window Scene panel",
  },
};

function updateHeader() {
  header.classList.toggle("scrolled", window.scrollY > 20);
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

revealItems.forEach((item) => observer.observe(item));
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const scene = tab.dataset.scene;
    const content = sceneContent[scene];

    tabs.forEach((item) => item.classList.remove("active"));
    tab.classList.add("active");
    showcase.dataset.currentScene = scene;
    sceneTitle.textContent = content.title;
    sceneText.textContent = content.text;
    sceneImage.src = content.image;
    sceneImage.alt = content.alt;
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  formNote.textContent = "You are on the early interest list. Thank you for joining the scene.";
});

// Click-to-expand lightbox for product mockups
const lightbox = document.createElement("div");
lightbox.className = "lightbox";
lightbox.setAttribute("role", "dialog");
lightbox.setAttribute("aria-modal", "true");
lightbox.innerHTML =
  '<button class="lightbox-close" type="button" aria-label="Close image">×</button>' +
  '<img alt="">';
document.body.appendChild(lightbox);

const lightboxImage = lightbox.querySelector("img");
const lightboxClose = lightbox.querySelector(".lightbox-close");

function openLightbox(src, alt) {
  lightboxImage.src = src;
  lightboxImage.alt = alt || "";
  lightbox.classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightbox.classList.remove("open");
  document.body.style.overflow = "";
}

document.querySelectorAll(".zoomable").forEach((img) => {
  img.addEventListener("click", () => openLightbox(img.currentSrc || img.src, img.alt));
});

lightboxClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox || event.target === lightboxImage) closeLightbox();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && lightbox.classList.contains("open")) closeLightbox();
});
