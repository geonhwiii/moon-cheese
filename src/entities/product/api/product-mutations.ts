import { useMutation } from '@tanstack/react-query';
import { productMutationApi, type PurchaseRequest } from './post-product';

export const usePurchaseMutation = () => {
  return useMutation({
    mutationFn: (data: PurchaseRequest) => productMutationApi.purchase(data),
  });
};
