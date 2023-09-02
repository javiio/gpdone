import React, { useEffect } from 'react';
import cn from 'classnames';
import { type Project, useProjects } from '..';

interface ProjectsTabsProps {
  project: Project | undefined
  setProject: (project) => void
}

export const ProjectsTabs: React.FC<ProjectsTabsProps> = ({ project, setProject }) => {
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
    <>
      <div className="flex space-x-[1px]">
        <button
          type="button"
          onClick={() => { handleSelectProject(undefined); }}
          className={cn(
            'px-2 py-1.5 text-sm min-w-[64px] rounded-md rounded-b-none border-t border-x hover:bg-gray-400/25 hover:border-gray-400/50',
            !project ? 'bg-gray-400/25 border-gray-400' : 'border-slate-900'
          )}
        >
          All
        </button>
        {projects
          .map((p: Project) => (
            <button
              key={p.id}
              type="button"
              onClick={() => { handleSelectProject(p); }}
              className={cn(
                'px-2 py-1.5 text-sm min-w-[64px] rounded-md rounded-b-none border-t border-x',
                `hover:bg-${p.color}/25 hover:border-${p.color}/50`,
                p.id === project?.id ? `border-${p.color} bg-${p.color}/25` : 'border-slate-900'
              )}
            >
              {p.name}
            </button>
          ))}
      </div>

      <div className={`w-full h-1 bg-${project?.color ?? 'gray-400'}`} />
    </>
  );
};
