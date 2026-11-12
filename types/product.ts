// Bentuk data MENTAH dari DummyJSON (https://dummyjson.com/products/category/mens-shirts).
export interface ApiProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand?: string;      // tidak selalu ada di respons
  thumbnail: string;
  images: string[];
}

export interface ApiProductList {
  products: ApiProduct[];
  total: number;
  skip: number;
  limit: number;
}

// Bentuk data yang dipakai aplikasi (hasil rapikan dari ApiProduct).
export interface ShirtProduct {
  id: number;
  title: string;
  description: string;
  price: number;       // dalam USD, apa adanya dari API
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
}
