import { useEffect, useState } from 'react';
import type { DateTime } from 'luxon';
import { useDoc, setDoc } from '~platform';
import { useProjects, type Project } from '~projects';
import { useTasks } from '~tasks';
import { getId } from '~blocks';
import { type PlannedBlock, type PlannedBlockData } from '../';

export const usePlanning = (date?: DateTime) => {
  const [planning, setPlanning] = useState<PlannedBlock[]>([]);
  const [data, isLoading, error] = useDoc('blocks', getId(date));
  const { getProject } = useProjects();
  const { getTask } = useTasks();

  useEffect(() => {
    if (data?.data()) {
      const planningData: PlannedBlockData[] = data.data()?.planning || [];
      setPlanning(planningData.map((p) => dataToPlannedBlock(p)));
    } else {
      setPlanning([]);
    }
  }, [data, date, getProject]);

  const plannedBlockToData = (plannedBlock: PlannedBlock): PlannedBlockData => ({
    projectId: plannedBlock.projectId,
    ...(plannedBlock.taskId && { taskId: plannedBlock.taskId }),
  });

  const dataToPlannedBlock = (data: PlannedBlockData): PlannedBlock => ({
    ...data,
    project: getProject(data.projectId) as Project,
    task: getTask(data.taskId),
  });

  const updatePlanning = async (plannedBlocks: PlannedBlock[]) => {
    const planningData = plannedBlocks.map((p) => plannedBlockToData(p));
    await setDoc({ planning: planningData }, 'blocks', getId(date));
  };

  return {
    planning,
    isLoading,
    error,
    updatePlanning,
  };
};
