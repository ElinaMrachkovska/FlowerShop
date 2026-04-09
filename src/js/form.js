/**
 * form.js
 * -------
 * Handles the registration form:
 *  - Client-side validation
 *  - AJAX submission via jQuery $.ajax to submit.php
 *  - Localised feedback messages via i18n.js t()
 *
 * Depends on: jQuery, i18n.js (t function must be available globally)
 */

document.addEventListener('DOMContentLoaded', () => {

  const submitBtn = document.getElementById('form-submit');
  const msgEl     = document.getElementById('form-message');

  if (!submitBtn) return;  // guard: form not on page

  /* ── Field references ───────────────────────────────────────── */
  const fields = {
    first_name: document.getElementById('f-first'),
    last_name:  document.getElementById('f-last'),
    email:      document.getElementById('f-email'),
  };

  /* ── Helpers ────────────────────────────────────────────────── */

  /**
   * Show a feedback message under the form.
   * @param {string} text    - Message text (may contain HTML)
   * @param {'success'|'error'} type
   */
  function showMessage(text, type) {
    msgEl.innerHTML  = text;
    msgEl.className  = type;
  }

  /** Clear the feedback area */
  function clearMessage() {
    msgEl.textContent = '';
    msgEl.className   = '';
  }

  /**
   * Basic email format check.
   * @param  {string} email
   * @returns {boolean}
   */
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  /**
   * Validate all form fields.
   * Adds/removes a visual error class on each input.
   * @returns {boolean} true if all fields are valid
   */
  function validate() {
    let valid = true;

    Object.values(fields).forEach((el) => {
      el.style.borderColor = '';  // reset
    });

    const highlight = (el) => {
      el.style.borderColor = '#e53935';
      valid = false;
    };

    if (!fields.first_name.value.trim()) highlight(fields.first_name);
    if (!fields.last_name.value.trim())  highlight(fields.last_name);

    if (!fields.email.value.trim() || !isValidEmail(fields.email.value.trim())) {
      highlight(fields.email);
    }

    return valid;
  }

  /** Reset all form fields to empty */
  function resetForm() {
    Object.values(fields).forEach((el) => {
      el.value = '';
      el.style.borderColor = '';
    });
  }

  /* ── Submit handler ─────────────────────────────────────────── */
  submitBtn.addEventListener('click', () => {
    clearMessage();

    /* Validate */
    if (!validate()) {
      showMessage(t('form_error'), 'error');
      return;
    }

    /* Disable button and show loading state */
    submitBtn.disabled    = true;
    submitBtn.textContent = '⏳ …';

    /* Collect data */
    const payload = {
      first_name: fields.first_name.value.trim(),
      last_name:  fields.last_name.value.trim(),
      email:      fields.email.value.trim(),
    };

    /* AJAX request */
    $.ajax({
      url:      'php/submit.php',
      method:   'POST',
      data:     payload,

      success(response) {
        showMessage(t('form_success'), 'success');
        resetForm();
      },

      error(xhr) {
        const msg = xhr.responseJSON?.message ?? t('form_server_error');
        showMessage(msg, 'error');
      },

      complete() {
        submitBtn.disabled    = false;
        submitBtn.textContent = t('form_btn');
      },
    });
  });

});
document.addEventListener('DOMContentLoaded', function() {
  const chatInput = document.getElementById('chat-input');
  const chatSend = document.getElementById('chat-send');
  const chatBox = document.getElementById('chat-box');

  if (chatSend) {
    chatSend.addEventListener('click', function() {
      const message = chatInput.value.trim();
      
      if (message !== "") {
        // 1. Додаємо повідомлення користувача
        const userMsg = `
          <div class="chat-msg text-end mb-3">
            <span class="badge bg-success p-2">${message}</span>
          </div>`;
        chatBox.insertAdjacentHTML('beforeend', userMsg);
        
        // Очищуємо поле вводу
        chatInput.value = "";
        
        // Прокручуємо вниз
        chatBox.scrollTop = chatBox.scrollHeight;

        // 2. Імітуємо відповідь бота через 1 секунду
        setTimeout(() => {
          const botMsg = `
            <div class="chat-msg mb-3">
              <span class="badge bg-white text-dark shadow-sm p-2">Дякуємо за запитання! Наш агроном відповість вам найближчим часом.</span>
            </div>`;
          chatBox.insertAdjacentHTML('beforeend', botMsg);
          chatBox.scrollTop = chatBox.scrollHeight;
        }, 1000);
      }
    });

    // Дозволяємо відправку по натисканню Enter
    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        chatSend.click();
      }
    });
  }
});
