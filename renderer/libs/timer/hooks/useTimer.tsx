import React, {
  useEffect,
  useState,
  useContext,
  createContext,
  type ReactNode,
} from 'react';
import { Timestamp } from 'firebase/firestore';
import type { TimerLog, TimerLogAction } from '../';

interface TimerContext {
  blockTime: number
  remainingTime: number
  setRemainingTime: (t: number | ((number) => number)) => void
  isPaused: boolean
  toggleTimer: () => void
  startTimer: () => void
  resetTimer: () => void
  formatTime: () => string
  progress: number
  timerLogs: TimerLog[]
};

const BLOCK_TIME = 25 * 60;

const timerContext = createContext<TimerContext>({
  blockTime: BLOCK_TIME,
  remainingTime: BLOCK_TIME,
  setRemainingTime: (t: number) => {},
  isPaused: true,
  toggleTimer: () => {},
  startTimer: () => {},
  resetTimer: () => {},
  formatTime: () => '',
  progress: 0,
  timerLogs: [],
});

export const ProvideTimer = ({ children }: { children: ReactNode }) => {
  const [remainingTime, setRemainingTime] = useState(BLOCK_TIME);
  const [isPaused, setIsPaused] = useState(true);
  const [progress, setProgress] = useState(0);
  const [timerLogs, setTimerLogs] = useState<TimerLog[]>([]);

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

    addTimerLog();

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

  const startTimer = () => {
    setIsPaused(false);
  };

  const resetTimer = () => {
    setRemainingTime(BLOCK_TIME);
    setIsPaused(true);
    setTimerLogs([]);
    setProgress(0);
  };

  const formatTime = () => {
    const minutes = Math.floor(remainingTime / 60).toString().padStart(2, '0');
    const seconds = (remainingTime % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const addTimerLog = () => {
    let action: TimerLogAction;
    if (isPaused && remainingTime === BLOCK_TIME) {
      return;
    }
    if (remainingTime === BLOCK_TIME) {
      action = 'start';
    } else if (remainingTime === 0) {
      action = 'finish';
    } else {
      action = isPaused ? 'pause' : 'resume';
    }
    setTimerLogs((prev) => ([...prev, { action, time: Timestamp.now() }]));
  };

  const value: TimerContext = {
    blockTime: BLOCK_TIME,
    remainingTime,
    setRemainingTime,
    isPaused,
    startTimer,
    toggleTimer,
    resetTimer,
    formatTime,
    progress,
    timerLogs,
  };

  return (
    <timerContext.Provider value={value}>
      {children}
    </timerContext.Provider>
  );
};

export const useTimer = () => useContext(timerContext);
