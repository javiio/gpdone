import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';
import { useDoc, setDoc, updateDoc, addItemToArrayDoc } from '~platform';
import { useProjects } from '~projects';
import {
  dataToBlock,
  blockToData,
  getId,
  type BlockData,
  type Block,
} from '../';

const currentBlockState = atom<Block>({
  key: 'currentBlockState',
  default: undefined,
});

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
    let block: Block = currentBlock;
    setCurrentBlock((prev) => {
      block = prev;
      return prev;
    });
    const { title, projectId } = block;
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
