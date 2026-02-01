import type { Grade } from '@/entities/grade/api/get-grade';

export type DeliveryMethod = 'Express' | 'Premium';

interface CalculateDeliveryFeeParams {
  method: DeliveryMethod;
  grade: Grade;
  totalAmount: number;
}

/**
 * 배송비 계산
 *
 * Express: 무료 (2~3일)
 * Premium (당일):
 *   - $30 이상: 무료
 *   - $30 미만:
 *     - Explorer: $2
 *     - Pilot: $1
 *     - Commander: 무료
 */
export function calculateDeliveryFee({ method, grade, totalAmount }: CalculateDeliveryFeeParams): number {
  if (method === 'Express') {
    return 0;
  }

  // Premium
  if (totalAmount >= 30) {
    return 0;
  }

  // $30 미만
  switch (grade) {
    case 'EXPLORER':
      return 2;
    case 'PILOT':
      return 1;
    case 'COMMANDER':
      return 0;
  }
}
