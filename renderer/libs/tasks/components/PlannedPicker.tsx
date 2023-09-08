import React from 'react';
import cn from 'classnames';
import { type TaskPlanned } from '../';
import { Button } from '~platform';

interface PlannedPickerProps {
  value: TaskPlanned | null
  setValue: (planned: TaskPlanned | null) => void
}

export const PlannedPicker = ({ value, setValue }: PlannedPickerProps) => {
  const handleOnClick = (planned: TaskPlanned) => {
    setValue(value === planned ? null : planned);
  };

  return (
    <div className="flex space-x-2">
      <Button
        size="xs"
        variant={value === 'today' ? 'primary' : 'clear'}
        onClick={() => { handleOnClick('today'); }}
        className={cn(
          'w-6 text-center !py-0 !px-0 !block hover:bg-green-500 hover:border-green-500',
          { '!bg-green-500': value === 'today' }
        )}
      >
        T
      </Button>
      <Button
        size="xs"
        variant={value === 'week' ? 'primary' : 'clear'}
        onClick={() => { handleOnClick('week'); }}
        className={cn(
          'w-6 text-center !px-0 !block hover:bg-orange-500 hover:border-orange-500',
          { '!bg-orange-500': value === 'week' }
        )}
      >
        W
      </Button>
      <Button
        size="xs"
        variant={value === 'quarter' ? 'primary' : 'clear'}
        onClick={() => { handleOnClick('quarter'); }}
        className={cn(
          'w-6 text-center !px-0 !block hover:bg-purple-500 hover:border-purple-500',
          { '!bg-purple-500': value === 'quarter' }
        )}
      >
        Q
      </Button>
    </div>
  );
};
