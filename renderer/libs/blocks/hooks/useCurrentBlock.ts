import { useEffect, useState } from 'react';
import {
  useDoc,
  setDoc,
  updateDoc,
  addItemToArrayDoc,
} from '../../platform/data';
import useProjects from '../../projects/hooks/useProjects';
import type { Project } from '../../projects/types';
import type { BlockData, Block } from '../types';
import { dataToBlock, blockToData, getId } from '../utils';

const useCurrentBlock = () => {
  const [currentBlock, setCurrentBlock] = useState<Block>();
  const [data, loading, error] = useDoc('data/currentBlock');
  const { projects } = useProjects();

  useEffect(() => {
    const blockData = data?.data() as BlockData;
    if (blockData) {
      setCurrentBlock(dataToBlock(blockData, projects));
    }
  }, [data, projects]);

  const updateCurrentBlock = async (title: string) => {
    await updateDoc({ title }, 'data/currentBlock');
  };

  const pushCurrentBlock = async (title: string, project: Project) => {
    if (currentBlock) {
      updateCurrentBlock(title);
      const blockData = blockToData({
        ...currentBlock,
        title,
        projectId: project.id,
      });
      try {
        await addItemToArrayDoc(blockData, 'blocks', 'blocks', getId());
      } catch {
        await setDoc({ blocks: [blockData] }, 'blocks', getId());
      }
    }
  };

  return {
    currentBlock,
    loading,
    error,
    pushCurrentBlock,
    updateCurrentBlock,
  };
};

export default useCurrentBlock;
