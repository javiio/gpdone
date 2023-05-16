import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import { Loading, Error } from '~platform';
import { ProjectSelector } from '~projects';
import { TimerProgressLine, useCurrentBlock } from '../';
import Timer from './Timer';

export const CurrentBlock = () => {
  const {
    currentBlock,
    loading,
    error,
    pushCurrentBlock,
    updateCurrentBlock,
  } =
    useCurrentBlock();
  const [title, setTitle] = useState(currentBlock?.title ?? '');
  const [project, setProject] = useState(currentBlock?.project);
  const [isPushLoading, setIsPushLoading] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (currentBlock) {
      setTitle(currentBlock.title);
      setProject(currentBlock.project);
    }
  }, [currentBlock]);

  useEffect(() => {
    calcInputHeight();
  }, [title]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (enableShortcuts()) {
        if (event.key === 'e') {
          event.preventDefault();
          textareaRef.current?.focus();
          textareaRef.current?.select();
        } else if (event.key === 'a') {
          event.preventDefault();
          push()
            .catch((e) => { console.log(e); });
        }
      } else if (event.key === 'Escape') {
        event.preventDefault();
        textareaRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [title, project]);

  const enableShortcuts = () => {
    return !textareaRef.current?.matches(':focus');
  };

  const blur = async () => {
    await updateCurrentBlock(title, project?.id);
  };

  const push = async () => {
    setIsPushLoading(true);
    await pushCurrentBlock(title, project);
    setIsPushLoading(false);
  };

  const calcInputHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  return (
    <div className="relative">
      {error && <Error />}
      {loading && <Loading />}
      {currentBlock && !loading && !error && (
        <>
          <textarea
            ref={textareaRef}
            value={title}
            onChange={(e) => { setTitle(e.target.value); }}
            onBlur={blur}
            className={cn(
              'text-3xl bg-slate-950 w-full border-l-8 p-4 pb-10 overflow-auto overscroll-none resize-none focus:outline',
              project?.color && `border-${project.color} focus:outline-${project.color}`
            )}
            rows={1}
          />
          {isPushLoading && <Loading />}

          <div className="absolute left-6 bottom-3">
            <ProjectSelector
              selected={project}
              onChange={setProject}
              enableShortcuts={enableShortcuts}
            />
          </div>

          <div className="absolute right-14 bottom-1.5">
            <Timer />
          </div>

          <div className="absolute right-4 bottom-2.5">
            <button onClick={push}>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </div>

          <div className="absolute left-0 right-0 bottom-0.5">
            <TimerProgressLine color={project?.color} />
          </div>
        </>
      )}
    </div>
  );
};
