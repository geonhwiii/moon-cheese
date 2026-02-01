import { Box, Flex, styled } from 'styled-system/jsx';
import { ProgressBar, Spacing, Text } from '@/ui-lib';
import { useSuspenseQueries } from '@tanstack/react-query';
import { meQueryOptions, gradePointListQueryOptions } from '@/entities/grade/api/grade-queries';

type GradePoint = { type: string; minPoint: number };

export default function CurrentLevelSection() {
  const [{ data: me }, { data: gradePointList }] = useSuspenseQueries({
    queries: [meQueryOptions(), gradePointListQueryOptions()],
  });

  const { progress, pointsToNextGrade } = getNextGradeInfo(me.grade, me.point, gradePointList);

  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold">{me.grade}</Text>

          <ProgressBar value={progress} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {me.point}p
              </Text>
            </Box>
            {pointsToNextGrade > 0 && (
              <Box textAlign="right">
                <Text variant="C1_Bold">다음 등급까지</Text>
                <Text variant="C2_Regular" color="neutral.03_gray">
                  {pointsToNextGrade}p
                </Text>
              </Box>
            )}
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
}

function getNextGradeInfo(currentGrade: string, currentPoint: number, gradePointList: GradePoint[]) {
  const sortedList = [...gradePointList].sort((a, b) => a.minPoint - b.minPoint);
  const currentIndex = sortedList.findIndex(g => g.type === currentGrade);
  const isMaxGrade = currentIndex === sortedList.length - 1;

  if (isMaxGrade) {
    return { progress: 1, pointsToNextGrade: 0 };
  }

  const currentMinPoint = sortedList[currentIndex].minPoint;
  const nextMinPoint = sortedList[currentIndex + 1].minPoint;

  const progress = (currentPoint - currentMinPoint) / (nextMinPoint - currentMinPoint);
  const pointsToNextGrade = nextMinPoint - currentPoint;

  return { progress, pointsToNextGrade };
}

CurrentLevelSection.Skeleton = () => {
  return (
    <styled.section css={{ px: 5, py: 4 }}>
      <Text variant="H1_Bold">현재 등급</Text>

      <Spacing size={4} />

      <Box bg="background.01_white" css={{ px: 5, py: 4, rounded: '2xl' }}>
        <Flex flexDir="column" gap={2}>
          <Text variant="H2_Bold"> </Text>

          <ProgressBar value={0} size="xs" />

          <Flex justifyContent="space-between">
            <Box textAlign="left">
              <Text variant="C1_Bold">현재 포인트</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {' '}
              </Text>
            </Box>
            <Box textAlign="right">
              <Text variant="C1_Bold">다음 등급까지</Text>
              <Text variant="C2_Regular" color="neutral.03_gray">
                {' '}
              </Text>
            </Box>
          </Flex>
        </Flex>
      </Box>
    </styled.section>
  );
};
