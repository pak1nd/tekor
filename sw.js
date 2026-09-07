/* Service worker: menyimpan aplikasi agar tetap terbuka tanpa internet. */
var VERSI = 'tekor-v3';
var BERKAS = ['./', './index.html', './manifest.json', './ikon-192.png', './ikon-512.png'];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(VERSI).then(function (c) {
    return Promise.all(BERKAS.map(function (b) { return c.add(b).catch(function () {}); }));
  }));
});
self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (k) {
    return Promise.all(k.map(function (n) { return n === VERSI ? null : caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});
self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET' || e.request.url.indexOf('script.google.com') > -1) return;

  // Halaman utama: coba internet dulu, supaya perbaikan terbaru langsung
  // terlihat. Simpanan lama dipakai hanya kalau sedang tanpa sinyal.
  var dokumenUtama = e.request.mode === 'navigate' ||
    e.request.url.indexOf('/index.html') > -1 || e.request.url.slice(-1) === '/';
  if (dokumenUtama) {
    e.respondWith(
      fetch(e.request).then(function (r) {
        if (r && r.status === 200) {
          var salinan = r.clone();
          caches.open(VERSI).then(function (c) { c.put(e.request, salinan); });
        }
        return r;
      }).catch(function () { return caches.match(e.request); })
    );
    return;
  }

  // Aset lain (ikon, manifes): simpanan dulu supaya cepat, internet di belakang layar.
  e.respondWith(caches.match(e.request).then(function (simpan) {
    var jaringan = fetch(e.request).then(function (r) {
      if (r && r.status === 200 && r.type === 'basic') {
        var salinan = r.clone();
        caches.open(VERSI).then(function (c) { c.put(e.request, salinan); });
      }
      return r;
    }).catch(function () { return simpan; });
    return simpan || jaringan;
  }));
});
