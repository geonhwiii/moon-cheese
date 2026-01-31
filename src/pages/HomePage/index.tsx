import { Suspense } from 'react';
import BannerSection from './components/BannerSection';
import CurrentLevelSection from './components/CurrentLevelSection';
import ProductListSection from './components/ProductListSection';
import RecentPurchaseSection from './components/RecentPurchaseSection';
import { ErrorBoundary } from 'react-error-boundary';

function HomePage() {
  return (
    <>
      <BannerSection />
      <ErrorBoundary fallback={null}>
        <Suspense fallback={<CurrentLevelSection.Skeleton />}>
          <CurrentLevelSection />
        </Suspense>
      </ErrorBoundary>
      <RecentPurchaseSection />
      <ProductListSection />
    </>
  );
}

export default HomePage;
