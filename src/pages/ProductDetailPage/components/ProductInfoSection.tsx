import { Button, Counter, RatingGroup, Spacing, Text } from '@/ui-lib';
import Tag, { type TagType } from '@/ui-lib/components/tag';
import { Box, Divider, Flex, Stack, styled } from 'styled-system/jsx';
import { Price } from '@/components/Price';
import { useCartStore } from '@/stores/cart-store';
import { useParams } from 'react-router';
import { z } from 'zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productDetailQueryOptions } from '@/entities/product/api/product-queries';
import { useForm } from 'react-hook-form';

interface AddToCartForm {
  quantity: number;
}

const ParamsSchema = z.object({
  id: z.string(),
});

export default function ProductInfoSection() {
  const { id } = ParamsSchema.parse(useParams());
  const { watch, setValue, handleSubmit, reset } = useForm<AddToCartForm>({
    defaultValues: { quantity: 1 },
  });

  const quantity = watch('quantity');

  const { data: productDetail } = useSuspenseQuery(productDetailQueryOptions(id));

  const { items, addItem, deleteItem } = useCartStore();

  const cartItem = items.find(item => item.productId === productDetail.id);
  const isInCart = !!cartItem;

  return (
    <styled.section css={{ bg: 'background.01_white', p: 5 }}>
      {/* 상품 정보 */}
      <Box>
        <Stack gap={2}>
          <Tag type={productDetail.category.toLowerCase() as TagType} />
          <Text variant="B1_Bold">{productDetail.name}</Text>
          <RatingGroup value={productDetail.rating} readOnly label={`${productDetail.rating.toFixed(1)}`} />
        </Stack>
        <Spacing size={4} />
        <Text variant="H1_Bold">
          <Price amount={productDetail.price} />
        </Text>
      </Box>

      <Spacing size={5} />

      <form
        onSubmit={handleSubmit(data => {
          addItem(productDetail.id, data.quantity);
          reset();
        })}
      >
        {/* 재고 및 수량 조절 */}
        <Flex justify="space-between" alignItems="center">
          <Flex alignItems="center" gap={2}>
            <Text variant="C1_Medium">재고</Text>
            <Divider orientation="vertical" color="border.01_gray" h={4} />
            <Text variant="C1_Medium" color="secondary.02_orange">
              {productDetail.stock}EA
            </Text>
          </Flex>
          <Counter.Root>
            <Counter.Minus
              type="button"
              onClick={() => setValue('quantity', quantity - 1)}
              disabled={isInCart || quantity <= 1}
            />
            <Counter.Display value={isInCart ? cartItem.quantity : quantity} />
            <Counter.Plus
              type="button"
              onClick={() => setValue('quantity', quantity + 1)}
              disabled={isInCart || quantity >= productDetail.stock}
            />
          </Counter.Root>
        </Flex>

        <Spacing size={5} />

        {/* 장바구니 버튼 */}
        {isInCart ? (
          <Button type="button" fullWidth color="neutral" size="lg" onClick={() => deleteItem(productDetail.id)}>
            장바구니에서 제거
          </Button>
        ) : (
          <Button type="submit" fullWidth color="primary" size="lg" disabled={quantity === 0}>
            장바구니 담기
          </Button>
        )}
      </form>
    </styled.section>
  );
}
