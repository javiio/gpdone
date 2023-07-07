import { useEffect, useState } from 'react';
import type { DateTime } from 'luxon';
import { useDoc, setDoc } from '~platform';
import { useProjects, type Project } from '~projects';
import { useTasks } from '~tasks';
import { getId } from '~blocks';
import { type BlockPlan, type BlockPlanData } from '../';

export const usePlanning = (date?: DateTime) => {
  const [planning, setPlanning] = useState<BlockPlan[]>([]);
  const [data, isLoading, error] = useDoc('blocks', getId(date));
  const { getProject } = useProjects();
  const { getTask } = useTasks();

  useEffect(() => {
    if (data?.data()) {
      const planningData: BlockPlanData[] = data.data()?.planning || [];
      setPlanning(planningData.map((p) => dataToBlockPlan(p)));
    } else {
      setPlanning([]);
    }
  }, [data, date, getProject]);

  const blockPlanToData = (blockPlan: BlockPlan): BlockPlanData => ({
    projectId: blockPlan.projectId,
    ...(blockPlan.taskId && { taskId: blockPlan.taskId }),
  });

  const dataToBlockPlan = (data: BlockPlanData): BlockPlan => ({
    ...data,
    project: getProject(data.projectId) as Project,
    task: getTask(data.taskId),
  });

  const updatePlanning = async (blockPlans: BlockPlan[]) => {
    const planningData = blockPlans.map((p) => blockPlanToData(p));
    await setDoc({ planning: planningData }, 'blocks', getId(date));
  };

  return {
    planning,
    isLoading,
    error,
    updatePlanning,
  };
};
