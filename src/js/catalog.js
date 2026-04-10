document.addEventListener('DOMContentLoaded', () => {

  const openBtn     = document.getElementById('open-catalog');
  const modal       = document.getElementById('catalog-modal');
  const closeBtn    = document.getElementById('catalog-close');
  const backdrop    = document.getElementById('catalog-backdrop');
  const grid        = document.getElementById('catalog-grid');
  const counter     = document.getElementById('catalog-counter');
  const searchInput = document.getElementById('cat-search');
  const resetBtn    = document.getElementById('cat-reset');

  const filterSeason    = document.getElementById('filter-season');
  const filterLifecycle = document.getElementById('filter-lifecycle');
  const filterHeight    = document.getElementById('filter-height');
  const filterColor     = document.getElementById('filter-color');
  const filterSun       = document.getElementById('filter-sun');

  if (!modal || !openBtn) return;

  function openModal() {
    modal.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    renderGrid(getFiltered());
    searchInput.focus();
  }

  function closeModal() {
    modal.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  openBtn.addEventListener('click', (e) => {
    e.preventDefault();
    openModal();
  });

  closeBtn.addEventListener('click',    closeModal);
  backdrop.addEventListener('click',    closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  function getActiveFilters() {
    return {
      season:    filterSeason.value,
      lifecycle: filterLifecycle.value,
      height:    filterHeight.value,
      color:     filterColor.value,
      sun:       filterSun.value,
      query:     searchInput.value.trim().toLowerCase(),
    };
  }

  function getFiltered() {
    const f = getActiveFilters();

    return SEEDS_DB.filter((seed) => {
      if (f.season    && !seed.season.includes(f.season))       return false;
      if (f.lifecycle && seed.lifecycle !== f.lifecycle)         return false;
      if (f.height    && seed.height    !== f.height)            return false;
      if (f.color     && !seed.color.includes(f.color))         return false;
      if (f.sun       && seed.sun       !== f.sun)               return false;

      if (f.query) {
        const inName  = seed.name.toLowerCase().includes(f.query);
        const inLatin = seed.latin.toLowerCase().includes(f.query);
        const inDesc  = seed.desc.toLowerCase().includes(f.query);
        if (!inName && !inLatin && !inDesc) return false;
      }

      return true;
    });
  }

  const SEASON_LABELS = {
    'early-spring': '🌱 Ранньовесняні',
    'mid-spring':   '🌷 Середньовесняні',
    'late-spring':  '🌸 Пізньовесняні',
    'summer':       '☀️ Літні',
    'autumn':       '🍂 Осінні',
  };

  const LIFECYCLE_LABELS = {
    'annual':    '1-річний',
    'biennial':  '2-річний',
    'perennial': 'Багаторічний',
  };

  const HEIGHT_LABELS = {
    'low':    '↕ Низький (<30 см)',
    'medium': '↕ Середній (30–70 см)',
    'tall':   '↕ Високий (>70 см)',
  };

  const SUN_LABELS = {
    'full-sun':      '☀️ Сонце',
    'partial-shade': '⛅ Напівтінь',
    'shade':         '🌑 Тінь',
  };

  function renderGrid(data) {
    counter.textContent = `Знайдено: ${data.length} з ${SEEDS_DB.length}`;

    if (data.length === 0) {
      grid.innerHTML = `
        <div class="cat-empty">
          🌵 Нічого не знайдено.<br/>
          <small>Спробуйте змінити фільтри або пошуковий запит.</small>
        </div>`;
      return;
    }

    grid.innerHTML = data.map((seed) => {
      const seasonTags = seed.season
        .map((s) => `<span class="tag tag-season">${SEASON_LABELS[s] ?? s}</span>`)
        .join('');

      const colorDots = seed.color
        .map((c) => `<span class="color-dot" style="background:${cssColor(c)}" title="${c}"></span>`)
        .join('');

      return `
        <article class="cat-card" data-id="${seed.id}">
          <div class="cat-card__emoji">${seed.emoji}</div>
          <div class="cat-card__body">
            <h4 class="cat-card__name">${seed.name}</h4>
            <div class="cat-card__latin">${seed.latin}</div>
            <p  class="cat-card__desc">${seed.desc}</p>
            <div class="cat-card__tags">
              ${seasonTags}
              <span class="tag tag-lifecycle">${LIFECYCLE_LABELS[seed.lifecycle] ?? seed.lifecycle}</span>
              <span class="tag tag-height">${HEIGHT_LABELS[seed.height] ?? seed.height}</span>
              <span class="tag tag-sun">${SUN_LABELS[seed.sun] ?? seed.sun}</span>
            </div>
            <div class="cat-card__colors">${colorDots}</div>
          </div>
        </article>`;
    }).join('');
  }

  function cssColor(name) {
    const map = {
      white:    '#fff',    cream:    '#fffde7', black:    '#222',
      red:      '#e53935', burgundy: '#880e4f', orange:   '#ff7043',
      yellow:   '#ffca28', green:    '#4caf50', blue:     '#1e88e5',
      purple:   '#8e24aa', violet:   '#7b1fa2', lavender: '#9c7bb5',
      pink:     '#f06292', lilac:    '#ce93d8', white2:   '#f5f5f5',
      silver:   '#bdbdbd', beige:    '#d7ccc8', brown:    '#795548',
      coral:    '#ff7e5f', peach:    '#ffb74d', salmon:   '#fa8072',
    };
    return map[name] ?? name;
  }

  [filterSeason, filterLifecycle, filterHeight, filterColor, filterSun].forEach((el) => {
    el.addEventListener('change', () => renderGrid(getFiltered()));
  });

  searchInput.addEventListener('input', () => renderGrid(getFiltered()));

  resetBtn.addEventListener('click', () => {
    filterSeason.value    = '';
    filterLifecycle.value = '';
    filterHeight.value    = '';
    filterColor.value     = '';
    filterSun.value       = '';
    searchInput.value     = '';
    renderGrid(SEEDS_DB);
  });

});