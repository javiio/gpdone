import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import type { DateTime } from 'luxon';
import { useDailyBlocks, type Block } from '../';

const START_TIME = 7;
const END_TIME = 24;
const HEIGHT_PER_MINUTE = 1.2;
const times = Array.from(Array(END_TIME - START_TIME).keys()).map(
  (i) => `${i + START_TIME}:00`
);

const calcTimePosition = (time = new Date(), blockTime = 0) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  let minutesFromStartTime = (hours - START_TIME) * 60 + minutes;
  if (hours < START_TIME) {
    minutesFromStartTime += 24 * 60;
  }

  minutesFromStartTime -= blockTime / 60;
  return minutesFromStartTime * HEIGHT_PER_MINUTE;
};

const calcBlockPosition = (block: Block) => {
  let time: Date;
  if (
    block.timerLogs?.length &&
    block.timerLogs[block.timerLogs.length - 1].action === 'finish'
  ) {
    time = block.timerLogs[block.timerLogs.length - 1].time.toDate();
  } else {
    time = block.createdAt?.toDate() ?? new Date();
  }

  return calcTimePosition(time ?? new Date(), block.blockTime ?? 25 * 60);
};

export const DailyBlocks = ({ date }: { date?: DateTime }) => {
  const [currentTimePosition, setCurrentTimePosition] = useState(
    calcTimePosition()
  );
  const [viewMode, setViewMode] = useState<'full' | 'compact'>('compact');
  const { blocks } = useDailyBlocks(date);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimePosition(calcTimePosition());
    }, 60 * 1000); // Update current time every min

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.metaKey && event.key === 'v') {
        toggleViewMode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const toggleViewMode = () => {
    setViewMode((prev) => prev === 'full' ? 'compact' : 'full');
  };

  const renderBlocks = () => {
    const blocksPerProject: Record<string, number> = {};
    return blocks?.map((block, i) => {
      const projectId = block.blockPlan?.projectId ?? '';
      const count = (blocksPerProject[projectId] ?? 0) + 1;
      blocksPerProject[projectId] = count;
      const blockTime = block.blockTime ?? 25 * 60;
      return (
        <div
          key={i}
          className={cn(
            'py-1 pl-4 pr-6 text-sm w-96 border border-l-8 truncate',
            `border-${block.color} bg-${block.color}/10`,
            `${viewMode === 'full' ? 'absolute' : 'mb-1'}`
          )}
          style={{
            height: (blockTime / 60) * HEIGHT_PER_MINUTE,
            top: calcBlockPosition(block),
          }}
        >
          <div className="float-right opacity-50 text-sm -mr-4">
            {count}
          </div>
          {block.title}
        </div>
      );
    });
  };

  return (
    <div className="flex">
      <div className="w-12">
        {viewMode === 'full' && times.map((time) => (
          <div
            key={time}
            className="text-sm p-1.5 text-white/75 text-right"
            style={{ height: 60 * HEIGHT_PER_MINUTE }}
          >
            {time}
          </div>
        ))}
      </div>
      <div className="relative flex-1">
        {viewMode === 'full' && times.map((time) => (
          <div key={time}>
            <div
              className="border-b border-white/10 w-full"
              style={{ height: 30 * HEIGHT_PER_MINUTE }}
            />
            <div
              className="border-b border-white/30 w-full"
              style={{ height: 30 * HEIGHT_PER_MINUTE }}
            />
          </div>
        ))}
        {renderBlocks()}
        {viewMode === 'full' && (
          <div
            className="w-full h-0.5 bg-red-500 absolute"
            style={{ top: currentTimePosition }}
          >
            <div
            className="w-2.5 h-2.5 bg-red-500 rounded-full -mt-1"
            />
          </div>
        )}
      </div>
    </div>
  );
};
