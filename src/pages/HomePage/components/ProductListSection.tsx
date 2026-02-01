import { Counter, SubGNB, Text } from '@/ui-lib';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Box, Grid, styled } from 'styled-system/jsx';
import ProductItem from '../components/ProductItem';
import { Price } from '@/components/Price';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productListQueryOptions } from '../api/home-queries';
import type { Product } from '../api/home-api';
import { useCartStore } from '@/stores/cart-store';

export default function ProductListSection() {
  const [currentCategory, setCurrentCategory] = useState('all');
  const navigate = useNavigate();
  const { data: productList } = useSuspenseQuery(productListQueryOptions());
  const { items, addItem, removeItem } = useCartStore();

  const getQuantity = (productId: number) => items.find(item => item.productId === productId)?.quantity ?? 0;

  const matchesCategory = (product: Product) =>
    currentCategory === 'all' || product.category === currentCategory.toUpperCase();

  const renderFreeTag = (product: Product) => {
    if (product.category === 'CRACKER' && product.isGlutenFree) {
      return <ProductItem.FreeTag type="gluten" />;
    }
    if (product.category === 'TEA' && product.isCaffeineFree) {
      return <ProductItem.FreeTag type="caffeine" />;
    }
    return null;
  };

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
        {productList.filter(matchesCategory).map(product => (
          <ProductItem.Root key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
            <ProductItem.Image src={product.images[0]} alt={product.name} />
            <ProductItem.Info title={product.name} description={product.description} />
            <ProductItem.Meta>
              <ProductItem.MetaLeft>
                <ProductItem.Rating rating={product.rating} />
                <ProductItem.Price>
                  <Price amount={product.price} />
                </ProductItem.Price>
              </ProductItem.MetaLeft>
              {renderFreeTag(product)}
            </ProductItem.Meta>
            <Counter.Root>
              <Counter.Minus
                onClick={e => {
                  e.stopPropagation();
                  removeItem(product.id);
                }}
                disabled={getQuantity(product.id) === 0}
              />
              <Counter.Display value={getQuantity(product.id)} />
              <Counter.Plus
                onClick={e => {
                  e.stopPropagation();
                  addItem(product.id);
                }}
              />
            </Counter.Root>
          </ProductItem.Root>
        ))}
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
