import AsyncBoundary from '@/components/AsyncBoundary';
import BannerSection from './components/BannerSection';
import CurrentLevelSection from './components/CurrentLevelSection';
import ProductListSection from './components/ProductListSection';
import RecentPurchaseSection from './components/RecentPurchaseSection';

function HomePage() {
  return (
    <>
      <BannerSection />
      <AsyncBoundary fallback={<CurrentLevelSection.Skeleton />}>
        <CurrentLevelSection />
      </AsyncBoundary>
      <AsyncBoundary fallback={<RecentPurchaseSection.Skeleton />}>
        <RecentPurchaseSection />
      </AsyncBoundary>
      <AsyncBoundary fallback={<ProductListSection.Skeleton />}>
        <ProductListSection />
      </AsyncBoundary>
    </>
  );
}

export default HomePage;
