import { useState, useEffect } from 'react';
import cn from 'classnames';
import { Loading, Error } from '~platform';
import { ProjectSelector } from '~projects';
import { useCurrentBlock } from '../';

export function CurrentBlock() {
  const { currentBlock, loading, error, pushCurrentBlock } =
    useCurrentBlock();
  const [title, setTitle] = useState(currentBlock?.title || '');
  const [project, setProject] = useState(currentBlock?.project);

  useEffect(() => {
    if (currentBlock) {
      setTitle(currentBlock.title);
      setProject(currentBlock.project);
    }
  }, [currentBlock]);

  const push = () => {
    pushCurrentBlock(title, project);
  };

  return (
    <div>
      {error && <Error />}
      {loading && <Loading />}
      {currentBlock && !loading && !error && (
        <>
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
              'text-3xl bg-slate-800 w-full border-l-4 p-4 overflow-auto resize-none focus:outline',
              project?.color && `border-${project?.color} focus:outline-${project?.color}`,
            )}
          />

          <ProjectSelector selected={project} onChange={setProject} />
        </>
      )}

      <button type="button" onClick={push}>
        Add
      </button>
    </div>
  );
}
