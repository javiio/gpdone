import React from 'react';
import cn from 'classnames';
import type { TaskPlanned } from '..';
import { Button } from '~platform';

interface PlannedFilterProps {
  selected: TaskPlanned[]
  setSelected: (planned: TaskPlanned[]) => void
}

export const PlannedFilter = ({ selected, setSelected }: PlannedFilterProps) => {
  const handleChangePlanned = async (value: TaskPlanned) => {
    const _selected = selected.includes(value)
      ? selected.filter((planned) => planned !== value)
      : [...selected, value];
    setSelected(_selected);
  };

  return (
    <div className="flex space-x-2">
      <Button
        size="xs"
        variant={selected.includes('today') ? 'primary' : 'clear'}
        onClick={async () => { await handleChangePlanned('today'); }}
        className={cn(
          'w-6 text-center !py-0 !px-0 !block hover:bg-green-500 hover:border-green-500',
          { '!bg-green-500': selected.includes('today') }
        )}
      >
        T
      </Button>
      <Button
        size="xs"
        variant={selected.includes('week') ? 'primary' : 'clear'}
        onClick={async () => { await handleChangePlanned('week'); }}
        className={cn(
          'w-6 text-center !px-0 !block hover:bg-orange-500 hover:border-orange-500',
          { '!bg-orange-500': selected.includes('week') }
        )}
      >
        W
      </Button>
      <Button
        size="xs"
        variant={selected.includes('quarter') ? 'primary' : 'clear'}
        onClick={async () => { await handleChangePlanned('quarter'); }}
        className={cn(
          'w-6 text-center !px-0 !block hover:bg-purple-500 hover:border-purple-500',
          { '!bg-purple-500': selected.includes('quarter') }
        )}
      >
        Q
      </Button>
    </div>
  );
};
