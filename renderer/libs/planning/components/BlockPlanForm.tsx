import React, { useRef } from 'react';
import { ProjectCombobox, type Project } from '~projects';
import { TaskCombobox, TaskBlocksProgress, type Task } from '~tasks';
import { type BlockPlan } from '..';

interface Props {
  value: BlockPlan
  onChange: (blockPlan: BlockPlan) => Promise<void>
  showProgress?: boolean
};

export const BlockPlanForm = ({ value, onChange, showProgress = true }: Props) => {
  const { project, task } = value;
  const taskInputRef = useRef<HTMLInputElement>(null);

  const handleOnChangeProject = async (p: Project) => {
    if (p.id === project?.id) {
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
    <div className="flex space-x-2 items-center">
      <ProjectCombobox value={project} onChange={handleOnChangeProject} />
      <TaskCombobox
        value={task}
        onChange={handleOnChangeTask}
        project={project}
        ref={taskInputRef}
      />
      {task && showProgress && (
        <TaskBlocksProgress task={task} />
      )}
    </div>
  );
};
