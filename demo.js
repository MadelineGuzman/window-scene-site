// Header shadow on scroll (mirrors main site)
const header = document.querySelector("[data-header]");
function updateHeader() {
  if (header) header.classList.toggle("scrolled", window.scrollY > 20);
}
window.addEventListener("scroll", updateHeader, { passive: true });
updateHeader();

// Before / after drag-to-reveal slider
const compare = document.querySelector("[data-compare]");
if (compare) {
  const afterWrap = compare.querySelector("[data-after-wrap]");
  const handle = compare.querySelector("[data-handle]");
  const grip = compare.querySelector("[data-grip]");
  const range = compare.querySelector(".compare-range");

  function setReveal(pos) {
    const clamped = Math.max(0, Math.min(100, pos));
    afterWrap.style.clipPath = "inset(0 0 0 " + clamped + "%)";
    handle.style.left = clamped + "%";
    grip.style.left = clamped + "%";
    range.value = clamped;
  }

  range.addEventListener("input", () => setReveal(Number(range.value)));

  // Pointer drag anywhere on the image
  let dragging = false;
  function posFromEvent(event) {
    const rect = compare.getBoundingClientRect();
    return ((event.clientX - rect.left) / rect.width) * 100;
  }
  compare.addEventListener("pointerdown", (event) => {
    dragging = true;
    compare.setPointerCapture(event.pointerId);
    setReveal(posFromEvent(event));
  });
  compare.addEventListener("pointermove", (event) => {
    if (dragging) setReveal(posFromEvent(event));
  });
  compare.addEventListener("pointerup", () => (dragging = false));
  compare.addEventListener("pointercancel", () => (dragging = false));

  setReveal(50);
}

// Scene switcher
const demoScenes = {
  winter: {
    image: "assets/scenes/winter.svg",
    badge: "Winter",
    caption: "<strong>Winter warmth.</strong> Holds heat in and keeps drafts out — warmer rooms and a lower heating bill.",
    alt: "Winter warmth Window Scene panel",
  },
  summer: {
    image: "assets/scenes/summer.svg",
    badge: "Summer",
    caption: "<strong>Summer cooling.</strong> Reflects sun and glare so the AC works less — a hot-climate must, not just a winter fix.",
    alt: "Summer cooling Window Scene panel blocking sun and heat",
  },
  holiday: {
    image: "assets/scenes/holiday.svg",
    badge: "Seasonal",
    caption: "<strong>Seasonal swap.</strong> Change scenes like décor and reuse them year after year — no disposable kits.",
    alt: "Seasonal holiday Window Scene panel",
  },
  modern: {
    image: "assets/scenes/modern.svg",
    badge: "Modern",
    caption: "<strong>Minimal modern.</strong> Frosted privacy and a clean finish for apartments, offices, and rentals.",
    alt: "Minimal modern Window Scene panel",
  },
  commercial: {
    image: "assets/scenes/commercial.svg",
    badge: "Commercial",
    caption: "<strong>Commercial.</strong> Storefront branding, glare control, and curb appeal for businesses.",
    alt: "Commercial exterior Window Scene panel",
  },
};

const demoChips = document.querySelectorAll("[data-demo-scene]");
const demoImage = document.querySelector("[data-demo-scene-image]");
const demoBadge = document.querySelector("[data-demo-badge]");
const demoCaption = document.querySelector("[data-demo-caption]");

demoChips.forEach((chip) => {
  chip.addEventListener("click", () => {
    const scene = demoScenes[chip.dataset.demoScene];
    if (!scene) return;
    demoChips.forEach((item) => item.classList.remove("active"));
    chip.classList.add("active");
    demoImage.src = scene.image;
    demoImage.alt = scene.alt;
    demoBadge.textContent = scene.badge;
    demoCaption.innerHTML = scene.caption;
  });
});

// Upload-your-window preview
const uploadInput = document.querySelector("[data-upload]");
if (uploadInput) {
  const stage = document.querySelector("[data-upload-stage]");
  const photo = document.querySelector("[data-upload-photo]");
  const empty = document.querySelector("[data-upload-empty]");
  const sceneRow = document.querySelector("[data-upload-scenes]");
  const toggleBtn = document.querySelector("[data-toggle-panel]");
  const panel = document.querySelector("[data-upload-panel]");
  const panelImg = document.querySelector("[data-upload-panel-img]");
  const uploadChips = document.querySelectorAll("[data-upload-scene]");
  const grip = document.querySelector("[data-resize-grip]");

  function setPanelScene(key) {
    const scene = demoScenes[key];
    if (scene) panelImg.style.backgroundImage = "url('" + scene.image + "')";
  }
  setPanelScene("winter");

  uploadInput.addEventListener("change", (event) => {
    const file = event.target.files && event.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      photo.src = reader.result;
      stage.hidden = false;
      sceneRow.hidden = false;
      toggleBtn.hidden = false;
      empty.hidden = true;
    };
    reader.readAsDataURL(file);
  });

  uploadChips.forEach((chip) => {
    chip.addEventListener("click", () => {
      uploadChips.forEach((item) => item.classList.remove("active"));
      chip.classList.add("active");
      setPanelScene(chip.dataset.uploadScene);
    });
  });

  toggleBtn.addEventListener("click", () => {
    const hidden = panel.style.display === "none";
    panel.style.display = hidden ? "" : "none";
    toggleBtn.textContent = hidden ? "Hide panel" : "Show panel";
  });

  // Drag + resize the panel within the stage
  let mode = null; // "drag" | "resize"
  let startX = 0, startY = 0, startLeft = 0, startTop = 0, startW = 0, startH = 0;

  function pct(value, total) {
    return (value / total) * 100;
  }

  function onDown(event, which) {
    mode = which;
    const r = panel.getBoundingClientRect();
    startX = event.clientX;
    startY = event.clientY;
    startLeft = panel.offsetLeft;
    startTop = panel.offsetTop;
    startW = r.width;
    startH = r.height;
    panel.classList.add("dragging");
    panel.setPointerCapture(event.pointerId);
    event.preventDefault();
    event.stopPropagation();
  }

  function onMove(event) {
    if (!mode) return;
    const stageRect = stage.getBoundingClientRect();
    const dx = event.clientX - startX;
    const dy = event.clientY - startY;
    if (mode === "drag") {
      let left = startLeft + dx;
      let top = startTop + dy;
      left = Math.max(0, Math.min(left, stage.clientWidth - panel.offsetWidth));
      top = Math.max(0, Math.min(top, stage.clientHeight - panel.offsetHeight));
      panel.style.left = pct(left, stage.clientWidth) + "%";
      panel.style.top = pct(top, stage.clientHeight) + "%";
    } else if (mode === "resize") {
      let w = Math.max(60, startW + dx);
      let h = Math.max(60, startH + dy);
      w = Math.min(w, stage.clientWidth - panel.offsetLeft);
      h = Math.min(h, stage.clientHeight - panel.offsetTop);
      panel.style.width = pct(w, stage.clientWidth) + "%";
      panel.style.height = pct(h, stage.clientHeight) + "%";
    }
  }

  function onUp() {
    mode = null;
    panel.classList.remove("dragging");
  }

  panel.addEventListener("pointerdown", (event) => {
    if (event.target === grip) return;
    onDown(event, "drag");
  });
  grip.addEventListener("pointerdown", (event) => onDown(event, "resize"));
  panel.addEventListener("pointermove", onMove);
  panel.addEventListener("pointerup", onUp);
  panel.addEventListener("pointercancel", onUp);
}
