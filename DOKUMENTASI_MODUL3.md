# Dokumentasi Demo — Modul 3 (Asynchronous Programming & API Call) pada Sablon_App

Dokumen ini ditulis dari kode yang **benar-benar ada** di project. Nomor baris bisa bergeser sedikit jika kode diubah.
Rubrik penilaian Modul 3 (PDF hlm. 24, bagian Tugas Pekan Demo = 60%):

| Kriteria | Bobot | Di mana di aplikasi |
|---|---|---|
| Mengambil data dari External API dan memasukkannya ke Object menggunakan Interface | 10% | `types/product.ts`, `types/api.ts`, `services/productService.ts` |
| Menggunakan Custom & Pre-built Async Function | 10% | `getShirts`, `getFavoriteIds`, `toggleFavorite` (custom), `fetch`, `AsyncStorage` (pre-built) |
| Menggunakan fungsi `.then()`, `.resolve()`, dan `.reject()` | 10% | `services/api.ts`, `services/productService.ts`, `app/inspirasi/[id].tsx` |
| Menjawab pertanyaan | 15% | Bagian 8 di bawah |
| Menyelesaikan modifikasi kode | 15% | Bagian 9 di bawah |

---

## 1. Fitur baru: "Inspirasi Kaos"

Sebelum membuat desain, pengguna bisa melihat katalog kaos dari **API eksternal DummyJSON** (kategori `mens-shirts`) sebagai referensi, mencari kaos, menandai favorit, membuka detail, lalu menekan **Mulai Design Kaosmu** yang masuk ke alur Modul 1.

- Endpoint daftar: `GET https://dummyjson.com/products/category/mens-shirts?limit=20`
- Endpoint detail: `GET https://dummyjson.com/products/{id}`
- Harga ditampilkan dalam **USD apa adanya dari API** (tidak dikonversi).

**Integrasi dengan modul sebelumnya:** halaman memakai routing Modul 2 (`inspirasi/[id]` = dynamic route, `useLocalSearchParams`, `Link`, `push`, `back`, `canGoBack`, `Stack.Screen`); tombol *Mulai Design Kaosmu* memanggil `reset()` dari Context (`DraftContext`) lalu `push('/shirt-selection')`; pencarian memakai `useMemo` seperti di *Pesanan Saya*.

## 2. Struktur file (mengikuti konvensi folder di modul)

**Baru:**
| File | Isi |
|---|---|
| `types/api.ts` | `interface ApiResponse<T>` (success, data, message), sesuai contoh di modul |
| `types/product.ts` | `ApiProduct` & `ApiProductList` (bentuk data mentah API), `ShirtProduct` (bentuk yang dipakai aplikasi) |
| `utils/delay.ts` | `delay(ms)` dari modul, mengembalikan `Promise<void>` |
| `services/api.ts` | `getJson<T>(url)`: `fetch` yang dibungkus `new Promise` + `resolve`/`reject` + batas waktu 10 detik |
| `services/productService.ts` | `getShirts()` (async/await) dan `getShirtById(id)` (`.then()`) |
| `services/favoriteService.ts` | `getFavoriteIds()` dan `toggleFavorite(id)` memakai `AsyncStorage` |
| `components/Loading.tsx`, `ErrorMessage.tsx`, `ProductCard.tsx` | Indikator loading, pesan error + tombol *Coba Lagi*, kartu kaos |
| `app/inspirasi/index.tsx` | Daftar kaos + cari + filter favorit |
| `app/inspirasi/[id].tsx` | Detail kaos |

**Diubah (kecil):** `app/_layout.tsx` (+2 baris `Stack.Screen`), `app/index.tsx` (+3 baris `Link` ke Inspirasi Kaos).
Tidak ada package baru. `package.json` tidak diubah.

---

## 3. Penjelasan konsep (bahasa sederhana)

- **Synchronous** = tugas berjalan satu per satu, harus selesai dulu baru lanjut. **Asynchronous** = tugas yang butuh waktu (misalnya ambil data dari internet) dijalankan di belakang, kode lain tetap jalan.
- **Async function** = fungsi yang diberi kata `async`. Hasilnya otomatis dibungkus **Promise**.
- **Promise** = "janji" untuk nilai yang belum tersedia sekarang tapi akan tersedia nanti. Statusnya: *pending* → *resolved* (berhasil) atau *rejected* (gagal).
- **`resolve(nilai)`** = tandai Promise berhasil dengan nilai itu. **`reject(error)`** = tandai Promise gagal.
- **`await`** = tunggu Promise selesai dulu sebelum baris berikutnya (hanya boleh di dalam `async function`).
- **`.then(callback)`** = "kalau Promise sukses, jalankan callback ini". `.catch(callback)` = "kalau gagal, jalankan ini". `.finally(callback)` = "apa pun hasilnya, jalankan ini". Ketiganya mengembalikan Promise baru sehingga bisa dirantai.
- **API call / fetching** = mengirim HTTP request (di sini method **GET**) ke sebuah **endpoint** (URL), lalu menerima **response** berupa JSON.
- **Interface** = "cetakan bentuk objek" di TypeScript. Data dari API dimasukkan ke objek yang bentuknya sudah ditentukan, sehingga editor bisa mengecek tipenya.

---

## 4. Lokasi implementasi tiap materi

| Materi Modul 3 | File : baris | Keterangan |
|---|---|---|
| API call dengan `fetch` | `services/api.ts`:12 | `fetch(url, { signal })` |
| Promise constructor, `resolve()`, `reject()` | `services/api.ts`:7, 15, 17, 22 | `getJson<T>()` meniru pola `getUser()` di modul (hlm. 12) |
| `.then()` | `services/api.ts`:13 · `services/productService.ts`:48, 52 · `app/inspirasi/[id].tsx`:31 | Merantai hasil; `.then` kedua menerima hasil `.then` pertama |
| `.catch()` / `.finally()` | `services/api.ts`:20, 26 · `app/inspirasi/[id].tsx`:32-33 | Menangani error; `finally` mematikan loading |
| `Promise.reject()` | `services/productService.ts`:45 | Menolak langsung jika ID tidak valid |
| Custom async function (`async`/`await`) | `services/productService.ts`:26 (`getShirts`) · `services/favoriteService.ts`:6, 17 · `app/inspirasi/index.tsx`:30 (`load`) | Fungsi buatan sendiri yang memakai `await` |
| Pre-built async function | `fetch`, `response.json()`, `AsyncStorage.getItem/setItem` (`favoriteService.ts`:8, 20) | Fungsi bawaan yang mengembalikan Promise |
| Fungsi utility `delay` | `utils/delay.ts`:2 · dipakai di `productService.ts`:35 | Jeda 800 ms sebelum mencoba ulang |
| Interface data API | `types/product.ts`:2, 16, 24 · `types/api.ts`:2 | `ApiProduct` (mentah) → `ShirtProduct` (dipakai app) |
| Memasukkan data API ke objek ber-interface | `services/productService.ts`:13-22 (`toShirtProduct`) | Mapping + nilai default (`brand` kosong → "Tanpa merek") |
| `ApiResponse<T>` (generic) | `productService.ts`:26 dan 43 | Pembungkus hasil service |
| Loading & error state | `components/Loading.tsx`, `ErrorMessage.tsx` | Pengguna tahu saat data sedang dimuat atau gagal |

---

## 5. Cara kerja alur data (dari API sampai layar)

**Daftar kaos (`app/inspirasi/index.tsx`) memakai async/await:**
```
Layar dibuka → useEffect memanggil load()
 → setLoading(true)
 → await getShirts()
     → await getJson(url)  → fetch ke DummyJSON
     → jika gagal: await delay(800) lalu coba sekali lagi
     → hasil dipetakan (.map(toShirtProduct)) → { success, data, message }
 → success ? setShirts(data) : setError(message)
 → setLoading(false) → layar digambar ulang
```

**Detail kaos (`app/inspirasi/[id].tsx`) memakai .then():**
```
useLocalSearchParams() → id dari URL
getShirtById(Number(id))
  .then(res => setProduct(res.data))     // sukses
  .catch(e => setError(e.message))       // reject() / Promise.reject() / throw
  .finally(() => setLoading(false))      // selalu
```

**Mengapa dua gaya?** Untuk memperlihatkan keduanya. `getShirts()` tidak pernah *reject*: ia menangkap error sendiri dan mengembalikan `success: false`. `getShirtById()` mengembalikan Promise yang bisa ditolak, jadi pemanggil memakai `.catch()`.

**Mengapa `getJson` dibuat sendiri?** `fetch` hanya menganggap *gagal* jika jaringan putus; status seperti 404/500 tetap dianggap berhasil. Dengan `new Promise` kita memanggil `reject()` sendiri kalau `response.ok` bernilai false, dan menambahkan batas waktu 10 detik.

**Apa fungsi `active` / `mounted`?** Jika pengguna menutup halaman sebelum data tiba, kita tidak ingin mengubah state halaman yang sudah hilang. `active` (di detail) dan `mounted` (`useRef`, di daftar) mencegahnya.

---

## 6. Langkah demonstrasi di iPhone (Expo Go)

Syarat: **iPhone harus punya internet** (data dipanggil dari `dummyjson.com`). Jalankan `npx expo start --go --clear`, scan QR dengan Expo Go.

1. **API call + Interface + async/await:** Beranda → **Inspirasi Kaos**. Muncul *Memuat katalog kaos...* (`Loading`), lalu daftar kaos dari API: judul, merek, harga USD, rating, foto. Itu data hasil `getShirts()` yang dipetakan ke `ShirtProduct`.
2. **useMemo + state:** ketik di kolom cari (nama/merek). Tulisan "Menampilkan X dari Y kaos" ikut berubah.
3. **Pre-built async (AsyncStorage):** tekan ♡ pada satu kaos → berubah ♥ dan chip **Favorit (1)** bertambah. Tutup Expo Go sepenuhnya, buka lagi: favorit tetap ada (tersimpan). Tekan chip **Favorit** untuk menyaring.
4. **Dynamic route + .then():** tekan sebuah kartu → halaman detail (`/inspirasi/[id]`). Data diambil dengan `getShirtById().then()`.
5. **Back + useFocusEffect:** ubah favorit di detail → **Kembali** → jumlah di chip Favorit ikut diperbarui.
6. **Integrasi Modul 1:** di detail, tekan **Mulai Design Kaosmu** → masuk alur *Pilih Baju* (Modul 1), draft direset lewat Context.
7. **Error handling (`reject`) — nyalakan Mode Pesawat** di iPhone, lalu buka **Inspirasi Kaos** lagi. Aplikasi menunggu sebentar (percobaan ulang dengan `delay`), lalu menampilkan *Tidak dapat terhubung ke server...* dengan tombol **Coba Lagi**. Matikan Mode Pesawat → **Coba Lagi** → data muncul.
8. **Cek fitur lama:** *Mulai Design*, *Pesanan Saya*, *Bantuan* (Modul 1 dan 2) tetap berjalan.

---

## 7. Hasil pengujian (jujur apa adanya)

| Pengujian | Hasil |
|---|---|
| `npx tsc --noEmit` | Lulus, 0 error |
| `npx expo export --platform ios` (bundle iOS) | Berhasil |
| `npx expo start --go` | Server berjalan, manifest HTTP 200 |
| `npx expo-doctor` | 18 dari 20 lulus. 2 sisanya gagal karena sandbox pengujian tidak bisa menjangkau server Expo; **jalankan ulang di komputermu** |
| Uji interaksi otomatis (Playwright, web), 25 skenario | Semua lulus (daftar, cari, favorit, detail, back, error 404/500/jaringan putus, retry, loading, ID tidak valid, produk non-kaos, fitur Modul 1 dan 2) |

**Batasan pengujian yang perlu kamu tahu:**
- Dari lingkungan pengujian, `dummyjson.com` **tidak dapat dijangkau**. Uji interaksi memakai **respons tiruan** yang mengikuti bentuk dokumentasi DummyJSON. Bentuk datanya sudah dicocokkan dengan dokumentasi, tetapi **belum pernah dipanggil ke server asli**. Coba langsung di iPhone yang terhubung internet.
- Modul (hlm. 16) sendiri mengingatkan bahwa tautan DummyJSON bisa saja tidak berfungsi lagi. Jika daftar gagal dimuat padahal internet normal, buka `https://dummyjson.com/products/category/mens-shirts` di browser. Kalau juga gagal, itu masalah server, bukan kode, dan aplikasi akan menampilkan pesan error + tombol *Coba Lagi*.
- Belum diuji di iPhone sungguhan (hanya bundle iOS dan simulasi web).

**Keterbatasan lain:**
- Tautan kode Codelab (project `anime-hunter`) dan "aplikasi dasar" di PDF adalah tautan eksternal yang tidak bisa diakses, jadi **tidak saya tiru atau karang**. Materi yang sama diterapkan ke tema Sablon. Codelab 1 (40%) dikerjakan di lab sesuai PDF.
- Daftar dibatasi 20 kaos (`limit=20`), tanpa halaman berikutnya.

---

## 8. Contoh pertanyaan asisten + jawaban (berdasarkan kode ini)

**1. Apa beda synchronous dan asynchronous?**
Synchronous: tugas berjalan berurutan, harus selesai dulu. Asynchronous: tugas yang lama (ambil data) berjalan di belakang, kode lain tetap jalan. Di aplikasi, layar tetap bisa tampil dengan *Loading* sementara data diambil.

**2. Apa itu Promise? Apa tiga statusnya?**
Objek yang mewakili nilai yang belum ada tapi dijanjikan. Status: pending (menunggu), resolved/fulfilled (sukses), rejected (gagal).

**3. Kenapa fungsi `async` mengembalikan Promise?**
Karena `async` otomatis membungkus nilai return ke Promise. Contoh: `getShirts()` bertipe `Promise<ApiResponse<ShirtProduct[]>>`, jadi harus dipanggil dengan `await` atau `.then()`.

**4. Apa fungsi `await`? Boleh dipakai di mana?**
Menunggu Promise selesai dan mengambil nilainya. Hanya di dalam `async function` (contoh `getShirts`, baris 30: `const raw = await getJson(...)`).

**5. Apa beda `resolve()` dan `reject()`? Tunjukkan di kode.**
`resolve` = sukses, `reject` = gagal. Di `services/api.ts`: baris 15 `resolve(response.json())` jika `response.ok`; baris 17 `reject(new Error(...))` jika status bukan 2xx.

**6. Kenapa tidak cukup memakai `fetch` langsung?**
`fetch` tidak menganggap 404/500 sebagai error, dan tidak punya batas waktu. `getJson` menambahkan `reject` untuk status gagal dan membatalkan permintaan setelah 10 detik (`AbortController`).

**7. Tunjukkan penggunaan `.then()` di aplikasi.**
`productService.ts` baris 48 dan 52 (dirantai: `.then` pertama memetakan data, `.then` kedua membungkus ke `ApiResponse`). Dipanggil di `app/inspirasi/[id].tsx` baris 31 dengan `.catch()` dan `.finally()`.

**8. Bedanya `try/catch` dengan `.catch()`?**
Fungsinya sama (menangkap error). `try/catch` dipakai bersama `await` (`getShirts`); `.catch()` dipakai pada rantai `.then()` (`[id].tsx`).

**9. Kenapa memakai interface? Apa bedanya `ApiProduct` dan `ShirtProduct`?**
Interface mendefinisikan bentuk objek agar tipe dicek editor. `ApiProduct` = bentuk mentah dari API (punya `brand?` opsional, `images`, dll.). `ShirtProduct` = bentuk yang dipakai aplikasi (hanya field yang perlu, `brand` selalu ada). `toShirtProduct` yang menerjemahkan.

**10. Apa fungsi `delay` dan di mana dipakai?**
`delay(ms)` membuat Promise yang selesai setelah `ms` milidetik. Dipakai di `getShirts()` (baris 35) untuk jeda 800 ms sebelum mencoba ulang.

**11. Kenapa `useEffect` memanggil `load()`, bukan langsung `await`?**
Callback `useEffect` tidak boleh `async`. Jadi fungsi async dibuat terpisah (`load`) lalu dipanggil di dalam effect. Dependency `[load]` tidak berubah (dibungkus `useCallback`), jadi tidak terjadi infinite loop.

**12. Apa gunanya `active` dan `mounted`?**
Mencegah `setState` setelah halaman ditutup (data datang terlambat). Cleanup effect mengubah `active` menjadi false.

**13. Dari mana halaman detail tahu kaos mana yang dibuka?**
Dari URL: `router.push({ pathname: '/inspirasi/[id]', params: { id } })`, dibaca dengan `useLocalSearchParams` (Modul 2).

**14. Apa yang terjadi jika internet mati?**
`fetch` gagal → `getJson` memanggil `reject` → `getShirts` menunggu 800 ms dengan `delay`, mencoba lagi, lalu mengembalikan `success: false` → layar menampilkan `ErrorMessage` dan tombol *Coba Lagi*.

**15. Apa itu endpoint dan HTTP method yang dipakai?**
Endpoint = URL tujuan request, mis. `https://dummyjson.com/products/category/mens-shirts`. Method yang dipakai hanya **GET** (mengambil data), sesuai fokus modul.

---

## 9. Contoh modifikasi kode yang mungkin diminta

| Permintaan | Yang diubah |
|---|---|
| Ganti jumlah kaos yang diambil | `?limit=20` di `productService.ts`:30 |
| Ganti kategori produk | `SHIRT_CATEGORY` di `productService.ts`:6 (mis. `'tops'`) |
| Ubah jumlah percobaan / jeda ulang | `MAX_ATTEMPTS` dan `RETRY_DELAY_MS` di `productService.ts`:7-8 |
| Ubah batas waktu request | `TIMEOUT_MS` di `services/api.ts`:2 |
| Tampilkan field tambahan (mis. diskon) | tambah `discountPercentage` di `ShirtProduct` (`types/product.ts`) dan di `toShirtProduct`, lalu tampilkan di `[id].tsx` |
| Tambah filter harga di daftar | tambah state dan kondisi baru di `useMemo` pada `app/inspirasi/index.tsx`:46 |
| Ubah teks pesan error | `services/api.ts`:17, 22-24 |
| Urutkan daftar dari rating tertinggi | tambah `.sort((a, b) => b.rating - a.rating)` pada hasil `useMemo` |
| Ubah `.then()` menjadi `async/await` (atau sebaliknya) | tulis ulang `getShirtById` / efek di `[id].tsx` |
| Ganti judul header halaman | `options={{ title: '...' }}` di `app/_layout.tsx`:31-32 |
| Hilangkan percobaan ulang | hapus `await delay(...)` dan set `MAX_ATTEMPTS = 1` |

---

## 10. Hal yang perlu dipelajari sebelum demo

1. Tulis ulang dengan tangan alur `getJson` (new Promise → fetch → then → resolve/reject) sampai kamu bisa menjelaskan tiap baris tanpa membaca.
2. Bedakan dengan jelas `await` vs `.then()` dan kapan `try/catch` vs `.catch()`.
3. Pahami tiga status Promise dan apa yang membuatnya berpindah status.
4. Ingat urutan tampil di layar: Loading → data / error.
5. Latihan mengubah `limit`, kategori, dan menambah satu field baru dari API ke layar, tanpa membuka modul atau memakai AI.
