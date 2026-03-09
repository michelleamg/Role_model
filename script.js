// ═══════════════════════════════════
// CAROUSEL (automático cada 4.5s)
// ═══════════════════════════════════
const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.film-card');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let current = 0;
let autoTimer;

// Crear dots
cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => { goTo(i); resetTimer(); });
  dotsContainer.appendChild(dot);
});

function updateDots() {
  document.querySelectorAll('.dot').forEach((d, i) => {
    d.classList.toggle('active', i === current);
  });
}

function goTo(index) {
  current = (index + cards.length) % cards.length;
  track.style.transform = `translateX(-${current * 100}%)`;
  updateDots();
}

function next() { goTo(current + 1); }
function prev() { goTo(current - 1); }

nextBtn.addEventListener('click', () => { next(); resetTimer(); });
prevBtn.addEventListener('click', () => { prev(); resetTimer(); });

function resetTimer() {
  clearInterval(autoTimer);
  autoTimer = setInterval(next, 4500);
}

resetTimer();

// Touch/swipe support for carousel
let touchStartX = 0;
track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
track.addEventListener('touchend', e => {
  const diff = touchStartX - e.changedTouches[0].clientX;
  if (Math.abs(diff) > 50) { diff > 0 ? next() : prev(); resetTimer(); }
});

// ═══════════════════════════════════
// SCROLL REVEAL
// ═══════════════════════════════════
const revealTargets = document.querySelectorAll(
  '.section-title, .section-label, .info-card, .achievement, ' +
  '.connection-card, .pro-block, .team-card, .ach-item, ' +
  '.timeline-item, .reason-item, .general-grid, .film-content'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, (i % 6) * 80); // stagger
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08 });

revealTargets.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(20px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  revealObserver.observe(el);
});

// ═══════════════════════════════════
// ACTIVE NAV HIGHLIGHT
// ═══════════════════════════════════
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${id}`;
        link.style.color = isActive ? '#d4a017' : '';
        link.style.background = isActive ? 'rgba(212,160,23,0.08)' : '';
      });
    }
  });
}, { threshold: 0.35 });

sections.forEach(s => sectionObserver.observe(s));
