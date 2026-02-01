import { useNavigate } from 'react-router';
import { Box, Divider, Flex, HStack, Stack, styled } from 'styled-system/jsx';
import { Button, Spacing, Text } from '@/ui-lib';
import { toast } from '@/ui-lib/components/toast';
import { useSuspenseQueries, useSuspenseQuery } from '@tanstack/react-query';
import { gradeShippingListQueryOptions, meQueryOptions } from '@/entities/grade/api/grade-queries';
import { productListQueryOptions } from '@/entities/product/api/product-queries';
import { usePurchaseMutation } from '@/entities/product/api/product-mutations';
import { useCartStore } from '@/stores/cart-store';
import { Price } from '@/components/Price';
import { calculateDeliveryFee, type DeliveryMethod } from '../utils/calculate-delivery-fee';
import { calculateTotalAmount } from '../utils/calculate-total-amount';
import type { DeliveryType } from '@/entities/product/api/post-product';

interface CheckoutSectionProps {
  deliveryMethod: DeliveryMethod;
}

export default function CheckoutSection({ deliveryMethod }: CheckoutSectionProps) {
  const navigate = useNavigate();

  const [{ data: me }, { data: productList }, { data: gradeShippingList }] = useSuspenseQueries({
    queries: [meQueryOptions(), productListQueryOptions(), gradeShippingListQueryOptions()],
  });

  const { items, totalCount, clearCart } = useCartStore();

  const purchaseMutation = usePurchaseMutation();

  const totalAmount = calculateTotalAmount(items, productList);

  const deliveryFee = calculateDeliveryFee({ method: deliveryMethod, grade: me.grade, totalAmount, gradeShippingList });
  const totalPrice = totalAmount + deliveryFee;

  const onPurchase = () => {
    purchaseMutation.mutate(
      {
        deliveryType: deliveryMethod.toUpperCase() as DeliveryType,
        totalPrice,
        items: items.map(item => ({ productId: item.productId, quantity: item.quantity })),
      },
      {
        onSuccess: () => {
          clearCart();
          toast.success('결제가 완료되었습니다.');
          navigate('/');
        },
        onError: () => {
          toast.error('결제에 실패했습니다.');
        },
      }
    );
  };

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Text variant="H2_Bold">결제금액</Text>

      <Spacing size={4} />

      <Stack
        gap={6}
        css={{
          p: 5,
          border: '1px solid',
          borderColor: 'border.01_gray',
          rounded: '2xl',
        }}
      >
        <Stack gap={5}>
          <Box gap={3}>
            <Flex justify="space-between">
              <Text variant="B2_Regular">주문금액({totalCount}개)</Text>
              <Text variant="B2_Bold">
                <Price amount={totalAmount} />
              </Text>
            </Flex>
            <Spacing size={3} />
            <Flex justify="space-between">
              <Text variant="B2_Regular">배송비</Text>
              <Text variant="B2_Bold" color={deliveryFee === 0 ? 'state.green' : undefined}>
                {deliveryFee === 0 ? '무료' : <Price amount={deliveryFee} />}
              </Text>
            </Flex>
          </Box>

          <Divider color="border.01_gray" />

          <HStack justify="space-between">
            <Text variant="H2_Bold">총 금액</Text>
            <Text variant="H2_Bold">
              <Price amount={totalPrice} />
            </Text>
          </HStack>
        </Stack>

        <Button fullWidth size="lg" loading={purchaseMutation.isPending} onClick={onPurchase}>
          {purchaseMutation.isPending ? '결제 중...' : '결제 진행'}
        </Button>

        <Text variant="C2_Regular" color="neutral.03_gray">
          {`우리는 신용카드, 은행 송금, 모바일 결제, 현금을 받아들입니다\n안전한 체크아웃\n귀하의 결제 정보는 암호화되어 안전합니다.`}
        </Text>
      </Stack>
    </styled.section>
  );
}
