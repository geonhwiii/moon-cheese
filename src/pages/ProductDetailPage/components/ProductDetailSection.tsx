import { Spacing, Text } from '@/ui-lib';
import { styled } from 'styled-system/jsx';
import { useParams } from 'react-router';
import { z } from 'zod';
import { useSuspenseQuery } from '@tanstack/react-query';
import { productDetailQueryOptions } from '@/entities/product/api/product-queries';

const ParamsSchema = z.object({
  id: z.string(),
});

export default function ProductDetailSection() {
  const { id } = ParamsSchema.parse(useParams());
  const { data: description } = useSuspenseQuery({
    ...productDetailQueryOptions(id),
    select: data => data.detailDescription,
  });
  return (
    <styled.section css={{ bg: 'background.01_white', px: 5, pt: 5, pb: 6 }}>
      <Text variant="H2_Bold">상세 정보</Text>

      <Spacing size={4} />

      <Text variant="B2_Regular" color="neutral.02_gray">
        {description}
      </Text>
    </styled.section>
  );
}
