import { type ReactNode, Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorSection from './ErrorSection';

type AsyncBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

function AsyncBoundary({ children, fallback }: AsyncBoundaryProps) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          fallbackRender={({ resetErrorBoundary }) => <ErrorSection onRetry={resetErrorBoundary} />}
        >
          <Suspense fallback={fallback}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default AsyncBoundary;
