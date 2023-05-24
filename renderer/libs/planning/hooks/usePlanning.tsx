import { useEffect, useState } from 'react';
import type { DateTime } from 'luxon';
import type { Project } from '~projects';
import { useDoc, setDoc } from '~platform';
import { useProjects } from '~projects';
import { getId } from '~blocks';

export const usePlanning = (date?: DateTime) => {
  const [planning, setPlanning] = useState<Project[]>([]);
  const [data, isLoading, error] = useDoc('blocks', getId(date));
  const { getProject } = useProjects();

  useEffect(() => {
    if (data?.data()) {
      const planningData = data.data()?.planning || [];
      setPlanning(planningData.map((projectId: string) => getProject(projectId)));
    } else {
      setPlanning([]);
    }
  }, [data, date, getProject]);

  const addToPlanning = (project: Project) => {
    setPlanning((prev) => {
      const p = [...prev, project];
      setDoc({ planning: p.map((project) => project.id) }, 'blocks', getId(date))
        .catch((e) => { console.log(e); });
      return p;
    });
  };

  return {
    planning,
    isLoading,
    error,
    addToPlanning,
  };
};
