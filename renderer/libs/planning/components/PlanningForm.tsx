import React, { useEffect } from 'react';
import cn from 'classnames';
import type { DateTime } from 'luxon';
import { usePlanning } from '~planning';
import { useProjects, type Project } from '~projects';

export const PlanningForm = ({ date }: { date: DateTime }) => {
  const { projects } = useProjects();
  const { addToPlanning } = usePlanning(date);

  const handleKeyDown = (event: KeyboardEvent) => {
    projects?.forEach((project, i) => {
      const key = `${(i + 1)}`;
      if (event.key === key) {
        event.preventDefault();
        addToPlanning(project);
      }
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [projects]);

  const addProjectToPlanning = (project: Project) => {
    addToPlanning(project);
  };

  return (
    <ul className="text-xs flex space-x-2">
      {projects
        ?.sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
        .map((project, i) => (
          <li
            key={project.id}
            className={cn(
              'border rounded-md overflow-hidden',
              `border-${project.color} bg-${project.color}/50`
            )}
          >
            <button
              type="button"
              onClick={() => { addProjectToPlanning(project); }}
              className={`px-1.5 py-0.5 hover:bg-${project.color}`}
            >
              {`${i + 1}. ${project.name}`}
            </button>
          </li>
        ))}
    </ul>
  );
};
