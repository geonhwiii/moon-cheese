import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Divider, Flex, HStack, Stack, styled } from 'styled-system/jsx';
import { SECOND } from '@/constants/time';
import { Button, Spacing, Text } from '@/ui-lib';
import { toast } from '@/ui-lib/components/toast';
import { delay } from '@/utils/async';
import { useSuspenseQuery } from '@tanstack/react-query';
import { gradeShippingListQueryOptions, meQueryOptions } from '@/entities/grade/api/grade-queries';
import { productListQueryOptions } from '@/entities/product/api/product-queries';
import { useCartStore } from '@/stores/cart-store';
import { Price } from '@/components/Price';
import { calculateDeliveryFee, type DeliveryMethod } from '../utils/calculate-delivery-fee';
import { calculateTotalAmount } from '../utils/calculate-total-amount';

interface CheckoutSectionProps {
  deliveryMethod: DeliveryMethod;
}

function CheckoutSection({ deliveryMethod }: CheckoutSectionProps) {
  const navigate = useNavigate();
  const [isPurchasing, setIsPurchasing] = useState(false);

  const { data: me } = useSuspenseQuery(meQueryOptions());
  const { data: productList } = useSuspenseQuery(productListQueryOptions());
  const { data: gradeShippingList } = useSuspenseQuery(gradeShippingListQueryOptions());
  const { items, totalCount, clearCart } = useCartStore();

  const totalAmount = calculateTotalAmount(items, productList);

  const deliveryFee = calculateDeliveryFee({ method: deliveryMethod, grade: me.grade, totalAmount, gradeShippingList });
  const totalPrice = totalAmount + deliveryFee;

  const onClickPurchase = async () => {
    setIsPurchasing(true);
    await delay(SECOND * 1);
    setIsPurchasing(false);
    clearCart();
    toast.success('결제가 완료되었습니다.');
    await delay(SECOND * 2);
    navigate('/');
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

        <Button fullWidth size="lg" loading={isPurchasing} onClick={onClickPurchase}>
          {isPurchasing ? '결제 중...' : '결제 진행'}
        </Button>

        <Text variant="C2_Regular" color="neutral.03_gray">
          {`우리는 신용카드, 은행 송금, 모바일 결제, 현금을 받아들입니다\n안전한 체크아웃\n귀하의 결제 정보는 암호화되어 안전합니다.`}
        </Text>
      </Stack>
    </styled.section>
  );
}

export default CheckoutSection;
