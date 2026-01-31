import type { CurrencyType } from '@/ui-lib';

export interface ExchangeRate {
  KRW: number;
  USD: number;
}

/**
 * 금액을 현재 통화 설정과 환율에 맞춰 표시용 문자열로 변환합니다.
 * @param amountInUSD USD 기준 금액
 * @param currency 선택된 통화 (USD | KRW)
 * @param exchangeRate 환율 정보
 * @returns 포맷팅된 가격 문자열
 */

export function formatPrice(amountInUSD: number, currency: CurrencyType, exchangeRate: ExchangeRate): string {
  const rate = exchangeRate[currency] || 1;
  const convertedAmount = amountInUSD * rate;

  if (currency === 'KRW') {
    const formatter = new Intl.NumberFormat('ko-KR');
    return `${formatter.format(Math.round(convertedAmount))}원`;
  }

  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(convertedAmount);
}
