import { Box, Flex, styled } from 'styled-system/jsx';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { queryOptions, useQuery, useSuspenseQueries } from '@tanstack/react-query';
import { http } from '@/utils/http';

const getMeQueryOptions = () => {
  return queryOptions({
    queryKey: ['me'],
    queryFn: () =>
      http.get<{
        point: number;
        grade: 'EXPLORER' | 'PILOT' | 'COMMANDER';
      }>('/api/me'),
  });
};

const getGradePointListQueryOptions = () => {
  return queryOptions({
    queryKey: ['grade-point-list'],
    queryFn: () =>
      http.get<{
        gradePointList: {
          type: 'EXPLORER' | 'PILOT' | 'COMMANDER';
          minPoint: number;
        }[];
      }>('/api/grade/point'),
  });
};

export default function CurrentLevelSection() {
  const [{ data: meData, data: gradePointListData }] = useSuspenseQueries({
    queries: [getMeQueryOptions(), getGradePointListQueryOptions()],
  });

  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{meData?.grade}</Text>

          <ProgressBar value={0.6} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {meData?.point}p
              </Text>
            </Box>
            <Box textAlign="right">
              <Text variant="C1_Bold">다음 등급까지</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                1.5p
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

CurrentLevelSection.Loading = () => {
  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>
    </styled.section>
  );
};
