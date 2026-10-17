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
    statusTag = `<span class="price-tag">${formatPrice(v.price)}</span>`;
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
  all: "From classic cars to iconic motorcycles, every vehicle we handle is carefully sourced and properly sorted before it goes up for sale.",
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
  let currentFilter = "all";

  function apply() {
    const list =
      currentFilter === "all"
        ? VEHICLES
        : VEHICLES.filter((v) => v.type === currentFilter);
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
        <p class="gallery-desc"></p>
        <p class="gallery-counter"></p>
      </div>
      <div class="gallery-actions">
        <a class="btn gallery-interest" href="interest.html">
          <span class="btn-main">Register Your Interest</span>
          <span class="btn-sub">Be the first to know when it's available</span>
        </a>
        <a class="btn gallery-inquire" href="contact.html">Inquire Now</a>
      </div>
    </div>
  `;
  document.body.appendChild(modal);

  const imageWrap = modal.querySelector(".gallery-image-wrap");
  const imageEl = modal.querySelector(".gallery-image");
  const titleEl = modal.querySelector(".gallery-title");
  const priceEl = modal.querySelector(".gallery-price");
  const descEl = modal.querySelector(".gallery-desc");
  const counterEl = modal.querySelector(".gallery-counter");
  const prevBtn = modal.querySelector(".gallery-prev");
  const nextBtn = modal.querySelector(".gallery-next");
  const actionsEl = modal.querySelector(".gallery-actions");
  const inquireBtn = modal.querySelector(".gallery-inquire");
  const interestBtn = modal.querySelector(".gallery-interest");

  let vehicle = null;
  let photoIndex = 0;

  function renderPhoto() {
    imageWrap.classList.remove("zoomed");
    imageEl.src = vehicle.images[photoIndex];
    imageEl.alt = vehicle.name;
    const multi = vehicle.images.length > 1;
    prevBtn.style.display = multi ? "flex" : "none";
    nextBtn.style.display = multi ? "flex" : "none";
    counterEl.style.display = multi ? "block" : "none";
    counterEl.textContent = `${photoIndex + 1} / ${vehicle.images.length}`;
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
    descEl.textContent = v.description || "";
    descEl.style.display = v.description ? "" : "none";
    const comingSoon = !v.available && v.type === "motorcycle";
    actionsEl.style.display = hasPrice || comingSoon ? "" : "none";
    interestBtn.style.display = comingSoon ? "" : "none";
    interestBtn.href = "interest.html?vehicle=" + encodeURIComponent(v.name);
    inquireBtn.style.display = hasPrice ? "" : "none";
    inquireBtn.classList.toggle("btn-outline", comingSoon);
    inquireBtn.href = "contact.html?vehicle=" + encodeURIComponent(v.name);
    renderPhoto();
    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function close() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  function step(delta) {
    photoIndex = (photoIndex + delta + vehicle.images.length) % vehicle.images.length;
    renderPhoto();
  }

  document.body.addEventListener("click", (e) => {
    const card = e.target.closest(".vehicle-card");
    if (!card) return;
    const v = VEHICLES[Number(card.dataset.vehicleIndex)];
    if (v) open(v);
  });

  modal.querySelector(".gallery-backdrop").addEventListener("click", close);
  modal.querySelector(".gallery-close").addEventListener("click", close);
  prevBtn.addEventListener("click", () => step(-1));
  nextBtn.addEventListener("click", () => step(1));
  imageEl.addEventListener("click", () => imageWrap.classList.toggle("zoomed"));

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
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) step(dx < 0 ? 1 : -1);
  }, { passive: true });

  document.addEventListener("keydown", (e) => {
    if (!modal.classList.contains("open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initFeatured();
  initInventory();
  initGallery();
});
