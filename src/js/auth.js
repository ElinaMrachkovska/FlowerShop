/**
 * auth.js
 * -------
 * User registration, login, logout and session management.
 *
 * Storage: localStorage
 *   'fs_users'   → JSON array of { email, password (hashed), name, lastName }
 *   'fs_session' → JSON { email, name, lastName }  (null when logged out)
 *
 * NOTE: Password hashing here uses a simple djb2 approach purely for
 * demo purposes. In production always use a server-side solution.
 */

/* ── Simple hash (demo only) ────────────────────────────────── */
function hashPassword(str) {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) + hash) ^ str.charCodeAt(i);
  }
  return (hash >>> 0).toString(16);
}

/* ── Storage helpers ─────────────────────────────────────────── */
function getUsers() {
  return JSON.parse(localStorage.getItem('fs_users') || '[]');
}
function saveUsers(users) {
  localStorage.setItem('fs_users', JSON.stringify(users));
}

function getSession() {
  return JSON.parse(localStorage.getItem('fs_session') || 'null');
}
function saveSession(user) {
  localStorage.setItem('fs_session', JSON.stringify(user));
}
function clearSession() {
  localStorage.removeItem('fs_session');
}

/* ── Auth API ────────────────────────────────────────────────── */

/**
 * Register a new user.
 * @returns {{ ok: boolean, message: string }}
 */
function registerUser({ name, lastName, email, password }) {
  const users = getUsers();
  if (users.find(u => u.email.toLowerCase() === email.toLowerCase())) {
    return { ok: false, message: '❌ Користувач з таким email вже існує.' };
  }
  users.push({ name, lastName, email: email.toLowerCase(), password: hashPassword(password) });
  saveUsers(users);
  // Auto-login after registration
  saveSession({ email: email.toLowerCase(), name, lastName });
  return { ok: true, message: `✅ Реєстрацію завершено! Ласкаво просимо, ${name}!` };
}

/**
 * Login an existing user.
 * @returns {{ ok: boolean, message: string }}
 */
function loginUser({ email, password }) {
  const users = getUsers();
  const user  = users.find(u => u.email === email.toLowerCase());
  if (!user) {
    return { ok: false, message: '❌ Користувача з таким email не знайдено.' };
  }
  if (user.password !== hashPassword(password)) {
    return { ok: false, message: '❌ Невірний пароль.' };
  }
  saveSession({ email: user.email, name: user.name, lastName: user.lastName });
  return { ok: true, message: `✅ Вітаємо, ${user.name}!` };
}

/**
 * Logout current user (clears session).
 */
function logoutUser() {
  clearSession();
}

/* ── UI sync ─────────────────────────────────────────────────── */

/**
 * Sync the utility bar to reflect current auth state.
 * Shows/hides greeting + logout, or the user icon.
 */
function syncAuthUI() {
  const session = getSession();

  const iconEl      = document.getElementById('user-icon-btn');
  const greetingEl  = document.getElementById('user-greeting');
  const greetNameEl = document.getElementById('greeting-name');
  const avatarEl    = document.getElementById('user-avatar');

  if (session) {
    // Show greeting
    if (greetingEl)  { greetingEl.classList.add('visible'); }
    if (iconEl)      { iconEl.style.display = 'none'; }
    if (greetNameEl) { greetNameEl.textContent = session.name; }
    if (avatarEl)    { avatarEl.textContent = session.name.charAt(0).toUpperCase(); }
  } else {
    // Show icon
    if (greetingEl) { greetingEl.classList.remove('visible'); }
    if (iconEl)     { iconEl.style.display = ''; }
  }
}

/* ── DOM wiring ──────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── Tab switcher (Login ↔ Register) ─────────────────────── */
  document.querySelectorAll('.auth-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.auth-tab-btn').forEach(b => b.classList.remove('active'));
      document.querySelectorAll('.auth-panel').forEach(p => p.classList.remove('active'));
      btn.classList.add('active');
      const target = btn.dataset.tab;
      document.getElementById(target)?.classList.add('active');
    });
  });

  /* ── Register form ───────────────────────────────────────── */
  const regBtn = document.getElementById('btn-register');
  if (regBtn) {
    regBtn.addEventListener('click', () => {
      const name     = document.getElementById('reg-name').value.trim();
      const lastName = document.getElementById('reg-lastname').value.trim();
      const email    = document.getElementById('reg-email').value.trim();
      const pass     = document.getElementById('reg-pass').value;
      const pass2    = document.getElementById('reg-pass2').value;
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
          const modal = bootstrap.Modal.getInstance(document.getElementById('modalAuth'));
          modal?.hide();
        }, 1500);
      }
    });
  }

  /* ── Login form ──────────────────────────────────────────── */
  const loginBtn = document.getElementById('btn-login');
  if (loginBtn) {
    loginBtn.addEventListener('click', () => {
      const email = document.getElementById('login-email').value.trim();
      const pass  = document.getElementById('login-pass').value;
      const msgEl = document.getElementById('login-message');

      if (!email || !pass) {
        showAuthMsg(msgEl, '❌ Введіть email та пароль.', 'error'); return;
      }

      const result = loginUser({ email, password: pass });
      showAuthMsg(msgEl, result.message, result.ok ? 'success' : 'error');

      if (result.ok) {
        syncAuthUI();
        setTimeout(() => {
          const modal = bootstrap.Modal.getInstance(document.getElementById('modalAuth'));
          modal?.hide();
        }, 1000);
      }
    });
  }

  /* ── Allow Enter key to submit forms ─────────────────────── */
  ['reg-pass2', 'login-pass'].forEach(id => {
    document.getElementById(id)?.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        document.getElementById(id === 'reg-pass2' ? 'btn-register' : 'btn-login')?.click();
      }
    });
  });

  /* ── Logout button ───────────────────────────────────────── */
  const logoutBtn = document.getElementById('btn-logout');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
      logoutUser();
      syncAuthUI();
    });
  }

  /* ── Open auth modal via user icon in header ─────────────── */
  const userIconBtn = document.getElementById('user-icon-btn');
  if (userIconBtn) {
    userIconBtn.addEventListener('click', () => {
      const modal = new bootstrap.Modal(document.getElementById('modalAuth'));
      modal.show();
    });
  }

  /* ── Initial UI sync ─────────────────────────────────────── */
  syncAuthUI();
});

/* ── Helper ──────────────────────────────────────────────────── */
function showAuthMsg(el, text, type) {
  if (!el) return;
  el.textContent = text;
  el.className   = `auth-message ${type}`;
}
