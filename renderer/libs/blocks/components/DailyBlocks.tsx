import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useDailyBlocks, type Block } from '../';

const BLOCK_TIME = 25;
const START_TIME = 7;
const END_TIME = 24;
const HEIGHT_PER_MINUTE = 1.2;
const times = Array.from(Array(END_TIME - START_TIME).keys()).map(
  (i) => `${i + START_TIME}:00`
);

const calcTimePosition = (time = new Date(), decreaseBlockSize = false) => {
  const hours = time.getHours();
  const minutes = time.getMinutes();
  let minutesFromStartTime = (hours - START_TIME) * 60 + minutes;
  if (hours < START_TIME) {
    minutesFromStartTime += 24 * 60;
  }
  if (decreaseBlockSize) {
    minutesFromStartTime -= BLOCK_TIME;
  }
  return minutesFromStartTime * HEIGHT_PER_MINUTE;
};

const calcBlockPosition = (block: Block) => {
  const time = block.createdAt?.toDate();
  return calcTimePosition(time ?? new Date(), true);
};

export const DailyBlocks = () => {
  const [currentTimePosition, setCurrentTimePosition] = useState(
    calcTimePosition()
  );
  const { blocks } = useDailyBlocks();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTimePosition(calcTimePosition());
    }, 5 * 60 * 1000); // Update current time every 5 mins

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const renderBlocks = () => {
    const blocksPerProject: Record<string, number> = {};
    return blocks?.map((block, i) => {
      const count = (blocksPerProject[block.projectId] ?? 0) + 1;
      blocksPerProject[block.projectId] = count;
      return (
        <div
          key={i}
          className={cn(
            'mx-3 py-1 px-4 text-sm absolute w-96',
            `border border-l-8 ${block.borderColor}`,
            `${block.bgColor}/10`
          )}
          style={{
            height: BLOCK_TIME * HEIGHT_PER_MINUTE,
            top: calcBlockPosition(block),
          }}
        >
          {block.title}

          <div className="absolute top-1 right-2 opacity-50 text-sm">
            {count}
          </div>
        </div>
      );
    });
  };

  return (
    <div className="flex">
      <div>
        {times.map((time) => (
          <div
            key={time}
            className="text-sm pt-1.5 text-white/75"
            style={{ height: 60 * HEIGHT_PER_MINUTE }}
          >
            {time}
          </div>
        ))}
      </div>
      <div className="relative flex-1">
        {times.map(() => (
          <>
            <div
              className="border-b border-white/10 w-full"
              style={{ height: 30 * HEIGHT_PER_MINUTE }}
            />
            <div
              className="border-b border-white/30 w-full"
              style={{ height: 30 * HEIGHT_PER_MINUTE }}
            />
          </>
        ))}

        {renderBlocks()}

        <div
          className="w-full h-0.5 bg-red-500 absolute"
          style={{ top: currentTimePosition }}
        >
          <div
          className="w-2.5 h-2.5 bg-red-500 rounded-full -mt-1"
           />
        </div>
      </div>
    </div>
  );
};
