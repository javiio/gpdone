import React from 'react';
import Head from 'next/head';
import { CurrentBlock, DailyBlocks } from '~blocks';

const Home = () => {
  return (
    <React.Fragment>
      <Head>
        <title>GPD</title>
      </Head>
      <div className="m-4 max-w-md">
        <CurrentBlock />
        <DailyBlocks />
      </div>
    </React.Fragment>
  );
};

export default Home;
