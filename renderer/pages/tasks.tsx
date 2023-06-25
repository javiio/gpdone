import React, { useState } from 'react';
import Head from 'next/head';
import { ProjectsTabs, type Project } from '~projects';
import { TaskForm, TasksList } from '~tasks';

const Tasks = () => {
  const [project, setProject] = useState<Project | undefined>(undefined);

  return (
    <React.Fragment>
      <Head>
        <title>Tasks</title>
      </Head>
      <div>
        <div className="p-4">
          <ProjectsTabs project={project} setProject={setProject} />
          <div className="my-4">
            <TaskForm project={project} />
          </div>
          <TasksList project={project} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Tasks;
