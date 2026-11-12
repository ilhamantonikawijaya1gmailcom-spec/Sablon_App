import { ApiResult, ShirtProduct } from '@/types/product';

const BASE_URL = 'https://dummyjson.com/products';

// DummyJSON kadang tidak mengisi brand; beri nilai bawaan agar p.brand.toLowerCase() tidak error.
const normalize = (p: any): ShirtProduct => ({
  id: p.id,
  title: p.title ?? '',
  brand: p.brand ?? 'Tanpa merek',
  description: p.description ?? '',
  category: p.category ?? '',
  price: p.price ?? 0,
  rating: p.rating ?? 0,
  stock: p.stock ?? 0,
  thumbnail: p.thumbnail ?? '',
  images: p.images ?? [],
});

export async function getShirts(): Promise<ApiResult<ShirtProduct[]>> {
  try {
    const res = await fetch(`${BASE_URL}/category/mens-shirts`);
    if (!res.ok) return { success: false, message: `Gagal memuat data (HTTP ${res.status}).` };
    const json = await res.json();
    return { success: true, data: (json.products ?? []).map(normalize) };
  } catch {
    return { success: false, message: 'Tidak bisa terhubung ke server. Periksa koneksi internet.' };
  }
}

export async function getShirtById(id: number | string): Promise<ApiResult<ShirtProduct>> {
  try {
    const res = await fetch(`${BASE_URL}/${id}`);
    if (!res.ok) return { success: false, message: `Kaos tidak ditemukan (HTTP ${res.status}).` };
    return { success: true, data: normalize(await res.json()) };
  } catch {
    return { success: false, message: 'Tidak bisa terhubung ke server. Periksa koneksi internet.' };
  }
}