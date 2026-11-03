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

  /* Filtro de publicações por tipo e ano (client-side) */
  var lista = doc.getElementById('pub-lista');
  if (lista) {
    var btns = doc.querySelectorAll('#pub-filtros .filtro');
    var selAno = doc.getElementById('filtro-ano');
    var tipoAtual = '*';
    var anoAtual = '*';
    // popular o select de anos
    if (selAno) {
      (function () {
        var anos = [];
        lista.querySelectorAll('.pub-ano').forEach(function (el) {
          var a = (el.textContent || '').trim();
          if (a && anos.indexOf(a) === -1) anos.push(a);
        });
        anos.sort().reverse();
        anos.forEach(function (a) {
          var opt = doc.createElement('option');
          opt.value = a;
          opt.textContent = a;
          selAno.appendChild(opt);
        });
      })();
    }
    function aplicarFiltro() {
      var itens = lista.querySelectorAll('.pub');
      itens.forEach(function (li) {
        var tipo = ((li.querySelector('.pub-tipo') || {}).textContent || '').replace(/[^a-z]/gi, '').toLowerCase();
        var ano = ((li.querySelector('.pub-ano') || {}).textContent || '').trim();
        var okTipo = tipoAtual === '*' || tipo.indexOf(tipoAtual) > -1;
        var okAno = anoAtual === '*' || ano === anoAtual;
        li.style.display = (okTipo && okAno) ? '' : 'none';
      });
    }
    btns.forEach(function (b) {
      b.addEventListener('click', function () {
        btns.forEach(function (x) { x.classList.remove('ativo'); });
        b.classList.add('ativo');
        tipoAtual = b.getAttribute('data-tipo') || '*';
        aplicarFiltro();
      });
    });
    if (selAno) {
      selAno.addEventListener('change', function () {
        anoAtual = selAno.value || '*';
        aplicarFiltro();
      });
    }
  }

  /* Botoes de compartilhamento em publicacoes e projetos */
  function addShare(el, url, titulo) {
    if (el.querySelector('.share-row')) return;
    var row = doc.createElement('div');
    row.className = 'share-row';
    var u = encodeURIComponent(url);
    var t = encodeURIComponent(titulo || 'LEMEP');
    row.innerHTML = '<span class="share-rot">Compartilhar:</span>'
      + '<a data-wa="1" href="https://api.whatsapp.com/send?text=' + t + '%20' + u + '" target="_blank" rel="noopener" aria-label="Compartilhar no WhatsApp">WhatsApp</a>'
      + '<a href="https://x.com/intent/post?text=' + t + '&url=' + u + '" target="_blank" rel="noopener" aria-label="Compartilhar no X">X</a>'
      + '<a href="https://www.linkedin.com/sharing/share-offsite/?url=' + u + '" target="_blank" rel="noopener" aria-label="Compartilhar no LinkedIn">LinkedIn</a>'
      + '<button type="button" class="share-copy" aria-label="Copiar link">Copiar link</button>';
    row.querySelector('.share-copy').addEventListener('click', function () {
      if (navigator.clipboard) navigator.clipboard.writeText(url);
      this.textContent = 'Link copiado ✓';
      var b = this;
      setTimeout(function () { b.textContent = 'Copiar link'; }, 1800);
    });
    el.appendChild(row);
  }
  doc.querySelectorAll('#pub-lista .pub').forEach(function (li) {
    var a = li.querySelector('.pub-titulo a[href]');
    var url = a ? a.href : doc.location.href;
    var tit = (li.querySelector('.pub-titulo') || {}).textContent || '';
    addShare(li.querySelector('.pub-dados'), url, tit.trim());
  });
  doc.querySelectorAll('.card').forEach(function (card) {
    var h = card.getAttribute('href');
    var tit = (card.querySelector('h3') || {}).textContent || '';
    if (h) addShare(card, h, 'LEMEP — ' + tit.trim());
  });
})();
