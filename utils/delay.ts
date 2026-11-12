// Fungsi utility dari Modul 3: menunda eksekusi selama `ms` milidetik.
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
