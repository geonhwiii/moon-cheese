import { http } from '@/utils/http';

export interface RecentPurchaseListResponse {
  recentProducts: {
    id: number;
    thumbnail: string;
    name: string;
    price: number;
  }[];
}

export const homeApi = {
  getRecentPurchaseList: () => http.get<RecentPurchaseListResponse>('/api/recent/product/list'),
};
