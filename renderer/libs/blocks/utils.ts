import { Timestamp } from 'firebase/firestore';
import { DateTime } from 'luxon';
import type { Project } from '~projects';
import type { Block, BlockData } from './types';

const START_TIME = 7;

export const dataToBlock = (
  data: BlockData,
  projects: Project[] | undefined
): Block => {
  const project = projects?.find((p) => p.id === data.projectId);
  return {
    ...data,
    project,
    borderColor: project ? `border-${project.color}` : 'border-gray-500',
    bgColor: project ? `bg-${project.color}` : 'bg-gray-500',
  };
};

export const blockToData = (block: Block | BlockData): BlockData => {
  const data: BlockData = {
    title: block.title,
    projectId: block.projectId,
    createdAt: block.createdAt ?? Timestamp.now(),
  };

  return data;
};

export const getId = (date: DateTime = DateTime.now()) => {
  if (date.hour < START_TIME) {
    return date.minus(24 * 60 * 60 * 1000).toFormat('yyyyMMdd');
  }
  return date.toFormat('yyyyMMdd');
};

export const getDate = () => Timestamp.now();
