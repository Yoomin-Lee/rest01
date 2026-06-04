// navbar scroll shadow
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 10);
});

// active nav link highlight
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');
const observer = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        navLinks.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav-links a[href="#${e.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);
sections.forEach(s => observer.observe(s));

// mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links  = document.querySelector('.nav-links');
toggle.addEventListener('click', () => links.classList.toggle('open'));
links.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => links.classList.remove('open'))
);

// fade-in on scroll
const fadeEls = document.querySelectorAll(
  '.skill-group, .timeline-item, .project-card, .about-grid, .contact-item'
);
const fadeObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
  }),
  { threshold: 0.12 }
);
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObs.observe(el);
});
document.addEventListener('DOMContentLoaded', () => {
  // re-check already-visible elements after load
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight) el.classList.add('visible');
  });
});

// apply visible class
document.addEventListener('scroll', () => {}, { passive: true });
Object.defineProperty(HTMLElement.prototype, 'visible', {
  set() {},
  get() { return this.classList.contains('visible'); }
});
// patch: apply transition via class
const styleEl = document.createElement('style');
styleEl.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(styleEl);
