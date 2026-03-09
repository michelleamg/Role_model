// ===== CAROUSEL =====
const track = document.getElementById('carouselTrack');
const cards = document.querySelectorAll('.film-card');
const dotsContainer = document.getElementById('carouselDots');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let current = 0;
let autoTimer;

// Build dots
cards.forEach((_, i) => {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  if (i === 0) dot.classList.add('active');
  dot.addEventListener('click', () => goTo(i));
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

// ===== SCROLL REVEAL =====
const revealEls = document.querySelectorAll('.section-title, .section-label, .info-card, .achievement, .connection-card, .pro-block, .team-card, .ach-item, .timeline-item, .reason-item');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navLinks.forEach(link => {
        link.style.color = link.getAttribute('href') === `#${id}` ? '#c8a96e' : '';
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));
