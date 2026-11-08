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

  const track = document.getElementById('hero-track');
  if (!track) return;

  const slides = [...track.children];
  const dotsWrap = document.getElementById('hero-dots');
  let index = 0;
  let timer;

  const go = (i) => {
    index = (i + slides.length) % slides.length;
    track.style.transform = `translateX(-${index * 100}%)`;
    slides.forEach((slide, n) => {
      slide.setAttribute('aria-hidden', n === index ? 'false' : 'true');
    });
    if (dotsWrap) {
      [...dotsWrap.children].forEach((dot, n) => {
        dot.setAttribute('aria-current', n === index ? 'true' : 'false');
      });
    }
  };

  const restart = () => {
    clearInterval(timer);
    timer = setInterval(() => go(index + 1), 6500);
  };

  slides.forEach((_, n) => {
    const dot = document.createElement('button');
    dot.type = 'button';
    dot.setAttribute('aria-label', `Banner ${n + 1}`);
    dot.addEventListener('click', () => {
      go(n);
      restart();
    });
    dotsWrap?.appendChild(dot);
  });

  document.getElementById('hero-next')?.addEventListener('click', () => {
    go(index + 1);
    restart();
  });
  document.getElementById('hero-prev')?.addEventListener('click', () => {
    go(index - 1);
    restart();
  });

  go(0);
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) restart();
})();
