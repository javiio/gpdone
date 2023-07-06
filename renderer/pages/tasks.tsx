import React, { useState } from 'react';
import Head from 'next/head';
import { ResizablePanels } from '~platform';
import { ProjectsTabs, type Project } from '~projects';
import { TaskForm, TasksList, TaskInfo, useTasks } from '~tasks';

const Tasks = () => {
  const [project, setProject] = useState<Project | undefined>(undefined);
  const { selectedTask } = useTasks();

  return (
    <React.Fragment>
      <Head>
        <title>Tasks</title>
      </Head>
      <ResizablePanels vertical aSize="40%" bSize="60%">
        <div className="p-4 pt-2">
          <ProjectsTabs project={project} setProject={setProject} />
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
