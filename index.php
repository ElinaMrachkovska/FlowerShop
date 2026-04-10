<!DOCTYPE html>
<html lang="uk" data-lang="uk">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>FlowerSeeds — Насіння квітів для вашої садиби</title>

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700;900&family=Nunito:wght@300;400;600;700&display=swap" rel="stylesheet" />

  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" />

  <link rel="stylesheet" href="src/css/base.css"     />
  <link rel="stylesheet" href="src/css/navbar.css"   />
  <link rel="stylesheet" href="src/css/header.css"   />
  <link rel="stylesheet" href="src/css/hero.css"     />
  <link rel="stylesheet" href="src/css/register.css" />
  <link rel="stylesheet" href="src/css/about.css"    />
  <link rel="stylesheet" href="src/css/gallery.css"  />
  <link rel="stylesheet" href="src/css/footer.css"   />
  <link rel="stylesheet" href="src/css/catalog.css"  />
</head>
<body>

  <?php include 'src/components/header.html'; ?>

  <main>
    <?php include 'src/components/hero.html'; ?>
    <?php include 'src/components/register.html'; ?>
    <?php include 'src/components/about.html'; ?>
    <?php include 'src/components/gallery.html'; ?>
  </main>

  <?php include 'src/components/footer.html'; ?>

  <div id="catalog-backdrop" aria-hidden="true"></div>
  <div id="catalog-modal" role="dialog" aria-modal="true" aria-labelledby="catalog-title">
    <div class="catalog-inner">
      <div class="catalog-header">
        <h2 id="catalog-title">🌸 Каталог насіння — <span>200 сортів</span></h2>
        <button id="catalog-close" aria-label="Закрити">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="22" height="22">
            <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </button>
      </div>
      <div class="catalog-filters">
        <div class="cat-search-wrap">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
          <input type="search" id="cat-search" placeholder="Пошук за назвою..." autocomplete="off" />
        </div>
        <select id="filter-season"    class="cat-select"><option value="">🗓 Всі сезони</option><option value="early-spring">🌱 Ранньовесняні</option><option value="mid-spring">🌷 Середньовесняні</option><option value="late-spring">🌸 Пізньовесняні</option><option value="summer">☀️ Літні</option><option value="autumn">🍂 Осінні</option></select>
        <select id="filter-lifecycle" class="cat-select"><option value="">🔄 Всі типи</option><option value="annual">1-річні</option><option value="biennial">2-річні</option><option value="perennial">Багаторічні</option></select>
        <select id="filter-height"    class="cat-select"><option value="">↕ Будь-яка висота</option><option value="low">Низькі (&lt;30 см)</option><option value="medium">Середні (30–70 см)</option><option value="tall">Високі (&gt;70 см)</option></select>
        <select id="filter-color"     class="cat-select"><option value="">🎨 Будь-який колір</option><option value="white">⚪ Білий</option><option value="yellow">🟡 Жовтий</option><option value="orange">🟠 Помаранчевий</option><option value="red">🔴 Червоний</option><option value="pink">🌸 Рожевий</option><option value="purple">🟣 Фіолетовий</option><option value="blue">🔵 Синій</option><option value="green">🟢 Зелений</option></select>
        <select id="filter-sun"       class="cat-select"><option value="">☀️ Будь-яке освітлення</option><option value="full-sun">☀️ Сонце</option><option value="partial-shade">⛅ Напівтінь</option><option value="shade">🌑 Тінь</option></select>
        <button id="cat-reset" type="button">✕ Скинути</button>
        <div id="catalog-counter" aria-live="polite">Знайдено: 200 з 200</div>
      </div>
      <div id="catalog-grid" role="list"></div>
    </div>
  </div>

  <div class="modal fade" id="modalAuth" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content auth-modal">
        <div class="modal-header border-0 pb-0">
          <div class="auth-tabs">
            <span class="auth-tab-btn active" data-tab="auth-login">Вхід</span>
            <span class="auth-tab-btn"        data-tab="auth-register">Реєстрація</span>
          </div>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body pt-3">

          <div id="auth-login" class="auth-panel active">
            <input type="email"    id="login-email" class="form-control mb-2" placeholder="Email" />
            <input type="password" id="login-pass"  class="form-control mb-3" placeholder="Пароль" />
            <div id="login-message" class="auth-message"></div>
            <button id="btn-login" class="btn btn-success w-100 mt-2">🚀 Увійти</button>
            <p class="text-center mt-3" style="font-size:.82rem;color:#999">
              Ще немає акаунту?
              <a href="#" style="color:var(--spring-green);font-weight:700"
                 onclick="event.preventDefault(); document.querySelector('[data-tab=auth-register]').click()">
                Зареєструватись
              </a>
            </p>
          </div>

          <div id="auth-register" class="auth-panel">
            <input type="text"     id="reg-name"     class="form-control mb-2" placeholder="Ім'я *" />
            <input type="text"     id="reg-lastname"  class="form-control mb-2" placeholder="Прізвище *" />
            <input type="email"    id="reg-email"     class="form-control mb-2" placeholder="Email *" />
            <input type="password" id="reg-pass"      class="form-control mb-2" placeholder="Пароль (мін. 6 симв.) *" />
            <input type="password" id="reg-pass2"     class="form-control mb-3" placeholder="Повторіть пароль *" />
            <div id="reg-message" class="auth-message"></div>
            <button id="btn-register" class="btn btn-success w-100 mt-2">🌸 Зареєструватись</button>
          </div>

        </div>
      </div>
    </div>
  </div>

  <div id="cart-panel" class="side-panel" role="dialog" aria-label="Кошик">
    <div class="panel-header">
      <h3>🛒 Мій кошик</h3>
      <button class="panel-close" id="close-cart" aria-label="Закрити">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div id="cart-body"   class="panel-body"></div>
    <div id="cart-footer" class="panel-footer"></div>
  </div>

  <div id="wishlist-panel" class="side-panel" role="dialog" aria-label="Бажане">
    <div class="panel-header">
      <h3>❤️ Бажане</h3>
      <button class="panel-close" id="close-wishlist" aria-label="Закрити">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" width="20" height="20"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
    <div id="wishlist-body" class="panel-body"></div>
  </div>

  <div id="panel-backdrop" class="side-panel-backdrop"></div>

  <div class="modal fade" id="modalOrganic" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">🌿 Органічне насіння</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body"><p><strong>Органічне насіння</strong> без синтетичних пестицидів та добрив.</p><ul><li>Відсутність ГМО;</li><li>Адаптивність до місцевих умов;</li><li>Екологічна безпека.</li></ul></div>
    </div></div>
  </div>

  <div class="modal fade" id="modalDelivery" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered"><div class="modal-content">
      <div class="modal-header"><h5 class="modal-title">📦 Способи доставки</h5><button type="button" class="btn-close" data-bs-dismiss="modal"></button></div>
      <div class="modal-body text-center">
        <p>Відправляємо щодня:</p>
        <div class="d-flex justify-content-around py-3">
          <div><strong>Нова Пошта</strong><br/><small>1–2 дні</small></div>
          <div><strong>Укрпошта</strong><br/><small>3–5 днів</small></div>
          <div><strong>Meest</strong><br/><small>2–4 дні</small></div>
        </div>
        <p class="text-muted small">Оплата при отриманні.</p>
      </div>
    </div></div>
  </div>

  <div class="modal fade" id="modalAgro" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered"><div class="modal-content">
      <div class="modal-header bg-success text-white"><h5 class="modal-title">🎓 Консультація агронома</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button></div>
      <div class="modal-body p-0">
        <div id="chat-box" style="height:300px;background:#f4f7f6;overflow-y:auto;padding:15px">
          <div class="mb-3"><span class="badge bg-white text-dark shadow-sm p-2">Вітаю! Я ваш віртуальний агроном. Чим можу допомогти?</span></div>
        </div>
        <div class="p-3 border-top">
          <div class="input-group">
            <input type="text" id="chat-input" class="form-control" placeholder="Напишіть повідомлення..." />
            <button id="chat-send" class="btn btn-success">Відправити</button>
          </div>
        </div>
      </div>
    </div></div>
  </div>

  <script src="https://code.jquery.com/jquery-3.7.1.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/gsap.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/MotionPathPlugin.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/gsap@3.12.5/dist/ScrollTrigger.min.js"></script>

  <script src="src/js/seeds-data.js"></script>

  <script src="src/js/i18n.js"></script>
  <script src="src/js/navbar.js"></script>
  <script src="src/js/slider.js"></script>
  <script src="src/js/form.js"></script>
  <script src="src/js/animations.js"></script>
  <script src="src/js/auth.js"></script>
  <script src="src/js/cart.js"></script>
  <script src="src/js/search.js"></script>
  <script src="src/js/catalog.js"></script>

</body>
</html>