import { EnhancedToastProvider } from '@/ui-lib/components/toast';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

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
