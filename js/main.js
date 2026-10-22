// Mobile nav toggle
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".nav-toggle");
  const links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", () => links.classList.toggle("open"));
  }
});

function formatPrice(price) {
  return typeof price === "number" ? "£" + price.toLocaleString("en-GB") : price;
}

function vehicleCardHTML(v, index) {
  const fit = v.fit || "contain";
  let statusTag = "";
  if (v.available) {
    const wordy = typeof v.price === "string" ? " price-tag--words" : "";
    statusTag = `<span class="price-tag${wordy}">${formatPrice(v.price)}</span>`;
  } else if (v.type === "motorcycle") {
    statusTag = `<span class="soon-tag">Coming Soon</span>`;
  }
  return `
    <article class="vehicle-card" data-vehicle-index="${index}">
      <div class="badge">
        ${statusTag}
        <img src="${v.images[0]}" alt="${v.name}" style="object-fit: ${fit};">
      </div>
      <div class="vehicle-body">
        <h3>${v.name}</h3>
        ${!v.available && v.price !== undefined ? `<p class="vehicle-price">${formatPrice(v.price)}</p>` : ""}
      </div>
    </article>
  `;
}

function renderVehicles(container, list, indexLookup) {
  if (!list.length) {
    container.innerHTML = '<p class="no-results">No vehicles match this filter right now — check back soon.</p>';
    return;
  }
  const card = (v) => vehicleCardHTML(v, indexLookup(v));
  const forSale = list.filter((v) => v.available);
  const comingSoon = list.filter((v) => !v.available);
  const both = forSale.length && comingSoon.length;
  const group = (classes, items) =>
    items.length ? `<div class="vehicle-group ${classes}">${items.map(card).join("")}</div>` : "";
  container.innerHTML =
    group("vehicle-group--sale", forSale) +
    (both ? '<div class="vehicle-divider" role="separator"></div>' : "") +
    group("vehicle-group--soon", comingSoon);
}

// Featured vehicles on the home page
function initFeatured() {
  const el = document.getElementById("featured-grid");
  if (!el || typeof VEHICLES === "undefined") return;
  renderVehicles(el, VEHICLES.filter((v) => v.available), (v) => VEHICLES.indexOf(v));
}

// Full filterable inventory on the inventory page
const INVENTORY_INTRO = {
  car: "Our cars are sourced from trusted collections and dealers, fully inspected and recommissioned, and ready for their next owner.",
  motorcycle: "Some of our motorcycles are ready to ride now, with more on the way. Get in touch to be first in line."
};

// Push the divider and Coming Soon cards down so that, when the page opens, only the
// line and the very top of the Coming Soon cards peek up above the bottom of the window.
// It only adds empty space under the for-sale cards; they never move.
const COMING_SOON_PEEK = 44;

function spaceComingSoon(container) {
  const sale = container.querySelector(".vehicle-group--sale");
  const divider = container.querySelector(".vehicle-divider");
  if (!sale || !divider) return;
  sale.style.minHeight = "";
  const style = getComputedStyle(divider);
  const dividerSpace = divider.offsetHeight + parseFloat(style.marginTop) + parseFloat(style.marginBottom);
  const saleTop = sale.getBoundingClientRect().top + window.scrollY;
  const needed = window.innerHeight - COMING_SOON_PEEK - dividerSpace - saleTop;
  if (needed > sale.offsetHeight) sale.style.minHeight = needed + "px";
}

function initInventory() {
  const grid = document.getElementById("inventory-grid");
  if (!grid || typeof VEHICLES === "undefined") return;

  const intro = document.getElementById("inventory-intro");
  const buttons = document.querySelectorAll(".filter-btn");
  let currentFilter = "car";

  function apply() {
    const list = VEHICLES.filter((v) => v.type === currentFilter);
    renderVehicles(grid, list, (v) => VEHICLES.indexOf(v));
    if (intro) intro.textContent = INVENTORY_INTRO[currentFilter];
    spaceComingSoon(grid);
  }

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => spaceComingSoon(grid), 120);
  });
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => spaceComingSoon(grid));
  window.addEventListener("load", () => spaceComingSoon(grid));

  buttons.forEach((btn) => {
    btn.addEventListener("click", () => {
      buttons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      currentFilter = btn.dataset.filter;
      apply();
    });
  });

  apply();
}

// How long each photo shows in the popup before moving on (milliseconds)
const SLIDESHOW_MS = 2000;
// How long the slide-across between two photos takes (milliseconds)
const SLIDE_MS = 1350;

// Spec pills shown above the description: v.specs = { mileage, gearbox, fuel }
const SPEC_ORDER = ["mileage", "gearbox", "fuel"];
const SPEC_ICONS = {
  mileage: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.9 19.1a9 9 0 1 1 14.2 0"/><path d="M12 14l3.6-4.6"/><circle cx="12" cy="14" r="1.1"/><path d="M12 5.5v1.4M6.1 8.1l1 1M17.9 8.1l-1 1"/></svg>`,
  gearbox: `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="5" r="1.8"/><circle cx="12" cy="5" r="1.8"/><circle cx="18" cy="5" r="1.8"/><circle cx="6" cy="19" r="1.8"/><circle cx="12" cy="19" r="1.8"/><circle cx="18" cy="19" r="1.8"/><path d="M6 6.8v10.4M12 6.8v10.4M18 6.8v10.4M6 12h12"/></svg>`,
  fuel: `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 21V5a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v16"/><path d="M3 21h12M6.5 8.5h5"/><path d="M14 9h2a2 2 0 0 1 2 2v5a1.5 1.5 0 0 0 3 0V8.5L18.5 6"/></svg>`
};

// Click-to-open photo gallery with prev/next and click-to-zoom
function initGallery() {
  if (typeof VEHICLES === "undefined") return;

  const modal = document.createElement("div");
  modal.className = "gallery-modal";
  modal.innerHTML = `
    <div class="gallery-backdrop"></div>
    <div class="gallery-content">
      <button class="gallery-close" aria-label="Close">&times;</button>
      <div class="gallery-image-wrap">
        <button class="gallery-nav gallery-prev" aria-label="Previous photo">&#10094;</button>
        <img class="gallery-image" src="" alt="">
        <button class="gallery-nav gallery-next" aria-label="Next photo">&#10095;</button>
      </div>
      <div class="gallery-info">
        <div class="gallery-info-top">
          <h3 class="gallery-title"></h3>
          <span class="gallery-price"></span>
        </div>
        <ul class="gallery-specs"></ul>
        <p class="gallery-desc"></p>
        <p class="gallery-counter"></p>
      </div>
      <div class="gallery-actions">
        <a class="btn gallery-interest" href="interest.html">
          <span class="btn-main">Register Your Interest</span>
          <span class="btn-sub">Be the first to know when it's available</span>
        </a>
        <a class="btn gallery-inquire" href="contact.html">Enquire Now</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const imageWrap = modal.querySelector(".gallery-image-wrap");
  let imageEl = modal.querySelector(".gallery-image");
  const titleEl = modal.querySelector(".gallery-title");
  const priceEl = modal.querySelector(".gallery-price");
  const descEl = modal.querySelector(".gallery-desc");
  const specsEl = modal.querySelector(".gallery-specs");
  const counterEl = modal.querySelector(".gallery-counter");
  const prevBtn = modal.querySelector(".gallery-prev");
  const nextBtn = modal.querySelector(".gallery-next");
  const actionsEl = modal.querySelector(".gallery-actions");
  const inquireBtn = modal.querySelector(".gallery-inquire");
  const interestBtn = modal.querySelector(".gallery-interest");

  let vehicle = null;
  let photoIndex = 0;
  let slideshowTimer = null;
  let manualOnly = false;
  let slide = null;
  let slideToken = 0;

  // Photos advance on their own while the popup is open. The first time the
  // visitor uses the arrows, a swipe or the arrow keys the slideshow stops for
  // good (until the popup is closed and opened again). Zooming in pauses it.
  function stopSlideshow() {
    clearTimeout(slideshowTimer);
    slideshowTimer = null;
  }

  function startSlideshow() {
    stopSlideshow();
    if (manualOnly || !vehicle || vehicle.images.length < 2) return;
    slideshowTimer = setTimeout(() => goTo(1, true), SLIDESHOW_MS);
  }

  function updateChrome() {
    imageEl.alt = vehicle.name;
    const multi = vehicle.images.length > 1;
    prevBtn.style.display = multi ? "flex" : "none";
    nextBtn.style.display = multi ? "flex" : "none";
    counterEl.style.display = multi ? "block" : "none";
    counterEl.textContent = `${photoIndex + 1} / ${vehicle.images.length}`;
    if (multi) new Image().src = vehicle.images[(photoIndex + 1) % vehicle.images.length];
  }

  // Show the current photo straight away, with no movement
  function renderPhoto() {
    finishSlide();
    imageWrap.classList.remove("zoomed");
    imageEl.src = vehicle.images[photoIndex];
    updateChrome();
  }

  function finishSlide() {
    if (!slide) return;
    slide.animations.forEach((a) => a.cancel());
    slide.outgoing.remove();
    slide.incoming.classList.remove("gallery-image--entering");
    slide = null;
  }

  // Slide the next (or previous) photo in from the side
  async function goTo(delta, auto) {
    const token = ++slideToken;
    finishSlide();
    const count = vehicle.images.length;
    photoIndex = (photoIndex + delta + count) % count;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (imageWrap.classList.contains("zoomed") || reduceMotion) {
      renderPhoto();
      if (auto) startSlideshow();
      return;
    }

    const incoming = new Image();
    incoming.className = "gallery-image gallery-image--entering";
    incoming.src = vehicle.images[photoIndex];
    try { await incoming.decode(); } catch (err) { /* show it anyway */ }
    if (token !== slideToken || !modal.classList.contains("open")) return;

    const outgoing = imageEl;
    const dx = (delta > 0 ? 1 : -1) * imageWrap.clientWidth;
    imageWrap.insertBefore(incoming, nextBtn);
    imageEl = incoming;
    updateChrome();
    const timing = { duration: SLIDE_MS, easing: "ease-in-out", fill: "both" };
    const animations = [
      incoming.animate(
        [{ transform: `translate(calc(-50% + ${dx}px), -50%)` }, { transform: "translate(-50%, -50%)" }],
        timing
      ),
      outgoing.animate(
        [{ transform: "translateX(0)" }, { transform: `translateX(${-dx}px)` }],
        timing
      )
    ];
    slide = { outgoing, incoming, animations };
    await Promise.allSettled(animations.map((a) => a.finished));
    if (token !== slideToken) return;
    finishSlide();
    if (auto) startSlideshow();
  }

  // The visitor moved a photo themselves: slideshow off for this viewing
  function goManually(delta) {
    manualOnly = true;
    stopSlideshow();
    goTo(delta, false);
  }

  function open(v) {
    vehicle = v;
    photoIndex = 0;
    titleEl.textContent = v.name;
    const hasPrice = v.price !== undefined;
    priceEl.textContent = v.available
      ? formatPrice(v.price)
      : v.type === "motorcycle"
        ? (hasPrice ? formatPrice(v.price) + " · Coming Soon" : "Coming Soon")
        : "";
    const specs = SPEC_ORDER.filter((key) => v.specs && v.specs[key]);
    specsEl.innerHTML = specs
      .map((key) => `<li class="spec-pill">${SPEC_ICONS[key]}<span></span></li>`)
      .join("");
    specs.forEach((key, i) => {
      specsEl.children[i].lastChild.textContent = v.specs[key];
    });
    specsEl.style.display = specs.length ? "" : "none";
    descEl.textContent = v.description || "";
    descEl.style.display = v.description ? "" : "none";
    const comingSoon = !v.available && v.type === "motorcycle";
    actionsEl.style.display = hasPrice || comingSoon ? "" : "none";
    interestBtn.style.display = comingSoon ? "" : "none";
    interestBtn.href = "interest.html?vehicle=" + encodeURIComponent(v.name);
    inquireBtn.style.display = hasPrice ? "" : "none";
    // A real price invites an offer; "Price on Request" (any wording) invites an enquiry
    inquireBtn.textContent = typeof v.price === "number" ? "Submit an Offer" : "Enquire Now";
    inquireBtn.classList.toggle("btn-outline", comingSoon);
    inquireBtn.href = "contact.html?vehicle=" + encodeURIComponent(v.name);
    manualOnly = false;
    imageWrap.style.aspectRatio = v.type === "motorcycle" ? "4 / 3" : "3 / 2";
    modal.classList.toggle("is-bike", v.type === "motorcycle");
    renderPhoto();
    startSlideshow();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    stopSlideshow();
    slideToken++;
    finishSlide();
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.body.addEventListener("click", (e) => {
    const card = e.target.closest(".vehicle-card");
    if (!card) return;
    const v = VEHICLES[Number(card.dataset.vehicleIndex)];
    if (v) open(v);
  });

  modal.querySelector(".gallery-backdrop").addEventListener("click", close);
  modal.querySelector(".gallery-close").addEventListener("click", close);
  prevBtn.addEventListener("click", () => goManually(-1));
  nextBtn.addEventListener("click", () => goManually(1));
  imageWrap.addEventListener("click", (e) => {
    if (!e.target.classList.contains("gallery-image")) return;
    finishSlide();
    const zoomed = imageWrap.classList.toggle("zoomed");
    if (zoomed) stopSlideshow();
    else startSlideshow();
  });

  let touchStartX = 0;
  let touchStartY = 0;
  imageWrap.addEventListener("touchstart", (e) => {
    touchStartX = e.changedTouches[0].clientX;
    touchStartY = e.changedTouches[0].clientY;
  }, { passive: true });
  imageWrap.addEventListener("touchend", (e) => {
    if (imageWrap.classList.contains("zoomed") || vehicle.images.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX;
    const dy = e.changedTouches[0].clientY - touchStartY;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) goManually(dx < 0 ? 1 : -1);
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") goManually(-1);
    if (e.key === "ArrowRight") goManually(1);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFeatured();
  initInventory();
  initGallery();
});
