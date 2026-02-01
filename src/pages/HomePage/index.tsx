import { Suspense } from 'react';
import BannerSection from './components/BannerSection';
import CurrentLevelSection from './components/CurrentLevelSection';
import ProductListSection from './components/ProductListSection';
import RecentPurchaseSection from './components/RecentPurchaseSection';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorSection from '@/components/ErrorSection';

function HomePage() {
  return (
    <>
      <BannerSection />
      <ErrorBoundary FallbackComponent={() => <ErrorSection />}>
        <Suspense fallback={<CurrentLevelSection.Skeleton />}>
          <CurrentLevelSection />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={() => <ErrorSection />}>
        <Suspense fallback={<RecentPurchaseSection.Skeleton />}>
          <RecentPurchaseSection />
        </Suspense>
      </ErrorBoundary>
      <ErrorBoundary FallbackComponent={() => <ErrorSection />}>
        <Suspense fallback={<ProductListSection.Skeleton />}>
          <ProductListSection />
        </Suspense>
      </ErrorBoundary>
    </>
  );
}

export default HomePage;
