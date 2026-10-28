/* LEMEP — interações: tema, menu, pendências, ano */
(function () {
  'use strict';

  var doc = document;

  /* ---- tema claro/escuro (spec §6.2: prefers-color-scheme + data-theme) ---- */
  var btnTema = doc.getElementById('btn-tema');
  function aplicarTemaSalvo() {
    try {
      var t = localStorage.getItem('lemep-tema');
      if (t === 'dark' || t === 'light') doc.documentElement.dataset.theme = t;
    } catch (e) { /* file:// sem storage: segue o esquema do sistema */ }
  }
  aplicarTemaSalvo();
  if (btnTema) {
    btnTema.addEventListener('click', function () {
      var raiz = doc.documentElement;
      var escuroSistema = window.matchMedia('(prefers-color-scheme: dark)').matches;
      var escuroAtual = raiz.dataset.theme
        ? raiz.dataset.theme === 'dark'
        : escuroSistema;
      var novo = escuroAtual ? 'light' : 'dark';
      raiz.dataset.theme = novo;
      try { localStorage.setItem('lemep-tema', novo); } catch (e) {}
    });
  }

  /* ---- menu mobile (≤1000px, spec §7.1/§11) ---- */
  var nav = doc.querySelector('.nav');
  var btnMenu = doc.getElementById('btn-menu');
  if (btnMenu && nav) {
    btnMenu.addEventListener('click', function () {
      var aberto = nav.classList.toggle('aberto');
      btnMenu.setAttribute('aria-expanded', aberto ? 'true' : 'false');
      btnMenu.setAttribute('aria-label', aberto ? 'Fechar menu de navegação' : 'Abrir menu de navegação');
    });
  }

  /* ---- link ativo da navegação ---- */
  var pagina = (location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '');
  doc.querySelectorAll('.nav-links a[data-nav]').forEach(function (a) {
    if (a.dataset.nav === pagina) a.setAttribute('aria-current', 'page');
  });

  /* ---- contador de pendências desta página (painel + blocos .pending) ---- */
  var blocos = doc.querySelectorAll('.pending');
  var badge = doc.getElementById('badge-pend-pagina');
  if (badge) badge.textContent = ' · ' + blocos.length + ' nesta página';

  /* ---- ano do rodapé ---- */
  var ano = doc.querySelector('.ano');
  if (ano) ano.textContent = new Date().getFullYear();
})();