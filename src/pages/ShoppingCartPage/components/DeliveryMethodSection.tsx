import { Flex, Stack, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { DeliveryIcon, RocketIcon } from '@/ui-lib/components/icons';
import { Price } from '@/components/Price';
import { useSuspenseQueries } from '@tanstack/react-query';
import { gradeShippingListQueryOptions, meQueryOptions } from '@/entities/grade/api/grade-queries';
import { productListQueryOptions } from '@/entities/product/api/product-queries';
import { useCartStore } from '@/stores/cart-store';
import { calculateDeliveryFee, type DeliveryMethod } from '../utils/calculate-delivery-fee';
import { calculateTotalAmount } from '../utils/calculate-total-amount';

interface DeliveryMethodSectionProps {
  selectedMethod: DeliveryMethod;
  onSelectMethod: (method: DeliveryMethod) => void;
}

function DeliveryMethodSection({ selectedMethod, onSelectMethod }: DeliveryMethodSectionProps) {
  const [{ data: me }, { data: productList }, { data: gradeShippingList }] = useSuspenseQueries({
    queries: [meQueryOptions(), productListQueryOptions(), gradeShippingListQueryOptions()],
  });
  const items = useCartStore(state => state.items);

  const totalAmount = calculateTotalAmount(items, productList);

  const expressFee = calculateDeliveryFee({ method: 'Express', grade: me.grade, totalAmount, gradeShippingList });
  const premiumFee = calculateDeliveryFee({ method: 'Premium', grade: me.grade, totalAmount, gradeShippingList });

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Text variant="H2_Bold">배송 방식</Text>

      <Spacing size={4} />

      <Stack gap={4}>
        <DeliveryItem
          title="Express"
          description="2~3일 후 도착 예정"
          icon={<DeliveryIcon size={28} />}
          price={expressFee}
          isSelected={selectedMethod === 'Express'}
          onClick={() => onSelectMethod('Express')}
        />
        <DeliveryItem
          title="Premium"
          description="당일 배송"
          icon={<RocketIcon size={28} />}
          price={premiumFee}
          isSelected={selectedMethod === 'Premium'}
          onClick={() => onSelectMethod('Premium')}
        />
      </Stack>
    </styled.section>
  );
}

function DeliveryItem({
  title,
  description,
  icon,
  price,
  isSelected,
  onClick,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  price: number;
  isSelected: boolean;
  onClick: () => void;
}) {
  return (
    <Flex
      gap={3}
      css={{
        alignItems: 'center',
        p: 5,
        py: 4,
        bgColor: isSelected ? 'primary.01_primary' : 'background.02_light-gray',
        transition: 'background-color 0.3s ease',
        rounded: '2xl',
        color: isSelected ? 'neutral.05_white' : 'neutral.01_black',
        cursor: 'pointer',
      }}
      role="button"
      onClick={onClick}
    >
      {icon}

      <Flex flexDir="column" gap={1} flex={1}>
        <Text variant="B2_Regular" fontWeight={'semibold'} color={isSelected ? 'neutral.05_white' : 'neutral.01_black'}>
          {title}
        </Text>
        <Text variant="C2_Medium" color={isSelected ? 'neutral.05_white' : 'neutral.02_gray'}>
          {description}
        </Text>
      </Flex>
      <Text variant="B2_Medium" fontWeight={'semibold'} color={isSelected ? 'neutral.05_white' : 'neutral.01_black'}>
        {price ? <Price amount={price} /> : '무료'}
      </Text>
    </Flex>
  );
}

export default DeliveryMethodSection;
