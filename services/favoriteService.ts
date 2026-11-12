import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'sablon_favorite_shirts_v1';

// AsyncStorage.getItem / setItem adalah contoh pre-built async function: hasilnya Promise, jadi dipakai dengan await.
export async function getFavoriteIds(): Promise<number[]> {
  try {
    const raw = await AsyncStorage.getItem(KEY);
    const parsed: unknown = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed.filter((v): v is number => typeof v === 'number') : [];
  } catch {
    return [];
  }
}

// Menambah id jika belum ada, menghapus jika sudah ada. Mengembalikan daftar terbaru.
export async function toggleFavorite(id: number): Promise<number[]> {
  const current = await getFavoriteIds();
  const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
  await AsyncStorage.setItem(KEY, JSON.stringify(next));
  return next;
}
