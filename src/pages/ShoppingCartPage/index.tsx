import { useState } from 'react';
import AsyncBoundary from '@/components/AsyncBoundary';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import ShoppingCartSection from './components/ShoppingCartSection';
import type { DeliveryMethod } from './utils/calculate-delivery-fee';

export default function ShoppingCartPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Express');

  return (
    <AsyncBoundary>
      <ShoppingCartSection />
      <DeliveryMethodSection selectedMethod={deliveryMethod} onSelectMethod={setDeliveryMethod} />
      <CheckoutSection deliveryMethod={deliveryMethod} />
    </AsyncBoundary>
  );
}
