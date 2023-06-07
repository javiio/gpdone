import React from 'react';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { DailyBlocks, CurrentDateSelector, currentDateState } from '~blocks';
import { NoteEditor } from '~notes';

const Home = () => {
  const currentDate = useRecoilValue(currentDateState);
  return (
    <React.Fragment>
      <Head>
        <title>GPD</title>
      </Head>
      <div className="flex">
        <div className="w-lg relative flex-1">
          <div className="sticky top-0 pl-4 pt-4 pb-2 bg-slate-900 z-10">
            <CurrentDateSelector />
          </div>
          <div>
            <DailyBlocks date={currentDate} />
          </div>
        </div>

        <div className="flex-1 bg-slate-700">
          <NoteEditor noteId="playground" />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
