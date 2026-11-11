(() => {
  /* Inject Lucide-style SVG sprite once */
  fetch('assets/icons.svg')
    .then((r) => r.text())
    .then((svg) => {
      const wrap = document.createElement('div');
      wrap.id = 'icon-sprite';
      wrap.hidden = true;
      wrap.innerHTML = svg;
      document.body.prepend(wrap);
    })
    .catch(() => {});

  const toggle = document.getElementById('menu-toggle');
  const panel = document.getElementById('mobile-panel');
  if (toggle && panel) {
    const setOpen = (open) => {
      panel.classList.toggle('open', open);
      panel.hidden = !open;
      toggle.setAttribute('aria-expanded', String(open));
    };
    toggle.addEventListener('click', () => setOpen(panel.hidden));
    panel.querySelectorAll('a, button').forEach((el) => {
      el.addEventListener('click', () => setOpen(false));
    });
  }

  /* Home hero image slider — left/right slide */
  const hero = document.getElementById('hero-slider');
  if (hero) {
    const slides = [...hero.querySelectorAll('[data-hero-slide]')];
    const prevBtn = hero.querySelector('[data-hero-prev]');
    const nextBtn = hero.querySelector('[data-hero-next]');
    const dotsWrap = hero.querySelector('[data-hero-dots]');
    const track = hero.querySelector('[data-hero-track]');
    const viewport = hero.querySelector('[data-hero-viewport]');
    let index = 0;
    let timer = null;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const renderDots = () => {
      if (!dotsWrap) return;
      dotsWrap.innerHTML = slides.map((_, i) => `
        <button type="button" class="hero-dot${i === index ? ' is-active' : ''}" role="tab" aria-selected="${i === index}" aria-label="Slide ${i + 1}" data-hero-dot="${i}"></button>
      `).join('');
    };

    const goTo = (next) => {
      if (!slides.length) return;
      index = (next + slides.length) % slides.length;
      if (track) track.style.transform = `translate3d(-${index * 100}%, 0, 0)`;
      slides.forEach((slide, i) => {
        const on = i === index;
        slide.classList.toggle('is-active', on);
        slide.setAttribute('aria-hidden', String(!on));
      });
      renderDots();
    };

    const stop = () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
    };

    const start = () => {
      if (reduceMotion || slides.length < 2) return;
      stop();
      timer = setInterval(() => goTo(index + 1), 6000);
    };

    prevBtn?.addEventListener('click', () => {
      goTo(index - 1);
      start();
    });
    nextBtn?.addEventListener('click', () => {
      goTo(index + 1);
      start();
    });
    dotsWrap?.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-hero-dot]');
      if (!btn) return;
      goTo(Number(btn.dataset.heroDot));
      start();
    });

    let touchX = 0;
    let touchY = 0;
    let swiping = false;
    const swipeTarget = viewport || track;
    swipeTarget?.addEventListener('touchstart', (e) => {
      const t = e.changedTouches[0];
      touchX = t.clientX;
      touchY = t.clientY;
      swiping = true;
      stop();
    }, { passive: true });
    swipeTarget?.addEventListener('touchend', (e) => {
      if (!swiping) return;
      swiping = false;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchX;
      const dy = t.clientY - touchY;
      if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy)) {
        start();
        return;
      }
      goTo(dx < 0 ? index + 1 : index - 1);
      start();
    }, { passive: true });

    viewport?.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        goTo(index - 1);
        start();
      }
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        goTo(index + 1);
        start();
      }
    });

    hero.addEventListener('mouseenter', stop);
    hero.addEventListener('mouseleave', start);

    goTo(0);
    start();
  }

  /* Gallery lightbox + swipe */
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const imgEl = lightbox.querySelector('[data-lightbox-img]');
    const countEl = lightbox.querySelector('[data-lightbox-count]');
    const galleries = [...document.querySelectorAll('[data-lightbox-gallery]')];
    let items = [];
    let index = 0;
    let lastFocus = null;

    const sync = () => {
      const item = items[index];
      if (!item || !imgEl) return;
      imgEl.src = item.src;
      imgEl.alt = item.alt || '';
      if (countEl) countEl.textContent = `${index + 1} / ${items.length}`;
    };

    const openAt = (list, start) => {
      items = list;
      index = start;
      lastFocus = document.activeElement;
      lightbox.hidden = false;
      document.body.style.overflow = 'hidden';
      sync();
      lightbox.querySelector('[data-lightbox-close]')?.focus();
    };

    const close = () => {
      lightbox.hidden = true;
      document.body.style.overflow = '';
      if (imgEl) imgEl.removeAttribute('src');
      lastFocus?.focus?.();
    };

    const step = (dir) => {
      if (!items.length) return;
      index = (index + dir + items.length) % items.length;
      sync();
    };

    galleries.forEach((gallery) => {
      const buttons = [...gallery.querySelectorAll('[data-lightbox-src]')];
      buttons.forEach((btn, i) => {
        btn.addEventListener('click', () => {
          const list = buttons.map((b) => ({
            src: b.getAttribute('data-lightbox-src'),
            alt: b.querySelector('img')?.alt || '',
          }));
          openAt(list, i);
        });
      });
    });

    lightbox.querySelectorAll('[data-lightbox-close]').forEach((el) => {
      el.addEventListener('click', close);
    });
    lightbox.querySelector('[data-lightbox-prev]')?.addEventListener('click', () => step(-1));
    lightbox.querySelector('[data-lightbox-next]')?.addEventListener('click', () => step(1));

    document.addEventListener('keydown', (e) => {
      if (lightbox.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });

    let touchX = 0;
    let touchY = 0;
    lightbox.addEventListener('touchstart', (e) => {
      const t = e.changedTouches[0];
      touchX = t.clientX;
      touchY = t.clientY;
    }, { passive: true });
    lightbox.addEventListener('touchend', (e) => {
      if (lightbox.hidden) return;
      const t = e.changedTouches[0];
      const dx = t.clientX - touchX;
      const dy = t.clientY - touchY;
      if (Math.abs(dx) < 42 || Math.abs(dx) < Math.abs(dy)) return;
      step(dx < 0 ? 1 : -1);
    }, { passive: true });
  }
})();
