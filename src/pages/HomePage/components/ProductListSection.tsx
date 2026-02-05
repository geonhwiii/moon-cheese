import { Counter, SubGNB, Text } from '@/ui-lib';
import React, { useState } from 'react';
import { Box, Grid, styled } from 'styled-system/jsx';
import ProductItem from '../components/ProductItem';
import { Price } from '@/components/Price';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productListQueryOptions } from '@/entities/product/api/product-queries';
import type { CheeseProduct, CrackerProduct, Product, TeaProduct } from '@/entities/product/api/get-product';
import { useCartStore, type CartItem } from '@/stores/cart-store';
import { Link } from 'react-router';

export default function ProductListSection() {
  const [currentCategory, setCurrentCategory] = useState('ALL');
  const { data: productList } = useSuspenseQuery(productListQueryOptions());

  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
      <SubGNB.Root value={currentCategory} onValueChange={({ value }) => setCurrentCategory(value)}>
        <SubGNB.List>
          <SubGNB.Trigger value="ALL">전체</SubGNB.Trigger>
          <SubGNB.Trigger value="CHEESE">치즈</SubGNB.Trigger>
          <SubGNB.Trigger value="CRACKER">크래커</SubGNB.Trigger>
          <SubGNB.Trigger value="TEA">티</SubGNB.Trigger>
        </SubGNB.List>
      </SubGNB.Root>
      <Grid gridTemplateColumns="repeat(2, 1fr)" rowGap={9} columnGap={4} p={5}>
        {productList
          .filter(product => filterByCategory(product, currentCategory))
          .map(product => {
            switch (product.category) {
              case 'CHEESE':
                return <CheeseItem key={product.id} product={product} />;
              case 'CRACKER':
                return <CrackerItem key={product.id} product={product} />;
              case 'TEA':
                return <TeaItem key={product.id} product={product} />;
            }
          })}
      </Grid>
    </styled.section>
  );
}

function CheeseItem({ product }: { product: CheeseProduct }) {
  return <ProductCard product={product} />;
}

function CrackerItem({ product }: { product: CrackerProduct }) {
  return <ProductCard product={product} tag={product.isGlutenFree && <ProductItem.FreeTag type="gluten" />} />;
}

function TeaItem({ product }: { product: TeaProduct }) {
  return <ProductCard product={product} tag={product.isCaffeineFree && <ProductItem.FreeTag type="caffeine" />} />;
}

interface ProductCardProps {
  product: Product;
  tag?: React.ReactNode;
}

function ProductCard({ product, tag }: ProductCardProps) {
  return (
    <Link to={`/product/${product.id}`}>
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
          {tag}
        </ProductItem.Meta>
        <ProductCounter product={product} />
      </ProductItem.Root>
    </Link>
  );
}

interface ProductCounterProps {
  product: Product;
}
function ProductCounter({ product }: ProductCounterProps) {
  const { items: cartItems, addItem, removeItem } = useCartStore();

  const quantity = getCartItemQuantity(cartItems, product.id);

  return (
    <Counter.Root>
      <Counter.Minus
        onClick={e => {
          e.stopPropagation();
          removeItem(product.id);
        }}
        disabled={quantity === 0}
      />
      <Counter.Display value={quantity} />
      <Counter.Plus
        onClick={e => {
          e.stopPropagation();
          addItem(product.id);
        }}
      />
    </Counter.Root>
  );
}

const filterByCategory = (product: Product, currentCategory: string) =>
  currentCategory === 'ALL' || product.category === currentCategory;

const getCartItemQuantity = (cartItems: CartItem[], productId: number) =>
  cartItems.find(item => item.productId === productId)?.quantity ?? 0;

ProductListSection.Skeleton = () => {
  return (
    <styled.section bg="background.01_white">
      <Box css={{ px: 5, pt: 5, pb: 4 }}>
        <Text variant="H1_Bold">판매중인 상품</Text>
      </Box>
    </styled.section>
  );
};
