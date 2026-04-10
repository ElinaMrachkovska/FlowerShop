/**
 * i18n.js
 * -------
 * Translations dictionary and language-switching logic.
 */

const translations = {
  /* ── Ukrainian ──────────────────────────────────────────────── */
  uk: {
    nav_register: "Реєстрація",
    nav_about:    "Про нас",
    nav_gallery:  "Галерея",
    nav_contacts: "Контакти",
    hero_badge:    "100% натуральне насіння",
    hero_h1_1:     "Розквітніть свій сад",
    hero_h1_2:     "яскравими квітами",
    hero_h1_3:     "цього сезону",
    hero_subtitle: "Понад 200 сортів насіння квітів для вашої присадибної ділянки. Весна, літо, осінь — ваш сад буде в цвіту весь рік.",
    hero_cta:      "Отримати каталог",
    hero_cta2:     "Дізнатись більше",
    stat1_label:   "сортів насіння",
    stat2_label:   "задоволених клієнтів",
    stat3_label:   "схожість насіння",
    reg_title: 'Дивіться та <span class="accent">реєструйтесь</span>',
    reg_sub:   "Перегляньте відео про вирощування квітів і залиште заявку на наш каталог",
    form_title:   "Отримайте каталог",
    form_sub:     "Залиште дані — ми надішлемо безкоштовний каталог насіння",
    form_fname:   "Ім'я *",
    form_lname:   "Прізвище *",
    form_phone:   "Телефон *",
    form_email:   "Email *",
    form_btn:     "🌸 Надіслати заявку",
    ph_fname:     "Олена",
    ph_lname:     "Іваненко",
    ph_phone:     "+380 XX XXX XX XX",
    ph_email:     "email@example.com",
    form_success:      "✅ Дякуємо! Вашу заявку надіслано.",
    form_error:        "❌ Будь ласка, заповніть усі поля правильно.",
    form_server_error: "❌ Помилка сервера. Спробуйте пізніше.",
    about_title: 'Чому обирають <span class="accent">FlowerSeeds</span>?',
    about_p1: "<strong>FlowerSeeds</strong> — сімейна компанія з 15-річним досвідом у насінництві. Ми співпрацюємо лише з перевіреними виробниками, що гарантують <strong>95–98% схожість</strong>.",
    about_p2: "Асортимент охоплює однорічні та багаторічні квіти, ґрунтопокривні, ампельні і балконні культури. Кожна пачка містить <strong>докладну інструкцію</strong> з вирощування.",
    about_p3: "Від першого насіння до пишного цвіту — <strong>безкоштовна консультація</strong> агронома доступна кожному покупцю.",
    pill1: "Органічне насіння",
    pill2: "Доставка по Україні",
    pill3: "Консультація агронома",
    pill4: "Гарантія якості",
    pill5: "200+ сортів",
    gallery_title: 'Наша <span class="accent">галерея</span>',
    gallery_sub:   "Квіти, вирощені з нашого насіння",
    slide1_title: "Тюльпани Кейзерскрон",
    slide1_desc:  "Класичні двоколірні тюльпани — окраса будь-якого саду ранньою весною",
    slide2_title: "Соняшник декоративний",
    slide2_desc:  "Яскраві гіганти — ростуть до 2 метрів і радують ціле літо",
    slide3_title: "Лаванда справжня",
    slide3_desc:  "Ароматний багаторічник — ідеальний для бордюрів та ароматерапії",
    slide4_title: "Мак польовий",
    slide4_desc:  "Легкі та ніжні маки — створять природній луговий куточок у саду",
    slide5_title: "Троянда чайно-гібридна",
    slide5_desc:  "Ніжні троянди — королеви саду, вирощені з перевіреного насіння",
    footer_tagline:  "Насіння квітів для вашої присадибної ділянки",
    footer_desc:     "Ми допомагаємо перетворити кожну ділянку на квітучий рай — з любов'ю до природи.",
    footer_nav:      "Навігація",
    footer_contacts: "Контакти",
    footer_dev:      "Розробник:",
    footer_rights:   "Всі права захищено.",
  },

  /* ── English ─────────────────────────────────────────────────── */
  en: {
    nav_register: "Register",
    nav_about:    "About",
    nav_gallery:  "Gallery",
    nav_contacts: "Contacts",
    hero_badge:    "100% natural seeds",
    hero_h1_1:     "Make your garden",
    hero_h1_2:     "bloom with bright",
    hero_h1_3:     "flowers this season",
    hero_subtitle: "Over 200 flower seed varieties for your home garden. Spring, summer, autumn — your garden will bloom all year long.",
    hero_cta:      "Get catalogue",
    hero_cta2:     "Learn more",
    stat1_label:   "seed varieties",
    stat2_label:   "happy customers",
    stat3_label:   "germination rate",
    reg_title: 'Watch & <span class="accent">Register</span>',
    reg_sub:   "Watch our flower growing video and leave a request for our free catalogue",
    form_title:   "Get Free Catalogue",
    form_sub:     "Leave your details — we'll send you a free seed catalogue",
    form_fname:   "First name *",
    form_lname:   "Last name *",
    form_phone:   "Phone *",
    form_email:   "Email *",
    form_btn:     "🌸 Submit request",
    ph_fname:     "Elena",
    ph_lname:     "Ivanova",
    ph_phone:     "+38 0XX XXX XX XX",
    ph_email:     "email@example.com",
    form_success:      "✅ Thank you! Your request has been sent.",
    form_error:        "❌ Please fill in all fields correctly.",
    form_server_error: "❌ Server error. Please try again later.",
    about_title: 'Why choose <span class="accent">FlowerSeeds</span>?',
    about_p1: "<strong>FlowerSeeds</strong> is a family company with 15 years of experience in seed production. We work only with trusted manufacturers who guarantee <strong>95–98% germination</strong>.",
    about_p2: "Our range covers annuals and perennials, ground cover, trailing and balcony cultures. Each pack includes <strong>detailed growing instructions</strong>.",
    about_p3: "From the first seed to full bloom — a <strong>free agronomist consultation</strong> is available to every buyer.",
    pill1: "Organic seeds",
    pill2: "Delivery across Ukraine",
    pill3: "Agronomist advice",
    pill4: "Quality guarantee",
    pill5: "200+ varieties",
    gallery_title: 'Our <span class="accent">Gallery</span>',
    gallery_sub:   "Flowers grown from our seeds",
    slide1_title: "Keizerskroon Tulips",
    slide1_desc:  "Classic two-color tulips — a gem of any garden in early spring",
    slide2_title: "Decorative Sunflower",
    slide2_desc:  "Bright giants — grow up to 2 metres and cheer through the whole summer",
    slide3_title: "True Lavender",
    slide3_desc:  "Fragrant perennial — perfect for borders and aromatherapy",
    slide4_title: "Field Poppy",
    slide4_desc:  "Light and delicate poppies — create a natural meadow corner in your garden",
    slide5_title: "Hybrid Tea Rose",
    slide5_desc:  "Tender roses — queens of the garden, grown from verified seeds",
    footer_tagline:  "Flower seeds for your home garden",
    footer_desc:     "We help transform every plot into a blooming paradise — with love for nature.",
    footer_nav:      "Navigation",
    footer_contacts: "Contacts",
    footer_dev:      "Developer:",
    footer_rights:   "All rights reserved.",
  },

  /* ── Polish ──────────────────────────────────────────────────── */
  pl: {
    nav_register: "Rejestracja",
    nav_about:    "O nas",
    nav_gallery:  "Galeria",
    nav_contacts: "Kontakt",
    hero_badge:    "100% naturalne nasiona",
    hero_h1_1:     "Rozwiń swój ogród",
    hero_h1_2:     "kolorowymi kwiatami",
    hero_h1_3:     "tego sezonu",
    hero_subtitle: "Ponad 200 odmian nasion kwiatów do Twojego ogrodu. Wiosna, lato, jesień — Twój ogród będzie kwitnąć cały rok.",
    hero_cta:      "Pobierz katalog",
    hero_cta2:     "Dowiedz się więcej",
    stat1_label:   "odmian nasion",
    stat2_label:   "zadowolonych klientów",
    stat3_label:   "kiełkowalność nasion",
    reg_title: 'Oglądaj i <span class="accent">rejestruj się</span>',
    reg_sub:   "Obejrzyj film o uprawie kwiatów i zostaw prośbę o nasz katalog",
    form_title:   "Otrzymaj katalog",
    form_sub:     "Zostaw dane — wyślemy bezpłatny katalog nasion",
    form_fname:   "Imię *",
    form_lname:   "Nazwisko *",
    form_phone:   "Telefon *",
    form_email:   "Email *",
    form_btn:     "🌸 Wyślij zgłoszenie",
    ph_fname:     "Anna",
    ph_lname:     "Kowalska",
    ph_phone:     "+48 XXX XXX XXX",
    ph_email:     "email@example.com",
    form_success:      "✅ Dziękujemy! Zgłoszenie zostało wysłane.",
    form_error:        "❌ Proszę wypełnić wszystkie pola poprawnie.",
    form_server_error: "❌ Błąd serwera. Spróbuj ponownie później.",
    about_title: 'Dlaczego wybierają <span class="accent">FlowerSeeds</span>?',
    about_p1: "<strong>FlowerSeeds</strong> to firma rodzinna z 15-letnim doświadczeniem w nasiennictwie. Współpracujemy wyłącznie z zaufanymi producentami gwarantującymi <strong>95–98% kiełkowalności</strong>.",
    about_p2: "Nasza oferta obejmuje kwiaty jednoletnie i wieloletnie, rośliny okrywowe, zwisające i balkonowe. Każde opakowanie zawiera <strong>szczegółową instrukcję</strong> uprawy.",
    about_p3: "Od pierwszego nasiona do pełnego kwitnienia — <strong>bezpłatna konsultacja</strong> agronoma dostępna dla każdego kupującego.",
    pill1: "Nasiona organiczne",
    pill2: "Dostawa po Ukrainie",
    pill3: "Konsultacja agronoma",
    pill4: "Gwarancja jakości",
    pill5: "200+ odmian",
    gallery_title: 'Nasza <span class="accent">galeria</span>',
    gallery_sub:   "Kwiaty wyhodowane z naszych nasion",
    slide1_title: "Tulipany Keizerskroon",
    slide1_desc:  "Klasyczne dwukolorowe tulipany — ozdoba każdego ogrodu wczesną wiosną",
    slide2_title: "Słonecznik dekoracyjny",
    slide2_desc:  "Jasne giganty — rosną do 2 metrów i cieszą przez całe lato",
    slide3_title: "Lawenda prawdziwa",
    slide3_desc:  "Pachnąca bylina — idealna do obwódek i aromaterapii",
    slide4_title: "Mak polny",
    slide4_desc:  "Lekkie i delikatne maki — stworzą naturalny łąkowy zakątek w ogrodzie",
    slide5_title: "Róża herbaciana",
    slide5_desc:  "Delikatne róże — królowe ogrodu, wyhodowane ze sprawdzonych nasion",
    footer_tagline:  "Nasiona kwiatów do Twojego ogrodu",
    footer_desc:     "Pomagamy przekształcić każdą działkę w kwitnący raj — z miłością do natury.",
    footer_nav:      "Nawigacja",
    footer_contacts: "Kontakt",
    footer_dev:      "Deweloper:",
    footer_rights:   "Wszelkie prawa zastrzeżone.",
  },
};

/**
 * Apply language to the page.
 */
function applyLang(lang) {
  const tArr = translations[lang];
  if (!tArr) {
    console.warn(`[i18n] Unknown language: "${lang}"`);
    return;
  }

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.getAttribute('data-i18n');
    if (tArr[key] !== undefined) {
      el.innerHTML = tArr[key];
    }
  });

  document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
    const key = el.getAttribute('data-i18n-placeholder');
    if (tArr[key] !== undefined) {
      el.placeholder = tArr[key];
    }
  });

  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });

  document.documentElement.setAttribute('data-lang', lang);
}

/**
 * Get a translation string.
 */
function t(key) {
  const lang = document.documentElement.getAttribute('data-lang') || 'uk';
  return (translations[lang] && translations[lang][key]) ?? key;
}

// Initial setup
document.addEventListener('DOMContentLoaded', () => {
  const savedLang = localStorage.getItem('fs_lang') || 'uk';
  applyLang(savedLang);

  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const lang = btn.dataset.lang;
      localStorage.setItem('fs_lang', lang);
      applyLang(lang);
    });
  });
});