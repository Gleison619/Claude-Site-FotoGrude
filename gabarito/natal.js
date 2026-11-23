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
  function laco(x, y, s, cor) {
    cor = cor || '#C8102E';
    var esc = '#8E0B21';
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
      var v = (valores[t.campo] || '').trim();
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

  return { MOLDURAS: MOLDURAS, CARTOES: CARTOES, FONTES: FONTES, textos: textos };
})();
