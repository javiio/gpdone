import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import { useCookie } from 'react-use';
import { ResizablePanels } from '~platform';
import { ProjectsTabs, type Project, useProjects } from '~projects';
import { TaskForm, TasksList, TaskInfo, useTasks } from '~tasks';

const Tasks = () => {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const [projectId, setProjectId] = useCookie('tasks-project-id');
  const { selectedTask } = useTasks();
  const { getProject } = useProjects();

  const handleSetProject = (project: Project) => {
    setProject(project);
    setProjectId(project?.id);
  };

  useEffect(() => {
    if (projectId && !project) {
      setProject(getProject(projectId));
    }
  }, [projectId, getProject]);

  return (
    <React.Fragment>
      <Head>
        <title>Tasks</title>
      </Head>
      <ResizablePanels vertical aSize="40%" bSize="60%">
        <div className="p-4 pt-2">
          <ProjectsTabs project={project} setProject={handleSetProject} />
          <div className="my-4">
            <TaskForm project={project} />
          </div>
          <TasksList project={project} />
        </div>
        <div>
          {selectedTask && <TaskInfo task={selectedTask} />}
        </div>
      </ResizablePanels>
    </React.Fragment>
  );
};

export default Tasks;
