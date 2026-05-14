/* ═══════════════════════════════════════════════════════
   CART — Learn Thai with Mind
   localStorage shopping cart + slide-in drawer
   ═══════════════════════════════════════════════════════ */
(function () {
  'use strict';

  /* ─── Storage ─────────────────────────────────────── */
  const load = () => JSON.parse(localStorage.getItem('ltm_cart') || '[]');
  const save = c  => localStorage.setItem('ltm_cart', JSON.stringify(c));
  let cart = load();

  /* ─── Core ops ────────────────────────────────────── */
  function addItem(item) {
    cart = load();
    const hit = cart.find(i => i.id === item.id);
    hit ? hit.qty++ : cart.push({ ...item, qty: 1 });
    save(cart);
    refresh();
    openDrawer();
    toast(`✓  "${item.name}" added to cart`);
  }

  function removeItem(id)  { cart = cart.filter(i => i.id !== id); save(cart); refresh(); }
  function clearAll()      { cart = []; save(cart); refresh(); }
  function changeQty(id, d) {
    const it = cart.find(i => i.id === id);
    if (!it) return;
    it.qty = Math.max(1, it.qty + d);
    save(cart); refresh();
  }

  const total = () => cart.reduce((s, i) => s + i.price * i.qty, 0);
  const count = () => cart.reduce((s, i) => s + i.qty, 0);

  /* ─── Badge ───────────────────────────────────────── */
  function updateBadge() {
    document.querySelectorAll('.cart-count').forEach(el => {
      const n = count();
      el.textContent = n;
      el.style.display = n > 0 ? 'flex' : 'none';
    });
  }

  /* ─── Toast ───────────────────────────────────────── */
  function toast(msg) {
    let t = document.getElementById('ltm-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'ltm-toast';
      document.body.appendChild(t);
    }
    t.textContent = msg;
    t.classList.add('show');
    clearTimeout(t._t);
    t._t = setTimeout(() => t.classList.remove('show'), 3000);
  }

  /* ─── Inject cart button into nav ─────────────────── */
  function injectCartBtn() {
    if (document.getElementById('nav-cart-btn')) return;
    const ham = document.querySelector('.nav-hamburger');
    if (!ham) return;
    let actions = document.getElementById('nav-actions');
    if (!actions) {
      actions = document.createElement('div');
      actions.id = 'nav-actions';
      ham.parentNode.insertBefore(actions, ham);
    }
    const btn = document.createElement('button');
    btn.id        = 'nav-cart-btn';
    btn.className = 'nav-icon-btn nav-cart-btn';
    btn.setAttribute('aria-label', 'Open cart');
    btn.title = 'Cart';
    btn.innerHTML = `
      <svg width="20" height="20" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
      </svg>
      <span class="cart-count" style="display:none"></span>`;
    btn.onclick = openDrawer;
    actions.appendChild(btn);
  }

  /* ─── Drawer HTML ─────────────────────────────────── */
  function ensureDrawer() {
    if (document.getElementById('cart-drawer')) return;

    const ov = document.createElement('div');
    ov.id = 'cart-overlay';
    ov.onclick = closeDrawer;

    const dr = document.createElement('div');
    dr.id = 'cart-drawer';
    dr.innerHTML = `
      <div class="cd-head">
        <div class="cd-head-left">
          <h3>Cart</h3>
          <span class="cd-item-count" id="cd-item-count"></span>
        </div>
        <button class="cd-close" aria-label="Close cart">✕</button>
      </div>
      <div class="cd-body" id="cd-body"></div>
      <div class="cd-foot" id="cd-foot"></div>`;

    document.body.appendChild(ov);
    document.body.appendChild(dr);
    dr.querySelector('.cd-close').onclick = closeDrawer;
  }

  function renderItems() {
    const body    = document.getElementById('cd-body');
    const foot    = document.getElementById('cd-foot');
    const countEl = document.getElementById('cd-item-count');
    if (!body) return;

    const n = count();
    if (countEl) countEl.textContent = n > 0 ? `${n} item${n !== 1 ? 's' : ''}` : '';

    if (!cart.length) {
      body.innerHTML = `
        <div class="cd-empty">
          <div class="cd-empty-icon">🛒</div>
          <p>Your cart is empty</p>
          <div class="cd-empty-links">
            <a href="books.html" class="btn btn-yellow btn-sm">Browse Books</a>
            <a href="courses.html" class="btn btn-outline btn-sm">View Courses</a>
          </div>
        </div>`;
      if (foot) foot.innerHTML = '';
      return;
    }

    body.innerHTML = cart.map(it => `
      <div class="cd-item">
        <div class="cd-thumb">${it.type === 'course' ? '🎓' : '📚'}</div>
        <div class="cd-item-info">
          <div class="cd-item-name">${it.name}</div>
          <div class="cd-item-type">${it.type === 'course' ? 'Online Course' : 'Digital Book'}</div>
          <div class="cd-qty">
            <button class="cd-qty-btn" onclick="LTMCart._qty('${it.id}',-1)">−</button>
            <span>${it.qty}</span>
            <button class="cd-qty-btn" onclick="LTMCart._qty('${it.id}',1)">+</button>
          </div>
        </div>
        <div class="cd-item-right">
          <span class="cd-price">$${(it.price * it.qty).toFixed(2)}</span>
          <button class="cd-del" onclick="LTMCart.remove('${it.id}')" aria-label="Remove">✕</button>
        </div>
      </div>`).join('');

    if (foot) foot.innerHTML = `
      <div class="cd-subtotal">
        <span>Subtotal (${n} item${n !== 1 ? 's' : ''})</span>
        <strong>$${total().toFixed(2)}</strong>
      </div>
      <p class="cd-tax">Taxes & fees calculated at checkout</p>
      <button class="btn btn-yellow" style="width:100%;justify-content:center;" onclick="LTMCart.checkout()">Proceed to Checkout →</button>
      <button class="cd-clear-btn" onclick="LTMCart.clear()">Clear cart</button>`;
  }

  const refresh = () => { updateBadge(); renderItems(); };

  /* ─── Open / close ────────────────────────────────── */
  function openDrawer() {
    ensureDrawer();
    refresh();
    document.getElementById('cart-overlay').classList.add('open');
    document.getElementById('cart-drawer').classList.add('open');
    document.body.classList.add('modal-open');
  }

  function closeDrawer() {
    document.getElementById('cart-overlay')?.classList.remove('open');
    document.getElementById('cart-drawer')?.classList.remove('open');
    document.body.classList.remove('modal-open');
  }

  /* ─── Checkout ────────────────────────────────────── */
  function checkout() {
    closeDrawer();
    if (window.LTMAuth && !window.LTMAuth.isLoggedIn()) {
      setTimeout(() => LTMAuth.open('Sign in to complete your purchase'), 350);
    } else {
      setTimeout(() => toast('💳 Checkout integration coming soon — we\'ll notify you when it\'s live!'), 350);
    }
  }

  /* ─── Public API ──────────────────────────────────── */
  window.LTMCart = {
    add:      addItem,
    remove:   removeItem,
    clear:    clearAll,
    open:     openDrawer,
    close:    closeDrawer,
    checkout,
    _qty:     changeQty,
  };

  /* ─── Boot ────────────────────────────────────────── */
  document.addEventListener('DOMContentLoaded', () => {
    injectCartBtn();
    refresh();
    document.querySelectorAll('[data-add-to-cart]').forEach(btn => {
      btn.addEventListener('click', e => {
        e.preventDefault();
        LTMCart.add({
          id:    btn.dataset.productId,
          name:  btn.dataset.productName,
          price: parseFloat(btn.dataset.productPrice),
          type:  btn.dataset.productType || 'book',
        });
      });
    });
  });
})();
