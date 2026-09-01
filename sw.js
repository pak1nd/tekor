/* Service worker: menyimpan aplikasi agar tetap terbuka tanpa internet. */
var VERSI = 'tekor-v1';
var BERKAS = ['./', './index.html', './manifest.json', './ikon-192.png', './ikon-512.png'];

self.addEventListener('install', function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(VERSI).then(function (c) {
    return Promise.all(BERKAS.map(function (b) {
      return c.add(b).catch(function () {});   // satu berkas gagal tidak membatalkan sisanya
    }));
  }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (k) {
    return Promise.all(k.map(function (n) { return n === VERSI ? null : caches.delete(n); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener('fetch', function (e) {
  var url = e.request.url;
  // Kiriman data ke gudang tidak boleh diambil dari simpanan
  if (e.request.method !== 'GET' || url.indexOf('script.google.com') > -1) return;

  e.respondWith(
    caches.match(e.request).then(function (simpan) {
      var jaringan = fetch(e.request).then(function (r) {
        if (r && r.status === 200 && r.type === 'basic') {
          var salinan = r.clone();
          caches.open(VERSI).then(function (c) { c.put(e.request, salinan); });
        }
        return r;
      }).catch(function () { return simpan; });
      return simpan || jaringan;
    })
  );
});
