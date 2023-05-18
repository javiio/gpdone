import React from 'react';
import { useTimer, useCurrentBlock } from '../';

export const TimerProgressLine = () => {
  const { progress } = useTimer();
  const { color } = useCurrentBlock();

  console.log(progress);

  return (
    <div className="h-1">
      <div
        className={`bg-${color} h-full`}
        style={{ width: `${progress.toString()}%` }}
      />
    </div>
  );
};
