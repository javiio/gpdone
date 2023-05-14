import { useEffect, useState } from 'react';
import { useDoc, setDoc, updateDoc, addItemToArrayDoc } from '~platform';
import { useProjects, type Project } from '~projects';
import { dataToBlock, blockToData, getId, type BlockData, type Block } from '../';

export const useCurrentBlock = () => {
  const [currentBlock, setCurrentBlock] = useState<Block>();
  const [data, loading, error] = useDoc('data/currentBlock');
  const { projects } = useProjects();

  useEffect(() => {
    const blockData = data?.data();
    if (blockData) {
      setCurrentBlock(dataToBlock(blockData as BlockData, projects));
    }
  }, [data, projects]);

  const updateCurrentBlock = async (title: string, projectId = '') => {
    setCurrentBlock((prev) => {
      if (prev) {
        return { ...prev, title, projectId };
      }
      return dataToBlock({ title, projectId }, projects);
    });
    await updateDoc({ title, projectId }, 'data/currentBlock');
  };

  const pushCurrentBlock = async (title: string, project: Project | undefined) => {
    if (currentBlock) {
      const blockData = blockToData({
        ...currentBlock,
        title,
        projectId: project?.id ?? '',
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
