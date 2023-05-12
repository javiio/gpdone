import React from 'react';
import Head from 'next/head';
import { CurrentBlock, DailyBlocks } from '~blocks';

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>GPD</title>
      </Head>
      <div className="max-w-md relative">
        <div className="sticky top-0 p-4 bg-slate-800 z-10">
          <CurrentBlock />
        </div>
        <DailyBlocks />
      </div>
    </React.Fragment>
  );
};

export default Home;
