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

export interface CheeseProduct extends ProductBase {
  category: 'CHEESE';
}

export interface CrackerProduct extends ProductBase {
  category: 'CRACKER';
  isGlutenFree?: boolean;
}

export interface TeaProduct extends ProductBase {
  category: 'TEA';
  isCaffeineFree?: boolean;
}

export type Product = CheeseProduct | CrackerProduct | TeaProduct;

export interface ProductListResponse {
  products: Product[];
}

export interface RecommendProductIdsResponse {
  recommendProductIds: number[];
}

export const productApi = {
  getProductList: () => http.get<ProductListResponse>('/api/product/list'),
  getProductDetail: (id: string) => http.get<Product>(`/api/product/${id}`),
  getRecommendProductIds: (id: string) => http.get<RecommendProductIdsResponse>(`/api/product/recommend/${id}`),
};
