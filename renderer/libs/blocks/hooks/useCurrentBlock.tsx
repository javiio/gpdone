import React, {
  useRef,
  useState,
  useEffect,
  createContext,
  useContext,
  type ReactNode,
} from 'react';
import type { FirestoreError } from 'firebase/firestore';
import { useDoc, setDoc, updateDoc, addItemToArrayDoc } from '~platform';
import { useProjects, type Project } from '~projects';
import { useTimer } from '~timer';
import { useTasks, type Task } from '~tasks';
import { blockPlanToData, type BlockPlan } from '~planning';
import {
  dataToBlock,
  blockToData,
  getId,
  type BlockData,
  type Block,
} from '..';

interface CurrentBlockContext {
  currentBlock?: Block
  loading: boolean
  error?: FirestoreError
  pushCurrentBlock: () => Promise<void>
  updateTitle: (title: string) => void
  updateProject: (project: Project) => Promise<void>
  updateTask: (task: Task) => Promise<void>
  updateBlockPlan: (blockPlan: BlockPlan) => Promise<void>
  color: string
  inputRef?: React.RefObject<HTMLInputElement>
};

const currentBlockContext = createContext<CurrentBlockContext>({
  loading: false,
  pushCurrentBlock: async () => {},
  updateTitle: (t: string) => {},
  updateProject: async (p: Project) => {},
  updateTask: async (t: Task) => {},
  color: 'gray-400',
  updateBlockPlan: async (b: BlockPlan) => {},
});

export const ProvideCurrentBlock = ({ children }: { children: ReactNode }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentBlock, setCurrentBlock] = useState<Block>();
  const [data, loading, error] = useDoc('data/currentBlock');
  const { getProject } = useProjects();
  const { getTask, addBlockToTask } = useTasks();
  const { timerLogs, blockTime, resetTimer } = useTimer();

  useEffect(() => {
    const blockData = data?.data();
    if (blockData) {
      setCurrentBlock(dataToBlock(blockData as BlockData, getProject, getTask));
    }
  }, [data, getProject, getTask]);

  const pushCurrentBlock = async () => {
    const blockData = blockToData({ ...(currentBlock as Block), timerLogs, blockTime });
    const id = getId();
    try {
      await addItemToArrayDoc(blockData, 'blocks', 'blocks', id);
    } catch {
      await setDoc({ blocks: [blockData] }, 'blocks', id);
    } finally {
      resetTimer();
      const task = currentBlock?.blockPlan?.task;
      if (task) {
        await addBlockToTask(task, id);
      }
    }
  };

  const updateTitle = async (title: string) => {
    setCurrentBlock((prev: Block) => ({
      ...prev,
      title,
    }));
    await updateDoc({ title }, 'data/currentBlock');
  };

  const updateBlockPlan = async (blockPlan: BlockPlan) => {
    const blockPlansData = [blockPlanToData(blockPlan)];
    await updateDoc({ blockPlansData }, 'data/currentBlock');
  };

  const color = currentBlock?.color ?? 'gray-400';

  const value = {
    currentBlock,
    loading,
    error,
    pushCurrentBlock,
    updateBlockPlan,
    updateTitle,
    color,
    inputRef,
  };

  return (
    <currentBlockContext.Provider value={value}>
      {children}
    </currentBlockContext.Provider>
  );
};

export const useCurrentBlock = () => useContext(currentBlockContext);
