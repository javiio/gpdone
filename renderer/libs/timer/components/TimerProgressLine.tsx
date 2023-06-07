import React from 'react';
import { useCurrentBlock } from '~blocks';
import { useTimer } from '../';

export const TimerProgressLine = () => {
  const { progress } = useTimer();
  const { color } = useCurrentBlock();

  return (
    <div className="h-2">
      <div
        className={`bg-${color} h-full`}
        style={{ width: `${(100 - progress).toString()}%` }}
      />
    </div>
  );
};
