import { queryOptions } from '@tanstack/react-query';
import { homeApi } from './home-api';

export const homeQueryKeys = {
  recentPurchaseList: () => ['recent-purchase-list'] as const,
};

export const recentPurchaseListQueryOptions = () =>
  queryOptions({
    queryKey: homeQueryKeys.recentPurchaseList(),
    queryFn: homeApi.getRecentPurchaseList,
    select: data => data.recentProducts,
  });
