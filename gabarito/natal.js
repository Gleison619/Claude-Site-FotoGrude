/* Desenhos de Natal do Gabarito FotoGrude (arte original, feita em SVG).
   MOLDURAS = molduras para os ímãs (coordenadas 0–100 = frente visível do ímã).
   CARTOES  = cartões de 10 x 14 cm (coordenadas em mm, 100 x 140).
   Cada modelo tem: fundo (SVG embaixo da foto), frente (SVG por cima), janela (onde vai a foto)
   e textos (desenhados à parte para usar as fontes do site também na imagem 300 dpi). */
var NATAL = (function () {
  'use strict';
  var LEAF = 'M0,0 C1.5,-2.2 2.2,-2.6 3,-1.4 C3.6,-3 4.6,-3.2 5.2,-1.6 C6,-3.2 7,-3 7.4,-1.4 C8.4,-2.4 9.4,-1.6 10,0 C9.4,1.6 8.4,2.4 7.4,1.4 C7,3 6,3.2 5.2,1.6 C4.6,3.2 3.6,3 3,1.4 C2.2,2.6 1.5,2.2 0,0Z';
  function n(v) { return Math.round(v * 100) / 100; }

  function folha(x, y, ang, s, cor) {
    return '<g transform="translate(' + n(x) + ' ' + n(y) + ') rotate(' + n(ang) + ') scale(' + n(s) + ')">' +
      '<path d="' + LEAF + '" fill="' + (cor || '#1E6B3A') + '"/>' +
      '<path d="M0.6 0 L9.2 0" stroke="#4FA36A" stroke-width=".35" fill="none"/></g>';
  }
  function baga(x, y, r) {
    return '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r) + '" fill="#C8102E"/>' +
      '<circle cx="' + n(x - r * .35) + '" cy="' + n(y - r * .35) + '" r="' + n(r * .32) + '" fill="#fff" opacity=".55"/>';
  }
  function azevinho(x, y, ang, s) {
    return folha(x, y, ang - 32, s) + folha(x, y, ang + 32, s, '#17573A') + folha(x, y, ang + 180, s * .85) +
      baga(x - 1.1 * s, y - .6 * s, 1.25 * s) + baga(x + 1.2 * s, y - .4 * s, 1.25 * s) + baga(x, y + 1 * s, 1.25 * s);
  }
  function bola(x, y, r, cor, fio) {
    var s = '';
    if (fio) s += '<path d="M' + n(x) + ' ' + n(y - r) + ' L' + n(x) + ' ' + n(y - r - fio) + '" stroke="#C9A24A" stroke-width="' + n(r * .1) + '"/>';
    s += '<rect x="' + n(x - r * .3) + '" y="' + n(y - r * 1.2) + '" width="' + n(r * .6) + '" height="' + n(r * .38) + '" rx="' + n(r * .08) + '" fill="#D4A63A"/>';
    s += '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(r) + '" fill="' + cor + '"/>';
    s += '<path d="M' + n(x - r) + ' ' + n(y + r * .1) + ' Q' + n(x) + ' ' + n(y + r * .45) + ' ' + n(x + r) + ' ' + n(y + r * .1) + '" stroke="#F3D98B" stroke-width="' + n(r * .12) + '" fill="none" opacity=".8"/>';
    s += '<ellipse cx="' + n(x - r * .38) + '" cy="' + n(y - r * .38) + '" rx="' + n(r * .28) + '" ry="' + n(r * .17) + '" transform="rotate(-35 ' + n(x - r * .38) + ' ' + n(y - r * .38) + ')" fill="#fff" opacity=".5"/>';
    return s;
  }
  function estrela(x, y, r, cor, ang) {
    var p = [], a0 = (ang || -90) * Math.PI / 180;
    for (var i = 0; i < 10; i++) {
      var rr = i % 2 ? r * .45 : r, a = a0 + i * Math.PI / 5;
      p.push(n(x + Math.cos(a) * rr) + ',' + n(y + Math.sin(a) * rr));
    }
    return '<polygon points="' + p.join(' ') + '" fill="' + cor + '"/>';
  }
  function brilho(x, y, r, cor) {
    return '<path d="M' + n(x) + ' ' + n(y - r) + ' Q' + n(x + r * .18) + ' ' + n(y - r * .18) + ' ' + n(x + r) + ' ' + n(y) +
      ' Q' + n(x + r * .18) + ' ' + n(y + r * .18) + ' ' + n(x) + ' ' + n(y + r) + ' Q' + n(x - r * .18) + ' ' + n(y + r * .18) + ' ' + n(x - r) + ' ' + n(y) +
      ' Q' + n(x - r * .18) + ' ' + n(y - r * .18) + ' ' + n(x) + ' ' + n(y - r) + 'Z" fill="' + cor + '"/>';
  }
  function floco(x, y, r, cor, sw) {
    var s = '<g stroke="' + cor + '" stroke-width="' + n(sw || r * .14) + '" stroke-linecap="round" fill="none">';
    for (var i = 0; i < 3; i++) {
      var a = i * Math.PI / 3, dx = Math.cos(a) * r, dy = Math.sin(a) * r;
      s += '<path d="M' + n(x - dx) + ' ' + n(y - dy) + ' L' + n(x + dx) + ' ' + n(y + dy) + '"/>';
      [1, -1].forEach(function (k) {
        var ex = x + dx * k * .62, ey = y + dy * k * .62, b = r * .3;
        var a1 = a + (k > 0 ? 0 : Math.PI);
        s += '<path d="M' + n(ex + Math.cos(a1 + 2.4) * b) + ' ' + n(ey + Math.sin(a1 + 2.4) * b) + ' L' + n(ex) + ' ' + n(ey) +
          ' L' + n(ex + Math.cos(a1 - 2.4) * b) + ' ' + n(ey + Math.sin(a1 - 2.4) * b) + '"/>';
      });
    }
    return s + '</g>';
  }
  function laco(x, y, s, cor, escuro) {
    cor = cor || '#C8102E';
    var esc = escuro || '#8E0B21';
    return '<g transform="translate(' + n(x) + ' ' + n(y) + ') scale(' + n(s) + ')">' +
      '<path d="M-1,1 L-6,12 L-3.6,10.6 L-2.6,13 L1,2Z" fill="' + esc + '"/>' +
      '<path d="M1,1 L6,12 L3.6,10.6 L2.6,13 L-1,2Z" fill="' + cor + '"/>' +
      '<path d="M0,0 C-5,-7 -12,-4 -11,0.5 C-10,5 -4,3 0,0Z" fill="' + cor + '"/>' +
      '<path d="M0,0 C5,-7 12,-4 11,0.5 C10,5 4,3 0,0Z" fill="' + cor + '"/>' +
      '<path d="M-1,-.4 C-4,-4 -8.5,-3 -9,0" stroke="' + esc + '" stroke-width=".6" fill="none"/>' +
      '<path d="M1,-.4 C4,-4 8.5,-3 9,0" stroke="' + esc + '" stroke-width=".6" fill="none"/>' +
      '<ellipse cx="0" cy=".3" rx="2.2" ry="2" fill="' + esc + '"/><ellipse cx="-.4" cy="-.1" rx="1.2" ry=".9" fill="' + cor + '"/></g>';
  }
  function galho(x, y, ang, len, s, cor) {
    cor = cor || '#1F5E3B';
    var r = '<g transform="translate(' + n(x) + ' ' + n(y) + ') rotate(' + n(ang) + ')" stroke="' + cor + '" stroke-width="' + n(.5 * s) + '" stroke-linecap="round" fill="none">';
    r += '<path d="M0 0 L' + n(len) + ' 0" stroke="#4A3A22" stroke-width="' + n(.45 * s) + '"/>';
    for (var d = 1; d < len; d += 1.1 * s) {
      var l = 2.6 * s * (1 - d / len * .45);
      r += '<path d="M' + n(d) + ' 0 L' + n(d + l * .75) + ' ' + n(-l * .65) + '"/>';
      r += '<path d="M' + n(d) + ' 0 L' + n(d + l * .75) + ' ' + n(l * .65) + '"/>';
    }
    return r + '</g>';
  }
  function pinha(x, y, ang, s) {
    var g = '<g transform="translate(' + n(x) + ' ' + n(y) + ') rotate(' + n(ang) + ') scale(' + n(s) + ')">' +
      '<ellipse cx="0" cy="0" rx="2.4" ry="3.6" fill="#8B5A2B"/>';
    for (var i = -2; i <= 2; i++) g += '<path d="M-2.2 ' + n(i * 1.3) + ' Q0 ' + n(i * 1.3 + 1.1) + ' 2.2 ' + n(i * 1.3) + '" stroke="#5E3A17" stroke-width=".35" fill="none"/>';
    return g + '<path d="M0 -3.6 L0 -4.6" stroke="#5E3A17" stroke-width=".5"/></g>';
  }
  // cacho de canto: galhos ao longo das bordas + pinha + bolas + azevinho
  function canto(x, y, sx, sy, s, comBola) {
    var a = sx > 0 ? 0 : 180, b = sy > 0 ? 90 : -90, o = '';
    o += galho(x, y, a + sx * sy * 8, 26 * s, s) + galho(x, y, b - sx * sy * 8, 26 * s, s);
    o += galho(x, y, (a + b) / 2 + (sx < 0 && sy < 0 ? 180 : 0) * 0, 16 * s, s, '#2C7A4B');
    o += pinha(x + sx * 9 * s, y + sy * 4 * s, sx * sy * 30, .9 * s) + pinha(x + sx * 4 * s, y + sy * 10 * s, -sx * sy * 20, .8 * s);
    if (comBola) o += bola(x + sx * 15 * s, y + sy * 7 * s, 2.6 * s, '#C8102E') + bola(x + sx * 7 * s, y + sy * 15 * s, 2.2 * s, '#D4A63A');
    o += azevinho(x + sx * 5 * s, y + sy * 5 * s, 45, .95 * s);
    return o;
  }
  function listra(x, y, w, h, t) {
    // borda de bengala doce (listras vermelhas sobre branco)
    var id = 'bengala' + Math.round(t * 10);
    return '<defs><pattern id="' + id + '" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">' +
      '<rect width="4" height="4" fill="#fff"/><rect width="2" height="4" fill="#D21F3C"/></pattern></defs>' +
      '<path fill-rule="evenodd" fill="url(#' + id + ')" d="M' + x + ' ' + y + 'h' + w + 'v' + h + 'h-' + w + 'Z M' + (x + t) + ' ' + (y + t) + 'v' + (h - 2 * t) + 'h' + (w - 2 * t) + 'v-' + (h - 2 * t) + 'Z"/>';
  }
  function bg(cor) { return '<rect x="-60" y="-60" width="260" height="300" fill="' + cor + '"/>'; }
  var POS_ESTRELAS = [[5, 6], [94, 5], [4, 50], [96, 46], [6, 80], [95, 82], [30, 4], [70, 4], [50, 3], [18, 96], [82, 97]];

  var MOLDURAS = {
    nenhuma: { nome: 'Sem moldura (foto inteira)' },
    classica: {
      nome: 'Natal clássico (verde e dourado)',
      janela: { x: 9, y: 8, w: 82, h: 67, r: 4 },
      fundo: bg('#12372A') + POS_ESTRELAS.map(function (p, i) { return i % 3 ? brilho(p[0], p[1], 2.2, '#E9C46A') : estrela(p[0], p[1], 2, '#E9C46A'); }).join('') +
        '<rect x="2.5" y="2.5" width="95" height="95" rx="5" fill="none" stroke="#E9C46A" stroke-width=".5" stroke-dasharray="1.2 1.2"/>',
      frente: '<rect x="9" y="8" width="82" height="67" rx="4" fill="none" stroke="#fff" stroke-width="1"/>' + azevinho(11, 10, 45, .85) + azevinho(89, 73, 225, .75),
      textos: [{ campo: 'texto', x: 50, y: 92, size: 16, font: 'script', fill: '#E9C46A' }]
    },
    vermelha: {
      nome: 'Natal vermelho com neve',
      janela: { x: 8, y: 8, w: 84, h: 68, r: 5 },
      fundo: bg('#B3122E') + [[5, 5, 3], [95, 8, 2.4], [4, 40, 2], [96, 60, 2.6], [8, 95, 2.4], [93, 93, 3], [28, 97, 1.6], [72, 96, 1.8]].map(function (p) { return floco(p[0], p[1], p[2], '#fff'); }).join(''),
      frente: '<rect x="8" y="8" width="84" height="68" rx="5" fill="none" stroke="#fff" stroke-width="1.4"/>' + bola(88, 12, 3.2, '#E9C46A', 4),
      textos: [{ campo: 'texto', x: 50, y: 93, size: 16, font: 'script', fill: '#fff' }]
    },
    lateral: {
      nome: 'Foto ao lado e texto (bengala doce)',
      janela: { x: 8, y: 8, w: 52, h: 84, r: 3 },
      fundo: bg('#FFF8EE') + listra(0, 0, 100, 100, 3.2) + estrela(90, 12, 2, '#E0A72E') + brilho(72, 15, 1.8, '#E0A72E') + estrela(89, 91, 1.6, '#E0A72E'),
      frente: '<rect x="8" y="8" width="52" height="84" rx="3" fill="none" stroke="#D21F3C" stroke-width=".9"/>' + azevinho(79, 80, 0, 1) + bola(79, 66, 2.8, '#C8102E'),
      textos: [
        { campo: 'texto', linha: 0, x: 78, y: 38, size: 12.5, font: 'script', fill: '#C8102E', rot: -8 },
        { campo: 'texto', linha: 1, x: 79, y: 52, size: 12.5, font: 'script', fill: '#C8102E', rot: -8 }
      ]
    },
    polaroid: {
      nome: 'Polaroid de Natal (fundo branco)',
      janela: { x: 7, y: 7, w: 86, h: 70, r: 2 },
      fundo: bg('#FFFFFF'),
      frente: azevinho(10, 88, 20, .7) + azevinho(90, 88, 160, .7),
      textos: [{ campo: 'texto', x: 50, y: 92, size: 12.5, font: 'script', fill: '#B3122E' }]
    }
  };

  // ---------- Cartões (100 x 140 mm) ----------
  function cantosCartao(s, bolas) {
    return canto(3, 3, 1, 1, s, bolas) + canto(97, 3, -1, 1, s, bolas) + canto(3, 137, 1, -1, s, bolas) + canto(97, 137, -1, -1, s, bolas);
  }
  var CARTOES = {
    guirlanda: {
      nome: 'Guirlanda (creme, verde e vermelho)',
      fundo: '<rect width="100" height="140" fill="#FFF9F0"/>' +
        '<rect x="5" y="5" width="90" height="130" rx="2" fill="none" stroke="#D4A63A" stroke-width=".5"/>' +
        '<rect x="6.5" y="6.5" width="87" height="127" rx="1.5" fill="none" stroke="#D4A63A" stroke-width=".25"/>' +
        cantosCartao(.95, true) + laco(50, 7, .95) +
        brilho(18, 44, 1.6, '#D4A63A') + brilho(82, 44, 1.6, '#D4A63A') + estrela(14, 98, 1.4, '#D4A63A') + estrela(86, 98, 1.4, '#D4A63A'),
      textos: [
        { campo: 'titulo', x: 50, y: 33, size: 15, font: 'script', fill: '#B3122E' },
        { campo: 'frase1', x: 50, y: 41.5, size: 3.9, font: 'serif', italic: true, fill: '#4A3A2A' },
        { campo: 'frase2', x: 50, y: 114, size: 4, font: 'serif', italic: true, fill: '#4A3A2A', max: 40 },
        { campo: 'assinatura', x: 50, y: 127, size: 6.5, font: 'script', fill: '#1E6B3A' }
      ],
      vaga: { cor: '#D4A63A', fundo: '#FFFFFF' }
    },
    dourado: {
      nome: 'Vermelho e dourado',
      fundo: '<rect width="100" height="140" fill="#8E0E22"/>' +
        '<rect x="4" y="4" width="92" height="132" rx="2" fill="none" stroke="#E9C46A" stroke-width=".8"/>' +
        '<rect x="6" y="6" width="88" height="128" rx="1.5" fill="none" stroke="#E9C46A" stroke-width=".3"/>' +
        [[14, 14], [86, 12], [12, 60], [88, 72], [16, 120], [84, 124], [32, 10], [66, 10]].map(function (p, i) { return i % 2 ? estrela(p[0], p[1], 1.7, '#E9C46A') : brilho(p[0], p[1], 2, '#F3D98B'); }).join('') +
        bola(22, 22, 3.6, '#E9C46A', 12) + bola(76, 20, 3, '#C8102E', 9) + bola(86, 22, 2.4, '#E9C46A', 10) +
        azevinho(50, 126, 0, 1.1),
      textos: [
        { campo: 'titulo', x: 50, y: 37, size: 15, font: 'script', fill: '#F3D98B' },
        { campo: 'frase1', x: 50, y: 45, size: 3.9, font: 'serif', italic: true, fill: '#FCEBD0' },
        { campo: 'frase2', x: 50, y: 113, size: 4, font: 'serif', italic: true, fill: '#FCEBD0', max: 40 },
        { campo: 'assinatura', x: 50, y: 121.5, size: 6, font: 'script', fill: '#F3D98B' }
      ],
      vaga: { cor: '#E9C46A', fundo: 'rgba(255,255,255,.08)' }
    },
    neve: {
      nome: 'Noite de neve (azul)',
      fundo: '<rect width="100" height="140" fill="#14284A"/>' +
        [[10, 12, 2.4], [66, 6, 1.4], [24, 22, 1.4], [76, 26, 1.8], [8, 52, 2], [92, 58, 2.4], [12, 92, 1.6], [90, 96, 2], [50, 8, 1.6], [36, 12, 1.2], [64, 15, 1.2]].map(function (p) { return floco(p[0], p[1], p[2], '#DCE8FF'); }).join('') +
        estrela(84, 18, 0, '#fff') +
        '<circle cx="80" cy="14" r="5.5" fill="#FFF6D8"/><circle cx="82.6" cy="12.6" r="5" fill="#14284A"/>' +
        '<path d="M-2 127 Q22 118 50 125 Q78 133 102 121 L102 142 L-2 142Z" fill="#EAF2FF"/>' +
        '<path d="M-2 132 Q30 126 60 133 Q84 138 102 130 L102 142 L-2 142Z" fill="#FFFFFF"/>' +
        [[12, 125, 6], [21, 127, 4.2], [88, 123, 6.5], [79, 127, 4.5]].map(function (t) { return '<path d="M' + t[0] + ' ' + (t[1] - t[2] * 1.6) + ' L' + (t[0] + t[2] * .6) + ' ' + t[1] + ' L' + (t[0] - t[2] * .6) + ' ' + t[1] + 'Z" fill="#1F6B45"/><rect x="' + (t[0] - .6) + '" y="' + t[1] + '" width="1.2" height="1.6" fill="#5B3A1E"/>'; }).join(''),
      textos: [
        { campo: 'titulo', x: 50, y: 36, size: 15, font: 'script', fill: '#FFFFFF' },
        { campo: 'frase1', x: 50, y: 44, size: 3.9, font: 'serif', italic: true, fill: '#DCE8FF' },
        { campo: 'frase2', x: 50, y: 111, size: 4, font: 'serif', italic: true, fill: '#DCE8FF', max: 40 },
        { campo: 'assinatura', x: 50, y: 136, size: 6, font: 'script', fill: '#14284A' }
      ],
      vaga: { cor: '#FFFFFF', fundo: 'rgba(255,255,255,.08)' }
    }
  };

  // ---------- Brindes: ímãs com arte pronta (sem foto), 0–100 = frente do ímã ----------
  var CREME = '#F6E7C8', OURO = '#E9C46A';
  var anoNovo = (function () { var d = new Date(); return d.getFullYear() + (d.getMonth() >= 6 ? 1 : 0); })();
  function sino(x, y, ang, s) {
    return '<g transform="translate(' + x + ' ' + y + ') rotate(' + ang + ') scale(' + s + ')">' +
      '<path d="M0,-13 Q-10,-13 -11,3 L-14,10 L14,10 L11,3 Q10,-13 0,-13Z" fill="#E0A72E"/>' +
      '<path d="M-6,-8 Q-8,0 -9,6" stroke="#F8DE8E" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
      '<rect x="-14.5" y="8.5" width="29" height="3" rx="1.5" fill="#B8851F"/>' +
      '<circle cx="0" cy="13.5" r="3" fill="#B8851F"/></g>';
  }
  function fogos(x, y, r, cor) {
    var s = '<g stroke="' + cor + '" stroke-width="1" stroke-linecap="round">';
    for (var i = 0; i < 12; i++) {
      var a = i * Math.PI / 6;
      s += '<path d="M' + n(x + Math.cos(a) * r * .35) + ' ' + n(y + Math.sin(a) * r * .35) + ' L' + n(x + Math.cos(a) * r) + ' ' + n(y + Math.sin(a) * r) + '"/>';
    }
    return s + '</g>' + '<circle cx="' + x + '" cy="' + y + '" r="' + n(r * .12) + '" fill="' + cor + '"/>';
  }
  function pontosNeve(cor, seed) {
    var s = '', v = seed || 7;
    for (var i = 0; i < 26; i++) {
      v = (v * 9301 + 49297) % 233280;
      var x = -6 + (v / 233280) * 112; v = (v * 9301 + 49297) % 233280;
      var y = -6 + (v / 233280) * 112; v = (v * 9301 + 49297) % 233280;
      s += '<circle cx="' + n(x) + '" cy="' + n(y) + '" r="' + n(.6 + (v / 233280) * 1.1) + '" fill="' + cor + '" opacity=".85"/>';
    }
    return s;
  }

  var ESTAMPAS = {
    natalVermelho: {
      nome: 'Feliz Natal (vermelho)',
      arte: bg('#7E0F16') + '<circle cx="50" cy="50" r="55" fill="#9B1720" opacity=".55"/>' +
        galho(-6, 2, 12, 30, 1.1) + galho(2, -6, 78, 26, 1.1) + galho(-4, -2, 45, 24, 1.1, '#2C7A4B') + galho(-6, 14, 2, 20, 1) +
        azevinho(9, 9, 45, 1.15) + baga(20, 6, 1.6) + baga(6, 20, 1.6) +
        galho(106, 98, 192, 30, 1.1) + galho(98, 106, 258, 26, 1.1) + galho(104, 102, 225, 24, 1.1, '#2C7A4B') + galho(106, 86, 182, 20, 1) +
        azevinho(91, 91, 225, 1.15) + baga(80, 94, 1.6) + baga(94, 80, 1.6) +
        estrela(84, 14, 2.4, OURO) + estrela(15, 84, 2, OURO) + brilho(76, 24, 1.8, OURO) + brilho(24, 76, 1.8, OURO) + estrela(10, 46, 1.4, OURO),
      textos: [{ fixo: 'Feliz', x: 50, y: 47, size: 25, font: 'script', fill: CREME }, { fixo: 'Natal', x: 52, y: 73, size: 25, font: 'script', fill: CREME }]
    },
    natalVerde: {
      nome: 'Feliz Natal (verde e dourado)',
      arte: bg('#123D2C') + '<rect x="5" y="5" width="90" height="90" rx="6" fill="none" stroke="' + OURO + '" stroke-width=".9"/>' +
        '<rect x="7.5" y="7.5" width="85" height="85" rx="4.5" fill="none" stroke="' + OURO + '" stroke-width=".35"/>' +
        laco(50, 12, .85) + estrela(18, 26, 1.8, OURO) + estrela(82, 26, 1.8, OURO) + brilho(16, 80, 2, OURO) + brilho(84, 80, 2, OURO) +
        azevinho(50, 86, 0, .8),
      textos: [{ fixo: 'Feliz', x: 50, y: 50, size: 22, font: 'script', fill: OURO }, { fixo: 'Natal', x: 51, y: 72, size: 22, font: 'script', fill: OURO }]
    },
    papaiNoel: {
      nome: 'Papai Noel',
      arte: bg('#1F6B45') + pontosNeve('#fff', 11) +
        // barba e rosto
        '<path d="M28,50 Q25,82 50,88 Q75,82 72,50 Q62,60 50,60 Q38,60 28,50Z" fill="#fff"/>' +
        '<circle cx="50" cy="50" r="15" fill="#F6CBA8"/>' +
        '<path d="M28,50 Q25,82 50,88 Q75,82 72,50 Q66,66 50,67 Q34,66 28,50Z" fill="#fff"/>' +
        '<circle cx="42" cy="55" r="3.2" fill="#F29C9C" opacity=".7"/><circle cx="58" cy="55" r="3.2" fill="#F29C9C" opacity=".7"/>' +
        '<ellipse cx="44" cy="49" rx="1.5" ry="1.9" fill="#2B1B14"/><ellipse cx="56" cy="49" rx="1.5" ry="1.9" fill="#2B1B14"/>' +
        '<path d="M41,45 Q44,43.5 47,45" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M53,45 Q56,43.5 59,45" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/>' +
        '<ellipse cx="44.5" cy="61" rx="6.5" ry="3.3" fill="#fff"/><ellipse cx="55.5" cy="61" rx="6.5" ry="3.3" fill="#fff"/>' +
        '<circle cx="50" cy="56.5" r="2.8" fill="#E8907C"/>' +
        '<path d="M46,66 Q50,69 54,66" stroke="#C26060" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
        // gorro
        '<path d="M32,41 Q34,17 55,14 Q73,13 82,30 L76,35 Q69,26 62,28 Q68,36 68,41Z" fill="#C8102E"/>' +
        '<path d="M55,14 Q73,13 82,30 L78,32 Q70,20 56,19Z" fill="#9E0B22"/>' +
        '<rect x="29" y="37" width="42" height="9" rx="4.5" fill="#fff"/>' +
        '<circle cx="80" cy="33" r="5.5" fill="#fff"/>',
      textos: [{ fixo: 'Ho Ho Ho!', x: 50, y: 97, size: 11, font: 'script', fill: '#fff' }]
    },
    meninoJesus: {
      nome: 'Nascimento do Menino Jesus',
      arte: bg('#0F1E3D') + pontosNeve('#DCE8FF', 3) +
        '<ellipse cx="50" cy="66" rx="34" ry="20" fill="#F3D98B" opacity=".22"/>' +
        // estrela de Belém
        '<g stroke="#F8E3A3" stroke-width=".7" stroke-linecap="round" opacity=".9"><path d="M50,4 L50,34"/><path d="M38,14 L62,14"/><path d="M42,7 L58,21"/><path d="M58,7 L42,21"/></g>' +
        '<circle cx="50" cy="14" r="5" fill="#F8E3A3" opacity=".35"/>' + estrela(50, 14, 5.5, '#FFF3C4') +
        // estábulo
        '<path d="M16,54 L50,33 L84,54 L80,56 L50,38 L20,56Z" fill="#081226"/>' +
        '<rect x="22" y="54" width="2.4" height="28" fill="#081226"/><rect x="75.6" y="54" width="2.4" height="28" fill="#081226"/>' +
        // Maria (ajoelhada) e José (de pé com cajado)
        '<circle cx="36" cy="61" r="3.6" fill="#081226"/><path d="M32.6,61 Q30,74 27,82 L44,82 Q41,72 39.4,62Z" fill="#081226"/>' +
        '<circle cx="66" cy="55" r="3.7" fill="#081226"/><path d="M61.5,58 L58.5,82 L73.5,82 L70.5,58Z" fill="#081226"/>' +
        '<path d="M75.5,48 Q78,47 77.5,50 L77.5,82" stroke="#081226" stroke-width="1.4" fill="none"/>' +
        // manjedoura com o menino
        '<circle cx="50" cy="71" r="6" fill="#F8E3A3" opacity=".35"/>' +
        '<ellipse cx="50" cy="73" rx="6.2" ry="2.6" fill="' + CREME + '"/><circle cx="55" cy="72.2" r="2" fill="#F6CBA8"/>' +
        '<path d="M42,75 L58,75 L55,82 L45,82Z" fill="#5B3A1E"/>' +
        '<rect x="-6" y="82" width="112" height="30" fill="#081226"/>',
      textos: [{ fixo: 'Nasceu Jesus', x: 50, y: 95, size: 11, font: 'script', fill: '#F8E3A3' }]
    },
    arvore: {
      nome: 'Árvore de Natal',
      arte: bg('#FFF6EA') + pontosNeve('#E9C46A', 5) +
        '<path d="M50,15 L33,40 L41,40 L27,58 L37,58 L22,76 L78,76 L63,58 L73,58 L59,40 L67,40Z" fill="#1E6B3A"/>' +
        '<path d="M50,15 L67,40 L59,40 L73,58 L63,58 L78,76 L50,76Z" fill="#17573A"/>' +
        '<path d="M37,42 Q50,49 63,40" stroke="#E0A72E" stroke-width="1.2" fill="none"/>' +
        '<path d="M31,60 Q50,68 69,58" stroke="#E0A72E" stroke-width="1.2" fill="none"/>' +
        '<rect x="46" y="76" width="8" height="6" fill="#7A4A23"/>' +
        bola(44, 34, 2, '#C8102E') + bola(57, 48, 2.2, '#2E6FB7') + bola(40, 53, 2.2, '#E0A72E') + bola(62, 66, 2.4, '#C8102E') + bola(36, 70, 2.3, '#2E6FB7') + bola(52, 63, 2, '#E0A72E') +
        estrela(50, 13, 5.5, '#E0A72E') +
        '<rect x="26" y="77" width="12" height="9" rx="1" fill="#C8102E"/><rect x="31" y="77" width="2" height="9" fill="#F3D98B"/>' +
        '<rect x="62" y="78" width="11" height="8" rx="1" fill="#2E6FB7"/><rect x="66.5" y="78" width="2" height="8" fill="#F3D98B"/>',
      textos: [{ fixo: 'Feliz Natal', x: 50, y: 96, size: 10, font: 'script', fill: '#B3122E' }]
    },
    boneco: {
      nome: 'Boneco de neve',
      arte: bg('#CFE6F5') + [[12, 14, 3], [86, 12, 2.6], [10, 52, 2], [90, 48, 2.4], [16, 84, 2], [86, 84, 2.4]].map(function (p) { return floco(p[0], p[1], p[2], '#fff'); }).join('') +
        '<path d="M-6,82 Q30,74 50,80 Q74,86 106,76 L106,106 L-6,106Z" fill="#fff"/>' +
        '<circle cx="50" cy="70" r="15" fill="#fff" stroke="#BCD6EA" stroke-width=".6"/>' +
        '<circle cx="50" cy="45" r="11" fill="#fff" stroke="#BCD6EA" stroke-width=".6"/>' +
        '<rect x="38" y="53" width="24" height="5" rx="2.5" fill="#C8102E"/><path d="M56,56 L60,68 L64,66 L60,56Z" fill="#C8102E"/>' +
        '<rect x="41" y="31" width="18" height="3" rx="1" fill="#1F1A1C"/><rect x="44" y="18" width="12" height="14" rx="1" fill="#1F1A1C"/><rect x="44" y="28" width="12" height="2.4" fill="#C8102E"/>' +
        '<circle cx="46" cy="43" r="1.3" fill="#1F1A1C"/><circle cx="54" cy="43" r="1.3" fill="#1F1A1C"/>' +
        '<path d="M50,46 L58,48 L50,48.6Z" fill="#F08A24"/>' +
        '<circle cx="50" cy="65" r="1.4" fill="#1F1A1C"/><circle cx="50" cy="71" r="1.4" fill="#1F1A1C"/><circle cx="50" cy="77" r="1.4" fill="#1F1A1C"/>' +
        '<path d="M36,64 L24,56" stroke="#7A4A23" stroke-width="1.2" stroke-linecap="round"/><path d="M64,64 L76,56" stroke="#7A4A23" stroke-width="1.2" stroke-linecap="round"/>',
      textos: [{ fixo: 'Boas Festas', x: 50, y: 96, size: 10, font: 'script', fill: '#14284A' }]
    },
    sinos: {
      nome: 'Sinos "Boas Festas"',
      arte: bg('#123D2C') + estrela(16, 16, 2, OURO) + estrela(84, 18, 2.2, OURO) + brilho(14, 64, 1.8, OURO) + brilho(86, 62, 1.8, OURO) +
        sino(41, 44, -16, 1.15) + sino(59, 44, 16, 1.15) + laco(50, 29, .8) + folha(44, 30, 200, .9) + folha(56, 30, -20, .9),
      textos: [{ fixo: 'Boas Festas', x: 50, y: 86, size: 15, font: 'script', fill: OURO }]
    },
    personalizado: {
      nome: 'Personalizado com nome',
      arte: bg('#7E0F16') + '<circle cx="50" cy="50" r="55" fill="#9B1720" opacity=".55"/>' +
        galho(-6, 2, 12, 26, 1) + galho(2, -6, 78, 22, 1) + azevinho(9, 9, 45, 1.05) +
        galho(106, 98, 192, 26, 1) + galho(98, 106, 258, 22, 1) + azevinho(91, 91, 225, 1.05) +
        estrela(84, 14, 2.2, OURO) + estrela(16, 86, 2, OURO) +
        '<path d="M30,52 L70,52" stroke="' + OURO + '" stroke-width=".5"/>' + estrela(50, 52, 1.6, OURO),
      textos: [
        { fixo: 'Feliz Natal', x: 50, y: 43, size: 17, font: 'script', fill: CREME },
        { campo: 'nome', x: 50, y: 66, size: 8.5, font: 'serif', italic: true, fill: OURO, max: 18 }
      ]
    },
    rena: {
      nome: 'Rena',
      arte: bg('#1F6B45') + pontosNeve('#fff', 17) +
        // chifres
        '<g stroke="#6B4423" stroke-width="2.6" stroke-linecap="round" fill="none">' +
        '<path d="M41,36 Q36,24 30,12"/><path d="M36,26 Q30,24 26,20"/><path d="M33,19 Q36,14 38,10"/>' +
        '<path d="M59,36 Q64,24 70,12"/><path d="M64,26 Q70,24 74,20"/><path d="M67,19 Q64,14 62,10"/></g>' +
        // orelhas
        '<ellipse cx="31" cy="45" rx="8" ry="4" transform="rotate(-25 31 45)" fill="#8B5A2B"/><ellipse cx="31" cy="45" rx="4.5" ry="2" transform="rotate(-25 31 45)" fill="#E8A59A"/>' +
        '<ellipse cx="69" cy="45" rx="8" ry="4" transform="rotate(25 69 45)" fill="#8B5A2B"/><ellipse cx="69" cy="45" rx="4.5" ry="2" transform="rotate(25 69 45)" fill="#E8A59A"/>' +
        // cabeça, focinho, olhos, nariz
        '<ellipse cx="50" cy="55" rx="16" ry="20" fill="#8B5A2B"/>' +
        '<ellipse cx="50" cy="67" rx="11" ry="8.5" fill="#C99A6B"/>' +
        '<circle cx="43.5" cy="50" r="3.2" fill="#fff"/><circle cx="56.5" cy="50" r="3.2" fill="#fff"/>' +
        '<circle cx="44.2" cy="50.6" r="1.7" fill="#1F1A1C"/><circle cx="55.8" cy="50.6" r="1.7" fill="#1F1A1C"/>' +
        '<circle cx="50" cy="62" r="4.6" fill="#D7263D"/><circle cx="48.5" cy="60.5" r="1.3" fill="#fff" opacity=".7"/>' +
        '<path d="M45,70 Q50,73.5 55,70" stroke="#6B4423" stroke-width="1.2" fill="none" stroke-linecap="round"/>' +
        // cachecol
        '<path d="M36,73 Q50,80 64,73 L64,79 Q50,86 36,79Z" fill="#C8102E"/>',
      textos: [{ fixo: 'Feliz Natal', x: 50, y: 96, size: 11, font: 'script', fill: CREME }]
    },
    anjo: {
      nome: 'Anjo',
      arte: bg('#F7EFE2') + estrela(14, 14, 2, '#D4A63A') + estrela(86, 18, 1.8, '#D4A63A') + brilho(18, 60, 1.8, '#D4A63A') + brilho(84, 58, 1.8, '#D4A63A') + estrela(80, 84, 1.4, '#D4A63A') +
        // asas
        '<path d="M44,46 Q18,30 13,54 Q21,52 23,60 Q30,55 33,63 Q38,56 45,58Z" fill="#FFFFFF" stroke="#E0C78A" stroke-width=".8"/>' +
        '<path d="M56,46 Q82,30 87,54 Q79,52 77,60 Q70,55 67,63 Q62,56 55,58Z" fill="#FFFFFF" stroke="#E0C78A" stroke-width=".8"/>' +
        // túnica
        '<path d="M43,40 Q38,62 31,80 L69,80 Q62,62 57,40Z" fill="#FFFFFF" stroke="#E0C78A" stroke-width=".8"/>' +
        '<path d="M31,80 L69,80 L68,77 L32,77Z" fill="#E0B44A"/>' +
        // rosto, cabelo, auréola
        '<circle cx="50" cy="32" r="7" fill="#F6CBA8"/>' +
        '<path d="M43,32 Q43,23 50,23 Q57,23 57,32 Q55,27 50,27 Q45,27 43,32Z" fill="#E7B84B"/>' +
        '<ellipse cx="50" cy="20" rx="8" ry="2.4" fill="none" stroke="#D4A63A" stroke-width="1.4"/>' +
        '<path d="M47,33 Q48,34.5 49,33" stroke="#7A4A23" stroke-width=".7" fill="none"/><path d="M51,33 Q52,34.5 53,33" stroke="#7A4A23" stroke-width=".7" fill="none"/>' +
        '<circle cx="46.5" cy="35.5" r="1.3" fill="#F29C9C" opacity=".6"/><circle cx="53.5" cy="35.5" r="1.3" fill="#F29C9C" opacity=".6"/>',
      textos: [{ fixo: 'Glória a Deus', x: 50, y: 94, size: 10.5, font: 'script', fill: '#8E5A12' }]
    },
    guirlanda: {
      nome: 'Guirlanda "Paz"',
      arte: bg('#FFF9F0') + (function () {
        var s = '';
        for (var i = 0; i < 20; i++) {
          var a = i * Math.PI * 2 / 20, x = 50 + Math.cos(a) * 23, y = 46 + Math.sin(a) * 23;
          s += folha(x, y, a * 180 / Math.PI + 90 + (i % 2 ? 25 : -25), 1.05, i % 2 ? '#17573A' : '#1E6B3A');
        }
        for (var j = 0; j < 7; j++) { var b = j * Math.PI * 2 / 7 + .3; s += baga(50 + Math.cos(b) * 21, 46 + Math.sin(b) * 21, 1.5); }
        return s;
      })() + laco(50, 67, .8) + estrela(14, 14, 1.6, '#D4A63A') + estrela(86, 14, 1.6, '#D4A63A'),
      textos: [
        { fixo: 'Paz', x: 50, y: 52, size: 20, font: 'script', fill: '#B3122E' },
        { fixo: 'Feliz Natal', x: 50, y: 94, size: 10, font: 'script', fill: '#1E6B3A' }
      ]
    },
    presente: {
      nome: 'Presente "Com carinho"',
      arte: bg('#9E1B2B') + pontosNeve('#F3D98B', 21) +
        '<rect x="28" y="46" width="44" height="34" rx="2" fill="#1E6B3A"/>' +
        '<rect x="24" y="38" width="52" height="11" rx="2" fill="#17573A"/>' +
        '<rect x="46" y="38" width="8" height="42" fill="' + OURO + '"/>' +
        '<rect x="28" y="58" width="44" height="6" fill="' + OURO + '" opacity=".9"/>' +
        laco(50, 37, .9, OURO, '#A87A1A') + brilho(20, 24, 2.4, '#FFF3C4') + brilho(80, 28, 2, '#FFF3C4'),
      textos: [{ fixo: 'Com carinho', x: 50, y: 95, size: 11, font: 'script', fill: CREME }]
    },
    gratidao: {
      nome: '"Gratidão"',
      arte: bg('#F7EFE2') + '<rect x="6" y="6" width="88" height="88" rx="6" fill="none" stroke="#D4A63A" stroke-width=".6"/>' +
        brilho(20, 22, 2.4, '#D4A63A') + estrela(80, 20, 2, '#D4A63A') + brilho(82, 80, 2, '#D4A63A') + estrela(20, 80, 1.6, '#D4A63A') +
        azevinho(50, 82, 0, .75),
      textos: [
        { fixo: 'Gratidão', x: 50, y: 52, size: 19, font: 'script', fill: '#8E5A12' },
        { fixo: 'por este ano juntos', x: 50, y: 64, size: 5.4, font: 'serif', italic: true, fill: '#5E4A2A' }
      ]
    },
    bengala: {
      nome: 'Bengala doce',
      arte: bg('#E6F2EC') + [[12, 14, 2.4], [88, 12, 2.2], [14, 70, 1.8], [86, 66, 2]].map(function (p) { return floco(p[0], p[1], p[2], '#9CC8B4'); }).join('') +
        '<path d="M57,77 L57,36 Q57,18 43,18 Q29,18 29,33" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round"/>' +
        '<path d="M57,77 L57,36 Q57,18 43,18 Q29,18 29,33" stroke="#D21F3C" stroke-width="10" fill="none" stroke-linecap="butt" stroke-dasharray="4 4"/>' +
        '<path d="M57,77 L57,36 Q57,18 43,18 Q29,18 29,33" stroke="#B3122E" stroke-width="10" fill="none" stroke-linecap="round" opacity=".18"/>' +
        laco(57, 52, .75) + folha(52, 56, 160, .8) + folha(62, 56, 20, .8),
      textos: [{ fixo: 'Doce Natal', x: 50, y: 95, size: 11, font: 'script', fill: '#B3122E' }]
    },
    anoNovo: {
      nome: 'Feliz Ano Novo',
      arte: bg('#0E1630') + fogos(22, 22, 13, OURO) + fogos(80, 18, 10, '#F29CBB') + fogos(84, 80, 9, OURO) + fogos(16, 82, 8, '#9ED0FF') +
        estrela(50, 10, 1.6, OURO) + estrela(64, 90, 1.4, OURO) + brilho(36, 90, 1.6, '#fff'),
      textos: [{ fixo: 'Feliz', x: 50, y: 46, size: 19, font: 'script', fill: OURO }, { fixo: String(anoNovo), x: 50, y: 70, size: 19, font: 'serif', fill: '#fff' }]
    }
  };

  var FONTES = { script: '"Great Vibes", cursive', serif: '"Lora", Georgia, serif', sans: '"DM Sans", sans-serif' };

  // divide o texto em linhas de no máximo "max" letras
  function quebrar(t, max) {
    if (!max || t.length <= max) return [t];
    var palavras = t.split(/\s+/), linhas = [''], i = 0;
    palavras.forEach(function (p) {
      if ((linhas[i] + ' ' + p).trim().length > max && linhas[i]) { linhas.push(''); i++; }
      linhas[i] = (linhas[i] + ' ' + p).trim();
    });
    return linhas.slice(0, 3);
  }
  // resolve os textos de um modelo com os valores digitados -> [{s, x, y, size, font, fill, italic, rot}]
  function textos(modelo, valores) {
    var out = [];
    (modelo.textos || []).forEach(function (t) {
      var v = (t.fixo !== undefined ? t.fixo : (valores[t.campo] || '')).trim();
      if (!v) return;
      if (t.linha !== undefined) {
        var partes = v.split(/\s+/), corte = Math.ceil(partes.length / 2);
        v = t.linha === 0 ? partes.slice(0, corte).join(' ') : partes.slice(corte).join(' ');
        if (!v) return;
      }
      var linhas = quebrar(v, t.max);
      linhas.forEach(function (l, i) {
        out.push({ s: l, x: t.x, y: t.y + i * t.size * 1.35 - (linhas.length - 1) * t.size * .35, size: t.size, font: t.font, fill: t.fill, italic: t.italic, rot: t.rot || 0 });
      });
    });
    return out;
  }

  return { MOLDURAS: MOLDURAS, CARTOES: CARTOES, ESTAMPAS: ESTAMPAS, FONTES: FONTES, textos: textos };
})();
