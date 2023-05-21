import React, {
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import { atom, useRecoilState } from 'recoil';
import type { FirestoreError } from 'firebase/firestore';
import { useDoc, setDoc, updateDoc, addItemToArrayDoc } from '~platform';
import { useProjects, type Project } from '~projects';
import { useTimer } from '~timer';
import {
  dataToBlock,
  blockToData,
  getId,
  updateBlockProject,
  type BlockData,
  type Block,
} from '..';

const currentBlockState = atom<Block>({
  key: 'currentBlockState',
  default: undefined,
});

interface CurrentBlockContext {
  currentBlock?: Block
  loading: boolean
  error?: FirestoreError
  pushCurrentBlock: () => Promise<void>
  saveCurrentBlock: () => Promise<void>
  updateTitle: (t: string) => void
  updateProject: (p: Project) => void
  color: string
};

const currentBlockContext = createContext<CurrentBlockContext>({
  loading: false,
  pushCurrentBlock: async () => {},
  saveCurrentBlock: async () => {},
  updateTitle: (t: string) => {},
  updateProject: (p: Project) => {},
  color: 'gray-400',
});

export const ProvideCurrentBlock = ({ children }: { children: ReactNode }) => {
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockState);
  const [data, loading, error] = useDoc('data/currentBlock');
  const { projects } = useProjects();
  const { startedAt, finishedAt } = useTimer();

  useEffect(() => {
    const blockData = data?.data();
    if (blockData) {
      setCurrentBlock(dataToBlock(blockData as BlockData, projects));
    }
  }, [data, projects]);

  const saveCurrentBlock = async () => {
    let block = currentBlock;
    setCurrentBlock((prev) => {
      block = prev;
      return prev;
    });
    if (block) {
      const { title, projectId } = block;
      await updateDoc({ title, projectId }, 'data/currentBlock');
    }
  };

  const pushCurrentBlock = async () => {
    let block = currentBlock;
    setCurrentBlock((prev) => {
      block = prev;
      return prev;
    });
    if (block) {
      const blockData = { ...blockToData(block), startedAt, finishedAt };
      try {
        await addItemToArrayDoc(blockData, 'blocks', 'blocks', getId());
      } catch {
        await setDoc({ blocks: [blockData] }, 'blocks', getId());
      }
    }
  };

  const updateTitle = (title: string) => {
    setCurrentBlock((prev: Block) => ({
      ...prev,
      title,
    }));
  };

  const updateProject = async (project: Project) => {
    setCurrentBlock((prev: Block) => updateBlockProject(prev, project));
    await saveCurrentBlock();
  };

  const color = currentBlock?.project?.color ?? 'gray-400';

  const value = {
    currentBlock,
    loading,
    error,
    pushCurrentBlock,
    saveCurrentBlock,
    updateTitle,
    updateProject,
    color,
  };

  return (
    <currentBlockContext.Provider value={value}>
      {children}
    </currentBlockContext.Provider>
  );
};

export const useCurrentBlock = () => useContext(currentBlockContext);
