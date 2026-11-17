/* Service worker do Gabarito: guarda o app para abrir sem internet.
   Ao mudar algum arquivo do app, aumente a VERSAO para os aparelhos pegarem a nova. */
var VERSAO = 'gabarito-v3';
var ARQUIVOS = ['./', './index.html', './manifest.webmanifest', './icone-192.png', './icone-512.png', './icone-maskable-512.png'];

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(VERSAO).then(function (c) { return c.addAll(ARQUIVOS); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (nomes) {
    return Promise.all(nomes.filter(function (n) { return n !== VERSAO; }).map(function (n) { return caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var req = e.request;
  if (req.method !== 'GET') return;
  var url = new URL(req.url);
  // Página do app: tenta a rede primeiro (pega atualizações), cai no cache sem internet
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(function (r) {
      var copia = r.clone(); caches.open(VERSAO).then(function (c) { c.put('./index.html', copia); });
      return r;
    }).catch(function () { return caches.match('./index.html'); }));
    return;
  }
  // Fontes do Google e arquivos do app: cache primeiro
  if (url.origin === location.origin || /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname)) {
    e.respondWith(caches.match(req).then(function (hit) {
      return hit || fetch(req).then(function (r) {
        if (r.ok || r.type === 'opaque') { var copia = r.clone(); caches.open(VERSAO).then(function (c) { c.put(req, copia); }); }
        return r;
      });
    }));
  }
});
