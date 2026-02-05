import { Counter, SubGNB, Text } from '@/ui-lib';
import { useState } from 'react';
import { Box, Grid, styled } from 'styled-system/jsx';
import ProductItem from '../components/ProductItem';
import { Price } from '@/components/Price';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productListQueryOptions } from '@/entities/product/api/product-queries';
import type { Product } from '@/entities/product/api/get-product';
import { useCartStore } from '@/stores/cart-store';
import { Link } from 'react-router';

export default function ProductListSection() {
  const [currentCategory, setCurrentCategory] = useState('all');
  const { data: productList } = useSuspenseQuery(productListQueryOptions());

  /**
   * ? 지우고 싶은데? -> Counter에만 쓰이네? -> 내릴 수 있지 않을까
   */
  const { items: cartItems, addItem, removeItem } = useCartStore();

  /**
   * ?: 이름은 순수함수 느낌인데 순수하지 않았다. product.category?
   */
  const filterByCategory = (product: Product) =>
    currentCategory === 'all' || product.category === currentCategory.toUpperCase();

  const getFreeTagType = (product: Product): 'gluten' | 'caffeine' | null => {
    /**
     * ? isGluten, isCaffeine 같은게 있었다면?
     * ? 차라리 CheezeItem, CrackerItem, TeamItem 으로 완전히 분리했다면?
     * ? Free가 뭐지? 할인로직인가?
     */
    if (product.category === 'CRACKER' && product.isGlutenFree) return 'gluten';
    if (product.category === 'TEA' && product.isCaffeineFree) return 'caffeine';
    return null;
  };

  const getCartItemQuantity = (productId: number) =>
    cartItems.find(item => item.productId === productId)?.quantity ?? 0;

  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
      <SubGNB.Root value={currentCategory} onValueChange={({ value }) => setCurrentCategory(value)}>
        <SubGNB.List>
          <SubGNB.Trigger value="all">전체</SubGNB.Trigger>
          <SubGNB.Trigger value="cheese">치즈</SubGNB.Trigger>
          <SubGNB.Trigger value="cracker">크래커</SubGNB.Trigger>
          <SubGNB.Trigger value="tea">티</SubGNB.Trigger>
        </SubGNB.List>
      </SubGNB.Root>
      <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
        {productList.filter(filterByCategory).map(product => {
          const freeTagType = getFreeTagType(product);
          return (
            <Link key={product.id} to={`/product/${product.id}`}>
              <ProductItem.Root>
                <ProductItem.Image src={product.images[0]} alt={product.name} />
                <ProductItem.Info title={product.name} description={product.description} />
                <ProductItem.Meta>
                  <ProductItem.MetaLeft>
                    <ProductItem.Rating rating={product.rating} />
                    <ProductItem.Price>
                      <Price amount={product.price} />
                    </ProductItem.Price>
                  </ProductItem.MetaLeft>
                  {freeTagType && <ProductItem.FreeTag type={freeTagType} />}
                </ProductItem.Meta>
                {/* ? 얘 때문에 복잡해지네 ? -> 내릴 수 있지 않을까? */}
                <Counter.Root>
                  <Counter.Minus
                    onClick={e => {
                      e.stopPropagation();
                      removeItem(product.id);
                    }}
                    disabled={getCartItemQuantity(product.id) === 0}
                  />
                  <Counter.Display value={getCartItemQuantity(product.id)} />
                  <Counter.Plus
                    onClick={e => {
                      e.stopPropagation();
                      addItem(product.id);
                    }}
                  />
                </Counter.Root>
              </ProductItem.Root>
            </Link>
          );
        })}
      </Grid>
    </styled.section>
  );
}

ProductListSection.Skeleton = () => {
  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
    </styled.section>
  );
};
