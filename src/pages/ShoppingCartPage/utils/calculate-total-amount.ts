import type { Product } from '@/entities/product/api/get-product';

interface CartItem {
  productId: number;
  quantity: number;
}

export function calculateTotalAmount(items: CartItem[], productList: Product[]): number {
  return items.reduce((sum, item) => {
    const product = productList.find(p => p.id === item.productId);
    return sum + (product?.price ?? 0) * item.quantity;
  }, 0);
}
