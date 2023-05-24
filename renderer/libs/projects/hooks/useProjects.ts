import { useEffect, useState, useCallback } from 'react';
import { useCollection } from '~platform';
import type { Project, ProjectData } from '../';

export const useProjects = () => {
  const [projects, setProjects] = useState<Project[]>();
  const [data, isLoading, error] = useCollection('projects');

  useEffect(() => {
    if (data) {
      setProjects(
        data.docs.map((doc): Project => ({ ...doc.data() as ProjectData, id: doc.id }))
      );
    }
  }, [data]);

  const getProject = useCallback(
    (projectId?: string) => projects?.find((p) => p.name === projectId),
    [projects]
  );

  return {
    projects,
    isLoading,
    error,
    getProject,
  };
};
