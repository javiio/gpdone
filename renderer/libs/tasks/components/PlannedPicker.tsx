import React, { useState, useEffect } from 'react';
import { useTask, type Task, type TaskPlanned } from '../';
import { Button } from '~platform';

interface PlannedPickerProps {
  task: Task
}

export const PlannedPicker = ({ task }: PlannedPickerProps) => {
  const [planned, setPlanned] = useState<TaskPlanned>();
  const { updatePlanned } = useTask(task);

  useEffect(() => {
    setPlanned(task.planned);
  }, [task]);

  const handleSetPlanned = async (value: TaskPlanned) => {
    const _planned = value === planned ? '' : value;
    setPlanned(_planned);
    await updatePlanned(_planned);
  };

  return (
    <div className="flex space-x-2">
      <Button
        size="xs"
        variant={planned === 'today' ? 'primary' : 'clear'}
        onClick={async () => { await handleSetPlanned('today'); }}
        className={planned === 'today' ? '!bg-green-500' : ''}
      >
        T
      </Button>
      <Button
        size="xs"
        variant={planned === 'week' ? 'primary' : 'clear'}
        onClick={async () => { await handleSetPlanned('week'); }}
        className={planned === 'week' ? '!bg-orange-500' : ''}
      >
        W
      </Button>
      <Button
        size="xs"
        variant={planned === 'quarter' ? 'primary' : 'clear'}
        onClick={async () => { await handleSetPlanned('quarter'); }}
        className={planned === 'quarter' ? '!bg-purple-500' : ''}
      >
        Q
      </Button>
    </div>
  );
};
