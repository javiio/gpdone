import { Timestamp } from 'firebase/firestore';
import { DateTime } from 'luxon';
import type { Project } from '~projects';
import type { Task } from '~tasks';
import type { Block, BlockData } from './types';

const START_TIME = 7;

export const dataToBlock = (
  data: BlockData,
  projects: Project[] | undefined,
  tasks: Task[] | undefined
): Block => {
  const project = projects?.find((p) => p.id === data.projectId);
  const buffer = updateBlockProject(data, project);
  const task = tasks?.find((t) => t.id === data.tasksIds?.[0]);
  buffer.tasks = task ? [task] : [];
  return buffer;
};

export const updateBlockProject = (
  block: Block | BlockData,
  project: Project | undefined
): Block => {
  return {
    ...block,
    projectId: project?.id ?? '',
    project,
    borderColor: project ? `border-${project.color}` : 'border-gray-500',
    bgColor: project ? `bg-${project.color}` : 'bg-gray-500',
  };
};

export const blockToData = (block: Block | BlockData): BlockData => {
  const data: BlockData = {
    title: block.title,
    projectId: block.projectId,
    tasksIds: block.tasksIds ?? [],
    timerLogs: block.timerLogs ?? [],
    blockTime: block.blockTime,
    createdAt: block.createdAt ?? Timestamp.now(),
  };

  return data;
};

export const getId = (date: DateTime = DateTime.now()) => {
  if (
    date.startOf('day') === DateTime.now().startOf('day') &&
    DateTime.now().hour < START_TIME
  ) {
    return date.minus({ days: 1 }).toFormat('yyyyMMdd');
  }
  return date.toFormat('yyyyMMdd');
};

export const getDate = () => Timestamp.now();
