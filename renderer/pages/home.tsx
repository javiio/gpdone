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
      <div className="max-w-lg relative">
        <div className="sticky top-0 pl-4 pt-4 pb-2 bg-slate-900 z-10">
          <CurrentBlock />
          <CurrentDateSelector />
        </div>
        <div>
          <DailyBlocks date={currentDate} />
        </div>
      </div>
    </React.Fragment>
  );
};

export default Home;
