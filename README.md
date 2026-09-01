# Teknologi Keolahragaan

Aplikasi mata kuliah untuk lima kelas paralel Ilmu Keolahragaan UNIMED.
Dipasang di HP maupun laptop dari satu alamat yang sama.

## Isi berkas

| Berkas | Fungsi |
|---|---|
| `index.html` | Seluruh aplikasi: tampilan, simulasi, menu dosen |
| `manifest.json` | Membuat aplikasi bisa dipasang seperti aplikasi biasa |
| `sw.js` | Menyimpan aplikasi agar tetap terbuka tanpa internet |
| `ikon-192.png` `ikon-512.png` `ikon-maskable.png` | Ikon aplikasi |

## Sebelum diunggah

Buka `index.html`, cari bagian paling atas kode, isi dua baris ini:

```js
var KONFIG = {
  ALAMAT_GUDANG: 'TEMPEL_URL_APPS_SCRIPT_DI_SINI',
  KUNCI: 'tekor-2026-ganti'
};
```

- `ALAMAT_GUDANG` — URL Web App dari Apps Script
- `KUNCI` — harus sama persis dengan "Kunci rahasia aplikasi" di tab Pengaturan pada Sheets

## Menaruh di GitHub Pages

1. Buka github.com, klik tombol **New** untuk membuat repositori
2. Beri nama `tekor`, pilih **Public**, klik **Create repository**
3. Klik **uploading an existing file**
4. Seret kelima berkas di folder ini, lalu klik **Commit changes**
5. Masuk ke **Settings** > **Pages**
6. Pada bagian Source pilih **Deploy from a branch**, pilih cabang `main` dan folder `/ (root)`, klik **Save**
7. Tunggu satu sampai dua menit. Alamatnya akan muncul di halaman yang sama:

```
https://NAMA-AKUN-ANDA.github.io/tekor/
```

Setiap kali ada perubahan, unggah ulang berkasnya lewat tombol **Add file** > **Upload files**.
Perubahan muncul di alamat yang sama setelah satu sampai dua menit.

## Memasang di HP dan laptop

**Android** — buka alamat di Chrome, ketuk menu tiga titik, pilih *Tambahkan ke Layar utama*.

**iPhone** — buka di Safari, ketuk tombol bagikan, pilih *Add to Home Screen*.

**Windows** — buka di Chrome atau Edge, klik ikon pasang di ujung kanan bilah alamat.

Setelah dipasang, aplikasi terbuka layar penuh tanpa bilah peramban, dan materi tetap bisa
dibaca meski sedang tanpa sinyal.

## Memasang slide PPT

Aplikasi menerima dua bentuk, tinggal tempel tautannya ke kolom **Tautan Slide**
pada tab Pertemuan di berkas Sheets.

**PDF — tampilan persis seperti desain asli.** Di PowerPoint pilih Simpan sebagai PDF,
unggah ke Drive, atur berbagi ke *Siapa saja yang memiliki link* sebagai *Pelihat*,
lalu salin tautannya. Tata letak, font, gradasi, dan bayangan tetap sama. Animasi dan
transisi tidak ikut, karena PDF memang bukan format bergerak.

**Google Slides — bisa digeser satu per satu di dalam aplikasi.** Unggah PPT ke Drive,
buka dengan Google Slides, atur berbagi, lalu salin tautannya. Perlu diperiksa dulu
hasilnya, karena konversi kadang menggeser font dan tata letak.

Aplikasi mengenali sendiri jenis tautannya, tidak ada pengaturan tambahan.

Untuk mengajar di kelas, cara paling aman tetap membuka berkas PPT langsung di
PowerPoint pada laptop. Slide di dalam aplikasi berfungsi sebagai salinan yang dapat
dibuka ulang mahasiswa setelah kuliah selesai.

## Yang perlu diketahui

Kamera, GPS, dan lampu kilat hanya berfungsi pada alamat HTTPS. GitHub Pages sudah HTTPS,
jadi tidak perlu pengaturan tambahan. Membuka berkas `index.html` langsung dari komputer
lewat klik ganda tidak akan bisa memakai kamera.

Lampu kilat untuk pengukuran detak jantung hanya dapat dinyalakan di Android. Pengguna iPhone
otomatis diarahkan ke jalur hitungan manual, lalu dibandingkan dengan rata-rata hasil sensor
teman sekelasnya.

Bila mahasiswa mengirim tugas atau presensi saat internet putus, datanya disimpan sementara
di HP dan dikirim otomatis begitu sinyal kembali.
