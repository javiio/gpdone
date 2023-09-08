import React, { useState, useEffect } from 'react';
import { type Task } from '../';

interface PlannedPickerProps {
  task: Task
}

export const PlannedTag = ({ task }: PlannedPickerProps) => {
  const [color, setColor] = useState<string>('gray-500');

  useEffect(() => {
    switch (task.planned) {
      case 'today':
        setColor('green-500');
        break;
      case 'week':
        setColor('orange-500');
        break;
      case 'quarter':
        setColor('purple-500');
        break;
      default:
        setColor('');
        break;
    }
  }, [task]);

  return (
    <>
      {task.planned && (
        <div className={`text-xs text-center py-0.5 w-6 rounded border border-${color} bg-${color}/50`}>
          {task.planned.substring(0, 1).toUpperCase()}
        </div>
      )}
    </>
  );
};
