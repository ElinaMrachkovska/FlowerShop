/**
 * navbar.js
 * ---------
 * Handles:
 *  - Sticky shadow on scroll
 *  - Mobile navigation toggle
 *  - Language-switcher button events (delegates to i18n.applyLang)
 *
 * Depends on: i18n.js  (applyLang must be defined globally)
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Sticky shadow ──────────────────────────────────────────── */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);
  }, { passive: true });


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
      applyLang(btn.dataset.lang);   // applyLang is exported from i18n.js
    });
  });

});
document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Дія для пошуку
    const searchTrigger = document.getElementById('trigger-search');
    const searchInput = document.getElementById('product-search');

    const performSearch = () => {
        const query = searchInput.value.trim();
        if (query) {
            console.log("Шукаємо:", query);
            // Тут твоя логіка фільтрації товарів або перехід на сторінку пошуку
            // window.location.href = `/search?q=${query}`;
        }
    };

    searchTrigger.addEventListener('click', performSearch);
    
    // Дозволяємо шукати при натисканні Enter в інпуті
    searchInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performSearch();
    });

    // 2. Дія для кошика
    const cartBtn = document.getElementById('open-cart');
    cartBtn.addEventListener('click', () => {
        console.log("Відкриваємо кошик");
        // Якщо у тебе кошик — це модалка Bootstrap:
        // const cartModal = new bootstrap.Modal(document.getElementById('modalCart'));
        // cartModal.show();
    });

    // 3. Дія для списку бажаного
    const wishlistBtn = document.getElementById('open-wishlist');
    wishlistBtn.addEventListener('click', () => {
        console.log("Перехід до обраного");
        window.location.hash = "wishlist"; // або інша логіка
    });
});