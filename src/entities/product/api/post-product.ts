import { http } from '@/utils/http';

export type DeliveryType = 'EXPRESS' | 'PREMIUM';

export interface PurchaseItem {
  productId: number;
  quantity: number;
}

export interface PurchaseRequest {
  deliveryType: DeliveryType;
  totalPrice: number;
  items: PurchaseItem[];
}

export const productMutationApi = {
  purchase: (data: PurchaseRequest) => http.post('/api/product/purchase', data),
};
