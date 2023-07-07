import React from 'react';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { currentDateState } from '~blocks';
import { PlanningList } from '~planning';
import { NoteEditor } from '~notes';
import { ResizablePanels } from '~platform';

const Home = () => {
  const currentDate = useRecoilValue(currentDateState);
  return (
    <React.Fragment>
      <Head>
        <title>Planning</title>
      </Head>
      <ResizablePanels vertical aSize="40%" bSize="60%">
        <div className="w-lg relative flex-1 p-4">
          <PlanningList date={currentDate} />
        </div>

        <div className="bg-slate-700 flex-1 h-screen">
          <NoteEditor noteId="planning" />
        </div>
      </ResizablePanels>
    </React.Fragment>
  );
};

export default Home;
