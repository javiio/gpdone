import { useState, useEffect } from 'react';
import cn from 'classnames';
import Error from '../../platform/components/Error';
import Loading from '../../platform/components/Loading';
import type { Project } from '../../projects/types';
import useCurrentBlock from '../hooks/useCurrentBlock';

function CurrentBlock() {
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
    pushCurrentBlock(title, project as Project);
  };

  return (
    <div>
      <div className="m-4"
      >
        {error && <Error />}
        {loading && <Loading />}
        {currentBlock && !loading && !error && (
          <textarea
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={cn(
              'text-3xl bg-slate-800 w-full border-l-4 p-4 overflow-auto resize-none focus:outline',
              project?.color && `border-${project?.color} focus:outline-${project?.color}`,
            )}
          />
        )}
      </div>
      <button type="button" onClick={push}>
        Add
      </button>
    </div>
  );
}

export default CurrentBlock;
