import React from 'react';
import Head from 'next/head';
import { useRecoilValue } from 'recoil';
import { CurrentBlock, DailyBlocks, CurrentDateSelector, currentDateState } from '~blocks';

const Home = () => {
  const currentDate = useRecoilValue(currentDateState);
  return (
    <React.Fragment>
      <Head>
        <title>GPD</title>
      </Head>
      <div className="max-w-md relative">
        <div className="sticky top-0 p-4 bg-slate-800 z-10">
          <CurrentDateSelector />
          <CurrentBlock />
        </div>
        <div className="mt-4">
          <DailyBlocks date={currentDate} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
