import { queryOptions } from '@tanstack/react-query';
import { gradeApi } from './get-grade';

export const gradeQueryKeys = {
  me: () => ['me'] as const,
  gradePointList: () => ['grade-point-list'] as const,
};

export const meQueryOptions = () =>
  queryOptions({
    queryKey: gradeQueryKeys.me(),
    queryFn: gradeApi.getMe,
  });

export const gradePointListQueryOptions = () =>
  queryOptions({
    queryKey: gradeQueryKeys.gradePointList(),
    queryFn: gradeApi.getGradePointList,
    select: data => data.gradePointList,
  });
