import React from 'react';
import Head from 'next/head';
import { PlanningList } from '~planning';
import { useCurrentDate } from '~calendar';
import { NoteEditor } from '~notes';
import { ResizablePanels } from '~platform';

const Planning = () => {
  const { date } = useCurrentDate();

  return (
    <React.Fragment>
      <Head>
        <title>Planning</title>
      </Head>
      <ResizablePanels vertical aSize="40%" bSize="60%">
        <div className="w-lg relative flex-1 p-4">
          <PlanningList date={date} />
        </div>

        <div>
          <NoteEditor noteId="planning" />
        </div>
      </ResizablePanels>
    </React.Fragment>
  );
};

export default Planning;
