export const API_BASE_URL = 'https://dummyjson.com';
const TIMEOUT_MS = 10000;

// Fungsi async buatan sendiri: membungkus fetch() dengan Promise constructor (pola getUser() di Modul 3).
// resolve() dipanggil saat sukses, reject() dipanggil saat gagal.
export function getJson<T>(url: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    // fetch() tidak punya batas waktu bawaan, jadi kita batalkan sendiri jika server terlalu lama.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), TIMEOUT_MS);

    fetch(url, { signal: controller.signal })
      .then((response) => {
        if (response.ok) {
          resolve(response.json() as Promise<T>);
        } else {
          reject(new Error(`Server membalas dengan status ${response.status}.`));
        }
      })
      .catch((error: unknown) => {
        const timedOut = error instanceof Error && error.name === 'AbortError';
        reject(new Error(timedOut
          ? 'Server terlalu lama merespons.'
          : 'Tidak dapat terhubung ke server. Periksa koneksi internet.'));
      })
      .finally(() => clearTimeout(timer));
  });
}
