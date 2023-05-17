import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { remainingTimeState, BLOCK_TIME } from '../';

const Timer: React.FC = () => {
  const [remainingTime, setRemainingTime] = useRecoilState(remainingTimeState);
  const [timerRunning, setTimerRunning] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout;

    if (timerRunning) {
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
  }, [timerRunning]);

  useEffect(() => {
    if (remainingTime === 0) {
      setTimerRunning(false);
    }
  }, [remainingTime]);

  const startStopTimer = () => {
    setTimerRunning((prevRunning) => !prevRunning);
  };

  const resetTimer = () => {
    setRemainingTime(BLOCK_TIME);
    setTimerRunning(false);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 's' && event.metaKey) {
      startStopTimer();
    } else if (event.key === 'b' && event.metaKey) {
      resetTimer();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); };
  }, []);

  return (
    <div className="opacity-70">
      <button onClick={startStopTimer} className="text-2xl">
        {formatTime(remainingTime)}
      </button>
      {!timerRunning && remainingTime !== BLOCK_TIME && (
        <button onClick={resetTimer}>
          <FontAwesomeIcon icon={faRefresh} className="ml-1" />
        </button>
      )}
    </div>
  );
};

export default Timer;
