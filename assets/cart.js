/* ========================================================
   MT Valves & Fittings — Cart logic v1.0
   ========================================================
   Pure-JS cart using localStorage. No backend.
   Exposes window.MT_Cart with addToCart, removeFromCart,
   updateQty, clearCart, getCart, getCartCount, getCartTotal.
   Auto-renders badge on every page that has a .cart-badge.
   ======================================================== */
(function () {
  'use strict';
  var STORAGE_KEY = 'mt_cart_v1';

  function getCart() {
    try {
      var raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }

  function saveCart(cart) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch (e) { /* quota or private mode */ }
    updateBadge();
  }

  function addToCart(product) {
    if (!product || !product.sku) return;
    var cart = getCart();
    var existing = cart.find(function (i) { return i.sku === product.sku; });
    var qty = parseInt(product.qty, 10) || 1;
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        sku: product.sku,
        title: product.title || ('Ref. ' + product.sku),
        category: product.category || '',
        priceAED: parseFloat(product.priceAED) || 0,
        priceEUR: parseFloat(product.priceEUR) || 0,
        image: product.image || '',
        url: product.url || '',
        qty: qty,
        quoteOnly: !!product.quoteOnly,
        addedAt: Date.now()
      });
    }
    saveCart(cart);
    showToast('✓ Added to cart: ' + (product.title || ('Ref. ' + product.sku)));
    if (typeof window.renderCart === 'function') window.renderCart();
  }

  function removeFromCart(sku) {
    var cart = getCart().filter(function (i) { return i.sku !== sku; });
    saveCart(cart);
    if (typeof window.renderCart === 'function') window.renderCart();
  }

  function updateQty(sku, newQty) {
    var cart = getCart();
    var item = cart.find(function (i) { return i.sku === sku; });
    if (!item) return;
    item.qty = Math.max(1, parseInt(newQty, 10) || 1);
    saveCart(cart);
    if (typeof window.renderCart === 'function') window.renderCart();
  }

  function clearCart() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    updateBadge();
    if (typeof window.renderCart === 'function') window.renderCart();
  }

  function getCartCount() {
    return getCart().reduce(function (s, i) { return s + (parseInt(i.qty, 10) || 0); }, 0);
  }

  function getCartTotalAED() {
    return getCart().reduce(function (s, i) { return s + (i.priceAED || 0) * (i.qty || 0); }, 0);
  }

  function getCartTotalEUR() {
    return getCart().reduce(function (s, i) { return s + (i.priceEUR || 0) * (i.qty || 0); }, 0);
  }

  function updateBadge() {
    var count = getCartCount();
    var nodes = document.querySelectorAll('.cart-badge');
    for (var i = 0; i < nodes.length; i++) {
      nodes[i].textContent = count;
      nodes[i].style.display = count > 0 ? 'inline-flex' : 'none';
    }
  }

  function showToast(msg) {
    var t = document.getElementById('mt-toast');
    if (!t) {
      t = document.createElement('div');
      t.id = 'mt-toast';
      t.setAttribute('role', 'status');
      t.style.cssText = [
        'position:fixed', 'bottom:24px', 'right:24px',
        'background:#0B4F7A', 'color:#fff',
        'padding:14px 20px', 'border-radius:8px',
        'box-shadow:0 6px 20px rgba(0,0,0,0.25)',
        'z-index:99999',
        'font-family:system-ui,-apple-system,sans-serif',
        'font-size:14px', 'font-weight:600',
        'opacity:0', 'transform:translateY(20px)',
        'transition:opacity 0.25s ease, transform 0.25s ease',
        'max-width:340px', 'line-height:1.4',
        'pointer-events:none'
      ].join(';');
      document.body.appendChild(t);
    }
    t.textContent = msg;
    requestAnimationFrame(function () {
      t.style.opacity = '1';
      t.style.transform = 'translateY(0)';
    });
    clearTimeout(t._timer);
    t._timer = setTimeout(function () {
      t.style.opacity = '0';
      t.style.transform = 'translateY(20px)';
    }, 2600);
  }

  // Cross-tab sync: if cart changes in another tab, update badge here
  window.addEventListener('storage', function (e) {
    if (e.key === STORAGE_KEY) {
      updateBadge();
      if (typeof window.renderCart === 'function') window.renderCart();
    }
  });

  // Expose
  window.MT_Cart = {
    getCart: getCart,
    addToCart: addToCart,
    removeFromCart: removeFromCart,
    updateQty: updateQty,
    clearCart: clearCart,
    getCartCount: getCartCount,
    getCartTotalAED: getCartTotalAED,
    getCartTotalEUR: getCartTotalEUR,
    updateBadge: updateBadge,
    showToast: showToast
  };

  // Init badge on load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', updateBadge);
  } else {
    updateBadge();
  }
})();
