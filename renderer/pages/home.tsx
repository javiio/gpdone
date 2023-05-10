import React from 'react';
import Head from 'next/head';
import { CurrentBlock } from '~blocks';

function Home() {
  return (
    <React.Fragment>
      <Head>
        <title>GPD</title>
      </Head>
      <div className="m-4">
        <CurrentBlock />
      </div>
    </React.Fragment>
  );
}

export default Home;
