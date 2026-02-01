import { Spacing } from '@/ui-lib';
import AsyncBoundary from '@/components/AsyncBoundary';
import ProductDetailSection from './components/ProductDetailSection';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationSection from './components/RecommendationSection';
import ThumbnailSection from './components/ThumbnailSection';

export default function ProductDetailPage() {
  return (
    <>
      <AsyncBoundary>
        <ThumbnailSection />
        <ProductInfoSection />
        <Spacing size={2.5} />
        <ProductDetailSection />
        <Spacing size={2.5} />
      </AsyncBoundary>
      <AsyncBoundary>
        <RecommendationSection />
      </AsyncBoundary>
    </>
  );
}
