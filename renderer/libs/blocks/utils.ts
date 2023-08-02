import { Timestamp } from 'firebase/firestore';
import { DateTime } from 'luxon';
import { getDateString } from '~platform';
import type { Project } from '~projects';
import type { Task } from '~tasks';
import type { Block, BlockData } from './types';
import { blockPlanToData, dataToBlockPlan } from '~planning';

export const dataToBlock = (
  data: BlockData,
  getProject: (id?: string) => Project | undefined,
  getTask: (id?: string) => Task | undefined
): Block => {
  const blockPlanData = data.blockPlansData?.[0];
  const blockPlan = blockPlanData && dataToBlockPlan(blockPlanData, getProject, getTask);

  return {
    ...data,
    blockPlan,
    color: blockPlan.project?.color ?? 'gray-400',
  };
};

export const blockToData = (block: Block): BlockData => {
  const { blockPlan, color, ...blockData } = block;

  return {
    ...blockData,
    blockPlansData: blockPlan ? [blockPlanToData(blockPlan)] : [],
    createdAt: blockData.createdAt ?? Timestamp.now(),
  };
};

export const getId = (date: DateTime = DateTime.now()) => {
  return getDateString(date);
};

export const getDate = () => Timestamp.now();
