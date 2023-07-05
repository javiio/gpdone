import { useEffect, useState } from 'react';
import type { DateTime } from 'luxon';
import { useDoc } from '~platform';
import { useProjects } from '~projects';
import { useTasks } from '~tasks';
import { dataToBlock, getId, type Block, type BlockData } from '../';

export const useDailyBlocks = (date?: DateTime) => {
  const [blocks, setBlocks] = useState<Block[]>();
  const [data, isLoading, error] = useDoc('blocks', getId(date));
  const { projects } = useProjects();
  const { tasks } = useTasks();

  useEffect(() => {
    if (data?.data()) {
      const dataBlocks = data.data()?.blocks || [];
      setBlocks(
        dataBlocks.map((b: object) => dataToBlock(b as BlockData, projects, tasks))
      );
    } else {
      setBlocks([]);
    }
  }, [data, date, projects]);

  return {
    blocks,
    isLoading,
    error,
  };
};
