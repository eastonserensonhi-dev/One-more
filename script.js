// ── NAVBAR: scroll shadow ──────────────────
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── MOBILE NAV TOGGLE ─────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ── SCROLL-IN ANIMATIONS ──────────────────
const aosObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      aosObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

document.querySelectorAll('[data-aos]').forEach((el, i) => {
  el.style.transitionDelay = `${(i % 3) * 80}ms`;
  aosObserver.observe(el);
});

// ── ACTIVE NAV LINK ON SCROLL ─────────────
const sections = document.querySelectorAll('section[id]');
const links    = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      links.forEach(link => {
        const active = link.getAttribute('href') === `#${entry.target.id}`;
        link.style.color = active ? 'var(--orange)' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
