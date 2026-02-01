import { Button, Counter, Spacing, Text } from '@/ui-lib';
import { Divider, Flex, Stack, styled } from 'styled-system/jsx';
import ShoppingCartItem from './ShoppingCartItem';
import { useCartStore } from '@/stores/cart-store';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productListQueryOptions } from '@/entities/product/api/product-queries';
import { Price } from '@/components/Price';
import { Fragment } from 'react';
import type { TagType } from '@/ui-lib';
import EmptyCartSection from './EmptyCartSection';

function ShoppingCartSection() {
  const { items, addItem, removeItem, deleteItem, clearCart } = useCartStore();
  const { data: productList } = useSuspenseQuery(productListQueryOptions());

  if (items.length === 0) {
    return <EmptyCartSection />;
  }

  return (
    <styled.section css={{ p: 5, bgColor: 'background.01_white' }}>
      <Flex justify="space-between">
        <Text variant="H2_Bold">장바구니</Text>
        <Button color={'neutral'} size="sm" onClick={clearCart}>
          전체삭제
        </Button>
      </Flex>
      <Spacing size={4} />
      <Stack
        gap={5}
        css={{
          p: 5,
          border: '1px solid',
          borderColor: 'border.01_gray',
          rounded: '2xl',
        }}
      >
        {items.map((item, index) => {
          const product = productList.find(p => p.id === item.productId)!;
          return (
            <Fragment key={item.productId}>
              {index > 0 && <Divider color="border.01_gray" />}
              <ShoppingCartItem.Root>
                <ShoppingCartItem.Image src={product.images[0]} alt={product.name} />
                <ShoppingCartItem.Content>
                  <ShoppingCartItem.Info
                    type={product.category.toLowerCase() as TagType}
                    title={product.name}
                    description={product.description}
                    onDelete={() => deleteItem(item.productId)}
                  />
                  <ShoppingCartItem.Footer>
                    <ShoppingCartItem.Price>
                      <Price amount={product.price} />
                    </ShoppingCartItem.Price>
                    <Counter.Root>
                      <Counter.Minus onClick={() => removeItem(item.productId)} disabled={item.quantity === 1} />
                      <Counter.Display value={item.quantity} />
                      <Counter.Plus onClick={() => addItem(item.productId)} disabled={item.quantity >= product.stock} />
                    </Counter.Root>
                  </ShoppingCartItem.Footer>
                </ShoppingCartItem.Content>
              </ShoppingCartItem.Root>
            </Fragment>
          );
        })}
      </Stack>
    </styled.section>
  );
}

export default ShoppingCartSection;
