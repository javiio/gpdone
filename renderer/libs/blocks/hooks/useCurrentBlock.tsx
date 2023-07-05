import React, {
  useRef,
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
import { useTasks, type Task } from '~tasks';
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
  updateTitle: (string) => void
  updateProject: (Project) => Promise<void>
  updateTask: (Task) => Promise<void>
  color: string
  inputRef?: React.RefObject<HTMLInputElement>
};

const currentBlockContext = createContext<CurrentBlockContext>({
  loading: false,
  pushCurrentBlock: async () => {},
  saveCurrentBlock: async () => {},
  updateTitle: (t: string) => {},
  updateProject: async (p: Project) => {},
  updateTask: async (t: Task) => {},
  color: 'gray-400',
});

export const ProvideCurrentBlock = ({ children }: { children: ReactNode }) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockState);
  const [data, loading, error] = useDoc('data/currentBlock');
  const { projects } = useProjects();
  const { tasks, addBlockToTask } = useTasks();
  const { timerLogs, blockTime, resetTimer } = useTimer();

  useEffect(() => {
    const blockData = data?.data();
    if (blockData) {
      setCurrentBlock(dataToBlock(blockData as BlockData, projects, tasks));
    }
  }, [data, projects, tasks]);

  const saveCurrentBlock = async () => {
    let block = currentBlock;
    setCurrentBlock((prev) => {
      block = prev;
      return prev;
    });
    if (block) {
      const { title, projectId, tasksIds } = block;
      await updateDoc({ title, projectId, tasksIds }, 'data/currentBlock');
    }
  };

  const pushCurrentBlock = async () => {
    let block = currentBlock;
    setCurrentBlock((prev) => {
      block = prev;
      return prev;
    });
    if (block) {
      const blockData = { ...blockToData(block), timerLogs, blockTime };
      const id = getId();
      try {
        await addItemToArrayDoc(blockData, 'blocks', 'blocks', id);
      } catch {
        await setDoc({ blocks: [blockData] }, 'blocks', id);
      } finally {
        resetTimer();
        const task = block.tasks?.[0];
        if (task) {
          await addBlockToTask(task, id);
        }
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
    setCurrentBlock((prev: Block) => {
      const newBlock = updateBlockProject(prev, project);
      if (prev.projectId !== project.id) {
        newBlock.tasks = [];
        newBlock.tasksIds = [];
      }
      return newBlock;
    });
    await saveCurrentBlock();
  };

  const updateTask = async (task: Task) => {
    const tasksIds = [task.id];
    const tasks = [task];
    setCurrentBlock((prev: Block) => ({ ...prev, tasksIds, tasks }));
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
    updateTask,
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
