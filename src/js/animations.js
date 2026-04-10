gsap.registerPlugin(MotionPathPlugin, ScrollTrigger);

const PETAL_CONFIG = [
  { id: '#p1', path: '#path1', duration: 14, delay: 0   },
  { id: '#p2', path: '#path2', duration: 18, delay: 1.5 },
  { id: '#p3', path: '#path3', duration: 16, delay: 3   },
  { id: '#p4', path: '#path1', duration: 20, delay: 4.5 },
  { id: '#p5', path: '#path2', duration: 15, delay: 6   },
  { id: '#p6', path: '#path3', duration: 17, delay: 7.5 },
];

PETAL_CONFIG.forEach(({ id, path, duration, delay }) => {
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

  gsap.to(id, {
    duration: duration * 0.15,
    delay,
    repeat:   -1,
    yoyo:     true,
    opacity:  0,
    ease:     'power1.inOut',
  });
});

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
    });
  },
});