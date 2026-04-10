/**
 * slider.js
 * ---------
 * Image slider / carousel for the #gallery section.
 */

document.addEventListener('DOMContentLoaded', () => {

  const track  = document.getElementById('slider-track');
  const slides = document.querySelectorAll('.slide');
  const dots   = document.querySelectorAll('.dot');

  if (!track || slides.length === 0) return;

  let currentIndex = 0;
  let autoplayTimer = null;

  /* ── Core: move to slide by index ──────────────────────────── */
  function goTo(index) {
    // Handle wrap around
    currentIndex = ((index % slides.length) + slides.length) % slides.length;

    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update dot states
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  /* ── Auto-play ──────────────────────────────────────────────── */
  function startAutoplay() {
    stopAutoplay(); // Clear existing to prevent double timers
    autoplayTimer = setInterval(() => goTo(currentIndex + 1), 5000);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function resetAutoplay() {
    stopAutoplay();
    startAutoplay();
  }

  /* ── Button events ──────────────────────────────────────────── */
  const prevBtn = document.getElementById('slide-prev');
  const nextBtn = document.getElementById('slide-next');

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      goTo(currentIndex - 1);
      resetAutoplay();
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      goTo(currentIndex + 1);
      resetAutoplay();
    });
  }

  /* ── Dot events ─────────────────────────────────────────────── */
  dots.forEach((dot) => {
    dot.addEventListener('click', () => {
      const targetIndex = parseInt(dot.dataset.index, 10);
      if (!isNaN(targetIndex)) {
        goTo(targetIndex);
        resetAutoplay();
      }
    });
  });

  /* ── Touch / swipe support ──────────────────────────────────── */
  let touchStartX = 0;

  track.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].clientX;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const delta = e.changedTouches[0].clientX - touchStartX;
    if (Math.abs(delta) > 50) {
      delta < 0 ? goTo(currentIndex + 1) : goTo(currentIndex - 1);
      resetAutoplay();
    }
  }, { passive: true });

  /* ── Pause autoplay when tab is hidden ──────────────────────── */
  document.addEventListener('visibilitychange', () => {
    document.hidden ? stopAutoplay() : startAutoplay();
  });

  /* ── Init ───────────────────────────────────────────────────── */
  goTo(0);
  startAutoplay();

});