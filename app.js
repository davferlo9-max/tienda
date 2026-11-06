/* ░░ GAMESTORE · LÓGICA DE TIENDA ░░ */
(() => {
  "use strict";

  // ── Fallback de portadas en cascada ─────────────────────
  // Recorre COVER_SOURCES; si se agotan, muestra un marcador con el título.
  window.coverFallback = function (img) {
    const appId = Number(img.dataset.app);
    const next = Number(img.dataset.idx) + 1;
    const sources = COVER_SOURCES(appId);
    if (next < sources.length) {
      img.dataset.idx = next;
      img.src = sources[next];
      return;
    }
    // Agotadas las fuentes: marcador legible con el título.
    const title = decodeURIComponent(img.dataset.title || "Juego");
    const parent = img.parentElement;
    img.remove();
    const ph = document.createElement("div");
    ph.className = "card__placeholder";
    ph.innerHTML = `<span>🎮</span><p>${title}</p>`;
    parent.appendChild(ph);
  };

  // ── Estado ──────────────────────────────────────────────
  const state = {
    category: "all",
    query: "",
    sort: "featured",
    cart: loadCart(), // { [id]: qty }
  };

  // ── Referencias DOM ─────────────────────────────────────
  const el = {
    grid:        document.getElementById("productGrid"),
    empty:       document.getElementById("emptyState"),
    search:      document.getElementById("search"),
    sort:        document.getElementById("sort"),
    nav:         document.getElementById("categoryNav"),
    cartToggle:  document.getElementById("cartToggle"),
    cartClose:   document.getElementById("cartClose"),
    cartPanel:   document.getElementById("cartPanel"),
    cartItems:   document.getElementById("cartItems"),
    cartCount:   document.getElementById("cartCount"),
    cartTotal:   document.getElementById("cartTotal"),
    overlay:     document.getElementById("overlay"),
    checkout:    document.getElementById("checkoutBtn"),
  };

  const fmt = (n) => n.toLocaleString("es-ES", { style: "currency", currency: "EUR" });
  const byId = (id) => PRODUCTS.find((p) => p.id === id);

  // ── Catálogo ────────────────────────────────────────────
  function getVisibleProducts() {
    let list = PRODUCTS.filter((p) => {
      const matchCat = state.category === "all" || p.platform === state.category;
      const matchQ = p.title.toLowerCase().includes(state.query) ||
                     p.genre.toLowerCase().includes(state.query);
      return matchCat && matchQ;
    });

    switch (state.sort) {
      case "price-asc":  list.sort((a, b) => a.price - b.price); break;
      case "price-desc": list.sort((a, b) => b.price - a.price); break;
      case "name":       list.sort((a, b) => a.title.localeCompare(b.title)); break;
    }
    return list;
  }

  function renderCatalog() {
    const list = getVisibleProducts();
    el.empty.hidden = list.length > 0;
    el.grid.innerHTML = list.map(cardHTML).join("");
  }

  function cardHTML(p) {
    const priceBlock = p.price === 0
      ? `<span class="card__price-now">GRATIS</span>`
      : `${p.oldPrice ? `<span class="card__price-old">${fmt(p.oldPrice)}</span>` : ""}
         <span class="card__price-now">${fmt(p.price)}</span>`;
    return `
      <article class="card">
        <div class="card__media">
          ${p.badge ? `<span class="card__badge">${p.badge}</span>` : ""}
          <span class="card__plat">${PLATFORM_LABEL[p.platform]}</span>
          <img class="card__img" src="${coverUrl(p.appId)}" alt="Carátula de ${p.title}"
               loading="lazy" data-app="${p.appId}" data-idx="0" data-title="${encodeURIComponent(p.title)}"
               onerror="window.coverFallback(this)" />
        </div>
        <div class="card__body">
          <h3 class="card__title">${p.title}</h3>
          <p class="card__genre">${p.genre}</p>
          <div class="card__footer">
            <div class="card__price">${priceBlock}</div>
            <button class="card__add" data-add="${p.id}">Añadir</button>
          </div>
        </div>
      </article>`;
  }

  // ── Carrito ─────────────────────────────────────────────
  function addToCart(id) {
    state.cart[id] = (state.cart[id] || 0) + 1;
    persist();
    renderCart();
    openCart();
  }
  function changeQty(id, delta) {
    state.cart[id] = (state.cart[id] || 0) + delta;
    if (state.cart[id] <= 0) delete state.cart[id];
    persist();
    renderCart();
  }
  function removeFromCart(id) {
    delete state.cart[id];
    persist();
    renderCart();
  }

  function renderCart() {
    const ids = Object.keys(state.cart).map(Number);
    const totalQty = ids.reduce((s, id) => s + state.cart[id], 0);
    const totalCost = ids.reduce((s, id) => s + byId(id).price * state.cart[id], 0);

    el.cartCount.textContent = totalQty;
    el.cartTotal.textContent = fmt(totalCost);

    el.cartItems.innerHTML = ids.length === 0
      ? `<p class="cart__empty">Tu carrito está vacío 🕹️</p>`
      : ids.map((id) => {
          const p = byId(id);
          return `
            <div class="cart-item">
              <img class="cart-item__thumb" src="${coverUrl(p.appId)}" alt="" loading="lazy"
                   data-app="${p.appId}" data-idx="0" data-title="${encodeURIComponent(p.title)}"
                   onerror="window.coverFallback(this)" />
              <div class="cart-item__info">
                <p class="cart-item__name">${p.title}</p>
                <p class="cart-item__price">${fmt(p.price)}</p>
              </div>
              <div class="cart-item__qty">
                <button class="qty-btn" data-qty="${id}" data-delta="-1" aria-label="Quitar uno">−</button>
                <span>${state.cart[id]}</span>
                <button class="qty-btn" data-qty="${id}" data-delta="1" aria-label="Añadir uno">+</button>
              </div>
              <button class="cart-item__remove" data-remove="${id}" aria-label="Eliminar">🗑</button>
            </div>`;
        }).join("");
  }

  function openCart() {
    el.cartPanel.classList.add("is-open");
    el.cartPanel.setAttribute("aria-hidden", "false");
    el.overlay.hidden = false;
  }
  function closeCart() {
    el.cartPanel.classList.remove("is-open");
    el.cartPanel.setAttribute("aria-hidden", "true");
    el.overlay.hidden = true;
  }

  // ── Persistencia (localStorage) ─────────────────────────
  function persist() { localStorage.setItem("gamestore_cart", JSON.stringify(state.cart)); }
  function loadCart() {
    try { return JSON.parse(localStorage.getItem("gamestore_cart")) || {}; }
    catch { return {}; }
  }

  // ── Eventos ─────────────────────────────────────────────
  el.search.addEventListener("input", (e) => {
    state.query = e.target.value.trim().toLowerCase();
    renderCatalog();
  });

  el.sort.addEventListener("change", (e) => {
    state.sort = e.target.value;
    renderCatalog();
  });

  el.nav.addEventListener("click", (e) => {
    const btn = e.target.closest(".nav__item");
    if (!btn) return;
    el.nav.querySelectorAll(".nav__item").forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
    state.category = btn.dataset.cat;
    renderCatalog();
  });

  // Delegación en la rejilla: botón "Añadir"
  el.grid.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add]");
    if (btn) addToCart(Number(btn.dataset.add));
  });

  // Delegación en el carrito: cantidades y eliminar
  el.cartItems.addEventListener("click", (e) => {
    const qtyBtn = e.target.closest("[data-qty]");
    const rmBtn = e.target.closest("[data-remove]");
    if (qtyBtn) changeQty(Number(qtyBtn.dataset.qty), Number(qtyBtn.dataset.delta));
    if (rmBtn) removeFromCart(Number(rmBtn.dataset.remove));
  });

  el.cartToggle.addEventListener("click", openCart);
  el.cartClose.addEventListener("click", closeCart);
  el.overlay.addEventListener("click", closeCart);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeCart(); });

  el.checkout.addEventListener("click", () => {
    const n = Object.keys(state.cart).length;
    if (n === 0) { alert("Tu carrito está vacío."); return; }
    alert(`Compra simulada con ${n} artículo(s). ¡Gracias! 🎮`);
    state.cart = {};
    persist();
    renderCart();
    closeCart();
  });

  // ── Init ────────────────────────────────────────────────
  renderCatalog();
  renderCart();
})();
