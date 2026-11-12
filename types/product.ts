export type ShirtProduct = {
  id: number;
  title: string;
  brand: string;
  description: string;
  category: string;
  price: number;
  rating: number;
  stock: number;
  thumbnail: string;
  images: string[];
};

export type ApiResult<T> =
  | { success: true; data: T }
  | { success: false; message: string };