function seedPrice(id) {
  const base = [29, 35, 42, 49, 55, 62, 68, 75][id % 8];
  return base + (id % 5) * 4;
}

function getCart()     { return JSON.parse(localStorage.getItem('fs_cart')     || '[]'); }
function getWishlist() { return JSON.parse(localStorage.getItem('fs_wishlist') || '[]'); }
function saveCart(c)   { localStorage.setItem('fs_cart',     JSON.stringify(c)); }
function saveWishlist(w){ localStorage.setItem('fs_wishlist', JSON.stringify(w)); }

function addToCart(seed) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === seed.id);
  if (idx >= 0) {
    cart[idx].qty += 1;
  } else {
    cart.push({ id: seed.id, name: seed.name, latin: seed.latin,
                emoji: seed.emoji, price: seedPrice(seed.id), qty: 1 });
  }
  saveCart(cart);
  updateCartBadge();
  renderCart();
  flashBadge('cart-count');
}

function removeFromCart(id) {
  saveCart(getCart().filter(i => i.id !== id));
  updateCartBadge();
  renderCart();
}

function changeQty(id, delta) {
  const cart = getCart();
  const idx  = cart.findIndex(i => i.id === id);
  if (idx < 0) return;
  cart[idx].qty = Math.max(1, cart[idx].qty + delta);
  saveCart(cart);
  updateCartBadge();
  renderCart();
}

function toggleWishlist(seed) {
  const list = getWishlist();
  const idx  = list.findIndex(i => i.id === seed.id);
  if (idx >= 0) {
    list.splice(idx, 1);
    saveWishlist(list);
    updateWishlistBadge();
    renderWishlist();
    return false;
  } else {
    list.push({ id: seed.id, name: seed.name, latin: seed.latin,
                emoji: seed.emoji, price: seedPrice(seed.id) });
    saveWishlist(list);
    updateWishlistBadge();
    renderWishlist();
    flashBadge('wishlist-count');
    return true;
  }
}

function isWished(id) {
  return getWishlist().some(i => i.id === id);
}

function updateCartBadge() {
  const total = getCart().reduce((s, i) => s + i.qty, 0);
  const el = document.getElementById('cart-count');
  if (el) el.textContent = total;
}

function updateWishlistBadge() {
  const el = document.getElementById('wishlist-count');
  if (el) el.textContent = getWishlist().length;
}

function flashBadge(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.style.transform = 'scale(1.6)';
  setTimeout(() => { el.style.transform = ''; }, 250);
}

function renderCart() {
  const body   = document.getElementById('cart-body');
  const footer = document.getElementById('cart-footer');
  if (!body) return;

  const cart = getCart();

  if (cart.length === 0) {
    body.innerHTML = `<div class="panel-empty">🛒<br/>Кошик порожній.<br/><small>Додайте товари з каталогу.</small></div>`;
    if (footer) footer.innerHTML = '';
    return;
  }

  body.innerHTML = cart.map(item => `
    <div class="panel-item" data-id="${item.id}">
      <div class="panel-item__emoji">${item.emoji}</div>
      <div class="panel-item__info">
        <div class="panel-item__name">${item.name}</div>
        <div class="panel-item__latin">${item.latin}</div>
        <div class="panel-item__price">${item.price * item.qty} грн</div>
        <div class="qty-control">
          <button class="qty-btn" onclick="changeQty(${item.id},-1)">−</button>
          <span   class="qty-value">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="btn-remove-item" onclick="removeFromCart(${item.id})" aria-label="Видалити">✕</button>
    </div>`
  ).join('');

  const total = cart.reduce((s, i) => s + i.price * i.qty, 0);

  if (footer) {
    footer.innerHTML = `
      <div class="cart-total-row">
        <span>Разом:</span>
        <span>${total} грн</span>
      </div>
      <button class="btn-checkout" onclick="handleCheckout()">
        🌸 Оформити замовлення
      </button>`;
  }
}

function renderWishlist() {
  const body = document.getElementById('wishlist-body');
  if (!body) return;

  const list = getWishlist();

  if (list.length === 0) {
    body.innerHTML = `<div class="panel-empty">❤️<br/>Список бажань порожній.<br/><small>Натисніть ♡ на будь-якому товарі.</small></div>`;
    return;
  }

  body.innerHTML = list.map(item => `
    <div class="panel-item" data-id="${item.id}">
      <div class="panel-item__emoji">${item.emoji}</div>
      <div class="panel-item__info">
        <div class="panel-item__name">${item.name}</div>
        <div class="panel-item__latin">${item.latin}</div>
        <div class="panel-item__price">${item.price} грн / пакет</div>
        <button class="btn-to-cart" onclick="moveWishToCart(${item.id})">
          🛒 До кошика
        </button>
      </div>
      <button class="btn-remove-item" onclick="removeFromWishlist(${item.id})" aria-label="Видалити">✕</button>
    </div>`
  ).join('');

  syncWishButtons();
}

function removeFromWishlist(id) {
  const list = getWishlist().filter(i => i.id !== id);
  saveWishlist(list);
  updateWishlistBadge();
  renderWishlist();
  syncWishButtons();
}

function moveWishToCart(id) {
  const item = getWishlist().find(i => i.id === id);
  if (!item) return;
  addToCart(item);
  removeFromWishlist(id);
}

function syncWishButtons() {
  document.querySelectorAll('.btn-add-wish').forEach(btn => {
    const id = Number(btn.dataset.id);
    btn.classList.toggle('wished', isWished(id));
    btn.title = isWished(id) ? 'Видалити з бажаного' : 'До бажаного';
  });
}

function handleCheckout() {
  const session = JSON.parse(localStorage.getItem('fs_session') || 'null');
  if (!session) {
    alert('Будь ласка, увійдіть або зареєструйтесь для оформлення замовлення.');
    closeSidePanel('cart-panel');
    const modal = new bootstrap.Modal(document.getElementById('modalAuth'));
    modal.show();
    return;
  }
  alert(`✅ Дякуємо, ${session.name}! Ваше замовлення прийнято.\nМенеджер зв'яжеться з вами найближчим часом.`);
  saveCart([]);
  updateCartBadge();
  renderCart();
  closeSidePanel('cart-panel');
}

function openSidePanel(panelId) {
  document.getElementById(panelId)?.classList.add('open');
  document.getElementById('panel-backdrop')?.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeSidePanel(panelId) {
  document.getElementById(panelId)?.classList.remove('open');
  const anyOpen = document.querySelector('.side-panel.open');
  if (!anyOpen) {
    document.getElementById('panel-backdrop')?.classList.remove('open');
    document.body.style.overflow = '';
  }
}

function openCart()     { renderCart();     openSidePanel('cart-panel'); }
function openWishlist() { renderWishlist(); openSidePanel('wishlist-panel'); }

document.addEventListener('DOMContentLoaded', () => {

  document.getElementById('open-cart')?.addEventListener('click',    openCart);
  document.getElementById('open-wishlist')?.addEventListener('click', openWishlist);

  document.getElementById('close-cart')?.addEventListener('click',    () => closeSidePanel('cart-panel'));
  document.getElementById('close-wishlist')?.addEventListener('click', () => closeSidePanel('wishlist-panel'));

  document.getElementById('panel-backdrop')?.addEventListener('click', () => {
    closeSidePanel('cart-panel');
    closeSidePanel('wishlist-panel');
  });

  updateCartBadge();
  updateWishlistBadge();
});