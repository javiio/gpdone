import React, { useEffect } from 'react';
import { useProjects } from '~projects';
import { usePlanning } from '../';

export const PlanningList = () => {
  const { planning, addToPlanning } = usePlanning();
  const { projects } = useProjects();

  const handleKeyDown = (event: KeyboardEvent) => {
    projects?.forEach((project, i) => {
      const key = `${(i + 1)}`;
      if (event.key === key) {
        event.preventDefault();
        addToPlanning(project.id);
      }
    });
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [projects]);

  return (
    <ul>
      {planning.map((project, i) => {
        return (
          <li key={i}>
            {project?.name}
          </li>
        );
      })}
    </ul>
  );
};
