import { Flex, styled } from 'styled-system/jsx';
import { Spacing, Text } from '@/ui-lib';
import { Price } from '@/components/Price';
import { useSuspenseQuery } from '@tanstack/react-query';
import { recentPurchaseListQueryOptions } from '../api/home-queries';

export default function RecentPurchaseSection() {
  const { data: recentProducts } = useSuspenseQuery(recentPurchaseListQueryOptions());

  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>

      <Spacing size={4} />

      <Flex
        css={{
          bg: 'background.01_white',
          px: 5,
          py: 4,
          gap: 4,
          rounded: '2xl',
        }}
        direction={'column'}
      >
        {recentProducts.map(product => (
          <ProductCard
            key={product.id}
            imageSrc={product.thumbnail}
            imageAlt={product.name}
            title={product.name}
            price={<Price amount={product.price} />}
          />
        ))}
      </Flex>
    </styled.section>
  );
}

interface ProductCardProps {
  imageSrc: string;
  imageAlt: string;
  title: string;
  price: React.ReactNode;
}

function ProductCard({ imageSrc, imageAlt, title, price }: ProductCardProps) {
  return (
    <Flex css={{ gap: 4 }}>
      <styled.img
        src={imageSrc}
        alt={imageAlt}
        css={{
          w: '60px',
          h: '60px',
          objectFit: 'cover',
          rounded: 'xl',
        }}
      />
      <Flex flexDir="column" gap={1}>
        <Text variant="B2_Medium">{title}</Text>
        <Text variant="H1_Bold">{price}</Text>
      </Flex>
    </Flex>
  );
}

RecentPurchaseSection.Skeleton = () => {
  return (
    <styled.section css={{ px: 5, pt: 4, pb: 8 }}>
      <Text variant="H1_Bold">최근 구매한 상품</Text>
    </styled.section>
  );
};
