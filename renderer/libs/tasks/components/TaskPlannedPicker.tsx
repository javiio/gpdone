import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useTask } from '..';
import type { Task, TaskPlanned } from '..';
import { Button } from '~platform';

interface TaskPlannedPickerProps {
  task: Task
}

export const TaskPlannedPicker = ({ task }: TaskPlannedPickerProps) => {
  const [planned, setPlanned] = useState<TaskPlanned | null>(null);
  const { updatePlanned } = useTask(task);

  useEffect(() => {
    setPlanned(task.planned ?? null);
  }, [task]);

  const handleChangePlanned = async (value: TaskPlanned) => {
    const _planned = value === planned ? null : planned;
    setPlanned(_planned);
    await updatePlanned(_planned);
  };

  return (
    <div className="flex space-x-2">
      <Button
        size="xs"
        variant={planned === 'today' ? 'primary' : 'clear'}
        onClick={async () => { await handleChangePlanned('today'); }}
        className={cn(
          'w-6 text-center !py-0 !px-0 !block hover:bg-green-500 hover:border-green-500',
          { '!bg-green-500': planned === 'today' }
        )}
      >
        T
      </Button>
      <Button
        size="xs"
        variant={planned === 'week' ? 'primary' : 'clear'}
        onClick={async () => { await handleChangePlanned('week'); }}
        className={cn(
          'w-6 text-center !px-0 !block hover:bg-orange-500 hover:border-orange-500',
          { '!bg-orange-500': planned === 'week' }
        )}
      >
        W
      </Button>
      <Button
        size="xs"
        variant={planned === 'quarter' ? 'primary' : 'clear'}
        onClick={async () => { await handleChangePlanned('quarter'); }}
        className={cn(
          'w-6 text-center !px-0 !block hover:bg-purple-500 hover:border-purple-500',
          { '!bg-purple-500': planned === 'quarter' }
        )}
      >
        Q
      </Button>
    </div>
  );
};
