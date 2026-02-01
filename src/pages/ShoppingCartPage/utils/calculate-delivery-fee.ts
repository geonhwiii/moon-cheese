import type { Grade, GradeShipping } from '@/entities/grade/api/get-grade';

export type DeliveryMethod = 'Express' | 'Premium';

interface CalculateDeliveryFeeParams {
  method: DeliveryMethod;
  grade: Grade;
  totalAmount: number;
  gradeShippingList: GradeShipping[];
}

/**
 * 배송비 계산
 *
 * Express: 무료 (2~3일)
 * Premium (당일): 등급별 배송비 정책 적용
 *   - totalAmount >= freeShippingThreshold: 무료
 *   - totalAmount < freeShippingThreshold: shippingFee 적용
 */
export function calculateDeliveryFee({
  method,
  grade,
  totalAmount,
  gradeShippingList,
}: CalculateDeliveryFeeParams): number {
  if (method === 'Express') {
    return 0;
  }

  // Premium
  const gradeShipping = gradeShippingList.find(item => item.type === grade);
  if (!gradeShipping) {
    return 0;
  }

  if (totalAmount >= gradeShipping.freeShippingThreshold) {
    return 0;
  }

  return gradeShipping.shippingFee;
}
