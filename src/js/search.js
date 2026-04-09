/**
 * search.js
 * ---------
 * Live search dropdown in the utility bar.
 * Filters SEEDS_DB by name / latin / desc and renders a dropdown.
 *
 * Depends on: seeds-data.js (SEEDS_DB global)
 */

document.addEventListener('DOMContentLoaded', () => {
  const input      = document.getElementById('product-search');
  const triggerBtn = document.getElementById('trigger-search');
  const dropdown   = document.getElementById('search-results');

  if (!input || !dropdown) return;

  /* ── Run search ────────────────────────────────────────────── */
  function runSearch() {
    const q = input.value.trim().toLowerCase();

    if (q.length < 2) {
      dropdown.classList.remove('visible');
      dropdown.innerHTML = '';
      return;
    }

    const results = SEEDS_DB.filter(s =>
      s.name.toLowerCase().includes(q)  ||
      s.latin.toLowerCase().includes(q) ||
      s.desc.toLowerCase().includes(q)
    ).slice(0, 8);   // show max 8 results

    if (results.length === 0) {
      dropdown.innerHTML = `<div class="search-result-item"><span style="color:#999;font-size:.85rem">Нічого не знайдено</span></div>`;
    } else {
      dropdown.innerHTML = results.map(s => `
        <div class="search-result-item" data-id="${s.id}">
          <span class="sr-emoji">${s.emoji}</span>
          <div>
            <div class="sr-name">${highlight(s.name, q)}</div>
            <div class="sr-latin">${s.latin}</div>
          </div>
        </div>`
      ).join('');

      /* Click → open catalog modal filtered to that item */
      dropdown.querySelectorAll('.search-result-item[data-id]').forEach(el => {
        el.addEventListener('click', () => {
          const seed = SEEDS_DB.find(s => s.id === Number(el.dataset.id));
          if (!seed) return;
          dropdown.classList.remove('visible');
          input.value = '';
          /* Open catalog and search for item name */
          openCatalogSearch(seed.name);
        });
      });
    }

    dropdown.classList.add('visible');
  }

  /* ── Highlight matching text ───────────────────────────────── */
  function highlight(text, q) {
    const re = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(re, '<mark style="background:#c8e6c9;border-radius:3px;padding:0 2px">$1</mark>');
  }

  /* ── Open catalog with pre-filled search ───────────────────── */
  function openCatalogSearch(name) {
    const catalogModal   = document.getElementById('catalog-modal');
    const catalogBackdrop= document.getElementById('catalog-backdrop');
    const catSearch      = document.getElementById('cat-search');

    if (!catalogModal) return;
    catalogModal.classList.add('open');
    if (catalogBackdrop) catalogBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';

    if (catSearch) {
      catSearch.value = name;
      catSearch.dispatchEvent(new Event('input'));   // trigger filter
    }
  }

  /* ── Events ────────────────────────────────────────────────── */
  input.addEventListener('input', runSearch);
  triggerBtn?.addEventListener('click', runSearch);

  /* Close dropdown on outside click */
  document.addEventListener('click', e => {
    if (!input.contains(e.target) && !dropdown.contains(e.target)) {
      dropdown.classList.remove('visible');
    }
  });

  /* Keyboard navigation */
  input.addEventListener('keydown', e => {
    const items = dropdown.querySelectorAll('.search-result-item[data-id]');
    const cur   = dropdown.querySelector('.search-result-item.focused');
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const next = cur ? cur.nextElementSibling : items[0];
      cur?.classList.remove('focused');
      next?.classList.add('focused');
      next?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prev = cur?.previousElementSibling;
      cur?.classList.remove('focused');
      prev?.classList.add('focused');
      prev?.scrollIntoView({ block: 'nearest' });
    } else if (e.key === 'Enter' && cur) {
      cur.click();
    } else if (e.key === 'Escape') {
      dropdown.classList.remove('visible');
      input.blur();
    }
  });
});
