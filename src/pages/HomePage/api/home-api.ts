import { http } from '@/utils/http';

export interface MeResponse {
  point: number;
  grade: 'EXPLORER' | 'PILOT' | 'COMMANDER';
}

export interface GradePointListResponse {
  gradePointList: {
    type: 'EXPLORER' | 'PILOT' | 'COMMANDER';
    minPoint: number;
  }[];
}

export interface RecentPurchaseListResponse {
  recentProducts: {
    id: number;
    thumbnail: string;
    name: string;
    price: number;
  }[];
}

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

export const homeApi = {
  getMe: () => http.get<MeResponse>('/api/me'),
  getGradePointList: () => http.get<GradePointListResponse>('/api/grade/point'),
  getRecentPurchaseList: () => http.get<RecentPurchaseListResponse>('/api/recent/product/list'),
  getProductList: () => http.get<ProductListResponse>('/api/product/list'),
};
