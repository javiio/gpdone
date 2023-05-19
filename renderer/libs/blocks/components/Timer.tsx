import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';
import { useTimer, useCurrentBlock } from '../';
import { ConfirmationModal } from '~platform';

const Timer: React.FC = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const {
    blockTime,
    remainingTime,
    toggleTimer,
    resetTimer,
    isPaused,
    formatTime,
  } = useTimer();
  const { color } = useCurrentBlock();

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

  return (
    <div>
      {isPaused && remainingTime !== blockTime && (
        <button onClick={() => { setShowConfirmation(true); }}>
          <FontAwesomeIcon icon={faRefresh} className="mr-1.5 opacity-70" />
        </button>
      )}
      <button
        onClick={toggleTimer}
        className={cn('text-4xl', isPaused ? 'opacity-70' : `text-${color}`)}
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

export default Timer;
