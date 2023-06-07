import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Loading, Error, ConfirmationModal } from '~platform';
import { ProjectSelector } from '~projects';
import { Timer, TimerProgressLine, useTimer } from '~timer';
import { useCurrentBlock } from '../';

export const CurrentBlock = () => {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fontSize, setFontSize] = useState('text-3xl');
  const {
    currentBlock,
    updateTitle,
    loading,
    error,
    pushCurrentBlock,
    saveCurrentBlock,
    color,
  } = useCurrentBlock();
  const { remainingTime, startTimer } = useTimer();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setFontSize(calcFontSize());
  }, [currentBlock]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey) {
      if (event.key === 'e') {
        event.preventDefault();
        inputRef.current?.focus();
        inputRef.current?.select();
      } else if (event.key === 'a') {
        event.preventDefault();
        push()
          .catch((e) => { console.log(e); });
      }
    }
    if (document.activeElement === inputRef.current) {
      if (event.key === 'Escape') {
        event.preventDefault();
        inputRef.current?.blur();
      } else if (event.key === 'Enter') {
        event.preventDefault();
        inputRef.current?.blur();
        startTimer();
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentBlock, remainingTime]);

  const blur = async () => {
    await saveCurrentBlock();
  };

  const push = async () => {
    if (remainingTime === 0) {
      await pushCurrentBlock();
    } else {
      setShowConfirmation(true);
    }
  };

  const calcFontSize = () => {
    const count = currentBlock?.title.length ?? 0;
    if (count < 35) {
      return 'text-5xl';
    }
    if (count < 45) {
      return 'text-4xl';
    }
    if (count < 55) {
      return 'text-3xl';
    }
    if (count < 65) {
      return 'text-2xl';
    }
    if (count < 85) {
      return 'text-xl';
    }
    if (count <= 100) {
      return 'text-lg';
    }
    return 'text-md';
  };

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle(e.target.value);
  };

  return (
    <div className="fixed top-0 right-0 left-16 h-20 z-30">
      {error && <Error />}
      {loading && <Loading />}
      {currentBlock && !loading && !error && (
        <>
          <input
            ref={inputRef}
            value={currentBlock.title}
            onChange={handleOnChangeTitle}
            onBlur={blur}
            className={cn(
              'bg-slate-950 w-full border-l-2 p-4 pr-40 focus:outline h-20',
              `${fontSize} border-${color} focus:outline-${color}`
            )}
          />

          <div className="absolute right-14 top-[55px]">
            <ProjectSelector />
          </div>

          <div className="absolute right-4 top-3">
            <Timer />
          </div>

          <div className="absolute right-5 top-[54px]">
            <button
              onClick={push}
              className={remainingTime === 0 ? `text-${color}` : 'opacity-50'}
            >
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
          </div>

          <div className="absolute left-0 right-0 top-0">
            <TimerProgressLine />
          </div>
        </>
      )}

      <ConfirmationModal
        showModal={showConfirmation}
        setShowModal={setShowConfirmation}
        onConfirm={pushCurrentBlock}
      />
    </div>
  );
};
