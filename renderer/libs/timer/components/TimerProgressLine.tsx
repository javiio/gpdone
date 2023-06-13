import React from 'react';
import cn from 'classnames';
import { useCurrentBlock } from '~blocks';
import { useTimer } from '../';

export const TimerProgressLine = () => {
  const { progress, isPaused } = useTimer();
  const { color } = useCurrentBlock();

  return (
    <div className="h-2">
      <div
        className={cn('h-full', isPaused ? 'bg-gray-500' : `bg-${color}`)}
        style={{ width: `${(100 - progress).toString()}%` }}
      />
    </div>
  );
};
