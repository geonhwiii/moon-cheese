import { http } from '@/utils/http';

interface ProductBase {
  id: number;
  name: string;
  stock: number;
  price: number;
  description: string;
  detailDescription: string;
  images: string[];
  rating: number;
}

export interface CheeseProductDetail extends ProductBase {
  category: 'CHEESE';
}

export interface CrackerProductDetail extends ProductBase {
  category: 'CRACKER';
  isGlutenFree?: boolean;
}

export interface TeaProductDetail extends ProductBase {
  category: 'TEA';
  isCaffeineFree?: boolean;
}

export type ProductDetail = CheeseProductDetail | CrackerProductDetail | TeaProductDetail;

export const productDetailApi = {
  getProductDetail: (id: string) => http.get<ProductDetail>(`/api/product/${id}`),
};
