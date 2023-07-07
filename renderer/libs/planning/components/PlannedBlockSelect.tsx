import React, { useRef } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { ProjectCombobox, type Project } from '~projects';
import { TaskCombobox, type Task } from '~tasks';
import { type PlannedBlock } from '../';

interface Props {
  value: PlannedBlock
  onChange: (plannedBlock: PlannedBlock) => Promise<void>
  onRemove: () => Promise<void>
};

export const PlannedBlockSelect = ({ value, onChange, onRemove }: Props) => {
  const { project, task } = value;
  const taskInputRef = useRef<HTMLInputElement>(null);

  const handleOnChangeProject = async (p: Project) => {
    if (p.id === project.id) {
      return;
    }
    await onChange({ project: p, projectId: p.id });
    taskInputRef.current?.focus();
  };

  const handleOnChangeTask = async (t: Task) => {
    await onChange({ ...value, taskId: t.id, task: t });
  };

  if (!project) {
    return null;
  }

  return (
    <div className="relative flex py-1 px-2 space-x-2 items-center border border-transparent hover:border-slate-500 rounded-md group">
      <ProjectCombobox value={project} onChange={handleOnChangeProject} />
      <TaskCombobox
        value={task}
        onChange={handleOnChangeTask}
        project={project}
        ref={taskInputRef}
      />
      <button
        onClick={onRemove}
        className="absolute inset-y-0 right-2 hidden group-hover:block"
      >
        <XMarkIcon className="h-4 w-4" />
      </button>
    </div>
  );
};
