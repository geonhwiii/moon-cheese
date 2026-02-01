import { Suspense, useState } from 'react';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import ShoppingCartSection from './components/ShoppingCartSection';
import type { DeliveryMethod } from './utils/calculate-delivery-fee';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorSection from '@/components/ErrorSection';

export default function ShoppingCartPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Express');

  return (
    <ErrorBoundary FallbackComponent={() => <ErrorSection />}>
      <Suspense>
        <ShoppingCartSection />
      </Suspense>
      <Suspense>
        <DeliveryMethodSection selectedMethod={deliveryMethod} onSelectMethod={setDeliveryMethod} />
      </Suspense>
      <Suspense>
        <CheckoutSection deliveryMethod={deliveryMethod} />
      </Suspense>
    </ErrorBoundary>
  );
}
