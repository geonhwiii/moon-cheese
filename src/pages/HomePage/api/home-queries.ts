import { queryOptions } from '@tanstack/react-query';
import { homeApi } from './home-api';

export const homeQueryKeys = {
  me: () => ['me'] as const,
  gradePointList: () => ['grade-point-list'] as const,
  recentPurchaseList: () => ['recent-purchase-list'] as const,
};

export const meQueryOptions = () =>
  queryOptions({
    queryKey: homeQueryKeys.me(),
    queryFn: homeApi.getMe,
  });

export const gradePointListQueryOptions = () =>
  queryOptions({
    queryKey: homeQueryKeys.gradePointList(),
    queryFn: homeApi.getGradePointList,
    select: data => data.gradePointList,
  });

export const recentPurchaseListQueryOptions = () =>
  queryOptions({
    queryKey: homeQueryKeys.recentPurchaseList(),
    queryFn: homeApi.getRecentPurchaseList,
    select: data => data.recentProducts,
  });
