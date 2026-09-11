// ===== Year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Nav scroll state + active link =====
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

const navLinks = document.querySelectorAll('.nav-links a');
const sections = document.querySelectorAll('section[id], header[id]');
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(l => l.classList.remove('active'));
      const active = document.querySelector(`.nav-links a[data-section="${entry.target.id}"]`);
      if (active) active.classList.add('active');
    }
  });
}, { rootMargin: '-45% 0px -45% 0px' });
sections.forEach(s => sectionObserver.observe(s));

// ===== Mobile nav toggle =====
const navToggle = document.getElementById('nav-toggle');
const navLinksEl = document.getElementById('nav-links');
navToggle.addEventListener('click', () => {
  const open = navLinksEl.style.display === 'flex';
  navLinksEl.style.display = open ? 'none' : 'flex';
  navLinksEl.style.flexDirection = 'column';
  navLinksEl.style.position = 'absolute';
  navLinksEl.style.top = '64px';
  navLinksEl.style.right = '28px';
  navLinksEl.style.background = 'rgba(8,12,18,0.97)';
  navLinksEl.style.border = '1px solid var(--border)';
  navLinksEl.style.borderRadius = '14px';
  navLinksEl.style.padding = '18px 22px';
  navLinksEl.style.gap = '16px';
});
navLinksEl.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
  if (window.innerWidth <= 720) navLinksEl.style.display = 'none';
}));

// ===== Reveal on scroll =====
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));

// ===== Typing effect =====
const roles = [
  'Senior Cloud Engineer',
  'AWS · Kubernetes · Terraform',
  'Multi-Cloud & Hybrid Infrastructure',
  'Cloud Cost Optimization @ Scale',
  'GenAI-Augmented Cloud Ops'
];
const typedEl = document.getElementById('typed');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function typeLoop() {
  let roleIdx = 0, charIdx = 0, deleting = false;
  function tick() {
    const word = roles[roleIdx];
    if (!deleting) {
      charIdx++;
      typedEl.textContent = word.slice(0, charIdx);
      if (charIdx === word.length) { deleting = true; setTimeout(tick, 1600); return; }
      setTimeout(tick, 55);
    } else {
      charIdx--;
      typedEl.textContent = word.slice(0, charIdx);
      if (charIdx === 0) { deleting = false; roleIdx = (roleIdx + 1) % roles.length; setTimeout(tick, 300); return; }
      setTimeout(tick, 28);
    }
  }
  tick();
}
if (reduceMotion) {
  typedEl.textContent = roles[0];
} else {
  typeLoop();
}

// ===== Tabs (shared logic for job + skill tabs) =====
function setupTabs(barId, dataAttr, panelPrefix) {
  const bar = document.getElementById(barId);
  if (!bar) return;
  bar.querySelectorAll('.tabbtn').forEach(btn => {
    btn.addEventListener('click', () => {
      bar.querySelectorAll('.tabbtn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const key = btn.getAttribute(dataAttr);
      const parent = bar.parentElement;
      parent.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
      const target = document.getElementById(`${panelPrefix}${key}`);
      if (target) target.classList.add('active');
    });
  });
}
setupTabs('job-tabs', 'data-job', 'panel-');
setupTabs('skill-tabs', 'data-skill', 'skill-');

// ===== Accordion =====
document.querySelectorAll('.acc-item').forEach(item => {
  const q = item.querySelector('.acc-q');
  const a = item.querySelector('.acc-a');
  function sync() {
    if (item.classList.contains('open')) {
      a.style.maxHeight = a.scrollHeight + 'px';
    } else {
      a.style.maxHeight = '0px';
    }
  }
  sync();
  q.addEventListener('click', () => {
    const willOpen = !item.classList.contains('open');
    item.classList.toggle('open', willOpen);
    sync();
  });
  window.addEventListener('resize', () => { if (item.classList.contains('open')) sync(); });
});

// ===== Count-up stats =====
const counters = document.querySelectorAll('.count');
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCount(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });
counters.forEach(c => counterObserver.observe(c));

function animateCount(el) {
  const target = parseFloat(el.getAttribute('data-target'));
  const prefix = el.getAttribute('data-prefix') || '';
  const suffix = el.getAttribute('data-suffix') || '';
  if (reduceMotion) { el.textContent = prefix + target + suffix; return; }
  const duration = 1400;
  const start = performance.now();
  function frame(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    const val = Math.round(target * eased);
    el.textContent = prefix + val + suffix;
    if (progress < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

// ===== Hero canvas: cloud/network particle field =====
(function () {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w, h, particles;
  const COUNT = window.innerWidth < 720 ? 26 : 48;

  function resize() {
    w = canvas.width = canvas.offsetWidth;
    h = canvas.height = canvas.offsetHeight;
  }

  function init() {
    resize();
    particles = Array.from({ length: COUNT }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25,
      r: Math.random() * 1.6 + 0.6
    }));
  }

  function step() {
    ctx.clearRect(0, 0, w, h);
    for (const p of particles) {
      p.x += p.vx; p.y += p.vy;
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const a = particles[i], b = particles[j];
        const dx = a.x - b.x, dy = a.y - b.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          ctx.strokeStyle = `rgba(129,140,248,${(1 - dist / 140) * 0.18})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.stroke();
        }
      }
    }
    for (const p of particles) {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(34,211,238,0.55)';
      ctx.fill();
    }
    if (!reduceMotion) requestAnimationFrame(step);
  }

  window.addEventListener('resize', () => { resize(); });
  init();
  step();
})();
