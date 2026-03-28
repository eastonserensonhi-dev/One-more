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
        link.style.color = active ? '#e87722' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// ── PHONE BUTTON: toast on desktop ────────
const PHONE = '(856) 776-3828';

function showToast(msg) {
  const existing = document.getElementById('phone-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'phone-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-visible'));
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

document.querySelectorAll('a[href^="tel:"]').forEach(btn => {
  btn.addEventListener('click', () => {
    if (!navigator.userAgent.match(/Mobi|Android|iPhone|iPad/i)) {
      navigator.clipboard.writeText(PHONE).then(() => {
        showToast(`Copied ${PHONE} to clipboard`);
      }).catch(() => {
        showToast(`Call us: ${PHONE}`);
      });
    }
  });
});
