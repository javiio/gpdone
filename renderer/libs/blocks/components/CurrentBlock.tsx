import React, { useEffect, useRef } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { Loading, Error } from '~platform';
import { ProjectSelector } from '~projects';
import { Timer, TimerProgressLine } from '~timer';
import { useCurrentBlock } from '../';

export const CurrentBlock = () => {
  const {
    currentBlock,
    updateTitle,
    loading,
    error,
    pushCurrentBlock,
    saveCurrentBlock,
    color,
  } = useCurrentBlock();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    calcInputHeight();
  }, [currentBlock]);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (enableShortcuts()) {
      if (event.key === 'e') {
        event.preventDefault();
        textareaRef.current?.focus();
        textareaRef.current?.select();
      } else if (event.key === 'a') {
        event.preventDefault();
        pushCurrentBlock()
          .catch((e) => { console.log(e); });
      }
    } else if (event.key === 'Escape') {
      event.preventDefault();
      textareaRef.current?.blur();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentBlock]);

  const enableShortcuts = () => {
    return !textareaRef.current?.matches(':focus');
  };

  const blur = async () => {
    await saveCurrentBlock();
  };

  const calcInputHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleOnChangeTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateTitle(e.target.value);
  };

  return (
    <div className="relative">
      {error && <Error />}
      {loading && <Loading />}
      {currentBlock && !loading && !error && (
        <>
          <textarea
            ref={textareaRef}
            value={currentBlock.title}
            onChange={handleOnChangeTitle}
            onBlur={blur}
            className={cn(
              'text-3xl bg-slate-950 w-full border-l-8 p-4 pb-10 overflow-auto overscroll-none resize-none focus:outline',
              `border-${color} focus:outline-${color}`
            )}
            rows={1}
          />

          <div className="absolute left-6 bottom-3">
            <ProjectSelector enableShortcuts={enableShortcuts}
            />
          </div>

          <div className="absolute right-14 bottom-1.5">
            <Timer />
          </div>

          <div className="absolute right-4 bottom-2.5">
            <button onClick={pushCurrentBlock}>
              <FontAwesomeIcon icon={faPlus} size="lg" />
            </button>
          </div>

          <div className="absolute left-0 right-0 bottom-0.5">
            <TimerProgressLine />
          </div>
        </>
      )}
    </div>
  );
};
