import type { CurrencyType } from '@/ui-lib';
import { useState, useContext, createContext } from 'react';
import { useQuery, queryOptions } from '@tanstack/react-query';
import { http } from '@/utils/http';
import type { ExchangeRate } from '@/utils/currency';

interface ExchangeRateResponse {
  exchangeRate: ExchangeRate;
}

const CurrencyContext = createContext<{
  currency: CurrencyType;
  exchangeRate: ExchangeRate | undefined;
  isPending: boolean;
  onChangeCurrency: (currency: CurrencyType) => void;
}>({
  currency: 'USD',
  exchangeRate: undefined,
  isPending: true,
  onChangeCurrency: () => {},
});

// TODO: 환율 설정은 새로고침 시 유지되면 좋으므로 localStorage에 저장하는 방식으로 변경해야 함
export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyType>('USD');

  const { data: exchangeRate, isPending } = useQuery({
    ...getExchangeRateQueryOptions(),
  });

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        exchangeRate,
        isPending,
        onChangeCurrency: setCurrency,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (!context) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}

function getExchangeRateQueryOptions() {
  return queryOptions({
    queryKey: ['exchange-rate'],
    queryFn: () => http.get<ExchangeRateResponse>('/api/exchange-rate'),
    select: data => data.exchangeRate,
    staleTime: CURRENCY_CACHE_TIME,
    gcTime: CURRENCY_CACHE_TIME,
  });
}

const CURRENCY_CACHE_TIME = 1000 * 60 * 60 * 24; // 24 hours
