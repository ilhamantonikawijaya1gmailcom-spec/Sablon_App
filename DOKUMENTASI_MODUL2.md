# Dokumentasi Demo — Modul 2 (State, Hooks, & Navigasi Page) pada Sablon_App

Dokumen ini ditulis berdasarkan kode yang **benar-benar ada** di project. Nomor baris adalah posisi saat dokumen dibuat dan bisa bergeser sedikit jika kode diubah.

---

## 0. Yang berubah dibanding Modul 1 (ringkas)

Saat dianalisis, project ini ternyata **sudah memakai sebagian materi Modul 2**. Bagian itu dipertahankan, dan hanya yang belum ada yang ditambahkan.

| Sudah ada sebelumnya | Ditambahkan sekarang |
|---|---|
| `useState`, `useEffect` (order-success), `createContext`/`useContext` (DraftContext), `useMemo` (admin), `useLocalSearchParams` (`orders/[id]`, order-success), `router.push/back/replace/canGoBack`, `_layout.tsx` + `Stack.Screen` | `Link`, `useRef`, `router.setParams()`, `router.dismissTo()`, catch-all route, route group, modal, nested layout, `useEffect` dengan cleanup, `useMemo` untuk filter/cari |

**File baru:** `app/(info)/bantuan/_layout.tsx`, `app/(info)/bantuan/index.tsx`, `app/(info)/bantuan/[...slug].tsx`, `data/helpTopics.ts`
**File diubah:** `app/_layout.tsx`, `app/index.tsx`, `app/order-success.tsx`, `app/order-confirmation.tsx`, `app/orders/index.tsx`, `components/Btn.tsx` (hanya `onPress` dibuat opsional)

---

## 1 & 2. Materi yang diterapkan dan lokasinya

| Materi Modul 2 | File : baris | Dipakai untuk apa |
|---|---|---|
| **useState** | `app/orders/index.tsx`:19-21 · `app/order-confirmation.tsx`:17-20 · `context/DraftContext.tsx`:16 | Daftar pesanan, kata kunci cari, jumlah kaos (`qty`), isi form, pesan error, status loading |
| **useEffect** | `app/order-success.tsx`:15 · `app/orders/index.tsx`:27-30 | Mengambil data pesanan saat halaman tampil; menunda pencarian 300 ms (debounce) dengan *cleanup* |
| **useRef** | `app/orders/index.tsx`:22 · `app/order-confirmation.tsx`:22-23 | Memfokuskan kolom cari setelah "Hapus Pencarian"; pindah fokus Nama → WhatsApp → Alamat lewat tombol *Next* keyboard |
| **useContext** (+ `createContext`, Provider) | `context/DraftContext.tsx`:13-23 · dibungkus di `app/_layout.tsx`:10 | Draft kaos (model, warna, ukuran, desain, posisi) dibagikan ke 5 halaman tanpa *prop drilling* |
| **useMemo** | `app/orders/index.tsx`:33 · `app/admin.tsx`:16 | Menyaring daftar pesanan (status + kata kunci); ringkasan jumlah pesanan per status di Admin |
| **useLocalSearchParams** | `app/orders/[id].tsx`:12 · `app/order-success.tsx`:13 · `app/orders/index.tsx`:16 · `app/(info)/bantuan/[...slug].tsx`:13 | Membaca `id` pesanan, filter `status`, dan `slug` bantuan dari URL |
| **Normal page** | `app/admin.tsx`, `app/shirt-selection.tsx`, `app/upload-design.tsx`, dll. | Halaman biasa → `/admin`, `/shirt-selection`, ... |
| **Index page** | `app/index.tsx` (`/`), `app/orders/index.tsx` (`/orders`), `app/(info)/bantuan/index.tsx` (`/bantuan`) | Halaman default sebuah folder |
| **Private route** | semua `_layout.tsx` | Diawali `_`, tidak bisa dibuka lewat URL |
| **Route group** | folder `app/(info)/` | `(info)` tidak muncul di URL: file ada di `(info)/bantuan/` tapi URL-nya `/bantuan` |
| **Dynamic route** | `app/orders/[id].tsx` | `/orders/#SB-0001`, `/orders/#SB-0002`, ... memakai satu file |
| **Catch-all route** | `app/(info)/bantuan/[...slug].tsx` | Satu file menangani `/bantuan/cara-pesan`, `/bantuan/ukuran`, `/bantuan/ukuran/regular`, dst. |
| **Layout page** | `app/_layout.tsx` (root) · `app/(info)/bantuan/_layout.tsx` (nested) | Root membungkus semua halaman; bantuan punya Stack sendiri |
| **Link** | `app/index.tsx`:18,21 · `app/order-success.tsx`:24 · `app/(info)/bantuan/index.tsx`:15 · `[...slug].tsx`:28 | Navigasi deklaratif |
| **router.push()** | `app/index.tsx`:16,25 · `shirt-selection.tsx`:19 · `upload-design.tsx`:21 · `mockup-editor.tsx`:49 · `orders/index.tsx`:63 | Membuka halaman baru di atas stack |
| **router.back()** | `app/upload-design.tsx`:20 · `app/admin.tsx`:21 · `[...slug].tsx`:18 | Kembali satu halaman |
| **router.replace()** | `order-confirmation.tsx`:39 · `order-success.tsx`:27-28 · `admin.tsx`:21 | Mengganti halaman (tidak bisa "back" ke form) |
| **router.canGoBack()** | `app/admin.tsx`:21 · `[...slug].tsx`:18 | Cek aman sebelum `back()` |
| **router.setParams()** | `app/orders/index.tsx`:42 | Ganti filter status di URL tanpa pindah halaman |
| **router.dismissTo()** | `app/(info)/bantuan/_layout.tsx`:19 | Menutup modal Bantuan |
| **Stack + Stack.Screen** | `app/_layout.tsx`:12-33 · `app/(info)/bantuan/_layout.tsx`:11-27 | Mengatur judul, header, dan presentasi modal |

---

## 3. Fungsi setiap hook (bahasa sederhana)

- **useState** — "kotak ingatan" komponen. Kalau nilainya diubah lewat fungsi setter, layar digambar ulang otomatis.
- **useEffect** — "lakukan sesuatu setelah layar tampil / setelah nilai tertentu berubah". Nilai yang dipantau ditaruh di *dependency array* `[...]`.
- **useRef** — kotak ingatan yang **tidak** menggambar ulang layar saat diubah. Cocok untuk menyimpan referensi ke elemen (misalnya `TextInput`).
- **useContext** — mengambil data bersama dari Provider terdekat, jadi tidak perlu mengoper props lewat banyak komponen.
- **useMemo** — menyimpan hasil hitungan; hanya dihitung ulang kalau dependency-nya berubah.
- **useLocalSearchParams** — membaca parameter dari URL halaman yang sedang aktif.

---

## 4. Cara kerja `useState` dan `useEffect` di aplikasi ini

**useState — kuantitas di `order-confirmation.tsx`**
```tsx
const [qty, setQty] = useState(1);                       // nilai awal 1
<Btn title="+" onPress={() => setQty(qty + 1)} />       // ubah lewat setter
<Text>{qty}</Text>                                       // tampilan ikut berubah
```
Tombol ditekan → `setQty` mengubah state → React menggambar ulang → angka di layar berubah. Kalau hanya memakai variabel biasa, angka di layar **tidak** berubah.

**useEffect — memuat pesanan di `order-success.tsx`**
```tsx
const [o, setO] = useState<Order | null>(null);
useEffect(() => { getOrder(id).then(setO); }, [id]);
```
Urutannya: halaman tampil (kosong) → effect jalan, ambil pesanan dari AsyncStorage → `setO` mengisi state → layar digambar ulang dengan data. Dependency `[id]` artinya effect hanya diulang jika `id` berubah, jadi **tidak terjadi infinite loop**.

**useEffect dengan cleanup — pencarian di `orders/index.tsx`**
```tsx
useEffect(() => {
  const t = setTimeout(() => setDebounced(query.trim().toLowerCase()), 300);
  return () => clearTimeout(t);   // cleanup: batalkan timer lama saat user mengetik lagi
}, [query]);
```
Setiap ketikan membuat timer baru dan membatalkan yang lama; daftar baru disaring setelah user berhenti mengetik 300 ms.

---

## 5. `router.push()` dan `router.back()`

- `router.push('/shirt-selection')` menaruh halaman baru **di atas** tumpukan (stack) halaman. Halaman sebelumnya tetap ada di bawahnya.
- `router.back()` membuang halaman teratas, sehingga kembali ke halaman di bawahnya.

Contoh alur: Beranda → `push` Pilih Baju → `push` Upload Design → `back` → kembali ke Pilih Baju.
Alasan dipakai: pembuatan pesanan adalah alur bertahap, user perlu bisa mundur ke langkah sebelumnya.

---

## 6. Fungsi router tambahan

| Fungsi | Alasan di aplikasi ini |
|---|---|
| `replace()` | Setelah pesanan terkirim, `replace` ke halaman sukses agar tombol back **tidak** membawa user kembali ke form dan mengirim ulang pesanan (sesuai contoh checkout di modul). |
| `canGoBack()` | Admin & Bantuan bisa dibuka langsung tanpa riwayat. Jika tidak ada halaman untuk kembali, dipakai `replace` ke halaman aman. |
| `setParams()` | Chip filter di "Pesanan Saya" mengubah `?status=...` di route aktif **tanpa pindah halaman**. |
| `dismissTo('/')` | Tombol "Tutup" di modal Bantuan: langsung kembali ke Beranda dari halaman sedalam apa pun. |

> **Catatan keterbatasan (diuji langsung).** Pada versi expo-router yang terpasang, `router.dismiss()` hanya membuang sejumlah halaman (default 1) pada stack yang sedang aktif. Jadi dari `/bantuan/cara-pesan`, `dismiss()` hanya mundur ke `/bantuan`, tidak menutup seluruh modal. Karena itu tombol "Tutup" memakai `dismissTo('/')`. `dismissTo` juga disebut di halaman 37 modul.

---

## 7. `_layout.tsx` dan `<Stack.Screen>`

`app/_layout.tsx` adalah **layout root**. Semua file di `app/` menjadi anak-anaknya.
- `<DraftProvider>` membungkus semuanya supaya Context tersedia di semua halaman.
- `<Stack>` membuat navigasi bertumpuk (ada header dan tombol back).
- `<Stack.Screen name="..." options={{...}} />` mengatur satu halaman. `name` = nama file/route, `options` = judul, header, gesture, dsb.

Contoh dari kode:
```tsx
<Stack.Screen name="orders/[id]" options={{ title: 'Detail Pesanan' }} />
<Stack.Screen name="order-success" options={{ title: 'Berhasil', headerBackVisible: false, gestureEnabled: false }} />
<Stack.Screen name="(info)/bantuan" options={{ presentation: 'modal', headerShown: false }} />
```
- `headerShown: false` pada Beranda dan Bantuan: header disembunyikan (Bantuan punya header sendiri).
- `presentation: 'modal'` membuat Bantuan muncul seperti kartu dari bawah di iPhone.

`app/(info)/bantuan/_layout.tsx` adalah **layout bersarang (nested stack)**: Stack kedua yang hanya mengelola halaman di dalam folder bantuan (`index` dan `[...slug]`).

---

## 8. Dynamic route dan `useLocalSearchParams`

File `app/orders/[id].tsx` — nama `[id]` adalah **parameter dinamis**.
```tsx
// Dari daftar pesanan:
router.push({ pathname: '/orders/[id]', params: { id: o.id } });
// Di halaman detail:
const { id } = useLocalSearchParams<{ id: string }>();
getOrder(id).then(setO);            // cari pesanan dengan id itu di AsyncStorage
```
Satu file melayani semua pesanan. `<{ id: string }>` memberi tahu TypeScript bahwa parameternya bernama `id` bertipe string.

**Catch-all** `[...slug].tsx`: tanda `...` berarti "tangkap semua tingkat path". Nilainya berupa **array**:

| URL | `slug` |
|---|---|
| `/bantuan/cara-pesan` | `['cara-pesan']` |
| `/bantuan/ukuran/regular` | `['ukuran', 'regular']` |

Isinya diselesaikan oleh `resolveHelp(slug)` di `data/helpTopics.ts`. Daftar ukuran **diambil dari data `shirtTemplates`**, bukan data karangan. Jika slug tidak dikenal, tampil "Halaman tidak ditemukan".

**Query parameter:** `/orders?status=printing` → `useLocalSearchParams` membaca `status = 'printing'`.

---

## 9. Langkah demonstrasi di iPhone (Expo Go)

Jalankan: `npx expo start --go`, lalu scan QR dengan Expo Go. (Jika belum punya pesanan, buat satu dulu lewat langkah 1.)

1. **useState + Context + push/back + replace** — Beranda → *Mulai Design* → pilih model/warna/ukuran (state di `DraftContext`) → *Lanjutkan* (`push`) → *Choose from Gallery*, pilih gambar → *Kembali* (`back`), lalu *Gunakan Design* → atur desain → *Konfirmasi Design* → di *Quantity* tekan **+** (state `qty` berubah) → isi form, tekan *Next* di keyboard (**useRef** memindahkan fokus Nama → WhatsApp → Alamat) → *Kirim Pesanan* (`replace` ke halaman sukses; tombol back tidak ada).
2. **useEffect + Link + dynamic route** — di halaman sukses, data pesanan muncul setelah dimuat (`useEffect`). Tekan *Lihat Detail Pesanan* (**Link** dengan `pathname` + `params`) → halaman `/orders/[id]` menampilkan pesanan sesuai ID (**useLocalSearchParams**).
3. **useMemo + useEffect (debounce) + useRef** — Beranda → *Pesanan Saya* (**Link**). Ketik nama di kolom cari: jumlah "Menampilkan X dari Y pesanan" berubah setelah jeda ketik. Ketik kata yang tidak ada → *Hapus Pencarian*: kolom cari kosong dan langsung terfokus (**useRef**).
4. **setParams** — di *Pesanan Saya*, tekan chip *Proses Sablon*: daftar tersaring tanpa pindah halaman. Tekan *Semua* untuk mereset. (Tambahkan beberapa pesanan dengan status berbeda lewat menu Admin.)
5. **push dengan parameter** — tekan salah satu kartu pesanan → detail terbuka (`push` ke `/orders/[id]`) → tombol back di header (kembali ke daftar).
6. **Catch-all + modal + Layout bersarang + dismissTo** — Beranda → *Bantuan* (modal naik dari bawah) → *Panduan Ukuran* → *Kaos Regular* (path 2 tingkat, `slug = ['ukuran','regular']`; ukuran S, M, L, XL sesuai data template) → *Kembali* (`canGoBack` → `back`) → *Tutup* di kanan atas (`dismissTo('/')`, kembali ke Beranda).
7. **canGoBack** — Beranda → *Admin* (ringkasan di atas dihitung `useMemo`) → ubah status pesanan → *Kembali*.

---

## 10. Contoh pertanyaan asisten praktikum dan jawabannya

**1. Apa beda `useState` dan `useRef`?**
`useState` menyimpan nilai yang kalau berubah **menggambar ulang** layar (contoh: `qty`, `query`). `useRef` menyimpan nilai/referensi yang kalau berubah **tidak** menggambar ulang layar (contoh: `searchRef` yang menunjuk ke TextInput untuk `.focus()`).

**2. Kenapa `[query]` di akhir `useEffect` pada `orders/index.tsx`?**
Itu dependency array. Effect hanya dijalankan ulang ketika `query` berubah. Kalau array kosong `[]`, effect hanya jalan sekali saat pertama tampil. Kalau tidak ada array, effect jalan setiap render.

**3. Apa fungsi `return () => clearTimeout(t)` di effect itu?**
Cleanup: dijalankan sebelum effect berikutnya. Timer yang lama dibatalkan, jadi hanya ketikan terakhir yang menyaring daftar.

**4. Apa beda `push` dan `replace`?**
`push` menambah halaman di atas stack (bisa kembali). `replace` mengganti halaman saat ini (tidak bisa kembali). Dipakai `replace` setelah kirim pesanan, di `order-confirmation.tsx` baris 39.

**5. Kapan `canGoBack()` dipakai?**
Sebelum `back()` bila halaman bisa dibuka langsung tanpa riwayat. Contoh `admin.tsx` baris 21: jika tidak bisa kembali, `replace('/')`.

**6. Apa fungsi `setParams`? Apa bedanya dengan `push`?**
`setParams` mengubah parameter route yang sedang aktif tanpa pindah halaman (`router.setParams({ status: 'printing' })`). `push` membuka halaman baru.

**7. Kenapa folder `(info)` tidak ada di URL?**
Folder dengan tanda kurung adalah *route group*: hanya mengelompokkan file. URL tetap `/bantuan`.

**8. Beda `[id].tsx` dan `[...slug].tsx`?**
`[id]` menangkap **satu** segmen (`/orders/#SB-0001`, `id` berupa string). `[...slug]` menangkap **semua tingkat** (`/bantuan/ukuran/regular`, `slug` berupa array).

**9. Kenapa Bantuan butuh `_layout.tsx` sendiri?**
Itu nested stack. Di root layout folder ini dibuka sebagai modal (`presentation: 'modal'`), sementara di dalamnya halaman-halamannya punya Stack dan header sendiri (judul, tombol Tutup).

**10. Bagaimana Context menghindari prop drilling?**
`DraftProvider` di `_layout.tsx` membungkus semua halaman. Halaman mana pun cukup memanggil `useDraft()` (yang berisi `useContext`) tanpa menerima props dari halaman induk.

**11. Kenapa `useMemo` di `orders/index.tsx`?**
Agar hasil `filter` tidak dihitung ulang setiap render. Dependency-nya `[orders, activeStatus, debounced]`; hanya jika salah satunya berubah, daftar dihitung ulang.

### Contoh modifikasi kode yang mungkin diminta (dan letaknya)

| Permintaan | Yang diubah |
|---|---|
| Ganti judul halaman | `options={{ title: '...' }}` di `app/_layout.tsx` |
| Ubah waktu debounce | angka `300` di `orders/index.tsx`:28 |
| Tambah chip/filter baru | tambahkan status di `STATUS_FLOW` (`types/order.ts`); chip dibuat otomatis lewat `.map` |
| Tambah topik bantuan baru | tambah cabang di `resolveHelp` dan item di `helpTopics` (`data/helpTopics.ts`) |
| Ubah qty minimal/maksimal | `setQty(Math.max(1, qty - 1))` di `order-confirmation.tsx` |
| Buat halaman jadi/bukan modal | `presentation: 'modal'` di `app/_layout.tsx`:32 |
| Ganti `push` jadi `replace` | ganti pemanggilan router di tombol terkait |
| Tampilkan `Link` sebagai teks biasa | ganti `<Link asChild>…</Link>` menjadi `<Link href="/orders">Pesanan Saya</Link>` |

---

## Pengujian yang sudah dilakukan

- `npx tsc --noEmit` → **lulus, 0 error**.
- `npx expo-doctor` → 18 dari 20 pemeriksaan lulus. Dua sisanya (validasi skema config dan metadata React Native Directory) gagal hanya karena sandbox tempat pengujian tidak punya akses ke server Expo. **Jalankan ulang `npx expo-doctor` di komputermu.**
- `npx expo export --platform ios` → bundle iOS berhasil dibuat (semua import dan route valid).
- `npx expo start --go` → Metro berjalan dan manifest dilayani (HTTP 200).
- Pengujian otomatis interaksi (di mode web dengan Playwright, 20 skenario, semua lulus tanpa warning di console): Link, push/back, setParams (URL berubah dan kembali bersih), dynamic route, catch-all 1 dan 2 tingkat plus slug tak dikenal, dismissTo, canGoBack (dengan dan tanpa riwayat), useMemo/useEffect pada filter, ubah status di Admin.

**Belum diuji:** perilaku di perangkat iPhone sesungguhnya (animasi modal, keyboard *Next*, galeri). Alur upload gambar dan kirim pesanan hanya diperiksa lewat kode dan bundle, bukan dijalankan end-to-end. Mohon dicoba langsung lewat Expo Go dengan langkah demo di atas.

## Keterbatasan

- Tautan kode Codelab/Praktik di PDF (`styles/page.ts`, `PageButton.tsx`, dst.) adalah tautan eksternal yang tidak bisa diakses, jadi isinya **tidak dikarang**. Project Praktik (aplikasi dokumentasi) tidak dibuat ulang; konsep catch-all-nya diterapkan langsung pada fitur Bantuan.
- Folder `(info)` hanya berisi satu fitur (`bantuan`). Ia sengaja dipertahankan untuk menunjukkan route group, dan bisa diisi halaman info lain (mis. "Tentang") di modul berikutnya.
- Modul (hlm. 42) menyebut saat demo tidak boleh membuka modul atau memakai AI di code editor. Pelajari dokumen ini dan pahami kodenya sebelum demo.
