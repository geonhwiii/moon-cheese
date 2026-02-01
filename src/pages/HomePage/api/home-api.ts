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

export const homeApi = {
  getMe: () => http.get<MeResponse>('/api/me'),
  getGradePointList: () => http.get<GradePointListResponse>('/api/grade/point'),
  getRecentPurchaseList: () => http.get<RecentPurchaseListResponse>('/api/recent/product/list'),
};
