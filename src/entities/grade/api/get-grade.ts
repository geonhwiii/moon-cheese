import { http } from '@/utils/http';

export type Grade = 'EXPLORER' | 'PILOT' | 'COMMANDER';

export interface MeResponse {
  point: number;
  grade: Grade;
}

export interface GradePoint {
  type: Grade;
  minPoint: number;
}

export interface GradePointListResponse {
  gradePointList: GradePoint[];
}

export interface GradeShipping {
  type: Grade;
  shippingFee: number;
  freeShippingThreshold: number;
}

export interface GradeShippingListResponse {
  gradeShippingList: GradeShipping[];
}

export const gradeApi = {
  getMe: () => http.get<MeResponse>('/api/me'),
  getGradePointList: () => http.get<GradePointListResponse>('/api/grade/point'),
  getGradeShippingList: () => http.get<GradeShippingListResponse>('/api/grade/shipping'),
};
