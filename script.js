const header = document.querySelector("[data-header]");
const revealItems = document.querySelectorAll(".reveal");
const tabs = document.querySelectorAll(".scene-tab");
const showcase = document.querySelector(".scene-showcase");
const sceneTitle = document.querySelector("[data-scene-title]");
const sceneText = document.querySelector("[data-scene-text]");
const form = document.querySelector(".lead-form");
const formNote = document.querySelector("[data-form-note]");

const sceneContent = {
  winter: {
    title: "Winter comfort",
    text: "Soft frost, warm interior light, and a calmer view for rooms that need both insulation and atmosphere.",
  },
  modern: {
    title: "Minimal modern",
    text: "Clean geometry and frosted privacy for apartments, offices, and interiors that need a refined finish.",
  },
  holiday: {
    title: "Seasonal atmosphere",
    text: "Reusable holiday or event designs that can be changed without throwing away a single-use kit.",
  },
  commercial: {
    title: "Commercial exterior",
    text: "A path toward storefront, hospitality, and property-management panels with branded visual surfaces.",
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
  });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  form.reset();
  formNote.textContent = "You are on the early interest list. Thank you for joining the scene.";
});
