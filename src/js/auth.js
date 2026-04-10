function hashPassword(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

function getUsers()        { return JSON.parse(localStorage.getItem('fs_users')   || '[]');   }
function saveUsers(u)      { localStorage.setItem('fs_users',   JSON.stringify(u)); }
function getSession()      { return JSON.parse(localStorage.getItem('fs_session') || 'null'); }
function saveSession(s)    { localStorage.setItem('fs_session', JSON.stringify(s)); }
function clearSession()    { localStorage.removeItem('fs_session'); }

function registerUser({ name, lastName, email, password }) {
  const users = getUsers();
  const normalized = email.toLowerCase().trim();

  if (users.find(u => u.email === normalized)) {
    return { ok: false, message: '❌ Користувач із таким email вже існує.' };
  }
  users.push({ name: name.trim(), lastName: lastName.trim(),
               email: normalized, password: hashPassword(password) });
  saveUsers(users);
  saveSession({ email: normalized, name: name.trim(), lastName: lastName.trim() });
  return { ok: true, message: `✅ Вітаємо, ${name.trim()}! Реєстрацію завершено.` };
}

function loginUser({ email, password }) {
  const users = getUsers();
  const normalized = email.toLowerCase().trim();
  const user = users.find(u => u.email === normalized);

  if (!user)                                   return { ok: false, message: '❌ Email не знайдено.' };
  if (user.password !== hashPassword(password)) return { ok: false, message: '❌ Невірний пароль.' };

  saveSession({ email: user.email, name: user.name, lastName: user.lastName });
  return { ok: true, message: `✅ Вітаємо, ${user.name}!` };
}

function logoutUser() {
  clearSession();
}

function syncAuthUI() {
  const session     = getSession();
  const iconEl      = document.getElementById('user-icon-btn');
  const greetingEl  = document.getElementById('user-greeting');
  const greetNameEl = document.getElementById('greeting-name');
  const avatarEl    = document.getElementById('user-avatar');

  if (!iconEl && !greetingEl) return;

  if (session) {
    if (iconEl)      iconEl.style.display    = 'none';
    if (greetingEl)  greetingEl.style.display = 'inline-flex';
    if (greetNameEl) greetNameEl.textContent  = session.name;
    if (avatarEl)    avatarEl.textContent      = session.name.charAt(0).toUpperCase();
  } else {
    if (iconEl)     iconEl.style.display    = '';
    if (greetingEl) greetingEl.style.display = 'none';
  }
}

function showAuthMsg(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className   = 'auth-message ' + type;
}

function clearAuthForms() {
  ['login-email','login-pass','reg-name','reg-lastname',
   'reg-email','reg-pass','reg-pass2'].forEach(id => {
    const el = document.getElementById(id);
    if (el) el.value = '';
  });
  ['login-message','reg-message'].forEach(id => {
    const el = document.getElementById(id);
    if (el) { el.textContent = ''; el.className = 'auth-message'; }
  });
}

document.addEventListener('DOMContentLoaded', () => {

  syncAuthUI();

  document.addEventListener('click', (e) => {
    if (e.target.closest('#user-icon-btn')) {
      clearAuthForms();
      switchAuthTab('auth-login');
      const modalEl = document.getElementById('modalAuth');
      if (modalEl) new bootstrap.Modal(modalEl).show();
    }
  });

  document.addEventListener('click', (e) => {
    if (e.target.closest('#btn-logout')) {
      logoutUser();
      syncAuthUI();
    }
  });

  document.addEventListener('click', (e) => {
    const tabBtn = e.target.closest('.auth-tab-btn');
    if (!tabBtn) return;
    const target = tabBtn.dataset.tab;
    if (target) switchAuthTab(target);
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#btn-login')) return;

    const email  = (document.getElementById('login-email')?.value || '').trim();
    const pass   = (document.getElementById('login-pass')?.value  || '');
    const msgEl  = document.getElementById('login-message');

    if (!email || !pass) {
      showAuthMsg(msgEl, '❌ Введіть email і пароль.', 'error'); return;
    }

    const result = loginUser({ email, password: pass });
    showAuthMsg(msgEl, result.message, result.ok ? 'success' : 'error');

    if (result.ok) {
      syncAuthUI();
      setTimeout(() => {
        const modalEl = document.getElementById('modalAuth');
        const modal   = modalEl ? bootstrap.Modal.getInstance(modalEl) : null;
        if (modal) modal.hide();
        clearAuthForms();
      }, 1000);
    }
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('#btn-register')) return;

    const name     = (document.getElementById('reg-name')?.value     || '').trim();
    const lastName = (document.getElementById('reg-lastname')?.value  || '').trim();
    const email    = (document.getElementById('reg-email')?.value     || '').trim();
    const pass     = (document.getElementById('reg-pass')?.value      || '');
    const pass2    = (document.getElementById('reg-pass2')?.value     || '');
    const msgEl    = document.getElementById('reg-message');

    if (!name || !lastName || !email || !pass || !pass2) {
      showAuthMsg(msgEl, '❌ Заповніть усі поля.', 'error'); return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showAuthMsg(msgEl, '❌ Введіть коректний email.', 'error'); return;
    }
    if (pass.length < 6) {
      showAuthMsg(msgEl, '❌ Пароль — мінімум 6 символів.', 'error'); return;
    }
    if (pass !== pass2) {
      showAuthMsg(msgEl, '❌ Паролі не збігаються.', 'error'); return;
    }

    const result = registerUser({ name, lastName, email, password: pass });
    showAuthMsg(msgEl, result.message, result.ok ? 'success' : 'error');

    if (result.ok) {
      syncAuthUI();
      setTimeout(() => {
        const modalEl = document.getElementById('modalAuth');
        const modal   = modalEl ? bootstrap.Modal.getInstance(modalEl) : null;
        if (modal) modal.hide();
        clearAuthForms();
      }, 1500);
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter') return;
    if (e.target.id === 'login-pass')  document.getElementById('btn-login')?.click();
    if (e.target.id === 'reg-pass2')   document.getElementById('btn-register')?.click();
  });

});

function switchAuthTab(targetId) {
  document.querySelectorAll('.auth-tab-btn').forEach(b => {
    b.classList.toggle('active', b.dataset.tab === targetId);
  });
  document.querySelectorAll('.auth-panel').forEach(p => {
    p.classList.toggle('active', p.id === targetId);
  });
}