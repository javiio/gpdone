import React, { useEffect } from 'react';
import cn from 'classnames';
import { type Project, useProjects } from '..';

interface ProjectsPillTabsProps {
  project: Project | undefined
  setProject: (project) => void
}

export const ProjectsPillTabs: React.FC<ProjectsPillTabsProps> = ({ project, setProject }) => {
  const { projects } = useProjects();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.metaKey) {
      if (event.key === '0') {
        handleSelectProject(undefined);
      }
      projects?.forEach((project, i: number) => {
        const key = (i + 1).toString();
        if (event.key === key) {
          event.preventDefault();
          handleSelectProject(project);
        }
      });
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [projects]);

  const handleSelectProject = (project: Project | undefined) => {
    setProject(project);
  };

  return (
    <ul className="text-xs flex space-x-2">
      <li className="border rounded-md overflow-hidden border-gray-200 bg-gray-200/10">
        <button
          type="button"
          onClick={() => { handleSelectProject(undefined); }}
          className={cn(
            'px-1.5 py-0.5 hover:bg-gray-200/25',
            !project && 'bg-gray-200/50'
          )}
        >
          All
        </button>
      </li>
      {projects
        .map((p: Project) => (
          <li
            key={p.id}
            className={cn(
              'border rounded-md overflow-hidden',
              `border-${p.color} bg-${p.color}/10`
            )}
          >
            <button
              type="button"
              onClick={() => { handleSelectProject(p); }}
              className={cn(
                'px-1.5 py-0.5',
                `hover:bg-${p.color}/25`,
                p.id === project?.id && `bg-${p.color}/50`
              )}
            >
              {p.name}
            </button>
          </li>
        ))}
    </ul>
  );
};
