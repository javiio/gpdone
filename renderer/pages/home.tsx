import React from 'react';
import Head from 'next/head';
import { ResizablePanels } from '~platform';
import { DailyBlocks } from '~blocks';
import { CurrentDateSelector, useCurrentDate } from '~calendar';
import { NoteEditor } from '~notes';

const Home = () => {
  const { date } = useCurrentDate();

  return (
    <React.Fragment>
      <Head>
        <title>GPD</title>
      </Head>
      <ResizablePanels vertical aSize="40%" bSize="60%">
        <div className="relative">
          <div className="sticky top-0 pl-4 pt-4 pb-2 bg-slate-900 z-10">
            <CurrentDateSelector />
          </div>
          <div>
            <DailyBlocks date={date} />
          </div>
        </div>

        <div className="bg-slate-700">
          <NoteEditor noteId="playground" />
        </div>
      </ResizablePanels>
    </React.Fragment>
  );
};

export default Home;
