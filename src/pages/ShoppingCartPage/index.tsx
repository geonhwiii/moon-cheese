import { Suspense, useState } from 'react';
import CheckoutSection from './components/CheckoutSection';
import DeliveryMethodSection from './components/DeliveryMethodSection';
import ShoppingCartSection from './components/ShoppingCartSection';
import type { DeliveryMethod } from './utils/calculate-delivery-fee';

function ShoppingCartPage() {
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>('Express');

  return (
    <>
      <Suspense>
        <ShoppingCartSection />
      </Suspense>
      <Suspense>
        <DeliveryMethodSection selectedMethod={deliveryMethod} onSelectMethod={setDeliveryMethod} />
      </Suspense>
      <Suspense>
        <CheckoutSection deliveryMethod={deliveryMethod} />
      </Suspense>
    </>
  );
}

export default ShoppingCartPage;
