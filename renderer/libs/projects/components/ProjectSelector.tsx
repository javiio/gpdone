import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useRecoilState } from 'recoil';
import { currentBlockState, updateBlockProject } from '~blocks';
import { useProjects } from '../';

export const ProjectSelector = ({ enableShortcuts }: { enableShortcuts: () => boolean }) => {
  const [currentBlock, setCurrentBlock] = useRecoilState(currentBlockState);
  const { projects } = useProjects();
  const [showAll, setShowAll] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (enableShortcuts?.()) {
      if (event.key === 'p') {
        event.preventDefault();
        setShowAll(true);
      } else if (showAll) {
        projects?.forEach((project, i) => {
          const key = `${(i + 1)}`;
          if (event.key === key) {
            event.preventDefault();
            setCurrentBlock((prev) => updateBlockProject(prev, project));
            setShowAll(false);
          }
        });
        if (event.key === 'Escape') {
          event.preventDefault();
          setShowAll(false);
        }
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [projects, showAll]);

  return (
    <ul className="text-xs flex space-x-2">
      {projects
        ?.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
        ?.filter((project) => showAll || project.id === currentBlock.project?.id)
        .map((project) => (
          <li
            key={project.id}
            className={cn(
              'border rounded-md overflow-hidden',
              `border-${project.color} bg-${project.color}/10`
            )}
          >
            {project.id === currentBlock.project?.id
              ? (<div className={`px-1.5 py-0.5 bg-${project.color}/50`}>
                  {project.name}
                </div>
                )
              : (<button
                  type="button"
                  onClick={() => { setCurrentBlock((prev) => updateBlockProject(prev, project)); }}
                  className={`px-1.5 py-0.5 hover:bg-${project.color}/25`}
                >
                  {project.name}
                </button>
                )
            }
          </li>
        ))}
    </ul>
  );
};
