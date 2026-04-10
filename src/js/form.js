document.addEventListener('DOMContentLoaded', () => {

  const submitBtn = document.getElementById('form-submit');
  const msgEl     = document.getElementById('form-message');

  if (!submitBtn) return;

  const fields = {
    first_name: document.getElementById('f-first'),
    last_name:  document.getElementById('f-last'),
    email:      document.getElementById('f-email'),
  };

  function showMessage(text, type) {
    msgEl.innerHTML  = text;
    msgEl.className  = type;
  }

  function clearMessage() {
    msgEl.textContent = '';
    msgEl.className   = '';
  }

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function validate() {
    let valid = true;

    Object.values(fields).forEach((el) => {
      el.style.borderColor = '';
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

  function resetForm() {
    Object.values(fields).forEach((el) => {
      el.value = '';
      el.style.borderColor = '';
    });
  }

  submitBtn.addEventListener('click', () => {
    clearMessage();

    if (!validate()) {
      showMessage(t('form_error'), 'error');
      return;
    }

    submitBtn.disabled    = true;
    submitBtn.textContent = '⏳ …';

    const payload = {
      first_name: fields.first_name.value.trim(),
      last_name:  fields.last_name.value.trim(),
      email:      fields.email.value.trim(),
    };

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
        const userMsg = `
          <div class="chat-msg text-end mb-3">
            <span class="badge bg-success p-2">${message}</span>
          </div>`;
        chatBox.insertAdjacentHTML('beforeend', userMsg);
        
        chatInput.value = "";
        chatBox.scrollTop = chatBox.scrollHeight;

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

    chatInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        chatSend.click();
      }
    });
  }
});