import { useEffect } from 'react';
import { atom, useRecoilState } from 'recoil';

const BLOCK_TIME = 5;

export const remainingTimeState = atom<number>({
  key: 'remainingTimeState',
  default: BLOCK_TIME,
});

export const isPausedState = atom<boolean>({
  key: 'isPausedState',
  default: true,
});

export const useTimer = () => {
  const [remainingTime, setRemainingTime] = useRecoilState(remainingTimeState);
  const [isPaused, setIsPaused] = useRecoilState(isPausedState);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime <= 0) {
            clearInterval(interval);
            return BLOCK_TIME;
          }
          return prevTime - 1;
        });
      }, 1000);
    }

    return () => { clearInterval(interval); };
  }, [isPaused]);

  useEffect(() => {
    if (remainingTime === 0) {
      setIsPaused(true);
    }
  }, [remainingTime]);

  const toggleTimer = () => {
    setIsPaused((prev) => !prev);
  };

  const resetTimer = () => {
    setRemainingTime(BLOCK_TIME);
    setIsPaused(true);
  };

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
    const seconds = (remainingTime % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  return {
    blockTime: BLOCK_TIME,
    remainingTime,
    setRemainingTime,
    isPaused,
    setIsPaused,
    toggleTimer,
    resetTimer,
    formatTime,
  };
};
