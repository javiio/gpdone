import { useEffect, useState } from 'react';
import type { DateTime } from 'luxon';
import { useDoc, setDoc } from '~platform';
import { useProjects } from '~projects';
import { useTasks } from '~tasks';
import { getId, useDailyBlocks } from '~blocks';
import { dataToBlockPlan, blockPlanToData, type BlockPlan, type BlockPlanData } from '../';

export const usePlanning = (date?: DateTime) => {
  const [planning, setPlanning] = useState<BlockPlan[]>([]);
  const [plannedUndone, setPlannedUndone] = useState<BlockPlan[]>([]);
  const [data, isLoading, error] = useDoc('blocks', getId(date));
  const { getProject } = useProjects();
  const { getTask } = useTasks();
  const { blocks } = useDailyBlocks(date);

  useEffect(() => {
    if (data?.data()) {
      const planningData: BlockPlanData[] = data.data()?.planning || [];
      setPlanning(planningData.map((p) => dataToBlockPlan(p, getProject, getTask)));
    } else {
      setPlanning([]);
    }
  }, [data, date, getProject]);

  useEffect(() => {
    const done = [...blocks];
    const undone: BlockPlan[] = [];
    planning.forEach((plannedBlock) => {
      const doneIndex = done.findIndex((block) => block.blockPlan?.projectId === plannedBlock.projectId);
      if (doneIndex >= 0) {
        done.splice(doneIndex, 1);
      } else {
        undone.push(plannedBlock);
      }
    });
    setPlannedUndone(undone);
  }, [planning, blocks]);

  const updatePlanning = async (blockPlans: BlockPlan[]) => {
    const planningData = blockPlans.map((p) => blockPlanToData(p));
    await setDoc({ planning: planningData }, 'blocks', getId(date));
  };

  return {
    planning,
    plannedUndone,
    isLoading,
    error,
    updatePlanning,
  };
};
