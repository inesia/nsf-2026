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
})();
