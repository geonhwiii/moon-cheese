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
  });
}
