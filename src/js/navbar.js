/**
 * navbar.js
 * ---------
 * Handles:
 *  - Sticky shadow on scroll
 *  - Mobile navigation toggle
 *  - Search functionality
 *  - Cart and Wishlist triggers
 *  - Language-switcher button events
 *
 * Depends on: i18n.js, cart.js (for openCart/openWishlist functions)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky shadow ──────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }


  /* ── Mobile nav toggle ──────────────────────────────────────── */
  const toggleBtn = document.getElementById('nav-toggle');
  const navMenu   = document.getElementById('nav-menu');

  if (toggleBtn && navMenu) {
    toggleBtn.addEventListener('click', () => {
      navMenu.classList.toggle('d-none');
    });

    /* Close nav when a link is clicked on mobile */
    navMenu.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth < 768) {
          navMenu.classList.add('d-none');
        }
      });
    });
  }


  /* ── Language-switcher buttons ──────────────────────────────── */
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (typeof applyLang === 'function') {
        applyLang(btn.dataset.lang);
      }
    });
  });


  /* ── Search Functionality ───────────────────────────────────── */
  const searchTrigger = document.getElementById('trigger-search');
  const searchInput   = document.getElementById('product-search');

  const performSearch = () => {
    const query = searchInput.value.trim();
    if (query) {
      console.log("Шукаємо:", query);
      // Logic for filtering products or redirecting
      // Example: if catalog modal is used, update its search input and open it
      const catSearch = document.getElementById('cat-search');
      if (catSearch) {
        catSearch.value = query;
        catSearch.dispatchEvent(new Event('input'));
        document.getElementById('open-catalog')?.click();
      }
    }
  };

  if (searchTrigger && searchInput) {
    searchTrigger.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') performSearch();
    });
  }


  /* ── Cart & Wishlist Triggers ───────────────────────────────── */
  const cartBtn = document.getElementById('open-cart');
  if (cartBtn) {
    cartBtn.addEventListener('click', () => {
      if (typeof openCart === 'function') {
        openCart();
      } else {
        console.log("Відкриваємо кошик (функція openCart не знайдена)");
      }
    });
  }

  const wishlistBtn = document.getElementById('open-wishlist');
  if (wishlistBtn) {
    wishlistBtn.addEventListener('click', () => {
      if (typeof openWishlist === 'function') {
        openWishlist();
      } else {
        console.log("Перехід до обраного (функція openWishlist не знайдена)");
        window.location.hash = "wishlist";
      }
    });
  }

});