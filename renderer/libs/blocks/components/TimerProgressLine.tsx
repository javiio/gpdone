import React from 'react';
import { useRecoilValue } from 'recoil';
import { remainingTimeState, BLOCK_TIME } from '../';

export const TimerProgressLine = ({ color = 'gray-400' }: { color?: string }) => {
  const remainingTime = useRecoilValue(remainingTimeState);
  const progress = ((BLOCK_TIME - remainingTime) / (BLOCK_TIME)) * 100;

  return (
    <div className="h-1">
      <div
        className={`bg-${color} h-full`}
        style={{ width: `${progress}%` }}
      ></div>
    </div>
  );
};
