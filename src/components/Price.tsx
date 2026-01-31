import { useCurrency } from '@/providers/CurrencyProvider';
import { formatPrice } from '@/utils/currency';

interface PriceProps {
  amount: number;
  className?: string;
}

export function Price({ amount, className }: PriceProps) {
  const { currency, exchangeRate, isPending } = useCurrency();

  if (isPending || !exchangeRate) {
    return <span className={className}>---</span>;
  }

  return <span className={className}>{formatPrice(amount, currency, exchangeRate)}</span>;
}
