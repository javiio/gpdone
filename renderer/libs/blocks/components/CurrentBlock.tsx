import React, { useState, useEffect, useRef } from 'react';
import cn from 'classnames';
import { Loading, Error } from '~platform';
import { ProjectSelector } from '~projects';
import { useCurrentBlock } from '../';

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
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!textareaRef.current?.matches(':focus')) {
        if (event.key === 'e') {
          event.preventDefault();
          textareaRef.current?.focus();
          textareaRef.current?.select();
        } else if (event.key === 'a') {
          event.preventDefault();
          push()
            .catch((e) => { console.log(e); });
        }
      } else if (event.key === 'Escape' || event.key === 'Enter') {
        event.preventDefault();
        textareaRef.current?.blur();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const blur = async () => {
    await updateCurrentBlock(title, project?.id);
  };

  const push = async () => {
    setIsPushLoading(true);
    await pushCurrentBlock(title, project);
    setIsPushLoading(false);
  };

  return (
    <div>
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
              'text-3xl bg-slate-800 w-full border-l-8 p-4 overflow-auto resize-none focus:outline',
              project?.color && `border-${project?.color} focus:outline-${project?.color}`
            )}
          />
          {isPushLoading && <Loading />}

          <ProjectSelector selected={project} onChange={setProject} />
        </>
      )}
    </div>
  );
};
