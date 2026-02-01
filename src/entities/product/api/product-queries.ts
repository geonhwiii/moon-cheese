import { queryOptions } from '@tanstack/react-query';
import { productApi } from './get-product';

export const productQueryKeys = {
  all: () => ['product'] as const,
  list: () => [...productQueryKeys.all(), 'list'] as const,
  detail: (id: string) => [...productQueryKeys.all(), 'detail', id] as const,
  recommend: (id: string) => [...productQueryKeys.all(), 'recommend', id] as const,
};

export const productListQueryOptions = () =>
  queryOptions({
    queryKey: productQueryKeys.list(),
    queryFn: productApi.getProductList,
    select: data => data.products,
  });

export const productDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: productQueryKeys.detail(id),
    queryFn: () => productApi.getProductDetail(id),
  });

export const recommendProductIdsQueryOptions = (id: string) =>
  queryOptions({
    queryKey: productQueryKeys.recommend(id),
    queryFn: () => productApi.getRecommendProductIds(id),
    select: data => data.recommendProductIds,
  });
