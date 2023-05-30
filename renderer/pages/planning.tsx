import React from 'react';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { currentDateState } from '~blocks';
import { PlanningList, PlanningForm } from '~planning';
import { NoteEditor } from '~notes';

const Home = () => {
  const currentDate = useRecoilValue(currentDateState);
  return (
    <React.Fragment>
      <Head>
        <title>Planning</title>
      </Head>
      <div className="flex p-4">
        <div className="w-lg relative flex-1">
          <PlanningForm date={currentDate} />
          <PlanningList date={currentDate} />
        </div>

        <div className="bg-slate-700 flex-1 h-screen">
          <NoteEditor noteId="planning" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
