import { Spacing } from '@/ui-lib';
import ProductDetailSection from './components/ProductDetailSection';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationSection from './components/RecommendationSection';
import ThumbnailSection from './components/ThumbnailSection';
import { useSuspenseQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import { z } from 'zod';
import { productDetailQueryOptions } from './api/product-detail-queries';

const ParamsSchema = z.object({
  id: z.string(),
});

export default function ProductDetailPage() {
  const { id } = ParamsSchema.parse(useParams());
  const { data: productDetail } = useSuspenseQuery(productDetailQueryOptions(id));

  return (
    <>
      <ThumbnailSection images={productDetail.images} />
      <ProductInfoSection
        productId={productDetail.id}
        name={productDetail.name}
        category={productDetail.category.toLowerCase() as 'cheese' | 'cracker' | 'tea'}
        rating={productDetail.rating}
        price={productDetail.price}
        stock={productDetail.stock}
      />

      <Spacing size={2.5} />

      <ProductDetailSection description={productDetail.detailDescription} />

      <Spacing size={2.5} />

      <RecommendationSection />
    </>
  );
}
