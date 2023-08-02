import React, { useState, useEffect } from 'react';
import { type Project, useProjects } from '../';

interface ProjectPillProps {
  projectId?: string
  project?: Project
};
export const ProjectPill = ({ projectId, project }: ProjectPillProps) => {
  const [_project, setProject] = useState<Project | undefined>();
  const { getProject } = useProjects();

  useEffect(() => {
    if (project) {
      setProject(project);
    } else if (projectId) {
      setProject(getProject(projectId));
    } else {
      setProject(undefined);
    }
  }, [projectId, project]);

  if (!_project) {
    return null;
  }

  return (
    <div className={`border rounded-md py-0.5 px-2 text-xs border-${_project.color} bg-${_project.color}/50`}>
      {_project.name}
    </div>
  );
};
