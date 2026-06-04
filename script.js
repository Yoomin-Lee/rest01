// ===== SPARKLE CURSOR TRAIL =====
const sparkleColors = ['#F5C518', '#FCD34D', '#7C3AED', '#A78BFA', '#C4B5FD'];
let lastSparkle = 0;

document.addEventListener('mousemove', (e) => {
  const now = Date.now();
  if (now - lastSparkle < 45) return; // 45ms 쓰로틀
  lastSparkle = now;

  const el = document.createElement('span');
  el.className = 'sparkle';
  const size = Math.random() * 7 + 4;
  el.style.cssText = `
    left:${e.clientX}px;
    top:${e.clientY}px;
    width:${size}px;
    height:${size}px;
    background:${sparkleColors[Math.floor(Math.random() * sparkleColors.length)]};
    box-shadow: 0 0 ${size * 1.5}px ${sparkleColors[0]};
  `;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 650);
});

// ===== DARK MODE TOGGLE =====
const html = document.documentElement;
const themeToggle = document.getElementById('themeToggle');

// 저장된 테마 복원
const savedTheme = localStorage.getItem('theme');
if (savedTheme) html.dataset.theme = savedTheme;

themeToggle.addEventListener('click', () => {
  const isDark = html.dataset.theme === 'dark' ||
    (!html.dataset.theme && window.matchMedia('(prefers-color-scheme: dark)').matches);
  const next = isDark ? 'light' : 'dark';
  html.dataset.theme = next;
  localStorage.setItem('theme', next);
});

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

// ===== HERO EFFECTS =====

// 1) 순차 등장 애니메이션
const heroSequence = [
  document.querySelector('.hero-photo-wrap'),
  document.querySelector('.hero-greeting'),
  document.querySelector('.hero-name'),
  document.querySelector('.hero-tagline'),
  document.querySelector('.hero-cta'),
];
heroSequence.forEach((el, i) => {
  if (!el) return;
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = `opacity 0.65s ease ${i * 0.18}s, transform 0.65s ease ${i * 0.18}s`;
});
window.addEventListener('load', () => {
  requestAnimationFrame(() => {
    heroSequence.forEach(el => {
      if (!el) return;
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
    });
  });

  // 2) 타이핑 효과 (tagline)
  const taglineEl = document.querySelector('.hero-tagline');
  if (taglineEl) {
    const fullText = taglineEl.textContent.trim();
    taglineEl.textContent = '';

    const cursor = document.createElement('span');
    cursor.className = 'typed-cursor';
    taglineEl.appendChild(cursor);

    let idx = 0;
    const typeNext = () => {
      if (idx < fullText.length) {
        taglineEl.insertBefore(document.createTextNode(fullText[idx]), cursor);
        idx++;
        setTimeout(typeNext, 55);
      } else {
        setTimeout(() => cursor.remove(), 1800);
      }
    };
    // 등장 애니메이션(4번째 요소, 0.54s) 끝난 뒤 시작
    setTimeout(typeNext, 900);
  }
});

// ===== SCROLL FADE-IN =====
const styleEl = document.createElement('style');
styleEl.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
document.head.appendChild(styleEl);

const fadeEls = document.querySelectorAll(
  '.skill-bar-item, .timeline-item, .about-grid, .contact-item, .skills-col, .cert-card'
);
const fadeObs = new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); fadeObs.unobserve(e.target); }
  }),
  { threshold: 0.1 }
);
fadeEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  fadeObs.observe(el);
});

// ===== SKILL BAR ANIMATION =====
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillObs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.style.width = e.target.getAttribute('data-width') + '%';
        setTimeout(() => e.target.classList.add('shimmer-once'), 200);
        skillObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.3 }
);
skillBars.forEach(b => skillObs.observe(b));

window.addEventListener('load', () => {
  fadeEls.forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add('visible');
  });
  skillBars.forEach(b => {
    if (b.getBoundingClientRect().top < window.innerHeight) {
      b.style.width = b.getAttribute('data-width') + '%';
    }
  });
});
