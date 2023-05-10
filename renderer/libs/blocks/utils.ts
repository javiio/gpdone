import { Timestamp } from 'firebase/firestore';
import { DateTime } from 'luxon';
import type { Project } from '~projects';
import type { Block, BlockData } from './types';

export const dataToBlock = (
  data: BlockData,
  projects: Project[] | undefined
): Block | undefined => {
  const block = { ...data } as Block;
  const project = projects?.find((p) => p.id === block.projectId);
  if (project) {
    block.project = project;
    block.borderColor = project.color && `border-${project.color}`;
    block.bgColor = project.color && `bg-${project.color}`;
  }

  return block;
};

export const blockToData = (block: Block): BlockData => {
  const data: BlockData = {
    title: block.title,
    projectId: block.projectId,
    createdAt: block.createdAt || Timestamp.now(),
  };

  return data;
};

export const getId = (date = DateTime.now()) => date.toFormat('yyyyMMdd');

export const getDate = () => Timestamp.now();
