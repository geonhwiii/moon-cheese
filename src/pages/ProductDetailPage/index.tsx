import { Spacing } from '@/ui-lib';
import ProductDetailSection from './components/ProductDetailSection';
import ProductInfoSection from './components/ProductInfoSection';
import RecommendationSection from './components/RecommendationSection';
import ThumbnailSection from './components/ThumbnailSection';
import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorSection from '@/components/ErrorSection';

export default function ProductDetailPage() {
  return (
    <>
      <ErrorBoundary FallbackComponent={() => <ErrorSection />}>
        <Suspense>
          <ThumbnailSection />
          <ProductInfoSection />
          <Spacing size={2.5} />
          <ProductDetailSection />
          <Spacing size={2.5} />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={() => <ErrorSection />}>
        <Suspense>
          <RecommendationSection />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
