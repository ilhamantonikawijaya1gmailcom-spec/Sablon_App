// Bentuk pembungkus hasil pemanggilan service (sesuai contoh Modul 3: types/api.ts).
export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message: string;
}
