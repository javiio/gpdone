import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useCurrentBlock } from '~blocks';
import { type Project, useProjects } from '../';

export const ProjectSelector = () => {
  const { currentBlock, updateProject } = useCurrentBlock();
  const { projects } = useProjects();
  const [showAll, setShowAll] = useState(false);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey && event.key === 'p') {
      event.preventDefault();
      setShowAll((prev) => !prev);
    }
    if (showAll) {
      projects?.forEach((project, i: number) => {
        const key = (i + 1).toString();
        if (event.key === key) {
          event.preventDefault();
          updateProject(project);
          setShowAll(false);
        }
      });
      if (event.key === 'Escape') {
        event.preventDefault();
        setShowAll(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [projects, showAll]);

  const handleSelectedProject = (project: Project) => {
    if (showAll) {
      updateProject(project);
      setShowAll(false);
    } else {
      setShowAll(true);
    }
  };

  return (
    <ul className="text-xs flex space-x-2">
      {projects
        ?.filter((project) => showAll || project.id === currentBlock?.project?.id)
        .map((project) => (
          <li
            key={project.id}
            className={cn(
              'border rounded-md overflow-hidden',
              `border-${project.color} bg-${project.color}/10`
            )}
          >
            <button
              type="button"
              onClick={() => { handleSelectedProject(project); }}
              className={cn(
                'px-1.5 py-0.5',
                `hover:bg-${project.color}/25`,
                project.id === currentBlock?.project?.id && `bg-${project.color}/50`
              )}
            >
              {project.name}
            </button>
          </li>
        ))}
    </ul>
  );
};
