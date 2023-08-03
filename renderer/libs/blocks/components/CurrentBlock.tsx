import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { Loading, Error, ConfirmationModal, IconButton } from '~platform';
import { Timer, TimerProgressLine, useTimer } from '~timer';
import { BlockPlanForm, usePlanning, type BlockPlan } from '~planning';
import { useCurrentBlock, useDailyBlocks } from '../';

export const CurrentBlock = () => {
  const [title, setTitle] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [fontSize, setFontSize] = useState('text-3xl');
  const {
    currentBlock,
    updateTitle,
    loading,
    error,
    pushCurrentBlock,
    color,
    inputRef,
    updateBlockPlan,
  } = useCurrentBlock();
  const { blocks } = useDailyBlocks();
  const { remainingTime, startTimer } = useTimer();
  const { plannedUndone } = usePlanning();

  useEffect(() => {
    setFontSize(calcFontSize());
    setTitle(currentBlock?.title ?? '');
  }, [currentBlock]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey) {
      if (event.key === 'e') {
        event.preventDefault();
        inputRef?.current?.focus();
        inputRef?.current?.select();
      } else if (event.key === 'n') {
        event.preventDefault();
        push()
          .catch((e) => { console.log(e); });
      }
    }
    if (document.activeElement === inputRef?.current) {
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
    updateTitle(title);
  };

  const push = async () => {
    if (remainingTime === 0) {
      await pushCurrentBlock();
    } else {
      setShowConfirmation(true);
    }
  };

  const calcFontSize = () => {
    const count = title.length ?? 0;
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
    setTitle(e.target.value);
  };

  const handleChangeBlockPlan = async (blockPlan: BlockPlan) => {
    await updateBlockPlan(blockPlan);
  };

  return (
    <div className="fixed top-0 right-0 left-14 h-32 z-30">
      {error && <Error />}
      {loading && <Loading />}
      {currentBlock && !loading && !error && (
        <>
          <input
            ref={inputRef}
            value={title}
            onChange={handleOnChangeTitle}
            onBlur={blur}
            className={cn(
              'bg-slate-950 w-full border-l-4 px-3 pt-4 focus:outline h-32',
              `${fontSize} border-${color} focus:outline-${color}`
            )}
          />

          <div className="absolute left-4 top-3 flex space-x-2 items-center">
            {currentBlock.blockPlan && (
              <BlockPlanForm value={currentBlock.blockPlan} onChange={handleChangeBlockPlan} />
            )}
          </div>

          <div className="absolute right-4 top-2">
            <Timer />
          </div>

          <div className="absolute left-5 bottom-2 flex space-x-1">
            {blocks?.map((block, i) => (
              <div
                key={i}
                className={`h-2.5 w-2.5 rounded-full bg-${block.color}`}
              />
            ))}
            {plannedUndone.map((blockPlan, i) => (
              <div
                key={i}
                className={`h-2.5 w-2.5 rounded-full border border-${blockPlan.project?.color ?? 'gray-500'}`}
              />
            ))}
          </div>

          <IconButton
            name="plus"
            onClick={push}
            size={remainingTime === 0 ? 6 : 5}
            className={cn('absolute right-3 bottom-1',
              remainingTime === 0 ? `text-${color}` : 'opacity-50'
            )}
          />

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
