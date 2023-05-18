import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  type ReactNode,
} from 'react';

interface TimerContext {
  blockTime: number
  remainingTime: number
  isPaused: boolean
  toggleTimer: () => void
  resetTimer: () => void
  formatTime: () => string
  progress: number
};

const BLOCK_TIME = 10;

const timerContext = createContext<TimerContext>({
  blockTime: BLOCK_TIME,
  remainingTime: BLOCK_TIME,
  isPaused: true,
  toggleTimer: () => {},
  resetTimer: () => {},
  formatTime: () => '',
  progress: 0,
});

export const ProvideTimer = ({ children }: { children: ReactNode }) => {
  const [remainingTime, setRemainingTime] = useState(BLOCK_TIME);
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (!isPaused) {
      interval = setInterval(() => {
        setRemainingTime((prevTime) => {
          setProgress(((BLOCK_TIME - prevTime + 1) / (BLOCK_TIME)) * 100);
          if (prevTime <= 0) {
            clearInterval(interval);
            return 0;
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

  const value: TimerContext = {
    blockTime: BLOCK_TIME,
    remainingTime,
    isPaused,
    toggleTimer,
    resetTimer,
    formatTime,
    progress,
  };

  return (
    <timerContext.Provider value={value}>
      {children}
    </timerContext.Provider>
  );
};

export const useTimer = () => useContext(timerContext);
