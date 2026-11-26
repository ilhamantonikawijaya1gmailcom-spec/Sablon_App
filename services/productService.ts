import { ApiResponse } from '../types/api';
import { ApiProduct, ApiProductList, ShirtProduct } from '../types/product';
import { delay } from '../utils/delay';
import { API_BASE_URL, getJson } from './api';

const SHIRT_CATEGORY = 'mens-shirts';
const MAX_ATTEMPTS = 2;
const RETRY_DELAY_MS = 800;

const errorMessage = (e: unknown) => (e instanceof Error ? e.message : 'Terjadi kesalahan tidak dikenal.');

// Mengubah data mentah API (ApiProduct) menjadi objek yang dipakai aplikasi (ShirtProduct).
const toShirtProduct = (p: ApiProduct): ShirtProduct => ({
  id: p.id,
  title: p.title,
  description: p.description,
  price: p.price,
  rating: p.rating,
  stock: p.stock,
  brand: p.brand ?? 'Tanpa merek',
  thumbnail: p.thumbnail,
});

// Versi async/await + try/catch. Jika gagal, dicoba ulang sekali setelah jeda (delay).
// Hasilnya selalu berbentuk ApiResponse, jadi pemanggil cukup memeriksa `success`.
export async function getShirts(): Promise<ApiResponse<ShirtProduct[]>> {
  let lastError = 'Gagal memuat data.';
  for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
    try {
      const raw = await getJson<ApiProductList>(`${API_BASE_URL}/products/category/${SHIRT_CATEGORY}?limit=20`);
      const data = raw.products.map(toShirtProduct);
      return { success: true, data, message: `${data.length} kaos berhasil dimuat.` };
    } catch (e) {
      lastError = errorMessage(e);
      if (attempt < MAX_ATTEMPTS) await delay(RETRY_DELAY_MS);
    }
  }
  return { success: false, data: [], message: lastError };
}

// Versi .then() + Promise.reject(). Jika gagal, Promise-nya ditolak (rejected),
// dan pemanggil menangkapnya dengan .catch().
export function getShirtById(id: number): Promise<ApiResponse<ShirtProduct>> {
  if (!Number.isInteger(id) || id <= 0) {
    return Promise.reject(new Error('ID kaos tidak valid.'));
  }
  return getJson<ApiProduct>(`${API_BASE_URL}/products/${id}`)
    .then((raw) => {
      if (raw.category !== SHIRT_CATEGORY) throw new Error('Produk ini bukan kaos.');
      return toShirtProduct(raw);
    })
    .then((data) => ({ success: true, data, message: 'Detail kaos berhasil dimuat.' }));
}
