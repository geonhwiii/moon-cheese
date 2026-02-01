import { Price } from '@/components/Price';
import { Spacing, Text } from '@/ui-lib';
import { useNavigate, useParams } from 'react-router';
import { HStack, styled } from 'styled-system/jsx';
import RecommendationProductItem from './RecommendationProductItem';
import { useSuspenseQueries } from '@tanstack/react-query';
import { productListQueryOptions, recommendProductIdsQueryOptions } from '@/entities/product/api/product-queries';
import { z } from 'zod';

const ParamsSchema = z.object({
  id: z.string(),
});

export default function RecommendationSection() {
  const navigate = useNavigate();
  const { id } = ParamsSchema.parse(useParams());

  const [{ data: recommendProductIds }, { data: productList }] = useSuspenseQueries({
    queries: [recommendProductIdsQueryOptions(id), productListQueryOptions()],
  });

  const recommendProducts = productList.filter(product => recommendProductIds.includes(product.id));

  return (
    <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
      <Text variant="H2_Bold">추천 제품</Text>

      <Spacing size={4} />

      <HStack gap={1.5} overflowX="auto">
        {recommendProducts.map(product => (
          <RecommendationProductItem.Root key={product.id} onClick={() => navigate(`/product/${product.id}`)}>
            <RecommendationProductItem.Image src={product.images[0]} alt={product.name} />
            <RecommendationProductItem.Info name={product.name} rating={product.rating} />
            <RecommendationProductItem.Price>
              <Price amount={product.price} />
            </RecommendationProductItem.Price>
          </RecommendationProductItem.Root>
        ))}
      </HStack>
    </styled.section>
  );
}
