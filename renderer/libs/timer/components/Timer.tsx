import React, { useEffect, useState, useRef } from 'react';
import cn from 'classnames';
import { ConfirmationModal, IconButton } from '~platform';
import { useCurrentBlock } from '~blocks';
import { ding, tick } from '~assets';

import { useTimer } from '../';

export const Timer: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    blockTime,
    remainingTime,
    setRemainingTime,
    toggleTimer,
    resetTimer,
    isPaused,
    formatTime,
  } = useTimer();
  const { color } = useCurrentBlock();
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 's' && event.metaKey) {
      toggleTimer();
    } else if (event.key === 'b' && event.metaKey) {
      resetTimer();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => { document.removeEventListener('keydown', handleKeyDown); };
  }, []);

  useEffect(() => {
    if (remainingTime === 0) {
      playFinished();
    } else if (!isPaused && remainingTime % 60 === 0) {
      playAudio(tick);
    }
  }, [remainingTime, isPaused]);

  const playFinished = () => {
    playAudio(ding);
    // Play each 12 seconds until timer is reset
    const interval = setInterval(() => {
      setRemainingTime((prev: number) => {
        if (prev === 0) {
          playAudio(ding);
        } else {
          clearInterval(interval);
        }
        return prev;
      });
    }, 12000);
  };

  const playAudio = (source: string) => {
    const audioElement = audioRef.current;
    if (audioElement) {
      if (!audioElement.src.endsWith(source)) {
        audioElement.src = source;
      }
      void audioElement.play();
    }
  };

  return (
    <div className="relative">
      <audio ref={audioRef} />
      {isPaused && remainingTime !== blockTime && (
        <IconButton
          name="refresh"
          size="4"
          onClick={() => { setShowConfirmation(true); }}
          className="absolute top-[1px] -left-5"
        />
      )}
      <button
        onClick={toggleTimer}
        className={cn('text-4xl font-[Arial]', isPaused ? 'opacity-70' : `text-${color}`)}
      >
        {formatTime()}
      </button>

      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        onConfirm={resetTimer}
      />
    </div>
  );
};
