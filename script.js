const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('[data-menu-toggle]');
const nav = document.querySelector('[data-nav]');
const year = document.querySelector('[data-year]');
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

year.textContent = new Date().getFullYear();

const closeMenu = () => {
  menuToggle.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
  document.body.classList.remove('menu-open');
};

const setHeaderState = () => header.classList.toggle('is-scrolled', window.scrollY > 28);
setHeaderState();
window.addEventListener('scroll', setHeaderState, { passive: true });

menuToggle.addEventListener('click', () => {
  const open = menuToggle.getAttribute('aria-expanded') !== 'true';
  menuToggle.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  document.body.classList.toggle('menu-open', open);
});

nav.addEventListener('click', (event) => {
  if (event.target.closest('a')) closeMenu();
});

document.querySelectorAll('[data-product-link]').forEach((card) => {
  const destination = card.getAttribute('data-product-link');
  const navigate = () => {
    const opened = window.open(destination, '_blank');
    if (opened) opened.opener = null;
    else window.open(destination, '_top');
  };

  card.addEventListener('click', (event) => {
    if (event.target.closest('a')) return;
    navigate();
  });

  card.addEventListener('keydown', (event) => {
    if (event.key !== 'Enter' && event.key !== ' ') return;
    event.preventDefault();
    navigate();
  });
});

window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') closeMenu();
});

document.querySelectorAll('[data-accordion] .sense-card').forEach((card) => {
  const button = card.querySelector('button');
  const icon = button.querySelector('i');

  button.addEventListener('click', () => {
    const willOpen = !card.classList.contains('is-open');

    document.querySelectorAll('[data-accordion] .sense-card').forEach((item) => {
      item.classList.remove('is-open');
      item.querySelector('button').setAttribute('aria-expanded', 'false');
      item.querySelector('button i').textContent = '+';
    });

    if (willOpen) {
      card.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      icon.textContent = '−';
    }
  });
});

const revealTargets = document.querySelectorAll('[data-reveal]');

if ('IntersectionObserver' in window && !reduceMotion) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });

  revealTargets.forEach((target) => revealObserver.observe(target));
} else {
  revealTargets.forEach((target) => target.classList.add('is-visible'));
}

const dispatchEvents = [
  ['MallOS performance workspace', 'Real estate · active'],
  ['CommercialOS pipeline connected', 'Growth · tracking'],
  ['QuoteOS approval cycle shipped', 'Revenue · live'],
  ['GTM execution sprint started', 'Strategy · moving']
];

const dispatch = document.querySelector('.dispatch-event');
const dispatchTitle = document.querySelector('[data-dispatch-title]');
const dispatchMeta = document.querySelector('[data-dispatch-meta]');

if (!reduceMotion && dispatch) {
  let dispatchIndex = 0;
  window.setInterval(() => {
    dispatch.classList.add('is-changing');
    window.setTimeout(() => {
      dispatchIndex = (dispatchIndex + 1) % dispatchEvents.length;
      [dispatchTitle.textContent, dispatchMeta.textContent] = dispatchEvents[dispatchIndex];
      dispatch.classList.remove('is-changing');
    }, 260);
  }, 3600);
}

const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const cursorGlow = document.querySelector('[data-cursor-glow]');

if (finePointer.matches && !reduceMotion && cursorGlow) {
  let pointerX = -500;
  let pointerY = -500;
  let glowX = pointerX;
  let glowY = pointerY;

  window.addEventListener('pointermove', (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
  }, { passive: true });

  const animateGlow = () => {
    glowX += (pointerX - glowX) * 0.12;
    glowY += (pointerY - glowY) * 0.12;
    cursorGlow.style.transform = `translate3d(${glowX}px, ${glowY}px, 0)`;
    window.requestAnimationFrame(animateGlow);
  };

  animateGlow();
}

if (finePointer.matches && !reduceMotion) {
  document.querySelectorAll('[data-tilt]').forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--ry', `${x * 4}deg`);
      card.style.setProperty('--rx', `${y * -4}deg`);
      card.style.setProperty('--spot-x', `${(x + 0.5) * 100}%`);
      card.style.setProperty('--spot-y', `${(y + 0.5) * 100}%`);
    });

    card.addEventListener('pointerleave', () => {
      card.style.setProperty('--ry', '0deg');
      card.style.setProperty('--rx', '0deg');
      card.style.removeProperty('--spot-x');
      card.style.removeProperty('--spot-y');
    });
  });
}

const scrollDriftTargets = document.querySelectorAll('.section-number');

if (!reduceMotion && scrollDriftTargets.length) {
  let driftFramePending = false;

  const updateScrollDrift = () => {
    const viewportHeight = window.innerHeight;

    scrollDriftTargets.forEach((target) => {
      const section = target.parentElement;
      const rect = section.getBoundingClientRect();
      const progress = Math.max(-1, Math.min(1, (viewportHeight - rect.top) / (viewportHeight + rect.height) - 0.5));
      target.style.setProperty('--scroll-drift', `${progress * 72}px`);
    });

    driftFramePending = false;
  };

  const requestScrollDrift = () => {
    if (driftFramePending) return;
    driftFramePending = true;
    window.requestAnimationFrame(updateScrollDrift);
  };

  updateScrollDrift();
  window.addEventListener('scroll', requestScrollDrift, { passive: true });
  window.addEventListener('resize', requestScrollDrift, { passive: true });
}

// Cinematic manifesto: light the render once it enters view
const cinematic = document.querySelector('.manifesto--cinematic');
if (cinematic) {
  if (reduceMotion || !('IntersectionObserver' in window)) cinematic.classList.add('is-lit');
  else {
    const litObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { cinematic.classList.add('is-lit'); litObserver.disconnect(); }
      });
    }, { threshold: 0.25 });
    litObserver.observe(cinematic);
  }
}
