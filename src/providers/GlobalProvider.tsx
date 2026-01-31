import { EnhancedToastProvider } from '@/ui-lib/components/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const QUERY_STALE_TIME = 1000 * 60 * 5; // 5 minute
const QUERY_GC_TIME = 1000 * 60 * 10; // 10 minutes

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      staleTime: QUERY_STALE_TIME,
      gcTime: QUERY_GC_TIME,
      refetchOnWindowFocus: false,
    },
  },
});

const GlobalProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <EnhancedToastProvider>
      <QueryClientProvider client={queryClient}>
        {children}
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    </EnhancedToastProvider>
  );
};

export default GlobalProvider;
