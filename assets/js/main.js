// Menu mobile — overlay de tela cheia
(function () {
  var toggle = document.querySelector('.nav-toggle');
  var menu = document.querySelector('.nav-menu');
  if (!toggle || !menu) return;

  // Monta a barra superior do overlay (logo branca à esquerda + X à direita)
  var brandImg = document.querySelector('.brand img');
  var top = document.createElement('div');
  top.className = 'nav-menu-top';
  if (brandImg) {
    var logo = brandImg.cloneNode();
    logo.className = 'nav-menu-logo';
    logo.removeAttribute('width');
    logo.removeAttribute('height');
    top.appendChild(logo);
  } else {
    top.appendChild(document.createElement('span'));
  }
  var close = document.createElement('button');
  close.className = 'nav-close';
  close.setAttribute('aria-label', 'Fechar menu');
  close.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18"/></svg>';
  top.appendChild(close);
  menu.insertBefore(top, menu.firstChild);

  function openMenu() {
    menu.classList.add('open');
    document.body.classList.add('menu-open');
    toggle.setAttribute('aria-expanded', 'true');
  }
  function closeMenu() {
    menu.classList.remove('open');
    document.body.classList.remove('menu-open');
    toggle.setAttribute('aria-expanded', 'false');
  }

  toggle.addEventListener('click', function () {
    menu.classList.contains('open') ? closeMenu() : openMenu();
  });
  close.addEventListener('click', closeMenu);

  // Fecha ao navegar para outra página/âncora
  menu.querySelectorAll('.nav-links a, .nav-cta').forEach(function (a) {
    a.addEventListener('click', closeMenu);
  });

  // Fecha com ESC
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && menu.classList.contains('open')) closeMenu();
  });
})();

// Setas dos carrosséis (vídeos e avaliações, mobile)
(function () {
  var ARROW_L = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 18l-6-6 6-6"/></svg>';
  var ARROW_R = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 6l6 6-6 6"/></svg>';

  document.querySelectorAll('.video-grid, .reviews-grid').forEach(function (grid) {
    var wrap = document.createElement('div');
    wrap.className = 'carousel-wrap';
    grid.parentNode.insertBefore(wrap, grid);
    wrap.appendChild(grid);

    function makeBtn(dir) {
      var b = document.createElement('button');
      b.type = 'button';
      b.className = 'car-btn ' + dir;
      b.setAttribute('aria-label', dir === 'prev' ? 'Anterior' : 'Próximo');
      b.innerHTML = dir === 'prev' ? ARROW_L : ARROW_R;
      wrap.appendChild(b);
      return b;
    }
    var prev = makeBtn('prev');
    var next = makeBtn('next');

    function step() {
      var card = grid.children[0];
      if (!card) return 300;
      var gap = parseFloat(getComputedStyle(grid).gap) || 14;
      return card.getBoundingClientRect().width + gap;
    }
    function update() {
      var max = grid.scrollWidth - grid.clientWidth;
      prev.disabled = grid.scrollLeft <= 4;
      next.disabled = grid.scrollLeft >= max - 4;
      // esconde tudo se não há o que rolar (desktop)
      var hidden = max <= 4;
      prev.style.display = hidden ? 'none' : '';
      next.style.display = hidden ? 'none' : '';
    }
    prev.addEventListener('click', function () { grid.scrollBy({ left: -step(), behavior: 'smooth' }); });
    next.addEventListener('click', function () { grid.scrollBy({ left: step(), behavior: 'smooth' }); });
    grid.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
    setTimeout(update, 400);
  });
})();
