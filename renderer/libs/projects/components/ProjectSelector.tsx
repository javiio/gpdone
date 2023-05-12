import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import { useProjects, type Project } from '../';

interface Props {
  selected: Project | undefined
  onChange: (p: Project) => void
  enableShortcuts?: () => boolean
}

export const ProjectSelector = ({ selected, onChange, enableShortcuts }: Props) => {
  const { projects } = useProjects();
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
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
              onChange(project);
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

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [projects, showAll]);

  return (
    <ul className="text-xs flex space-x-2">
      {projects
        ?.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
        ?.filter((project) => showAll || project.id === selected?.id)
        .map((project) => (
          <li
            key={project.id}
            className={cn(
              'border rounded-md overflow-hidden',
              `border-${project.color} bg-${project.color}/10`
            )}
          >
            {project.id === selected?.id
              ? (<div className={`px-1.5 py-0.5 bg-${project.color}/50`}>
                  {project.name}
                </div>
                )
              : (<button
                  type="button"
                  onClick={() => { onChange(project); }}
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
