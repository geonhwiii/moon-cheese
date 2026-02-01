import { queryOptions } from '@tanstack/react-query';
import { productDetailApi } from './product-detail-api';

export const productDetailQueryKeys = {
  detail: (id: string) => ['product-detail', id] as const,
};

export const productDetailQueryOptions = (id: string) =>
  queryOptions({
    queryKey: productDetailQueryKeys.detail(id),
    queryFn: () => productDetailApi.getProductDetail(id),
  });
