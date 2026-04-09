/**
 * animations.js
 * -------------
 * All GSAP-powered animations for the landing page:
 *
 *  1. Floating petals along MotionPath curves (decorative SVG overlay)
 *  2. Hero illustration continuous gentle float
 *  3. Scroll-triggered fade-in for .reveal elements
 *
 * Depends on:
 *  - GSAP core          (gsap.min.js)
 *  - MotionPathPlugin   (MotionPathPlugin.min.js)
 *  - ScrollTrigger      (ScrollTrigger.min.js)
 *
 * All three CDN scripts must be loaded before this file.
 */

/* ── Register GSAP plugins ──────────────────────────────────────── */
gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);


/* ── 1. Floating petals ─────────────────────────────────────────── */

/**
 * Configuration for each animated petal.
 * @type {Array<{ id: string, path: string, duration: number, delay: number }>}
 */
const PETAL_CONFIG = [
  { id: '#p1', path: '#path1', duration: 14, delay: 0   },
  { id: '#p2', path: '#path2', duration: 18, delay: 1.5 },
  { id: '#p3', path: '#path3', duration: 16, delay: 3   },
  { id: '#p4', path: '#path1', duration: 20, delay: 4.5 },
  { id: '#p5', path: '#path2', duration: 15, delay: 6   },
  { id: '#p6', path: '#path3', duration: 17, delay: 7.5 },
];

PETAL_CONFIG.forEach(({ id, path, duration, delay }) => {
  /* Move along SVG motion path */
  gsap.to(id, {
    duration,
    delay,
    repeat:     -1,
    ease:       'none',
    motionPath: {
      path,
      align:       path,
      autoRotate:  true,
      alignOrigin: [0.5, 0.5],
    },
  });

  /* Gentle opacity pulse (yoyo fade in/out) */
  gsap.to(id, {
    duration: duration * 0.15,
    delay,
    repeat:   -1,
    yoyo:     true,
    opacity:  0,
    ease:     'power1.inOut',
  });
});


/* ── 2. Hero illustration — gentle float ────────────────────────── */



/* ── 3. Scroll-triggered reveal for .reveal elements ────────────── */

/**
 * Uses IntersectionObserver for lightweight, CSS-transition-driven
 * fade-in. GSAP ScrollTrigger is reserved for more complex sequences.
 */
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));


/* ── 4. Hero stats — staggered count-up animation ───────────────── */
ScrollTrigger.create({
  trigger: '#hero',
  start:   'top 80%',
  once:    true,
  onEnter() {
    gsap.from('.hero-stat-number', {
      textContent: 0,
      duration:    1.5,
      ease:        'power1.out',
      stagger:     0.2,
      snap:        { textContent: 1 },
      /* Note: works for pure-number elements; elements with '+' or '%'
         are handled via CSS; this targets the numeric part visually. */
    });
  },
});
