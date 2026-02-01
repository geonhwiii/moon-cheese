import { Button, Counter, RatingGroup, Spacing, Text } from '@/ui-lib';
import Tag, { type TagType } from '@/ui-lib/components/tag';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';
import { Price } from '@/components/Price';
import { useCartStore } from '@/stores/cart-store';
import { useState } from 'react';

type ProductInfoSectionProps = {
  productId: number;
  name: string;
  category: TagType;
  rating: number;
  price: number;
  stock: number;
};

function ProductInfoSection({ productId, name, category, rating, price, stock }: ProductInfoSectionProps) {
  const [selectedQuantity, setSelectedQuantity] = useState(0);

  const { items, addItem, deleteItem } = useCartStore();
  const cartItem = items.find(item => item.productId === productId);

  const isInCart = !!cartItem;

  return (
    <styled.section css={{ bg: 'background.01_white', p: 5 }}>
      {/* 상품 정보 */}
      <Box>
        <Stack gap={2}>
          <Tag type={category} />
          <Text variant="B1_Bold">{name}</Text>
          <RatingGroup value={rating} readOnly label={`${rating.toFixed(1)}`} />
        </Stack>
        <Spacing size={4} />
        <Text variant="H1_Bold">
          <Price amount={price} />
        </Text>
      </Box>

      <Spacing size={5} />

      {/* 재고 및 수량 조절 */}
      <Flex justify="space-between" alignItems="center">
        <Flex alignItems="center" gap={2}>
          <Text variant="C1_Medium">재고</Text>
          <Divider orientation="vertical" color="border.01_gray" h={4} />
          <Text variant="C1_Medium" color="secondary.02_orange">
            {stock}EA
          </Text>
        </Flex>
        <Counter.Root>
          <Counter.Minus
            onClick={() => setSelectedQuantity(prev => prev - 1)}
            disabled={isInCart || selectedQuantity === 0}
          />
          <Counter.Display value={isInCart ? cartItem.quantity : selectedQuantity} />
          <Counter.Plus
            onClick={() => setSelectedQuantity(prev => prev + 1)}
            disabled={isInCart || selectedQuantity >= stock}
          />
        </Counter.Root>
      </Flex>

      <Spacing size={5} />

      {/* 장바구니 버튼 */}
      {isInCart ? (
        <Button fullWidth color="neutral" size="lg" onClick={() => deleteItem(productId)}>
          장바구니에서 제거
        </Button>
      ) : (
        <Button
          fullWidth
          color="primary"
          size="lg"
          onClick={() => {
            addItem(productId, selectedQuantity);
            setSelectedQuantity(0);
          }}
          disabled={selectedQuantity === 0}
        >
          장바구니 담기
        </Button>
      )}
    </styled.section>
  );
}

export default ProductInfoSection;
