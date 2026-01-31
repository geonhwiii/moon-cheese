import { queryOptions } from '@tanstack/react-query';
import { http } from '@/utils/http';

interface MeResponse {
  point: number;
  grade: 'EXPLORER' | 'PILOT' | 'COMMANDER';
}

interface GradePointListResponse {
  gradePointList: {
    type: 'EXPLORER' | 'PILOT' | 'COMMANDER';
    minPoint: number;
  }[];
}

interface RecentPurchaseListResponse {
  recentProducts: {
    id: number;
    thumbnail: string;
    name: string;
    price: number;
  }[];
}

export const homeQueryKeys = {
  me: () => ['me'] as const,
  gradePointList: () => ['grade-point-list'] as const,
  recentPurchaseList: () => ['recent-purchase-list'] as const,
};

export const meQueryOptions = () =>
  queryOptions({
    queryKey: homeQueryKeys.me(),
    queryFn: () => http.get<MeResponse>('/api/me'),
  });

export const gradePointListQueryOptions = () =>
  queryOptions({
    queryKey: homeQueryKeys.gradePointList(),
    queryFn: () => http.get<GradePointListResponse>('/api/grade/point'),
    select: data => data.gradePointList,
  });

export const recentPurchaseListQueryOptions = () =>
  queryOptions({
    queryKey: homeQueryKeys.recentPurchaseList(),
    queryFn: () => http.get<RecentPurchaseListResponse>('/api/recent/product/list'),
    select: data => data.recentProducts,
  });
