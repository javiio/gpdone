import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { useDoc, setDoc, updateDoc, addItemToArrayDoc } from '~platform';
import { useProjects } from '~projects';
import {
  dataToBlock,
  blockToData,
  getId,
  currentBlockState,
  type BlockData,
} from '../';

export const useCurrentBlock = () => {
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockState);
  const [data, loading, error] = useDoc('data/currentBlock');
  const { projects } = useProjects();

  useEffect(() => {
    const blockData = data?.data();
    if (blockData) {
      setCurrentBlock(dataToBlock(blockData as BlockData, projects));
    }
  }, [data, projects]);

  const saveCurrentBlock = async () => {
    const { title, projectId } = currentBlock;
    await updateDoc({ title, projectId }, 'data/currentBlock');
  };

  const pushCurrentBlock = async () => {
    const blockData = blockToData(currentBlock);
    try {
      await addItemToArrayDoc(blockData, 'blocks', 'blocks', getId());
    } catch {
      await setDoc({ blocks: [blockData] }, 'blocks', getId());
    }
  };

  return {
    currentBlock,
    setCurrentBlock,
    loading,
    error,
    pushCurrentBlock,
    saveCurrentBlock,
  };
};
