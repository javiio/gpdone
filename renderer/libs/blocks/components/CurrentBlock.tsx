import React, { useEffect, useRef, useState } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Loading, Error, ConfirmationModal } from '~platform';
import { ProjectSelector } from '~projects';
import { Timer, TimerProgressLine, useTimer } from '~timer';
import { useCurrentBlock, useDailyBlocks } from '../';

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
  const { blocks } = useDailyBlocks();
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
      } else if (event.key === 'n') {
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
    if (count < 25) {
      return 'text-5xl';
    }
    if (count < 35) {
      return 'text-4xl';
    }
    if (count < 45) {
      return 'text-3xl';
    }
    if (count < 55) {
      return 'text-2xl';
    }
    if (count < 75) {
      return 'text-xl';
    }
    if (count <= 90) {
      return 'text-lg';
    }
    return 'text-md';
  };

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateTitle(e.target.value);
  };

  return (
    <div className="fixed top-0 right-0 left-14 h-32 z-30">
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
              'bg-slate-950 w-full border-l-4 px-3 pt-2 focus:outline h-32',
              `${fontSize} border-${color} focus:outline-${color}`
            )}
          />

          <div className="absolute left-4 top-4">
            <ProjectSelector />
          </div>

          <div className="absolute right-4 top-2">
            <Timer />
          </div>

          <div className="absolute left-5 bottom-2 flex space-x-1">
            {blocks?.map((block, i) => (
              <div
                key={i}
                className={cn('h-2.5 w-2.5 rounded-full', block.bgColor)}
              />
            ))}
          </div>

          <div className="absolute right-4 bottom-1">
            <button
              onClick={push}
              className={remainingTime === 0 ? `text-${color}` : 'opacity-50'}
            >
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
          </div>

          <div className="absolute left-[4px] right-0 top-0">
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
