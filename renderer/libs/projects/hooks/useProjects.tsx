import React, {
  useEffect,
  useState,
  useCallback,
  useContext,
  createContext,
  type ReactNode,
} from 'react';
import type { FirestoreError } from 'firebase/firestore';
import { useCollection } from '~platform';
import type { Project, ProjectData } from '../';

interface ProjectContext {
  projects: Project[]
  isLoading: boolean
  error?: FirestoreError
  getProject: (projectId?: string) => Project | undefined
};

const projectContext = createContext<ProjectContext>({
  projects: [],
  isLoading: false,
  getProject: () => undefined,
});

export const ProvideProjects = ({ children }: { children: ReactNode }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [data, isLoading, error] = useCollection('projects');

  useEffect(() => {
    if (data) {
      setProjects(
        data.docs
          .map((doc): Project => ({ ...doc.data() as ProjectData, id: doc.id }))
          .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
      );
    }
  }, [data]);

  const getProject = useCallback(
    (projectId?: string) => projects?.find((p) => p.id === projectId),
    [projects]
  );

  const value = {
    projects,
    isLoading,
    error,
    getProject,
  };

  return (
    <projectContext.Provider value={value}>
      {children}
    </projectContext.Provider>
  );
};

export const useProjects = () => useContext(projectContext);
